import React, { useState, useEffect, useRef } from 'react';
import { ComicPublication, NavPage } from '../types';
import { 
  ChevronLeft, 
  ChevronRight, 
  ZoomIn, 
  ZoomOut, 
  Maximize, 
  Minimize, 
  Columns, 
  Square, 
  List, 
  BookOpen, 
  CheckCircle2, 
  Share2, 
  FileText,
  RotateCcw,
  Sparkles,
  ArrowRight
} from 'lucide-react';
import confetti from 'canvas-confetti';

interface ComicReaderProps {
  comics: ComicPublication[];
  onNavigate: (page: NavPage) => void;
  onUpdateProgress: (pageNumber: number) => void;
  initialPage?: number;
}

export const ComicReader: React.FC<ComicReaderProps> = ({
  comics,
  onNavigate,
  onUpdateProgress,
  initialPage = 1
}) => {
  const publishedComics = comics.filter((c) => c.isPublished);
  const activeComic = publishedComics[0] || comics[0];

  const [currentPageIndex, setCurrentPageIndex] = useState(
    Math.max(0, Math.min(initialPage - 1, (activeComic?.pages.length || 1) - 1))
  );
  const [zoomLevel, setZoomLevel] = useState<number>(100);
  const [isTwoPageView, setIsTwoPageView] = useState<boolean>(false);
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);
  const [showThumbnails, setShowThumbnails] = useState<boolean>(false);
  const [isCompletedCelebration, setIsCompletedCelebration] = useState<boolean>(false);

  const containerRef = useRef<HTMLDivElement>(null);
  const touchStartXRef = useRef<number | null>(null);

  const totalPages = activeComic?.pages.length || 0;
  const isPDF = activeComic?.fileType === 'pdf' && Boolean(activeComic.pdfUrl);

  // Sync progress
  useEffect(() => {
    onUpdateProgress(currentPageIndex + 1);
    if (currentPageIndex === totalPages - 1 && totalPages > 1 && !isCompletedCelebration) {
      setIsCompletedCelebration(true);
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 }
      });
    }
  }, [currentPageIndex, totalPages]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight' || e.key === 'PageDown') {
        goToNextPage();
      } else if (e.key === 'ArrowLeft' || e.key === 'PageUp') {
        goToPrevPage();
      } else if (e.key === 'f' || e.key === 'F') {
        toggleFullscreen();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  });

  const goToNextPage = () => {
    const step = isTwoPageView ? 2 : 1;
    if (currentPageIndex + step < totalPages) {
      setCurrentPageIndex((prev) => prev + step);
    } else if (currentPageIndex < totalPages - 1) {
      setCurrentPageIndex(totalPages - 1);
    }
  };

  const goToPrevPage = () => {
    const step = isTwoPageView ? 2 : 1;
    if (currentPageIndex - step >= 0) {
      setCurrentPageIndex((prev) => prev - step);
    } else if (currentPageIndex > 0) {
      setCurrentPageIndex(0);
    }
  };

  const handleZoomIn = () => setZoomLevel((prev) => Math.min(prev + 20, 200));
  const handleZoomOut = () => setZoomLevel((prev) => Math.max(prev - 20, 60));
  const handleResetZoom = () => setZoomLevel(100);

  const toggleFullscreen = () => {
    if (!containerRef.current) return;
    if (!document.fullscreenElement) {
      containerRef.current.requestFullscreen().catch(() => {});
      setIsFullscreen(true);
    } else {
      document.exitFullscreen().catch(() => {});
      setIsFullscreen(false);
    }
  };

  // Touch swipe support for mobile
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartXRef.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartXRef.current === null) return;
    const touchEndX = e.changedTouches[0].clientX;
    const diff = touchStartXRef.current - touchEndX;
    if (Math.abs(diff) > 50) {
      if (diff > 0) {
        goToNextPage(); // Swiped left -> next
      } else {
        goToPrevPage(); // Swiped right -> prev
      }
    }
    touchStartXRef.current = null;
  };

  if (!activeComic || totalPages === 0) {
    return (
      <div className="py-12 text-center space-y-4 max-w-xl mx-auto bg-slate-900 border border-slate-800 rounded-3xl p-8">
        <BookOpen className="w-12 h-12 text-amber-400 mx-auto" />
        <h3 className="text-xl font-heading font-bold text-white">Belum Ada Komik Yang Dipublikasikan</h3>
        <p className="text-sm text-slate-300">
          Guru dapat mengunggah file PDF atau kumpulan gambar komik pembelajaran melalui Panel Guru.
        </p>
        <button
          onClick={() => onNavigate('guru')}
          className="px-5 py-2.5 bg-amber-400 text-slate-950 font-bold rounded-xl text-xs hover:bg-amber-300"
        >
          Masuk Panel Guru untuk Unggah Komik
        </button>
      </div>
    );
  }

  const currentPage = activeComic.pages[currentPageIndex];
  const secondPage = isTwoPageView && currentPageIndex + 1 < totalPages ? activeComic.pages[currentPageIndex + 1] : null;
  const progressPercent = Math.round(((currentPageIndex + 1) / totalPages) * 100);

  return (
    <div className="space-y-6 py-4 max-w-6xl mx-auto" ref={containerRef}>
      
      {/* Top Header Control Strip */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 shadow-lg flex flex-wrap items-center justify-between gap-4">
        
        {/* Title & Page Counter */}
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-xl bg-amber-400/20 text-amber-400">
            <BookOpen className="w-5 h-5" />
          </div>
          <div>
            <h2 className="font-heading font-extrabold text-white text-base sm:text-lg">
              {activeComic.title}
            </h2>
            <div className="flex items-center gap-2 text-xs text-slate-400">
              <span className="font-semibold text-amber-400">
                Halaman {currentPageIndex + 1} {secondPage ? `& ${currentPageIndex + 2}` : ''} dari {totalPages}
              </span>
              <span>·</span>
              <span className="text-emerald-400">{progressPercent}% Dibaca</span>
              {isPDF && <span className="bg-rose-500/20 text-rose-300 px-1.5 py-0.5 rounded text-[10px]">PDF</span>}
            </div>
          </div>
        </div>

        {/* Reader Toolbar Buttons */}
        <div className="flex flex-wrap items-center gap-2 text-xs">
          
          {/* Zoom controls */}
          <div className="flex items-center bg-slate-800 border border-slate-700 rounded-xl p-1">
            <button
              onClick={handleZoomOut}
              disabled={zoomLevel <= 60}
              className="p-1.5 text-slate-300 hover:text-white disabled:opacity-40 transition-colors"
              title="Perkecil (-)"
            >
              <ZoomOut className="w-4 h-4" />
            </button>
            <button
              onClick={handleResetZoom}
              className="px-2 py-1 font-mono text-[11px] font-bold text-amber-300 hover:text-white"
              title="Kembalikan 100%"
            >
              {zoomLevel}%
            </button>
            <button
              onClick={handleZoomIn}
              disabled={zoomLevel >= 200}
              className="p-1.5 text-slate-300 hover:text-white disabled:opacity-40 transition-colors"
              title="Perbesar (+)"
            >
              <ZoomIn className="w-4 h-4" />
            </button>
          </div>

          {/* Single vs Two-Page Mode (desktop) */}
          <button
            onClick={() => setIsTwoPageView(!isTwoPageView)}
            className="hidden md:flex items-center gap-1.5 px-3 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-xl border border-slate-700 transition-colors"
            title={isTwoPageView ? 'Mode Satu Halaman' : 'Mode Dua Halaman'}
          >
            {isTwoPageView ? <Square className="w-4 h-4 text-amber-400" /> : <Columns className="w-4 h-4" />}
            <span>{isTwoPageView ? '1 Halaman' : '2 Halaman'}</span>
          </button>

          {/* Thumbnail Drawer Toggle */}
          <button
            onClick={() => setShowThumbnails(!showThumbnails)}
            className={`flex items-center gap-1.5 px-3 py-2 rounded-xl border transition-colors ${
              showThumbnails
                ? 'bg-amber-400 text-slate-950 border-amber-400 font-bold'
                : 'bg-slate-800 hover:bg-slate-700 text-slate-200 border-slate-700'
            }`}
          >
            <List className="w-4 h-4" />
            <span className="hidden sm:inline">Daftar Halaman</span>
          </button>

          {/* Fullscreen Toggle */}
          <button
            onClick={toggleFullscreen}
            className="p-2 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-xl border border-slate-700 transition-colors"
            title="Layar Penuh (F)"
          >
            {isFullscreen ? <Minimize className="w-4 h-4 text-amber-400" /> : <Maximize className="w-4 h-4" />}
          </button>

        </div>

      </div>

      {/* Progress Bar */}
      <div className="w-full bg-slate-800 rounded-full h-2 overflow-hidden">
        <div
          className="bg-gradient-to-r from-amber-400 to-yellow-300 h-full transition-all duration-300"
          style={{ width: `${progressPercent}%` }}
        />
      </div>

      {/* Thumbnail Drawer (Collapsible) */}
      {showThumbnails && (
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 shadow-xl space-y-3">
          <div className="flex items-center justify-between text-xs font-bold text-slate-300 border-b border-slate-800 pb-2">
            <span>PILIH HALAMAN KOMIK ({totalPages} HALAMAN)</span>
            <button
              onClick={() => setShowThumbnails(false)}
              className="text-slate-400 hover:text-white"
            >
              Tutup ✕
            </button>
          </div>
          <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-3 max-h-56 overflow-y-auto p-1">
            {activeComic.pages.map((p, idx) => (
              <button
                key={p.id}
                onClick={() => {
                  setCurrentPageIndex(idx);
                  setShowThumbnails(false);
                }}
                className={`relative rounded-xl overflow-hidden border-2 text-left transition-all group ${
                  currentPageIndex === idx
                    ? 'border-amber-400 shadow-md ring-2 ring-amber-400/30'
                    : 'border-slate-800 hover:border-slate-600'
                }`}
              >
                <div className="aspect-[3/4] bg-slate-950 overflow-hidden">
                  <img
                    src={p.imageUrl}
                    alt={p.title || `Halaman ${p.pageNumber}`}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                    referrerPolicy="no-referrer"
                    loading="lazy"
                  />
                </div>
                <div className="absolute bottom-0 inset-x-0 bg-slate-950/90 py-1 px-1.5 text-[10px] text-center font-bold text-white truncate">
                  Hal {p.pageNumber}
                </div>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Comic Display Stage with Touch Handler */}
      <div
        className="relative bg-slate-950 border border-slate-800 rounded-3xl p-3 sm:p-6 shadow-2xl flex items-center justify-center min-h-[500px] overflow-hidden select-none"
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        {/* Floating Previous Arrow */}
        <button
          onClick={goToPrevPage}
          disabled={currentPageIndex === 0}
          className="absolute left-3 sm:left-6 z-20 w-11 h-11 sm:w-13 sm:h-13 rounded-2xl bg-slate-900/80 hover:bg-amber-400 hover:text-slate-950 text-white border border-slate-700/80 shadow-2xl flex items-center justify-center transition-all disabled:opacity-20 disabled:pointer-events-none backdrop-blur-md"
          title="Halaman Sebelumnya (Panah Kiri)"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>

        {/* Floating Next Arrow */}
        <button
          onClick={goToNextPage}
          disabled={currentPageIndex >= totalPages - (isTwoPageView ? 2 : 1)}
          className="absolute right-3 sm:right-6 z-20 w-11 h-11 sm:w-13 sm:h-13 rounded-2xl bg-slate-900/80 hover:bg-amber-400 hover:text-slate-950 text-white border border-slate-700/80 shadow-2xl flex items-center justify-center transition-all disabled:opacity-20 disabled:pointer-events-none backdrop-blur-md"
          title="Halaman Berikutnya (Panah Kanan)"
        >
          <ChevronRight className="w-6 h-6" />
        </button>

        {/* Comic Page Views */}
        <div
          className={`flex items-center justify-center gap-4 transition-all duration-200 ${
            isTwoPageView ? 'flex-col md:flex-row' : 'flex-col'
          }`}
          style={{ transform: `scale(${zoomLevel / 100})`, transformOrigin: 'center center' }}
        >
          {/* Main Page */}
          <div className="max-w-2xl w-full flex flex-col items-center bg-slate-900 rounded-2xl overflow-hidden border border-slate-800 shadow-2xl">
            <div className="w-full relative flex items-center justify-center bg-slate-950">
              <img
                src={currentPage.imageUrl}
                alt={currentPage.title || `Halaman ${currentPage.pageNumber}`}
                className="w-full max-h-[75vh] object-contain block select-none pointer-events-none"
                referrerPolicy="no-referrer"
              />
            </div>

            {/* Caption & Story Context */}
            {currentPage.caption && (
              <div className="w-full p-4 bg-slate-900 border-t border-slate-800 text-left space-y-1">
                <span className="text-[10px] uppercase font-bold text-amber-400 tracking-wider">
                  {currentPage.title || `Halaman ${currentPage.pageNumber}`}
                </span>
                <p className="text-xs sm:text-sm text-slate-200 leading-relaxed">
                  {currentPage.caption}
                </p>
              </div>
            )}
          </div>

          {/* Optional Second Page in Two-Page Mode */}
          {secondPage && (
            <div className="max-w-2xl w-full flex flex-col items-center bg-slate-900 rounded-2xl overflow-hidden border border-slate-800 shadow-2xl">
              <div className="w-full relative flex items-center justify-center bg-slate-950">
                <img
                  src={secondPage.imageUrl}
                  alt={secondPage.title || `Halaman ${secondPage.pageNumber}`}
                  className="w-full max-h-[75vh] object-contain block select-none pointer-events-none"
                  referrerPolicy="no-referrer"
                />
              </div>

              {secondPage.caption && (
                <div className="w-full p-4 bg-slate-900 border-t border-slate-800 text-left space-y-1">
                  <span className="text-[10px] uppercase font-bold text-amber-400 tracking-wider">
                    {secondPage.title || `Halaman ${secondPage.pageNumber}`}
                  </span>
                  <p className="text-xs sm:text-sm text-slate-200 leading-relaxed">
                    {secondPage.caption}
                  </p>
                </div>
              )}
            </div>
          )}
        </div>

      </div>

      {/* Completion Banner if reader finished all pages */}
      {progressPercent === 100 && (
        <div className="bg-gradient-to-r from-emerald-950 via-slate-900 to-emerald-950 border border-emerald-500/50 rounded-2xl p-6 shadow-xl flex flex-col sm:flex-row items-center justify-between gap-5">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0 border border-emerald-500/30">
              <CheckCircle2 className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-heading font-bold text-white text-base sm:text-lg">
                Hebat! Kamu Telah Menuntaskan Komik Ini!
              </h4>
              <p className="text-xs sm:text-sm text-slate-300">
                Sekarang waktunya mempraktikkan konsep persamaan kuadrat di Laboratorium Matematika atau menguji ketangkasan di Tantangan Game!
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={() => onNavigate('laboratorium')}
              className="px-4 py-2.5 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-xl text-xs flex items-center gap-1.5 shadow"
            >
              <span>Ke Laboratorium</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            <button
              onClick={() => onNavigate('tantangan')}
              className="px-4 py-2.5 bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold rounded-xl text-xs flex items-center gap-1.5 shadow"
            >
              <span>Mainkan Game</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* PDF View Alternative if user uploaded a PDF */}
      {isPDF && activeComic.pdfUrl && (
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <FileText className="w-6 h-6 text-rose-400" />
            <div>
              <p className="text-xs font-bold text-white">File Sumber Dokumen PDF Terpasang</p>
              <p className="text-[11px] text-slate-400">Kamu juga dapat membuka PDF dalam penampil sistem bawaan.</p>
            </div>
          </div>
          <a
            href={activeComic.pdfUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="px-3.5 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-xl text-xs font-semibold border border-slate-700"
          >
            Buka PDF di Tab Baru
          </a>
        </div>
      )}

    </div>
  );
};
