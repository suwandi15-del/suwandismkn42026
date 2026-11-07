import React, { useState } from 'react';
import { NavPage, QuizQuestion, StudentEvaluationResult } from '../types';
import { 
  Award, 
  CheckCircle2, 
  XCircle, 
  RotateCcw, 
  ArrowRight, 
  User, 
  Clock, 
  HelpCircle, 
  BookOpen, 
  Sparkles,
  ChevronLeft,
  ChevronRight,
  ShieldCheck,
  Send
} from 'lucide-react';
import confetti from 'canvas-confetti';

interface FinalEvaluationProps {
  questions: QuizQuestion[];
  onSaveResult: (result: StudentEvaluationResult) => Promise<void>;
  onNavigate: (page: NavPage) => void;
}

export const FinalEvaluation: React.FC<FinalEvaluationProps> = ({
  questions,
  onSaveResult,
  onNavigate
}) => {
  // Student identity step before or during quiz
  const [studentName, setStudentName] = useState('');
  const [studentClass, setStudentClass] = useState('X TKJ 1');
  const [isStarted, setIsStarted] = useState(false);

  // Active quiz state
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [evaluationResult, setEvaluationResult] = useState<StudentEvaluationResult | null>(null);

  const totalQuestions = questions.length;
  const currentQuestion = questions[currentIndex];

  const handleStartQuiz = (e: React.FormEvent) => {
    e.preventDefault();
    if (!studentName.trim()) return;
    setIsStarted(true);
  };

  const handleSelectOption = (questionId: string, optionIndex: number) => {
    if (isSubmitted) return;
    setAnswers((prev) => ({ ...prev, [questionId]: optionIndex }));
  };

  const handleSubmitEvaluation = async () => {
    // Calculate score
    let correctCount = 0;
    const answerDetails = questions.map((q) => {
      const selected = answers[q.id];
      const isCorrect = selected === q.correctIndex;
      if (isCorrect) correctCount++;
      return {
        questionId: q.id,
        selectedOption: selected ?? -1,
        isCorrect
      };
    });

    const calculatedScore = Math.round((correctCount / totalQuestions) * 100);

    const result: StudentEvaluationResult = {
      id: `eval_${Date.now()}`,
      studentName: studentName.trim(),
      studentClass: studentClass.trim(),
      score: calculatedScore,
      totalQuestions,
      answers: answerDetails,
      completedAt: new Date().toISOString()
    };

    setEvaluationResult(result);
    setIsSubmitted(true);
    await onSaveResult(result);

    if (calculatedScore >= 75) {
      confetti({
        particleCount: 100,
        spread: 80,
        origin: { y: 0.5 }
      });
    }
  };

  const handleResetQuiz = () => {
    setIsSubmitted(false);
    setAnswers({});
    setCurrentIndex(0);
    setEvaluationResult(null);
  };

  const answeredCount = Object.keys(answers).length;
  const progressPercent = Math.round((answeredCount / totalQuestions) * 100);

  // 1. Identification Form Before Quiz
  if (!isStarted) {
    return (
      <div className="py-8 max-w-xl mx-auto space-y-6">
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6">
          <div className="text-center space-y-2">
            <div className="w-16 h-16 rounded-2xl bg-amber-400/20 text-amber-400 flex items-center justify-center mx-auto shadow-inner">
              <Award className="w-8 h-8" />
            </div>
            <span className="text-xs font-bold text-amber-400 uppercase tracking-wider">
              UJI KOMPETENSI MATEMATIKA SMK
            </span>
            <h2 className="text-2xl sm:text-3xl font-heading font-extrabold text-white">
              Evaluasi Akhir Persamaan Kuadrat
            </h2>
            <p className="text-xs sm:text-sm text-slate-300">
              Evaluasi ini terdiri dari 10 butir soal pilihan ganda (5 opsi jawaban) untuk mengukur penguasaan materi dan daya analisis kejuruanmu.
            </p>
          </div>

          <form onSubmit={handleStartQuiz} className="space-y-4 pt-2">
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-200 flex items-center gap-1.5">
                <User className="w-4 h-4 text-amber-400" />
                <span>Nama Lengkap Murid</span>
              </label>
              <input
                type="text"
                required
                placeholder="Contoh: Muhammad Fadil"
                value={studentName}
                onChange={(e) => setStudentName(e.target.value)}
                className="w-full bg-slate-950 border border-slate-700 rounded-xl px-4 py-3 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-amber-400"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-200">
                Kelas / Jurusan (SMKN 4 Soppeng)
              </label>
              <select
                value={studentClass}
                onChange={(e) => setStudentClass(e.target.value)}
                className="w-full bg-slate-950 border border-slate-700 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-amber-400"
              >
                <option value="X TKJ 1">X TKJ 1 (Teknik Komputer & Jaringan)</option>
                <option value="X TKJ 2">X TKJ 2 (Teknik Komputer & Jaringan)</option>
                <option value="X TKR 1">X TKR 1 (Teknik Kendaraan Ringan)</option>
                <option value="X TKR 2">X TKR 2 (Teknik Kendaraan Ringan)</option>
                <option value="X TITL">X TITL (Teknik Instalasi Tenaga Listrik)</option>
                <option value="X DPIB">X DPIB (Desain Pemodelan & Info Bangunan)</option>
                <option value="X DKV">X DKV (Desain Komunikasi Visual)</option>
                <option value="X TBSM">X TBSM (Teknik Bisnis Sepeda Motor)</option>
              </select>
            </div>

            <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 text-xs text-slate-300 space-y-1">
              <p className="font-bold text-amber-300">Ketentuan Pengerjaan:</p>
              <p>• Terdapat 10 soal pilihan ganda dengan 5 pilihan jawaban (A, B, C, D, E).</p>
              <p>• Kriteria Ketercapaian Tujuan Pembelajaran (KKTP) adalah 75.</p>
              <p>• Pembahasan lengkap akan muncul setelah kamu menyelesaikan seluruh soal.</p>
            </div>

            <button
              type="submit"
              className="w-full py-3.5 bg-gradient-to-r from-amber-500 to-yellow-400 hover:from-amber-400 hover:to-yellow-300 text-slate-950 font-bold rounded-xl text-sm transition-all shadow-lg flex items-center justify-center gap-2"
            >
              <span>Mulai Mengerjakan Sekarang</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>
        </div>
      </div>
    );
  }

  // 2. Quiz Result Mode (After Completion)
  if (isSubmitted && evaluationResult) {
    const isPassed = evaluationResult.score >= 75;
    return (
      <div className="py-6 max-w-4xl mx-auto space-y-8">
        {/* Certificate Card */}
        <div
          className={`border-2 rounded-3xl p-6 sm:p-8 shadow-2xl relative overflow-hidden ${
            isPassed
              ? 'bg-gradient-to-b from-emerald-950/70 to-slate-950 border-emerald-500/60'
              : 'bg-gradient-to-b from-amber-950/70 to-slate-950 border-amber-500/60'
          }`}
        >
          <div className="text-center space-y-3">
            <span className="text-xs font-bold uppercase tracking-widest text-slate-400">
              HASIL EVALUASI AKHIR · SMKN 4 SOPPENG
            </span>
            <h2 className="text-2xl sm:text-3xl font-heading font-extrabold text-white">
              {isPassed ? '🎉 Selamat! Kamu Dinyatakan TUNTAS!' : '📚 Tetap Semangat! Teruslah Berlatih!'}
            </h2>
            <p className="text-xs sm:text-sm text-slate-300">
              Peserta: <strong className="text-white">{evaluationResult.studentName}</strong> ({evaluationResult.studentClass})
            </p>

            <div className="py-4">
              <div className="inline-block p-6 rounded-3xl bg-slate-900/90 border border-slate-800 shadow-xl">
                <span className="text-xs text-slate-400 uppercase font-semibold">Skor Akhir</span>
                <p className="text-5xl sm:text-6xl font-extrabold text-amber-300 font-mono">
                  {evaluationResult.score}
                </p>
                <span className="text-xs font-bold text-slate-400">
                  KKTP Minimal: 75 / 100
                </span>
              </div>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
              <button
                onClick={handleResetQuiz}
                className="px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold text-xs flex items-center gap-2 border border-slate-700"
              >
                <RotateCcw className="w-4 h-4" />
                <span>Ulangi Evaluasi</span>
              </button>
              <button
                onClick={() => onNavigate('refleksi')}
                className="px-6 py-2.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold text-xs flex items-center gap-2 shadow"
              >
                <span>Lanjut Isi Refleksi Belajar</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Detailed Question Review & Explanations */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-heading font-bold text-white text-lg flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-amber-400" />
              <span>Pembahasan Lengkap 10 Soal</span>
            </h3>
            <span className="text-xs text-slate-400">
              Periksa kunci dan langkah penyelesaian untuk penguatan konsep
            </span>
          </div>

          <div className="space-y-4">
            {questions.map((q, idx) => {
              const studentAnswer = answers[q.id];
              const isCorrect = studentAnswer === q.correctIndex;
              return (
                <div
                  key={q.id}
                  className={`bg-slate-900 border rounded-2xl p-5 space-y-4 shadow ${
                    isCorrect ? 'border-emerald-500/40' : 'border-rose-500/40'
                  }`}
                >
                  <div className="flex items-center justify-between text-xs">
                    <div className="flex items-center gap-2">
                      <span className="w-6 h-6 rounded-lg bg-slate-800 font-bold flex items-center justify-center text-white">
                        {idx + 1}
                      </span>
                      <span className="font-bold text-slate-300">{q.topic}</span>
                      <span className="text-[10px] text-amber-400 bg-amber-400/10 px-2 py-0.5 rounded">
                        {q.difficulty}
                      </span>
                    </div>

                    <div className="flex items-center gap-1.5 font-bold">
                      {isCorrect ? (
                        <span className="text-emerald-400 flex items-center gap-1">
                          <CheckCircle2 className="w-4 h-4" /> Benar (+10)
                        </span>
                      ) : (
                        <span className="text-rose-400 flex items-center gap-1">
                          <XCircle className="w-4 h-4" /> Salah
                        </span>
                      )}
                    </div>
                  </div>

                  <p className="text-sm font-semibold text-white">
                    {q.question}
                  </p>

                  {/* 5 Options Display */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                    {q.options.map((opt, optIdx) => {
                      const isOptionCorrect = optIdx === q.correctIndex;
                      const isOptionChosen = optIdx === studentAnswer;
                      let itemClass = 'bg-slate-950 border-slate-800 text-slate-300';

                      if (isOptionCorrect) {
                        itemClass = 'bg-emerald-950/80 border-emerald-500 text-emerald-200 font-bold';
                      } else if (isOptionChosen && !isOptionCorrect) {
                        itemClass = 'bg-rose-950/80 border-rose-500 text-rose-200 line-through';
                      }

                      return (
                        <div
                          key={optIdx}
                          className={`p-2.5 rounded-xl border flex items-center gap-2.5 ${itemClass}`}
                        >
                          <span className="w-5 h-5 rounded-md bg-slate-800 text-white flex items-center justify-center font-bold text-[10px] shrink-0">
                            {String.fromCharCode(65 + optIdx)}
                          </span>
                          <span className="leading-snug">{opt}</span>
                        </div>
                      );
                    })}
                  </div>

                  {/* Explanation Block */}
                  <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-400">
                      Pembahasan & Langkah Logis:
                    </span>
                    <p className="text-xs text-slate-300 leading-relaxed font-mono">
                      {q.explanation}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    );
  }

  // 3. Quiz In-Progress Mode
  return (
    <div className="py-6 max-w-4xl mx-auto space-y-6">
      
      {/* Quiz Top Toolbar */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 shadow-lg flex flex-wrap items-center justify-between gap-4">
        <div>
          <span className="text-xs font-bold text-amber-400 uppercase tracking-wider">
            EVALUASI AKHIR · SMKN 4 SOPPENG
          </span>
          <p className="text-sm font-bold text-white">
            Peserta: {studentName} ({studentClass})
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="text-right text-xs">
            <span className="text-slate-400">Terjawab: </span>
            <span className="font-bold text-amber-400 font-mono">{answeredCount} / {totalQuestions}</span>
          </div>

          <button
            onClick={handleSubmitEvaluation}
            disabled={answeredCount === 0}
            className="px-4 py-2 bg-emerald-500 hover:bg-emerald-400 disabled:opacity-40 text-white font-bold rounded-xl text-xs flex items-center gap-1.5 shadow"
          >
            <Send className="w-4 h-4" />
            <span>Kirim Jawaban</span>
          </button>
        </div>
      </div>

      {/* Question Number Palette (1 to 10) */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-3 flex items-center justify-between gap-2 overflow-x-auto scrollbar-none">
        {questions.map((q, idx) => {
          const isAnswered = answers[q.id] !== undefined;
          const isCurrent = idx === currentIndex;
          return (
            <button
              key={q.id}
              onClick={() => setCurrentIndex(idx)}
              className={`w-9 h-9 rounded-xl font-bold text-xs shrink-0 transition-all flex items-center justify-center border ${
                isCurrent
                  ? 'bg-amber-400 text-slate-950 border-amber-400 ring-2 ring-amber-400/30'
                  : isAnswered
                  ? 'bg-emerald-950 text-emerald-300 border-emerald-600'
                  : 'bg-slate-800 text-slate-300 border-slate-700 hover:border-slate-500'
              }`}
            >
              {idx + 1}
            </button>
          );
        })}
      </div>

      {/* Main Question Card */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-6 shadow-xl">
        <div className="flex items-center justify-between border-b border-slate-800 pb-4">
          <div className="flex items-center gap-2 text-xs">
            <span className="px-2.5 py-1 rounded-lg bg-amber-400 text-slate-950 font-extrabold">
              Soal {currentIndex + 1}
            </span>
            <span className="text-slate-300 font-semibold">{currentQuestion.topic}</span>
          </div>

          <span className="text-[11px] font-bold text-cyan-400 bg-cyan-950/60 px-2.5 py-1 rounded-lg border border-cyan-800">
            Tingkat: {currentQuestion.difficulty}
          </span>
        </div>

        <p className="text-base sm:text-lg font-semibold text-white leading-relaxed">
          {currentQuestion.question}
        </p>

        {currentQuestion.equation && (
          <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 text-center font-math font-bold text-amber-300 text-lg sm:text-xl">
            {currentQuestion.equation}
          </div>
        )}

        {/* 5 Choices Options (A, B, C, D, E) */}
        <div className="space-y-3 pt-2">
          {currentQuestion.options.map((opt, optIdx) => {
            const isSelected = answers[currentQuestion.id] === optIdx;
            return (
              <button
                key={optIdx}
                onClick={() => handleSelectOption(currentQuestion.id, optIdx)}
                className={`w-full p-4 rounded-2xl border text-left text-xs sm:text-sm font-medium transition-all flex items-center gap-3.5 ${
                  isSelected
                    ? 'bg-blue-600/30 border-amber-400 text-white shadow-md'
                    : 'bg-slate-950 border-slate-800 text-slate-200 hover:border-slate-700'
                }`}
              >
                <span
                  className={`w-7 h-7 rounded-xl flex items-center justify-center font-bold text-xs shrink-0 ${
                    isSelected ? 'bg-amber-400 text-slate-950' : 'bg-slate-800 text-slate-300'
                  }`}
                >
                  {String.fromCharCode(65 + optIdx)}
                </span>
                <span className="leading-relaxed">{opt}</span>
              </button>
            );
          })}
        </div>

        {/* Prev / Next Question Nav */}
        <div className="flex items-center justify-between pt-4 border-t border-slate-800">
          <button
            onClick={() => setCurrentIndex((prev) => Math.max(0, prev - 1))}
            disabled={currentIndex === 0}
            className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 disabled:opacity-30 text-white font-semibold text-xs flex items-center gap-1.5 transition-colors"
          >
            <ChevronLeft className="w-4 h-4" />
            <span>Sebelumnya</span>
          </button>

          {currentIndex < totalQuestions - 1 ? (
            <button
              onClick={() => setCurrentIndex((prev) => Math.min(totalQuestions - 1, prev + 1))}
              className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs flex items-center gap-1.5 transition-colors shadow"
            >
              <span>Berikutnya</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          ) : (
            <button
              onClick={handleSubmitEvaluation}
              className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-400 hover:from-emerald-400 hover:to-teal-300 text-slate-950 font-extrabold text-xs flex items-center gap-1.5 transition-colors shadow-lg"
            >
              <Send className="w-4 h-4" />
              <span>Selesai & Kirim</span>
            </button>
          )}
        </div>
      </div>

    </div>
  );
};
