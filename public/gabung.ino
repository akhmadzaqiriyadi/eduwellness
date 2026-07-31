#include <Wire.h>
#include "MAX30105.h"
#include "heartRate.h"
#include <U8g2lib.h>

//====================================================
// SENSOR & DISPLAY OBJECTS
//====================================================
MAX30105 particleSensor;
U8G2_SH1106_128X64_NONAME_F_HW_I2C u8g2(U8G2_R0, U8X8_PIN_NONE);

#define MLX90614_I2CADDR 0x5A
#define MLX90614_TA      0x06
#define MLX90614_TOBJ1   0x07

//====================================================
// VARIABEL BPM / HEART RATE
//====================================================
const byte RATE_SIZE = 4;
byte rates[RATE_SIZE];
byte rateSpot = 0;
long lastBeat = 0;
float beatsPerMinute = 0;
int beatAvg = 0;
bool wasFingerPresent = false;

//====================================================
// VARIABEL TIMING & SUHU
//====================================================
unsigned long lastUpdate = 0;
const unsigned long UPDATE_INTERVAL = 300; 

float currentObj = 36.5;
float currentAmb = 30.0;

//====================================================
// FUNGSI BACA SUHU MLX90614 (SMBus Repeated Start)
//====================================================
float readMLXTempC(uint8_t reg) {
  Wire.setClock(100000);
#if defined(ESP8266)
  Wire.setClockStretchLimit(50000);
#endif

  for (int retry = 0; retry < 4; retry++) {
    Wire.beginTransmission(MLX90614_I2CADDR);
    Wire.write(reg);
    uint8_t err = Wire.endTransmission(false);
    
    if (err == 0) {
      delayMicroseconds(200);
      uint8_t count = Wire.requestFrom((uint8_t)MLX90614_I2CADDR, (size_t)3);
      if (count == 3) {
        uint8_t lsb = Wire.read();
        uint8_t msb = Wire.read();
        uint8_t pec = Wire.read(); 

        uint16_t rawData = lsb | (msb << 8);

        if (rawData != 0xFFFF && rawData != 0) {
          float tempKelvin = rawData * 0.02;
          float tempCelcius = tempKelvin - 273.15;
          if (tempCelcius > -20.0 && tempCelcius < 100.0) {
            return tempCelcius;
          }
        }
      }
    }
    delay(4);
  }
  return NAN;
}

void setup() {
  Serial.begin(115200);
  delay(500);

  Serial.println("\n=================================");
  Serial.println("   EDUWELLNESS INSTANT SENSOR   ");
  Serial.println("=================================");

  // 1. OLED Init
  u8g2.begin();
  u8g2.clearBuffer();
  u8g2.setFont(u8g2_font_6x10_tf);
  u8g2.drawStr(10, 30, "EduWellness IoT");
  u8g2.drawStr(10, 50, "Memulai Sensor...");
  u8g2.sendBuffer();

  // 2. I2C Wire Init
  Wire.begin(D2, D1);
  Wire.setClock(100000);
#if defined(ESP8266)
  Wire.setClockStretchLimit(50000);
#endif
  delay(200);

  // 3. MAX30102 Init
  if (!particleSensor.begin(Wire, I2C_SPEED_STANDARD)) {
    Serial.println("❌ ERROR: MAX30102 tidak terdeteksi!");
  } else {
    particleSensor.setup();
    particleSensor.setPulseAmplitudeRed(0x1F);
    particleSensor.setPulseAmplitudeIR(0x1F);
    particleSensor.setPulseAmplitudeGreen(0);
    Serial.println("✅ MAX30102 OK");
  }

  Wire.setClock(100000);
  delay(500);
}

void loop() {
  // 1. Polling MAX30102 IR Value
  long irValue = particleSensor.getIR();

  // Threshold 20000 (Sensitif untuk jari)
  if (irValue < 20000) {
    wasFingerPresent = false;
    beatAvg = 0;
    rateSpot = 0;
    for (byte x = 0; x < RATE_SIZE; x++) rates[x] = 0;
  } else {
    if (!wasFingerPresent) {
      lastBeat = millis();
      rateSpot = 0;
      for (byte x = 0; x < RATE_SIZE; x++) rates[x] = 0;
      wasFingerPresent = true;
    } else {
      if (checkForBeat(irValue)) {
        long currentTime = millis();
        long delta = currentTime - lastBeat;
        lastBeat = currentTime;

        beatsPerMinute = 60.0 / (delta / 1000.0);

        if (beatsPerMinute > 40 && beatsPerMinute < 220) {
          if (rates[0] == 0) {
            // INSTANT FILL: Isi 4 slot langsung saat denyut pertama terdeteksi!
            for (byte x = 0; x < RATE_SIZE; x++) rates[x] = (byte)beatsPerMinute;
          } else {
            rates[rateSpot++] = (byte)beatsPerMinute;
            rateSpot %= RATE_SIZE;
          }

          beatAvg = 0;
          for (byte x = 0; x < RATE_SIZE; x++) beatAvg += rates[x];
          beatAvg /= RATE_SIZE;
        }
      }
    }
  }

  // 2. Baca Suhu MLX & Print Serial & Refresh OLED (300ms)
  if (millis() - lastUpdate >= UPDATE_INTERVAL) {
    lastUpdate = millis();

    float suhuObjek   = readMLXTempC(MLX90614_TOBJ1);
    float suhuAmbient = readMLXTempC(MLX90614_TA);

    if (!isnan(suhuObjek))   currentObj = suhuObjek;
    if (!isnan(suhuAmbient)) currentAmb = suhuAmbient;

    // Print Serial untuk Serial Bridge
    Serial.print("IR: ");
    Serial.print(irValue);
    Serial.print(" | Obj: ");
    Serial.print(currentObj, 1);
    Serial.print(" C | Amb: ");
    Serial.print(currentAmb, 1);
    Serial.print(" C | BPM: ");
    Serial.println(beatAvg);

    // Refresh OLED
    u8g2.clearBuffer();
    u8g2.setFont(u8g2_font_6x10_tf);
    u8g2.drawStr(0, 10, "EDUWELLNESS IOT");

    char buffer[30];
    char strVal[10];

    dtostrf(currentObj, 4, 1, strVal);
    sprintf(buffer, "Obj : %s C", strVal);
    u8g2.drawStr(0, 24, buffer);

    dtostrf(currentAmb, 4, 1, strVal);
    sprintf(buffer, "Amb : %s C", strVal);
    u8g2.drawStr(0, 36, buffer);

    if (irValue < 20000) {
      sprintf(buffer, "BPM : -- (Tempel)");
    } else if (beatAvg == 0) {
      sprintf(buffer, "BPM : Deteksi..");
    } else {
      sprintf(buffer, "BPM : %d", beatAvg);
    }
    u8g2.drawStr(0, 50, buffer);
    u8g2.sendBuffer();
  }

  yield();
}
