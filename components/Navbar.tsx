'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LogOut, Heart } from 'lucide-react';
import { useEffect, useState } from 'react';

export default function Navbar() {
  const pathname = usePathname();
  const [userEmail, setUserEmail] = useState<string | null>(null);

  useEffect(() => {
    const email = localStorage.getItem('eduwellness_user_email');
    if (email) setUserEmail(email);
  }, [pathname]);

  const handleLogout = () => {
    localStorage.removeItem('eduwellness_user_email');
    localStorage.removeItem('eduwellness_user_name');
    setUserEmail(null);
    window.location.href = '/';
  };

  const navLinks = [
    { href: '/', label: 'Beranda' },
    { href: '/edukasi', label: 'Edukasi Kesehatan' },
    { href: '/phbs', label: 'PHBS' },
    { href: '/dashboard', label: 'Status Kesehatan' },
    { href: '/riwayat', label: 'Riwayat Tes' },
  ];

  return (
    <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-sky-100/90 shadow-sm transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* LOGO */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-2xl bg-sky-500 flex items-center justify-center text-white shadow-md shadow-sky-500/25 group-hover:scale-105 transition-transform">
              <Heart className="w-5 h-5 fill-white" />
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-extrabold tracking-tight text-slate-900 flex items-center gap-1">
                Edu<span className="text-sky-500">Wellness</span>
              </span>
              <span className="text-[10px] font-bold text-sky-600 tracking-wider uppercase -mt-1">
                IoT Health Education
              </span>
            </div>
          </Link>

          {/* NAVIGATION LINKS */}
          <nav className="hidden md:flex items-center gap-1.5 bg-sky-50/70 p-1.5 rounded-full border border-sky-100">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`px-5 py-2 rounded-full text-xs font-bold transition-all ${
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

          {/* RIGHT ACTION BUTTONS */}
          <div className="flex items-center gap-3">
            {userEmail ? (
              <div className="flex items-center gap-3">
                <span className="hidden sm:inline-block text-xs font-semibold text-slate-600 bg-sky-50 px-3 py-1.5 rounded-full border border-sky-100">
                  👤 {userEmail.split('@')[0]}
                </span>
                <button
                  onClick={handleLogout}
                  className="px-4 py-2 rounded-full bg-rose-50 text-rose-600 border border-rose-100 hover:bg-rose-100 font-bold text-xs flex items-center gap-1.5 transition-all"
                >
                  <LogOut className="w-3.5 h-3.5" /> Logout
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <Link
                  href="/login"
                  className="px-5 py-2.5 rounded-full text-xs font-bold text-slate-700 hover:text-sky-600 transition-all"
                >
                  Masuk
                </Link>
                <Link
                  href="/register"
                  className="px-5 py-2.5 rounded-full bg-sky-500 hover:bg-sky-600 text-white font-extrabold text-xs shadow-md shadow-sky-500/25 hover:scale-105 transition-all"
                >
                  Daftar Gratis 🎉
                </Link>
              </div>
            )}
          </div>

        </div>
      </div>
    </header>
  );
}
