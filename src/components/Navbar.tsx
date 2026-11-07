import React from 'react';
import { NavPage, TeacherProfile } from '../types';
import { BookOpen, GraduationCap, Trophy, Sparkles, UserCheck, ShieldCheck } from 'lucide-react';

interface NavbarProps {
  currentPage: NavPage;
  onNavigate: (page: NavPage) => void;
  teacherProfile: TeacherProfile;
  isTeacherAuthenticated: boolean;
  onOpenTeacherLogin: () => void;
  onTeacherLogout: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentPage,
  onNavigate,
  teacherProfile,
  isTeacherAuthenticated,
  onOpenTeacherLogin,
  onTeacherLogout
}) => {
  const navItems: { id: NavPage; label: string; icon: React.ReactNode }[] = [
    { id: 'beranda', label: 'Beranda', icon: <Sparkles className="w-4 h-4" /> },
    { id: 'petunjuk', label: 'Petunjuk', icon: <UserCheck className="w-4 h-4" /> },
    { id: 'tujuan', label: 'Tujuan', icon: <GraduationCap className="w-4 h-4" /> },
    { id: 'komik', label: 'Jelajahi Komik', icon: <BookOpen className="w-4 h-4" /> },
    { id: 'laboratorium', label: 'Lab Matematika', icon: <Sparkles className="w-4 h-4" /> },
    { id: 'tantangan', label: 'Tantangan Game', icon: <Trophy className="w-4 h-4" /> },
    { id: 'evaluasi', label: 'Evaluasi', icon: <GraduationCap className="w-4 h-4" /> },
    { id: 'refleksi', label: 'Refleksi', icon: <UserCheck className="w-4 h-4" /> },
  ];

  return (
    <header className="sticky top-0 z-40 bg-slate-900/95 backdrop-blur-md border-b border-slate-800 text-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-8">
        
        {/* Zone 1: Single text element Brand wordmark */}
        <button
          onClick={() => onNavigate('beranda')}
          className="flex items-center gap-2.5 text-left group transition-transform focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 rounded-lg shrink-0"
        >
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-amber-500 to-yellow-300 flex items-center justify-center font-bold text-slate-950 shadow-md group-hover:scale-105 transition-transform">
            MA
          </div>
          <div className="flex flex-col">
            <span className="font-heading font-extrabold text-base sm:text-lg tracking-tight text-white whitespace-nowrap">
              MATHEMATIKA ADVENTURE
            </span>
            <span className="text-[10px] text-amber-400 font-medium tracking-wide whitespace-nowrap">
              {teacherProfile.school}
            </span>
          </div>
        </button>

        {/* Zone 2: Navigation Links (single-line, clean hover) */}
        <nav className="hidden lg:flex items-center gap-1 xl:gap-2 text-sm font-medium text-slate-300 overflow-x-auto py-1">
          {navItems.map((item) => {
            const isActive = currentPage === item.id;
            return (
              <button
                key={item.id}
                onClick={() => onNavigate(item.id)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors flex items-center gap-1.5 ${
                  isActive
                    ? 'bg-amber-400 text-slate-950 shadow-sm'
                    : 'text-slate-300 hover:text-white hover:bg-slate-800/80'
                }`}
              >
                {item.label}
              </button>
            );
          })}
        </nav>

        {/* Zone 3: Primary Action (Panel Guru / Admin) */}
        <div className="flex items-center gap-2 shrink-0">
          {isTeacherAuthenticated ? (
            <div className="flex items-center gap-2">
              <button
                onClick={() => onNavigate('guru')}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-bold whitespace-nowrap transition-all flex items-center gap-1.5 ${
                  currentPage === 'guru'
                    ? 'bg-emerald-500 text-white shadow'
                    : 'bg-emerald-600/90 text-white hover:bg-emerald-500'
                }`}
              >
                <ShieldCheck className="w-4 h-4" />
                Panel Guru
              </button>
              <button
                onClick={onTeacherLogout}
                className="px-2.5 py-1.5 rounded-lg text-xs text-slate-400 hover:text-rose-300 hover:bg-slate-800 transition-colors whitespace-nowrap"
                title="Keluar dari Panel Guru"
              >
                Keluar
              </button>
            </div>
          ) : (
            <button
              onClick={onOpenTeacherLogin}
              className="px-3.5 py-1.5 rounded-lg text-xs font-bold text-amber-300 border border-amber-400/30 hover:border-amber-400 hover:bg-amber-400/10 transition-colors whitespace-nowrap flex items-center gap-1.5"
            >
              <ShieldCheck className="w-4 h-4 text-amber-400" />
              <span>Panel Guru</span>
            </button>
          )}
        </div>
      </div>

      {/* Mobile Horizontal Sub-Navigation */}
      <div className="lg:hidden border-t border-slate-800/80 bg-slate-950/90 px-3 py-2 overflow-x-auto flex items-center gap-1.5 scrollbar-none">
        {navItems.map((item) => {
          const isActive = currentPage === item.id;
          return (
            <button
              key={item.id}
              onClick={() => onNavigate(item.id)}
              className={`px-2.5 py-1 rounded-md text-[11px] font-medium whitespace-nowrap transition-colors flex items-center gap-1 shrink-0 ${
                isActive
                  ? 'bg-amber-400 text-slate-950 font-bold'
                  : 'text-slate-300 bg-slate-800/60 hover:text-white'
              }`}
            >
              {item.label}
            </button>
          );
        })}
      </div>
    </header>
  );
};
