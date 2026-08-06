'use client';

import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { LogOut, Crown, Menu, X, Home, Info, BookOpen, Activity, Sparkles, History, UserCheck, LogIn, UserPlus } from 'lucide-react';
import { useEffect, useState } from 'react';
import { getCurrentSession, clearSession, UserSession } from '@/lib/auth';

export default function Navbar() {
  const pathname = usePathname();
  const [session, setSession] = useState<UserSession | null>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    setSession(getCurrentSession());
    setIsMobileMenuOpen(false);
  }, [pathname]);

  const handleLogout = () => {
    clearSession();
    setSession(null);
    setIsMobileMenuOpen(false);
    window.location.href = '/';
  };

  const navLinks = [
    { href: '/', label: 'Beranda', icon: Home },
    { href: '/about', label: 'About Us', icon: Info },
    { href: '/edukasi', label: 'Edukasi Kesehatan', icon: BookOpen },
    { href: '/dashboard', label: 'Status Live', icon: Activity },
    { href: '/rekomendasi', label: 'Rekomendasi', icon: Sparkles },
    { href: '/riwayat', label: 'Riwayat', icon: History },
  ];

  return (
    <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-sky-100/90 shadow-xs transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          
          {/* LOGO */}
          <Link href="/" className="flex items-center gap-2.5 sm:gap-3 group shrink-0" onClick={() => setIsMobileMenuOpen(false)}>
            <Image
              src="/logoeduwellnesss.png"
              alt="EduWellness Logo"
              width={38}
              height={38}
              className="w-9 h-9 sm:w-10 sm:h-10 object-contain group-hover:scale-105 transition-transform drop-shadow-xs"
            />
            <div className="flex flex-col">
              <span className="text-lg sm:text-xl font-extrabold tracking-tight text-slate-900 flex items-center gap-1">
                Edu<span className="text-sky-500">Wellness</span>
              </span>
              <span className="text-[9px] sm:text-[10px] font-bold text-sky-600 tracking-wider uppercase -mt-1 hidden xs:inline-block">
                IoT & Literasi Kesehatan Siswa
              </span>
            </div>
          </Link>

          {/* DESKTOP & TABLET NAVIGATION LINKS */}
          <nav className="hidden md:flex items-center gap-0.5 lg:gap-1 bg-sky-50/80 p-1 lg:p-1.5 rounded-full border border-sky-100">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`px-2.5 lg:px-4 py-1.5 lg:py-2 rounded-full text-[11px] lg:text-xs font-bold whitespace-nowrap transition-all ${
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


          {/* DESKTOP RIGHT ACTION BUTTONS & USER ROLE BADGE */}
          <div className="hidden md:flex items-center gap-3">
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

          {/* MOBILE HAMBURGER TOGGLE BUTTON */}
          <div className="flex items-center gap-2 md:hidden">
            {session && (
              <div className={`px-2.5 py-1 rounded-full border text-[11px] font-extrabold truncate max-w-[120px] ${
                session.role === 'admin' 
                  ? 'bg-amber-50 border-amber-200 text-amber-700' 
                  : 'bg-sky-50 border-sky-200 text-sky-700'
              }`}>
                {session.role === 'admin' ? 'Admin' : session.name}
              </div>
            )}

            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 rounded-2xl bg-sky-50 hover:bg-sky-100 text-sky-700 border border-sky-200 focus:outline-none transition-colors"
              aria-label="Toggle Navigation Menu"
            >
              {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>

        </div>
      </div>

      {/* MOBILE DRAWER NAVIGATION OVERLAY */}
      {isMobileMenuOpen && (
        <>
          <div 
            className="fixed inset-0 top-[65px] bg-slate-900/30 backdrop-blur-xs z-40 md:hidden"
            onClick={() => setIsMobileMenuOpen(false)}
          />
          <div className="absolute top-full left-0 right-0 bg-white/95 backdrop-blur-xl border-b border-sky-100 p-4 shadow-xl z-50 md:hidden animate-fadeIn space-y-4">
            
            <nav className="flex flex-col space-y-1">
              {navLinks.map((link) => {
                const isActive = pathname === link.href;
                const IconComponent = link.icon;
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={`flex items-center gap-3 px-4 py-3 rounded-2xl text-xs sm:text-sm font-bold transition-all ${
                      isActive
                        ? 'bg-sky-500 text-white shadow-md shadow-sky-500/25'
                        : 'text-slate-700 hover:bg-sky-50 hover:text-sky-600'
                    }`}
                  >
                    <IconComponent className="w-4 h-4 shrink-0" />
                    <span>{link.label}</span>
                  </Link>
                );
              })}
            </nav>

            <div className="pt-3 border-t border-sky-100">
              {session ? (
                <div className="space-y-2">
                  <div className="flex items-center justify-between px-4 py-2.5 rounded-2xl bg-slate-50 border border-slate-200">
                    <span className="text-xs text-slate-500 font-medium">Masuk Sebagai:</span>
                    <span className={`px-2.5 py-0.5 rounded-full text-xs font-extrabold border ${
                      session.role === 'admin' 
                        ? 'bg-amber-50 border-amber-200 text-amber-700' 
                        : 'bg-sky-50 border-sky-200 text-sky-700'
                    }`}>
                      {session.role === 'admin' ? '👑 Admin' : `👤 ${session.name}`}
                    </span>
                  </div>

                  <button
                    onClick={handleLogout}
                    className="w-full py-3 rounded-2xl bg-rose-50 hover:bg-rose-100 text-rose-600 border border-rose-200 font-extrabold text-xs flex items-center justify-center gap-2 transition-all shadow-xs"
                  >
                    <LogOut className="w-4 h-4" /> Keluar dari Akun
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-2 gap-2">
                  <Link
                    href="/login"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="py-3 rounded-2xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs text-center flex items-center justify-center gap-1.5 transition-all"
                  >
                    <LogIn className="w-4 h-4 text-sky-600" /> Masuk
                  </Link>
                  <Link
                    href="/register"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="py-3 rounded-2xl bg-sky-500 hover:bg-sky-600 text-white font-extrabold text-xs text-center flex items-center justify-center gap-1.5 shadow-md shadow-sky-500/25 transition-all"
                  >
                    <UserPlus className="w-4 h-4" /> Daftar Gratis
                  </Link>
                </div>
              )}
            </div>

          </div>
        </>
      )}
    </header>
  );
}

