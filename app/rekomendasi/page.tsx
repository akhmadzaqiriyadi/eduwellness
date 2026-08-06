'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { 
  Sparkles, 
  Activity, 
  Heart, 
  Droplet, 
  Apple, 
  Moon, 
  ShieldCheck, 
  ArrowRight, 
  RefreshCw, 
  CheckCircle2, 
  AlertTriangle,
  Zap,
  Printer
} from 'lucide-react';
import { generateHealthRecommendation, getTemperatureStatus, getBpmStatus } from '@/lib/health';

export default function RekomendasiPage() {
  const [suhuObjek, setSuhuObjek] = useState<number>(36.5);
  const [suhuAmbient, setSuhuAmbient] = useState<number>(29.8);
  const [bpm, setBpm] = useState<number>(72);
  const [isWifiConnected, setIsWifiConnected] = useState<boolean>(true);
  const [loading, setLoading] = useState<boolean>(true);

  const fetchLiveSensor = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/sensor', { cache: 'no-store' });
      if (res.ok) {
        const data = await res.json();
        if (data && data.suhuObjek !== undefined) {
          setSuhuObjek(data.suhuObjek);
          setSuhuAmbient(data.suhuAmbient || 29.8);
          setBpm(data.bpm || 0);
          setIsWifiConnected(data.isWifiConnected ?? false);
        }
      }
    } catch (e) {
      console.error('Failed to fetch sensor data:', e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLiveSensor();
    const interval = setInterval(fetchLiveSensor, 3000);
    return () => clearInterval(interval);
  }, []);

  const tempStatus = getTemperatureStatus(suhuObjek);
  const bpmStatus = getBpmStatus(bpm);
  const recommendation = generateHealthRecommendation(suhuObjek, bpm);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-10 space-y-8 sm:space-y-10">
      
      {/* HERO BANNER REKOMENDASI */}
      <div className="glass-card p-6 sm:p-12 rounded-3xl bg-white border-sky-100 grid grid-cols-1 md:grid-cols-12 gap-6 sm:gap-8 items-center shadow-xl shadow-sky-500/5">
        <div className="md:col-span-7 space-y-3 sm:space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-sky-100 text-sky-700 text-xs font-extrabold border border-sky-200">
            <Sparkles className="w-4 h-4 text-sky-500 shrink-0" />
            <span>Sistem Rekomendasi Kesehatan Cerdas</span>
          </div>

          <h1 className="text-2xl sm:text-4xl md:text-5xl font-black text-slate-900 leading-tight">
            Rekomendasi <br className="hidden sm:inline" />
            <span className="text-gradient">Kesehatan Personal</span>
          </h1>

          <p className="text-slate-600 text-xs sm:text-base leading-relaxed font-normal">
            Analisis otomatis berbasis data real-time suhu tubuh (MLX90614) dan detak jantung (MAX30102) untuk gaya hidup sehat siswa.
          </p>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5 sm:gap-3 pt-2">
            <button
              onClick={fetchLiveSensor}
              className="w-full sm:w-auto px-6 py-3 rounded-full bg-sky-500 hover:bg-sky-600 text-white font-extrabold text-xs flex items-center justify-center gap-2 shadow-lg shadow-sky-500/25 hover:scale-105 transition-all"
            >
              <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
              Perbarui Data Sensor
            </button>

            <Link
              href="/dashboard"
              className="w-full sm:w-auto px-6 py-3 rounded-full bg-sky-50 text-sky-700 border border-sky-200 font-extrabold text-xs hover:bg-sky-100 transition-all flex items-center justify-center gap-2"
            >
              <Zap className="w-4 h-4 text-sky-500" />
              Lihat Live IoT Dashboard
            </Link>
          </div>
        </div>

        <div className="md:col-span-5 relative h-52 sm:h-64 md:h-72 rounded-2xl overflow-hidden border border-sky-100 shadow-md">
          <Image
            src="/literasi.jpeg"
            alt="Rekomendasi Kesehatan EduWellness"
            fill
            className="object-cover"
            priority
          />
        </div>
      </div>


      {/* CURRENT CONDITION OVERVIEW CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
        
        {/* SUHU CARD */}
        <div className="glass-card p-5 sm:p-6 rounded-3xl bg-white border-sky-100 space-y-3 shadow-xs">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-sky-600 font-bold text-xs">
              <Activity className="w-4 h-4 shrink-0" />
              <span>Suhu Tubuh</span>
            </div>
            <span className={`px-3 py-1 rounded-full text-[11px] font-bold ${tempStatus.color}`}>
              {tempStatus.text}
            </span>
          </div>

          <div className="flex items-baseline gap-2">
            <span className="text-3xl sm:text-4xl font-black text-sky-600">{suhuObjek.toFixed(1)}</span>
            <span className="text-base sm:text-lg font-bold text-sky-400">°C</span>
          </div>

          <p className="text-xs text-slate-500 leading-relaxed pt-2 border-t border-sky-50">
            {recommendation.temperatureAdvice}
          </p>
        </div>

        {/* DETAK JANTUNG CARD */}
        <div className="glass-card p-5 sm:p-6 rounded-3xl bg-white border-rose-100 space-y-3 shadow-xs">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-rose-500 font-bold text-xs">
              <Heart className="w-4 h-4 fill-rose-500 shrink-0" />
              <span>Detak Jantung</span>
            </div>
            <span className={`px-3 py-1 rounded-full text-[11px] font-bold ${bpmStatus.color}`}>
              {bpmStatus.text}
            </span>
          </div>

          <div className="flex items-baseline gap-2">
            <span className="text-3xl sm:text-4xl font-black text-rose-500">{bpm > 0 ? bpm : '--'}</span>
            <span className="text-base sm:text-lg font-bold text-rose-400">BPM</span>
          </div>

          <p className="text-xs text-slate-500 leading-relaxed pt-2 border-t border-rose-50">
            {recommendation.bpmAdvice}
          </p>
        </div>

        {/* OVERALL HEALTH SUMMARY CARD */}
        <div className="glass-card p-5 sm:p-6 rounded-3xl bg-gradient-to-br from-sky-50 to-indigo-50 border-sky-200 space-y-3 shadow-xs">
          <div className="flex items-center justify-between">
            <span className="text-xs text-sky-800 font-bold flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-sky-600 shrink-0" /> Ringkasan Kesehatan
            </span>
            <span className={`px-3 py-1 rounded-full text-[11px] font-extrabold border ${recommendation.statusColor}`}>
              {recommendation.statusBadge}
            </span>
          </div>

          <p className="text-xs text-slate-700 leading-relaxed font-semibold">
            {recommendation.summary}
          </p>

          <div className="pt-2">
            <button
              onClick={() => window.print()}
              className="w-full py-2.5 rounded-xl bg-white hover:bg-sky-100 border border-sky-200 text-sky-700 font-bold text-xs flex items-center justify-center gap-2 shadow-xs transition-all"
            >
              <Printer className="w-3.5 h-3.5" /> Cetak Rekomendasi
            </button>
          </div>
        </div>

      </div>

      {/* DETAILED CATEGORY RECOMMENDATION CARDS */}
      <div className="space-y-6">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">Panduan Gaya Hidup Sehat Siswa</h2>
          <p className="text-xs text-slate-500">Rekomendasi spesifik berdasarkan analisis kondisi tubuhmu saat ini</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
          
          {/* CATEGORY 1: HIDRASI */}
          <div className="glass-card p-5 sm:p-6 rounded-3xl bg-white border-sky-100 space-y-4 shadow-md shadow-sky-500/5">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-2xl bg-sky-50 border border-sky-100 flex items-center justify-center text-sky-500 shrink-0">
                <Droplet className="w-5 h-5 sm:w-6 sm:h-6" />
              </div>
              <div>
                <h3 className="text-base font-bold text-slate-900">Hidrasi & Kebutuhan Cairan</h3>
                <span className="text-xs text-slate-500">Menjaga keseimbangan suhu & organ</span>
              </div>
            </div>

            <ul className="space-y-2.5 text-xs text-slate-600">
              {recommendation.categories[0].items.map((item, idx) => (
                <li key={idx} className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-sky-500 shrink-0 mt-0.5" />
                  <span className="leading-relaxed">{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* CATEGORY 2: NUTRISI */}
          <div className="glass-card p-5 sm:p-6 rounded-3xl bg-white border-sky-100 space-y-4 shadow-md shadow-sky-500/5">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-2xl bg-emerald-50 border border-emerald-100 flex items-center justify-center text-emerald-600 shrink-0">
                <Apple className="w-5 h-5 sm:w-6 sm:h-6" />
              </div>
              <div>
                <h3 className="text-base font-bold text-slate-900">Nutrisi & Isi Piringku</h3>
                <span className="text-xs text-slate-500">Asupan gizi seimbang untuk remaja</span>
              </div>
            </div>

            <ul className="space-y-2.5 text-xs text-slate-600">
              {recommendation.categories[1].items.map((item, idx) => (
                <li key={idx} className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                  <span className="leading-relaxed">{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* CATEGORY 3: ISTIRAHAT */}
          <div className="glass-card p-5 sm:p-6 rounded-3xl bg-white border-sky-100 space-y-4 shadow-md shadow-sky-500/5">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-2xl bg-purple-50 border border-purple-100 flex items-center justify-center text-purple-600 shrink-0">
                <Moon className="w-5 h-5 sm:w-6 sm:h-6" />
              </div>
              <div>
                <h3 className="text-base font-bold text-slate-900">Pola Istirahat & Tidur</h3>
                <span className="text-xs text-slate-500">Pemulihan stamina & fokus belajar</span>
              </div>
            </div>

            <ul className="space-y-2.5 text-xs text-slate-600">
              {recommendation.categories[2].items.map((item, idx) => (
                <li key={idx} className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-purple-500 shrink-0 mt-0.5" />
                  <span className="leading-relaxed">{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* CATEGORY 4: AKTIVITAS FISIK */}
          <div className="glass-card p-5 sm:p-6 rounded-3xl bg-white border-sky-100 space-y-4 shadow-md shadow-sky-500/5">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-2xl bg-amber-50 border border-amber-100 flex items-center justify-center text-amber-600 shrink-0">
                <Activity className="w-5 h-5 sm:w-6 sm:h-6" />
              </div>
              <div>
                <h3 className="text-base font-bold text-slate-900">Aktivitas Fisik & Olahraga</h3>
                <span className="text-xs text-slate-500">Menjaga kebugaran jantung & otot</span>
              </div>
            </div>

            <ul className="space-y-2.5 text-xs text-slate-600">
              {recommendation.categories[3].items.map((item, idx) => (
                <li key={idx} className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                  <span className="leading-relaxed">{item}</span>
                </li>
              ))}
            </ul>
          </div>

        </div>
      </div>

      {/* CALL TO ACTION BOTTOM BANNER */}
      <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-sky-500 via-sky-600 to-blue-600 text-white flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl shadow-sky-500/20 border border-sky-400/30">
        <div className="space-y-2 text-center md:text-left">
          <h3 className="text-lg sm:text-xl font-black text-white">Ingin Catat Hasil Rekomendasi Ini?</h3>
          <p className="text-xs text-sky-100 max-w-xl font-medium leading-relaxed">
            Simpan data pengecekan kesehatanmu ke Riwayat untuk memantau perkembangan kebugaranmu dari waktu ke waktu.
          </p>
        </div>

        <Link
          href="/dashboard"
          className="w-full sm:w-auto px-8 py-3.5 rounded-full bg-white hover:bg-sky-50 text-sky-600 font-extrabold text-xs shadow-lg flex items-center justify-center gap-2 shrink-0 transition-all hover:scale-105"
        >
          Ke Dashboard IoT <ArrowRight className="w-4 h-4" />
        </Link>
      </div>

    </div>
  );
}

