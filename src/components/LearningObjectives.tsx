import React, { useState } from 'react';
import { LearningObjectiveData, NavPage } from '../types';
import { 
  GraduationCap, 
  Target, 
  CheckCircle, 
  ListOrdered, 
  Layers, 
  Edit3, 
  Save, 
  RotateCcw,
  BookOpen,
  ArrowRight,
  ShieldCheck
} from 'lucide-react';

interface LearningObjectivesProps {
  objectives: LearningObjectiveData;
  isTeacherAuthenticated: boolean;
  onSaveObjectives: (updated: LearningObjectiveData) => Promise<void>;
  onNavigate: (page: NavPage) => void;
  onOpenTeacherLogin: () => void;
}

export const LearningObjectives: React.FC<LearningObjectivesProps> = ({
  objectives,
  isTeacherAuthenticated,
  onSaveObjectives,
  onNavigate,
  onOpenTeacherLogin
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState<LearningObjectiveData>(objectives);
  const [isSaving, setIsSaving] = useState(false);

  const handleSave = async () => {
    setIsSaving(true);
    try {
      await onSaveObjectives(formData);
      setIsEditing(false);
    } finally {
      setIsSaving(false);
    }
  };

  const handleReset = () => {
    setFormData(objectives);
    setIsEditing(false);
  };

  return (
    <div className="space-y-8 py-4 sm:py-6 max-w-5xl mx-auto">
      
      {/* Top Header Card */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-xl flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-xs font-bold text-emerald-400">
            <Target className="w-4 h-4" />
            <span>KURIKULUM MERDEKA · FASE E KELAS X SMK</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-heading font-extrabold text-white">
            Tujuan & Capaian Pembelajaran
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 max-w-2xl">
            Panduan kompetensi dan sasaran belajar materi <em>Menemukan Akar-Akar Persamaan Kuadrat</em> di SMKN 4 Soppeng.
          </p>
        </div>

        {/* Teacher Edit Control */}
        <div className="shrink-0">
          {isTeacherAuthenticated ? (
            isEditing ? (
              <div className="flex items-center gap-2">
                <button
                  onClick={handleSave}
                  disabled={isSaving}
                  className="px-4 py-2 bg-emerald-500 hover:bg-emerald-400 text-white font-bold rounded-xl text-xs flex items-center gap-1.5 shadow"
                >
                  <Save className="w-4 h-4" />
                  <span>{isSaving ? 'Menyimpan...' : 'Simpan Perubahan'}</span>
                </button>
                <button
                  onClick={handleReset}
                  className="px-3 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-xl text-xs flex items-center gap-1"
                >
                  <RotateCcw className="w-4 h-4" />
                  <span>Batal</span>
                </button>
              </div>
            ) : (
              <button
                onClick={() => setIsEditing(true)}
                className="px-4 py-2.5 bg-slate-800 hover:bg-amber-400 hover:text-slate-950 text-amber-300 font-bold rounded-xl text-xs flex items-center gap-1.5 border border-slate-700 transition-colors"
              >
                <Edit3 className="w-4 h-4" />
                <span>Edit Tujuan Pembelajaran</span>
              </button>
            )
          ) : (
            <button
              onClick={onOpenTeacherLogin}
              className="px-3.5 py-2 bg-slate-800/80 hover:bg-slate-800 text-slate-300 hover:text-white rounded-xl text-xs flex items-center gap-1.5 border border-slate-700"
            >
              <ShieldCheck className="w-4 h-4 text-amber-400" />
              <span>Login Guru untuk Mengedit</span>
            </button>
          )}
        </div>
      </div>

      {isEditing ? (
        /* Edit Form Mode */
        <div className="bg-slate-900 border border-amber-400/50 rounded-2xl p-6 space-y-6 shadow-xl">
          <div className="space-y-2">
            <label className="text-xs font-bold text-amber-300 uppercase tracking-wider">
              Capaian Pembelajaran (CP)
            </label>
            <textarea
              value={formData.capaianPembelajaran}
              onChange={(e) => setFormData({ ...formData, capaianPembelajaran: e.target.value })}
              rows={3}
              className="w-full bg-slate-950 border border-slate-700 rounded-xl p-3 text-sm text-slate-200 focus:outline-none focus:border-amber-400"
            />
          </div>

          <div className="space-y-2">
            <label className="text-xs font-bold text-amber-300 uppercase tracking-wider">
              Tujuan Pembelajaran (Pisahkan dengan baris baru)
            </label>
            <textarea
              value={formData.tujuanPembelajaran.join('\n')}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  tujuanPembelajaran: e.target.value.split('\n').filter((s) => s.trim().length > 0)
                })
              }
              rows={6}
              className="w-full bg-slate-950 border border-slate-700 rounded-xl p-3 text-sm text-slate-200 focus:outline-none focus:border-amber-400 font-mono text-xs"
            />
          </div>

          <div className="space-y-2">
            <label className="text-xs font-bold text-amber-300 uppercase tracking-wider">
              Indikator Ketercapaian (Pisahkan dengan baris baru)
            </label>
            <textarea
              value={formData.indikatorKetercapaian.join('\n')}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  indikatorKetercapaian: e.target.value.split('\n').filter((s) => s.trim().length > 0)
                })
              }
              rows={6}
              className="w-full bg-slate-950 border border-slate-700 rounded-xl p-3 text-sm text-slate-200 focus:outline-none focus:border-amber-400 font-mono text-xs"
            />
          </div>

          <div className="space-y-2">
            <label className="text-xs font-bold text-amber-300 uppercase tracking-wider">
              Materi Prasyarat (Pisahkan dengan baris baru)
            </label>
            <textarea
              value={formData.materiPrasyarat.join('\n')}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  materiPrasyarat: e.target.value.split('\n').filter((s) => s.trim().length > 0)
                })
              }
              rows={4}
              className="w-full bg-slate-950 border border-slate-700 rounded-xl p-3 text-sm text-slate-200 focus:outline-none focus:border-amber-400 font-mono text-xs"
            />
          </div>

          <div className="flex justify-end gap-3 pt-2">
            <button
              onClick={handleReset}
              className="px-4 py-2 bg-slate-800 text-slate-300 rounded-xl text-xs font-semibold hover:bg-slate-700"
            >
              Batal
            </button>
            <button
              onClick={handleSave}
              disabled={isSaving}
              className="px-5 py-2 bg-amber-400 text-slate-950 font-bold rounded-xl text-xs hover:bg-amber-300 shadow"
            >
              {isSaving ? 'Menyimpan...' : 'Simpan Semua'}
            </button>
          </div>
        </div>
      ) : (
        /* Display Mode */
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          
          {/* Capaian Pembelajaran Banner */}
          <div className="md:col-span-12 bg-gradient-to-r from-blue-950/70 via-slate-900 to-indigo-950/70 border border-blue-900/60 rounded-2xl p-6 shadow-md">
            <div className="flex items-start gap-4">
              <div className="p-3 rounded-2xl bg-blue-600/20 text-blue-400 shrink-0 border border-blue-500/30">
                <GraduationCap className="w-6 h-6" />
              </div>
              <div className="space-y-1">
                <span className="text-[11px] font-extrabold uppercase tracking-wider text-blue-300">
                  Capaian Pembelajaran (Fase E)
                </span>
                <p className="text-sm sm:text-base text-slate-100 font-medium leading-relaxed">
                  {objectives.capaianPembelajaran}
                </p>
              </div>
            </div>
          </div>

          {/* Left Column: Tujuan Pembelajaran & Indikator */}
          <div className="md:col-span-7 space-y-6">
            
            {/* Tujuan Pembelajaran Card */}
            <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 space-y-4 shadow-md">
              <div className="flex items-center gap-2 pb-2 border-b border-slate-800">
                <Target className="w-5 h-5 text-emerald-400" />
                <h3 className="font-heading font-bold text-white text-lg">
                  Tujuan Pembelajaran (TP)
                </h3>
              </div>
              <ul className="space-y-3">
                {objectives.tujuanPembelajaran.map((tp, idx) => (
                  <li key={idx} className="flex items-start gap-3 text-xs sm:text-sm text-slate-200">
                    <span className="w-5 h-5 rounded-md bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">
                      {idx + 1}
                    </span>
                    <span className="leading-relaxed">{tp}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Indikator Ketercapaian Card */}
            <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 space-y-4 shadow-md">
              <div className="flex items-center gap-2 pb-2 border-b border-slate-800">
                <CheckCircle className="w-5 h-5 text-amber-400" />
                <h3 className="font-heading font-bold text-white text-lg">
                  Indikator Ketercapaian Tujuan Pembelajaran (IKTP)
                </h3>
              </div>
              <ul className="space-y-3">
                {objectives.indikatorKetercapaian.map((iktp, idx) => (
                  <li key={idx} className="flex items-start gap-3 text-xs sm:text-sm text-slate-200">
                    <CheckCircle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                    <span className="leading-relaxed">{iktp}</span>
                  </li>
                ))}
              </ul>
            </div>

          </div>

          {/* Right Column: Materi Prasyarat & Alur Pembelajaran */}
          <div className="md:col-span-5 space-y-6">
            
            {/* Materi Prasyarat Card */}
            <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 space-y-4 shadow-md">
              <div className="flex items-center gap-2 pb-2 border-b border-slate-800">
                <Layers className="w-5 h-5 text-cyan-400" />
                <h3 className="font-heading font-bold text-white text-lg">
                  Materi Prasyarat
                </h3>
              </div>
              <ul className="space-y-2.5">
                {objectives.materiPrasyarat.map((prasyarat, idx) => (
                  <li
                    key={idx}
                    className="p-2.5 rounded-xl bg-slate-800/60 border border-slate-700/60 text-xs sm:text-sm text-slate-300 flex items-center gap-2.5"
                  >
                    <span className="w-2 h-2 rounded-full bg-cyan-400 shrink-0" />
                    <span>{prasyarat}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Alur Pembelajaran Card */}
            <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 space-y-4 shadow-md">
              <div className="flex items-center gap-2 pb-2 border-b border-slate-800">
                <ListOrdered className="w-5 h-5 text-purple-400" />
                <h3 className="font-heading font-bold text-white text-lg">
                  Alur Pembelajaran
                </h3>
              </div>
              <div className="space-y-3">
                {objectives.alurPembelajaran.map((alur) => (
                  <div
                    key={alur.tahap}
                    className="p-3 rounded-xl bg-slate-800/40 border border-slate-700/70 space-y-1 relative"
                  >
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-bold text-purple-300">
                        Tahap {alur.tahap}: {alur.judul}
                      </span>
                      <span className="text-[10px] text-slate-400 bg-slate-900 px-2 py-0.5 rounded">
                        {alur.durasi}
                      </span>
                    </div>
                    <p className="text-xs text-slate-300 leading-relaxed">
                      {alur.deskripsi}
                    </p>
                  </div>
                ))}
              </div>
            </div>

          </div>

        </div>
      )}

      {/* Call to Action Footer */}
      <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          <h4 className="font-heading font-bold text-white text-base">
            Siap Mencapai Seluruh Indikator Ini?
          </h4>
          <p className="text-xs text-slate-400">
            Mulai dari membaca komik digital untuk melihat contoh nyata di SMKN 4 Soppeng.
          </p>
        </div>
        <button
          onClick={() => onNavigate('komik')}
          className="px-5 py-2.5 bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold rounded-xl text-xs sm:text-sm flex items-center gap-2 shadow transition-colors"
        >
          <BookOpen className="w-4 h-4" />
          <span>Jelajahi Komik Digital</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>

    </div>
  );
};
