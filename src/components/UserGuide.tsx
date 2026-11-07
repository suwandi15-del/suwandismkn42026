import React from 'react';
import { NavPage } from '../types';
import { 
  ArrowRight, 
  CheckCircle2, 
  Compass, 
  LogIn, 
  GraduationCap, 
  BookOpen, 
  Layers, 
  Gamepad2, 
  Award, 
  PenTool, 
  Sparkles 
} from 'lucide-react';

interface UserGuideProps {
  onNavigate: (page: NavPage) => void;
}

export const UserGuide: React.FC<UserGuideProps> = ({ onNavigate }) => {
  const steps = [
    {
      step: 1,
      title: 'Masuk ke Halaman Pembelajaran',
      desc: 'Buka platform Mathematika Adventure melalui gawai (smartphone, tablet, laptop, atau TV interaktif kelas). Pastikan perangkat terhubung dengan baik.',
      icon: <LogIn className="w-5 h-5 text-blue-400" />,
      actionText: 'Kembali ke Beranda',
      target: 'beranda' as NavPage,
      tip: 'Aplikasi ini responsif di HP Android dan tablet sehingga nyaman diakses di mana pun!'
    },
    {
      step: 2,
      title: 'Pelajari Tujuan Pembelajaran',
      desc: 'Pahami Capaian Pembelajaran Fase E, Indikator Ketercapaian, serta materi prasyarat agar kamu memiliki gambaran jelas tentang target yang harus dikuasai.',
      icon: <GraduationCap className="w-5 h-5 text-emerald-400" />,
      actionText: 'Lihat Tujuan Pembelajaran',
      target: 'tujuan' as NavPage,
      tip: 'Fokus utama kita adalah terampil menemukan akar-akar kuadrat dengan faktorisasi, kuadrat sempurna, dan rumus ABC.'
    },
    {
      step: 3,
      title: 'Baca Komik Digital Interaktif',
      desc: 'Nikmati cerita petualangan komik yang disiapkan oleh Pak Suwandi bersama Sari dan Dika. Amati situasi kontekstual di bengkel dan laboratorium SMKN 4 Soppeng.',
      icon: <BookOpen className="w-5 h-5 text-yellow-400" />,
      actionText: 'Buka Jelajahi Komik',
      target: 'komik' as NavPage,
      tip: 'Gunakan mode layar penuh (fullscreen) dan fitur zoom untuk melihat gambar dan dialog komik dengan lebih jelas.'
    },
    {
      step: 4,
      title: 'Pelajari Materi & Contoh Soal di Lab',
      desc: 'Masuk ke Laboratorium Matematika. Pelajari 6 modul konsep kuadratik, cermati langkah penyelesaian masalah terarah, dan coba manipulasi slider kurva parabola.',
      icon: <Layers className="w-5 h-5 text-cyan-400" />,
      actionText: 'Kunjungi Lab Matematika',
      target: 'laboratorium' as NavPage,
      tip: 'Cobalah latihan interaktif singkat di akhir setiap modul untuk menguji pemahamanmu secara langsung.'
    },
    {
      step: 5,
      title: 'Kerjakan Tantangan Matematika (Game)',
      desc: 'Uji ketangkasanmu melalui 5 mini game interaktif: Tebak Akar, Misi Faktorisasi, Detektif Rumus ABC, Tantangan Diskriminan, dan Battle Matematika.',
      icon: <Gamepad2 className="w-5 h-5 text-purple-400" />,
      actionText: 'Mulai Main Game',
      target: 'tantangan' as NavPage,
      tip: 'Kumpulkan poin sebanyak-banyaknya dan dapatkan respon seru serta animasi selebrasi dari teman-temanmu!'
    },
    {
      step: 6,
      title: 'Ikuti Evaluasi Akhir',
      desc: 'Kerjakan 10 butir soal pilihan ganda berbobot untuk mengukur pemahaman konsep dan kemampuan analisis kejuruan. Nilai akan dihitung otomatis.',
      icon: <Award className="w-5 h-5 text-amber-400" />,
      actionText: 'Mulai Evaluasi Akhir',
      target: 'evaluasi' as NavPage,
      tip: 'Target kriteria ketuntasan (KKTP) adalah 75. Kamu dapat membaca pembahasan mendalam setelah selesai.'
    },
    {
      step: 7,
      title: 'Isi Refleksi Belajar',
      desc: 'Tuliskan kesan, bagian paling menarik, metode favoritmu, dan kendala yang kamu rasakan pada lembar refleksi diri untuk catatan bimbingan Pak Suwandi.',
      icon: <PenTool className="w-5 h-5 text-rose-400" />,
      actionText: 'Isi Refleksi Sekarang',
      target: 'refleksi' as NavPage,
      tip: 'Jawaban refleksimu membantu guru mengetahui metode terbaik yang paling kamu sukai!'
    }
  ];

  return (
    <div className="space-y-8 py-4 sm:py-6 max-w-5xl mx-auto">
      
      {/* Header Banner with Teacher Avatar */}
      <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-xl flex flex-col md:flex-row items-center gap-6">
        <div className="w-24 h-24 sm:w-28 sm:end-28 rounded-3xl overflow-hidden border-2 border-amber-400/80 shrink-0 shadow-lg bg-slate-950">
          <img
            src="/src/assets/images/teacher_suwandi_avatar_1794015829391.jpg"
            alt="Bapak Suwandi, S.Pd."
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
        </div>

        <div className="space-y-2 text-center md:text-left flex-1">
          <div className="flex flex-wrap items-center justify-center md:justify-start gap-2 text-xs font-bold text-amber-400">
            <Compass className="w-4 h-4" />
            <span>PANDUAN BELAJAR LANGKAH DEMI LANGKAH</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-heading font-extrabold text-white">
            Petunjuk Penggunaan LMS Mathematika Adventure
          </h2>
          <p className="text-sm text-slate-300 leading-relaxed">
            Halo murid-murid SMKN 4 Soppeng yang hebat! Ikuti 7 tahapan petualangan berikut secara berurutan agar belajarmu terstruktur, menyenangkan, dan tuntas dengan hasil maksimal.
          </p>
        </div>
      </div>

      {/* 7 Steps Cards List */}
      <div className="space-y-4">
        {steps.map((item) => (
          <div
            key={item.step}
            className="bg-slate-900/80 border border-slate-800 rounded-2xl p-5 hover:border-slate-700 transition-all flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5 group"
          >
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-2xl bg-slate-800 border border-slate-700 flex flex-col items-center justify-center shrink-0 group-hover:bg-slate-700/80 transition-colors">
                <span className="text-[10px] text-slate-400 font-bold uppercase">Tahap</span>
                <span className="text-base font-extrabold text-amber-400">{item.step}</span>
              </div>

              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <div className="p-1 rounded-md bg-slate-800 shrink-0">
                    {item.icon}
                  </div>
                  <h3 className="font-heading font-bold text-white text-base sm:text-lg">
                    {item.title}
                  </h3>
                </div>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed max-w-2xl">
                  {item.desc}
                </p>
                <div className="pt-1 flex items-center gap-1.5 text-xs text-amber-300/90 font-medium">
                  <Sparkles className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                  <span>Tips: {item.tip}</span>
                </div>
              </div>
            </div>

            <button
              onClick={() => onNavigate(item.target)}
              className="w-full sm:w-auto px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-amber-400 hover:text-slate-950 text-white font-semibold text-xs whitespace-nowrap transition-all flex items-center justify-center gap-2 shrink-0 border border-slate-700/80"
            >
              <span>{item.actionText}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        ))}
      </div>

      {/* Motivational Bottom Banner */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 text-center space-y-4">
        <h3 className="font-heading font-bold text-white text-lg flex items-center justify-center gap-2">
          <CheckCircle2 className="w-5 h-5 text-emerald-400" />
          <span>Siap Memulai Petualangan Matematika?</span>
        </h3>
        <p className="text-xs sm:text-sm text-slate-300 max-w-xl mx-auto">
          Kamu bisa memilih untuk membaca komik terlebih dahulu atau langsung menguji pemahaman di laboratorium simulasi.
        </p>
        <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
          <button
            onClick={() => onNavigate('komik')}
            className="px-5 py-2.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold text-xs sm:text-sm transition-colors shadow-md flex items-center gap-2"
          >
            <BookOpen className="w-4 h-4" />
            <span>Mulai Baca Komik Digital</span>
          </button>
          <button
            onClick={() => onNavigate('laboratorium')}
            className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs sm:text-sm transition-colors shadow-md flex items-center gap-2"
          >
            <Layers className="w-4 h-4" />
            <span>Masuk Laboratorium Materi</span>
          </button>
        </div>
      </div>

    </div>
  );
};
