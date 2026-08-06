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
  Search
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
  const [activeTab, setActiveTab] = useState<'rokok' | 'menstruasi' | 'pola-makan' | 'pola-tidur' | 'phbs'>('rokok');
  const [phbsSearchQuery, setPhbsSearchQuery] = useState('');
  const [phbsSelectedCategory, setPhbsSelectedCategory] = useState('Semua');

  const phbsItems: PhbsHabit[] = [
    { 
      number: 1, 
      title: 'Cuci Tangan Pakai Sabun (CTPS)', 
      category: 'Kebersihan Diri',
      desc: 'Cuci tangan minimal 20 detik dengan sabun & air mengalir sebelum makan, setelah dari toilet, dan setelah menyentuh benda umum.',
      imageSrc: '/phbs_cuci_tangan.png',
      actionList: [
        'Basahi tangan & gosok sabun hingga berbusa.',
        'Usap telapak, punggung tangan, sela-sela jari, dan kuku.',
        'Bilas bersih dengan air mengalir & keringkan.',
      ]
    },
    { 
      number: 2, 
      title: 'Mandi Teratur 2x Sehari', 
      category: 'Kebersihan Diri',
      desc: 'Mandi teratur menjaga kebersihan kulit, mencegah penumpukan bakteri penyebab bau badan, serta menjaga kesegaran tubuh.',
      imageSrc: '/phbs_mandi.png',
      actionList: [
        'Gunakan sabun mandi berpelembap.',
        'Keramas 2-3 kali seminggu untuk menjaga kesehatan kulit kepala.',
        'Keringkan badan dengan handuk bersih pribadi.',
      ]
    },
    { 
      number: 3, 
      title: 'Sikat Gigi 2x Sehari', 
      category: 'Kebersihan Diri',
      desc: 'Gosok gigi setelah sarapan pagi dan sebelum tidur malam. Gigi bersih mencegah karies, karang gigi, dan nafas segar!',
      imageSrc: '/phbs_sikat_gigi.png',
      actionList: [
        'Sikat seluruh permukaan gigi selama 2 menit.',
        'Gunakan pasta gigi berfluorida.',
        'Ganti sikat gigi setiap 3 bulan sekali.',
      ]
    },
    { 
      number: 4, 
      title: 'Makan Makanan Bergizi Seimbang', 
      category: 'Nutrisi & Lingkungan',
      desc: 'Penuhi piringmu dengan gizi seimbang: karbohidrat kompleks, protein tinggi (ikan/telur), sayur, buah, & air putih.',
      imageSrc: '/phbs_makan_sehat.png',
      actionList: [
        'Gunakan prinsip Isi Piringku (50% sayur & buah, 50% makanan pokok & lauk).',
        'Kurangi konsumsi makanan instan dan camilan manis berlebih.',
        'Sarapan pagi sebelum berangkat ke sekolah.',
      ]
    },
    { 
      number: 5, 
      title: 'Buang Sampah pada Tempatnya', 
      category: 'Nutrisi & Lingkungan',
      desc: 'Pisahkan sampah organik dan anorganik. Lingkungan sekolah & rumah yang bersih mencegah perkembangbiakan kuman penyakit.',
      imageSrc: '/phbs_buang_sampah.png',
      actionList: [
        'Buang sampah pada tempat sampah yang sesuai.',
        'Kurangi penggunaan plastik sekali pakai.',
        'Jaga kebersihan laci meja kelas & kamar pribadi.',
      ]
    },
    { 
      number: 6, 
      title: 'Jaga Sirkulasi & Ventilasi Ruangan', 
      category: 'Nutrisi & Lingkungan',
      desc: 'Buka jendela dan pintu setiap pagi agar sirkulasi udara lancar dan kamar tidak lembap tempat bakteri berkembang.',
      imageSrc: '/phbs_ventilasi.png',
      actionList: [
        'Buka tirai & jendela ruang belajar setiap pagi.',
        'Jemur bantal & kasur secara berkala di bawah sinar matahari.',
        'Bersihkan kipas angin atau saringan AC ruangan.',
      ]
    },
    { 
      number: 7, 
      title: 'Olahraga Rutin Minimal 30 Menit', 
      category: 'Kebiasaan Sehat & Paru',
      desc: 'Lakukan aktivitas fisik minimal 30 menit sehari: jalan cepat, bersepeda, senam, atau olahraga kesukaanmu.',
      imageSrc: '/phbs_olahraga.png',
      actionList: [
        'Luangkan waktu 30 menit setiap hari untuk bergerak.',
        'Peregangan otot ringan di sela-sela jam belajar.',
        'Pilih olahraga yang menyenangkan bersama teman.',
      ]
    },
    { 
      number: 8, 
      title: 'Ganti & Pakai Pakaian Bersih', 
      category: 'Kebersihan Diri',
      desc: 'Ganti pakaian dalam dan kaus kaki setiap hari untuk mencegah iritasi kulit, jamur, serta infeksi.',
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
      desc: 'Menguras tempat penampungan air, Menutup wadah air, dan Mendaur ulang barang bekas untuk cegah Demam Berdarah (DBD).',
      imageSrc: '/phbs_berantas_nyamuk.png',
      actionList: [
        'Kuras bak mandi seminggu sekali.',
        'Tutup rapat wadah penampungan air minum/hujan.',
        'Gunakan lotion anti nyamuk jika beraktivitas di tempat rindang.',
      ]
    },
    { 
      number: 10, 
      title: 'Katakan Tidak Pada Rokok & VAPE', 
      category: 'Kebiasaan Sehat & Paru',
      desc: 'Rokok dan vape mengandung zat beracun yang merusak paru-paru & pembuluh darah. Komitmen sehat dimulai dengan bebas asap!',
      imageSrc: '/phbs_bebas_rokok.png',
      actionList: [
        'Hindari mencoba-coba rokok konvensional maupun e-cigarette (vape).',
        'Jauhi paparan asap rokok (perokok pasif).',
        'Tingkatkan literasi bahaya adiksi nikotin.',
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
          <span>Health Education Hub</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900 leading-tight">
          Edukasi <span className="text-gradient">Kesehatan</span>
        </h1>
        <p className="text-slate-600 text-xs sm:text-base leading-relaxed">
          Pelajari bahaya rokok, kesehatan reproduksi & menstruasi, pola makan sehat, pola tidur, serta 10 Kebiasaan PHBS lengkap dalam satu platform!
        </p>
      </div>

      {/* CATEGORY TAB NAVIGATION - SWIPEABLE HORIZONTAL SCROLL ON MOBILE */}
      <div className="flex items-center gap-2 p-2 rounded-2xl sm:rounded-full glass-card border border-sky-100 max-w-4xl mx-auto bg-white overflow-x-auto no-scrollbar py-2.5 px-3">
        <button
          onClick={() => setActiveTab('rokok')}
          className={`flex items-center gap-2 px-4 sm:px-5 py-2 sm:py-2.5 rounded-full text-xs sm:text-sm font-extrabold shrink-0 transition-all ${
            activeTab === 'rokok'
              ? 'bg-rose-500 text-white shadow-md shadow-rose-500/25'
              : 'text-slate-600 hover:text-sky-600 hover:bg-sky-50'
          }`}
        >
          <Flame className="w-4 h-4" /> Bahaya Rokok
        </button>

        <button
          onClick={() => setActiveTab('menstruasi')}
          className={`flex items-center gap-2 px-4 sm:px-5 py-2 sm:py-2.5 rounded-full text-xs sm:text-sm font-extrabold shrink-0 transition-all ${
            activeTab === 'menstruasi'
              ? 'bg-pink-500 text-white shadow-md shadow-pink-500/25'
              : 'text-slate-600 hover:text-sky-600 hover:bg-sky-50'
          }`}
        >
          <HeartHandshake className="w-4 h-4" /> Menstruasi
        </button>

        <button
          onClick={() => setActiveTab('pola-makan')}
          className={`flex items-center gap-2 px-4 sm:px-5 py-2 sm:py-2.5 rounded-full text-xs sm:text-sm font-extrabold shrink-0 transition-all ${
            activeTab === 'pola-makan'
              ? 'bg-emerald-500 text-white shadow-md shadow-emerald-500/25'
              : 'text-slate-600 hover:text-sky-600 hover:bg-sky-50'
          }`}
        >
          <Utensils className="w-4 h-4" /> Pola Makan
        </button>

        <button
          onClick={() => setActiveTab('pola-tidur')}
          className={`flex items-center gap-2 px-4 sm:px-5 py-2 sm:py-2.5 rounded-full text-xs sm:text-sm font-extrabold shrink-0 transition-all ${
            activeTab === 'pola-tidur'
              ? 'bg-indigo-500 text-white shadow-md shadow-indigo-500/25'
              : 'text-slate-600 hover:text-sky-600 hover:bg-sky-50'
          }`}
        >
          <Moon className="w-4 h-4" /> Pola Tidur
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
      </div>


      {/* TAB 1: BAHAYA ROKOK */}
      {activeTab === 'rokok' && (
        <div id="rokok" className="space-y-8 animate-fadeIn">
          <div className="glass-card p-8 rounded-3xl bg-white border-rose-100 space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-50 text-rose-700 text-xs font-bold border border-rose-100">
              <ShieldAlert className="w-4 h-4 text-rose-500" />
              <span>Peringatan Kesehatan</span>
            </div>
            <h2 className="text-3xl font-extrabold text-slate-900">Bahaya Rokok Bagi Tubuh Remaja</h2>
            <p className="text-sm text-slate-600 leading-relaxed max-w-3xl">
              Rokok mengandung lebih dari 7.000 bahan kimia berbahaya, termasuk tar, nikotin, dan karbon monoksida. Menghirup asap rokok merusak jaringan tubuh secara perlahan namun pasti.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="glass-card p-6 rounded-3xl space-y-3 bg-white border-rose-100">
              <h3 className="text-lg font-bold text-rose-600">Kerusakan Paru-Paru Permanen</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Asap rokok menghancurkan silia (rambut halus penyaring kuman) di saluran pernapasan, menyebabkan bronkitis kronis, emfisema, dan kanker paru-paru.
              </p>
            </div>

            <div className="glass-card p-6 rounded-3xl space-y-3 bg-white border-amber-100">
              <h3 className="text-lg font-bold text-amber-600">Penyakit Jantung & Pembuluh Darah</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Nikotin menyempitkan pembuluh darah dan menaikkan tekanan darah & BPM. Risiko serangan jantung meningkat 2 hingga 4 kali lipat pada perokok aktif.
              </p>
            </div>

            <div className="glass-card p-6 rounded-3xl space-y-3 bg-white border-indigo-100">
              <h3 className="text-lg font-bold text-indigo-600">Gangguan Perkembangan Otak</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Paparan nikotin pada masa remaja mengganggu area prefrontal cortex yang mengatur emosi, daya ingat, dan kontrol diri.
              </p>
            </div>

            <div className="glass-card p-6 rounded-3xl space-y-3 bg-white border-sky-100">
              <h3 className="text-lg font-bold text-sky-600">Bahaya Perokok Pasif</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Orang di sekitar perokok ikut menghirup racun sampingan (sidestream smoke) yang memiliki konsentrasi zat beracun lebih tinggi.
              </p>
            </div>
          </div>

          {/* FAKTA MENGEJUTKAN */}
          <div className="glass-card p-8 rounded-3xl bg-gradient-to-r from-rose-50 via-sky-50 to-indigo-50 border-sky-100 space-y-4">
            <h3 className="text-xl font-bold text-slate-900 flex items-center gap-2">
              <Zap className="w-5 h-5 text-amber-500" /> Fakta Mengejutkan
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-2">
              <div className="p-4 rounded-2xl bg-white border border-sky-100 shadow-sm">
                <span className="text-2xl font-black text-rose-500">11 Menit</span>
                <p className="text-xs text-slate-600 mt-1">Harapan hidup berkurang setiap 1 batang rokok</p>
              </div>
              <div className="p-4 rounded-2xl bg-white border border-sky-100 shadow-sm">
                <span className="text-2xl font-black text-amber-500">225.700</span>
                <p className="text-xs text-slate-600 mt-1">Orang Indonesia meninggal akibat rokok tiap tahun</p>
              </div>
              <div className="p-4 rounded-2xl bg-white border border-sky-100 shadow-sm">
                <span className="text-2xl font-black text-indigo-500">3x Rentan</span>
                <p className="text-xs text-slate-600 mt-1">Remaja perokok lebih rentan mengalami gangguan emosi</p>
              </div>
              <div className="p-4 rounded-2xl bg-white border border-sky-100 shadow-sm">
                <span className="text-2xl font-black text-emerald-500">50% Turun</span>
                <p className="text-xs text-slate-600 mt-1">Risiko jantung turun 50% dalam 1 tahun berhenti rokok</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: KESEHATAN MENSTRUASI */}
      {activeTab === 'menstruasi' && (
        <div id="menstruasi" className="space-y-8 animate-fadeIn">
          <div className="glass-card p-8 rounded-3xl bg-white border-pink-100 space-y-4">
            <h2 className="text-3xl font-extrabold text-slate-900">Kesehatan Reproduksi & Menstruasi</h2>
            <p className="text-sm text-slate-600 leading-relaxed max-w-3xl">
              Menstruasi adalah proses biologis yang normal dan sehat bagi setiap remaja putri. Menjaga kebersihan dan pola nutrisi selama siklus haid sangat penting untuk mencegah infeksi.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="glass-card p-6 rounded-3xl bg-white border-pink-100 space-y-3">
              <h3 className="text-base font-bold text-pink-600">1. Ganti Pembalut Berkala</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Ganti pembalut minimal setiap 4–6 jam sekali untuk mencegah penumpukan bakteri jamur di area kewanitaan.
              </p>
            </div>

            <div className="glass-card p-6 rounded-3xl bg-white border-purple-100 space-y-3">
              <h3 className="text-base font-bold text-purple-600">2. Cukupi Asupan Zat Besi</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Konsumsi makanan kaya zat besi (bayam, daging merah, telur) untuk menggantikan sel darah merah dan mencegah anemia.
              </p>
            </div>

            <div className="glass-card p-6 rounded-3xl bg-white border-sky-100 space-y-3">
              <h3 className="text-base font-bold text-sky-600">3. Atasi Nyeri Haid (PMS)</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Kompress hangat perut bawah dan minum air putih hangat untuk meredakan kram otot rahim selama periode datang bulan.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: POLA MAKAN SEHAT */}
      {activeTab === 'pola-makan' && (
        <div id="pola-makan" className="space-y-8 animate-fadeIn">
          <div className="glass-card p-8 rounded-3xl bg-white border-emerald-100 space-y-4">
            <h2 className="text-3xl font-extrabold text-slate-900">Pola Makan Sehat & Gizi Seimbang</h2>
            <p className="text-sm text-slate-600 leading-relaxed max-w-3xl">
              Tubuhmu memerlukan bahan bakar terbaik untuk aktivitas belajar dan olahraga harian. Prinsip 'Isi Piringku' membagi piring menjadi Karbohidrat, Protein, Sayur, dan Buah.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="glass-card p-6 rounded-3xl bg-white border-emerald-100 space-y-2">
              <h3 className="text-base font-bold text-emerald-600">Sayuran & Buah-Buahan (50% Piring)</h3>
              <p className="text-xs text-slate-600">Kaya akan serat, zat antioksidan, serta vitamin C dan A untuk kekebalan tubuh.</p>
            </div>

            <div className="glass-card p-6 rounded-3xl bg-white border-sky-100 space-y-2">
              <h3 className="text-base font-bold text-sky-600">Protein Berkualitas (25% Piring)</h3>
              <p className="text-xs text-slate-600">Telur, ikan, tahu, tempe, dan daging unggas membantu pembentukan sel otot.</p>
            </div>
          </div>
        </div>
      )}

      {/* TAB 4: POLA TIDUR */}
      {activeTab === 'pola-tidur' && (
        <div id="pola-tidur" className="space-y-8 animate-fadeIn">
          <div className="glass-card p-8 rounded-3xl bg-white border-indigo-100 space-y-4">
            <h2 className="text-3xl font-extrabold text-slate-900">Pola Tidur & Pemulihan Otak</h2>
            <p className="text-sm text-slate-600 leading-relaxed max-w-3xl">
              Remaja membutuhkan 8 hingga 9 jam tidur berkualitas setiap malam. Kurang tidur menurunkan fokus belajar dan meningkatkan hormon stres.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="glass-card p-6 rounded-3xl bg-white border-indigo-100 space-y-2">
              <h3 className="text-base font-bold text-indigo-600">Matikan Layar HP 30 Menit Sebelum Tidur</h3>
              <p className="text-xs text-slate-600">Cahaya biru (blue light) dari gadget menekan hormon melatonin penghasil rasa kantuk.</p>
            </div>

            <div className="glass-card p-6 rounded-3xl bg-white border-sky-100 space-y-2">
              <h3 className="text-base font-bold text-sky-600">Tidur Teratur di Jam yang Sama</h3>
              <p className="text-xs text-slate-600">Menjaga ritme sirkadian tubuh agar saat bangun pagi badan terasa segar.</p>
            </div>

            <div className="glass-card p-6 rounded-3xl bg-white border-emerald-100 space-y-2">
              <h3 className="text-base font-bold text-emerald-600">Hindari Kafein Malam Hari</h3>
              <p className="text-xs text-slate-600">Hindari kopi dan minuman berenergi setelah pukul 16:00 sore.</p>
            </div>
          </div>
        </div>
      )}

      {/* TAB 5: 10 KEBIASAAN PHBS (FULL INTEGRATED MODUL PHBS WITH ILLUSTRATIONS) */}
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

    </div>
  );
}
