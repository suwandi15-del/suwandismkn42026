import React, { useState } from 'react';
import { NavPage, StudentProgress } from '../types';
import { 
  Gamepad2, 
  Trophy, 
  Flame, 
  RotateCcw, 
  CheckCircle2, 
  XCircle, 
  Sparkles, 
  ArrowRight,
  Shield,
  HelpCircle,
  Zap,
  Target,
  Swords
} from 'lucide-react';
import confetti from 'canvas-confetti';

interface MathChallengesProps {
  studentProgress: StudentProgress;
  onUpdateScore: (gameKey: keyof StudentProgress['challengesScore'], score: number) => void;
  onNavigate: (page: NavPage) => void;
}

type GameMode = 'tebakAkar' | 'misiFaktorisasi' | 'detektifAbc' | 'tantanganDiskriminan' | 'battleMatematika';

export const MathChallenges: React.FC<MathChallengesProps> = ({
  studentProgress,
  onUpdateScore,
  onNavigate
}) => {
  const [activeGame, setActiveGame] = useState<GameMode>('tebakAkar');

  // GAME 1: TEBAK AKAR state
  const tebakAkarQuestions = [
    {
      eq: 'x² - 9 = 0',
      options: ['x = ±3', 'x = ±9', 'x = 3 saja', 'x = 0'],
      correct: 0,
      exp: 'x² = 9 → x = ±√9 = ±3'
    },
    {
      eq: 'x² - 5x + 6 = 0',
      options: ['x = 2 dan x = 3', 'x = -2 dan x = -3', 'x = 1 dan x = 6', 'x = -1 dan x = 6'],
      correct: 0,
      exp: '(x - 2)(x - 3) = 0 → x₁ = 2, x₂ = 3'
    },
    {
      eq: 'x² + 4x = 0',
      options: ['x = 0 dan x = -4', 'x = 0 dan x = 4', 'x = -2 dan x = 2', 'x = 4 saja'],
      correct: 0,
      exp: 'x(x + 4) = 0 → x = 0 atau x = -4'
    },
    {
      eq: 'x² - 2x - 8 = 0',
      options: ['x = 4 dan x = -2', 'x = -4 dan x = 2', 'x = 8 dan x = -1', 'x = 2 dan x = 4'],
      correct: 0,
      exp: '(x - 4)(x + 2) = 0 → x₁ = 4, x₂ = -2'
    }
  ];
  const [tebakIndex, setTebakIndex] = useState(0);
  const [tebakSelected, setTebakSelected] = useState<number | null>(null);
  const [tebakFeedback, setTebakFeedback] = useState<boolean | null>(null);

  // GAME 2: MISI FAKTORISASI state
  const faktorisasiQuests = [
    {
      expression: 'x² + 7x + 10',
      options: ['(x + 2)(x + 5)', '(x + 1)(x + 10)', '(x - 2)(x - 5)', '(x + 7)(x + 10)'],
      correct: 0,
      exp: '2 × 5 = 10 dan 2 + 5 = 7'
    },
    {
      expression: 'x² - 6x + 8',
      options: ['(x - 2)(x - 4)', '(x + 2)(x + 4)', '(x - 1)(x - 8)', '(x + 1)(x - 8)'],
      correct: 0,
      exp: '(-2) × (-4) = 8 dan (-2) + (-4) = -6'
    },
    {
      expression: 'x² + 3x - 18',
      options: ['(x + 6)(x - 3)', '(x - 6)(x + 3)', '(x + 9)(x - 2)', '(x - 9)(x + 2)'],
      correct: 0,
      exp: '6 × (-3) = -18 dan 6 + (-3) = 3'
    }
  ];
  const [faktoIndex, setFaktoIndex] = useState(0);
  const [faktoSelected, setFaktoSelected] = useState<number | null>(null);
  const [faktoFeedback, setFaktoFeedback] = useState<boolean | null>(null);

  // GAME 3: DETEKTIF RUMUS ABC state
  const detektifCases = [
    {
      eq: '2x² - 7x + 3 = 0',
      target: 'Tentukan nilai b² - 4ac (Diskriminan)',
      options: ['25', '49', '37', '1'],
      correct: 0,
      exp: 'b² - 4ac = (-7)² - 4(2)(3) = 49 - 24 = 25'
    },
    {
      eq: 'x² + 6x + 9 = 0',
      target: 'Tentukan nilai sumbu simetri (-b / 2a)',
      options: ['-3', '3', '-6', '9'],
      correct: 0,
      exp: '-b / 2a = -6 / [2(1)] = -3'
    },
    {
      eq: '3x² + 2x - 5 = 0',
      target: 'Tentukan nilai koefisien a, b, c',
      options: ['a=3, b=2, c=-5', 'a=3, b=-2, c=5', 'a=-5, b=2, c=3', 'a=3, b=5, c=2'],
      correct: 0,
      exp: 'a=3 (koefisien x²), b=2 (koefisien x), c=-5 (konstanta)'
    }
  ];
  const [detektifIndex, setDetektifIndex] = useState(0);
  const [detektifSelected, setDetektifSelected] = useState<number | null>(null);
  const [detektifFeedback, setDetektifFeedback] = useState<boolean | null>(null);

  // GAME 4: TANTANGAN DISKRIMINAN state
  const diskriminanRounds = [
    {
      eq: 'x² - 8x + 16 = 0',
      dVal: 'D = (-8)² - 4(1)(16) = 64 - 64 = 0',
      options: ['Dua akar real kembar (D = 0)', 'Dua akar real berbeda (D > 0)', 'Tidak memiliki akar real (D < 0)'],
      correct: 0
    },
    {
      eq: '2x² - 3x + 5 = 0',
      dVal: 'D = (-3)² - 4(2)(5) = 9 - 40 = -31',
      options: ['Tidak memiliki akar real (D < 0)', 'Dua akar real berbeda (D > 0)', 'Dua akar real kembar (D = 0)'],
      correct: 0
    },
    {
      eq: 'x² + 5x - 6 = 0',
      dVal: 'D = (5)² - 4(1)(-6) = 25 + 24 = 49',
      options: ['Dua akar real berbeda (D > 0)', 'Dua akar real kembar (D = 0)', 'Tidak memiliki akar real (D < 0)'],
      correct: 0
    }
  ];
  const [diskriIndex, setDiskriIndex] = useState(0);
  const [diskriSelected, setDiskriSelected] = useState<number | null>(null);
  const [diskriFeedback, setDiskriFeedback] = useState<boolean | null>(null);

  // GAME 5: BATTLE MATEMATIKA state (Multi-level boss challenge)
  const battleQuests = [
    {
      level: 1,
      bossName: 'GolemMini Aljabar',
      eq: 'x² - 4 = 0, berapakah akar positifnya?',
      options: ['x = 2', 'x = 4', 'x = 1', 'x = 16'],
      correct: 0,
      exp: 'x² = 4 → x = 2'
    },
    {
      level: 2,
      bossName: 'Cyborg Faktorisasi',
      eq: 'x² - 10x + 25 = 0, berapakah akar kembarnya?',
      options: ['x = 5', 'x = -5', 'x = 10', 'x = 25'],
      correct: 0,
      exp: '(x - 5)² = 0 → x = 5'
    },
    {
      level: 3,
      bossName: 'Naga Diskriminan Kuadrat',
      eq: 'Berapakah D dari 4x² - 12x + 9 = 0?',
      options: ['0', '144', '72', '-144'],
      correct: 0,
      exp: 'D = (-12)² - 4(4)(9) = 144 - 144 = 0'
    }
  ];
  const [battleLevel, setBattleLevel] = useState(0);
  const [battleHp, setBattleHp] = useState(100);
  const [bossHp, setBossHp] = useState(100);
  const [battleSelected, setBattleSelected] = useState<number | null>(null);
  const [battleFeedback, setBattleFeedback] = useState<boolean | null>(null);

  // Helper to trigger confetti and score
  const triggerSuccess = (gameKey: GameMode, points: number) => {
    confetti({
      particleCount: 60,
      spread: 70,
      origin: { y: 0.6 }
    });
    const currentScore = studentProgress.challengesScore[gameKey] || 0;
    onUpdateScore(gameKey, currentScore + points);
  };

  const gamesNav = [
    { id: 'tebakAkar' as GameMode, name: 'Game 1: Tebak Akar', icon: <Target className="w-4 h-4" /> },
    { id: 'misiFaktorisasi' as GameMode, name: 'Game 2: Misi Faktorisasi', icon: <Sparkles className="w-4 h-4" /> },
    { id: 'detektifAbc' as GameMode, name: 'Game 3: Detektif ABC', icon: <Zap className="w-4 h-4" /> },
    { id: 'tantanganDiskriminan' as GameMode, name: 'Game 4: Diskriminan', icon: <Shield className="w-4 h-4" /> },
    { id: 'battleMatematika' as GameMode, name: 'Game 5: Battle Matematika', icon: <Swords className="w-4 h-4" /> },
  ];

  const totalPoints = Object.values(studentProgress.challengesScore).reduce((a, b) => a + b, 0);

  return (
    <div className="space-y-8 py-4 sm:py-6 max-w-5xl mx-auto">
      
      {/* Top Banner with Total Score */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-xl flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-xs font-bold text-purple-400">
            <Gamepad2 className="w-4 h-4" />
            <span>ARENA TANTANGAN MATEMATIKA GAMIFIKASI</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-heading font-extrabold text-white">
            5 Game Edukasi Persamaan Kuadrat
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 max-w-2xl">
            Selesaikan misi-misi matematika seru, kumpulkan koin skor, dan raih apresiasi langsung dari Pak Suwandi, Sari, dan Dika!
          </p>
        </div>

        {/* Total Score Badge */}
        <div className="bg-slate-950 border-2 border-amber-400/80 rounded-2xl p-4 flex items-center gap-4 shadow-xl shrink-0">
          <div className="w-12 h-12 rounded-xl bg-amber-400/20 text-amber-300 flex items-center justify-center font-bold">
            <Trophy className="w-6 h-6" />
          </div>
          <div>
            <span className="text-[10px] font-extrabold uppercase tracking-wider text-amber-300">
              Total Skor Kamu
            </span>
            <p className="text-2xl sm:text-3xl font-extrabold text-white font-mono">
              {totalPoints} <span className="text-xs font-bold text-amber-400">PTS</span>
            </p>
          </div>
        </div>
      </div>

      {/* Game Mode Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
        {gamesNav.map((g) => {
          const isActive = activeGame === g.id;
          const score = studentProgress.challengesScore[g.id] || 0;
          return (
            <button
              key={g.id}
              onClick={() => setActiveGame(g.id)}
              className={`px-4 py-2.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all flex items-center gap-2 shrink-0 border ${
                isActive
                  ? 'bg-purple-600 border-purple-400 text-white shadow-lg'
                  : 'bg-slate-900 border-slate-800 text-slate-300 hover:text-white hover:border-slate-700'
              }`}
            >
              {g.icon}
              <span>{g.name}</span>
              {score > 0 && (
                <span className="px-1.5 py-0.5 rounded-md bg-amber-400 text-slate-950 text-[10px] font-extrabold">
                  {score}
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* GAME 1: TEBAK AKAR */}
      {activeGame === 'tebakAkar' && (
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-6 shadow-xl">
          <div className="flex items-center justify-between border-b border-slate-800 pb-4">
            <div className="space-y-1">
              <span className="text-xs font-bold text-amber-400 uppercase tracking-wider">
                GAME 1 · TEBAK AKAR PERSAMAAN
              </span>
              <h3 className="font-heading font-bold text-white text-xl">
                Soal #{tebakIndex + 1} dari {tebakAkarQuestions.length}
              </h3>
            </div>
            <span className="text-xs text-slate-400 bg-slate-950 px-3 py-1.5 rounded-xl border border-slate-800">
              Hadiah: +25 Poin / Soal
            </span>
          </div>

          <div className="p-8 rounded-2xl bg-slate-950 border border-slate-800 text-center space-y-3">
            <span className="text-xs text-slate-400 uppercase font-semibold">
              Tentukan akar-akar dari persamaan:
            </span>
            <p className="text-3xl sm:text-4xl font-math font-extrabold text-amber-300">
              {tebakAkarQuestions[tebakIndex].eq}
            </p>
          </div>

          {/* Options */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {tebakAkarQuestions[tebakIndex].options.map((opt, idx) => {
              const isSelected = tebakSelected === idx;
              const isCorrect = idx === tebakAkarQuestions[tebakIndex].correct;
              let btnClass = 'bg-slate-800/80 border-slate-700 text-white hover:border-slate-500';

              if (tebakFeedback !== null) {
                if (isCorrect) btnClass = 'bg-emerald-950 border-emerald-500 text-emerald-200 font-bold';
                else if (isSelected && !isCorrect) btnClass = 'bg-rose-950 border-rose-500 text-rose-200';
              } else if (isSelected) {
                btnClass = 'bg-purple-900 border-amber-400 text-white font-bold';
              }

              return (
                <button
                  key={idx}
                  disabled={tebakFeedback !== null}
                  onClick={() => {
                    setTebakSelected(idx);
                    const isRight = idx === tebakAkarQuestions[tebakIndex].correct;
                    setTebakFeedback(isRight);
                    if (isRight) triggerSuccess('tebakAkar', 25);
                  }}
                  className={`p-4 rounded-xl border text-sm font-semibold transition-all flex items-center justify-between ${btnClass}`}
                >
                  <span>{opt}</span>
                  {tebakFeedback !== null && isCorrect && <CheckCircle2 className="w-5 h-5 text-emerald-400" />}
                  {tebakFeedback !== null && isSelected && !isCorrect && <XCircle className="w-5 h-5 text-rose-400" />}
                </button>
              );
            })}
          </div>

          {/* Feedback & Discussion */}
          {tebakFeedback !== null && (
            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-3">
              <div className="flex items-center gap-2">
                {tebakFeedback ? (
                  <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                ) : (
                  <XCircle className="w-5 h-5 text-rose-400" />
                )}
                <span className="font-bold text-white text-sm">
                  {tebakFeedback ? 'Jawaban Benar! Mantap!' : 'Kurang tepat, perhatikan pembahasannya:'}
                </span>
              </div>
              <p className="text-xs text-slate-300 font-mono">
                Pembahasan: {tebakAkarQuestions[tebakIndex].exp}
              </p>
              <div className="flex justify-end pt-2">
                <button
                  onClick={() => {
                    setTebakFeedback(null);
                    setTebakSelected(null);
                    setTebakIndex((prev) => (prev + 1) % tebakAkarQuestions.length);
                  }}
                  className="px-4 py-2 bg-amber-400 text-slate-950 font-bold rounded-xl text-xs hover:bg-amber-300"
                >
                  Lanjut ke Soal Berikutnya ➔
                </button>
              </div>
            </div>
          )}
        </div>
      )}

      {/* GAME 2: MISI FAKTORISASI */}
      {activeGame === 'misiFaktorisasi' && (
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-6 shadow-xl">
          <div className="flex items-center justify-between border-b border-slate-800 pb-4">
            <div className="space-y-1">
              <span className="text-xs font-bold text-cyan-400 uppercase tracking-wider">
                GAME 2 · MISI FAKTORISASI ALRABAR
              </span>
              <h3 className="font-heading font-bold text-white text-xl">
                Tantangan #{faktoIndex + 1} dari {faktorisasiQuests.length}
              </h3>
            </div>
            <span className="text-xs text-slate-400 bg-slate-950 px-3 py-1.5 rounded-xl border border-slate-800">
              Hadiah: +30 Poin
            </span>
          </div>

          <div className="p-6 rounded-2xl bg-slate-950 border border-slate-800 text-center space-y-2">
            <span className="text-xs text-slate-400">Pilih pasangan faktor yang benar untuk:</span>
            <p className="text-3xl font-math font-extrabold text-cyan-300">
              {faktorisasiQuests[faktoIndex].expression}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {faktorisasiQuests[faktoIndex].options.map((opt, idx) => {
              const isSelected = faktoSelected === idx;
              const isCorrect = idx === faktorisasiQuests[faktoIndex].correct;
              let btnClass = 'bg-slate-800/80 border-slate-700 text-white hover:border-slate-500';

              if (faktoFeedback !== null) {
                if (isCorrect) btnClass = 'bg-emerald-950 border-emerald-500 text-emerald-200 font-bold';
                else if (isSelected && !isCorrect) btnClass = 'bg-rose-950 border-rose-500 text-rose-200';
              }

              return (
                <button
                  key={idx}
                  disabled={faktoFeedback !== null}
                  onClick={() => {
                    setFaktoSelected(idx);
                    const isRight = idx === faktorisasiQuests[faktoIndex].correct;
                    setFaktoFeedback(isRight);
                    if (isRight) triggerSuccess('misiFaktorisasi', 30);
                  }}
                  className={`p-4 rounded-xl border text-sm font-semibold transition-all flex items-center justify-between ${btnClass}`}
                >
                  <span className="font-mono text-base">{opt}</span>
                  {faktoFeedback !== null && isCorrect && <CheckCircle2 className="w-5 h-5 text-emerald-400" />}
                </button>
              );
            })}
          </div>

          {faktoFeedback !== null && (
            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-3">
              <p className="text-xs text-slate-300 font-mono">
                Logika Faktorisasi: {faktorisasiQuests[faktoIndex].exp}
              </p>
              <div className="flex justify-end pt-2">
                <button
                  onClick={() => {
                    setFaktoFeedback(null);
                    setFaktoSelected(null);
                    setFaktoIndex((prev) => (prev + 1) % faktorisasiQuests.length);
                  }}
                  className="px-4 py-2 bg-cyan-400 text-slate-950 font-bold rounded-xl text-xs hover:bg-cyan-300"
                >
                  Lanjut Misi Berikutnya ➔
                </button>
              </div>
            </div>
          )}
        </div>
      )}

      {/* GAME 3: DETEKTIF RUMUS ABC */}
      {activeGame === 'detektifAbc' && (
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-6 shadow-xl">
          <div className="flex items-center justify-between border-b border-slate-800 pb-4">
            <div className="space-y-1">
              <span className="text-xs font-bold text-yellow-400 uppercase tracking-wider">
                GAME 3 · DETEKTIF FORMULA ABC
              </span>
              <h3 className="font-heading font-bold text-white text-xl">
                Kasus #{detektifIndex + 1}
              </h3>
            </div>
            <span className="text-xs text-slate-400 bg-slate-950 px-3 py-1.5 rounded-xl border border-slate-800">
              Hadiah: +35 Poin
            </span>
          </div>

          <div className="p-6 rounded-2xl bg-slate-950 border border-slate-800 text-center space-y-2">
            <span className="text-xs text-slate-400 font-semibold">Diberikan Persamaan:</span>
            <p className="text-3xl font-math font-extrabold text-yellow-300">
              {detektifCases[detektifIndex].eq}
            </p>
            <p className="text-sm font-bold text-white pt-2">
              Misi: {detektifCases[detektifIndex].target}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {detektifCases[detektifIndex].options.map((opt, idx) => {
              const isSelected = detektifSelected === idx;
              const isCorrect = idx === detektifCases[detektifIndex].correct;
              let btnClass = 'bg-slate-800/80 border-slate-700 text-white hover:border-slate-500';

              if (detektifFeedback !== null) {
                if (isCorrect) btnClass = 'bg-emerald-950 border-emerald-500 text-emerald-200 font-bold';
                else if (isSelected && !isCorrect) btnClass = 'bg-rose-950 border-rose-500 text-rose-200';
              }

              return (
                <button
                  key={idx}
                  disabled={detektifFeedback !== null}
                  onClick={() => {
                    setDetektifSelected(idx);
                    const isRight = idx === detektifCases[detektifIndex].correct;
                    setDetektifFeedback(isRight);
                    if (isRight) triggerSuccess('detektifAbc', 35);
                  }}
                  className={`p-4 rounded-xl border text-sm font-semibold transition-all flex items-center justify-between ${btnClass}`}
                >
                  <span className="font-mono text-base">{opt}</span>
                  {detektifFeedback !== null && isCorrect && <CheckCircle2 className="w-5 h-5 text-emerald-400" />}
                </button>
              );
            })}
          </div>

          {detektifFeedback !== null && (
            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-3">
              <p className="text-xs text-slate-300 font-mono">
                Penjelasan Detektif: {detektifCases[detektifIndex].exp}
              </p>
              <div className="flex justify-end pt-2">
                <button
                  onClick={() => {
                    setDetektifFeedback(null);
                    setDetektifSelected(null);
                    setDetektifIndex((prev) => (prev + 1) % detektifCases.length);
                  }}
                  className="px-4 py-2 bg-yellow-400 text-slate-950 font-bold rounded-xl text-xs hover:bg-yellow-300"
                >
                  Kasus Selanjutnya ➔
                </button>
              </div>
            </div>
          )}
        </div>
      )}

      {/* GAME 4: TANTANGAN DISKRIMINAN */}
      {activeGame === 'tantanganDiskriminan' && (
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-6 shadow-xl">
          <div className="flex items-center justify-between border-b border-slate-800 pb-4">
            <div className="space-y-1">
              <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider">
                GAME 4 · TANTANGAN DISKRIMINAN
              </span>
              <h3 className="font-heading font-bold text-white text-xl">
                Ronde #{diskriIndex + 1}
              </h3>
            </div>
            <span className="text-xs text-slate-400 bg-slate-950 px-3 py-1.5 rounded-xl border border-slate-800">
              Hadiah: +30 Poin
            </span>
          </div>

          <div className="p-6 rounded-2xl bg-slate-950 border border-slate-800 text-center space-y-2">
            <span className="text-xs text-slate-400">Analisis Karakter Akar Untuk:</span>
            <p className="text-3xl font-math font-extrabold text-emerald-400">
              {diskriminanRounds[diskriIndex].eq}
            </p>
          </div>

          <div className="space-y-3">
            {diskriminanRounds[diskriIndex].options.map((opt, idx) => {
              const isSelected = diskriSelected === idx;
              const isCorrect = idx === diskriminanRounds[diskriIndex].correct;
              let btnClass = 'bg-slate-800/80 border-slate-700 text-white hover:border-slate-500';

              if (diskriFeedback !== null) {
                if (isCorrect) btnClass = 'bg-emerald-950 border-emerald-500 text-emerald-200 font-bold';
                else if (isSelected && !isCorrect) btnClass = 'bg-rose-950 border-rose-500 text-rose-200';
              }

              return (
                <button
                  key={idx}
                  disabled={diskriFeedback !== null}
                  onClick={() => {
                    setDiskriSelected(idx);
                    const isRight = idx === diskriminanRounds[diskriIndex].correct;
                    setDiskriFeedback(isRight);
                    if (isRight) triggerSuccess('tantanganDiskriminan', 30);
                  }}
                  className={`w-full p-4 rounded-xl border text-sm font-semibold transition-all flex items-center justify-between text-left ${btnClass}`}
                >
                  <span>{opt}</span>
                  {diskriFeedback !== null && isCorrect && <CheckCircle2 className="w-5 h-5 text-emerald-400" />}
                </button>
              );
            })}
          </div>

          {diskriFeedback !== null && (
            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-3">
              <p className="text-xs text-slate-300 font-mono">
                Hasil Hitungan Diskriminan: {diskriminanRounds[diskriIndex].dVal}
              </p>
              <div className="flex justify-end pt-2">
                <button
                  onClick={() => {
                    setDiskriFeedback(null);
                    setDiskriSelected(null);
                    setDiskriIndex((prev) => (prev + 1) % diskriminanRounds.length);
                  }}
                  className="px-4 py-2 bg-emerald-400 text-slate-950 font-bold rounded-xl text-xs hover:bg-emerald-300"
                >
                  Ronde Berikutnya ➔
                </button>
              </div>
            </div>
          )}
        </div>
      )}

      {/* GAME 5: BATTLE MATEMATIKA */}
      {activeGame === 'battleMatematika' && (
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-6 shadow-xl">
          <div className="flex items-center justify-between border-b border-slate-800 pb-4">
            <div className="space-y-1">
              <span className="text-xs font-bold text-rose-400 uppercase tracking-wider">
                GAME 5 · BATTLE MATEMATIKA BOS KUADRAT
              </span>
              <h3 className="font-heading font-bold text-white text-xl">
                Level {battleQuests[battleLevel].level}: Lawan {battleQuests[battleLevel].bossName}
              </h3>
            </div>
            <span className="text-xs text-slate-400 bg-slate-950 px-3 py-1.5 rounded-xl border border-slate-800">
              Hadiah: +50 Poin / Boss
            </span>
          </div>

          {/* Boss HP bar & Player HP bar */}
          <div className="grid grid-cols-2 gap-4">
            <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 space-y-1.5">
              <div className="flex justify-between text-xs font-bold">
                <span className="text-blue-300">Murid SMKN 4 Soppeng</span>
                <span className="text-emerald-400">{battleHp}% HP</span>
              </div>
              <div className="w-full bg-slate-800 h-2.5 rounded-full overflow-hidden">
                <div className="bg-emerald-500 h-full transition-all" style={{ width: `${battleHp}%` }} />
              </div>
            </div>

            <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 space-y-1.5">
              <div className="flex justify-between text-xs font-bold">
                <span className="text-rose-400">{battleQuests[battleLevel].bossName}</span>
                <span className="text-rose-400">{bossHp}% HP</span>
              </div>
              <div className="w-full bg-slate-800 h-2.5 rounded-full overflow-hidden">
                <div className="bg-rose-500 h-full transition-all" style={{ width: `${bossHp}%` }} />
              </div>
            </div>
          </div>

          <div className="p-6 rounded-2xl bg-slate-950 border border-slate-800 text-center space-y-2">
            <span className="text-xs text-slate-400">Serangan Kuadratik:</span>
            <p className="text-2xl font-bold text-white">
              {battleQuests[battleLevel].eq}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {battleQuests[battleLevel].options.map((opt, idx) => {
              const isSelected = battleSelected === idx;
              const isCorrect = idx === battleQuests[battleLevel].correct;
              let btnClass = 'bg-slate-800/80 border-slate-700 text-white hover:border-slate-500';

              if (battleFeedback !== null) {
                if (isCorrect) btnClass = 'bg-emerald-950 border-emerald-500 text-emerald-200 font-bold';
                else if (isSelected && !isCorrect) btnClass = 'bg-rose-950 border-rose-500 text-rose-200';
              }

              return (
                <button
                  key={idx}
                  disabled={battleFeedback !== null}
                  onClick={() => {
                    setBattleSelected(idx);
                    const isRight = idx === battleQuests[battleLevel].correct;
                    setBattleFeedback(isRight);
                    if (isRight) {
                      setBossHp(0);
                      triggerSuccess('battleMatematika', 50);
                    } else {
                      setBattleHp((prev) => Math.max(20, prev - 30));
                    }
                  }}
                  className={`p-4 rounded-xl border text-sm font-semibold transition-all flex items-center justify-between ${btnClass}`}
                >
                  <span className="font-mono text-base">{opt}</span>
                  {battleFeedback !== null && isCorrect && <CheckCircle2 className="w-5 h-5 text-emerald-400" />}
                </button>
              );
            })}
          </div>

          {battleFeedback !== null && (
            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-3">
              <p className="text-xs text-slate-300 font-mono">
                {battleFeedback
                  ? `⚔️ Kritis! Seranganmu berhasil mengalahkan ${battleQuests[battleLevel].bossName}!`
                  : '🛡️ Serangan meleset! Pelajari: ' + battleQuests[battleLevel].exp}
              </p>
              <div className="flex justify-end pt-2">
                <button
                  onClick={() => {
                    setBattleFeedback(null);
                    setBattleSelected(null);
                    setBossHp(100);
                    setBattleHp(100);
                    setBattleLevel((prev) => (prev + 1) % battleQuests.length);
                  }}
                  className="px-4 py-2 bg-rose-500 text-white font-bold rounded-xl text-xs hover:bg-rose-400 shadow"
                >
                  Level Battle Berikutnya ➔
                </button>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Motivational Bottom Character Dialogue */}
      <div className="bg-gradient-to-r from-blue-950 via-slate-900 to-indigo-950 border border-slate-800 rounded-2xl p-5 flex items-center gap-4">
        <div className="w-14 h-14 rounded-2xl overflow-hidden border-2 border-amber-400 shrink-0 bg-slate-950">
          <img
            src="/src/assets/images/teacher_suwandi_avatar_1794015829391.jpg"
            alt="Pak Suwandi"
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
        </div>
        <div className="space-y-1">
          <p className="text-xs font-bold text-amber-300">Bapak Suwandi, S.Pd. berpesan:</p>
          <p className="text-xs sm:text-sm text-slate-200 italic">
            &ldquo;Luar biasa murid-muridku! Semakin sering kamu berlatih, intuisi matematikamu akan semakin tajam. Siapkan diri untuk Evaluasi Akhir 10 Soal ya!&rdquo;
          </p>
        </div>
        <button
          onClick={() => onNavigate('evaluasi')}
          className="ml-auto hidden sm:flex px-4 py-2 bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold rounded-xl text-xs items-center gap-1.5 shadow shrink-0"
        >
          <span>Ke Evaluasi</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>

    </div>
  );
};
