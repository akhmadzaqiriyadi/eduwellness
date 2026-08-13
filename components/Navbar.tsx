'use client';

import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { LogOut, Crown, Menu, X, Home, Info, BookOpen, Activity, Sparkles, History, UserCheck, LogIn, UserPlus, User, ChevronDown } from 'lucide-react';
import { useEffect, useState, useRef } from 'react';
import { getCurrentSession, clearSession, UserSession } from '@/lib/auth';

export default function Navbar() {
  const pathname = usePathname();
  const [session, setSession] = useState<UserSession | null>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setSession(getCurrentSession());
    setIsMobileMenuOpen(false);
    setIsUserMenuOpen(false);
  }, [pathname]);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsUserMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLogout = () => {
    clearSession();
    setSession(null);
    setIsMobileMenuOpen(false);
    setIsUserMenuOpen(false);
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
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-sky-100/90 shadow-xs transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-18">
          
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

          {/* DESKTOP NAVIGATION LINKS (HIDDEN ON TABLETS & MOBILE <1024px) */}
          <nav className="hidden lg:flex items-center gap-1 bg-sky-50/80 p-1.5 rounded-full border border-sky-100">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`px-4 py-2 rounded-full text-xs font-bold whitespace-nowrap transition-all ${
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

          {/* DESKTOP RIGHT ACTION BUTTONS & USER DROPDOWN */}
          <div className="hidden lg:flex items-center gap-3">
            {session ? (
              <div className="relative" ref={dropdownRef}>
                <button
                  type="button"
                  onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                  className={`flex items-center gap-2 px-3.5 py-1.5 rounded-full border text-xs font-extrabold transition-all shadow-xs ${
                    session.role === 'admin' 
                      ? 'bg-amber-50 border-amber-200 text-amber-700 hover:bg-amber-100' 
                      : 'bg-sky-50 border-sky-200 text-sky-700 hover:bg-sky-100'
                  }`}
                >
                  {session.role === 'admin' ? (
                    <>
                      <Crown className="w-3.5 h-3.5 text-amber-500" />
                      <span>Admin</span>
                    </>
                  ) : (
                    <>
                      <User className="w-3.5 h-3.5 text-sky-500" />
                      <span>{session.name}</span>
                    </>
                  )}
                  <ChevronDown className={`w-3.5 h-3.5 transition-transform ${isUserMenuOpen ? 'rotate-180' : ''}`} />
                </button>

                {/* USER DROPDOWN MENU CARD */}
                {isUserMenuOpen && (
                  <div className="absolute right-0 mt-2 w-56 rounded-2xl bg-white border border-sky-100 shadow-xl py-2 space-y-1 z-50 animate-fadeIn text-xs">
                    <div className="px-4 py-2 border-b border-sky-50 space-y-0.5">
                      <p className="font-extrabold text-slate-900 truncate">{session.name}</p>
                      <p className="text-[11px] text-slate-500 font-medium truncate">{session.email}</p>
                    </div>

                    <Link
                      href="/profil"
                      onClick={() => setIsUserMenuOpen(false)}
                      className={`flex items-center gap-2.5 px-4 py-2.5 font-bold transition-all ${
                        pathname === '/profil' ? 'bg-sky-50 text-sky-600 font-extrabold' : 'text-slate-700 hover:bg-sky-50 hover:text-sky-600'
                      }`}
                    >
                      <User className="w-4 h-4 text-sky-500 shrink-0" />
                      <span>Profil Saya</span>
                    </Link>

                    <Link
                      href="/riwayat"
                      onClick={() => setIsUserMenuOpen(false)}
                      className={`flex items-center gap-2.5 px-4 py-2.5 font-bold transition-all ${
                        pathname === '/riwayat' ? 'bg-sky-50 text-sky-600 font-extrabold' : 'text-slate-700 hover:bg-sky-50 hover:text-sky-600'
                      }`}
                    >
                      <History className="w-4 h-4 text-sky-500 shrink-0" />
                      <span>Riwayat Kesehatan</span>
                    </Link>

                    <div className="border-t border-sky-50 pt-1">
                      <button
                        onClick={handleLogout}
                        className="w-full flex items-center gap-2.5 px-4 py-2.5 font-bold text-rose-600 hover:bg-rose-50 transition-all text-left"
                      >
                        <LogOut className="w-4 h-4 shrink-0" />
                        <span>Logout</span>
                      </button>
                    </div>
                  </div>
                )}
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

          {/* TABLET & MOBILE HAMBURGER TOGGLE BUTTON (<1024px) */}
          <div className="flex items-center gap-2 lg:hidden">
            {session && (
              <Link
                href="/profil"
                onClick={() => setIsMobileMenuOpen(false)}
                className={`px-2.5 py-1 rounded-full border text-[11px] font-extrabold truncate max-w-[130px] transition-all ${
                  session.role === 'admin' 
                    ? 'bg-amber-50 border-amber-200 text-amber-700' 
                    : 'bg-sky-50 border-sky-200 text-sky-700'
                }`}
                title="Buka Profil Saya"
              >
                {session.role === 'admin' ? 'Admin' : session.name}
              </Link>
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

      {/* TABLET & MOBILE DRAWER NAVIGATION OVERLAY (<1024px) */}
      {isMobileMenuOpen && (
        <>
          <div 
            className="fixed inset-0 top-full bg-slate-900/30 backdrop-blur-xs z-40 lg:hidden"
            onClick={() => setIsMobileMenuOpen(false)}
          />
          <div className="absolute top-full left-0 right-0 bg-white/95 backdrop-blur-xl border-b border-sky-100 px-4 pb-5 pt-2 shadow-xl z-50 lg:hidden animate-fadeIn space-y-3">
            
            <nav className="flex flex-col space-y-1">
              {navLinks.map((link) => {
                const isActive = pathname === link.href;
                const IconComponent = link.icon;
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={`flex items-center gap-3 px-4 py-2.5 rounded-2xl text-xs sm:text-sm font-bold transition-all ${
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

            <div className="pt-2.5 border-t border-sky-100">
              {session ? (
                <div className="space-y-2">
                  <div className="flex items-center justify-between px-4 py-2 rounded-2xl bg-slate-50 border border-slate-200">
                    <span className="text-xs text-slate-500 font-medium">Masuk Sebagai:</span>
                    <span className={`px-2.5 py-0.5 rounded-full text-xs font-extrabold border ${
                      session.role === 'admin' 
                        ? 'bg-amber-50 border-amber-200 text-amber-700' 
                        : 'bg-sky-50 border-sky-200 text-sky-700'
                    }`}>
                      {session.role === 'admin' ? '👑 Admin' : `👤 ${session.name}`}
                    </span>
                  </div>

                  <Link
                    href="/profil"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="w-full py-2.5 rounded-2xl bg-sky-50 hover:bg-sky-100 text-sky-700 border border-sky-200 font-extrabold text-xs flex items-center justify-center gap-2 transition-all shadow-xs"
                  >
                    <User className="w-4 h-4 text-sky-500" /> Profil Saya
                  </Link>

                  <button
                    onClick={handleLogout}
                    className="w-full py-2.5 rounded-2xl bg-rose-50 hover:bg-rose-100 text-rose-600 border border-rose-200 font-extrabold text-xs flex items-center justify-center gap-2 transition-all shadow-xs"
                  >
                    <LogOut className="w-4 h-4" /> Keluar dari Akun
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-2 gap-2 pt-1">
                  <Link
                    href="/login"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="py-2.5 rounded-2xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs text-center flex items-center justify-center gap-1.5 transition-all"
                  >
                    <LogIn className="w-4 h-4 text-sky-600" /> Masuk
                  </Link>
                  <Link
                    href="/register"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="py-2.5 rounded-2xl bg-sky-500 hover:bg-sky-600 text-white font-extrabold text-xs text-center flex items-center justify-center gap-1.5 shadow-md shadow-sky-500/25 transition-all"
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

