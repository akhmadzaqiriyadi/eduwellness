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
  if (suhuObjek < 20.0) {
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
  const isHypo = suhuObjek < 20.0;
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
      title: 'Hidrasi & Minuman',
      iconName: 'Droplet',
      items: isFever
        ? [
            'Minum air putih minimal 2.5 - 3 Liter per hari untuk mencegah dehidrasi akibat demam.',
            'Konsumsi air hangat atau teh herbal tanpa pemanis berlebihan.',
            'Hindari minuman berkafein kencang dan es krim dingin saat demam.',
          ]
        : [
            'Minum 8 gelas air putih (2 Liter) sepanjang hari.',
            'Bawa botol minum sendiri saat bersekolah atau beraktivitas.',
            'Kurangi minuman manis kemasan dan soda.',
          ],
    },
    {
      title: 'Nutrisi & Makanan',
      iconName: 'Apple',
      items: isFever
        ? [
            'Konsumsi makanan berkuah hangat seperti sup ayam gizi seimbang.',
            'Perbanyak buah kaya Vitamin C (jeruk, pepaya, jambu biji).',
            'Makan dalam porsi kecil namun sering jika nafsu makan turun.',
          ]
        : [
            'Terapkan piring Isi Piringku: 50% buah & sayur, 50% makanan pokok & lauk.',
            'Perbanyak konsumsi protein (telur, ikan, tahu, tempe) untuk pertumbuhan.',
            'Batasi konsumsi gorengan dan makanan tinggi garam.',
          ],
    },
    {
      title: 'Istirahat & Tidur',
      iconName: 'Moon',
      items: isFever || isHighBpm
        ? [
            'Tidur cukup minimal 8-9 jam di malam hari agar daya tahan tubuh pulih.',
            'Hindari begadang dan matikan layar gadget 30 menit sebelum tidur.',
            'Istirahatkan tubuh dari aktivitas fisik berat sementara waktu.',
          ]
        : [
            'Jaga pola tidur teratur jam 21.00 - 05.00 WIB.',
            'Luangkan waktu 15 menit untuk relaksasi atau olahraga pernapasan.',
          ],
    },
    {
      title: 'Aktivitas Fisik & Olahraga',
      iconName: 'Activity',
      items: isFever
        ? [
            'Hentikan sementara kegiatan olahraga berat.',
            'Ganti dengan istirahat tirah baring (bed rest) sampai suhu tubuh stabil.',
          ]
        : [
            'Lakukan aktivitas fisik ringan-sedang minimal 30 menit sehari (jalan santai, bersepeda).',
            'Lakukan peregangan otot setelah duduk belajar dalam waktu lama.',
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
