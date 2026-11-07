import React from 'react';
import { NavPage, TeacherProfile, StudentProgress } from '../types';
import { 
  BookOpen, 
  Compass, 
  GraduationCap, 
  Gamepad2, 
  Sparkles, 
  PenTool, 
  CheckCircle2, 
  ArrowRight,
  Flame,
  Award,
  Layers
} from 'lucide-react';

interface HomeHeroProps {
  teacherProfile: TeacherProfile;
  studentProgress: StudentProgress;
  onNavigate: (page: NavPage) => void;
}

export const HomeHero: React.FC<HomeHeroProps> = ({
  teacherProfile,
  studentProgress,
  onNavigate,
}) => {
  const bigNavButtons = [
    {
      id: 'beranda' as NavPage,
      number: '1',
      title: 'BERANDA',
      subtitle: 'Halaman Utama & Info Pembelajaran',
      icon: <Sparkles className="w-6 h-6 text-amber-300" />,
      color: 'from-blue-700 to-indigo-800 hover:border-amber-400',
      tag: 'Mulai Petualangan',
      tagColor: 'text-amber-300'
    },
    {
      id: 'petunjuk' as NavPage,
      number: '2',
      title: 'PETUNJUK PENGGUNAAN',
      subtitle: '7 Langkah Petualangan Belajar Efektif',
      icon: <Compass className="w-6 h-6 text-cyan-300" />,
      color: 'from-cyan-900 to-blue-900 hover:border-cyan-400',
      tag: 'Panduan Lengkap',
      tagColor: 'text-cyan-300'
    },
    {
      id: 'tujuan' as NavPage,
      number: '3',
      title: 'TUJUAN PEMBELAJARAN',
      subtitle: 'Capaian & Indikator Fase E Kurikulum',
      icon: <GraduationCap className="w-6 h-6 text-emerald-300" />,
      color: 'from-emerald-900 to-teal-900 hover:border-emerald-400',
      tag: 'Target Belajar',
      tagColor: 'text-emerald-300'
    },
    {
      id: 'komik' as NavPage,
      number: '4',
      title: 'JELAJAHI KOMIK',
      subtitle: 'Petualangan Pak Suwandi, Sari & Dika',
      icon: <BookOpen className="w-6 h-6 text-yellow-300" />,
      color: 'from-amber-800 to-orange-900 hover:border-yellow-400 ring-2 ring-amber-400/30',
      tag: 'Fitur Utama',
      tagColor: 'text-yellow-300'
    },
    {
      id: 'tantangan' as NavPage,
      number: '5',
      title: 'TANTANGAN MATEMATIKA',
      subtitle: '5 Game Edukasi & Misi Kuadratik',
      icon: <Gamepad2 className="w-6 h-6 text-purple-300" />,
      color: 'from-purple-900 to-indigo-950 hover:border-purple-400',
      tag: '5 Game Interaktif',
      tagColor: 'text-purple-300'
    },
    {
      id: 'refleksi' as NavPage,
      number: '6',
      title: 'REFLEKSI BELAJAR',
      subtitle: 'Ukur Pemahaman & Evaluasi Diri',
      icon: <PenTool className="w-6 h-6 text-rose-300" />,
      color: 'from-rose-900 to-pink-950 hover:border-rose-400',
      tag: 'Penilaian Mandiri',
      tagColor: 'text-rose-300'
    }
  ];

  const totalScore = Object.values(studentProgress.challengesScore).reduce((a, b) => a + b, 0);

  return (
    <div className="space-y-10 py-4 sm:py-8">
      {/* Hero Section Split: Cover on Left, Header & 6 Big Nav Buttons on Right */}
      <section className="bg-slate-900/80 border border-slate-800 rounded-3xl p-6 sm:p-8 lg:p-10 shadow-2xl relative overflow-hidden backdrop-blur-sm">
        
        {/* Subtle background glow effect */}
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-1/4 w-80 h-80 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Left Column: Comic Cover Image (Preserving exact aspect ratio, no cropping) */}
          <div className="lg:col-span-5 flex flex-col items-center">
            <div className="relative group w-full max-w-sm sm:max-w-md mx-auto">
              {/* Decorative Frame */}
              <div className="absolute -inset-2 bg-gradient-to-r from-amber-400 via-orange-500 to-yellow-300 rounded-2xl opacity-75 blur-md group-hover:opacity-100 transition duration-500" />
              
              <div className="relative bg-slate-950 rounded-2xl overflow-hidden border-2 border-amber-400/60 shadow-2xl">
                <img
                  src={teacherProfile.coverImageUrl}
                  alt="Sampul Komik Mathematika Adventure - Menemukan Akar-Akar Persamaan Kuadrat oleh Suwandi, S.Pd. SMKN 4 Soppeng"
                  className="w-full h-auto object-contain block transition-transform duration-500 group-hover:scale-[1.02]"
                  referrerPolicy="no-referrer"
                  loading="eager"
                />
                
                {/* Visual badge overlay */}
                <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-slate-950 via-slate-950/80 to-transparent p-4 flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-amber-300">Edisi Digital SMK</span>
                    <span className="text-slate-400">·</span>
                    <span className="text-slate-300">{teacherProfile.year}</span>
                  </div>
                  <button
                    onClick={() => onNavigate('komik')}
                    className="px-3 py-1 bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold rounded-lg text-xs transition-colors flex items-center gap-1 shadow-md"
                  >
                    Buka Komik <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>

            {/* Quick Companion Dialog Callout below cover */}
            <div className="mt-5 w-full max-w-sm sm:max-w-md bg-slate-800/80 border border-slate-700/80 rounded-2xl p-3.5 flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-amber-400 to-yellow-300 flex items-center justify-center font-bold text-slate-950 shrink-0 shadow">
                PS
              </div>
              <div className="text-xs">
                <p className="font-bold text-amber-300">Pesan Pak Suwandi:</p>
                <p className="text-slate-300 italic">
                  &ldquo;Ayo temukan akar persamaan kuadrat dengan senyuman dan rasa ingin tahu!&rdquo;
                </p>
              </div>
            </div>
          </div>

          {/* Right Column: Title, Series, Identity & 6 Big Nav Buttons */}
          <div className="lg:col-span-7 flex flex-col justify-center space-y-6">
            
            {/* Header Identity Block */}
            <div className="space-y-2">
              <div className="flex flex-wrap items-center gap-2 text-xs font-semibold">
                <span className="text-amber-400 tracking-wider uppercase font-bold">
                  {teacherProfile.seriesTitle}
                </span>
                <span className="text-slate-500">·</span>
                <span className="text-slate-300">{teacherProfile.grade} ({teacherProfile.phase})</span>
                <span className="text-slate-500">·</span>
                <span className="text-emerald-400">{teacherProfile.subject} SMK</span>
              </div>

              <h1 className="text-3xl sm:text-4xl xl:text-5xl font-heading font-extrabold text-white tracking-tight leading-tight">
                {teacherProfile.topicTitle}
              </h1>

              <p className="text-sm sm:text-base text-slate-300 leading-relaxed pt-1">
                {teacherProfile.appDescription}
              </p>

              {/* Creator & School Identity Pill */}
              <div className="pt-2 flex flex-wrap items-center gap-4 text-xs sm:text-sm text-slate-300">
                <div className="flex items-center gap-2 font-medium">
                  <div className="w-6 h-6 rounded-full bg-amber-400/20 text-amber-400 flex items-center justify-center font-bold text-xs">
                    ✓
                  </div>
                  <span>Guru Pengampu: <strong className="text-white">{teacherProfile.name}</strong></span>
                </div>
                <div className="flex items-center gap-2 font-medium">
                  <div className="w-6 h-6 rounded-full bg-blue-400/20 text-blue-400 flex items-center justify-center font-bold text-xs">
                    🏫
                  </div>
                  <span>Sekolah: <strong className="text-white">{teacherProfile.school}</strong></span>
                </div>
              </div>
            </div>

            {/* The 6 Big Navigation Buttons (Requested in prompt C) */}
            <div className="space-y-3 pt-2">
              <h2 className="text-xs uppercase font-extrabold tracking-wider text-slate-400 flex items-center gap-2">
                <Layers className="w-4 h-4 text-amber-400" />
                6 MENU UTAMA PEMBELAJARAN
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-3.5">
                {bigNavButtons.map((btn) => (
                  <button
                    key={btn.id}
                    onClick={() => onNavigate(btn.id)}
                    className={`group text-left p-4 rounded-2xl bg-gradient-to-br ${btn.color} border border-slate-700/80 shadow-lg hover:shadow-xl hover:scale-[1.02] active:scale-[0.99] transition-all flex items-start justify-between relative overflow-hidden focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-400`}
                  >
                    <div className="space-y-1 relative z-10 pr-2">
                      <div className="flex items-center gap-2">
                        <span className="w-5 h-5 rounded-md bg-white/10 text-white flex items-center justify-center text-[10px] font-bold">
                          {btn.number}
                        </span>
                        <span className={`text-[10px] font-bold tracking-wide uppercase ${btn.tagColor}`}>
                          {btn.tag}
                        </span>
                      </div>
                      <h3 className="font-heading font-extrabold text-white text-base tracking-tight group-hover:text-amber-300 transition-colors">
                        {btn.title}
                      </h3>
                      <p className="text-xs text-slate-300 line-clamp-1">
                        {btn.subtitle}
                      </p>
                    </div>

                    <div className="p-2.5 rounded-xl bg-white/10 shrink-0 group-hover:bg-white/20 transition-colors">
                      {btn.icon}
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Direct Quick Shortcuts for Lab & Evaluation */}
            <div className="pt-2 flex flex-col sm:flex-row items-center gap-3">
              <button
                onClick={() => onNavigate('laboratorium')}
                className="w-full sm:w-1/2 py-3 px-4 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-2 transition-all shadow-md hover:shadow-blue-500/25"
              >
                <Sparkles className="w-4 h-4 text-amber-300" />
                <span>Masuk Lab Matematika (6 Modul)</span>
                <ArrowRight className="w-4 h-4 ml-auto" />
              </button>

              <button
                onClick={() => onNavigate('evaluasi')}
                className="w-full sm:w-1/2 py-3 px-4 rounded-xl bg-gradient-to-r from-amber-500 to-yellow-400 hover:from-amber-400 hover:to-yellow-300 text-slate-950 font-bold text-xs sm:text-sm flex items-center justify-center gap-2 transition-all shadow-md"
              >
                <Award className="w-4 h-4" />
                <span>Evaluasi Akhir (10 Soal)</span>
                <ArrowRight className="w-4 h-4 ml-auto" />
              </button>
            </div>

          </div>

        </div>

      </section>

      {/* Feature Spotlights: Overview of 3 Characters & Learning Track */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* Character 1: Pak Suwandi, S.Pd. */}
        <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-5 hover:border-amber-400/50 transition-all flex flex-col justify-between space-y-4">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl overflow-hidden border-2 border-amber-400/60 shrink-0 bg-slate-950">
              <img
                src="/src/assets/images/teacher_suwandi_avatar_1794015829391.jpg"
                alt="Bapak Suwandi, S.Pd."
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
            <div>
              <span className="text-[10px] uppercase font-bold text-amber-400 tracking-wider">Pemandu Utama</span>
              <h3 className="font-heading font-bold text-white text-base">Bapak Suwandi, S.Pd.</h3>
              <p className="text-xs text-slate-400">Guru Matematika SMKN 4 Soppeng</p>
            </div>
          </div>
          <p className="text-xs text-slate-300 leading-relaxed">
            Menyajikan konsep matematika secara komunikatif, membimbing langkah demi langkah, dan mengaitkan rumus kuadrat dengan dunia kejuruan SMK.
          </p>
          <div className="pt-2 border-t border-slate-800 text-xs text-amber-300 font-semibold flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            <span>Siap memandu setiap modul</span>
          </div>
        </div>

        {/* Character 2: Sari & Dika (Students Companions) */}
        <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-5 hover:border-blue-400/50 transition-all flex flex-col justify-between space-y-4">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl overflow-hidden border-2 border-cyan-400/60 shrink-0 bg-slate-950">
              <img
                src="/src/assets/images/student_duo_learning_1794015829841.jpg"
                alt="Sari dan Dika"
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
            <div>
              <span className="text-[10px] uppercase font-bold text-cyan-400 tracking-wider">Sahabat Belajar</span>
              <h3 className="font-heading font-bold text-white text-base">Sari & Dika</h3>
              <p className="text-xs text-slate-400">Murid Kelas X SMKN 4 Soppeng</p>
            </div>
          </div>
          <p className="text-xs text-slate-300 leading-relaxed">
            Menemani kamu memecahkan teka-teki, memberikan respon ceria saat kamu berhasil, dan membantumu saat menemui jalan buntu dalam tantangan.
          </p>
          <div className="pt-2 border-t border-slate-800 text-xs text-cyan-300 font-semibold flex items-center gap-1.5">
            <Flame className="w-4 h-4 text-amber-400" />
            <span>Skor Tantangan Kamu: {totalScore} Poin</span>
          </div>
        </div>

        {/* Feature 3: Modern Math Lab & Simulation */}
        <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-5 hover:border-emerald-400/50 transition-all flex flex-col justify-between space-y-4">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl overflow-hidden border-2 border-emerald-400/60 shrink-0 bg-slate-950">
              <img
                src="/src/assets/images/math_adventure_lab_1794015829630.jpg"
                alt="Laboratorium Matematika Interaktif"
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
            <div>
              <span className="text-[10px] uppercase font-bold text-emerald-400 tracking-wider">Laboratorium Visual</span>
              <h3 className="font-heading font-bold text-white text-base">Visualizer Parabola</h3>
              <p className="text-xs text-slate-400">Simulasi Kurva Real-Time</p>
            </div>
          </div>
          <p className="text-xs text-slate-300 leading-relaxed">
            Geser nilai koefisien a, b, dan c secara langsung untuk melihat perubahan grafik parabola serta titik potong akar-akar kuadrat seketika.
          </p>
          <div className="pt-2 border-t border-slate-800 text-xs text-emerald-300 font-semibold flex items-center justify-between">
            <span>6 Modul Terstruktur</span>
            <button
              onClick={() => onNavigate('laboratorium')}
              className="text-white hover:text-amber-300 flex items-center gap-1 font-bold"
            >
              Uji Coba <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

      </section>
    </div>
  );
};
