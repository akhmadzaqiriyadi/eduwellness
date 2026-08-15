'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { 
  BookOpen, 
  Flame, 
  HeartHandshake, 
  ShieldAlert, 
  Sparkles, 
  Moon, 
  Utensils, 
  CheckCircle2, 
  ShieldCheck, 
  Zap, 
  AlertTriangle, 
  ArrowRight,
  Search,
  Droplets,
  Activity,
  Apple,
  Fish,
  Wheat,
  Salad,
  ExternalLink,
  Info,
  Timer
} from 'lucide-react';

interface PhbsHabit {
  number: number;
  title: string;
  category: 'Kebersihan Diri' | 'Nutrisi & Lingkungan' | 'Kebiasaan Sehat & Paru';
  desc: string;
  imageSrc: string;
  actionList: string[];
}

export default function EdukasiPage() {
  const [activeTab, setActiveTab] = useState<'rokok' | 'menstruasi' | 'pola-makan' | 'pola-tidur' | 'phbs'>('pola-makan');
  const [phbsSearchQuery, setPhbsSearchQuery] = useState('');
  const [phbsSelectedCategory, setPhbsSelectedCategory] = useState('Semua');

  const phbsItems: PhbsHabit[] = [
    { 
      number: 1, 
      title: 'Cuci Tangan Pakai Sabun (CTPS) 20 Detik', 
      category: 'Kebersihan Diri',
      desc: 'Cuci tangan dengan air bersih mengalir dan sabun minimal 20 detik sebelum & sesudah makan, serta setelah menyentuh permukaan umum untuk membasmi kuman.',
      imageSrc: '/phbs_cuci_tangan.png',
      actionList: [
        'Basahi seluruh tangan dengan air bersih mengalir.',
        'Gosok sabun ke telapak, punggung tangan, & sela-sela jari.',
        'Bersihkan bagian bawah kuku dan bilas hingga tuntas.',
      ]
    },
    { 
      number: 2, 
      title: 'Mandi Teratur 2x Sehari', 
      category: 'Kebersihan Diri',
      desc: 'Mandi teratur menjaga kebersihan kulit, mencegah penumpukan bakteri penyebab bau badan, serta menjaga kesegaran tubuh saat beraktivitas.',
      imageSrc: '/phbs_mandi.png',
      actionList: [
        'Gunakan sabun mandi berpelembap secara merata.',
        'Keramas 2-3 kali seminggu untuk menjaga kesehatan kulit kepala.',
        'Keringkan badan dengan handuk bersih pribadi.',
      ]
    },
    { 
      number: 3, 
      title: 'Sikat Gigi 2x Sehari', 
      category: 'Kebersihan Diri',
      desc: 'Gosok gigi setelah sarapan pagi dan sebelum tidur malam. Gigi bersih mencegah karies, karang gigi, dan menjaga nafas tetap segar!',
      imageSrc: '/phbs_sikat_gigi.png',
      actionList: [
        'Sikat seluruh permukaan gigi selama 2 menit.',
        'Gunakan pasta gigi berfluorida secukupnya.',
        'Ganti sikat gigi setiap 3 bulan sekali.',
      ]
    },
    { 
      number: 4, 
      title: 'Isi Piringku: Makan Sehat & Gizi Seimbang', 
      category: 'Nutrisi & Lingkungan',
      desc: 'Terapkan pedoman resmi Isi Piringku Kemenkes: 2/3 karbohidrat, 1/3 lauk protein, 2/3 sayuran, 1/3 buah-buahan, serta minum air 8 gelas sehari.',
      imageSrc: '/phbs_makan_sehat.png',
      actionList: [
        'Setengah piring untuk sayur (2/3) dan buah (1/3).',
        'Setengah piring lainnya untuk makanan pokok (2/3) dan lauk pauk (1/3).',
        'Batasi konsumsi gula, garam, dan minyak berlebih.',
      ]
    },
    { 
      number: 5, 
      title: 'Buang Sampah pada Tempatnya', 
      category: 'Nutrisi & Lingkungan',
      desc: 'Pisahkan sampah organik dan anorganik. Lingkungan sekolah & rumah yang bersih mencegah perkembangbiakan kuman penyakit.',
      imageSrc: '/phbs_buang_sampah.png',
      actionList: [
        'Buang sampah pada tempat sampah yang sesuai jenisnya.',
        'Kurangi penggunaan plastik sekali pakai.',
        'Jaga kebersihan laci meja kelas & kamar pribadi.',
      ]
    },
    { 
      number: 6, 
      title: 'Jaga Sirkulasi & Ventilasi Ruangan', 
      category: 'Nutrisi & Lingkungan',
      desc: 'Buka jendela dan pintu setiap pagi agar sirkulasi udara lancar dan kamar tidak lembap tempat bakteri dan jamur berkembang.',
      imageSrc: '/phbs_ventilasi.png',
      actionList: [
        'Buka tirai & jendela ruang belajar setiap pagi.',
        'Jemur bantal & kasur secara berkala di bawah sinar matahari.',
        'Bersihkan kipas angin atau saringan AC ruangan.',
      ]
    },
    { 
      number: 7, 
      title: 'Aktivitas Fisik Rutin Minimal 30 Menit/Hari', 
      category: 'Kebiasaan Sehat & Paru',
      desc: 'Lakukan gerakan fisik harian minimal 30 menit: jalan santai, jalan cepat, bersepeda, senam, atau membersihkan ruangan untuk melatih otot dan jantung.',
      imageSrc: '/phbs_olahraga.png',
      actionList: [
        'Luangkan waktu 30 menit setiap hari untuk bergerak aktif.',
        'Peregangan otot ringan di sela-sela jam belajar sekolah.',
        'Pilih olahraga yang menyenangkan bersama teman.',
      ]
    },
    { 
      number: 8, 
      title: 'Ganti & Pakai Pakaian Bersih', 
      category: 'Kebersihan Diri',
      desc: 'Ganti pakaian dalam dan kaus kaki setiap hari untuk mencegah iritasi kulit, jamur, serta infeksi pada lipatan tubuh.',
      imageSrc: '/phbs_pakaian_bersih.png',
      actionList: [
        'Ganti pakaian setelah berolahraga atau berkeringat.',
        'Jemur pakaian hingga benar-benar kering sebelum dilipat.',
        'Hindari saling bertukar pakaian dalam atau handuk.',
      ]
    },
    { 
      number: 9, 
      title: 'Berantas Jentik Nyamuk (Gerakan 3M Plus)', 
      category: 'Nutrisi & Lingkungan',
      desc: 'Menguras tempat penampungan air, Menutup wadah air, dan Mendaur ulang barang bekas untuk cegah Demam Berdarah Dengue (DBD).',
      imageSrc: '/phbs_berantas_nyamuk.png',
      actionList: [
        'Kuras bak mandi seminggu sekali secara berkala.',
        'Tutup rapat wadah penampungan air minum/hujan.',
        'Gunakan lotion anti nyamuk jika beraktivitas di tempat rindang.',
      ]
    },
    { 
      number: 10, 
      title: 'Katakan Tidak Pada Rokok & VAPE', 
      category: 'Kebiasaan Sehat & Paru',
      desc: 'Rokok dan vape mengandung zat beracun yang merusak paru-paru & pembuluh darah. Komitmen sehat dimulai dengan lingkungan bebas asap!',
      imageSrc: '/phbs_bebas_rokok.png',
      actionList: [
        'Hindari mencoba-coba rokok konvensional maupun e-cigarette (vape).',
        'Jauhi paparan asap rokok orang lain (perokok pasif).',
        'Tingkatkan literasi bahaya ketergantungan zat adiktif nikotin.',
      ]
    },
  ];

  const filteredPhbs = phbsItems.filter((item) => {
    const matchesQuery = item.title.toLowerCase().includes(phbsSearchQuery.toLowerCase()) ||
                         item.desc.toLowerCase().includes(phbsSearchQuery.toLowerCase());
    const matchesCat = phbsSelectedCategory === 'Semua' || item.category === phbsSelectedCategory;
    return matchesQuery && matchesCat;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-10 space-y-8 sm:space-y-12">
      
      {/* HERO BANNER */}
      <div className="text-center space-y-3 sm:space-y-4 max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-sky-100 text-sky-700 text-xs font-extrabold border border-sky-200">
          <BookOpen className="w-4 h-4 text-sky-500 shrink-0" />
          <span>Pusat Literasi & Edukasi Kesehatan</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900 leading-tight">
          Edukasi <span className="text-gradient">Kesehatan Siswa</span>
        </h1>
        <p className="text-slate-600 text-xs sm:text-base leading-relaxed">
          Pelajari pedoman resmi <strong>Isi Piringku Kemenkes RI</strong>, 10 Kebiasaan PHBS, bahaya rokok, kesehatan menstruasi, dan pola istirahat lengkap untuk generasi sehat & bugar!
        </p>
      </div>

      {/* CATEGORY TAB NAVIGATION - SWIPEABLE HORIZONTAL SCROLL ON MOBILE */}
      <div className="flex items-center gap-2 p-2 rounded-2xl sm:rounded-full glass-card border border-sky-100 max-w-4xl mx-auto bg-white overflow-x-auto no-scrollbar py-2.5 px-3">
        <button
          onClick={() => setActiveTab('pola-makan')}
          className={`flex items-center gap-2 px-4 sm:px-5 py-2 sm:py-2.5 rounded-full text-xs sm:text-sm font-extrabold shrink-0 transition-all ${
            activeTab === 'pola-makan'
              ? 'bg-emerald-500 text-white shadow-md shadow-emerald-500/25'
              : 'text-slate-600 hover:text-emerald-600 hover:bg-emerald-50'
          }`}
        >
          <Utensils className="w-4 h-4" /> Isi Piringku & Pola Makan
        </button>

        <button
          onClick={() => setActiveTab('phbs')}
          className={`flex items-center gap-2 px-4 sm:px-5 py-2 sm:py-2.5 rounded-full text-xs sm:text-sm font-extrabold shrink-0 transition-all ${
            activeTab === 'phbs'
              ? 'bg-sky-500 text-white shadow-md shadow-sky-500/25'
              : 'text-slate-600 hover:text-sky-600 hover:bg-sky-50'
          }`}
        >
          <ShieldCheck className="w-4 h-4" /> 10 Kebiasaan PHBS
        </button>

        <button
          onClick={() => setActiveTab('rokok')}
          className={`flex items-center gap-2 px-4 sm:px-5 py-2 sm:py-2.5 rounded-full text-xs sm:text-sm font-extrabold shrink-0 transition-all ${
            activeTab === 'rokok'
              ? 'bg-rose-500 text-white shadow-md shadow-rose-500/25'
              : 'text-slate-600 hover:text-rose-600 hover:bg-rose-50'
          }`}
        >
          <Flame className="w-4 h-4" /> Bahaya Rokok
        </button>

        <button
          onClick={() => setActiveTab('menstruasi')}
          className={`flex items-center gap-2 px-4 sm:px-5 py-2 sm:py-2.5 rounded-full text-xs sm:text-sm font-extrabold shrink-0 transition-all ${
            activeTab === 'menstruasi'
              ? 'bg-pink-500 text-white shadow-md shadow-pink-500/25'
              : 'text-slate-600 hover:text-pink-600 hover:bg-pink-50'
          }`}
        >
          <HeartHandshake className="w-4 h-4" /> Menstruasi
        </button>

        <button
          onClick={() => setActiveTab('pola-tidur')}
          className={`flex items-center gap-2 px-4 sm:px-5 py-2 sm:py-2.5 rounded-full text-xs sm:text-sm font-extrabold shrink-0 transition-all ${
            activeTab === 'pola-tidur'
              ? 'bg-indigo-500 text-white shadow-md shadow-indigo-500/25'
              : 'text-slate-600 hover:text-indigo-600 hover:bg-indigo-50'
          }`}
        >
          <Moon className="w-4 h-4" /> Pola Tidur
        </button>
      </div>

      {/* TAB: POLA MAKAN - ISI PIRINGKU KEMENKES RI */}
      {activeTab === 'pola-makan' && (
        <div id="pola-makan" className="space-y-8 sm:space-y-10 animate-fadeIn">
          
          {/* HEADER ISI PIRINGKU */}
          <div className="glass-card p-6 sm:p-10 rounded-3xl bg-gradient-to-br from-emerald-500/10 via-white to-sky-500/10 border-emerald-100 space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-100 text-emerald-800 text-xs font-black border border-emerald-200">
                <Utensils className="w-4 h-4 text-emerald-600" />
                <span>Pedoman Gizi Seimbang Kemenkes RI & GERMAS</span>
              </div>
              <a 
                href="https://ayosehat.kemkes.go.id/isi-piringku-pedoman-makan-kekinian-orang-indonesia" 
                target="_blank" 
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-700 hover:text-emerald-800 hover:underline"
              >
                <span>Sumber: Ayo Sehat Kemenkes</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>

            <h2 className="text-2xl sm:text-4xl font-black text-slate-900 leading-tight">
              Isi Piringku: <span className="text-emerald-600">Pedoman Makan Kekinian</span> Orang Indonesia
            </h2>

            <p className="text-xs sm:text-base text-slate-600 leading-relaxed max-w-4xl font-normal">
              Pedoman <strong>'Isi Piringku'</strong> membagi porsi 1 piring makan sekali konsumsi menjadi 4 kelompok utama: <strong>Makanan Pokok</strong> (karbohidrat), <strong>Lauk-Pauk</strong> (protein), <strong>Sayur-Sayuran</strong>, dan <strong>Buah-Buahan</strong>, dilengkapi dengan hidrasi air putih, aktivitas fisik, dan cuci tangan pakai sabun.
            </p>

            {/* VISUAL PORSI SCHEME */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 pt-2">
              <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-200 flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-amber-500 text-white font-black text-xs flex items-center justify-center shrink-0">
                  2/3
                </div>
                <div>
                  <span className="text-xs font-black text-amber-900 block">Makanan Pokok</span>
                  <span className="text-[11px] text-amber-700">2/3 dari 1/2 piring</span>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-rose-500/10 border border-rose-200 flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-rose-500 text-white font-black text-xs flex items-center justify-center shrink-0">
                  1/3
                </div>
                <div>
                  <span className="text-xs font-black text-rose-900 block">Lauk-Pauk</span>
                  <span className="text-[11px] text-rose-700">1/3 dari 1/2 piring</span>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-200 flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-emerald-500 text-white font-black text-xs flex items-center justify-center shrink-0">
                  2/3
                </div>
                <div>
                  <span className="text-xs font-black text-emerald-900 block">Sayur-Sayuran</span>
                  <span className="text-[11px] text-emerald-700">2/3 dari 1/2 piring</span>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-orange-500/10 border border-orange-200 flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-orange-500 text-white font-black text-xs flex items-center justify-center shrink-0">
                  1/3
                </div>
                <div>
                  <span className="text-xs font-black text-orange-900 block">Buah-Buahan</span>
                  <span className="text-[11px] text-orange-700">1/3 dari 1/2 piring</span>
                </div>
              </div>
            </div>
          </div>

          {/* 4 KUADRAN ISI PIRINGKU DETAIL */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* 1. MAKANAN POKOK */}
            <div className="glass-card p-6 sm:p-8 rounded-3xl bg-white border-amber-200 space-y-4 shadow-sm hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-2xl bg-amber-100 text-amber-700 flex items-center justify-center font-bold">
                    <Wheat className="w-6 h-6" />
                  </div>
                  <div>
                    <span className="text-[11px] font-extrabold px-2.5 py-0.5 rounded-full bg-amber-100 text-amber-800">
                      2/3 dari 1/2 Piring
                    </span>
                    <h3 className="text-xl font-black text-slate-900 mt-1">Makanan Pokok</h3>
                  </div>
                </div>
                <span className="text-xs font-bold text-amber-600 bg-amber-50 px-2.5 py-1 rounded-xl">
                  Sumber Karbohidrat
                </span>
              </div>

              <p className="text-xs text-slate-600 leading-relaxed">
                Pangan berkarbohidrat yang menjadi sumber energi utama beraktivitas dan belajar. Beragam sesuai kearifan lokal Nusantara.
              </p>

              <div className="p-4 rounded-2xl bg-amber-50 border border-amber-100 space-y-2">
                <span className="text-xs font-black text-amber-900 block flex items-center gap-1.5">
                  <Info className="w-3.5 h-3.5 text-amber-600" /> Standar 1 Porsi Makan (150 gr Nasi):
                </span>
                <ul className="text-xs text-slate-700 space-y-1 pl-4 list-disc">
                  <li><strong>3 centong nasi</strong> (150 gram)</li>
                  <li><strong>3 buah kentang sedang</strong> (300 gram)</li>
                  <li><strong>1 ½ gelas mie kering</strong> (75 gram)</li>
                </ul>
              </div>

              <div className="space-y-1.5">
                <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block">
                  Pilihan Makanan Pokok:
                </span>
                <p className="text-xs text-slate-700 font-medium">
                  Beras Putih, Beras Merah, Singkong, Ubi Jalar, Jagung, Sagu, Bihun, Mie, Kentang, Biji Gandum, Roti, Pasta.
                </p>
              </div>
            </div>

            {/* 2. LAUK PAUK */}
            <div className="glass-card p-6 sm:p-8 rounded-3xl bg-white border-rose-200 space-y-4 shadow-sm hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-2xl bg-rose-100 text-rose-700 flex items-center justify-center font-bold">
                    <Fish className="w-6 h-6" />
                  </div>
                  <div>
                    <span className="text-[11px] font-extrabold px-2.5 py-0.5 rounded-full bg-rose-100 text-rose-800">
                      1/3 dari 1/2 Piring
                    </span>
                    <h3 className="text-xl font-black text-slate-900 mt-1">Lauk-Pauk</h3>
                  </div>
                </div>
                <span className="text-xs font-bold text-rose-600 bg-rose-50 px-2.5 py-1 rounded-xl">
                  Sumber Protein
                </span>
              </div>

              <p className="text-xs text-slate-600 leading-relaxed">
                Kombinasi sumber <strong>protein hewani</strong> dan <strong>protein nabati</strong> untuk pembentukan jaringan sel, perbaikan otot, dan imunitas tubuh.
              </p>

              <div className="p-4 rounded-2xl bg-rose-50 border border-rose-100 space-y-2">
                <span className="text-xs font-black text-rose-900 block flex items-center gap-1.5">
                  <Info className="w-3.5 h-3.5 text-rose-600" /> Contoh Takaran Porsi Sekali Makan:
                </span>
                <ul className="text-xs text-slate-700 space-y-1 pl-4 list-disc">
                  <li><strong>Hewani:</strong> 75 gr ikan kembung = 2 potong ayam tanpa kulit (80 gr) = 1 butir telur ayam besar (55 gr) = 2 potong daging sapi (70 gr).</li>
                  <li><strong>Nabati:</strong> 100 gr tahu = 2 potong sedang tempe (50 gr) = kacang-kacangan.</li>
                </ul>
              </div>

              <div className="space-y-1.5">
                <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block">
                  Ragam Pilihan Protein:
                </span>
                <p className="text-xs text-slate-700 font-medium">
                  Ikan & hasil laut, Ayam, Daging Sapi, Telur, Susu, Tempe, Tahu, Kacang Tanah, Kacang Hijau, Kacang Merah, Kacang Tolo.
                </p>
              </div>
            </div>

            {/* 3. SAYUR-SAYURAN */}
            <div className="glass-card p-6 sm:p-8 rounded-3xl bg-white border-emerald-200 space-y-4 shadow-sm hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold">
                    <Salad className="w-6 h-6" />
                  </div>
                  <div>
                    <span className="text-[11px] font-extrabold px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800">
                      2/3 dari 1/2 Piring
                    </span>
                    <h3 className="text-xl font-black text-slate-900 mt-1">Sayur-Sayuran</h3>
                  </div>
                </div>
                <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-xl">
                  Vitamin & Mineral
                </span>
              </div>

              <p className="text-xs text-slate-600 leading-relaxed">
                Sumber serat alami, karoten, Vitamin A, Vitamin C, zat besi, dan fosfor yang berfungsi sebagai antioksidan alami tubuh.
              </p>

              <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-100 space-y-2">
                <span className="text-xs font-black text-emerald-900 block flex items-center gap-1.5">
                  <Info className="w-3.5 h-3.5 text-emerald-600" /> Standar Porsi Sekali Makan:
                </span>
                <p className="text-xs text-slate-700 font-semibold">
                  <strong>150 gram sayuran = 1 mangkok sedang</strong> (dikukus, direbus, ditumis, atau lalapan segar higienis).
                </p>
              </div>

              <div className="space-y-1.5">
                <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block">
                  Ragam Pilihan Sayuran:
                </span>
                <p className="text-xs text-slate-700 font-medium">
                  Bayam, Kangkung, Brokoli, Wortel, Daun Singkong, Buncis, Kembang Kol, Labu Siam, Tomat, Ketimun, Terong, Rebung, Lobak, Kol, Pare.
                </p>
              </div>
            </div>

            {/* 4. BUAH-BUAHAN */}
            <div className="glass-card p-6 sm:p-8 rounded-3xl bg-white border-orange-200 space-y-4 shadow-sm hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-2xl bg-orange-100 text-orange-700 flex items-center justify-center font-bold">
                    <Apple className="w-6 h-6" />
                  </div>
                  <div>
                    <span className="text-[11px] font-extrabold px-2.5 py-0.5 rounded-full bg-orange-100 text-orange-800">
                      1/3 dari 1/2 Piring
                    </span>
                    <h3 className="text-xl font-black text-slate-900 mt-1">Buah-Buahan</h3>
                  </div>
                </div>
                <span className="text-xs font-bold text-orange-600 bg-orange-50 px-2.5 py-1 rounded-xl">
                  Vitamin & Antioksidan
                </span>
              </div>

              <p className="text-xs text-slate-600 leading-relaxed">
                Sumber kaya Vitamin (Vit A, B, B1, B6, C), serat larut air, serta mineral yang menjaga kebugaran sel organ dan peremajaan kulit.
              </p>

              <div className="p-4 rounded-2xl bg-orange-50 border border-orange-100 space-y-2">
                <span className="text-xs font-black text-orange-900 block flex items-center gap-1.5">
                  <Info className="w-3.5 h-3.5 text-orange-600" /> Standar Porsi Sekali Makan:
                </span>
                <ul className="text-xs text-slate-700 space-y-1 pl-4 list-disc">
                  <li><strong>150 gr Pepaya</strong> = 2 potong sedang</li>
                  <li><strong>2 buah jeruk sedang</strong> (110 gram)</li>
                  <li><strong>1 buah kecil pisang ambon</strong> (50 gram)</li>
                </ul>
              </div>

              <div className="space-y-1.5">
                <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block">
                  Ragam Buah Segar:
                </span>
                <p className="text-xs text-slate-700 font-medium">
                  Pepaya, Jeruk, Pisang, Semangka, Melon, Apel, Mangga, Belimbing, Salak, Duku, Jambu Air, Rambutan.
                </p>
              </div>
            </div>

          </div>

          {/* 3 PILAR PENDUKUNG ISI PIRINGKU (GERMAS) */}
          <div className="space-y-6 pt-4">
            <div className="text-center max-w-2xl mx-auto space-y-2">
              <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
                3 Pilar Pendukung Isi Piringku
              </h3>
              <p className="text-xs sm:text-sm text-slate-500">
                Makan sehat harus diimbangi dengan hidrasi cukup, aktivitas fisik, dan kebersihan diri
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              
              {/* PILAR 1: MINUM AIR 8 GELAS SEHARI */}
              <div className="glass-card p-6 rounded-3xl bg-white border-sky-200 space-y-4 shadow-sm flex flex-col justify-between">
                <div className="space-y-3">
                  <div className="w-12 h-12 rounded-2xl bg-sky-100 text-sky-600 flex items-center justify-center font-bold">
                    <Droplets className="w-6 h-6" />
                  </div>
                  <h4 className="text-lg font-extrabold text-slate-900">1. Minum Air 8 Gelas Sehari</h4>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Kandungan air dalam tubuh manusia sekitar <strong>60% - 70%</strong> dari berat badan. Air putih adalah minuman paling sehat dan alami untuk metabolisme.
                  </p>

                  <div className="p-3 rounded-2xl bg-sky-50 text-xs text-sky-900 space-y-1 border border-sky-100">
                    <span className="font-bold block text-sky-950">Syarat Air Minum Sehat (Kepmenkes):</span>
                    <p className="text-[11px] leading-relaxed text-sky-800">
                      Tidak berasa, tidak berbau, tidak berwarna, bebas mikroorganisme patogen, dan bebas logam berat.
                    </p>
                  </div>

                  <div className="space-y-1.5 pt-1">
                    <span className="text-[11px] font-bold text-sky-700 uppercase tracking-wider block">
                      Manfaat Rutin 8 Gelas:
                    </span>
                    <ul className="text-xs text-slate-600 space-y-1">
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-sky-500 shrink-0 mt-0.5" />
                        <span>Memelihara fungsi ginjal & detoksifikasi</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-sky-500 shrink-0 mt-0.5" />
                        <span>Mencegah dehidrasi & menjaga fokus</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-sky-500 shrink-0 mt-0.5" />
                        <span>Melancarkan pencernaan & merawat kulit</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-sky-500 shrink-0 mt-0.5" />
                        <span>Membantu mengontrol kalori tubuh</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* PILAR 2: AKTIVITAS FISIK 30 MENIT */}
              <div className="glass-card p-6 rounded-3xl bg-white border-amber-200 space-y-4 shadow-sm flex flex-col justify-between">
                <div className="space-y-3">
                  <div className="w-12 h-12 rounded-2xl bg-amber-100 text-amber-600 flex items-center justify-center font-bold">
                    <Activity className="w-6 h-6" />
                  </div>
                  <h4 className="text-lg font-extrabold text-slate-900">2. Aktivitas Fisik Minimal 30 Menit</h4>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Setiap gerakan tubuh yang diakibatkan kerja otot rangka dan meningkatkan pengeluaran energi harian.
                  </p>

                  <div className="p-3 rounded-2xl bg-amber-50 border border-amber-100 space-y-2">
                    <div>
                      <span className="text-[11px] font-black text-amber-900 block">Aktivitas Ringan:</span>
                      <p className="text-[11px] text-amber-800">
                        Jalan santai, belajar/mengetik, menyapu, menyetrika, peregangan ringan, main musik.
                      </p>
                    </div>
                    <div className="pt-1 border-t border-amber-200/60">
                      <span className="text-[11px] font-black text-amber-900 block">Aktivitas Sedang:</span>
                      <p className="text-[11px] text-amber-800">
                        Jalan cepat, senam, bersepeda, mengepel lantai, berkebun, memindahkan perabot.
                      </p>
                    </div>
                  </div>

                  <div className="p-3 rounded-2xl bg-emerald-50 text-center border border-emerald-200">
                    <span className="text-xs font-black text-emerald-800 flex items-center justify-center gap-1.5">
                      <Timer className="w-4 h-4 text-emerald-600" /> Lakukan Minimal 30 Menit Tiap Hari!
                    </span>
                  </div>
                </div>
              </div>

              {/* PILAR 3: 5 LANGKAH CTPS 20 DETIK */}
              <div className="glass-card p-6 rounded-3xl bg-white border-teal-200 space-y-4 shadow-sm flex flex-col justify-between">
                <div className="space-y-3">
                  <div className="w-12 h-12 rounded-2xl bg-teal-100 text-teal-600 flex items-center justify-center font-bold">
                    <ShieldCheck className="w-6 h-6" />
                  </div>
                  <h4 className="text-lg font-extrabold text-slate-900">3. Cuci Tangan Pakai Sabun (CTPS)</h4>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Lakukan <strong>5 Langkah CTPS dengan Air Mengalir selama 20 Detik</strong> sebelum & sesudah makan:
                  </p>

                  <ol className="text-xs text-slate-700 space-y-2 font-medium">
                    <li className="flex items-start gap-2 bg-teal-50/70 p-2 rounded-xl border border-teal-100">
                      <span className="w-5 h-5 rounded-full bg-teal-600 text-white text-[10px] font-black flex items-center justify-center shrink-0">1</span>
                      <span>Basahi tangan seluruhnya dengan air bersih mengalir.</span>
                    </li>
                    <li className="flex items-start gap-2 bg-teal-50/70 p-2 rounded-xl border border-teal-100">
                      <span className="w-5 h-5 rounded-full bg-teal-600 text-white text-[10px] font-black flex items-center justify-center shrink-0">2</span>
                      <span>Gosok sabun ke telapak, punggung tangan, dan sela jari.</span>
                    </li>
                    <li className="flex items-start gap-2 bg-teal-50/70 p-2 rounded-xl border border-teal-100">
                      <span className="w-5 h-5 rounded-full bg-teal-600 text-white text-[10px] font-black flex items-center justify-center shrink-0">3</span>
                      <span>Bersihkan bawah kuku & gosok sela-sela jari tangan.</span>
                    </li>
                    <li className="flex items-start gap-2 bg-teal-50/70 p-2 rounded-xl border border-teal-100">
                      <span className="w-5 h-5 rounded-full bg-teal-600 text-white text-[10px] font-black flex items-center justify-center shrink-0">4</span>
                      <span>Bilas tangan dengan air bersih mengalir hingga tuntas.</span>
                    </li>
                    <li className="flex items-start gap-2 bg-teal-50/70 p-2 rounded-xl border border-teal-100">
                      <span className="w-5 h-5 rounded-full bg-teal-600 text-white text-[10px] font-black flex items-center justify-center shrink-0">5</span>
                      <span>Keringkan dengan handuk/tisu bersih atau dianginkan.</span>
                    </li>
                  </ol>
                </div>
              </div>

            </div>
          </div>

        </div>
      )}

      {/* TAB: 10 KEBIASAAN PHBS */}
      {activeTab === 'phbs' && (
        <div id="phbs" className="space-y-8 animate-fadeIn">
          <div className="glass-card p-8 rounded-3xl bg-white border-sky-100 space-y-4 text-center max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-sky-100 text-sky-700 text-xs font-bold border border-sky-200">
              <ShieldCheck className="w-4 h-4 text-sky-500" />
              <span>Modul PHBS Terintegrasi</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900">10 Kebiasaan PHBS Siswa</h2>
            <p className="text-sm text-slate-600">
              Perilaku Hidup Bersih dan Sehat (PHBS) adalah kunci utama menjaga kesehatan diri sendiri, sekolah, dan lingkungan sekitarmu!
            </p>
          </div>

          {/* SEARCH & CATEGORY FILTER */}
          <div className="glass-card p-6 rounded-3xl bg-white border-sky-100 flex flex-col md:flex-row items-center justify-between gap-4 shadow-sm">
            <div className="relative w-full md:w-80">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
              <input
                type="text"
                value={phbsSearchQuery}
                onChange={(e) => setPhbsSearchQuery(e.target.value)}
                placeholder="Cari kebiasaan PHBS..."
                className="w-full pl-10 pr-4 py-2.5 rounded-2xl bg-slate-50 border border-sky-100 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:bg-white transition-all"
              />
            </div>

            <div className="flex items-center gap-2 w-full md:w-auto overflow-x-auto no-scrollbar py-1">
              {['Semua', 'Kebersihan Diri', 'Nutrisi & Lingkungan', 'Kebiasaan Sehat & Paru'].map((cat) => (
                <button
                  key={cat}
                  onClick={() => setPhbsSelectedCategory(cat)}
                  className={`px-4 py-2 rounded-full text-xs font-bold shrink-0 transition-all ${
                    phbsSelectedCategory === cat
                      ? 'bg-sky-500 text-white shadow-md shadow-sky-500/20'
                      : 'bg-slate-50 text-slate-600 hover:bg-sky-50 hover:text-sky-600 border border-slate-200'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* 10 PHBS HABITS GRID */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {filteredPhbs.map((item) => (
              <div 
                key={item.number} 
                className="glass-card rounded-3xl bg-white border-sky-100 glass-card-hover overflow-hidden shadow-md shadow-sky-500/5 flex flex-col justify-between"
              >
                <div className="relative h-56 w-full border-b border-sky-100">
                  <Image
                    src={item.imageSrc}
                    alt={item.title}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-slate-900/20 to-transparent"></div>
                  <div className="absolute top-4 left-4 w-10 h-10 rounded-2xl bg-sky-500 text-white font-black text-base flex items-center justify-center shadow-md">
                    #{item.number}
                  </div>
                  <div className="absolute bottom-3 left-4 right-4">
                    <span className="inline-block px-3 py-1 rounded-full bg-white/90 text-sky-800 font-extrabold text-[11px] backdrop-blur-md mb-1">
                      {item.category}
                    </span>
                    <h3 className="text-lg font-extrabold text-white drop-shadow-md">{item.title}</h3>
                  </div>
                </div>

                <div className="p-6 space-y-4 flex-1">
                  <p className="text-xs text-slate-600 leading-relaxed font-normal">{item.desc}</p>

                  <div className="pt-3 border-t border-sky-50 space-y-2">
                    <span className="text-[11px] font-bold text-sky-600 uppercase tracking-wider block">
                      Tindakan Praktis Siswa:
                    </span>
                    <ul className="space-y-1.5 text-xs text-slate-600">
                      {item.actionList.map((action, actIdx) => (
                        <li key={actIdx} className="flex items-start gap-2">
                          <CheckCircle2 className="w-3.5 h-3.5 text-sky-500 shrink-0 mt-0.5" />
                          <span>{action}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB: BAHAYA ROKOK (P2PTM KEMENKES RI) */}
      {activeTab === 'rokok' && (
        <div id="rokok" className="space-y-8 animate-fadeIn">
          
          {/* HEADER BAHAYA ROKOK */}
          <div className="glass-card p-6 sm:p-10 rounded-3xl bg-gradient-to-br from-rose-500/10 via-white to-amber-500/10 border-rose-100 space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-rose-100 text-rose-800 text-xs font-black border border-rose-200">
                <ShieldAlert className="w-4 h-4 text-rose-600" />
                <span>P2PTM Kementerian Kesehatan RI</span>
              </div>
              <a 
                href="https://ayosehat.kemkes.go.id/dampak-buruk-rokok-bagi-perokok-aktif-dan-pasif" 
                target="_blank" 
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 text-xs font-bold text-rose-700 hover:text-rose-800 hover:underline"
              >
                <span>Sumber: Ayo Sehat Kemenkes</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>

            <h2 className="text-2xl sm:text-4xl font-black text-slate-900 leading-tight">
              Dampak Buruk Rokok Bagi <span className="text-rose-600">Perokok Aktif & Pasif</span>
            </h2>

            <p className="text-xs sm:text-base text-slate-600 leading-relaxed max-w-4xl font-normal">
              Di dalam satu batang rokok terkandung <strong>lebih dari 4.000 jenis bahan kimia berbahaya</strong> bagi tubuh. Merokok merupakan kegiatan yang berdampak buruk tidak hanya bagi diri sendiri, tetapi juga orang lain atau keluarga yang ada di sekitarnya baik dalam waktu singkat maupun jangka panjang.
            </p>

            {/* PEROKOK AKTIF VS PASIF COMPARISON */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
              <div className="p-4 rounded-2xl bg-rose-50 border border-rose-200 space-y-1.5">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-rose-500"></span>
                  <h4 className="text-xs font-black text-rose-900">Perokok Aktif</h4>
                </div>
                <p className="text-[11px] text-slate-700 leading-relaxed">
                  Menghisap langsung asap utama (<em>mainstream smoke</em>). Racun nikotin dan tar langsung diserap alveolus paru-paru dan masuk ke peredaran darah, merusak elastisitas pembuluh darah.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 space-y-1.5">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-amber-500"></span>
                  <h4 className="text-xs font-black text-amber-900">Perokok Pasif (Secondhand Smoke)</h4>
                </div>
                <p className="text-[11px] text-slate-700 leading-relaxed">
                  Menghirup asap sampingan (<em>sidestream smoke</em>) dari ujung rokok yang menyala. Asap ini memiliki konsentrasi zat karsinogenik lebih pekat karena tanpa filter!
                </p>
              </div>
            </div>
          </div>

          {/* 7 DAMPAK BURUK ROKOK (KEMENKES) */}
          <div className="space-y-4">
            <div className="text-center max-w-2xl mx-auto space-y-1.5">
              <h3 className="text-xl sm:text-2xl font-extrabold text-slate-900">
                7 Dampak Buruk Utama Rokok Bagi Kesehatan
              </h3>
              <p className="text-xs text-slate-500">
                Berdasarkan rilis resmi Pencegahan dan Pengendalian Penyakit Tidak Menular (P2PTM) Kemenkes RI
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 pt-2">
              
              {/* 1. PARU-PARU */}
              <div className="glass-card p-5 rounded-3xl bg-white border-rose-100 space-y-2 hover:shadow-md transition-shadow">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-xl bg-rose-100 text-rose-700 flex items-center justify-center font-black text-xs">
                    1
                  </div>
                  <h4 className="text-sm font-bold text-slate-900">Penyakit Paru Kronis</h4>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Menghancurkan silia penyaring saluran napas, memicu bronkitis kronis, emfisema, PPOK, dan kanker paru-paru mematikan.
                </p>
              </div>

              {/* 2. GIGI & MULUT */}
              <div className="glass-card p-5 rounded-3xl bg-white border-amber-100 space-y-2 hover:shadow-md transition-shadow">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center font-black text-xs">
                    2
                  </div>
                  <h4 className="text-sm font-bold text-slate-900">Merusak Gigi & Bau Mulut</h4>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Endapan tar mengubah warna email gigi menjadi kuning gelap, memicu karies gigi, radang gusi, serta bau mulut kronis.
                </p>
              </div>

              {/* 3. STROKE & JANTUNG */}
              <div className="glass-card p-5 rounded-3xl bg-white border-rose-100 space-y-2 hover:shadow-md transition-shadow">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-xl bg-rose-100 text-rose-700 flex items-center justify-center font-black text-xs">
                    3
                  </div>
                  <h4 className="text-sm font-bold text-slate-900">Stroke & Serangan Jantung</h4>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Nikotin menyempitkan lumen pembuluh darah (arteri), memicu plak aterosklerosis, dan melipatgandakan risiko serangan jantung & stroke.
                </p>
              </div>

              {/* 4. TULANG */}
              <div className="glass-card p-5 rounded-3xl bg-white border-indigo-100 space-y-2 hover:shadow-md transition-shadow">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-xl bg-indigo-100 text-indigo-700 flex items-center justify-center font-black text-xs">
                    4
                  </div>
                  <h4 className="text-sm font-bold text-slate-900">Tulang Mudah Patah</h4>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Zat racun rokok menghambat penyerapan kalsium, menurunkan densitas mineral tulang, dan mempercepat osteoporosis dini.
                </p>
              </div>

              {/* 5. MATA & KATARAK */}
              <div className="glass-card p-5 rounded-3xl bg-white border-sky-100 space-y-2 hover:shadow-md transition-shadow">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-xl bg-sky-100 text-sky-700 flex items-center justify-center font-black text-xs">
                    5
                  </div>
                  <h4 className="text-sm font-bold text-slate-900">Gangguan Mata & Katarak</h4>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Stres oksidatif akibat asap rokok merusak jaringan lensa mata, meningkatkan risiko katarak dan degenerasi makula.
                </p>
              </div>

              {/* 6. KANKER SERVIKS & KEGUGURAN */}
              <div className="glass-card p-5 rounded-3xl bg-white border-pink-100 space-y-2 hover:shadow-md transition-shadow">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-xl bg-pink-100 text-pink-700 flex items-center justify-center font-black text-xs">
                    6
                  </div>
                  <h4 className="text-sm font-bold text-slate-900">Kanker Serviks & Gangguan Janin</h4>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Menyebabkan kanker leher rahim pada wanita serta meningkatkan risiko keguguran, kelahiran prematur, dan stunting pada janin.
                </p>
              </div>

              {/* 7. KERONTOKAN RAMBUT & KULIT */}
              <div className="glass-card p-5 rounded-3xl bg-white border-emerald-100 space-y-2 hover:shadow-md transition-shadow sm:col-span-2 lg:col-span-3">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center font-black text-xs">
                    7
                  </div>
                  <h4 className="text-sm font-bold text-slate-900">Menyebabkan Kerontokan Rambut & Penuaan Dini</h4>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Racun kimia melemahkan sistem kekebalan folikel rambut, merusak serat kolagen kulit, dan menyebabkan kebotakan serta kulit keriput lebih cepat.
                </p>
              </div>

            </div>
          </div>

          {/* FAKTA MENGEJUTKAN & QUITLINE KEMENKES */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            
            {/* STATS */}
            <div className="lg:col-span-7 glass-card p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-rose-50 via-sky-50 to-indigo-50 border-sky-100 space-y-4">
              <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                <Zap className="w-5 h-5 text-amber-500" /> Fakta Mengejutkan Rokok
              </h3>
              <div className="grid grid-cols-2 gap-3 pt-1">
                <div className="p-3.5 rounded-2xl bg-white border border-sky-100 shadow-xs">
                  <span className="text-xl sm:text-2xl font-black text-rose-500 block">4.000+</span>
                  <p className="text-[11px] text-slate-600 mt-0.5">Zat kimia berbahaya & karsinogenik dalam 1 batang rokok</p>
                </div>
                <div className="p-3.5 rounded-2xl bg-white border border-sky-100 shadow-xs">
                  <span className="text-xl sm:text-2xl font-black text-amber-500 block">11 Menit</span>
                  <p className="text-[11px] text-slate-600 mt-0.5">Harapan hidup berkurang setiap 1 batang rokok dihisap</p>
                </div>
                <div className="p-3.5 rounded-2xl bg-white border border-sky-100 shadow-xs">
                  <span className="text-xl sm:text-2xl font-black text-indigo-500 block">225.700</span>
                  <p className="text-[11px] text-slate-600 mt-0.5">Jiwa di Indonesia meninggal akibat rokok tiap tahunnya</p>
                </div>
                <div className="p-3.5 rounded-2xl bg-white border border-sky-100 shadow-xs">
                  <span className="text-xl sm:text-2xl font-black text-emerald-500 block">50% Turun</span>
                  <p className="text-[11px] text-slate-600 mt-0.5">Risiko serangan jantung turun drastis 1 tahun setelah berhenti</p>
                </div>
              </div>
            </div>

            {/* QUIT-LINE CALLOUT */}
            <div className="lg:col-span-5 glass-card p-6 sm:p-8 rounded-3xl bg-emerald-600 text-white space-y-4 flex flex-col justify-between shadow-lg shadow-emerald-600/20">
              <div className="space-y-2">
                <span className="inline-block px-3 py-1 rounded-full bg-white/20 text-white text-[11px] font-extrabold backdrop-blur-md">
                  Layanan Bantuan Resmi
                </span>
                <h4 className="text-lg font-black text-white leading-snug">
                  Quit-line Berhenti Merokok Kemenkes RI
                </h4>
                <p className="text-xs text-emerald-100 leading-relaxed font-normal">
                  Butuh bantuan atau konsultasi untuk berhenti merokok? Layanan bebas pulsa resmi dari Kementerian Kesehatan RI siap mendampingimu:
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-white/10 border border-white/20 space-y-1">
                <span className="text-xs font-bold text-emerald-200 block">Telepon Bebas Pulsa:</span>
                <span className="text-2xl font-black text-white tracking-wider block">0-800-177-6565</span>
                <span className="text-[11px] text-emerald-100 block">Senin – Sabtu | Pukul 08.00 s.d 16.00 WIB</span>
              </div>
            </div>

          </div>

        </div>
      )}

      {/* TAB: KESEHATAN MENSTRUASI */}
      {activeTab === 'menstruasi' && (
        <div id="menstruasi" className="space-y-8 animate-fadeIn">
          
          {/* HEADER MENSTRUASI */}
          <div className="glass-card p-6 sm:p-10 rounded-3xl bg-gradient-to-br from-pink-500/10 via-white to-purple-500/10 border-pink-100 space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-pink-100 text-pink-800 text-xs font-black border border-pink-200">
                <HeartHandshake className="w-4 h-4 text-pink-600" />
                <span>Kesehatan Reproduksi Remaja Putri</span>
              </div>
              <span className="inline-flex items-center gap-1.5 text-xs font-bold text-pink-700 bg-pink-50 px-3 py-1 rounded-full border border-pink-100">
                <span>Sumber Materi: Prompt ChatGPT</span>
              </span>
            </div>

            <h2 className="text-2xl sm:text-4xl font-black text-slate-900 leading-tight">
              Siklus Menstruasi: <span className="text-pink-600">Memahami Tubuh Kita</span>, Menjaga Kesehatan Kita
            </h2>

            <p className="text-xs sm:text-base text-slate-600 leading-relaxed max-w-4xl font-normal">
              Siklus menstruasi adalah proses biologis dan perubahan alami pada tubuh perempuan setiap bulan. Rata-rata siklus berlangsung <strong>21 hingga 35 hari</strong> (rata-rata 28 hari) dengan durasi haid 3–7 hari.
            </p>
          </div>

          {/* POSTER INFOGRAFIS UTAMA SIKLUS MENSTRUASI */}
          <div className="glass-card p-4 sm:p-6 rounded-3xl bg-white border-pink-100 shadow-md shadow-pink-500/5 space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-base sm:text-lg font-bold text-slate-900">Infografis Resmi Siklus Menstruasi</h3>
                <p className="text-xs text-slate-500">Panduan visual 4 fase siklus haid, tahukah kamu, dan tips menjaga kesehatan</p>
              </div>
              <span className="text-[11px] font-extrabold px-3 py-1 rounded-full bg-pink-50 text-pink-700 border border-pink-200 hidden sm:inline-block">
                Ilustrasi Interaktif
              </span>
            </div>

            <div className="relative w-full h-[320px] sm:h-[480px] md:h-[620px] lg:h-[720px] rounded-2xl overflow-hidden border border-pink-100 bg-pink-50/50 shadow-inner">
              <Image
                src="/menstruasi_poster.jpeg"
                alt="Infografis Siklus Menstruasi"
                fill
                className="object-contain"
                priority
              />
            </div>
          </div>

          {/* 4 FASE SIKLUS MENSTRUASI */}
          <div className="space-y-4">
            <div className="text-center max-w-2xl mx-auto space-y-1.5">
              <h3 className="text-xl sm:text-2xl font-extrabold text-slate-900">
                4 Fase dalam Siklus Menstruasi
              </h3>
              <p className="text-xs text-slate-500">
                Perubahan hormonal dan fisiologis yang terjadi sepanjang 1 siklus bulanan
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-2">
              
              {/* 1. MENSTRUASI */}
              <div className="glass-card p-5 rounded-3xl bg-white border-rose-200 space-y-2 hover:shadow-md transition-shadow">
                <div className="flex items-center justify-between">
                  <span className="w-7 h-7 rounded-xl bg-rose-500 text-white font-black text-xs flex items-center justify-center">1</span>
                  <span className="text-[11px] font-bold text-rose-700 bg-rose-50 px-2 py-0.5 rounded-full">Hari 1 – 5</span>
                </div>
                <h4 className="text-base font-bold text-slate-900">Fase Menstruasi</h4>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Dinding rahim meluruh dan keluar melalui vagina dalam bentuk darah haid karena sel telur tidak dibuahi.
                </p>
              </div>

              {/* 2. FOLIKULER */}
              <div className="glass-card p-5 rounded-3xl bg-white border-amber-200 space-y-2 hover:shadow-md transition-shadow">
                <div className="flex items-center justify-between">
                  <span className="w-7 h-7 rounded-xl bg-amber-500 text-white font-black text-xs flex items-center justify-center">2</span>
                  <span className="text-[11px] font-bold text-amber-700 bg-amber-50 px-2 py-0.5 rounded-full">Hari 6 – 13</span>
                </div>
                <h4 className="text-base font-bold text-slate-900">Fase Folikuler</h4>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Tubuh mempersiapkan sel telur baru di dalam ovarium (indung telur). Dinding rahim mulai menebal kembali.
                </p>
              </div>

              {/* 3. OVULASI */}
              <div className="glass-card p-5 rounded-3xl bg-white border-emerald-200 space-y-2 hover:shadow-md transition-shadow">
                <div className="flex items-center justify-between">
                  <span className="w-7 h-7 rounded-xl bg-emerald-500 text-white font-black text-xs flex items-center justify-center">3</span>
                  <span className="text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full">Hari 14 (Sekitar)</span>
                </div>
                <h4 className="text-base font-bold text-slate-900">Fase Ovulasi</h4>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Sel telur matang dilepaskan dari ovarium menuju tuba falopi. Ini adalah masa paling subur dalam 1 siklus.
                </p>
              </div>

              {/* 4. LUTEAL */}
              <div className="glass-card p-5 rounded-3xl bg-white border-sky-200 space-y-2 hover:shadow-md transition-shadow">
                <div className="flex items-center justify-between">
                  <span className="w-7 h-7 rounded-xl bg-sky-500 text-white font-black text-xs flex items-center justify-center">4</span>
                  <span className="text-[11px] font-bold text-sky-700 bg-sky-50 px-2 py-0.5 rounded-full">Hari 15 – 28</span>
                </div>
                <h4 className="text-base font-bold text-slate-900">Fase Luteal</h4>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Lapisan rahim semakin menebal. Jika sel telur tidak dibuahi sperma, lapisan ini akan luruh kembali ke hari pertama.
                </p>
              </div>

            </div>
          </div>

          {/* TAHUKAH KAMU & TIPS KESEHATAN MENSTRUASI */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* TAHUKAH KAMU & CATATAN */}
            <div className="glass-card p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-pink-50 to-purple-50 border border-pink-100 space-y-4">
              <h3 className="text-lg font-bold text-pink-900 flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-pink-500" /> Tahukah Kamu?
              </h3>
              <ul className="space-y-2.5 text-xs text-slate-700">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-pink-500 shrink-0 mt-0.5" />
                  <span>Siklus dihitung dari hari pertama darah haid keluar sampai sebelum haid berikutnya.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-pink-500 shrink-0 mt-0.5" />
                  <span>Rata-rata panjang siklus adalah 28 hari, dan durasi haid biasanya 3–7 hari.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-pink-500 shrink-0 mt-0.5" />
                  <span>Warna darah haid bisa bervariasi: merah terang, merah gelap, atau kecokelatan — semua normal!</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-pink-500 shrink-0 mt-0.5" />
                  <span>Siklus setiap remaja perempuan bisa berbeda, wajar jika lebih cepat atau lebih lambat.</span>
                </li>
              </ul>
            </div>

            {/* TIPS MENJAGA KESEHATAN */}
            <div className="glass-card p-6 sm:p-8 rounded-3xl bg-white border border-pink-100 space-y-4">
              <h3 className="text-lg font-bold text-slate-900">
                Tips Menjaga Kesehatan Saat Menstruasi
              </h3>
              <ul className="space-y-2.5 text-xs text-slate-700">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                  <span><strong>Makan bergizi:</strong> Cukupi zat besi (bayam, telur, daging) untuk cegah anemia.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-sky-500 shrink-0 mt-0.5" />
                  <span><strong>Minum air putih cukup:</strong> Menjaga hidrasi dan meredakan kram perut.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-indigo-500 shrink-0 mt-0.5" />
                  <span><strong>Istirahat yang cukup:</strong> Tidur 8–9 jam di malam hari.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                  <span><strong>Olahraga ringan:</strong> Jalan santai atau peregangan untuk membuat mood lebih baik.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-pink-500 shrink-0 mt-0.5" />
                  <span><strong>Ganti pembalut teratur:</strong> Minimal setiap 4–6 jam sekali untuk menjaga kebersihan.</span>
                </li>
              </ul>
            </div>

          </div>

          {/* MOTIVASI BANNER */}
          <div className="p-4 sm:p-6 rounded-2xl bg-pink-500 text-white text-center text-xs sm:text-sm font-bold shadow-md shadow-pink-500/20">
            🌸 "Kenali siklusmu, rawat dirimu, dan jangan ragu untuk bertanya kepada orang tua atau guru jika ada yang membuatmu khawatir."
          </div>

        </div>
      )}

      {/* TAB: POLA TIDUR (UPK KEMENKES RI) */}
      {activeTab === 'pola-tidur' && (
        <div id="pola-tidur" className="space-y-8 animate-fadeIn">
          
          {/* HEADER POLA TIDUR */}
          <div className="glass-card p-6 sm:p-10 rounded-3xl bg-gradient-to-br from-indigo-500/10 via-white to-sky-500/10 border-indigo-100 space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-100 text-indigo-800 text-xs font-black border border-indigo-200">
                <Moon className="w-4 h-4 text-indigo-600" />
                <span>Unit Pelayanan Kesehatan (UPK) Kemenkes RI</span>
              </div>
              <a 
                href="https://upk.kemkes.go.id/new/lama-waktu-tidur-yang-dibutuhkan-oleh-tubuh" 
                target="_blank" 
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 text-xs font-bold text-indigo-700 hover:text-indigo-800 hover:underline"
              >
                <span>Sumber: UPK Kemenkes</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>

            <h2 className="text-2xl sm:text-4xl font-black text-slate-900 leading-tight">
              Lama Waktu Tidur yang <span className="text-indigo-600">Dibutuhkan oleh Tubuh</span>
            </h2>

            <p className="text-xs sm:text-base text-slate-600 leading-relaxed max-w-4xl font-normal">
              Tidur seringkali dianggap sebagai kegiatan yang tidak produktif dan membuang waktu. Padahal, jika dalam porsi yang cukup, tidur memberikan manfaat besar bagi regenerasi organ, fungsi otak, metabolisme, serta melindungi dari risiko <strong>stres, diabetes, dan penyakit jantung</strong>.
            </p>
          </div>

          {/* KEBUTUHAN WAKTU TIDUR SESUAI KELOMPOK USIA */}
          <div className="space-y-4">
            <div className="text-center max-w-2xl mx-auto space-y-1.5">
              <h3 className="text-xl sm:text-2xl font-extrabold text-slate-900">
                Kebutuhan Waktu Tidur Sesuai Kelompok Usia
              </h3>
              <p className="text-xs text-slate-500">
                Pedoman resmi standar durasi istirahat harian dari Unit Pelayanan Kesehatan Kementerian Kesehatan RI
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 pt-2">
              
              {/* USIA 0-1 BULAN */}
              <div className="glass-card p-5 rounded-3xl bg-white border-slate-200 space-y-2 hover:shadow-md transition-shadow">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Usia 0 – 1 Bulan</span>
                  <span className="px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-700 font-extrabold text-xs">Bayi Baru Lahir</span>
                </div>
                <div className="flex items-baseline gap-1.5">
                  <span className="text-2xl font-black text-indigo-600">14 – 18</span>
                  <span className="text-xs font-bold text-slate-600">Jam / Hari</span>
                </div>
                <p className="text-xs text-slate-500 leading-relaxed">
                  Fase adaptasi awal kehidupan luar rahim yang membutuhkan istirahat sangat panjang untuk pertumbuhan sel otak.
                </p>
              </div>

              {/* USIA 1-18 BULAN */}
              <div className="glass-card p-5 rounded-3xl bg-white border-slate-200 space-y-2 hover:shadow-md transition-shadow">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Usia 1 – 18 Bulan</span>
                  <span className="px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-700 font-extrabold text-xs">Bayi & Balita</span>
                </div>
                <div className="flex items-baseline gap-1.5">
                  <span className="text-2xl font-black text-indigo-600">12 – 14</span>
                  <span className="text-xs font-bold text-slate-600">Jam / Hari</span>
                </div>
                <p className="text-xs text-slate-500 leading-relaxed">
                  Sudah termasuk akumulasi tidur siang untuk mendukung perkembangan motorik dan sensorik anak.
                </p>
              </div>

              {/* USIA 3-6 TAHUN */}
              <div className="glass-card p-5 rounded-3xl bg-white border-slate-200 space-y-2 hover:shadow-md transition-shadow">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Usia 3 – 6 Tahun</span>
                  <span className="px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-700 font-extrabold text-xs">Prasekolah</span>
                </div>
                <div className="flex items-baseline gap-1.5">
                  <span className="text-2xl font-black text-indigo-600">11 – 13</span>
                  <span className="text-xs font-bold text-slate-600">Jam / Hari</span>
                </div>
                <p className="text-xs text-slate-500 leading-relaxed">
                  Mendukung energi beraktivitas dan bermain, termasuk tidur siang berkualitas.
                </p>
              </div>

              {/* USIA 6-12 TAHUN */}
              <div className="glass-card p-5 rounded-3xl bg-white border-sky-200 space-y-2 hover:shadow-md transition-shadow">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-bold text-sky-700 uppercase tracking-wider">Usia 6 – 12 Tahun</span>
                  <span className="px-2.5 py-0.5 rounded-full bg-sky-100 text-sky-800 font-extrabold text-xs">Anak Sekolah (SD)</span>
                </div>
                <div className="flex items-baseline gap-1.5">
                  <span className="text-2xl font-black text-sky-600">10</span>
                  <span className="text-xs font-bold text-slate-600">Jam / Hari</span>
                </div>
                <p className="text-xs text-slate-500 leading-relaxed">
                  Membantu proses konsolidasi memori materi pelajaran sekolah dan perkembangan fisik optimal.
                </p>
              </div>

              {/* USIA 12-18 TAHUN (HIGHLIGHTED SISWA) */}
              <div className="glass-card p-5 rounded-3xl bg-gradient-to-br from-indigo-50 to-purple-50 border-2 border-indigo-300 space-y-2 hover:shadow-lg transition-all relative overflow-hidden">
                <div className="absolute top-2 right-2 px-2 py-0.5 rounded-md bg-indigo-600 text-white text-[10px] font-black uppercase">
                  Fokus Siswa
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-bold text-indigo-800 uppercase tracking-wider">Usia 12 – 18 Tahun</span>
                </div>
                <div className="flex items-baseline gap-1.5">
                  <span className="text-3xl font-black text-indigo-700">8 – 9</span>
                  <span className="text-xs font-bold text-indigo-900">Jam / Hari</span>
                </div>
                <p className="text-xs text-indigo-950 font-medium leading-relaxed">
                  Menjelang remaja hingga remaja: Kebutuhan tidur 8–9 jam sangat krusial untuk kestabilan emosi, fokus belajar, daya ingat, dan imunitas!
                </p>
              </div>

              {/* USIA 18-40 TAHUN */}
              <div className="glass-card p-5 rounded-3xl bg-white border-slate-200 space-y-2 hover:shadow-md transition-shadow">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Usia 18 – 40 Tahun</span>
                  <span className="px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-700 font-extrabold text-xs">Dewasa</span>
                </div>
                <div className="flex items-baseline gap-1.5">
                  <span className="text-2xl font-black text-indigo-600">7 – 8</span>
                  <span className="text-xs font-bold text-slate-600">Jam / Hari</span>
                </div>
                <p className="text-xs text-slate-500 leading-relaxed">
                  Waktu istirahat ideal harian untuk menjaga kestabilan tekanan darah, metabolisme energi, dan stamina kerja.
                </p>
              </div>

            </div>
          </div>

          {/* 3 TIPS SLEEP HYGIENE */}
          <div className="space-y-4 pt-2">
            <h3 className="text-lg font-bold text-slate-900 text-center sm:text-left">
              Tips Menjaga Kualitas Tidur yang Sehat
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="glass-card p-5 rounded-3xl bg-white border-indigo-100 space-y-2">
                <h4 className="text-sm font-bold text-indigo-600">1. Matikan Gadget 30 Menit Sebelum Tidur</h4>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Cahaya biru (<em>blue light</em>) dari smartphone menekan pelepasan hormon melatonin yang memicu rasa kantuk alami.
                </p>
              </div>

              <div className="glass-card p-5 rounded-3xl bg-white border-sky-100 space-y-2">
                <h4 className="text-sm font-bold text-sky-600">2. Jadwal Tidur Teratur di Jam yang Sama</h4>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Membiasakan ritme sirkadian tubuh (misalnya tidur 21.30 dan bangun 05.00) agar saat pagi tubuh segar dan bugar.
                </p>
              </div>

              <div className="glass-card p-5 rounded-3xl bg-white border-emerald-100 space-y-2">
                <h4 className="text-sm font-bold text-emerald-600">3. Hindari Begadang & Disiplin PHBS</h4>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Hindari begadang jika tidak ada keperluan khusus. Segera periksakan ke fasilitas kesehatan jika mengalami insomnia kronis.
                </p>
              </div>
            </div>
          </div>

        </div>
      )}

      {/* DEDICATED SUMBER REFERENSI RESMI SECTION */}
      <div className="p-6 sm:p-8 rounded-3xl bg-slate-50 border border-slate-200/80 space-y-3">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="space-y-1">
            <h4 className="text-sm font-extrabold text-slate-800 flex items-center gap-2">
              <BookOpen className="w-4 h-4 text-sky-600" /> Sumber Referensi & Pedoman Resmi:
            </h4>
            <p className="text-xs text-slate-500">
              Materi edukasi disusun berdasarkan standar kurikulum kesehatan resmi dari Kementerian Kesehatan RI.
            </p>
          </div>

          <a
            href="https://ayosehat.kemkes.go.id/isi-piringku-pedoman-makan-kekinian-orang-indonesia"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-xs shadow-md shadow-emerald-600/20 transition-all shrink-0"
          >
            <span>Buka Portal Ayo Sehat Kemenkes</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-3 pt-2 text-[11px] text-slate-600">
          <div className="p-3 rounded-2xl bg-white border border-slate-200/70">
            <strong className="text-slate-800 block">1. Isi Piringku</strong>
            <span>Pedoman Gizi Seimbang Kemenkes & GERMAS</span>
          </div>
          <div className="p-3 rounded-2xl bg-white border border-slate-200/70">
            <strong className="text-slate-800 block">2. Air Minum Sehat</strong>
            <span>Kepmenkes No. 907/2002 Syarat Kualitas Air</span>
          </div>
          <div className="p-3 rounded-2xl bg-white border border-slate-200/70">
            <strong className="text-slate-800 block">3. PHBS Sekolah</strong>
            <span>10 Indikator Hidup Bersih Institusi Pendidikan</span>
          </div>
          <div className="p-3 rounded-2xl bg-white border border-slate-200/70">
            <strong className="text-slate-800 block">4. Dampak Buruk Rokok</strong>
            <span>Bahaya Rokok P2PTM Kemenkes RI</span>
          </div>
          <div className="p-3 rounded-2xl bg-white border border-slate-200/70">
            <strong className="text-slate-800 block">5. Lama Waktu Tidur</strong>
            <span>Standar Waktu Tidur UPK Kemenkes RI</span>
          </div>
          <div className="p-3 rounded-2xl bg-white border border-slate-200/70">
            <strong className="text-slate-800 block">6. Siklus Menstruasi</strong>
            <span>Edukasi Reproduksi (Sumber: Prompt ChatGPT)</span>
          </div>
        </div>
      </div>

    </div>
  );
}

