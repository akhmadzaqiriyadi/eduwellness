'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { BookOpen, Flame, HeartHandshake, ShieldAlert, Sparkles, Moon, Utensils, CheckCircle2, ShieldCheck, Zap, AlertTriangle, ArrowRight } from 'lucide-react';

export default function EdukasiPage() {
  const [activeTab, setActiveTab] = useState<'rokok' | 'menstruasi' | 'pola-makan' | 'pola-tidur' | 'phbs'>('rokok');

  const phbsItems = [
    { title: 'Cuci Tangan Pakai Sabun', desc: 'Cuci tangan minimal 20 detik dengan sabun & air mengalir sebelum makan, setelah dari toilet, dan setelah menyentuh benda umum.' },
    { title: 'Mandi 2x Sehari', desc: 'Mandi teratur menjaga kebersihan kulit, mencegah penumpukan bakteri, dan menjaga kesegaran tubuh sepanjang hari.' },
    { title: 'Sikat Gigi 2x Sehari', desc: 'Gosok gigi setelah sarapan dan sebelum tidur malam. Gigi bersih = bebas karang gigi & senyum lebih percaya diri!' },
    { title: 'Makan Makanan Bergizi', desc: 'Penuhi piringmu dengan gizi seimbang: karbohidrat kompleks, protein tinggi, sayur, buah, dan cukup minum air putih.' },
    { title: 'Buang Sampah pada Tempatnya', desc: 'Pisahkan sampah organik dan anorganik. Lingkungan yang bersih mencegah perkembangbiakan kuman penyakit.' },
    { title: 'Jaga Ventilasi Ruangan', desc: 'Buka jendela setiap pagi agar sirkulasi udara lancar dan kamar tidak lembap tempat bakteri berkembang.' },
    { title: 'Olahraga Teratur 30 Menit', desc: 'Lakukan aktivitas fisik minimal 30 menit per hari: berjalan cepat, bersepeda, senam, atau olahraga favoritmu.' },
    { title: 'Pakai Pakaian Bersih', desc: 'Ganti pakaian dalam setiap hari dan cuci pakaian beraktivitas untuk mencegah iritasi kulit & jamur.' },
    { title: 'Berantas Jentik Nyamuk (3M)', desc: 'Menguras tempat penampungan air, Menutup rapat wadah air, dan Mengubur/Mendaur ulang barang bekas mencegah Demam Berdarah.' },
    { title: 'Say No to Smoking 🚭', desc: 'Rokok merusak kesehatan paru-paru dan jantung. Komitmen hidup bersih dimulakan dengan bebas asap rokok!' },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
      
      {/* HERO BANNER */}
      <div className="text-center space-y-4 max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-sky-100 text-sky-700 text-xs font-extrabold border border-sky-200">
          <BookOpen className="w-4 h-4 text-sky-500" />
          <span>Health Education Hub Gen Z</span>
        </div>
        <h1 className="text-4xl sm:text-5xl font-extrabold text-slate-900 leading-tight">
          Edukasi Kesehatan <span className="text-gradient">Interaktif ✨</span>
        </h1>
        <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
          Pelajari bahaya rokok, kesehatan reproduksi & menstruasi, pola makan sehat, pola tidur, dan 10 kebiasaan PHBS dalam satu tempat!
        </p>
      </div>

      {/* CATEGORY TAB NAVIGATION */}
      <div className="flex flex-wrap items-center justify-center gap-2 p-2 rounded-full glass-card border border-sky-100 max-w-4xl mx-auto bg-white">
        <button
          onClick={() => setActiveTab('rokok')}
          className={`flex items-center gap-2 px-6 py-3 rounded-full text-xs sm:text-sm font-extrabold transition-all ${
            activeTab === 'rokok'
              ? 'bg-rose-500 text-white shadow-md shadow-rose-500/25'
              : 'text-slate-600 hover:text-sky-600 hover:bg-sky-50'
          }`}
        >
          <Flame className="w-4 h-4" /> Bahaya Rokok
        </button>

        <button
          onClick={() => setActiveTab('menstruasi')}
          className={`flex items-center gap-2 px-6 py-3 rounded-full text-xs sm:text-sm font-extrabold transition-all ${
            activeTab === 'menstruasi'
              ? 'bg-pink-500 text-white shadow-md shadow-pink-500/25'
              : 'text-slate-600 hover:text-sky-600 hover:bg-sky-50'
          }`}
        >
          <HeartHandshake className="w-4 h-4" /> Menstruasi
        </button>

        <button
          onClick={() => setActiveTab('pola-makan')}
          className={`flex items-center gap-2 px-6 py-3 rounded-full text-xs sm:text-sm font-extrabold transition-all ${
            activeTab === 'pola-makan'
              ? 'bg-emerald-500 text-white shadow-md shadow-emerald-500/25'
              : 'text-slate-600 hover:text-sky-600 hover:bg-sky-50'
          }`}
        >
          <Utensils className="w-4 h-4" /> Pola Makan
        </button>

        <button
          onClick={() => setActiveTab('pola-tidur')}
          className={`flex items-center gap-2 px-6 py-3 rounded-full text-xs sm:text-sm font-extrabold transition-all ${
            activeTab === 'pola-tidur'
              ? 'bg-indigo-500 text-white shadow-md shadow-indigo-500/25'
              : 'text-slate-600 hover:text-sky-600 hover:bg-sky-50'
          }`}
        >
          <Moon className="w-4 h-4" /> Pola Tidur
        </button>

        <button
          onClick={() => setActiveTab('phbs')}
          className={`flex items-center gap-2 px-6 py-3 rounded-full text-xs sm:text-sm font-extrabold transition-all ${
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
              <span>Peringatan Kesehatan ⚠️</span>
            </div>
            <h2 className="text-3xl font-extrabold text-slate-900">Bahaya Rokok Bagi Tubuh Remaja</h2>
            <p className="text-sm text-slate-600 leading-relaxed max-w-3xl">
              Rokok mengandung lebih dari 7.000 bahan kimia berbahaya, termasuk tar, nikotin, dan karbon monoksida. Menghirup asap rokok merusak jaringan tubuh secara perlahan namun pasti.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="glass-card p-6 rounded-3xl space-y-3 bg-white border-rose-100">
              <h3 className="text-lg font-bold text-rose-600">🫁 Kerusakan Paru-Paru Permanen</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Asap rokok menghancurkan silia (rambut halus penyaring kuman) di saluran pernapasan, menyebabkan bronkitis kronis, emfisema, dan kanker paru-paru.
              </p>
            </div>

            <div className="glass-card p-6 rounded-3xl space-y-3 bg-white border-amber-100">
              <h3 className="text-lg font-bold text-amber-600">❤️ Penyakit Jantung & Pembuluh Darah</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Nikotin menyempitkan pembuluh darah dan menaikkan tekanan darah & BPM. Risiko serangan jantung meningkat 2 hingga 4 kali lipat pada perokok aktif.
              </p>
            </div>

            <div className="glass-card p-6 rounded-3xl space-y-3 bg-white border-indigo-100">
              <h3 className="text-lg font-bold text-indigo-600">🧠 Gangguan Perkembangan Otak</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Paparan nikotin pada masa remaja mengganggu area prefrontal cortex yang mengatur emosi, daya ingat, dan kontrol diri.
              </p>
            </div>

            <div className="glass-card p-6 rounded-3xl space-y-3 bg-white border-sky-100">
              <h3 className="text-lg font-bold text-sky-600">🛡️ Bahaya Perokok Pasif</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Orang di sekitar perokok ikut menghirup racun sampingan (sidestream smoke) yang memiliki konsentrasi zat beracun lebih tinggi.
              </p>
            </div>
          </div>

          {/* FAKTA MENGEJUTKAN */}
          <div className="glass-card p-8 rounded-3xl bg-gradient-to-r from-rose-50 via-sky-50 to-indigo-50 border-sky-100 space-y-4">
            <h3 className="text-xl font-bold text-slate-900 flex items-center gap-2">
              <Zap className="w-5 h-5 text-amber-500" /> Fakta Mengejutkan 🤯
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-2">
              <div className="p-4 rounded-2xl bg-white border border-sky-100 shadow-sm">
                <span className="text-2xl font-black text-rose-500">11 Menit</span>
                <p className="text-xs text-slate-600 mt-1">Harapan hidup berkurang setiap 1 batang rokok ⏰</p>
              </div>
              <div className="p-4 rounded-2xl bg-white border border-sky-100 shadow-sm">
                <span className="text-2xl font-black text-amber-500">225.700</span>
                <p className="text-xs text-slate-600 mt-1">Orang Indonesia meninggal akibat rokok tiap tahun 😢</p>
              </div>
              <div className="p-4 rounded-2xl bg-white border border-sky-100 shadow-sm">
                <span className="text-2xl font-black text-indigo-500">3x Rentan</span>
                <p className="text-xs text-slate-600 mt-1">Remaja perokok lebih rentan mengalami gangguan emosi 🧠</p>
              </div>
              <div className="p-4 rounded-2xl bg-white border border-sky-100 shadow-sm">
                <span className="text-2xl font-black text-emerald-500">50% Turun</span>
                <p className="text-xs text-slate-600 mt-1">Risiko jantung turun 50% dalam 1 tahun berhenti rokok 💪</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: KESEHATAN MENSTRUASI */}
      {activeTab === 'menstruasi' && (
        <div id="menstruasi" className="space-y-8 animate-fadeIn">
          <div className="glass-card p-8 rounded-3xl bg-white border-pink-100 space-y-4">
            <h2 className="text-3xl font-extrabold text-slate-900">Kesehatan Reproduksi & Menstruasi 🌸</h2>
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
                Kompres hangat perut bawah dan minum air putih hangat untuk meredakan kram otot rahim selama periode datang bulan.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: POLA MAKAN SEHAT */}
      {activeTab === 'pola-makan' && (
        <div id="pola-makan" className="space-y-8 animate-fadeIn">
          <div className="glass-card p-8 rounded-3xl bg-white border-emerald-100 space-y-4">
            <h2 className="text-3xl font-extrabold text-slate-900">Pola Makan Sehat & Gizi Seimbang 🍎</h2>
            <p className="text-sm text-slate-600 leading-relaxed max-w-3xl">
              Tubuhmu memerlukan bahan bakar terbaik untuk aktivitas belajar dan olahraga harian. Prinsip 'Isi Piringku' membagi piring menjadi Karbohidrat, Protein, Sayur, dan Buah.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="glass-card p-6 rounded-3xl bg-white border-emerald-100 space-y-2">
              <h3 className="text-base font-bold text-emerald-600">🥗 Sayuran & Buah-Buahan (50% Piring)</h3>
              <p className="text-xs text-slate-600">Kaya akan serat, zat antioksidan, serta vitamin C dan A untuk kekebalan tubuh.</p>
            </div>

            <div className="glass-card p-6 rounded-3xl bg-white border-sky-100 space-y-2">
              <h3 className="text-base font-bold text-sky-600">🍗 Protein Berkualitas (25% Piring)</h3>
              <p className="text-xs text-slate-600">Telur, ikan, tahu, tempe, dan daging unggas membantu pembentukan sel otot.</p>
            </div>
          </div>
        </div>
      )}

      {/* TAB 4: POLA TIDUR */}
      {activeTab === 'pola-tidur' && (
        <div id="pola-tidur" className="space-y-8 animate-fadeIn">
          <div className="glass-card p-8 rounded-3xl bg-white border-indigo-100 space-y-4">
            <h2 className="text-3xl font-extrabold text-slate-900">Pola Tidur & Pemulihan Otak 😴</h2>
            <p className="text-sm text-slate-600 leading-relaxed max-w-3xl">
              Remaja membutuhkan 8 hingga 9 jam tidur berkualitas setiap malam. Kurang tidur menurunkan fokus belajar dan meningkatkan hormon stres.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="glass-card p-6 rounded-3xl bg-white border-indigo-100 space-y-2">
              <h3 className="text-base font-bold text-indigo-600">⏰ Matikan Layar HP 30 Menit Sebelum Tidur</h3>
              <p className="text-xs text-slate-600">Cahaya biru (blue light) dari gadget menekan hormon melatonin penghasil rasa kantuk.</p>
            </div>

            <div className="glass-card p-6 rounded-3xl bg-white border-sky-100 space-y-2">
              <h3 className="text-base font-bold text-sky-600">🌙 Tidur Teratur di Jam yang Sama</h3>
              <p className="text-xs text-slate-600">Menjaga ritme sirkadian tubuh agar saat bangun pagi badan terasa segar.</p>
            </div>

            <div className="glass-card p-6 rounded-3xl bg-white border-emerald-100 space-y-2">
              <h3 className="text-base font-bold text-emerald-600">☕ Hindari Kafein Malam Hari</h3>
              <p className="text-xs text-slate-600">Hindari kopi dan minuman berenergi setelah pukul 16:00 sore.</p>
            </div>
          </div>
        </div>
      )}

      {/* TAB 5: 10 KEBIASAAN PHBS */}
      {activeTab === 'phbs' && (
        <div id="phbs" className="space-y-8 animate-fadeIn">
          <div className="glass-card p-8 rounded-3xl bg-white border-sky-100 space-y-4 text-center max-w-3xl mx-auto">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900">10 Kebiasaan PHBS 🧼</h2>
            <p className="text-sm text-slate-600">
              Perilaku Hidup Bersih dan Sehat (PHBS) adalah kunci utama menjaga kesehatan diri sendiri, sekolah, dan lingkungan sekitarmu!
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {phbsItems.map((item, idx) => (
              <div key={idx} className="glass-card p-6 rounded-3xl bg-white border-sky-100 glass-card-hover flex items-start gap-4">
                <div className="w-10 h-10 rounded-2xl bg-sky-50 border border-sky-100 flex items-center justify-center text-sky-600 font-extrabold shrink-0">
                  {idx + 1}
                </div>
                <div>
                  <h3 className="text-base font-bold text-slate-900">{item.title}</h3>
                  <p className="text-xs text-slate-600 leading-relaxed mt-1">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

    </div>
  );
}
