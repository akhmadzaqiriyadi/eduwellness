'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { 
  Activity, 
  Heart, 
  Clock, 
  Calendar, 
  ShieldCheck, 
  RefreshCw, 
  FileText, 
  CheckCircle2, 
  Plus, 
  Lock, 
  LogIn, 
  Crown,
  Search,
  Download,
  Users,
  ChevronLeft,
  ChevronRight,
  Sparkles,
  Loader2,
  Filter
} from 'lucide-react';
import { HealthCheckRecord } from '@/lib/supabase';
import { getCurrentSession, UserSession } from '@/lib/auth';
import CustomSelect from '@/components/CustomSelect';

export default function RiwayatPage() {
  const [session, setSession] = useState<UserSession | null>(null);
  const [history, setHistory] = useState<HealthCheckRecord[]>([]);
  const [loading, setLoading] = useState(true);

  // SEARCH & FILTER STATES
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('Semua');
  const [quickFilterCategory, setQuickFilterCategory] = useState<'Semua' | 'Peringatan' | 'Normal'>('Semua');
  const [sortOrder, setSortOrder] = useState<'desc' | 'asc'>('desc');
  
  // PAGINATION STATES
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 7;

  const fetchHistory = async (userSession: UserSession) => {
    setLoading(true);
    
    let localBackup: HealthCheckRecord[] = [];
    try {
      const key = userSession.role === 'admin' 
        ? 'eduwellness_admin_global_history' 
        : `eduwellness_local_history_${userSession.email}`;
      const stored = localStorage.getItem(key);
      if (stored) {
        localBackup = JSON.parse(stored);
      }
    } catch (err) {}

    try {
      const url = userSession.role === 'admin'
        ? '/api/health-checks'
        : `/api/health-checks?email=${encodeURIComponent(userSession.email)}`;

      const res = await fetch(url, { cache: 'no-store' });
      if (res.ok) {
        const result = await res.json();
        if (result.success && Array.isArray(result.data)) {
          const map = new Map<string, HealthCheckRecord>();
          for (const item of [...localBackup, ...result.data]) {
            const key = item.id || `${item.user_email}_${item.created_at}`;
            if (!map.has(key)) map.set(key, item);
          }
          const merged = Array.from(map.values()).sort((a, b) => {
            const timeA = a.created_at ? new Date(a.created_at).getTime() : 0;
            const timeB = b.created_at ? new Date(b.created_at).getTime() : 0;
            return timeB - timeA;
          });

          setHistory(merged);
          try {
            const saveKey = userSession.role === 'admin' 
              ? 'eduwellness_admin_global_history' 
              : `eduwellness_local_history_${userSession.email}`;
            localStorage.setItem(saveKey, JSON.stringify(merged));
          } catch (e) {}
          return;
        }
      }
    } catch (e) {
      console.error('Error fetching history:', e);
    } finally {
      if (localBackup.length > 0) {
        setHistory(localBackup);
      }
      setLoading(false);
    }
  };

  useEffect(() => {
    const activeSession = getCurrentSession();
    if (activeSession) {
      setSession(activeSession);
      fetchHistory(activeSession);
    } else {
      setSession(null);
      setLoading(false);
    }
  }, []);

  // FILTER & SEARCH LOGIC
  const filteredHistory = history.filter((record) => {
    const q = searchQuery.toLowerCase();
    const matchesQuery = 
      (record.user_email?.toLowerCase().includes(q) || false) ||
      (record.status_kesehatan?.toLowerCase().includes(q) || false) ||
      (new Date(record.created_at || Date.now()).toLocaleString('id-ID').toLowerCase().includes(q));

    // Status Filter
    const matchesStatusFilter = 
      statusFilter === 'Semua' || record.status_kesehatan.includes(statusFilter);

    // User Quick Category Filter
    let matchesQuickCategory = true;
    if (quickFilterCategory === 'Peringatan') {
      matchesQuickCategory = record.status_kesehatan.includes('Demam') || 
                             record.status_kesehatan.includes('Hipotermia') || 
                             record.status_kesehatan.includes('Tinggi');
    } else if (quickFilterCategory === 'Normal') {
      matchesQuickCategory = record.status_kesehatan.includes('Normal');
    }

    return matchesQuery && matchesStatusFilter && matchesQuickCategory;
  }).sort((a, b) => {
    const timeA = a.created_at ? new Date(a.created_at).getTime() : 0;
    const timeB = b.created_at ? new Date(b.created_at).getTime() : 0;
    return sortOrder === 'desc' ? timeB - timeA : timeA - timeB;
  });

  // PAGINATION COMPUTATION
  const totalPages = Math.max(1, Math.ceil(filteredHistory.length / itemsPerPage));
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedHistory = filteredHistory.slice(startIndex, endIndex);

  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, statusFilter, quickFilterCategory, sortOrder]);

  const avgSuhu = filteredHistory.length > 0
    ? (filteredHistory.reduce((sum, h) => sum + h.suhu_objek, 0) / filteredHistory.length).toFixed(1)
    : '36.5';

  const avgBpm = filteredHistory.length > 0
    ? Math.round(filteredHistory.reduce((sum, h) => sum + h.bpm, 0) / filteredHistory.length)
    : 72;

  const exportToCSV = () => {
    if (filteredHistory.length === 0) return;

    const headers = ['ID', 'Email Siswa', 'Suhu Objek (C)', 'Suhu Ambient (C)', 'BPM', 'Status', 'Waktu'];
    const rows = filteredHistory.map((h) => [
      h.id || '-',
      h.user_email || 'Anonim',
      h.suhu_objek,
      h.suhu_ambient,
      h.bpm,
      `"${h.status_kesehatan}"`,
      `"${new Date(h.created_at || Date.now()).toLocaleString('id-ID')}"`,
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map((e) => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `Riwayat_Kesehatan_EduWellness_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  if (!session) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-16">
        <div className="glass-card p-10 rounded-3xl bg-white border-sky-100 shadow-2xl text-center space-y-6">
          <div className="w-16 h-16 rounded-full bg-sky-50 border border-sky-100 flex items-center justify-center mx-auto text-sky-500">
            <Lock className="w-8 h-8" />
          </div>
          <div className="space-y-2 max-w-md mx-auto">
            <h2 className="text-2xl font-extrabold text-slate-900">Riwayat Tes Kesehatan Privat</h2>
            <p className="text-xs text-slate-500 leading-relaxed">
              Kamu belum masuk ke akun. Silakan masuk sebagai Siswa atau Admin untuk mengakses riwayat pengecekan kesehatan.
            </p>
          </div>
          <div>
            <Link
              href="/login"
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-sky-500 hover:bg-sky-600 text-white font-extrabold text-xs shadow-lg shadow-sky-500/25 hover:scale-105 transition-all"
            >
              <LogIn className="w-4 h-4" />
              Masuk ke Akun
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      
      {/* HEADER */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 glass-card p-8 rounded-3xl bg-white border-sky-100 shadow-xl shadow-sky-500/5">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold text-sky-600 mb-2">
            <Clock className="w-4 h-4 text-sky-500" />
            <span>Health History & Analytics</span>
          </div>
          <h1 className="text-3xl font-extrabold text-slate-900 flex items-center gap-2">
            Riwayat Pengecekan Kesehatan
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            {session.role === 'admin' ? (
              <span className="text-amber-700 font-bold flex items-center gap-1">
                <Crown className="w-3.5 h-3.5 text-amber-500" /> Mode Admin Pengelola: Menampilkan seluruh data kesehatan siswa
              </span>
            ) : (
              <span>Menampilkan riwayat tes pribadi milik: <strong className="text-slate-900">{session.email}</strong></span>
            )}
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <button
            onClick={() => session && fetchHistory(session)}
            className="p-3 rounded-full bg-sky-50 border border-sky-100 text-slate-600 hover:text-sky-600 transition-colors flex items-center gap-1.5"
            title="Refresh Data"
          >
            <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin text-sky-500' : ''}`} />
          </button>

          {session.role === 'admin' && (
            <button
              onClick={exportToCSV}
              className="px-5 py-3 rounded-full bg-amber-500 hover:bg-amber-600 text-white font-extrabold text-xs flex items-center gap-1.5 shadow-md hover:scale-105 transition-all"
            >
              <Download className="w-4 h-4" /> Export CSV
            </button>
          )}

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
          <div className="text-3xl font-black text-slate-900">{filteredHistory.length} kali</div>
          <span className="text-[11px] text-sky-600 flex items-center gap-1 font-semibold">
            <CheckCircle2 className="w-3.5 h-3.5" /> 
            {session.role === 'admin' ? 'Total Seluruh Siswa' : `Tersimpan untuk ${session.name}`}
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
          <div className="text-3xl font-black text-emerald-600">Sehat</div>
          <span className="text-[11px] text-slate-500 font-semibold">Pemantauan Berkala IoT</span>
        </div>
      </div>

      {/* SEARCH & REUSABLE CUSTOM SELECT FILTER BAR */}
      <div className="glass-card p-6 rounded-3xl bg-white border-sky-100 space-y-4 shadow-sm relative z-30">
        <div className="flex items-center justify-between border-b border-sky-50 pb-3">
          <span className="text-xs font-bold text-slate-800 flex items-center gap-1.5">
            <Filter className="w-4 h-4 text-sky-500" /> Filter & Pencarian Riwayat
          </span>

          <span className="text-[11px] text-slate-500 font-semibold">
            Menampilkan <strong>{filteredHistory.length}</strong> data terfilter
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {/* SEARCH INPUT */}
          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={session.role === 'admin' ? "Cari email siswa, status, atau tanggal..." : "Cari status atau tanggal..."}
              className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-50 border border-sky-100 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:bg-white transition-all"
            />
          </div>

          {/* CUSTOM REUSABLE SELECT - STATUS FILTER */}
          <CustomSelect
            options={[
              { value: 'Semua', label: 'Semua Status Kesehatan' },
              { value: 'Normal', label: 'Normal' },
              { value: 'Demam', label: 'Demam (>= 37.5°C)' },
              { value: 'Hipotermia', label: 'Hipotermia (< 20.0°C)' },
              { value: 'Tinggi', label: 'Takikardia (BPM Tinggi)' },
            ]}
            value={statusFilter}
            onChange={setStatusFilter}
          />

          {/* CUSTOM REUSABLE SELECT - SORT ORDER */}
          <CustomSelect
            options={[
              { value: 'desc', label: 'Urutan: Terbaru ke Terlama' },
              { value: 'asc', label: 'Urutan: Terlama ke Terbaru' },
            ]}
            value={sortOrder}
            onChange={(val) => setSortOrder(val as 'desc' | 'asc')}
          />
        </div>

        {/* USER QUICK CATEGORY BUTTONS */}
        {session.role === 'user' && (
          <div className="flex items-center gap-2 pt-2 border-t border-sky-50">
            <span className="text-xs text-slate-500 font-bold mr-1">Kategori Cepat:</span>
            {(['Semua', 'Normal', 'Peringatan'] as const).map((cat) => (
              <button
                key={cat}
                onClick={() => setQuickFilterCategory(cat)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all ${
                  quickFilterCategory === cat
                    ? 'bg-sky-500 text-white shadow-md shadow-sky-500/20'
                    : 'bg-slate-50 text-slate-600 hover:bg-sky-50 border border-slate-200'
                }`}
              >
                {cat === 'Semua' ? 'Semua Hasil' : cat === 'Normal' ? 'Normal' : 'Peringatan'}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* HISTORY TABLE & PAGINATION */}
      <div className="glass-card p-8 rounded-3xl bg-white border-sky-100 space-y-6 shadow-md shadow-sky-500/5 relative z-10">
        <div className="flex items-center justify-between">
          <h3 className="text-xl font-bold text-slate-900 flex items-center gap-2">
            <FileText className="w-5 h-5 text-sky-500" /> Log Pengecekan Terakhir
          </h3>
          {loading && (
            <span className="text-xs text-sky-600 font-bold flex items-center gap-1.5 animate-pulse">
              <Loader2 className="w-4 h-4 animate-spin text-sky-500" /> Memperbarui data...
            </span>
          )}
        </div>

        {loading ? (
          <div className="space-y-3 py-4">
            {[1, 2, 3, 4, 5].map((idx) => (
              <div key={idx} className="h-12 w-full rounded-2xl bg-slate-100 animate-pulse flex items-center px-4 justify-between">
                <div className="h-4 bg-slate-200 rounded w-1/4"></div>
                <div className="h-4 bg-slate-200 rounded w-1/6"></div>
                <div className="h-4 bg-slate-200 rounded w-1/6"></div>
                <div className="h-4 bg-slate-200 rounded w-1/6"></div>
              </div>
            ))}
          </div>
        ) : filteredHistory.length === 0 ? (
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
              Mulai Tes Pertama
            </Link>
          </div>
        ) : (
          <>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-sky-100 text-slate-500 font-bold">
                    <th className="pb-4 pt-2 px-4">WAKTU & TANGGAL</th>
                    {session.role === 'admin' && <th className="pb-4 pt-2 px-4">EMAIL SISWA</th>}
                    <th className="pb-4 pt-2 px-4">SUHU OBJEK</th>
                    <th className="pb-4 pt-2 px-4">SUHU AMBIENT</th>
                    <th className="pb-4 pt-2 px-4">DETAK JANTUNG</th>
                    <th className="pb-4 pt-2 px-4">STATUS KESEHATAN</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-sky-100">
                  {paginatedHistory.map((record, idx) => (
                    <tr key={record.id || idx} className="hover:bg-sky-50/50 transition-colors">
                      <td className="py-4 px-4 font-mono text-slate-700 font-semibold">
                        {new Date(record.created_at || Date.now()).toLocaleString('id-ID', {
                          day: 'numeric',
                          month: 'short',
                          year: 'numeric',
                          hour: '2-digit',
                          minute: '2-digit',
                        })}
                      </td>

                      {session.role === 'admin' && (
                        <td className="py-4 px-4 font-semibold text-slate-900">
                          {record.user_email || 'Anonim'}
                        </td>
                      )}

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
                            : record.status_kesehatan.includes('Hipotermia')
                            ? 'bg-sky-50 text-sky-700 border border-sky-200'
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

            {/* PAGINATION CONTROLS */}
            <div className="pt-4 border-t border-sky-100 flex flex-col sm:flex-row items-center justify-between gap-4">
              <span className="text-xs text-slate-500 font-medium">
                Menampilkan data <strong className="text-slate-900">{startIndex + 1}</strong> - <strong className="text-slate-900">{Math.min(endIndex, filteredHistory.length)}</strong> dari <strong className="text-slate-900">{filteredHistory.length}</strong> total catatan
              </span>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                  disabled={currentPage === 1}
                  className="px-3 py-2 rounded-xl bg-slate-50 hover:bg-sky-50 border border-slate-200 text-slate-700 text-xs font-bold flex items-center gap-1 disabled:opacity-40 disabled:hover:bg-slate-50 transition-all"
                >
                  <ChevronLeft className="w-4 h-4" /> Sebelum
                </button>

                <div className="flex items-center gap-1">
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNum) => (
                    <button
                      key={pageNum}
                      onClick={() => setCurrentPage(pageNum)}
                      className={`w-8 h-8 rounded-xl text-xs font-bold transition-all ${
                        currentPage === pageNum
                          ? 'bg-sky-500 text-white shadow-md shadow-sky-500/20'
                          : 'bg-slate-50 hover:bg-sky-50 text-slate-600 border border-slate-200'
                      }`}
                    >
                      {pageNum}
                    </button>
                  ))}
                </div>

                <button
                  onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                  disabled={currentPage === totalPages}
                  className="px-3 py-2 rounded-xl bg-slate-50 hover:bg-sky-50 border border-slate-200 text-slate-700 text-xs font-bold flex items-center gap-1 disabled:opacity-40 disabled:hover:bg-slate-50 transition-all"
                >
                  Berikut <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </>
        )}
      </div>

    </div>
  );
}
