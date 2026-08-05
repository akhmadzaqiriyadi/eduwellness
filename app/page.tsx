import Link from 'next/link';
import Image from 'next/image';
import { Activity, Heart, BookOpen, ShieldCheck, ArrowRight, Sparkles, Zap, Flame, Smile, CheckCircle2, TrendingUp } from 'lucide-react';

export default function HomePage() {
  return (
    <div className="space-y-16 py-8">
      
      {/* HERO SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 pb-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* LEFT CONTENT */}
          <div className="lg:col-span-7 space-y-6 text-left">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-sky-100 text-sky-700 text-xs font-extrabold">
              <Sparkles className="w-3.5 h-3.5 text-sky-500" />
              <span>Aplikasi Web Berbasis IoT Terintegrasi</span>
            </div>

            <h1 className="text-3xl sm:text-5xl font-black text-slate-900 leading-[1.18] tracking-tight">
              Sensor Suhu & Detak Jantung <br />
              <span className="text-gradient">Literasi Kesehatan Siswa</span>
            </h1>

            <p className="text-slate-600 text-base sm:text-lg max-w-xl leading-relaxed font-normal">
              EduWellness: Pengembangan Aplikasi Web Berbasis IoT Terintegrasi Sensor Suhu dan Detak Jantung untuk Menumbuhkan Literasi Kesehatan serta Kebiasaan Hidup Sehat bagi Siswa.
            </p>

            <div className="flex flex-wrap items-center gap-4 pt-4">
              <Link
                href="/dashboard"
                className="px-8 py-4 rounded-full bg-sky-500 hover:bg-sky-600 text-white font-extrabold text-sm flex items-center gap-2 shadow-xl shadow-sky-500/25 hover:scale-105 transition-all"
              >
                Cek Kesehatanmu <ArrowRight className="w-4 h-4" />
              </Link>

              <Link
                href="/edukasi"
                className="px-8 py-4 rounded-full bg-white hover:bg-sky-50 text-slate-700 border border-sky-200 font-extrabold text-sm flex items-center gap-2 shadow-sm transition-all"
              >
                Mulai Belajar
              </Link>
            </div>
          </div>

          {/* RIGHT 3D HERO ILLUSTRATION */}
          <div className="lg:col-span-5 relative flex justify-center">
            <div className="w-full max-w-md h-[420px] rounded-3xl overflow-hidden glass-card p-3 shadow-2xl shadow-sky-500/20 border-white relative group animate-bounce-slow">
              <div className="relative w-full h-full rounded-2xl overflow-hidden bg-gradient-to-tr from-sky-100 to-sky-50">
                <Image
                  src="/literasi.jpeg"
                  alt="EduWellness Smart Health IoT Hero"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                  priority
                />
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* FITUR KEREN SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8 text-center">
        <div className="space-y-2 max-w-2xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900">
            Fitur Keren
          </h2>
          <p className="text-slate-600 text-sm">
            Teknologi IoT bertemu edukasi kesehatan — semua dalam satu genggaman
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 pt-4 text-left">
          
          {/* FITUR 1 */}
          <div className="glass-card p-6 rounded-3xl glass-card-hover space-y-3 bg-white">
            <div className="w-12 h-12 rounded-2xl bg-sky-50 flex items-center justify-center text-sky-500 border border-sky-100">
              <Activity className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-slate-900">Sensor Suhu Tubuh</h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              Monitor suhu real-time via sensor presisi MLX90614 tanpa sentuhan.
            </p>
          </div>

          {/* FITUR 2 */}
          <div className="glass-card p-6 rounded-3xl glass-card-hover space-y-3 bg-white">
            <div className="w-12 h-12 rounded-2xl bg-rose-50 flex items-center justify-center text-rose-500 border border-rose-100">
              <Heart className="w-6 h-6 fill-rose-500" />
            </div>
            <h3 className="text-base font-bold text-slate-900">Detak Jantung</h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              Pantau detak jantung (BPM) kapan saja dengan sensor optik MAX30102.
            </p>
          </div>

          {/* FITUR 3 */}
          <div className="glass-card p-6 rounded-3xl glass-card-hover space-y-3 bg-white">
            <div className="w-12 h-12 rounded-2xl bg-teal-50 flex items-center justify-center text-teal-600 border border-teal-100">
              <BookOpen className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-slate-900">Edukasi Kesehatan</h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              Bahaya rokok, menstruasi, pola makan & pola tidur interaktif Gen Z.
            </p>
          </div>

          {/* FITUR 4 */}
          <div className="glass-card p-6 rounded-3xl glass-card-hover space-y-3 bg-white">
            <div className="w-12 h-12 rounded-2xl bg-amber-50 flex items-center justify-center text-amber-500 border border-amber-100">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-slate-900">PHBS</h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              10 Perilaku Hidup Bersih dan Sehat untuk lingkungan sekolah & rumah.
            </p>
          </div>

          {/* FITUR 5 */}
          <div className="glass-card p-6 rounded-3xl glass-card-hover space-y-3 bg-white">
            <div className="w-12 h-12 rounded-2xl bg-indigo-50 flex items-center justify-center text-indigo-500 border border-indigo-100">
              <TrendingUp className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-slate-900">Status & Laporan</h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              Dashboard analitik & riwayat tes terintegrasi dengan Supabase.
            </p>
          </div>

          {/* FITUR 6 */}
          <div className="glass-card p-6 rounded-3xl glass-card-hover space-y-3 bg-white">
            <div className="w-12 h-12 rounded-2xl bg-purple-50 flex items-center justify-center text-purple-500 border border-purple-100">
              <Zap className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-slate-900">Konektivitas IoT Wi-Fi</h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              Pengiriman data otomatis dari mikroprosesor Wemos D1 via jaringan.
            </p>
          </div>

        </div>
      </section>

      {/* SECOND HERO / EDUCATION ILLUSTRATION BANNER */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="glass-card p-8 sm:p-12 rounded-3xl bg-white border-sky-100 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-6 space-y-4">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-sky-100 text-sky-700 text-xs font-bold">
              <span>Literasi Digital Kesehatan Siswa</span>
            </div>
            <h3 className="text-3xl font-extrabold text-slate-900 leading-tight">
              Siap Jadi Versi Terbaik Dirimu?
            </h3>
            <p className="text-slate-600 text-sm leading-relaxed">
              Daftar sekarang dan mulai pantau kesehatanmu dengan teknologi IoT terkini. Dapatkan wawasan kesehatan lengkap secara gratis!
            </p>
            <div className="pt-2">
              <Link
                href="/register"
                className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-sky-500 hover:bg-sky-600 text-white font-extrabold text-xs shadow-lg shadow-sky-500/25 hover:scale-105 transition-all"
              >
                Daftar Gratis
              </Link>
            </div>
          </div>

          <div className="lg:col-span-6 relative h-72 sm:h-80 rounded-2xl overflow-hidden border border-sky-100 shadow-md">
            <Image
              src="/hero.jpeg"
              alt="Literasi Digital Kesehatan Siswa"
              fill
              className="object-cover"
            />
          </div>
        </div>
      </section>

    </div>
  );
}
