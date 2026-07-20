import Link from 'next/link';
import { Heart } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-white border-t border-sky-100 text-slate-600 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          
          <div className="space-y-3 md:col-span-1">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-xl bg-sky-500 flex items-center justify-center text-white">
                <Heart className="w-4 h-4 fill-white" />
              </div>
              <span className="text-lg font-extrabold text-slate-900">EduWellness</span>
            </div>
            <p className="text-xs text-slate-500 leading-relaxed">
              Platform IoT literasi kesehatan terintegrasi untuk siswa Indonesia. Memantau suhu & detak jantung real-time!
            </p>
          </div>

          <div>
            <h4 className="text-xs font-extrabold text-slate-900 uppercase tracking-wider mb-3">Navigasi Utama</h4>
            <ul className="space-y-2 text-xs font-semibold">
              <li><Link href="/" className="hover:text-sky-600">Beranda</Link></li>
              <li><Link href="/dashboard" className="hover:text-sky-600">IoT Live Dashboard</Link></li>
              <li><Link href="/riwayat" className="hover:text-sky-600">Riwayat Pengecekan</Link></li>
              <li><Link href="/edukasi" className="hover:text-sky-600">Health Education Hub</Link></li>
              <li><Link href="/phbs" className="hover:text-sky-600">10 Kebiasaan PHBS</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-extrabold text-slate-900 uppercase tracking-wider mb-3">Modul Edukasi</h4>
            <ul className="space-y-2 text-xs font-semibold">
              <li><Link href="/edukasi#rokok" className="hover:text-sky-600">🚭 Bahaya Rokok</Link></li>
              <li><Link href="/edukasi#menstruasi" className="hover:text-sky-600">🌸 Kesehatan Menstruasi</Link></li>
              <li><Link href="/edukasi#pola-makan" className="hover:text-sky-600">🍎 Pola Makan Sehat</Link></li>
              <li><Link href="/phbs" className="hover:text-sky-600">🧼 10 Kebiasaan PHBS</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-extrabold text-slate-900 uppercase tracking-wider mb-3">IoT Status</h4>
            <div className="p-4 rounded-2xl bg-sky-50 border border-sky-100 space-y-2">
              <div className="flex items-center gap-2 text-xs font-bold text-sky-700">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping"></span>
                Wemos D1 Connected
              </div>
              <p className="text-[11px] text-slate-500">MLX90614 & MAX30102 Ready</p>
            </div>
          </div>

        </div>

        <div className="border-t border-sky-100 pt-6 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500">
          <p>© 2026 EduWellness Indonesia. Hak Cipta Dilindungi.</p>
          <p className="flex items-center gap-1 font-semibold text-sky-600 mt-2 sm:mt-0">
            Dibuat khusus untuk Literasi Kesehatan Siswa 💙
          </p>
        </div>
      </div>
    </footer>
  );
}
