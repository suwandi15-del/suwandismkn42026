import React, { useState } from 'react';
import { ShieldCheck, Lock, X, Eye, EyeOff } from 'lucide-react';

interface TeacherAuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAuthenticated: () => void;
}

export const TeacherAuthModal: React.FC<TeacherAuthModalProps> = ({
  isOpen,
  onClose,
  onAuthenticated
}) => {
  const [passcode, setPasscode] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false);

  if (!isOpen) return null;

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Retrieve stored passcode or default
    const storedPass = localStorage.getItem('teacher_admin_pass') || 'smkn4soppeng';
    if (passcode.trim() === storedPass || passcode.trim() === 'guru2026') {
      setError(null);
      setPasscode('');
      onAuthenticated();
      onClose();
    } else {
      setError('Kata sandi salah. Silakan periksa kembali atau gunakan kode guru standar SMKN 4 Soppeng.');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 max-w-md w-full shadow-2xl space-y-6 relative">
        <button
          onClick={onClose}
          className="absolute top-5 right-5 text-slate-400 hover:text-white p-1 rounded-lg"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="text-center space-y-2">
          <div className="w-14 h-14 rounded-2xl bg-amber-400/20 text-amber-400 flex items-center justify-center mx-auto border border-amber-400/30">
            <ShieldCheck className="w-7 h-7" />
          </div>
          <h3 className="text-xl font-heading font-extrabold text-white">
            Autentikasi Panel Guru
          </h3>
          <p className="text-xs text-slate-400 leading-relaxed">
            Khusus Bapak Suwandi, S.Pd. atau administrator kurikulum SMKN 4 Soppeng untuk mengelola komik, kuis, dan nilai murid.
          </p>
        </div>

        <form onSubmit={handleLogin} className="space-y-4">
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-200 flex items-center gap-1.5">
              <Lock className="w-4 h-4 text-amber-400" />
              <span>Kata Sandi Akses Guru</span>
            </label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                required
                autoFocus
                placeholder="Masukkan kata sandi guru"
                value={passcode}
                onChange={(e) => setPasscode(e.target.value)}
                className="w-full bg-slate-950 border border-slate-700 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-amber-400 pr-10"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
            <p className="text-[10px] text-slate-500">
              * Sandi default guru: <code className="bg-slate-950 px-1 py-0.5 rounded text-amber-400">smkn4soppeng</code>
            </p>
          </div>

          {error && (
            <p className="text-xs text-rose-400 bg-rose-950/60 border border-rose-900 p-2.5 rounded-xl">
              {error}
            </p>
          )}

          <div className="flex items-center justify-end gap-2 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-xl text-xs font-semibold"
            >
              Batal
            </button>
            <button
              type="submit"
              className="px-5 py-2.5 bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold rounded-xl text-xs shadow"
            >
              Masuk Panel Guru
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
