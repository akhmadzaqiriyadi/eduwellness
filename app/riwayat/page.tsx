'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Activity, Heart, Clock, Calendar, ShieldCheck, RefreshCw, FileText, CheckCircle2, Plus, Lock, LogIn } from 'lucide-react';
import { HealthCheckRecord } from '@/lib/supabase';

export default function RiwayatPage() {
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const [history, setHistory] = useState<HealthCheckRecord[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchHistory = async (email: string) => {
    setLoading(true);
    try {
      const res = await fetch(`/api/health-checks?email=${encodeURIComponent(email)}`, { cache: 'no-store' });
      if (res.ok) {
        const result = await res.json();
        if (result.success && Array.isArray(result.data)) {
          setHistory(result.data);
        }
      }
    } catch (e) {
      console.error('Error fetching history:', e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const email = localStorage.getItem('eduwellness_user_email');
    if (email) {
      setUserEmail(email);
      fetchHistory(email);
    } else {
      setUserEmail(null);
      setLoading(false);
    }
  }, []);

  const avgSuhu = history.length > 0
    ? (history.reduce((sum, h) => sum + h.suhu_objek, 0) / history.length).toFixed(1)
    : '36.5';

  const avgBpm = history.length > 0
    ? Math.round(history.reduce((sum, h) => sum + h.bpm, 0) / history.length)
    : 72;

  // IF LOGGED OUT: SHOW PRIVACY LOGIN PROMPT
  if (!userEmail) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-16">
        <div className="glass-card p-10 rounded-3xl bg-white border-sky-100 shadow-2xl text-center space-y-6">
          <div className="w-16 h-16 rounded-full bg-sky-50 border border-sky-100 flex items-center justify-center mx-auto text-sky-500">
            <Lock className="w-8 h-8" />
          </div>
          <div className="space-y-2 max-w-md mx-auto">
            <h2 className="text-2xl font-extrabold text-slate-900">Riwayat Tes Kesehatan Privat 🔒</h2>
            <p className="text-xs text-slate-500 leading-relaxed">
              Kamu telah keluar dari akun. Untuk menjaga privasi data kesehatanmu, silakan masuk kembali ke akun siswa kamu untuk melihat riwayat pengecekan pribadi.
            </p>
          </div>
          <div>
            <Link
              href="/login"
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-sky-500 hover:bg-sky-600 text-white font-extrabold text-xs shadow-lg shadow-sky-500/25 hover:scale-105 transition-all"
            >
              <LogIn className="w-4 h-4" />
              Masuk ke Akun Kamu 🔑
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // IF LOGGED IN: SHOW PRIVATE HEALTH HISTORY
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      
      {/* HEADER */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 glass-card p-8 rounded-3xl bg-white border-sky-100 shadow-xl shadow-sky-500/5">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold text-sky-600 mb-2">
            <Clock className="w-4 h-4 text-sky-500" />
            <span>Health History & Analytics</span>
          </div>
          <h1 className="text-3xl font-extrabold text-slate-900">Riwayat Pengecekan Kesehatan 📋</h1>
          <p className="text-xs text-slate-500 mt-1">
            Menampilkan riwayat tes pribadi milik: <strong className="text-slate-900">{userEmail}</strong>
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => userEmail && fetchHistory(userEmail)}
            className="p-3 rounded-full bg-sky-50 border border-sky-100 text-slate-600 hover:text-sky-600 transition-colors"
            title="Refresh Data"
          >
            <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
          </button>

          <Link
            href="/dashboard"
            className="px-6 py-3 rounded-full bg-sky-500 hover:bg-sky-600 text-white font-extrabold text-xs flex items-center gap-2 shadow-lg shadow-sky-500/25 hover:scale-105 transition-all"
          >
            <Plus className="w-4 h-4" />
            Tes Baru (Live IoT)
          </Link>
        </div>
      </div>

      {/* SUMMARY STATS CARDS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        
        <div className="glass-card p-6 rounded-3xl bg-white border-sky-100 space-y-2">
          <span className="text-xs text-slate-500 font-bold">Total Pengecekan</span>
          <div className="text-3xl font-black text-slate-900">{history.length} kali</div>
          <span className="text-[11px] text-sky-600 flex items-center gap-1 font-semibold">
            <CheckCircle2 className="w-3.5 h-3.5" /> Tersimpan untuk {userEmail.split('@')[0]}
          </span>
        </div>

        <div className="glass-card p-6 rounded-3xl bg-white border-sky-100 space-y-2">
          <span className="text-xs text-slate-500 font-bold">Rata-rata Suhu Tubuh</span>
          <div className="text-3xl font-black text-sky-600">{avgSuhu} °C</div>
          <span className="text-[11px] text-emerald-600 flex items-center gap-1 font-semibold">
            <ShieldCheck className="w-3.5 h-3.5" /> Rentang Normal (36.1 - 37.2°C)
          </span>
        </div>

        <div className="glass-card p-6 rounded-3xl bg-white border-sky-100 space-y-2">
          <span className="text-xs text-slate-500 font-bold">Rata-rata BPM</span>
          <div className="text-3xl font-black text-rose-500">{avgBpm} BPM</div>
          <span className="text-[11px] text-rose-500 flex items-center gap-1 font-semibold">
            <Heart className="w-3.5 h-3.5 fill-rose-500" /> Istirahat Normal
          </span>
        </div>

        <div className="glass-card p-6 rounded-3xl bg-white border-sky-100 space-y-2">
          <span className="text-xs text-slate-500 font-bold">Status Keseluruhan</span>
          <div className="text-3xl font-black text-emerald-600">Sehat ✅</div>
          <span className="text-[11px] text-slate-500 font-semibold">Hasil Pemantauan Teratur</span>
        </div>

      </div>

      {/* HISTORY TABLE */}
      <div className="glass-card p-8 rounded-3xl bg-white border-sky-100 space-y-6">
        <div className="flex items-center justify-between">
          <h3 className="text-xl font-bold text-slate-900 flex items-center gap-2">
            <FileText className="w-5 h-5 text-sky-500" /> Log Pengecekan Terakhir
          </h3>
          <span className="text-xs text-slate-500 font-semibold">{history.length} Catatan Ditemukan</span>
        </div>

        {loading ? (
          <div className="text-center py-12 space-y-3">
            <RefreshCw className="w-8 h-8 text-sky-500 animate-spin mx-auto" />
            <p className="text-xs text-slate-500 font-semibold">Memuat riwayat kesehatan kamu...</p>
          </div>
        ) : history.length === 0 ? (
          <div className="text-center py-12 space-y-4">
            <div className="w-16 h-16 rounded-full bg-sky-50 flex items-center justify-center mx-auto text-sky-500 border border-sky-100">
              <Calendar className="w-8 h-8" />
            </div>
            <h4 className="text-lg font-bold text-slate-900">Belum Ada Riwayat Tes</h4>
            <p className="text-xs text-slate-500 max-w-sm mx-auto">
              Lakukan tes pertama kamu di Dashboard IoT untuk mulai mencatat suhu dan detak jantungmu!
            </p>
            <Link
              href="/dashboard"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-sky-500 text-white font-extrabold text-xs shadow-md shadow-sky-500/25 hover:scale-105 transition-all"
            >
              Mulai Tes Pertama 🎉
            </Link>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-sky-100 text-slate-500 font-bold">
                  <th className="pb-4 pt-2 px-4">WAKTU & TANGGAL</th>
                  <th className="pb-4 pt-2 px-4">SUHU OBJEK</th>
                  <th className="pb-4 pt-2 px-4">SUHU AMBIENT</th>
                  <th className="pb-4 pt-2 px-4">DETAK JANTUNG</th>
                  <th className="pb-4 pt-2 px-4">STATUS KESEHATAN</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-sky-100">
                {history.map((record) => (
                  <tr key={record.id} className="hover:bg-sky-50/50 transition-colors">
                    <td className="py-4 px-4 font-mono text-slate-700 font-semibold">
                      {new Date(record.created_at || Date.now()).toLocaleString('id-ID', {
                        day: 'numeric',
                        month: 'short',
                        year: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit',
                      })}
                    </td>

                    <td className="py-4 px-4 font-extrabold text-sky-600 text-sm">
                      {record.suhu_objek.toFixed(1)} °C
                    </td>

                    <td className="py-4 px-4 text-slate-600 font-semibold">
                      {record.suhu_ambient.toFixed(1)} °C
                    </td>

                    <td className="py-4 px-4 font-extrabold text-rose-500 text-sm">
                      {record.bpm} BPM
                    </td>

                    <td className="py-4 px-4">
                      <span className={`inline-flex items-center gap-1 px-3.5 py-1 rounded-full font-bold text-[11px] ${
                        record.status_kesehatan.includes('Demam') || record.status_kesehatan.includes('Tinggi')
                          ? 'bg-amber-50 text-amber-700 border border-amber-200'
                          : 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                      }`}>
                        {record.status_kesehatan}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

    </div>
  );
}
