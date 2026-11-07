import React, { useState } from 'react';
import { NavPage, ReflectionSubmission } from '../types';
import { 
  PenTool, 
  CheckCircle2, 
  Send, 
  Sparkles, 
  Heart, 
  Smile, 
  Meh, 
  Frown, 
  HelpCircle,
  ArrowRight,
  BookOpen
} from 'lucide-react';
import confetti from 'canvas-confetti';

interface LearningReflectionProps {
  onSaveReflection: (reflection: ReflectionSubmission) => Promise<void>;
  onNavigate: (page: NavPage) => void;
}

export const LearningReflection: React.FC<LearningReflectionProps> = ({
  onSaveReflection,
  onNavigate
}) => {
  const [studentName, setStudentName] = useState('');
  const [studentClass, setStudentClass] = useState('X TKJ 1');
  const [understandingLevel, setUnderstandingLevel] = useState<ReflectionSubmission['understandingLevel']>('Memahami');

  const [pengetahuanBaru, setPengetahuanBaru] = useState('');
  const [bagianPalingMenarik, setBagianPalingMenarik] = useState('Komik digital dan permainan tantangan diskriminan');
  const [metodePalingMudah, setMetodePalingMudah] = useState('Metode Faktorisasi (Aljabar Sederhana)');
  const [kesulitan, setKesulitan] = useState('');
  const [rencanaTindakLanjut, setRencanaTindakLanjut] = useState('');

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!studentName.trim() || !pengetahuanBaru.trim()) return;

    setIsSubmitting(true);
    try {
      const submission: ReflectionSubmission = {
        id: `ref_${Date.now()}`,
        studentName: studentName.trim(),
        studentClass: studentClass.trim(),
        understandingLevel,
        answers: {
          pengetahuanBaru,
          bagianPalingMenarik,
          metodePalingMudah,
          kesulitan: kesulitan.trim() || 'Tidak ada kesulitan berarti, penjelasan sangat jelas.',
          rencanaTindakLanjut: rencanaTindakLanjut.trim() || 'Berlatih soal persamaan kuadrat terapan kejuruan secara konsisten.'
        },
        submittedAt: new Date().toISOString()
      };

      await onSaveReflection(submission);
      setIsSubmitted(true);
      confetti({
        particleCount: 70,
        spread: 60,
        origin: { y: 0.6 }
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const understandingOptions: { level: ReflectionSubmission['understandingLevel']; icon: React.ReactNode; color: string; desc: string }[] = [
    {
      level: 'Sangat Memahami',
      icon: <Smile className="w-5 h-5 text-emerald-400" />,
      color: 'border-emerald-500 bg-emerald-950/40 text-emerald-300',
      desc: 'Dapat menjelaskan konsep dan menyelesaikan segala bentuk soal dengan lancar.'
    },
    {
      level: 'Memahami',
      icon: <Smile className="w-5 h-5 text-blue-400" />,
      color: 'border-blue-500 bg-blue-950/40 text-blue-300',
      desc: 'Mampu menentukan akar dengan metode utama dan memahami makna diskriminan.'
    },
    {
      level: 'Cukup Memahami',
      icon: <Meh className="w-5 h-5 text-amber-400" />,
      color: 'border-amber-500 bg-amber-950/40 text-amber-300',
      desc: 'Memahami konsep dasar, namun kadang masih ragu dalam perhitungan aljabar.'
    },
    {
      level: 'Masih Memerlukan Bantuan',
      icon: <Frown className="w-5 h-5 text-rose-400" />,
      color: 'border-rose-500 bg-rose-950/40 text-rose-300',
      desc: 'Perlu bimbingan tambahan dari guru dan diskusi kelompok bersama teman.'
    }
  ];

  if (isSubmitted) {
    return (
      <div className="py-8 max-w-2xl mx-auto space-y-6">
        <div className="bg-slate-900 border border-emerald-500/50 rounded-3xl p-8 text-center space-y-5 shadow-2xl">
          <div className="w-16 h-16 rounded-3xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto border border-emerald-500/40">
            <CheckCircle2 className="w-8 h-8" />
          </div>

          <span className="text-xs font-bold uppercase tracking-wider text-emerald-400">
            TERIMA KASIH ATAS REFLEKSIMU!
          </span>

          <h2 className="text-2xl sm:text-3xl font-heading font-extrabold text-white">
            Refleksi Berhasil Tersimpan di Basis Data
          </h2>

          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed max-w-lg mx-auto">
            Catatan pembelajaranmu telah tersimpan rapi dan dapat ditinjau oleh <strong>Pak Suwandi, S.Pd.</strong> di Panel Guru untuk evaluasi proses pembelajaran yang lebih baik lagi.
          </p>

          <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 text-left text-xs space-y-2">
            <p className="font-bold text-amber-400">Ringkasan Refleksi:</p>
            <p><span className="text-slate-400">Nama:</span> <strong className="text-white">{studentName}</strong> ({studentClass})</p>
            <p><span className="text-slate-400">Tingkat Pemahaman:</span> <strong className="text-emerald-400">{understandingLevel}</strong></p>
            <p><span className="text-slate-400">Metode Favorit:</span> <span className="text-slate-200">{metodePalingMudah}</span></p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-3 pt-3">
            <button
              onClick={() => onNavigate('beranda')}
              className="px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs"
            >
              Kembali ke Beranda
            </button>
            <button
              onClick={() => onNavigate('komik')}
              className="px-5 py-2.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold text-xs flex items-center gap-1.5 shadow"
            >
              <BookOpen className="w-4 h-4" />
              <span>Baca Kembali Komik</span>
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="py-6 max-w-3xl mx-auto space-y-6">
      
      {/* Header Banner */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-xl space-y-2">
        <div className="flex items-center gap-2 text-xs font-bold text-rose-400">
          <PenTool className="w-4 h-4" />
          <span>LEMBAR REFLEKSI DIRI PESERTA DIDIK</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-heading font-extrabold text-white">
          Refleksi Belajar Matematika Adventure
        </h2>
        <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
          Refleksi membantumu menyadari perkembangan pemahaman, mengenali kekuatan, serta merencanakan langkah peningkatan diri dalam matematika.
        </p>
      </div>

      {/* Main Reflection Form */}
      <form onSubmit={handleSubmit} className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-xl space-y-6">
        
        {/* Student Identity */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pb-4 border-b border-slate-800">
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-200">
              Nama Lengkap Murid *
            </label>
            <input
              type="text"
              required
              placeholder="Ketik nama lengkapmu"
              value={studentName}
              onChange={(e) => setStudentName(e.target.value)}
              className="w-full bg-slate-950 border border-slate-700 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-amber-400"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-200">
              Kelas (SMKN 4 Soppeng) *
            </label>
            <select
              value={studentClass}
              onChange={(e) => setStudentClass(e.target.value)}
              className="w-full bg-slate-950 border border-slate-700 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-amber-400"
            >
              <option value="X TKJ 1">X TKJ 1</option>
              <option value="X TKJ 2">X TKJ 2</option>
              <option value="X TKR 1">X TKR 1</option>
              <option value="X TKR 2">X TKR 2</option>
              <option value="X TITL">X TITL</option>
              <option value="X DPIB">X DPIB</option>
              <option value="X DKV">X DKV</option>
              <option value="X TBSM">X TBSM</option>
            </select>
          </div>
        </div>

        {/* 4-Level Understanding Scale */}
        <div className="space-y-3">
          <label className="text-xs font-extrabold uppercase tracking-wider text-amber-400 block">
            Skala Pemahaman Materi Persamaan Kuadrat
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {understandingOptions.map((opt) => {
              const isSelected = understandingLevel === opt.level;
              return (
                <button
                  type="button"
                  key={opt.level}
                  onClick={() => setUnderstandingLevel(opt.level)}
                  className={`p-4 rounded-2xl border text-left transition-all flex items-start gap-3 ${
                    isSelected
                      ? `${opt.color} ring-2 ring-amber-400/30 font-bold`
                      : 'bg-slate-950 border-slate-800 text-slate-300 hover:border-slate-700'
                  }`}
                >
                  <div className="p-1.5 rounded-xl bg-slate-900 shrink-0">
                    {opt.icon}
                  </div>
                  <div className="space-y-0.5">
                    <h4 className="text-xs sm:text-sm font-bold text-white">{opt.level}</h4>
                    <p className="text-[11px] text-slate-400 leading-tight">{opt.desc}</p>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* 5 Prompts */}
        <div className="space-y-5 pt-2">
          
          {/* Question 1 */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-200 flex items-center gap-1.5">
              <span className="w-5 h-5 rounded-md bg-amber-400/20 text-amber-400 flex items-center justify-center font-bold text-xs">
                1
              </span>
              <span>Apa pengetahuan baru yang saya peroleh dari pembelajaran ini? *</span>
            </label>
            <textarea
              required
              rows={3}
              placeholder="Contoh: Saya baru memahami bahwa mencari akar persamaan kuadrat sama dengan menemukan titik potong parabola pada sumbu-X..."
              value={pengetahuanBaru}
              onChange={(e) => setPengetahuanBaru(e.target.value)}
              className="w-full bg-slate-950 border border-slate-700 rounded-xl p-3 text-xs sm:text-sm text-slate-200 focus:outline-none focus:border-amber-400"
            />
          </div>

          {/* Question 2 */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-200 flex items-center gap-1.5">
              <span className="w-5 h-5 rounded-md bg-amber-400/20 text-amber-400 flex items-center justify-center font-bold text-xs">
                2
              </span>
              <span>Bagian pembelajaran apa yang paling menarik bagi saya?</span>
            </label>
            <input
              type="text"
              value={bagianPalingMenarik}
              onChange={(e) => setBagianPalingMenarik(e.target.value)}
              className="w-full bg-slate-950 border border-slate-700 rounded-xl px-4 py-2.5 text-xs sm:text-sm text-slate-200 focus:outline-none focus:border-amber-400"
            />
          </div>

          {/* Question 3 */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-200 flex items-center gap-1.5">
              <span className="w-5 h-5 rounded-md bg-amber-400/20 text-amber-400 flex items-center justify-center font-bold text-xs">
                3
              </span>
              <span>Metode menentukan akar persamaan kuadrat mana yang paling mudah bagi saya?</span>
            </label>
            <select
              value={metodePalingMudah}
              onChange={(e) => setMetodePalingMudah(e.target.value)}
              className="w-full bg-slate-950 border border-slate-700 rounded-xl px-4 py-2.5 text-xs sm:text-sm text-slate-200 focus:outline-none focus:border-amber-400"
            >
              <option value="Metode Faktorisasi">Metode Faktorisasi (Pemfaktoran Aljabar)</option>
              <option value="Metode Melengkapkan Kuadrat Sempurna">Metode Melengkapkan Kuadrat Sempurna</option>
              <option value="Metode Rumus ABC (Rumus Kuadratik Universal)">Metode Rumus ABC (Rumus Kuadratik Universal)</option>
              <option value="Analisis Diskriminan D = b² - 4ac">Analisis Diskriminan D = b² - 4ac</option>
            </select>
          </div>

          {/* Question 4 */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-200 flex items-center gap-1.5">
              <span className="w-5 h-5 rounded-md bg-amber-400/20 text-amber-400 flex items-center justify-center font-bold text-xs">
                4
              </span>
              <span>Kesulitan apa yang saya alami selama pembelajaran?</span>
            </label>
            <textarea
              rows={2}
              placeholder="Contoh: Terkadang masih keliru pada tanda minus di rumus -b saat b bernilai negatif..."
              value={kesulitan}
              onChange={(e) => setKesulitan(e.target.value)}
              className="w-full bg-slate-950 border border-slate-700 rounded-xl p-3 text-xs sm:text-sm text-slate-200 focus:outline-none focus:border-amber-400"
            />
          </div>

          {/* Question 5 */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-200 flex items-center gap-1.5">
              <span className="w-5 h-5 rounded-md bg-amber-400/20 text-amber-400 flex items-center justify-center font-bold text-xs">
                5
              </span>
              <span>Apa yang akan saya lakukan untuk meningkatkan kemampuan matematika saya?</span>
            </label>
            <textarea
              rows={2}
              placeholder="Contoh: Mengulang latihan game di tantangan matematika dan bertanya kepada Pak Suwandi saat jam praktikum bengkel..."
              value={rencanaTindakLanjut}
              onChange={(e) => setRencanaTindakLanjut(e.target.value)}
              className="w-full bg-slate-950 border border-slate-700 rounded-xl p-3 text-xs sm:text-sm text-slate-200 focus:outline-none focus:border-amber-400"
            />
          </div>

        </div>

        {/* Submit Button */}
        <div className="pt-4 border-t border-slate-800 flex justify-end">
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full sm:w-auto px-6 py-3 bg-gradient-to-r from-rose-500 to-pink-500 hover:from-rose-400 hover:to-pink-400 text-white font-extrabold rounded-xl text-xs sm:text-sm transition-all shadow-lg flex items-center justify-center gap-2"
          >
            <Send className="w-4 h-4" />
            <span>{isSubmitting ? 'Menyimpan Refleksi...' : 'Kirim Lembar Refleksi'}</span>
          </button>
        </div>

      </form>

    </div>
  );
};
