'use client';

import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { LogOut, Heart, Sparkles, ShieldCheck, Activity, Clock, BookOpen, Crown } from 'lucide-react';
import { useEffect, useState } from 'react';
import { getCurrentSession, clearSession, UserSession } from '@/lib/auth';

export default function Navbar() {
  const pathname = usePathname();
  const [session, setSession] = useState<UserSession | null>(null);

  useEffect(() => {
    setSession(getCurrentSession());
  }, [pathname]);

  const handleLogout = () => {
    clearSession();
    setSession(null);
    window.location.href = '/';
  };

  const navLinks = [
    { href: '/', label: 'Beranda' },
    { href: '/about', label: 'About Us' },
    { href: '/edukasi', label: 'Edukasi Kesehatan' },
    { href: '/dashboard', label: 'Status Live' },
    { href: '/rekomendasi', label: 'Rekomendasi' },
    { href: '/riwayat', label: 'Riwayat' },
  ];

  return (
    <header className="sticky top-0 z-50 bg-white/85 backdrop-blur-md border-b border-sky-100/90 shadow-sm transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* LOGO */}
          <Link href="/" className="flex items-center gap-3 group">
            <Image
              src="/logoeduwellnesss.png"
              alt="EduWellness Logo"
              width={40}
              height={40}
              className="w-10 h-10 object-contain group-hover:scale-105 transition-transform drop-shadow-sm"
            />
            <div className="flex flex-col">
              <span className="text-xl font-extrabold tracking-tight text-slate-900 flex items-center gap-1">
                Edu<span className="text-sky-500">Wellness</span>
              </span>
              <span className="text-[10px] font-bold text-sky-600 tracking-wider uppercase -mt-1">
                IoT & Literasi Kesehatan Siswa
              </span>
            </div>
          </Link>

          {/* NAVIGATION LINKS */}
          <nav className="hidden md:flex items-center gap-1 bg-sky-50/80 p-1.5 rounded-full border border-sky-100">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`px-4 py-2 rounded-full text-xs font-bold transition-all ${
                    isActive
                      ? 'bg-sky-500 text-white shadow-md shadow-sky-500/20'
                      : 'text-slate-600 hover:text-sky-600 hover:bg-white/60'
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>

          {/* RIGHT ACTION BUTTONS & USER ROLE BADGE */}
          <div className="flex items-center gap-3">
            {session ? (
              <div className="flex items-center gap-2.5">
                <div className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full border text-xs font-extrabold ${
                  session.role === 'admin' 
                    ? 'bg-amber-50 border-amber-200 text-amber-700' 
                    : 'bg-sky-50 border-sky-200 text-sky-700'
                }`}>
                  {session.role === 'admin' ? (
                    <>
                      <Crown className="w-3.5 h-3.5 text-amber-500" />
                      <span>Admin</span>
                    </>
                  ) : (
                    <span>{session.name}</span>
                  )}
                </div>

                <button
                  onClick={handleLogout}
                  className="px-3.5 py-1.5 rounded-full bg-rose-50 text-rose-600 border border-rose-200 hover:bg-rose-100 font-bold text-xs flex items-center gap-1 transition-all"
                >
                  <LogOut className="w-3.5 h-3.5" /> Logout
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <Link
                  href="/login"
                  className="px-4 py-2 rounded-full text-xs font-bold text-slate-700 hover:text-sky-600 transition-all"
                >
                  Masuk
                </Link>
                <Link
                  href="/register"
                  className="px-5 py-2.5 rounded-full bg-sky-500 hover:bg-sky-600 text-white font-extrabold text-xs shadow-md shadow-sky-500/25 hover:scale-105 transition-all"
                >
                  Daftar Gratis
                </Link>
              </div>
            )}
          </div>

        </div>
      </div>
    </header>
  );
}
