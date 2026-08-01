'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { 
  ShieldCheck, 
  CheckCircle2, 
  Sparkles, 
  ArrowRight, 
  Search, 
  Filter, 
  Heart,
  Droplet,
  Sun,
  Smile,
  Zap,
  BookOpen
} from 'lucide-react';

interface PhbsHabit {
  number: number;
  title: string;
  category: 'Kebersihan Diri' | 'Nutrisi & Lingkungan' | 'Kebiasaan Sehat & Paru';
  desc: string;
  imageSrc: string;
  actionList: string[];
}

export default function PhbsPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('Semua');

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

  const filteredItems = phbsItems.filter((item) => {
    const matchesQuery = item.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         item.desc.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'Semua' || item.category === selectedCategory;
    return matchesQuery && matchesCategory;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
      
      {/* HERO BANNER PHBS */}
      <div className="glass-card p-8 sm:p-12 rounded-3xl bg-white border-sky-100 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center shadow-xl shadow-sky-500/5">
        <div className="lg:col-span-7 space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-sky-100 text-sky-700 text-xs font-extrabold border border-sky-200">
            <ShieldCheck className="w-4 h-4 text-sky-500" />
            <span>Perilaku Hidup Bersih dan Sehat (PHBS)</span>
          </div>

          <h1 className="text-4xl sm:text-5xl font-black text-slate-900 leading-tight">
            10 Kebiasaan <span className="text-gradient">PHBS Siswa</span>
          </h1>

          <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
            Perilaku Hidup Bersih dan Sehat (PHBS) adalah sekumpulan kebiasaan baik yang dipraktikkan secara sadar untuk menolong diri sendiri dan keluarga di bidang kesehatan.
          </p>

          <div className="flex flex-wrap items-center gap-3 pt-2">
            <Link
              href="/dashboard"
              className="px-6 py-3 rounded-full bg-sky-500 hover:bg-sky-600 text-white font-extrabold text-xs flex items-center gap-2 shadow-lg shadow-sky-500/25 hover:scale-105 transition-all"
            >
              Cek Kesehatan IoT <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/rekomendasi"
              className="px-6 py-3 rounded-full bg-sky-50 text-sky-700 border border-sky-200 font-extrabold text-xs hover:bg-sky-100 transition-all flex items-center gap-2"
            >
              <Zap className="w-4 h-4 text-sky-500" />
              Menu Rekomendasi
            </Link>
          </div>
        </div>

        <div className="lg:col-span-5 relative h-64 sm:h-72 rounded-2xl overflow-hidden border border-sky-100 shadow-md">
          <Image
            src="/phbs_cuci_tangan.png"
            alt="Siswa Menerapkan 10 Kebiasaan PHBS"
            fill
            className="object-cover"
            priority
          />
        </div>
      </div>

      {/* FILTER & SEARCH BAR */}
      <div className="glass-card p-6 rounded-3xl bg-white border-sky-100 flex flex-col md:flex-row items-center justify-between gap-4 shadow-sm">
        <div className="relative w-full md:w-80">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Cari kebiasaan PHBS..."
            className="w-full pl-10 pr-4 py-2.5 rounded-2xl bg-slate-50 border border-sky-100 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:bg-white transition-all"
          />
        </div>

        {/* CATEGORY BUTTONS */}
        <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
          {['Semua', 'Kebersihan Diri', 'Nutrisi & Lingkungan', 'Kebiasaan Sehat & Paru'].map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-full text-xs font-bold transition-all ${
                selectedCategory === cat
                  ? 'bg-sky-500 text-white shadow-md shadow-sky-500/20'
                  : 'bg-slate-50 text-slate-600 hover:bg-sky-50 hover:text-sky-600 border border-slate-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* 10 KEBIASAAN PHBS GRID WITH ILLUSTRATIONS & ACTION CHECKLIST */}
      <div className="space-y-6">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <h2 className="text-3xl font-extrabold text-slate-900">10 Langkah Kebiasaan PHBS Sehari-hari</h2>
          <p className="text-xs text-slate-500">Dilengkapi gambar ilustrasi & tindakan praktis siswa di sekolah/rumah</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-4">
          {filteredItems.map((item) => (
            <div 
              key={item.number} 
              className="glass-card rounded-3xl bg-white border-sky-100 glass-card-hover overflow-hidden shadow-md shadow-sky-500/5 flex flex-col justify-between"
            >
              {/* IMAGE HEADER FOR EACH HABIT */}
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

              {/* CARD BODY */}
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

    </div>
  );
}
