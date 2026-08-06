'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { Mail, Lock, User, UserPlus, CheckCircle2, AlertCircle, Sparkles, Heart, School, Eye, EyeOff } from 'lucide-react';
import { supabase } from '@/lib/supabase';
import { saveSession } from '@/lib/auth';
import CustomSelect from '@/components/CustomSelect';

export default function RegisterPage() {
  const router = useRouter();
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [school, setSchool] = useState('SMP N 1 SEYEGAN');
  const [grade, setGrade] = useState('Kelas VII');
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg('');
    setSuccessMsg('');

    try {
      if (process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.NEXT_PUBLIC_SUPABASE_URL !== 'https://your-supabase-project.supabase.co') {
        await supabase.auth.signUp({
          email,
          password,
          options: {
            data: {
              full_name: fullName,
              school: school,
              grade: grade,
            },
          },
        });
      }

      saveSession(email, 'user', fullName);

      setSuccessMsg('Pendaftaran berhasil! Mengalihkan ke IoT Dashboard...');
      setTimeout(() => {
        router.push('/dashboard');
      }, 800);
    } catch (err: any) {
      console.warn('Supabase SignUp error, fallback to instant session:', err);
      saveSession(email, 'user', fullName);

      setSuccessMsg('Pendaftaran berhasil (Instant Access)!');
      setTimeout(() => {
        router.push('/dashboard');
      }, 800);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[85vh] flex items-center justify-center px-3 sm:px-4 py-8 sm:py-12">
      <div className="max-w-md w-full glass-card p-5 sm:p-8 rounded-3xl bg-white border-sky-100 shadow-2xl space-y-5 sm:space-y-6">
        
        {/* Header */}
        <div className="text-center space-y-2">
          <Image
            src="/logoeduwellnesss.png"
            alt="EduWellness Logo"
            width={48}
            height={48}
            className="w-10 h-10 sm:w-12 sm:h-12 object-contain mx-auto drop-shadow-xs"
          />
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-sky-100 text-sky-700 text-[11px] font-extrabold">
            <Sparkles className="w-3.5 h-3.5 text-sky-500 shrink-0" />
            <span>EduWellness Gen Z Community</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900">Buat Akun Siswa Baru</h2>
          <p className="text-xs text-slate-500">Gabung platform IoT literasi & pantau kesehatanmu</p>
        </div>


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
        <form onSubmit={handleRegister} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1.5">Nama Lengkap Siswa</label>
            <div className="relative">
              <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
              <input
                type="text"
                required
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="Bintang Rahmansyah"
                className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-50 border border-sky-100 text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:bg-white transition-all"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1.5">Email Siswa</label>
            <div className="relative">
              <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="siswa@sekolah.sch.id"
                className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-50 border border-sky-100 text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:bg-white transition-all"
              />
            </div>
          </div>

          {/* ASAL SEKOLAH (OTOMATIS) */}
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1.5">Asal Sekolah (Otomatis)</label>
            <div className="relative">
              <School className="w-4 h-4 text-sky-500 absolute left-3.5 top-3.5" />
              <input
                type="text"
                value={school}
                onChange={(e) => setSchool(e.target.value)}
                readOnly
                className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-sky-50/60 border border-sky-100 text-sm text-slate-900 font-extrabold focus:outline-none cursor-default"
              />
            </div>
          </div>

          {/* KELAS SMP (VII, VIII, IX) */}
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

          {/* KATA SANDI + SHOW PASSWORD TOGGLE */}
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1.5">Kata Sandi</label>
            <div className="relative">
              <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
              <input
                type={showPassword ? 'text' : 'password'}
                required
                minLength={6}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Minimal 6 karakter"
                className="w-full pl-10 pr-10 py-2.5 rounded-xl bg-slate-50 border border-sky-100 text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:bg-white transition-all"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3.5 top-3 text-slate-400 hover:text-slate-600 p-0.5 rounded-md transition-colors"
                title={showPassword ? 'Sembunyikan kata sandi' : 'Tampilkan kata sandi'}
              >
                {showPassword ? <EyeOff className="w-4 h-4 text-sky-600" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
            
            <div className="flex items-center gap-2 mt-2">
              <input
                type="checkbox"
                id="showPasswordCheckbox"
                checked={showPassword}
                onChange={(e) => setShowPassword(e.target.checked)}
                className="w-3.5 h-3.5 rounded text-sky-500 border-slate-300 focus:ring-sky-500 cursor-pointer"
              />
              <label htmlFor="showPasswordCheckbox" className="text-xs text-slate-600 font-semibold cursor-pointer select-none">
                Tampilkan Kata Sandi
              </label>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 rounded-full bg-sky-500 hover:bg-sky-600 text-white font-extrabold text-xs flex items-center justify-center gap-2 shadow-lg shadow-sky-500/25 hover:scale-[1.02] active:scale-[0.98] transition-all disabled:opacity-50"
          >
            {loading ? (
              <span className="animate-pulse">Mendaftarkan...</span>
            ) : (
              <>
                <UserPlus className="w-4 h-4" />
                Daftar Akun Gratis
              </>
            )}
          </button>
        </form>

        <div className="text-center pt-2 text-xs text-slate-500">
          Sudah punya akun?{' '}
          <Link href="/login" className="font-bold text-sky-600 hover:underline">
            Masuk di sini
          </Link>
        </div>

      </div>
    </div>
  );
}
