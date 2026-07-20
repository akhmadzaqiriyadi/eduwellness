'use client';

import Link from 'next/link';
import Image from 'next/image';
import { ShieldCheck, CheckCircle2, Sparkles, ArrowRight, Activity, BookOpen } from 'lucide-react';

export default function PhbsPage() {
  const phbsItems = [
    { number: 1, title: 'Cuci Tangan Pakai Sabun', desc: 'Cuci tangan minimal 20 detik dengan sabun & air mengalir sebelum makan, setelah dari toilet, dan setelah menyentuh benda umum.' },
    { number: 2, title: 'Mandi 2x Sehari', desc: 'Mandi teratur menjaga kebersihan kulit, mencegah penumpukan bakteri, dan menjaga kesegaran tubuh sepanjang hari.' },
    { number: 3, title: 'Sikat Gigi 2x Sehari', desc: 'Gosok gigi setelah sarapan dan sebelum tidur malam. Gigi bersih = bebas karang gigi & senyum lebih percaya diri!' },
    { number: 4, title: 'Makan Makanan Bergizi', desc: 'Penuhi piringmu dengan gizi seimbang: karbohidrat kompleks, protein tinggi, sayur, buah, dan cukup minum air putih.' },
    { number: 5, title: 'Buang Sampah pada Tempatnya', desc: 'Pisahkan sampah organik dan anorganik. Lingkungan yang bersih mencegah perkembangbiakan kuman penyakit.' },
    { number: 6, title: 'Jaga Ventilasi Ruangan', desc: 'Buka jendela setiap pagi agar sirkulasi udara lancar dan kamar tidak lembap tempat bakteri berkembang.' },
    { number: 7, title: 'Olahraga Teratur 30 Menit', desc: 'Lakukan aktivitas fisik minimal 30 menit per hari: berjalan cepat, bersepeda, senam, atau olahraga favoritmu.' },
    { number: 8, title: 'Pakai Pakaian Bersih', desc: 'Ganti pakaian dalam setiap hari dan cuci pakaian beraktivitas untuk mencegah iritasi kulit & jamur.' },
    { number: 9, title: 'Berantas Jentik Nyamuk (3M)', desc: 'Menguras tempat penampungan air, Menutup rapat wadah air, dan Mengubur/Mendaur ulang barang bekas mencegah Demam Berdarah.' },
    { number: 10, title: 'Say No to Smoking 🚭', desc: 'Rokok merusak kesehatan paru-paru dan jantung. Komitmen hidup bersih dimulakan dengan bebas asap rokok!' },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
      
      {/* HERO BANNER */}
      <div className="glass-card p-8 sm:p-12 rounded-3xl bg-white border-sky-100 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        <div className="lg:col-span-7 space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-sky-100 text-sky-700 text-xs font-extrabold border border-sky-200">
            <ShieldCheck className="w-4 h-4 text-sky-500" />
            <span>Perilaku Hidup Bersih dan Sehat (PHBS)</span>
          </div>

          <h1 className="text-4xl sm:text-5xl font-extrabold text-slate-900 leading-tight">
            10 Kebiasaan <span className="text-gradient">PHBS Siswa 🧼</span>
          </h1>

          <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
            Perilaku Hidup Bersih dan Sehat (PHBS) adalah sekumpulan perilaku yang dipraktikkan atas dasar kesadaran sebagai hasil pembelajaran, yang menjadikan seseorang mampu menolong diri sendiri di bidang kesehatan.
          </p>

          <div className="flex items-center gap-3 pt-2">
            <Link
              href="/dashboard"
              className="px-6 py-3 rounded-full bg-sky-500 hover:bg-sky-600 text-white font-extrabold text-xs flex items-center gap-2 shadow-lg shadow-sky-500/25 hover:scale-105 transition-all"
            >
              Cek Kesehatan IoT <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/edukasi"
              className="px-6 py-3 rounded-full bg-sky-50 text-sky-700 border border-sky-200 font-extrabold text-xs hover:bg-sky-100 transition-all"
            >
              Edukasi Lainnya 📚
            </Link>
          </div>
        </div>

        <div className="lg:col-span-5 relative h-64 sm:h-72 rounded-2xl overflow-hidden border border-sky-100 shadow-md">
          <Image
            src="/education_students.png"
            alt="Siswa Menerapkan 10 Kebiasaan PHBS"
            fill
            className="object-cover"
          />
        </div>
      </div>

      {/* 10 KEBIASAAN PHBS GRID */}
      <div className="space-y-6">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <h2 className="text-3xl font-extrabold text-slate-900">10 Langkah Kebiasaan PHBS Sehari-hari</h2>
          <p className="text-xs text-slate-500">Terapkan di sekolah, rumah, dan lingkungan sekitarmu!</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
          {phbsItems.map((item) => (
            <div key={item.number} className="glass-card p-6 rounded-3xl bg-white border-sky-100 glass-card-hover flex items-start gap-4 shadow-md shadow-sky-500/5">
              <div className="w-12 h-12 rounded-2xl bg-sky-50 border border-sky-100 flex items-center justify-center text-sky-600 font-black text-lg shrink-0">
                {item.number}
              </div>
              <div className="space-y-1">
                <h3 className="text-base font-bold text-slate-900">{item.title}</h3>
                <p className="text-xs text-slate-600 leading-relaxed">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
