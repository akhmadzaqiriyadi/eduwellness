'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { 
  User, 
  Mail, 
  School, 
  BookOpen, 
  Crown, 
  UserCheck, 
  Edit3, 
  Save, 
  Activity, 
  Clock, 
  Heart, 
  ShieldCheck, 
  Calendar, 
  CheckCircle2, 
  Sparkles,
  Lock,
  LogIn,
  Loader2,
  ChevronRight
} from 'lucide-react';
import { getCurrentSession, saveSession, UserSession } from '@/lib/auth';
import { HealthCheckRecord } from '@/lib/supabase';
import CustomSelect from '@/components/CustomSelect';

export default function ProfilPage() {
  const [session, setSession] = useState<UserSession | null>(null);
  const [loading, setLoading] = useState(true);
  const [history, setHistory] = useState<HealthCheckRecord[]>([]);

  // Edit Mode States
  const [isEditing, setIsEditing] = useState(false);
  const [fullName, setFullName] = useState('');
  const [school, setSchool] = useState('SMP N 1 SEYEGAN');
  const [grade, setGrade] = useState('Kelas VII');
  const [saveStatus, setSaveStatus] = useState('');
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const current = getCurrentSession();
    if (current) {
      setSession(current);
      setFullName(current.name);
      setSchool(current.school || 'SMP N 1 SEYEGAN');
      setGrade(current.grade || 'Kelas VII');

      fetchUserStats(current);
    } else {
      setSession(null);
      setLoading(false);
    }
  }, []);

  const fetchUserStats = async (userSession: UserSession) => {
    setLoading(true);
    let localData: HealthCheckRecord[] = [];

    try {
      const key = userSession.role === 'admin'
        ? 'eduwellness_admin_global_history'
        : `eduwellness_local_history_${userSession.email}`;
      const stored = localStorage.getItem(key);
      if (stored) {
        localData = JSON.parse(stored);
      }
    } catch (e) {}

    try {
      const url = userSession.role === 'admin'
        ? '/api/health-checks'
        : `/api/health-checks?email=${encodeURIComponent(userSession.email)}`;

      const res = await fetch(url, { cache: 'no-store' });
      if (res.ok) {
        const result = await res.json();
        if (result.success && Array.isArray(result.data)) {
          const map = new Map<string, HealthCheckRecord>();
          for (const item of [...localData, ...result.data]) {
            const itemKey = item.id || `${item.user_email}_${item.created_at}`;
            if (!map.has(itemKey)) map.set(itemKey, item);
          }
          const merged = Array.from(map.values());
          setHistory(merged);
        } else if (localData.length > 0) {
          setHistory(localData);
        }
      }
    } catch (e) {
      if (localData.length > 0) setHistory(localData);
    } finally {
      setLoading(false);
    }
  };

  const handleSaveProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!session) return;

    setSaving(true);
    setSaveStatus('');

    try {
      const updatedSession = saveSession(
        session.email,
        session.role,
        fullName.trim(),
        school.trim(),
        grade
      );
      setSession(updatedSession);

      // Also attempt to update Supabase users table via API
      try {
        await fetch('/api/users', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            email: session.email,
            full_name: fullName.trim(),
            school: school.trim(),
            grade: grade,
            role: session.role,
          }),
        });
      } catch (apiErr) {
        console.warn('Supabase profile sync notice:', apiErr);
      }

      setSaveStatus('✅ Profil berhasil diperbarui!');
      setIsEditing(false);
    } catch (err: any) {
      setSaveStatus('⚠️ Gagal menyimpan profil.');
    } finally {
      setSaving(false);
    }
  };

  // Compute stats
  const totalChecks = history.length;
  const avgSuhu = totalChecks > 0
    ? (history.reduce((sum, h) => sum + h.suhu_objek, 0) / totalChecks).toFixed(1)
    : '36.5';
  const avgBpm = totalChecks > 0
    ? Math.round(history.reduce((sum, h) => sum + h.bpm, 0) / totalChecks)
    : 72;
  const lastCheck = history.length > 0 ? history[0] : null;

  if (!session) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-16">
        <div className="glass-card p-10 rounded-3xl bg-white border-sky-100 shadow-2xl text-center space-y-6">
          <div className="w-16 h-16 rounded-full bg-sky-50 border border-sky-100 flex items-center justify-center mx-auto text-sky-500">
            <Lock className="w-8 h-8" />
          </div>
          <div className="space-y-2 max-w-md mx-auto">
            <h2 className="text-2xl font-extrabold text-slate-900">Profil Siswa Privat</h2>
            <p className="text-xs text-slate-500 leading-relaxed">
              Kamu belum masuk ke akun. Silakan masuk sebagai Siswa atau Admin untuk mengakses profil dan statistik kesehatanmu.
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
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-10 space-y-6 sm:space-y-10">
      
      {/* HEADER PROFILE BANNER */}
      <div className="relative overflow-hidden p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-sky-500 via-sky-600 to-indigo-600 text-white shadow-xl shadow-sky-500/25 border border-sky-400/40">
        <div className="absolute top-0 right-0 -mt-8 -mr-8 w-64 h-64 rounded-full bg-white/10 blur-2xl pointer-events-none" />
        
        <div className="flex flex-col md:flex-row items-center md:items-start justify-between gap-6 relative z-10">
          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4 sm:gap-6 text-center sm:text-left">
            
            {/* AVATAR ICON */}
            <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-3xl bg-white/20 backdrop-blur-md border-2 border-white/40 flex items-center justify-center text-white shadow-lg shrink-0">
              {session.role === 'admin' ? (
                <Crown className="w-10 h-10 text-amber-300" />
              ) : (
                <User className="w-10 h-10 text-white" />
              )}
            </div>

            {/* NAME & BADGES */}
            <div className="space-y-2">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/20 backdrop-blur-md text-white text-xs font-bold border border-white/30">
                <Sparkles className="w-3.5 h-3.5 text-sky-200 shrink-0" />
                <span>EduWellness Student Profile</span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
                {session.name}
              </h1>
              <p className="text-xs text-sky-100 flex items-center justify-center sm:justify-start gap-1.5 font-medium">
                <Mail className="w-3.5 h-3.5 shrink-0" /> {session.email}
              </p>

              <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2 pt-1">
                <span className="px-3 py-1 rounded-full bg-white text-sky-700 font-extrabold text-[11px] shadow-xs flex items-center gap-1">
                  <School className="w-3.5 h-3.5 text-sky-500" /> {session.school || 'SMP N 1 SEYEGAN'}
                </span>
                <span className="px-3 py-1 rounded-full bg-sky-400/40 border border-white/30 text-white font-extrabold text-[11px] backdrop-blur-xs flex items-center gap-1">
                  <BookOpen className="w-3.5 h-3.5" /> {session.grade || 'Kelas VII'}
                </span>
                <span className={`px-3 py-1 rounded-full font-black text-[11px] shadow-xs ${
                  session.role === 'admin' ? 'bg-amber-400 text-slate-900' : 'bg-emerald-400 text-slate-900'
                }`}>
                  {session.role === 'admin' ? '👑 Admin Pengelola' : '👤 Siswa Terverifikasi'}
                </span>
              </div>
            </div>

          </div>

          {/* EDIT BUTTON */}
          <button
            onClick={() => setIsEditing(!isEditing)}
            className="px-5 py-2.5 rounded-full bg-white hover:bg-sky-50 text-sky-700 font-extrabold text-xs flex items-center gap-2 shadow-md hover:scale-105 transition-all shrink-0"
          >
            <Edit3 className="w-4 h-4 text-sky-500" />
            {isEditing ? 'Batal Edit' : 'Edit Profil'}
          </button>
        </div>
      </div>

      {/* EDIT PROFILE FORM CARD */}
      {isEditing && (
        <div className="glass-card p-6 sm:p-8 rounded-3xl bg-white border-sky-200 shadow-xl space-y-4 animate-fadeIn">
          <div className="flex items-center gap-2 text-sky-600 font-extrabold text-sm border-b border-sky-100 pb-3">
            <Edit3 className="w-4 h-4" /> Edit Informasi Profil Siswa
          </div>

          <form onSubmit={handleSaveProfile} className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">Nama Lengkap Siswa</label>
              <input
                type="text"
                required
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl bg-slate-50 border border-sky-100 text-sm text-slate-900 focus:outline-none focus:border-sky-500 focus:bg-white transition-all font-semibold"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">Email (Tetap)</label>
              <input
                type="email"
                disabled
                value={session.email}
                className="w-full px-4 py-2.5 rounded-xl bg-slate-100 border border-slate-200 text-sm text-slate-500 font-semibold cursor-not-allowed"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">Asal Sekolah</label>
              <input
                type="text"
                required
                value={school}
                onChange={(e) => setSchool(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl bg-slate-50 border border-sky-100 text-sm text-slate-900 focus:outline-none focus:border-sky-500 focus:bg-white transition-all font-semibold"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">Kelas</label>
              <CustomSelect
                options={[
                  { value: 'Kelas VII', label: 'Kelas VII (Tujuh)' },
                  { value: 'Kelas VIII', label: 'Kelas VIII (Delapan)' },
                  { value: 'Kelas IX', label: 'Kelas IX (Sembilan)' },
                ]}
                value={grade}
                onChange={setGrade}
              />
            </div>

            <div className="sm:col-span-2 pt-2 flex items-center justify-end gap-3">
              <button
                type="button"
                onClick={() => setIsEditing(false)}
                className="px-5 py-2.5 rounded-full bg-slate-100 text-slate-600 font-bold text-xs hover:bg-slate-200 transition-all"
              >
                Batal
              </button>
              <button
                type="submit"
                disabled={saving}
                className="px-6 py-2.5 rounded-full bg-sky-500 hover:bg-sky-600 text-white font-extrabold text-xs flex items-center gap-2 shadow-md shadow-sky-500/20 hover:scale-105 transition-all disabled:opacity-50"
              >
                <Save className="w-4 h-4" />
                {saving ? 'Simpan...' : 'Simpan Perubahan'}
              </button>
            </div>
          </form>
        </div>
      )}

      {saveStatus && (
        <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs font-bold flex items-center gap-2 shadow-xs">
          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
          <span>{saveStatus}</span>
        </div>
      )}

      {/* HEALTH STATS SUMMARY CARDS */}
      <div className="space-y-4">
        <h3 className="text-lg sm:text-xl font-extrabold text-slate-900 flex items-center gap-2">
          <Activity className="w-5 h-5 text-sky-500" /> Ringkasan Kesehatan Profil
        </h3>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-6">
          <div className="glass-card p-5 rounded-3xl bg-white border-sky-100 space-y-2 shadow-xs">
            <span className="text-xs text-slate-500 font-bold">Total Sesi Tes</span>
            <div className="text-2xl sm:text-3xl font-black text-slate-900">{totalChecks} kali</div>
            <span className="text-[11px] text-sky-600 font-semibold flex items-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5" /> Terdaftar di IoT
            </span>
          </div>

          <div className="glass-card p-5 rounded-3xl bg-white border-sky-100 space-y-2 shadow-xs">
            <span className="text-xs text-slate-500 font-bold">Rata-rata Suhu Tubuh</span>
            <div className="text-2xl sm:text-3xl font-black text-sky-600">{avgSuhu} °C</div>
            <span className="text-[11px] text-emerald-600 font-semibold flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5" /> MLX90614 Sensor
            </span>
          </div>

          <div className="glass-card p-5 rounded-3xl bg-white border-sky-100 space-y-2 shadow-xs">
            <span className="text-xs text-slate-500 font-bold">Rata-rata Detak Jantung</span>
            <div className="text-2xl sm:text-3xl font-black text-rose-500">{avgBpm} BPM</div>
            <span className="text-[11px] text-rose-500 font-semibold flex items-center gap-1">
              <Heart className="w-3.5 h-3.5 fill-rose-500" /> MAX30102 PPG
            </span>
          </div>

          <div className="glass-card p-5 rounded-3xl bg-white border-sky-100 space-y-2 shadow-xs">
            <span className="text-xs text-slate-500 font-bold">Status Terakhir</span>
            <div className="text-xl sm:text-2xl font-black text-emerald-600 truncate">
              {lastCheck ? lastCheck.status_kesehatan : 'Belum Tes'}
            </div>
            <span className="text-[11px] text-slate-500 font-semibold truncate">
              {lastCheck ? new Date(lastCheck.created_at || Date.now()).toLocaleDateString('id-ID') : 'Tidak Ada Data'}
            </span>
          </div>
        </div>
      </div>

      {/* QUICK ACTIONS & LINKS */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="glass-card p-6 rounded-3xl bg-gradient-to-r from-sky-50 to-indigo-50 border-sky-100 space-y-3">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-sky-500 text-white flex items-center justify-center shrink-0">
              <Activity className="w-5 h-5 animate-pulse" />
            </div>
            <div>
              <h4 className="text-base font-bold text-slate-900">Ukur Kesehatan Live (IoT)</h4>
              <p className="text-xs text-slate-500">Mulai sesi tes baru dengan sensor Wemos D1</p>
            </div>
          </div>
          <Link
            href="/dashboard"
            className="w-full py-3 rounded-2xl bg-sky-500 hover:bg-sky-600 text-white font-extrabold text-xs flex items-center justify-center gap-2 shadow-md shadow-sky-500/20 transition-all"
          >
            <span>Buka Dashboard Live</span> <ChevronRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="glass-card p-6 rounded-3xl bg-gradient-to-r from-emerald-50 to-teal-50 border-emerald-100 space-y-3">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-emerald-500 text-white flex items-center justify-center shrink-0">
              <Clock className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-base font-bold text-slate-900">Lihat Histori Pengecekan</h4>
              <p className="text-xs text-slate-500">Cek rekam medis dan ekspor log kesehatan</p>
            </div>
          </div>
          <Link
            href="/riwayat"
            className="w-full py-3 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-xs flex items-center justify-center gap-2 shadow-md shadow-emerald-600/20 transition-all"
          >
            <span>Buka Riwayat Kesehatan</span> <ChevronRight className="w-4 h-4" />
          </Link>
        </div>
      </div>

    </div>
  );
}
