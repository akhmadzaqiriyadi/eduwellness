import Image from 'next/image';
import Link from 'next/link';
import { 
  Sparkles, 
  Target, 
  Compass, 
  Users, 
  Cpu, 
  Mail, 
  CheckCircle2, 
  Heart, 
  ShieldCheck, 
  Activity, 
  Zap, 
  Code, 
  Smartphone, 
  Award,
  Layers,
  GraduationCap
} from 'lucide-react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'About Us - EduWellness IoT Health Education',
  description: 'Tentang EduWellness IoT Health Education: Visi, Misi, Tim Pengembang, Teknologi, dan Fitur Unggulan Pemantauan Kesehatan Siswa SMP N 1 Seyegan.',
};

export default function AboutPage() {
  const teamMembers = [
    {
      name: 'Prima Mega Jaya, S.Pd',
      role: 'Design UI/UX & Prompting AI',
      desc: 'Merancang antarmuka aplikasi yang intuitif, ramah remaja Gen Z, serta mengoptimalkan alur kecerdasan buatan.',
      color: 'from-sky-500 to-blue-600',
      badgeBg: 'bg-sky-50 text-sky-700 border-sky-200',
    },
    {
      name: 'Shafa Prasetyaningtyas',
      role: 'Backend, Database, Hardware & Prompting AI',
      desc: 'Mengembangkan arsitektur backend, integrasi basis data Supabase, serta pemrograman mikrokontroler sensor IoT.',
      color: 'from-amber-500 to-orange-600',
      badgeBg: 'bg-amber-50 text-amber-700 border-amber-200',
    },
    {
      name: 'Nabila Aqila Putri',
      role: 'Frontend Hardware & Prompting AI',
      desc: 'Membangun antarmuka dinamis Next.js, menghubungkan komunikasi data sensor hardware ke aplikasi web real-time.',
      color: 'from-emerald-500 to-teal-600',
      badgeBg: 'bg-emerald-50 text-emerald-700 border-emerald-200',
    },
  ];

  const techStack = [
    { name: 'Next.js & React', category: 'Framework App', bg: 'bg-slate-900 text-white' },
    { name: 'Tailwind CSS', category: 'Styling', bg: 'bg-sky-500 text-white' },
    { name: 'Cloud Supabase', category: 'Database & Auth', bg: 'bg-emerald-600 text-white' },
    { name: 'Vercel App', category: 'Hosting & Deployment', bg: 'bg-black text-white' },
    { name: 'Recharts & Lucide React', category: 'UI & Visualisasi', bg: 'bg-indigo-600 text-white' },
    { name: 'Wemos D1 & Sensor IoT', category: 'Hardware (MLX90614 & MAX30102)', bg: 'bg-amber-600 text-white' },
    { name: 'AI Engineering & Prompting', category: 'AI Support', bg: 'bg-purple-600 text-white' },
  ];

  const features = [
    {
      title: 'Monitoring Suhu & BPM Real-Time',
      desc: 'Mengukur suhu tubuh (sensor MLX90614) dan detak jantung (sensor MAX30102) secara cepat & nirkabel.',
      icon: Activity,
      color: 'text-sky-500 bg-sky-50 border-sky-100',
    },
    {
      title: 'Dashboard Kesehatan Sederhana',
      desc: 'Menampilkan data pengukuran kesehatan terkini secara visual yang mudah dipahami oleh siswa.',
      icon: Layers,
      color: 'text-indigo-500 bg-indigo-50 border-indigo-100',
    },
    {
      title: 'Riwayat Pemeriksaan Privat',
      desc: 'Mencatat perkembangan kesehatan siswa secara berkala dan terorganisasi untuk pemantauan jangka panjang.',
      icon: ShieldCheck,
      color: 'text-emerald-500 bg-emerald-50 border-emerald-100',
    },
    {
      title: 'Edukasi Kesehatan Interaktif',
      desc: 'Menyajikan materi literasi kesehatan seputar bahaya rokok, kesehatan reproduksi, pola makan, & PHBS.',
      icon: Heart,
      color: 'text-rose-500 bg-rose-50 border-rose-100',
    },
  ];

  const contacts = [
    'Shafaptya@gmail.com',
    'aqilaputrinabila217@gmail.com',
    'primamega22@gmail.com',
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-10 space-y-10 sm:space-y-16">
      
      {/* HERO SECTION */}
      <section className="glass-card p-6 sm:p-12 rounded-3xl bg-white border-sky-100 shadow-xl shadow-sky-500/5 text-center space-y-5 sm:space-y-6 relative overflow-hidden">
        <div className="absolute -top-24 -right-24 w-72 h-72 bg-sky-200/30 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute -bottom-24 -left-24 w-72 h-72 bg-emerald-200/30 rounded-full blur-3xl pointer-events-none"></div>

        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-sky-100 text-sky-700 text-xs font-extrabold mx-auto">
          <Sparkles className="w-3.5 h-3.5 text-sky-500 shrink-0" />
          <span>Tentang Aplikasi</span>
        </div>

        <div className="flex flex-col items-center justify-center gap-3">
          <Image
            src="/logoeduwellnesss.png"
            alt="EduWellness Logo"
            width={64}
            height={64}
            className="w-14 h-14 sm:w-18 sm:h-18 object-contain drop-shadow-md"
          />
          <h1 className="text-2xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight">
            EduWellness <span className="text-sky-500">IoT Health Education</span>
          </h1>
        </div>

        <p className="text-slate-600 text-xs sm:text-base lg:text-lg max-w-3xl mx-auto leading-relaxed">
          EduWellness IoT Health Education adalah aplikasi berbasis website yang mengintegrasikan teknologi Internet of Things (IoT) untuk memantau suhu tubuh dan detak jantung sekaligus memberikan edukasi kesehatan kepada remaja. Aplikasi ini bertujuan meningkatkan literasi kesehatan, membantu deteksi dini kondisi tubuh, serta membangun kebiasaan hidup sehat bagi siswa serta memberikan rekomendasi kesehatan bagi siswa.
        </p>

        {/* TARGET PENGGUNA BADGE */}
        <div className="pt-2 flex flex-wrap justify-center items-center gap-2">
          <span className="text-xs font-bold text-slate-500 flex items-center gap-1.5">
            <GraduationCap className="w-4 h-4 text-sky-500 shrink-0" /> Sasaran Utama:
          </span>
          <span className="px-3.5 py-1.5 rounded-full bg-sky-50 border border-sky-200 text-sky-700 text-xs font-extrabold shadow-xs text-center">
            Siswa SMP N 1 Seyegan (Kelas VII, VIII, dan IX)
          </span>
        </div>
      </section>

      {/* LATAR BELAKANG */}
      <section className="glass-card p-6 sm:p-8 rounded-3xl bg-white border-sky-100 shadow-md space-y-3 sm:space-y-4">
        <div className="flex items-center gap-2 text-sky-600 font-extrabold text-xs sm:text-sm uppercase tracking-wider">
          <Award className="w-4 h-4 text-sky-500 shrink-0" /> Latar Belakang Pengembangan
        </div>
        <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900">
          Mengapa EduWellness Dikembangkan?
        </h2>
        <p className="text-slate-600 text-xs sm:text-base leading-relaxed">
          Masih rendahnya literasi kesehatan di kalangan remaja menyebabkan kurangnya kesadaran terhadap pentingnya menjaga kesehatan. EduWellness dikembangkan sebagai solusi inovatif yang menggabungkan pemantauan kesehatan berbasis IoT dengan media edukasi interaktif sehingga pengguna dapat mengetahui kondisi tubuh secara real-time dan meningkatkan kesadaran hidup sehat secara mandiri.
        </p>
      </section>

      {/* VISI & MISI */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
        {/* VISI */}
        <div className="glass-card p-6 sm:p-8 rounded-3xl bg-white border-sky-100 space-y-4 shadow-md flex flex-col justify-between">
          <div className="space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-sky-50 flex items-center justify-center text-sky-600 border border-sky-100">
              <Target className="w-6 h-6" />
            </div>
            <h3 className="text-xl sm:text-2xl font-extrabold text-slate-900">Visi</h3>
            <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
              Menjadi solusi digital kesehatan berbasis IoT yang mengintegrasikan pemantauan kondisi kesehatan secara real-time dengan edukasi kesehatan interaktif guna menciptakan generasi yang sehat, sadar akan pentingnya menjaga kesehatan, serta mampu menerapkan pola hidup sehat dalam kehidupan sehari-hari.
            </p>
          </div>
        </div>

        {/* MISI */}
        <div className="glass-card p-6 sm:p-8 rounded-3xl bg-white border-sky-100 space-y-4 shadow-md">
          <div className="w-12 h-12 rounded-2xl bg-emerald-50 flex items-center justify-center text-emerald-600 border border-emerald-100">
            <Compass className="w-6 h-6" />
          </div>
          <h3 className="text-xl sm:text-2xl font-extrabold text-slate-900">Misi</h3>
          <ul className="space-y-2.5 text-xs sm:text-sm text-slate-600">
            <li className="flex items-start gap-2.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
              <span>Menyediakan pemantauan kesehatan secara real-time melalui perangkat IoT.</span>
            </li>
            <li className="flex items-start gap-2.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
              <span>Menyajikan informasi kesehatan yang akurat dan mudah dipahami oleh remaja.</span>
            </li>
            <li className="flex items-start gap-2.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
              <span>Mendorong penerapan gaya hidup sehat sejak usia remaja secara konsisten.</span>
            </li>
            <li className="flex items-start gap-2.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
              <span>Mendukung program kesehatan sekolah melalui pemanfaatan teknologi digital terintegrasi.</span>
            </li>
          </ul>
        </div>
      </div>

      {/* FITUR UNGGULAN & KEUNGGULAN APLIKASI */}
      <section className="space-y-6 sm:space-y-8">
        <div className="text-center space-y-2 max-w-2xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">Fitur & Keunggulan Utama</h2>
          <p className="text-slate-600 text-xs sm:text-sm">
            EduWellness IoT Health Education dapat diakses pengguna perangkat Android maupun iOS, menampilkan data secara real-time, terdapat riwayat pemeriksaan, serta edukasi kesehatan interaktif.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {features.map((feat, i) => {
            const IconComp = feat.icon;
            return (
              <div key={i} className="glass-card p-5 sm:p-6 rounded-3xl bg-white border-sky-100 space-y-3 shadow-xs hover:shadow-md transition-shadow">
                <div className={`w-12 h-12 rounded-2xl flex items-center justify-center border ${feat.color}`}>
                  <IconComp className="w-6 h-6" />
                </div>
                <h3 className="text-base font-bold text-slate-900">{feat.title}</h3>
                <p className="text-xs text-slate-500 leading-relaxed">{feat.desc}</p>
              </div>
            );
          })}
        </div>
      </section>

      {/* TIM PENGEMBANG */}
      <section className="space-y-6 sm:space-y-8">
        <div className="text-center space-y-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-sky-100 text-sky-700 text-xs font-extrabold mx-auto">
            <Users className="w-4 h-4 text-sky-500 shrink-0" />
            <span>Developer Team</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">Tim Pengembang</h2>
          <p className="text-slate-600 text-xs sm:text-sm">Kolaborasi tim yang mengembangkan EduWellness IoT Health Education</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
          {teamMembers.map((member, idx) => (
            <div key={idx} className="glass-card p-5 sm:p-6 rounded-3xl bg-white border-sky-100 space-y-4 shadow-md flex flex-col justify-between relative overflow-hidden group">
              <div className="space-y-3">
                <div className={`w-12 h-12 rounded-2xl bg-gradient-to-tr ${member.color} text-white flex items-center justify-center font-black text-xl shadow-md`}>
                  {member.name.charAt(0)}
                </div>
                <div>
                  <h3 className="text-base sm:text-lg font-extrabold text-slate-900">{member.name}</h3>
                  <span className={`inline-block px-3 py-1 rounded-full text-[11px] font-extrabold border mt-1 ${member.badgeBg}`}>
                    {member.role}
                  </span>
                </div>
                <p className="text-xs text-slate-500 leading-relaxed pt-1">
                  {member.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* TEKNOLOGI YANG DIGUNAKAN */}
      <section className="glass-card p-6 sm:p-10 rounded-3xl bg-white border-sky-100 space-y-4 sm:space-y-6 shadow-md">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-sky-50 flex items-center justify-center text-sky-600 border border-sky-100 shrink-0">
            <Cpu className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-lg sm:text-xl font-extrabold text-slate-900">Teknologi yang Digunakan</h3>
            <p className="text-xs text-slate-500">Kombinasi teknologi web modern, cloud, dan perangkat keras IoT</p>
          </div>
        </div>

        <div className="flex flex-wrap gap-2 sm:gap-3">
          {techStack.map((tech, i) => (
            <div key={i} className="px-3.5 py-1.5 sm:px-4 sm:py-2 rounded-2xl bg-slate-50 border border-slate-200 text-slate-800 text-xs font-extrabold flex items-center gap-2 shadow-2xs">
              <span className={`px-2 py-0.5 rounded-lg text-[10px] uppercase tracking-wider ${tech.bg}`}>
                {tech.category}
              </span>
              <span>{tech.name}</span>
            </div>
          ))}
        </div>
      </section>

      {/* KONTAK & HAK CIPTA */}
      <section className="glass-card p-6 sm:p-8 rounded-3xl bg-white border-sky-100 grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 items-center shadow-md">
        <div className="space-y-3">
          <h3 className="text-lg sm:text-xl font-extrabold text-slate-900 flex items-center gap-2">
            <Mail className="w-5 h-5 text-sky-500 shrink-0" /> Hubungi Kami
          </h3>
          <p className="text-xs text-slate-500 leading-relaxed">
            Untuk informasi lebih lanjut mengenai aplikasi EduWellness IoT Health Education atau kerja sama program sekolah, silakan hubungi tim kami:
          </p>
          <div className="space-y-1.5 pt-1">
            {contacts.map((email, i) => (
              <a 
                key={i} 
                href={`mailto:${email}`}
                className="block text-xs font-bold text-sky-600 hover:text-sky-700 transition-colors truncate"
              >
                ✉️ {email}
              </a>
            ))}
          </div>
        </div>

        <div className="p-5 sm:p-6 rounded-2xl bg-sky-50 border border-sky-100 text-center space-y-2">
          <span className="text-xs font-extrabold text-sky-700 tracking-wider uppercase">Hak Cipta</span>
          <div className="text-xl sm:text-2xl font-black text-slate-900">© 2026 EduWellness</div>
          <p className="text-[11px] text-slate-500 font-semibold leading-relaxed">
            Hak Cipta Dilindungi. Dikembangkan untuk Literasi & Pemantauan Kesehatan Siswa.
          </p>
        </div>
      </section>

    </div>
  );
}

