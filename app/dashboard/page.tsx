'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { Activity, Heart, Save, Clock, Zap, UserCheck, Lock, Timer, Wifi, WifiOff, Cpu, Signal, TrendingUp, Loader2, HeartPulse } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';

interface ChartPoint {
  time: string;
  suhu: number;
  bpm: number;
}

export default function DashboardPage() {
  const [suhuObjek, setSuhuObjek] = useState<number>(36.5);
  const [suhuAmbient, setSuhuAmbient] = useState<number>(30.0);
  const [bpm, setBpm] = useState<number>(0);
  const [lastUpdated, setLastUpdated] = useState<string>('');
  const [userEmail, setUserEmail] = useState<string | null>(null);

  // Wi-Fi & Device Info
  const [isWifiConnected, setIsWifiConnected] = useState<boolean>(false);
  const [deviceId, setDeviceId] = useState<string>('WEMOS-D1-UTY');
  const [wifiSsid, setWifiSsid] = useState<string>('UTY-Network');
  const [secondsAgo, setSecondsAgo] = useState<number>(0);

  const [chartData, setChartData] = useState<ChartPoint[]>([
    { time: '12:00', suhu: 36.4, bpm: 70 },
    { time: '12:02', suhu: 36.5, bpm: 72 },
    { time: '12:04', suhu: 36.6, bpm: 75 },
    { time: '12:06', suhu: 36.5, bpm: 72 },
  ]);

  const [saving, setSaving] = useState(false);
  const [saveMessage, setSaveMessage] = useState('');

  // AUTO-SAVE TIMER STATES
  const [countdown, setCountdown] = useState<number | null>(null);
  const [hasAutoSaved, setHasAutoSaved] = useState(false);
  const zeroBpmTimerRef = useRef<NodeJS.Timeout | null>(null);

  // Refs for current sensor values inside setInterval callback
  const suhuObjekRef = useRef(suhuObjek);
  const suhuAmbientRef = useRef(suhuAmbient);
  const bpmRef = useRef(bpm);
  const userEmailRef = useRef(userEmail);

  suhuObjekRef.current = suhuObjek;
  suhuAmbientRef.current = suhuAmbient;
  bpmRef.current = bpm;
  userEmailRef.current = userEmail;

  // Ref for debouncing offline connection status (prevents false lost connect flickers)
  const offlineCounterRef = useRef<number>(0);

  // 1. Poll IoT API /api/sensor every 800ms
  useEffect(() => {
    const email = localStorage.getItem('eduwellness_user_email');
    if (email) setUserEmail(email);

    const interval = setInterval(async () => {
      try {
        const res = await fetch('/api/sensor', { cache: 'no-store' });
        if (res.ok) {
          const data = await res.json();
          if (data && data.suhuObjek !== undefined) {
            setSuhuObjek(data.suhuObjek);
            setSuhuAmbient(data.suhuAmbient || 30.0);
            setBpm(data.bpm || 0);
            setLastUpdated(new Date().toLocaleTimeString());
            
            // Device Wi-Fi status with 3-poll hysteresis (~2.4s) to prevent brief disconnect flickers
            if (data.isWifiConnected) {
              offlineCounterRef.current = 0;
              setIsWifiConnected(true);
            } else {
              offlineCounterRef.current += 1;
              if (offlineCounterRef.current >= 3) {
                setIsWifiConnected(false);
              }
            }

            setDeviceId(data.deviceId || 'WEMOS-D1-UTY');
            setWifiSsid(data.wifiSsid || 'UTY-Network');
            setSecondsAgo(data.secondsAgo || 0);

            const nowTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });
            setChartData((prev) => {
              const newPoints = [...prev, { time: nowTime, suhu: data.suhuObjek, bpm: data.bpm }];
              return newPoints.slice(-12);
            });
          }
        }
      } catch (err) {
        offlineCounterRef.current += 1;
        if (offlineCounterRef.current >= 3) {
          setIsWifiConnected(false);
        }
      }
    }, 800);

    return () => clearInterval(interval);
  }, []);

  // 2. AUTO-SAVE COUNTDOWN LOGIC
  useEffect(() => {
    // Only auto-save if device is online, finger is attached (bpm > 0), user is logged in, and hasn't saved yet
    if (isWifiConnected && bpm > 0 && userEmail && !hasAutoSaved) {
      if (zeroBpmTimerRef.current) {
        clearTimeout(zeroBpmTimerRef.current);
        zeroBpmTimerRef.current = null;
      }
      if (countdown === null) {
        setCountdown(10);
      }
    } else if (bpm === 0 || !isWifiConnected) {
      setCountdown(null);
      
      // Debounce resetting hasAutoSaved (wait 2.5s of no finger / disconnected)
      if (hasAutoSaved && !zeroBpmTimerRef.current) {
        zeroBpmTimerRef.current = setTimeout(() => {
          setHasAutoSaved(false);
          zeroBpmTimerRef.current = null;
        }, 2500);
      } else if (!hasAutoSaved) {
        setHasAutoSaved(false);
      }
    }
  }, [bpm, isWifiConnected, userEmail, hasAutoSaved, countdown]);

  // 3. Countdown Ticker
  useEffect(() => {
    if (countdown === null || countdown <= 0) return;

    const timerId = setTimeout(() => {
      if (countdown === 1) {
        setCountdown(0);
        executeAutoSave();
      } else {
        setCountdown(countdown - 1);
      }
    }, 1000);

    return () => clearTimeout(timerId);
  }, [countdown]);

  const saveToLocalBackup = (email: string, record: any) => {
    try {
      const key = `eduwellness_local_history_${email}`;
      const existing = JSON.parse(localStorage.getItem(key) || '[]');
      const updated = [record, ...existing.filter((item: any) => item.id !== record.id)];
      localStorage.setItem(key, JSON.stringify(updated));
    } catch (e) {}
  };

  const executeAutoSave = async () => {
    const email = userEmailRef.current;
    if (!email) return;

    setSaving(true);
    setSaveMessage('');
    setHasAutoSaved(true);

    try {
      const res = await fetch('/api/health-checks', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          suhu_objek: suhuObjekRef.current,
          suhu_ambient: suhuAmbientRef.current,
          bpm: bpmRef.current,
          user_email: email,
        }),
      });

      const result = await res.json();
      if (result.success) {
        if (result.data) saveToLocalBackup(email, result.data);
        setSaveMessage('🎉 OTOMATIS TERSIMPAN! Hasil pengecekan kesehatan telah masuk ke Riwayat.');
      } else {
        setSaveMessage('⚠️ Gagal menyimpan otomatis: ' + result.message);
      }
    } catch (e) {
      setSaveMessage('❌ Error koneksi saat menyimpan');
    } finally {
      setSaving(false);
    }
  };

  const handleSaveCheck = async () => {
    if (!userEmail) return;

    setSaving(true);
    setSaveMessage('');
    setHasAutoSaved(true);

    try {
      const res = await fetch('/api/health-checks', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          suhu_objek: suhuObjek,
          suhu_ambient: suhuAmbient,
          bpm: bpm,
          user_email: userEmail,
        }),
      });

      const result = await res.json();
      if (result.success) {
        if (result.data) saveToLocalBackup(userEmail, result.data);
        setSaveMessage('✅ Hasil tes berhasil disimpan ke riwayat!');
      } else {
        setSaveMessage('⚠️ Gagal menyimpan tes: ' + result.message);
      }
    } catch (e) {
      setSaveMessage('❌ Error koneksi saat menyimpan');
    } finally {
      setSaving(false);
    }
  };

  const getSuhuStatus = () => {
    if (suhuObjek >= 37.5) return { text: 'Demam ⚠️', color: 'text-amber-700 bg-amber-50 border-amber-200' };
    if (suhuObjek > 0 && suhuObjek < 30.0) return { text: 'Hipotermia / Suhu Rendah ⚠️', color: 'text-sky-700 bg-sky-50 border-sky-200' };
    return { text: 'Normal ✅', color: 'text-emerald-700 bg-emerald-50 border-emerald-200' };
  };

  const getBpmStatus = () => {
    if (bpm === 0) return { text: 'Tempelkan sensor di pergelangan tangan', color: 'text-slate-500 bg-slate-100 border-slate-200' };
    if (bpm > 100) return { text: 'Tinggi (Takikardia) ⚠️', color: 'text-rose-700 bg-rose-50 border-rose-200' };
    if (bpm < 50) return { text: 'Rendah (Bradikardia) ⚠️', color: 'text-amber-700 bg-amber-50 border-amber-200' };
    return { text: 'Normal ✅', color: 'text-emerald-700 bg-emerald-50 border-emerald-200' };
  };

  const suhuStatus = getSuhuStatus();
  const bpmStatus = getBpmStatus();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-10 space-y-6 sm:space-y-8">
      
      {/* HEADER & USER BANNER */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 sm:gap-6 glass-card p-5 sm:p-8 rounded-3xl bg-white border-sky-100 shadow-xl shadow-sky-500/5">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold text-sky-600 mb-1 sm:mb-2">
            <Zap className="w-4 h-4 shrink-0" />
            <span>IoT Real-Time Health Monitor</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900">Status Kesehatan Real-Time 📊</h1>
          <p className="text-xs text-slate-500 mt-1">Data live langsung dari sensor Suhu MLX90614 & BPM MAX30102 Wemos D1</p>
        </div>

        <div className="flex flex-wrap items-center gap-2.5 sm:gap-3">
          <div className="flex items-center gap-2 px-3.5 sm:px-4 py-2 sm:py-2.5 rounded-full bg-sky-50 border border-sky-100 text-xs text-slate-700 font-semibold">
            <Clock className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-sky-500 shrink-0" />
            <span>Update: <strong className="text-slate-900">{lastUpdated || 'Menghubungkan...'}</strong></span>
          </div>

          <div className={`flex items-center gap-2 px-3.5 sm:px-4 py-2 sm:py-2.5 rounded-full border text-xs font-extrabold ${
            isWifiConnected ? 'bg-emerald-50 border-emerald-200 text-emerald-700' : 'bg-rose-50 border-rose-200 text-rose-700'
          }`}>
            <span className={`w-2.5 h-2.5 rounded-full shrink-0 ${isWifiConnected ? 'bg-emerald-500 animate-ping' : 'bg-rose-500'}`}></span>
            {isWifiConnected ? 'Sensor Online ✅' : 'Sensor Offline ❌'}
          </div>
        </div>
      </div>

      {/* IOT DEVICE & WIFI CONNECTION STATUS BADGE CARD */}
      <div className="glass-card p-5 sm:p-6 rounded-3xl bg-white border-sky-100 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 sm:gap-6 shadow-sm">
        <div className="flex items-center gap-3 sm:gap-4">
          <div className={`w-10 h-10 sm:w-12 sm:h-12 rounded-2xl flex items-center justify-center border shrink-0 ${
            isWifiConnected ? 'bg-emerald-50 border-emerald-200 text-emerald-600' : 'bg-rose-50 border-rose-200 text-rose-600'
          }`}>
            {isWifiConnected ? <Wifi className="w-5 h-5 sm:w-6 sm:h-6 animate-pulse" /> : <WifiOff className="w-5 h-5 sm:w-6 sm:h-6" />}
          </div>
          <div>
            <div className="flex flex-wrap items-center gap-2">
              <span className={`text-xs sm:text-sm font-extrabold ${isWifiConnected ? 'text-emerald-700' : 'text-rose-700'}`}>
                {isWifiConnected ? '🟢 IoT Terhubung Wi-Fi' : '🔴 IoT Terputus Wi-Fi'}
              </span>
              <span className="px-2 py-0.5 rounded-full bg-sky-100 text-sky-800 font-black text-[10px] sm:text-[11px] border border-sky-200">
                {deviceId}
              </span>
            </div>
            <p className="text-[11px] sm:text-xs text-slate-500 mt-0.5">
              SSID: <strong className="text-slate-800 font-bold">{wifiSsid}</strong> • {secondsAgo}s yang lalu
            </p>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-600 font-bold">
            <Cpu className="w-3.5 h-3.5 text-sky-500 shrink-0" />
            <span>Wemos D1 mini</span>
          </div>
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-600 font-bold">
            <Signal className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
            <span>Signal Strong</span>
          </div>
        </div>
      </div>

      {/* AUTO-SAVE COUNTDOWN NOTIFICATION BANNER */}
      {bpm > 0 && userEmail && countdown !== null && countdown > 0 && (
        <div className="p-5 sm:p-6 rounded-3xl bg-gradient-to-r from-sky-600 via-sky-500 to-blue-600 text-white shadow-xl shadow-sky-500/30 space-y-3 sm:space-y-4 border border-sky-400/40 animate-fadeIn">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-2xl bg-white/20 border border-white/30 backdrop-blur-md flex items-center justify-center text-white shrink-0">
                <Loader2 className="w-5 h-5 sm:w-6 sm:h-6 animate-spin text-white" />
              </div>
              <div>
                <h4 className="text-base sm:text-lg font-black text-white tracking-tight">
                  Mengukur Kesehatan... Menyimpan Otomatis ({countdown}s) ⏳
                </h4>
                <p className="text-xs text-sky-100 font-medium mt-0.5">
                  Tempelkan sensor di pergelangan tangan. Hasil pengecekan akan otomatis masuk ke Riwayat.
                </p>
              </div>
            </div>
            <span className="self-start sm:self-center text-xl sm:text-2xl font-black px-4 py-1.5 sm:px-5 sm:py-2 rounded-full bg-white text-sky-600 shadow-md">
              {countdown}s
            </span>
          </div>

          {/* Progress Bar */}
          <div className="w-full bg-black/20 h-2.5 sm:h-3 rounded-full overflow-hidden p-0.5 border border-white/20">
            <div
              className="bg-white h-full transition-all duration-1000 ease-linear rounded-full shadow-md"
              style={{ width: `${((10 - countdown) / 10) * 100}%` }}
            ></div>
          </div>
        </div>
      )}

      {/* SENSOR LIVE GAUGES */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
        
        {/* SUHU TUBUH CARD */}
        <div className="glass-card p-6 sm:p-8 rounded-3xl space-y-4 sm:space-y-6 relative overflow-hidden bg-white border-sky-100">
          <div className="flex items-center justify-between gap-2">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-2xl bg-sky-50 border border-sky-100 flex items-center justify-center text-sky-500 shrink-0">
                <Activity className="w-5 h-5 sm:w-6 sm:h-6 animate-pulse" />
              </div>
              <div>
                <h3 className="text-base sm:text-lg font-bold text-slate-900">Suhu Tubuh</h3>
                <span className="text-xs text-slate-500">MLX90614 Non-Contact</span>
              </div>
            </div>
            
            <span className={`px-3 py-1 rounded-full border text-[11px] sm:text-xs font-bold shrink-0 ${suhuStatus.color}`}>
              {suhuStatus.text}
            </span>
          </div>

          <div className="flex items-baseline gap-2 sm:gap-3">
            <span className="text-4xl sm:text-6xl font-black text-sky-600 tracking-tight">
              {suhuObjek.toFixed(1)}
            </span>
            <span className="text-xl sm:text-2xl font-bold text-sky-400">°C</span>
          </div>

          <div className="pt-3 border-t border-sky-100 flex items-center justify-between text-xs text-slate-500 font-medium">
            <span>Suhu Ruangan (Ambient):</span>
            <span className="font-bold text-slate-900">{suhuAmbient.toFixed(1)} °C</span>
          </div>
        </div>

        {/* DETAK JANTUNG CARD */}
        <div className="glass-card p-6 sm:p-8 rounded-3xl space-y-4 sm:space-y-6 relative overflow-hidden bg-white border-rose-100">
          <div className="flex items-center justify-between gap-2">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-2xl bg-rose-50 border border-rose-100 flex items-center justify-center text-rose-500 shrink-0">
                <Heart className="w-5 h-5 sm:w-6 sm:h-6 fill-rose-500 animate-pulse" />
              </div>
              <div>
                <h3 className="text-base sm:text-lg font-bold text-slate-900">Detak Jantung</h3>
                <span className="text-xs text-slate-500">MAX30102 PPG Sensor</span>
              </div>
            </div>

            <span className={`px-3 py-1 rounded-full border text-[11px] sm:text-xs font-bold shrink-0 ${bpmStatus.color}`}>
              {bpmStatus.text}
            </span>
          </div>

          <div className="flex items-baseline gap-2 sm:gap-3">
            <span className="text-4xl sm:text-6xl font-black text-rose-500 tracking-tight">
              {bpm > 0 ? bpm : '--'}
            </span>
            <span className="text-xl sm:text-2xl font-bold text-rose-400">BPM</span>
          </div>

          <div className="pt-3 border-t border-rose-100 flex items-center justify-between text-xs text-slate-500 font-medium">
            <span>Status Pengukuran:</span>
            <span className="font-bold text-slate-900">
              {bpm > 0 ? 'Deteksi Denyut Aktif ✅' : 'Tempelkan sensor di pergelangan 🖐️'}
            </span>
          </div>
        </div>

      </div>

      {/* ACTION: SAVE HEALTH CHECK */}
      <div className="glass-card p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-sky-50 to-indigo-50 border-sky-100 space-y-4">
        <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 sm:gap-6">
          <div className="space-y-1.5 text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white text-sky-700 text-xs font-bold border border-sky-200">
              <UserCheck className="w-3.5 h-3.5 text-sky-500 shrink-0" />
              <span>Sistem Pencatatan Otomatis Siswa</span>
            </div>
            <h3 className="text-lg sm:text-xl font-bold text-slate-900">Simpan Hasil Pengecekan ke Riwayat</h3>
            <p className="text-xs text-slate-600">
              {userEmail
                ? `Terhubung sebagai: ${userEmail}. Hasil tes akan tersimpan otomatis (10s) atau via tombol manual.`
                : 'Kamu belum login. Silakan Login terlebih dahulu untuk menyimpan data pengecekan kesehatan ini ke riwayat.'}
            </p>
          </div>

          <div className="w-full md:w-auto">
            {userEmail ? (
              <button
                onClick={handleSaveCheck}
                disabled={saving}
                className="w-full md:w-auto px-6 sm:px-8 py-3.5 rounded-full bg-sky-500 hover:bg-sky-600 text-white font-extrabold text-xs flex items-center justify-center gap-2 shadow-lg shadow-sky-500/25 hover:scale-105 transition-all disabled:opacity-50"
              >
                <Save className="w-4 h-4" />
                {saving ? 'Menyimpan...' : 'Simpan Sekarang (Manual) 🚀'}
              </button>
            ) : (
              <Link
                href="/login"
                className="w-full md:w-auto px-6 sm:px-8 py-3.5 rounded-full bg-white border border-sky-200 text-sky-600 hover:text-sky-700 font-extrabold text-xs flex items-center justify-center gap-2 hover:bg-sky-50 transition-all shadow-xs"
              >
                <Lock className="w-4 h-4 text-sky-500" />
                Login untuk Menyimpan Tes 🔐
              </Link>
            )}
          </div>
        </div>

        {saveMessage && (
          <div className="p-3.5 sm:p-4 rounded-2xl bg-white border border-sky-200 text-xs font-bold text-sky-700 flex flex-col sm:flex-row items-center justify-between gap-3 shadow-xs animate-fadeIn">
            <span>{saveMessage}</span>
            <Link
              href="/riwayat"
              className="w-full sm:w-auto px-4 py-2 rounded-full bg-sky-500 text-white text-xs font-extrabold text-center hover:bg-sky-600 transition-all shrink-0"
            >
              Lihat Riwayat 📋
            </Link>
          </div>
        )}
      </div>

      {/* REAL-TIME TREND CHARTS */}
      <div className="glass-card p-5 sm:p-8 rounded-3xl bg-white border-sky-100 space-y-4 sm:space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg sm:text-xl font-bold text-slate-900 flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-sky-500 shrink-0" /> Grafik Tren Real-Time
            </h3>
            <p className="text-xs text-slate-500">Pergerakan suhu tubuh (°C) dan detak jantung (BPM) selama sesi tes</p>
          </div>
        </div>

        <div className="h-56 sm:h-72 w-full pt-2 sm:pt-4">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={chartData}>
              <defs>
                <linearGradient id="colorSuhu" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#0ea5e9" stopOpacity={0.4} />
                  <stop offset="95%" stopColor="#0ea5e9" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="colorBpm" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#f43f5e" stopOpacity={0.4} />
                  <stop offset="95%" stopColor="#f43f5e" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
              <XAxis dataKey="time" stroke="#64748b" fontSize={11} />
              <YAxis stroke="#64748b" fontSize={11} domain={['auto', 'auto']} />
              <Tooltip
                contentStyle={{ backgroundColor: '#ffffff', borderColor: '#e2e8f0', borderRadius: '16px', color: '#0f172a' }}
              />
              <Area type="monotone" dataKey="suhu" name="Suhu (°C)" stroke="#0ea5e9" strokeWidth={2.5} fillOpacity={1} fill="url(#colorSuhu)" />
              <Area type="monotone" dataKey="bpm" name="BPM" stroke="#f43f5e" strokeWidth={2.5} fillOpacity={1} fill="url(#colorBpm)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

    </div>
  );
}

