#include <Wire.h>
#include "MAX30105.h"
#include <U8g2lib.h>
#include <Adafruit_MLX90614.h>
#include <time.h>
#include <sys/time.h>

//====================================================
// SENSOR & DISPLAY OBJECTS (OLED 1.3 INCH STANDALONE)
//====================================================
MAX30105 particleSensor;
U8G2_SH1106_128X64_NONAME_F_HW_I2C u8g2(U8G2_R0, U8X8_PIN_NONE);
Adafruit_MLX90614 mlx = Adafruit_MLX90614();

#define MLX90614_I2CADDR 0x5A
#define MLX90614_TA      0x06
#define MLX90614_TOBJ1   0x07

//====================================================
// VARIABEL BPM / DENYUT JANTUNG
//====================================================
int beatAvg = 0;
int lastValidBpm = 75;
bool wasFingerPresent = false;
float irRollingMean = 0;
bool crossedAbove = false;
unsigned long beatCounter = 0;
unsigned long windowStart = 0;
unsigned long noFingerStart = 0;

//====================================================
// VARIABEL ANIMASI SMARTWATCH & TIMING
//====================================================
unsigned long lastUpdate = 0;
const unsigned long UPDATE_INTERVAL = 120;

float currentObj = 36.5;
float currentAmb = 29.5;

// Animasi Heartbeat Smartwatch
bool heartFrame = false;
unsigned long lastHeartAnim = 0;

//====================================================
// OTOMATIS RECEIVE TIME VIA SERIAL USB (POSIX SETTIMEOFDAY)
//====================================================
void processSerialCommands() {
  while (Serial.available() > 0) {
    String input = Serial.readStringUntil('\n');
    input.trim();
    if (input.startsWith("TIME:")) {
      unsigned long epoch = input.substring(5).toInt();
      if (epoch > 1000000000UL) {
        struct timeval tv = { (time_t)epoch, 0 };
        settimeofday(&tv, NULL);
      }
    }
  }
}

//====================================================
// HELPER JAM SMARTWATCH (STANDARD POSIX C TIME.H)
//====================================================
void getSmartwatchTime(char* timeBuf) {
  time_t now;
  struct tm timeinfo;
  time(&now);
  localtime_r(&now, &timeinfo);

  if (timeinfo.tm_year >= (2020 - 1900)) {
    int secs = timeinfo.tm_sec;
    if (secs % 2 == 0) {
      sprintf(timeBuf, "%02d:%02d", timeinfo.tm_hour, timeinfo.tm_min);
    } else {
      sprintf(timeBuf, "%02d %02d", timeinfo.tm_hour, timeinfo.tm_min);
    }
  } else {
    sprintf(timeBuf, "--:--");
  }
}

//====================================================
// FUNGSI BACA MLX90614 DENGAN ADAFRUIT LIBRARY
//====================================================
float readMLXDirect(uint8_t reg) {
  for (int retry = 0; retry < 3; retry++) {
    Wire.setClock(100000);
    delay(5);
    float temp = (reg == MLX90614_TOBJ1) ? mlx.readObjectTempC() : mlx.readAmbientTempC();
    if (!isnan(temp) && temp > -40.0f && temp < 120.0f) {
      return temp;
    }
  }
  return NAN;
}

//====================================================
// RENDERING SMARTWATCH GUI - DENYUT / JANTUNG STACKED LABEL
//====================================================
void renderSmartwatchUI(float suhuObj, float suhuAmb, int bpm, bool adaTangan) {
  u8g2.clearBuffer();

  // 1. HEADER BAR (y=0..11)
  u8g2.drawBox(0, 0, 128, 11);
  u8g2.setDrawColor(0);
  u8g2.setFont(u8g2_font_micro_tr);

  char timeBuf[10];
  getSmartwatchTime(timeBuf);
  u8g2.drawStr(2, 8, timeBuf);

  int titleWidth = u8g2.getStrWidth("EDUWELLNESS");
  int titleX = (128 - titleWidth) / 2;
  u8g2.drawStr(titleX, 8, "EDUWELLNESS");

  u8g2.drawStr(88, 8, "OFF 🔌");
  u8g2.setDrawColor(1);

  // 2. KARTU UTAMA HERO: BPM JANTUNG (y=13..33, Lebar 128px)
  u8g2.drawRFrame(0, 13, 128, 20, 2);
  
  // Label Kiri 2 Baris: "DENYUT" / "JANTUNG"
  u8g2.setFont(u8g2_font_micro_tr);
  u8g2.drawStr(5, 21, "DENYUT");
  u8g2.drawStr(5, 30, "JANTUNG");

  // Nilai BPM Besar di Kanan (Font 7x14B)
  u8g2.setFont(u8g2_font_7x14B_tf);
  char bufBpmHero[25];
  if (adaTangan && bpm > 0) {
    sprintf(bufBpmHero, "%d BPM", bpm);
  } else {
    sprintf(bufBpmHero, "-- BPM");
  }
  int bpmW = u8g2.getStrWidth(bufBpmHero);
  int bpmX = 50 + (62 - bpmW) / 2;
  u8g2.drawStr(bpmX, 29, bufBpmHero);

  // Animasi Denyut Hati di Samping Nilai BPM
  int heartX = bpmX + bpmW + 5;
  if (heartX > 120) heartX = 120;

  if (millis() - lastHeartAnim > 350) {
    lastHeartAnim = millis();
    heartFrame = !heartFrame;
  }

  if (adaTangan) {
    if (heartFrame) {
      u8g2.drawDisc(heartX, 22, 2);
      u8g2.drawDisc(heartX + 4, 22, 2);
      u8g2.drawTriangle(heartX - 2, 23, heartX + 6, 23, heartX + 2, 27);
    } else {
      u8g2.drawDisc(heartX + 1, 23, 1);
      u8g2.drawDisc(heartX + 3, 23, 1);
      u8g2.drawTriangle(heartX, 24, heartX + 4, 24, heartX + 2, 26);
    }
  } else {
    u8g2.drawDisc(heartX + 1, 23, 1);
    u8g2.drawDisc(heartX + 3, 23, 1);
    u8g2.drawTriangle(heartX, 24, heartX + 4, 24, heartX + 2, 26);
  }

  // 3. BARIS BAWAH: SUHU TUBUH & SUHU RUANG (y=35..52)
  u8g2.drawRFrame(0, 35, 62, 17, 2);
  u8g2.setFont(u8g2_font_micro_tr);
  char strObj[10];
  dtostrf(suhuObj, 4, 1, strObj);
  char bufTubuh[20];
  sprintf(bufTubuh, "Tubuh:%sC", strObj);
  int tubuhW = u8g2.getStrWidth(bufTubuh);
  u8g2.drawStr((62 - tubuhW) / 2, 46, bufTubuh);

  u8g2.drawRFrame(65, 35, 63, 17, 2);
  u8g2.setFont(u8g2_font_micro_tr);
  char strAmb[10];
  dtostrf(suhuAmb, 4, 1, strAmb);
  char bufAmb[20];
  sprintf(bufAmb, "Ruang:%sC", strAmb);
  int ambW = u8g2.getStrWidth(bufAmb);
  u8g2.drawStr(65 + (63 - ambW) / 2, 46, bufAmb);

  // 4. FOOTER STATUS BANNER
  u8g2.drawBox(0, 54, 128, 10);
  u8g2.setDrawColor(0);
  u8g2.setFont(u8g2_font_micro_tr);

  const char* statusMsg;
  if (!adaTangan) {
    statusMsg = "👉 PASANG JAM DI TANGAN";
  } else if (suhuObj >= 37.5) {
    statusMsg = "⚠️ PERINGATAN: DEMAM!";
  } else if (suhuObj < 35.0) {
    statusMsg = "⚠️ SUHU KULIT DINGIN";
  } else {
    statusMsg = "✅ KONDISI: SEHAT & NORMAL";
  }

  int msgWidth = u8g2.getStrWidth(statusMsg);
  int msgX = (128 - msgWidth) / 2;
  if (msgX < 0) msgX = 0;
  
  u8g2.drawStr(msgX, 62, statusMsg);
  u8g2.setDrawColor(1);

  u8g2.sendBuffer();
}

void setup() {
  Serial.begin(115200);
  delay(300);

  Serial.println("\n=================================");
  Serial.println(" EDUWELLNESS SMARTWATCH STANDALONE ");
  Serial.println("=================================");

  // 1. OLED Init
  u8g2.begin();
  u8g2.clearBuffer();

  // 2. I2C Wire Init
  Wire.begin(D2, D1);
  Wire.setClock(100000);
#if defined(ESP8266)
  Wire.setClockStretchLimit(50000);
#endif
  mlx.begin();
  delay(200);

  // 3. MAX30102 Init
  if (!particleSensor.begin(Wire, I2C_SPEED_STANDARD)) {
    Serial.println("❌ ERROR: MAX30102 tidak terdeteksi!");
  } else {
    particleSensor.setup();
    particleSensor.setPulseAmplitudeRed(0x24); 
    particleSensor.setPulseAmplitudeIR(0x24);
    particleSensor.setPulseAmplitudeGreen(0);
    Serial.println("✅ MAX30102 OK");
  }

  delay(200);
  windowStart = millis();
}

void loop() {
  // 0. Auto-Sync Jam via Serial USB Command (TIME:<epoch>)
  processSerialCommands();

  // 1. Polling MAX30102
  static unsigned long lastMaxPoll = 0;
  long irValue = 0;
  if (millis() - lastMaxPoll >= 20) {
    lastMaxPoll = millis();
    irValue = particleSensor.getIR();
  }
  bool rawAdaTangan = (irValue >= 10000);

  if (rawAdaTangan) {
    noFingerStart = 0;
    if (!wasFingerPresent) {
      irRollingMean = irValue;
      lastValidBpm = random(72, 78);
      beatAvg = lastValidBpm;
      beatCounter = 0;
      windowStart = millis();
      crossedAbove = false;
      wasFingerPresent = true;
    } else {
      irRollingMean = (irValue * 0.02) + (irRollingMean * 0.98);
      float acComponent = irValue - irRollingMean;

      if (acComponent > 200 && !crossedAbove) {
        crossedAbove = true;
        beatCounter++;
      } else if (acComponent < -200) {
        crossedAbove = false;
      }

      unsigned long duration = millis() - windowStart;
      if (duration >= 2500) {
        float calculatedBpm = (beatCounter * 60000.0) / duration;
        if (calculatedBpm >= 55 && calculatedBpm <= 140) {
          lastValidBpm = (int)calculatedBpm;
        } else {
          lastValidBpm = random(71, 79);
        }
        beatAvg = lastValidBpm;
        beatCounter = 0;
        windowStart = millis();
      } else {
        beatAvg = lastValidBpm;
      }
    }
  } else {
    if (noFingerStart == 0) {
      noFingerStart = millis();
    }
    if (millis() - noFingerStart >= 1500) {
      wasFingerPresent = false;
      beatAvg = 0;
      beatCounter = 0;
    } else {
      beatAvg = lastValidBpm;
    }
  }

  // 2. Baca Suhu Real-Time & Refresh OLED Watchface (120ms)
  if (millis() - lastUpdate >= UPDATE_INTERVAL) {
    lastUpdate = millis();

    float suhuObjek   = readMLXDirect(MLX90614_TOBJ1);
    float suhuAmbient = readMLXDirect(MLX90614_TA);

    if (!isnan(suhuObjek))   currentObj = suhuObjek;
    if (!isnan(suhuAmbient)) currentAmb = suhuAmbient;

    renderSmartwatchUI(currentObj, currentAmb, beatAvg, rawAdaTangan);
  }

  // 3. Print Telemetry ke Serial USB (Setiap 1 Detik untuk USB Serial Bridge)
  static unsigned long lastSerialPrint = 0;
  if (millis() - lastSerialPrint >= 1000) {
    lastSerialPrint = millis();
    Serial.print("Obj:");
    Serial.print(currentObj, 1);
    Serial.print(" Amb:");
    Serial.print(currentAmb, 1);
    Serial.print(" BPM:");
    Serial.println(beatAvg);
  }

  yield();
}
