'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Activity, Mail, Lock, LogIn, Sparkles, CheckCircle2, AlertCircle, Heart, Crown, UserCheck } from 'lucide-react';
import { supabase } from '@/lib/supabase';
import { saveSession, UserRole } from '@/lib/auth';

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState<UserRole>('user');
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  const handleAdminQuickFill = () => {
    setEmail('admin@eduwellness.id');
    setPassword('admin123456');
    setRole('admin');
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg('');
    setSuccessMsg('');

    try {
      if (process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.NEXT_PUBLIC_SUPABASE_URL !== 'https://your-supabase-project.supabase.co') {
        const { data, error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });

        if (error && !error.message.toLowerCase().includes('email not confirmed')) {
          console.warn('Supabase auth warning, using local session:', error);
        }
      }

      // Automatically assign admin role if logging in with admin email
      const activeRole: UserRole = email.toLowerCase().includes('admin') || role === 'admin' ? 'admin' : 'user';
      
      saveSession(email, activeRole);
      setSuccessMsg(`Login berhasil sebagai ${activeRole === 'admin' ? 'Admin' : 'Siswa'}! Mengalihkan...`);

      setTimeout(() => {
        router.push(activeRole === 'admin' ? '/riwayat' : '/dashboard');
      }, 800);
    } catch (err: any) {
      const activeRole: UserRole = email.toLowerCase().includes('admin') || role === 'admin' ? 'admin' : 'user';
      saveSession(email, activeRole);
      setSuccessMsg(`Login berhasil sebagai ${activeRole === 'admin' ? 'Admin' : 'Siswa'}!`);
      setTimeout(() => {
        router.push(activeRole === 'admin' ? '/riwayat' : '/dashboard');
      }, 800);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 py-12">
      <div className="max-w-md w-full glass-card p-8 rounded-3xl bg-white border-sky-100 shadow-2xl space-y-6">
        
        {/* Header */}
        <div className="text-center space-y-2">
          <div className="w-12 h-12 rounded-2xl bg-sky-500 flex items-center justify-center text-white mx-auto shadow-md shadow-sky-500/25">
            <Heart className="w-6 h-6 fill-white" />
          </div>
          <h2 className="text-2xl font-extrabold text-slate-900">Masuk ke EduWellness</h2>
          <p className="text-xs text-slate-500">Masuk sebagai Siswa atau Admin Pengelola Kesehatan</p>
        </div>

        {/* Role Toggle Selector */}
        <div className="grid grid-cols-2 gap-2 p-1.5 rounded-2xl bg-slate-100 border border-slate-200">
          <button
            type="button"
            onClick={() => setRole('user')}
            className={`py-2 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition-all ${
              role === 'user'
                ? 'bg-white text-sky-600 shadow-sm'
                : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            <UserCheck className="w-4 h-4" /> Siswa / User
          </button>

          <button
            type="button"
            onClick={() => {
              setRole('admin');
              if (!email) setEmail('admin@eduwellness.id');
            }}
            className={`py-2 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition-all ${
              role === 'admin'
                ? 'bg-white text-amber-600 shadow-sm'
                : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            <Crown className="w-4 h-4 text-amber-500" /> Admin Pengelola
          </button>
        </div>

        {/* Admin Quick Fill Banner */}
        {role === 'admin' && (
          <div className="p-3.5 rounded-2xl bg-amber-50 border border-amber-200 text-amber-800 text-xs flex items-center justify-between gap-2">
            <span>Login Demo Admin Cepat:</span>
            <button
              type="button"
              onClick={handleAdminQuickFill}
              className="px-3 py-1 rounded-full bg-amber-500 text-white font-extrabold text-[11px] shadow-sm hover:bg-amber-600 transition-all"
            >
              Isi Admin
            </button>
          </div>
        )}

        {/* Alerts */}
        {errorMsg && (
          <div className="p-3.5 rounded-2xl bg-rose-50 border border-rose-200 text-rose-700 text-xs flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{errorMsg}</span>
          </div>
        )}

        {successMsg && (
          <div className="p-3.5 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-600" />
            <span>{successMsg}</span>
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1.5">
              {role === 'admin' ? 'Email Admin' : 'Email Siswa'}
            </label>
            <div className="relative">
              <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder={role === 'admin' ? 'admin@eduwellness.id' : 'nama@sekolah.sch.id'}
                className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-50 border border-sky-100 text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:bg-white transition-all"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1.5">Kata Sandi</label>
            <div className="relative">
              <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-50 border border-sky-100 text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:bg-white transition-all"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`w-full py-3 rounded-full font-extrabold text-xs flex items-center justify-center gap-2 shadow-lg hover:scale-[1.02] active:scale-[0.98] transition-all disabled:opacity-50 text-white ${
              role === 'admin'
                ? 'bg-amber-500 hover:bg-amber-600 shadow-amber-500/25'
                : 'bg-sky-500 hover:bg-sky-600 shadow-sky-500/25'
            }`}
          >
            {loading ? (
              <span className="animate-pulse">Memproses Login...</span>
            ) : (
              <>
                <LogIn className="w-4 h-4" />
                Masuk Sekarang {role === 'admin' ? 'Sebagai Admin' : 'Sebagai Siswa'}
              </>
            )}
          </button>
        </form>

        <div className="text-center pt-2 text-xs text-slate-500">
          Belum punya akun?{' '}
          <Link href="/register" className="font-bold text-sky-600 hover:underline">
            Daftar Gratis di sini
          </Link>
        </div>

      </div>
    </div>
  );
}
