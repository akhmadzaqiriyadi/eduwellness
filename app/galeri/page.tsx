'use client';

import { useState, useEffect, useCallback } from 'react';
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
  ExternalLink
} from 'lucide-react';

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
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const nextSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % galleryImages.length);
  }, []);

  const prevSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + galleryImages.length) % galleryImages.length);
  }, []);

  // Autoplay timer
  useEffect(() => {
    if (!isPlaying) return;
    const interval = setInterval(nextSlide, 3500);
    return () => clearInterval(interval);
  }, [isPlaying, nextSlide]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') nextSlide();
      if (e.key === 'ArrowLeft') prevSlide();
      if (e.key === 'Escape') closeFullscreen();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [nextSlide, prevSlide]);

  // Toggle Fullscreen with Browser API
  const toggleFullscreen = () => {
    if (!isFullscreen) {
      setIsFullscreen(true);
      if (document.documentElement.requestFullscreen) {
        document.documentElement.requestFullscreen().catch(() => {});
      }
    } else {
      closeFullscreen();
    }
  };

  const closeFullscreen = () => {
    setIsFullscreen(false);
    if (document.fullscreenElement && document.exitFullscreen) {
      document.exitFullscreen().catch(() => {});
    }
  };

  // Sync fullscreen state with browser exit (e.g. user pressed Esc on browser)
  useEffect(() => {
    const handleFullscreenChange = () => {
      if (!document.fullscreenElement) {
        setIsFullscreen(false);
      }
    };
    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => document.removeEventListener('fullscreenchange', handleFullscreenChange);
  }, []);

  // Lock body scroll when fullscreen
  useEffect(() => {
    if (isFullscreen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isFullscreen]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-10 space-y-8 sm:space-y-12">
      
      {/* SECTION 1: VIDEO YOUTUBE & CAPTION RESMI */}
      <div className="glass-card p-6 sm:p-10 rounded-3xl bg-white border-sky-100 shadow-xl shadow-sky-500/5 space-y-6">
        
        {/* HEADER VIDEO */}
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-sky-50 pb-4">
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
        <div className="space-y-4 pt-2">
          <h2 className="text-xl sm:text-3xl font-black text-slate-900 leading-tight">
            EduWellness: <span className="text-sky-600">Teknologi untuk Menumbuhkan Literasi Kesehatan Siswa</span>
          </h2>

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

      {/* SECTION 2: DOKUMENTASI FOTO KEGIATAN */}
      <div className="space-y-6">
        
        {/* HEADER DOKUMENTASI */}
        <div className="text-center space-y-2 pt-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-sky-100 text-sky-700 text-xs font-extrabold border border-sky-200">
            <Images className="w-4 h-4 text-sky-500" />
            <span>Dokumentasi Kegiatan Siswa</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-black text-slate-900">
            Galeri Foto <span className="text-gradient">EduWellness</span>
          </h2>
        </div>

        {/* MAIN CAROUSEL CONTAINER (FULL 16:9 FRAME) */}
        <div className="relative glass-card rounded-3xl overflow-hidden bg-slate-950 border border-slate-800 shadow-2xl">
        
        {/* 16:9 VIEWPORT FULLY COVERED */}
        <div className="relative aspect-video w-full overflow-hidden flex items-center justify-center bg-slate-950">
          <Image
            key={galleryImages[currentIndex]}
            src={galleryImages[currentIndex]}
            alt={`Foto Galeri ${currentIndex + 1}`}
            fill
            priority
            sizes="(max-width: 1400px) 100vw, 1400px"
            className="object-cover transition-opacity duration-300 animate-fadeIn"
          />

          {/* LEFT ARROW */}
          <button
            onClick={prevSlide}
            className="absolute left-3 sm:left-6 top-1/2 -translate-y-1/2 w-11 h-11 sm:w-14 sm:h-14 rounded-full bg-black/60 hover:bg-black/85 text-white backdrop-blur-md flex items-center justify-center transition-all border border-white/20 shadow-xl hover:scale-105"
            aria-label="Foto Sebelumnya"
          >
            <ChevronLeft className="w-7 h-7" />
          </button>

          {/* RIGHT ARROW */}
          <button
            onClick={nextSlide}
            className="absolute right-3 sm:right-6 top-1/2 -translate-y-1/2 w-11 h-11 sm:w-14 sm:h-14 rounded-full bg-black/60 hover:bg-black/85 text-white backdrop-blur-md flex items-center justify-center transition-all border border-white/20 shadow-xl hover:scale-105"
            aria-label="Foto Selanjutnya"
          >
            <ChevronRight className="w-7 h-7" />
          </button>

          {/* TOP CONTROLS & COUNTER */}
          <div className="absolute top-4 left-4 right-4 flex items-center justify-between pointer-events-none">
            <span className="px-3.5 py-1.5 rounded-full bg-black/70 text-white text-xs font-black backdrop-blur-md border border-white/20 pointer-events-auto shadow-md">
              {currentIndex + 1} / {galleryImages.length}
            </span>

            <div className="flex items-center gap-2 pointer-events-auto">
              <button
                onClick={() => setIsPlaying(!isPlaying)}
                className="w-9 h-9 rounded-full bg-black/70 hover:bg-black text-white backdrop-blur-md flex items-center justify-center transition-all border border-white/20 shadow-md"
                aria-label={isPlaying ? 'Jeda Slideshow' : 'Putar Slideshow'}
              >
                {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 ml-0.5" />}
              </button>
              <button
                onClick={toggleFullscreen}
                className="w-9 h-9 rounded-full bg-black/70 hover:bg-black text-white backdrop-blur-md flex items-center justify-center transition-all border border-white/20 shadow-md"
                aria-label="Tampilan Layar Penuh"
              >
                <Maximize2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

      </div>

      {/* THUMBNAIL STRIP */}
      <div className="glass-card p-3 sm:p-4 rounded-2xl bg-white border-sky-100 shadow-sm">
        <div className="flex items-center gap-2.5 overflow-x-auto pb-1 pt-1 no-scrollbar scroll-smooth">
          {galleryImages.map((src, index) => (
            <button
              key={src}
              onClick={() => setCurrentIndex(index)}
              className={`relative aspect-video w-20 sm:w-28 shrink-0 rounded-xl overflow-hidden border-2 transition-all ${
                currentIndex === index
                  ? 'border-sky-500 ring-2 ring-sky-300 scale-105 shadow-md opacity-100'
                  : 'border-transparent opacity-50 hover:opacity-100'
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

      {/* TRUE FULLSCREEN MODAL (PORTAL TO DOCUMENT.BODY) */}
      {isFullscreen && mounted && typeof document !== 'undefined' && createPortal(
        <div className="fixed inset-0 z-[999999] w-screen h-screen bg-black flex items-center justify-center overflow-hidden animate-fadeIn">
          
          {/* CLOSE BUTTON */}
          <button
            onClick={closeFullscreen}
            className="absolute top-4 right-4 sm:top-6 sm:right-6 w-12 h-12 rounded-full bg-white/20 hover:bg-white/40 text-white flex items-center justify-center transition-all z-[1000000] border border-white/30 shadow-2xl hover:scale-110"
            aria-label="Tutup Layar Penuh"
          >
            <X className="w-7 h-7" />
          </button>

          {/* PREV BUTTON */}
          <button
            onClick={prevSlide}
            className="absolute left-4 sm:left-8 top-1/2 -translate-y-1/2 w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-black/60 hover:bg-black/90 text-white flex items-center justify-center transition-all z-[1000000] border border-white/20 shadow-2xl hover:scale-110"
            aria-label="Foto Sebelumnya"
          >
            <ChevronLeft className="w-9 h-9" />
          </button>

          {/* NEXT BUTTON */}
          <button
            onClick={nextSlide}
            className="absolute right-4 sm:right-8 top-1/2 -translate-y-1/2 w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-black/60 hover:bg-black/90 text-white flex items-center justify-center transition-all z-[1000000] border border-white/20 shadow-2xl hover:scale-110"
            aria-label="Foto Selanjutnya"
          >
            <ChevronRight className="w-9 h-9" />
          </button>

          {/* FULL SCREEN IMAGE CONTAINER (100% WIDTH & 100% HEIGHT) */}
          <div className="relative w-full h-full p-2 sm:p-8 flex items-center justify-center">
            <Image
              src={galleryImages[currentIndex]}
              alt={`Foto Fullscreen ${currentIndex + 1}`}
              fill
              className="object-contain"
              priority
            />
          </div>

          {/* BOTTOM COUNTER */}
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 px-5 py-2 rounded-full bg-black/70 text-white text-xs sm:text-sm font-bold border border-white/20 backdrop-blur-md shadow-2xl z-[1000000]">
            {currentIndex + 1} / {galleryImages.length}
          </div>
        </div>,
        document.body
      )}

    </div>
  );
}
