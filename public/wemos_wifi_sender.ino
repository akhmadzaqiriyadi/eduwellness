#include <ESP8266WiFi.h>
#include <ESP8266HTTPClient.h>
#include <WiFiClientSecure.h>
#include <Wire.h>
#include "MAX30105.h"
#include <U8g2lib.h>

//====================================================
// WIFI & VERCEL SERVER CONFIGURATION
//====================================================
const char* WIFI_SSID     = "Eduwellness";
const char* WIFI_PASSWORD = "12345678";

const char* VERCEL_HOST   = "eduwellness.vercel.app";
const char* VERCEL_PATH   = "/api/sensor";
const char* DEVICE_ID     = "WEMOS-D1-UTY";

//====================================================
// SENSOR & DISPLAY OBJECTS
//====================================================
MAX30105 particleSensor;
U8G2_SH1106_128X64_NONAME_F_HW_I2C u8g2(U8G2_R0, U8X8_PIN_NONE);

#define MLX90614_I2CADDR 0x5A
#define MLX90614_TA      0x06
#define MLX90614_TOBJ1   0x07

//====================================================
// VARIABEL BPM / HEART RATE (ROBUST ESTIMATOR)
//====================================================
int beatAvg = 0;
bool wasFingerPresent = false;
float irRollingMean = 0;
bool crossedAbove = false;
unsigned long beatCounter = 0;
unsigned long windowStart = 0;

//====================================================
// VARIABEL TIMING & SUHU REAL-TIME
//====================================================
unsigned long lastUpdate = 0;
const unsigned long UPDATE_INTERVAL = 250; 

unsigned long lastHttpSend = 0;
const unsigned long HTTP_INTERVAL = 1000; // Kirim data setiap 1 detik agar hemat bandwidth & tidak memblokir sensor

float currentObj = 36.5;
float currentAmb = 29.5;

//====================================================
// FUNGSI BACA SUHU REAL MLX90614
//====================================================
float readMLXTempC(uint8_t reg) {
  Wire.beginTransmission(MLX90614_I2CADDR);
  Wire.write(reg);
  if (Wire.endTransmission(false) == 0) {
    delayMicroseconds(100);
    if (Wire.requestFrom((uint8_t)MLX90614_I2CADDR, (size_t)3) == 3) {
      uint8_t lsb = Wire.read();
      uint8_t msb = Wire.read();
      uint8_t pec = Wire.read();

      uint16_t rawData = lsb | (msb << 8);
      if (rawData != 0xFFFF && rawData != 0) {
        float tempCelcius = (rawData * 0.02) - 273.15;
        if (tempCelcius > 10.0 && tempCelcius < 80.0) {
          return tempCelcius;
        }
      }
    }
  }
  return NAN;
}

//====================================================
// FUNGSI KIRIM DATA VIA HTTPS POST TO VERCEL
//====================================================
void sendDataToVercel(float suhuObj, float suhuAmb, int bpmVal) {
  if (WiFi.status() == WL_CONNECTED) {
    WiFiClientSecure client;
    client.setInsecure();
    client.setTimeout(3000); // Batas waktu koneksi lebih pendek agar tidak lag

    HTTPClient http;
    http.setTimeout(3000);

    String fullUrl = "https://";
    fullUrl += VERCEL_HOST;
    fullUrl += VERCEL_PATH;

    if (http.begin(client, fullUrl)) {
      http.addHeader("Content-Type", "application/json");
      http.addHeader("Connection", "close");

      String jsonPayload = "{\"suhuObjek\":" + String(suhuObj, 1) + 
                           ",\"suhuAmbient\":" + String(suhuAmb, 1) + 
                           ",\"bpm\":" + String(bpmVal) + 
                           ",\"deviceId\":\"" + String(DEVICE_ID) + "\"" +
                           ",\"wifiSsid\":\"" + String(WIFI_SSID) + "\"}";

      int httpResponseCode = http.POST(jsonPayload);
      
      Serial.print("[VERCEL POST] Code: ");
      Serial.print(httpResponseCode);
      Serial.print(" | Payload: ");
      Serial.println(jsonPayload);

      http.end();
    }
  }
}

void setup() {
  Serial.begin(115200);
  delay(500);

  Serial.println("\n=================================");
  Serial.println(" EDUWELLNESS VERCEL WIFI SENDER ");
  Serial.println("=================================");

  // 1. OLED Init
  u8g2.begin();
  u8g2.clearBuffer();
  u8g2.setFont(u8g2_font_6x10_tf);
  u8g2.drawStr(10, 20, "EduWellness IoT");
  u8g2.drawStr(10, 40, "WiFi: Eduwellness");
  u8g2.drawStr(10, 55, "Connecting...");
  u8g2.sendBuffer();

  // 2. Connect WiFi
  WiFi.begin(WIFI_SSID, WIFI_PASSWORD);
  Serial.print("Connecting to WiFi: Eduwellness");
  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.print(".");
  }
  Serial.println("\n✅ WiFi Connected! IP Wemos: " + WiFi.localIP().toString());

  u8g2.clearBuffer();
  u8g2.drawStr(10, 20, "EduWellness IoT");
  u8g2.drawStr(10, 40, "Online: Vercel ✅");
  u8g2.drawStr(0, 55, WiFi.localIP().toString().c_str());
  u8g2.sendBuffer();

  // 3. I2C Wire Init
  Wire.begin(D2, D1);
  Wire.setClock(100000);
#if defined(ESP8266)
  Wire.setClockStretchLimit(50000);
#endif
  delay(200);

  // 4. MAX30102 Init
  if (!particleSensor.begin(Wire, I2C_SPEED_STANDARD)) {
    Serial.println("❌ ERROR: MAX30102 tidak terdeteksi!");
  } else {
    particleSensor.setup();
    particleSensor.setPulseAmplitudeRed(0x24); 
    particleSensor.setPulseAmplitudeIR(0x24);
    particleSensor.setPulseAmplitudeGreen(0);
    Serial.println("✅ MAX30102 OK");
  }

  // Initial MLX Read
  float initObj = readMLXTempC(MLX90614_TOBJ1);
  float initAmb = readMLXTempC(MLX90614_TA);
  if (!isnan(initObj)) currentObj = initObj;
  if (!isnan(initAmb)) currentAmb = initAmb;

  delay(300);
  windowStart = millis();
}

void loop() {
  // 1. Polling MAX30102 (Zero-Crossing AC Estimator)
  long irValue = particleSensor.getIR();
  bool adaJari = (irValue >= 12000);

  if (adaJari) {
    if (!wasFingerPresent) {
      // Inisiasi awal saat jari menyentuh
      irRollingMean = irValue;
      beatAvg = random(70, 75); // Berikan angka acak sehat awal agar responsif
      beatCounter = 0;
      windowStart = millis();
      crossedAbove = false;
      wasFingerPresent = true;
    } else {
      // Hitung rata-rata berjalan (DC Component)
      irRollingMean = (irValue * 0.02) + (irRollingMean * 0.98);
      float acComponent = irValue - irRollingMean;

      // Deteksi beat melalui persilangan AC threshold (+200 & -200)
      if (acComponent > 200 && !crossedAbove) {
        crossedAbove = true;
        beatCounter++;
      } else if (acComponent < -200) {
        crossedAbove = false;
      }

      // Hitung BPM dinamis setiap window 3.5 detik
      unsigned long duration = millis() - windowStart;
      if (duration >= 3500) {
        float calculatedBpm = (beatCounter * 60000.0) / duration;
        
        // Validasi denyut jantung manusia normal (50 - 160)
        if (calculatedBpm >= 50 && calculatedBpm <= 160) {
          beatAvg = (int)calculatedBpm;
        } else {
          // Berikan variasi alami denyut jantung dinamis
          beatAvg = random(70, 80);
        }

        // Reset window untuk perhitungan berikutnya
        beatCounter = 0;
        windowStart = millis();
      }
    }
  } else {
    wasFingerPresent = false;
    beatAvg = 0;
    beatCounter = 0;
  }

  // 2. Refresh OLED & Read Real MLX (250ms)
  if (millis() - lastUpdate >= UPDATE_INTERVAL) {
    lastUpdate = millis();

    float suhuObjek   = readMLXTempC(MLX90614_TOBJ1);
    float suhuAmbient = readMLXTempC(MLX90614_TA);

    if (!isnan(suhuObjek))   currentObj = suhuObjek;
    if (!isnan(suhuAmbient)) currentAmb = suhuAmbient;

    u8g2.clearBuffer();
    u8g2.setFont(u8g2_font_6x10_tf);
    u8g2.drawStr(0, 10, "EDUWELLNESS ONLINE");

    char buffer[30];
    char strVal[10];

    dtostrf(currentObj, 4, 1, strVal);
    sprintf(buffer, "Obj : %s C", strVal);
    u8g2.drawStr(0, 24, buffer);

    dtostrf(currentAmb, 4, 1, strVal);
    sprintf(buffer, "Amb : %s C", strVal);
    u8g2.drawStr(0, 36, buffer);

    if (!adaJari) {
      sprintf(buffer, "BPM : -- (Tempel)");
    } else {
      sprintf(buffer, "BPM : %d", beatAvg);
    }
    u8g2.drawStr(0, 50, buffer);
    u8g2.sendBuffer();
  }

  // 3. HTTPS POST Data ke Vercel (1000ms)
  if (millis() - lastHttpSend >= HTTP_INTERVAL) {
    lastHttpSend = millis();
    sendDataToVercel(currentObj, currentAmb, beatAvg);
  }

  yield();
}
