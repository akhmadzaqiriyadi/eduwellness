'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import { createPortal } from 'react-dom';
import Image from 'next/image';
import { 
  ChevronLeft, 
  ChevronRight, 
  Play, 
  Pause, 
  Maximize2, 
  X,
  Images,
  Video,
  Sparkles,
  ExternalLink,
  Laptop
} from 'lucide-react';

const prototipeImages = [
  '/prototipe/prototipe1.webp',
  '/prototipe/prototipe2.webp',
  '/prototipe/prototipe3.webp',
  '/prototipe/prototipe4.webp',
  '/prototipe/prototipe5.webp',
  '/prototipe/prototipe6.webp',
  '/prototipe/prototipe7.webp',
  '/prototipe/prototipe8.webp',
  '/prototipe/prototipe9.webp',
  '/prototipe/prototipe10.webp',
  '/prototipe/prototipe11.webp',
  '/prototipe/prototipe12.webp',
  '/prototipe/prototipe13.webp',
  '/prototipe/prototipe14.webp',
  '/prototipe/prototipe15.webp',
  '/prototipe/prototipe16.webp',
  '/prototipe/prototipe17.webp',
  '/prototipe/prototipe18.webp',
  '/prototipe/prototipe19.webp',
  '/prototipe/prototipe20.webp',
  '/prototipe/prototipe21.webp',
  '/prototipe/prototipe22.webp',
];

const galleryImages = [
  '/galeri/galery3.webp',
  '/galeri/galery4.webp',
  '/galeri/galery5.webp',
  '/galeri/galery6.webp',
  '/galeri/galery7.webp',
  '/galeri/galery8.webp',
  '/galeri/galery9.webp',
  '/galeri/galery10.webp',
  '/galeri/galery11.webp',
  '/galeri/galery12.webp',
  '/galeri/galery13.webp',
  '/galeri/galery14.webp',
  '/galeri/galery15.webp',
  '/galeri/galery16.webp',
  '/galeri/galery17.webp',
  '/galeri/galery18.webp',
  '/galeri/galery19.webp',
  '/galeri/galery20.webp',
  '/galeri/galery21.webp',
  '/galeri/galery22.webp',
  '/galeri/galery23.webp',
  '/galeri/galery24.webp',
];

export default function GaleriPage() {
  // STATE CAROUSEL 1: RISSET & PROTOTIPE
  const [protoIndex, setProtoIndex] = useState(0);
  const [protoIsPlaying, setProtoIsPlaying] = useState(true);
  const [protoFullscreen, setProtoFullscreen] = useState(false);
  const protoThumbRef = useRef<HTMLDivElement>(null);

  // STATE CAROUSEL 2: DOKUMENTASI SISWA
  const [galleryIndex, setGalleryIndex] = useState(0);
  const [galleryIsPlaying, setGalleryIsPlaying] = useState(true);
  const [galleryFullscreen, setGalleryFullscreen] = useState(false);
  const galleryThumbRef = useRef<HTMLDivElement>(null);

  // TOUCH SWIPE STATES
  const [touchStartX, setTouchStartX] = useState<number | null>(null);

  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // --- CAROUSEL 1 HANDLERS (PROTOTIPE) ---
  const nextProto = useCallback(() => {
    setProtoIndex((prev) => (prev + 1) % prototipeImages.length);
  }, []);

  const prevProto = useCallback(() => {
    setProtoIndex((prev) => (prev - 1 + prototipeImages.length) % prototipeImages.length);
  }, []);

  // Autoplay with dynamic duration: 7500ms for slides 1-3 (tutorial), 3500ms for others
  useEffect(() => {
    if (!protoIsPlaying) return;
    const duration = protoIndex < 3 ? 7500 : 3500;
    const timer = setTimeout(nextProto, duration);
    return () => clearTimeout(timer);
  }, [protoIsPlaying, protoIndex, nextProto]);

  // Scroll active thumbnail smoothly inside its own strip ONLY (NEVER scroll the page window)
  useEffect(() => {
    if (protoThumbRef.current) {
      const container = protoThumbRef.current;
      const activeEl = container.children[protoIndex] as HTMLElement;
      if (activeEl) {
        const scrollTarget = activeEl.offsetLeft - (container.clientWidth / 2) + (activeEl.clientWidth / 2);
        container.scrollTo({ left: Math.max(0, scrollTarget), behavior: 'smooth' });
      }
    }
  }, [protoIndex]);

  // --- CAROUSEL 2 HANDLERS (GALLERY) ---
  const nextGallery = useCallback(() => {
    setGalleryIndex((prev) => (prev + 1) % galleryImages.length);
  }, []);

  const prevGallery = useCallback(() => {
    setGalleryIndex((prev) => (prev - 1 + galleryImages.length) % galleryImages.length);
  }, []);

  useEffect(() => {
    if (!galleryIsPlaying) return;
    const timer = setInterval(nextGallery, 3500);
    return () => clearInterval(timer);
  }, [galleryIsPlaying, nextGallery]);

  // Scroll active thumbnail smoothly inside its own strip ONLY (NEVER scroll the page window)
  useEffect(() => {
    if (galleryThumbRef.current) {
      const container = galleryThumbRef.current;
      const activeEl = container.children[galleryIndex] as HTMLElement;
      if (activeEl) {
        const scrollTarget = activeEl.offsetLeft - (container.clientWidth / 2) + (activeEl.clientWidth / 2);
        container.scrollTo({ left: Math.max(0, scrollTarget), behavior: 'smooth' });
      }
    }
  }, [galleryIndex]);

  // Fullscreen helpers
  const openFullscreenProto = () => {
    setProtoFullscreen(true);
    if (document.documentElement.requestFullscreen) {
      document.documentElement.requestFullscreen().catch(() => {});
    }
  };

  const closeFullscreenProto = () => {
    setProtoFullscreen(false);
    if (document.fullscreenElement && document.exitFullscreen) {
      document.exitFullscreen().catch(() => {});
    }
  };

  const openFullscreenGallery = () => {
    setGalleryFullscreen(true);
    if (document.documentElement.requestFullscreen) {
      document.documentElement.requestFullscreen().catch(() => {});
    }
  };

  const closeFullscreenGallery = () => {
    setGalleryFullscreen(false);
    if (document.fullscreenElement && document.exitFullscreen) {
      document.exitFullscreen().catch(() => {});
    }
  };

  // Exit fullscreen on Esc or browser event
  useEffect(() => {
    const handleFullscreenChange = () => {
      if (!document.fullscreenElement) {
        setProtoFullscreen(false);
        setGalleryFullscreen(false);
      }
    };
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        closeFullscreenProto();
        closeFullscreenGallery();
      }
      if (e.key === 'ArrowRight') {
        if (protoFullscreen) nextProto();
        if (galleryFullscreen) nextGallery();
      }
      if (e.key === 'ArrowLeft') {
        if (protoFullscreen) prevProto();
        if (galleryFullscreen) prevGallery();
      }
    };
    document.addEventListener('fullscreenchange', handleFullscreenChange);
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('fullscreenchange', handleFullscreenChange);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [protoFullscreen, galleryFullscreen, nextProto, prevProto, nextGallery, prevGallery]);

  // Lock body scroll when any fullscreen is active
  useEffect(() => {
    if (protoFullscreen || galleryFullscreen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [protoFullscreen, galleryFullscreen]);

  // Touch Swipe Handlers for Proto
  const handleTouchStartProto = (e: React.TouchEvent) => {
    setTouchStartX(e.touches[0].clientX);
  };
  const handleTouchEndProto = (e: React.TouchEvent) => {
    if (touchStartX === null) return;
    const diff = touchStartX - e.changedTouches[0].clientX;
    if (diff > 50) nextProto();
    if (diff < -50) prevProto();
    setTouchStartX(null);
  };

  // Touch Swipe Handlers for Gallery
  const handleTouchStartGallery = (e: React.TouchEvent) => {
    setTouchStartX(e.touches[0].clientX);
  };
  const handleTouchEndGallery = (e: React.TouchEvent) => {
    if (touchStartX === null) return;
    const diff = touchStartX - e.changedTouches[0].clientX;
    if (diff > 50) nextGallery();
    if (diff < -50) prevGallery();
    setTouchStartX(null);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-10 space-y-10 sm:space-y-16">
      
      {/* SECTION 1: VIDEO YOUTUBE & CAPTION RESMI */}
      <div className="glass-card p-6 sm:p-10 rounded-3xl bg-white border-sky-100 shadow-xl shadow-sky-500/5 space-y-6">
        
        {/* HEADER & JUDUL DI ATAS VIDEO */}
        <div className="space-y-3">
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-sky-50 pb-3">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-rose-100 text-rose-700 text-xs font-black border border-rose-200">
              <Video className="w-4 h-4 text-rose-600" />
              <span>Video Profil & Demonstrasi</span>
            </div>
            <a
              href="https://www.youtube.com/watch?v=3X4aQhXwTU8"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-500 hover:text-rose-600 transition-colors"
            >
              <span>Tonton di YouTube</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>

          <h2 className="text-xl sm:text-3xl lg:text-4xl font-black text-slate-900 leading-tight">
            EduWellness: <span className="text-sky-600">Teknologi untuk Menumbuhkan Literasi Kesehatan Siswa</span>
          </h2>
        </div>

        {/* 16:9 SEAMLESS AUTOPLAY YOUTUBE PLAYER */}
        <div className="relative aspect-video w-full rounded-2xl sm:rounded-3xl overflow-hidden shadow-2xl bg-black border border-slate-800/80">
          <iframe
            src="https://www.youtube-nocookie.com/embed/3X4aQhXwTU8?autoplay=1&mute=1&loop=1&playlist=3X4aQhXwTU8&controls=1&rel=0&modestbranding=1&playsinline=1&iv_load_policy=3"
            title="EduWellness: Video Profil & Demonstrasi"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
            className="w-full h-full border-0"
          />
        </div>

        {/* CAPTION & DESKRIPSI LENGKAP */}
        <div className="space-y-4 pt-1">
          <div className="space-y-3.5 text-xs sm:text-sm text-slate-600 leading-relaxed">
            <p>
              Di era digital, literasi kesehatan menjadi semakin penting. Siswa tidak hanya membutuhkan informasi kesehatan yang benar, tetapi juga perlu memiliki kemampuan untuk memahami, memantau, dan menerapkan kebiasaan hidup sehat dalam kehidupan sehari-hari.
            </p>

            <p>
              Berangkat dari kebutuhan tersebut, hadir <strong>EduWellness</strong>, sebuah inovasi aplikasi web berbasis IoT yang mengintegrasikan sensor suhu tubuh dan detak jantung sebagai media pembelajaran dan pemantauan kesehatan siswa.
            </p>

            <p>
              Prototipe EduWellness dirancang dalam bentuk perangkat pemantau kesehatan yang terhubung dengan website. Melalui website EduWellness, siswa dapat memperoleh edukasi kesehatan, melihat status kesehatan secara real-time, mendapatkan rekomendasi kebiasaan hidup sehat, serta mengakses riwayat dan berbagai informasi pendukung kesehatan.
            </p>
          </div>

          {/* HIGHLIGHT CALLOUT BOX */}
          <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-sky-50 to-indigo-50 border border-sky-100 space-y-2">
            <p className="text-xs sm:text-sm font-bold text-slate-800 flex items-start gap-2">
              <Sparkles className="w-4 h-4 text-sky-600 shrink-0 mt-0.5" />
              <span>EduWellness bukan sekadar teknologi, tetapi sebuah langkah kecil menuju generasi yang lebih sadar, peduli, dan cerdas dalam menjaga kesehatan.</span>
            </p>
            <p className="text-xs sm:text-sm font-semibold text-slate-700">
              🎬 Saksikan video ini untuk melihat latar belakang, prototipe, serta website EduWellness secara lebih dekat.
            </p>
            <p className="text-xs sm:text-sm font-extrabold text-sky-700 italic pt-1">
              Selamat menyaksikan! ✨
            </p>
          </div>

        </div>

      </div>

      {/* SECTION 2: KAROSEL PENGEMBANGAN, PERANCANGAN & UJI COBA SISTEM */}
      <div className="space-y-6">
        <div className="text-center space-y-2">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-100 text-indigo-800 text-xs font-black border border-indigo-200">
            <Laptop className="w-4 h-4 text-indigo-600" />
            <span>Perancangan, Uji Coba & Implementasi Sistem</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-black text-slate-900">
            Dokumentasi Riset & <span className="text-gradient">Pengembangan EduWellness</span>
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 max-w-2xl mx-auto">
            Rangkaian tahapan mulai dari analisis kebutuhan, wawancara, perancangan prototipe IoT, uji fungsionalitas sensor, sosialisasi ke siswa, hingga testimoni pengguna.
          </p>
        </div>

        {/* MAIN CAROUSEL 1 CONTAINER (ULTRA SMOOTH CONTINUOUS SLIDING TRACK) */}
        <div 
          className="relative glass-card rounded-3xl overflow-hidden bg-slate-950 border border-slate-800 shadow-2xl select-none"
          onTouchStart={handleTouchStartProto}
          onTouchEnd={handleTouchEndProto}
        >
          <div className="relative aspect-video w-full overflow-hidden bg-slate-950">
            {/* CONTINUOUS SMOOTH TRACK */}
            <div 
              className="flex w-full h-full transition-transform duration-700 ease-[cubic-bezier(0.25,1,0.5,1)] will-change-transform"
              style={{ transform: `translateX(-${protoIndex * 100}%)` }}
            >
              {prototipeImages.map((src, index) => (
                <div key={src} className="relative aspect-video w-full h-full shrink-0">
                  <Image
                    src={src}
                    alt={`Dokumentasi Riset Slide ${index + 1}`}
                    fill
                    priority={index === 0 || Math.abs(protoIndex - index) <= 1}
                    sizes="(max-width: 1400px) 100vw, 1400px"
                    className="object-cover"
                  />
                </div>
              ))}
            </div>

            {/* LEFT ARROW */}
            <button
              onClick={prevProto}
              className="absolute left-3 sm:left-6 top-1/2 -translate-y-1/2 w-11 h-11 sm:w-14 sm:h-14 rounded-full bg-black/60 hover:bg-black/90 text-white backdrop-blur-md flex items-center justify-center transition-all border border-white/20 shadow-xl hover:scale-110 active:scale-95 z-20"
              aria-label="Slide Sebelumnya"
            >
              <ChevronLeft className="w-7 h-7" />
            </button>

            {/* RIGHT ARROW */}
            <button
              onClick={nextProto}
              className="absolute right-3 sm:right-6 top-1/2 -translate-y-1/2 w-11 h-11 sm:w-14 sm:h-14 rounded-full bg-black/60 hover:bg-black/90 text-white backdrop-blur-md flex items-center justify-center transition-all border border-white/20 shadow-xl hover:scale-110 active:scale-95 z-20"
              aria-label="Slide Selanjutnya"
            >
              <ChevronRight className="w-7 h-7" />
            </button>

            {/* TOP CONTROLS & COUNTER */}
            <div className="absolute top-4 left-4 right-4 flex items-center justify-between pointer-events-none z-20">
              <span className="px-3.5 py-1.5 rounded-full bg-black/75 text-white text-xs font-black backdrop-blur-md border border-white/20 pointer-events-auto shadow-lg">
                {protoIndex + 1} / {prototipeImages.length}
              </span>

              <div className="flex items-center gap-2 pointer-events-auto">
                <button
                  onClick={() => setProtoIsPlaying(!protoIsPlaying)}
                  className="w-9 h-9 rounded-full bg-black/75 hover:bg-black text-white backdrop-blur-md flex items-center justify-center transition-all border border-white/20 shadow-lg hover:scale-105"
                  aria-label={protoIsPlaying ? 'Jeda Slideshow' : 'Putar Slideshow'}
                >
                  {protoIsPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 ml-0.5" />}
                </button>
                <button
                  onClick={openFullscreenProto}
                  className="w-9 h-9 rounded-full bg-black/75 hover:bg-black text-white backdrop-blur-md flex items-center justify-center transition-all border border-white/20 shadow-lg hover:scale-105"
                  aria-label="Tampilan Layar Penuh"
                >
                  <Maximize2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* THUMBNAIL STRIP 1 */}
        <div className="glass-card p-3 sm:p-4 rounded-2xl bg-white border-indigo-100 shadow-sm">
          <div ref={protoThumbRef} className="flex items-center gap-2.5 overflow-x-auto pb-1 pt-1 no-scrollbar scroll-smooth">
            {prototipeImages.map((src, index) => (
              <button
                key={src}
                onClick={() => setProtoIndex(index)}
                className={`relative aspect-video w-20 sm:w-28 shrink-0 rounded-xl overflow-hidden border-2 transition-all duration-300 ${
                  protoIndex === index
                    ? 'border-indigo-500 ring-2 ring-indigo-300 scale-105 shadow-md opacity-100'
                    : 'border-transparent opacity-50 hover:opacity-90 hover:scale-102'
                }`}
              >
                <Image
                  src={src}
                  alt={`Thumbnail Riset ${index + 1}`}
                  fill
                  sizes="112px"
                  className="object-cover"
                  loading="lazy"
                />
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* SECTION 3: KAROSEL DOKUMENTASI KEGIATAN SISWA */}
      <div className="space-y-6">
        <div className="text-center space-y-2">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-sky-100 text-sky-700 text-xs font-extrabold border border-sky-200">
            <Images className="w-4 h-4 text-sky-500" />
            <span>Dokumentasi Lapangan & Interaksi Siswa</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-black text-slate-900">
            Galeri <span className="text-gradient">EduWellness</span>
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 max-w-2xl mx-auto">
            Momen interaksi siswa, pelatihan duta kesehatan, pengukuran denyut nadi & suhu tubuh berkala di SMP N 1 Seyegan.
          </p>
        </div>

        {/* MAIN CAROUSEL 2 CONTAINER (ULTRA SMOOTH CONTINUOUS SLIDING TRACK) */}
        <div 
          className="relative glass-card rounded-3xl overflow-hidden bg-slate-950 border border-slate-800 shadow-2xl select-none"
          onTouchStart={handleTouchStartGallery}
          onTouchEnd={handleTouchEndGallery}
        >
          <div className="relative aspect-video w-full overflow-hidden bg-slate-950">
            {/* CONTINUOUS SMOOTH TRACK */}
            <div 
              className="flex w-full h-full transition-transform duration-700 ease-[cubic-bezier(0.25,1,0.5,1)] will-change-transform"
              style={{ transform: `translateX(-${galleryIndex * 100}%)` }}
            >
              {galleryImages.map((src, index) => (
                <div key={src} className="relative aspect-video w-full h-full shrink-0">
                  <Image
                    src={src}
                    alt={`Foto Galeri ${index + 1}`}
                    fill
                    priority={index === 0 || Math.abs(galleryIndex - index) <= 1}
                    sizes="(max-width: 1400px) 100vw, 1400px"
                    className="object-cover"
                  />
                </div>
              ))}
            </div>

            {/* LEFT ARROW */}
            <button
              onClick={prevGallery}
              className="absolute left-3 sm:left-6 top-1/2 -translate-y-1/2 w-11 h-11 sm:w-14 sm:h-14 rounded-full bg-black/60 hover:bg-black/90 text-white backdrop-blur-md flex items-center justify-center transition-all border border-white/20 shadow-xl hover:scale-110 active:scale-95 z-20"
              aria-label="Foto Sebelumnya"
            >
              <ChevronLeft className="w-7 h-7" />
            </button>

            {/* RIGHT ARROW */}
            <button
              onClick={nextGallery}
              className="absolute right-3 sm:right-6 top-1/2 -translate-y-1/2 w-11 h-11 sm:w-14 sm:h-14 rounded-full bg-black/60 hover:bg-black/90 text-white backdrop-blur-md flex items-center justify-center transition-all border border-white/20 shadow-xl hover:scale-110 active:scale-95 z-20"
              aria-label="Foto Selanjutnya"
            >
              <ChevronRight className="w-7 h-7" />
            </button>

            {/* TOP CONTROLS & COUNTER */}
            <div className="absolute top-4 left-4 right-4 flex items-center justify-between pointer-events-none z-20">
              <span className="px-3.5 py-1.5 rounded-full bg-black/75 text-white text-xs font-black backdrop-blur-md border border-white/20 pointer-events-auto shadow-lg">
                {galleryIndex + 1} / {galleryImages.length}
              </span>

              <div className="flex items-center gap-2 pointer-events-auto">
                <button
                  onClick={() => setGalleryIsPlaying(!galleryIsPlaying)}
                  className="w-9 h-9 rounded-full bg-black/75 hover:bg-black text-white backdrop-blur-md flex items-center justify-center transition-all border border-white/20 shadow-lg hover:scale-105"
                  aria-label={galleryIsPlaying ? 'Jeda Slideshow' : 'Putar Slideshow'}
                >
                  {galleryIsPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 ml-0.5" />}
                </button>
                <button
                  onClick={openFullscreenGallery}
                  className="w-9 h-9 rounded-full bg-black/75 hover:bg-black text-white backdrop-blur-md flex items-center justify-center transition-all border border-white/20 shadow-lg hover:scale-105"
                  aria-label="Tampilan Layar Penuh"
                >
                  <Maximize2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* THUMBNAIL STRIP 2 */}
        <div className="glass-card p-3 sm:p-4 rounded-2xl bg-white border-sky-100 shadow-sm">
          <div ref={galleryThumbRef} className="flex items-center gap-2.5 overflow-x-auto pb-1 pt-1 no-scrollbar scroll-smooth">
            {galleryImages.map((src, index) => (
              <button
                key={src}
                onClick={() => setGalleryIndex(index)}
                className={`relative aspect-video w-20 sm:w-28 shrink-0 rounded-xl overflow-hidden border-2 transition-all duration-300 ${
                  galleryIndex === index
                    ? 'border-sky-500 ring-2 ring-sky-300 scale-105 shadow-md opacity-100'
                    : 'border-transparent opacity-50 hover:opacity-90 hover:scale-102'
                }`}
              >
                <Image
                  src={src}
                  alt={`Thumbnail ${index + 1}`}
                  fill
                  sizes="112px"
                  className="object-cover"
                  loading="lazy"
                />
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* FULLSCREEN MODAL 1 (PROTOTIPE) */}
      {protoFullscreen && mounted && typeof document !== 'undefined' && createPortal(
        <div className="fixed inset-0 z-[999999] w-screen h-screen bg-black flex items-center justify-center overflow-hidden animate-fadeIn">
          <button
            onClick={closeFullscreenProto}
            className="absolute top-4 right-4 sm:top-6 sm:right-6 w-12 h-12 rounded-full bg-white/20 hover:bg-white/40 text-white flex items-center justify-center transition-all z-[1000000] border border-white/30 shadow-2xl hover:scale-110"
            aria-label="Tutup Layar Penuh"
          >
            <X className="w-7 h-7" />
          </button>

          <button
            onClick={prevProto}
            className="absolute left-4 sm:left-8 top-1/2 -translate-y-1/2 w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-black/60 hover:bg-black/90 text-white flex items-center justify-center transition-all z-[1000000] border border-white/20 shadow-2xl hover:scale-110"
            aria-label="Slide Sebelumnya"
          >
            <ChevronLeft className="w-9 h-9" />
          </button>

          <button
            onClick={nextProto}
            className="absolute right-4 sm:right-8 top-1/2 -translate-y-1/2 w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-black/60 hover:bg-black/90 text-white flex items-center justify-center transition-all z-[1000000] border border-white/20 shadow-2xl hover:scale-110"
            aria-label="Slide Selanjutnya"
          >
            <ChevronRight className="w-9 h-9" />
          </button>

          {/* SMOOTH FULLSCREEN TRACK */}
          <div 
            className="flex w-full h-full transition-transform duration-700 ease-[cubic-bezier(0.25,1,0.5,1)] will-change-transform"
            style={{ transform: `translateX(-${protoIndex * 100}%)` }}
          >
            {prototipeImages.map((src, index) => (
              <div key={src} className="relative w-full h-full shrink-0 flex items-center justify-center p-2 sm:p-8">
                <Image
                  src={src}
                  alt={`Slide Fullscreen ${index + 1}`}
                  fill
                  className="object-contain"
                  priority={Math.abs(protoIndex - index) <= 1}
                />
              </div>
            ))}
          </div>

          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 px-5 py-2 rounded-full bg-black/75 text-white text-xs sm:text-sm font-bold border border-white/20 backdrop-blur-md shadow-2xl z-[1000000]">
            {protoIndex + 1} / {prototipeImages.length}
          </div>
        </div>,
        document.body
      )}

      {/* FULLSCREEN MODAL 2 (GALLERY) */}
      {galleryFullscreen && mounted && typeof document !== 'undefined' && createPortal(
        <div className="fixed inset-0 z-[999999] w-screen h-screen bg-black flex items-center justify-center overflow-hidden animate-fadeIn">
          <button
            onClick={closeFullscreenGallery}
            className="absolute top-4 right-4 sm:top-6 sm:right-6 w-12 h-12 rounded-full bg-white/20 hover:bg-white/40 text-white flex items-center justify-center transition-all z-[1000000] border border-white/30 shadow-2xl hover:scale-110"
            aria-label="Tutup Layar Penuh"
          >
            <X className="w-7 h-7" />
          </button>

          <button
            onClick={prevGallery}
            className="absolute left-4 sm:left-8 top-1/2 -translate-y-1/2 w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-black/60 hover:bg-black/90 text-white flex items-center justify-center transition-all z-[1000000] border border-white/20 shadow-2xl hover:scale-110"
            aria-label="Foto Sebelumnya"
          >
            <ChevronLeft className="w-9 h-9" />
          </button>

          <button
            onClick={nextGallery}
            className="absolute right-4 sm:right-8 top-1/2 -translate-y-1/2 w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-black/60 hover:bg-black/90 text-white flex items-center justify-center transition-all z-[1000000] border border-white/20 shadow-2xl hover:scale-110"
            aria-label="Foto Selanjutnya"
          >
            <ChevronRight className="w-9 h-9" />
          </button>

          {/* SMOOTH FULLSCREEN TRACK */}
          <div 
            className="flex w-full h-full transition-transform duration-700 ease-[cubic-bezier(0.25,1,0.5,1)] will-change-transform"
            style={{ transform: `translateX(-${galleryIndex * 100}%)` }}
          >
            {galleryImages.map((src, index) => (
              <div key={src} className="relative w-full h-full shrink-0 flex items-center justify-center p-2 sm:p-8">
                <Image
                  src={src}
                  alt={`Foto Fullscreen ${index + 1}`}
                  fill
                  className="object-contain"
                  priority={Math.abs(galleryIndex - index) <= 1}
                />
              </div>
            ))}
          </div>

          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 px-5 py-2 rounded-full bg-black/75 text-white text-xs sm:text-sm font-bold border border-white/20 backdrop-blur-md shadow-2xl z-[1000000]">
            {galleryIndex + 1} / {galleryImages.length}
          </div>
        </div>,
        document.body
      )}

    </div>
  );
}
