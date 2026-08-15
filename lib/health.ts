export interface HealthStatusResult {
  text: string;
  color: string;
  badgeBg: string;
  badgeText: string;
  badgeBorder: string;
}

export interface RecommendationCategory {
  title: string;
  iconName: string;
  items: string[];
}

export interface HealthRecommendation {
  summary: string;
  statusBadge: string;
  statusColor: string;
  temperatureAdvice: string;
  bpmAdvice: string;
  categories: RecommendationCategory[];
}

/**
 * Returns temperature status object given body temperature in °C.
 */
export function getTemperatureStatus(suhuObjek: number): HealthStatusResult {
  if (suhuObjek >= 37.5) {
    return {
      text: 'Demam',
      color: 'text-amber-700 bg-amber-50 border-amber-200',
      badgeBg: 'bg-amber-500',
      badgeText: 'text-amber-700',
      badgeBorder: 'border-amber-200',
    };
  }
  if (suhuObjek < 35.0) {
    return {
      text: 'Hipotermia',
      color: 'text-sky-700 bg-sky-50 border-sky-200',
      badgeBg: 'bg-sky-500',
      badgeText: 'text-sky-700',
      badgeBorder: 'border-sky-200',
    };
  }
  return {
    text: 'Normal',
    color: 'text-emerald-700 bg-emerald-50 border-emerald-200',
    badgeBg: 'bg-emerald-500',
    badgeText: 'text-emerald-700',
    badgeBorder: 'border-emerald-200',
  };
}

/**
 * Returns BPM status object given pulse rate.
 */
export function getBpmStatus(bpm: number): HealthStatusResult {
  if (bpm === 0) {
    return {
      text: 'Menunggu Jari...',
      color: 'text-slate-500 bg-slate-100 border-slate-200',
      badgeBg: 'bg-slate-400',
      badgeText: 'text-slate-600',
      badgeBorder: 'border-slate-200',
    };
  }
  if (bpm > 100) {
    return {
      text: 'Tinggi (Takikardia)',
      color: 'text-rose-700 bg-rose-50 border-rose-200',
      badgeBg: 'bg-rose-500',
      badgeText: 'text-rose-700',
      badgeBorder: 'border-rose-200',
    };
  }
  if (bpm < 50) {
    return {
      text: 'Rendah (Bradikardia)',
      color: 'text-amber-700 bg-amber-50 border-amber-200',
      badgeBg: 'bg-amber-500',
      badgeText: 'text-amber-700',
      badgeBorder: 'border-amber-200',
    };
  }
  return {
    text: 'Normal',
    color: 'text-emerald-700 bg-emerald-50 border-emerald-200',
    badgeBg: 'bg-emerald-500',
    badgeText: 'text-emerald-700',
    badgeBorder: 'border-emerald-200',
  };
}

/**
 * Generates comprehensive personalized health recommendations based on temperature & BPM.
 */
export function generateHealthRecommendation(suhuObjek: number, bpm: number): HealthRecommendation {
  const isFever = suhuObjek >= 37.5;
  const isHypo = suhuObjek < 35.0;
  const isHighBpm = bpm > 100;
  const isLowBpm = bpm > 0 && bpm < 50;

  let summary = 'Kondisi tubuhmu berada dalam rentang normal dan seimbang! Pertahankan kebiasaan sehat sehari-hari.';
  let statusBadge = 'Kondisi Prima';
  let statusColor = 'text-emerald-600 bg-emerald-50 border-emerald-200';
  let temperatureAdvice = 'Suhu tubuhmu stabil (36.1°C - 37.2°C). Mekanisme termoregulasi tubuh bekerja dengan baik.';
  let bpmAdvice = bpm > 0 ? `Detak jantungmu (${bpm} BPM) berada pada rentang istirahat ideal untuk usia remaja.` : 'Tempelkan jari pada sensor MAX30102 untuk mengukur denyut jantung.';

  if (isFever) {
    summary = 'Suhu tubuhmu terdeteksi meningkat di atas 37.5°C (Demam). Tubuh sedang merespons peradangan atau infeksi ringan.';
    statusBadge = 'Perlu Istirahat Ekstra';
    statusColor = 'text-amber-700 bg-amber-50 border-amber-200';
    temperatureAdvice = `Suhu tubuh (${suhuObjek.toFixed(1)}°C) mengindikasikan demam ringan hingga sedang.`;
  } else if (isHypo) {
    summary = 'Suhu tubuhmu cukup rendah di bawah 35.0°C. Tubuh membutuhkan kehangatan segera.';
    statusBadge = 'Perlu Penghangatan';
    statusColor = 'text-sky-700 bg-sky-50 border-sky-200';
    temperatureAdvice = `Suhu tubuh (${suhuObjek.toFixed(1)}°C) berada di bawah ambang batas normal.`;
  }

  if (isHighBpm) {
    bpmAdvice = `Detak jantung (${bpm} BPM) tergolong tinggi. Hal ini biasa terjadi setelah berolahraga, cemas, atau kurang cairan.`;
  } else if (isLowBpm) {
    bpmAdvice = `Detak jantung (${bpm} BPM) tergolong rendah. Pastikan kamu tidak sedang pusing atau lemas.`;
  }

  const categories: RecommendationCategory[] = [
    {
      title: 'Hidrasi & Kebutuhan Cairan',
      iconName: 'Droplet',
      items: isFever
        ? [
            'Tingkatkan asupan air putih hingga 2.5 - 3 Liter per hari untuk mencegah dehidrasi saat demam.',
            'Minum air putih hangat atau sup bernutrisi untuk membantu menurunkan suhu tubuh.',
            'Hindari minuman berkafein tinggi atau minuman kemasan berpemanis berlebih.',
          ]
        : [
            'Minum minimal 8 gelas air putih (±2 Liter) per hari sesuai pedoman Germas Kemenkes.',
            'Pastikan air minum tidak berbau, tidak berasa, dan tidak berwarna (bebas kuman).',
            'Bawa botol minum pribadi saat beraktivitas di sekolah.',
          ],
    },
    {
      title: 'Nutrisi & Isi Piringku',
      iconName: 'Apple',
      items: isFever
        ? [
            'Konsumsi makanan bergizi dalam porsi kecil tapi sering (sup ayam, bubur gandum, sayur bening).',
            'Perbanyak buah kaya Vitamin C dan antioksidan (pepaya, jeruk, jambu biji).',
            'Utamakan protein mudah dicerna seperti telur rebus dan tahu tempe.',
          ]
        : [
            'Terapkan porsi Isi Piringku: 2/3 karbohidrat + 1/3 protein pada 1/2 piring, dan 2/3 sayur + 1/3 buah pada 1/2 piring lainnya.',
            'Kombinasikan protein hewani (ikan/ayam/telur) dan nabati (tempe/tahu) setiap kali makan.',
            'Cukupi 150 gr sayuran (1 mangkok) dan 150 gr buah segar (2 potong pepaya / 2 jeruk) per hari.',
          ],
    },
    {
      title: 'Pola Istirahat & Tidur',
      iconName: 'Moon',
      items: isFever || isHighBpm
        ? [
            'Tidur cukup minimal 8-9 jam di malam hari agar sel tubuh beregenerasi optimal.',
            'Matikan layar ponsel 30 menit sebelum tidur untuk merangsang melatonin alami.',
            'Istirahatkan tubuh sepenuhnya (bed rest) dan hindari begadang.',
          ]
        : [
            'Jaga pola tidur teratur 8-9 jam setiap malam (pukul 21.00 - 05.00 WIB).',
            'Hindari konsumsi kopi atau minuman boba manis setelah pukul 16.00 sore.',
            'Lakukan relaksasi dan peregangan sebelum tidur agar pikiran rileks.',
          ],
    },
    {
      title: 'Aktivitas Fisik & CTPS',
      iconName: 'Activity',
      items: isFever
        ? [
            'Hentikan aktivitas fisik berat sementara waktu hingga suhu tubuh normal stabil.',
            'Lakukan 5 Langkah Cuci Tangan Pakai Sabun (CTPS) 20 detik sebelum & sesudah makan atau minum obat.',
          ]
        : [
            'Lakukan aktivitas fisik minimal 30 menit setiap hari (jalan cepat, bersepeda, senam, menyapu).',
            'Peregangan otot ringan setiap 1-2 jam di sela waktu belajar.',
            'Terapkan 5 Langkah Cuci Tangan Pakai Sabun (CTPS) dengan air mengalir 20 detik.',
          ],
    },
  ];

  return {
    summary,
    statusBadge,
    statusColor,
    temperatureAdvice,
    bpmAdvice,
    categories,
  };
}
