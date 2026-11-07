import React, { useState, useRef } from 'react';
import { 
  ComicPublication, 
  ComicPageItem, 
  MaterialModule, 
  QuizQuestion, 
  ReflectionSubmission, 
  StudentEvaluationResult, 
  TeacherProfile 
} from '../types';
import { exportResultsToCSV } from '../services/storage';
import { 
  ShieldCheck, 
  LayoutDashboard, 
  Image as ImageIcon, 
  BookOpen, 
  Layers, 
  FileQuestion, 
  GraduationCap, 
  Settings, 
  Upload, 
  Trash2, 
  Plus, 
  ArrowUp, 
  ArrowDown, 
  Download, 
  Eye, 
  RotateCcw, 
  Save, 
  CheckCircle2, 
  AlertCircle,
  FileText,
  Database
} from 'lucide-react';

interface TeacherPanelProps {
  teacherProfile: TeacherProfile;
  comics: ComicPublication[];
  materials: MaterialModule[];
  questions: QuizQuestion[];
  evaluationResults: StudentEvaluationResult[];
  reflections: ReflectionSubmission[];
  onSaveTeacherProfile: (profile: TeacherProfile) => Promise<void>;
  onSaveComic: (comic: ComicPublication) => Promise<void>;
  onDeleteComic: (id: string) => Promise<void>;
  onSaveMaterial: (material: MaterialModule) => Promise<void>;
  onDeleteMaterial: (id: string) => Promise<void>;
  onSaveQuestion: (question: QuizQuestion) => Promise<void>;
  onDeleteQuestion: (id: string) => Promise<void>;
  onLogout: () => void;
}

type PanelTab = 'dashboard' | 'sampul' | 'komik' | 'materi' | 'kuis' | 'hasil' | 'pengaturan';

export const TeacherPanel: React.FC<TeacherPanelProps> = ({
  teacherProfile,
  comics,
  materials,
  questions,
  evaluationResults,
  reflections,
  onSaveTeacherProfile,
  onSaveComic,
  onDeleteComic,
  onSaveMaterial,
  onDeleteMaterial,
  onSaveQuestion,
  onDeleteQuestion,
  onLogout
}) => {
  const [activeTab, setActiveTab] = useState<PanelTab>('dashboard');
  const [statusMessage, setStatusMessage] = useState<{ text: string; type: 'success' | 'error' } | null>(null);

  // Cover Management state
  const coverInputRef = useRef<HTMLInputElement>(null);
  const [previewCoverUrl, setPreviewCoverUrl] = useState<string>(teacherProfile.coverImageUrl);

  // Comic Management state
  const comicImagesInputRef = useRef<HTMLInputElement>(null);
  const comicPdfInputRef = useRef<HTMLInputElement>(null);
  const activeComic = comics[0];
  const [comicTitle, setComicTitle] = useState(activeComic?.title || 'Komik Matematika SMKN 4 Soppeng');
  const [comicDesc, setComicDesc] = useState(activeComic?.description || '');
  const [comicPages, setComicPages] = useState<ComicPageItem[]>(activeComic?.pages || []);
  const [isComicPublished, setIsComicPublished] = useState<boolean>(activeComic?.isPublished ?? true);
  const [uploadProgress, setUploadProgress] = useState<string | null>(null);

  // Settings state
  const [profileForm, setProfileForm] = useState<TeacherProfile>(teacherProfile);

  // Question modal / form
  const [editingQuestion, setEditingQuestion] = useState<QuizQuestion | null>(null);
  const [isCreatingQuestion, setIsCreatingQuestion] = useState(false);

  // Flash message helper
  const showToast = (text: string, type: 'success' | 'error' = 'success') => {
    setStatusMessage({ text, type });
    setTimeout(() => setStatusMessage(null), 4000);
  };

  // 1. Cover Handlers
  const handleCoverUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (!file.type.startsWith('image/')) {
      showToast('Format file harus berupa gambar (JPG, PNG, WebP).', 'error');
      return;
    }
    const reader = new FileReader();
    reader.onload = (event) => {
      const result = event.target?.result as string;
      setPreviewCoverUrl(result);
    };
    reader.readAsDataURL(file);
  };

  const handleSaveCover = async () => {
    try {
      const updated = { ...teacherProfile, coverImageUrl: previewCoverUrl };
      await onSaveTeacherProfile(updated);
      showToast('Sampul komik baru berhasil disimpan!');
    } catch {
      showToast('Gagal menyimpan sampul.', 'error');
    }
  };

  const handleResetCover = async () => {
    const defaultCover = '/src/assets/images/comic_cover_hero_1794015828898.jpg';
    setPreviewCoverUrl(defaultCover);
    await onSaveTeacherProfile({ ...teacherProfile, coverImageUrl: defaultCover });
    showToast('Sampul dikembalikan ke ilustrasi standar SMKN 4 Soppeng.');
  };

  // 2. Comic Upload Handlers
  const handleMultipleImagesUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    setUploadProgress(`Memproses ${files.length} halaman gambar...`);
    const newPages: ComicPageItem[] = [...comicPages];
    let loadedCount = 0;

    Array.from(files).forEach((file, idx) => {
      const reader = new FileReader();
      reader.onload = (ev) => {
        const dataUrl = ev.target?.result as string;
        newPages.push({
          id: `page_${Date.now()}_${idx}`,
          pageNumber: newPages.length + 1,
          imageUrl: dataUrl,
          title: `Halaman ${newPages.length + 1}: ${file.name.replace(/\.[^/.]+$/, '')}`,
          caption: 'Halaman materi diunggah oleh guru.'
        });
        loadedCount++;
        if (loadedCount === files.length) {
          // Re-index page numbers
          const sorted = newPages.map((p, i) => ({ ...p, pageNumber: i + 1 }));
          setComicPages(sorted);
          setUploadProgress(null);
          showToast(`Berhasil menambahkan ${files.length} halaman gambar!`);
        }
      };
      reader.readAsDataURL(file);
    });
  };

  const handlePdfUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (file.type !== 'application/pdf') {
      showToast('File harus berekstensi .pdf', 'error');
      return;
    }
    setUploadProgress('Memproses berkas PDF komik...');
    const reader = new FileReader();
    reader.onload = (ev) => {
      const pdfDataUrl = ev.target?.result as string;
      // We store the PDF url and add a cover page
      const updatedComic: ComicPublication = {
        id: activeComic?.id || `comic_${Date.now()}`,
        title: comicTitle,
        description: comicDesc,
        fileType: 'pdf',
        pdfUrl: pdfDataUrl,
        isPublished: isComicPublished,
        uploadedAt: new Date().toISOString(),
        pages: [
          {
            id: 'pdf_page_1',
            pageNumber: 1,
            imageUrl: previewCoverUrl,
            title: comicTitle,
            caption: 'Dokumen PDF Komik telah diunggah dan siap dibaca oleh murid.'
          }
        ]
      };
      onSaveComic(updatedComic);
      setUploadProgress(null);
      showToast('Berkas PDF Komik berhasil disimpan!');
    };
    reader.readAsDataURL(file);
  };

  const handleSaveComicChanges = async () => {
    try {
      const updated: ComicPublication = {
        id: activeComic?.id || `comic_${Date.now()}`,
        title: comicTitle,
        description: comicDesc,
        fileType: activeComic?.fileType || 'images',
        pdfUrl: activeComic?.pdfUrl,
        isPublished: isComicPublished,
        uploadedAt: new Date().toISOString(),
        pages: comicPages.map((p, idx) => ({ ...p, pageNumber: idx + 1 }))
      };
      await onSaveComic(updated);
      showToast('Perubahan komik berhasil dipublikasikan!');
    } catch {
      showToast('Gagal menyimpan komik.', 'error');
    }
  };

  const handleMovePage = (index: number, direction: 'up' | 'down') => {
    const targetIdx = direction === 'up' ? index - 1 : index + 1;
    if (targetIdx < 0 || targetIdx >= comicPages.length) return;
    const copied = [...comicPages];
    const temp = copied[index];
    copied[index] = copied[targetIdx];
    copied[targetIdx] = temp;
    const reindexed = copied.map((p, i) => ({ ...p, pageNumber: i + 1 }));
    setComicPages(reindexed);
  };

  const handleDeletePage = (pageId: string) => {
    const filtered = comicPages.filter((p) => p.id !== pageId).map((p, i) => ({ ...p, pageNumber: i + 1 }));
    setComicPages(filtered);
    showToast('Halaman dihapus dari daftar.');
  };

  // 3. Question Form Handlers
  const handleSaveQuestionSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingQuestion) return;
    await onSaveQuestion(editingQuestion);
    setEditingQuestion(null);
    setIsCreatingQuestion(false);
    showToast('Soal kuis berhasil disimpan!');
  };

  // 4. Settings Handler
  const handleSaveProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    await onSaveTeacherProfile(profileForm);
    showToast('Pengaturan identitas sekolah & guru berhasil diperbarui!');
  };

  const tabs: { id: PanelTab; label: string; icon: React.ReactNode }[] = [
    { id: 'dashboard', label: 'Ringkasan', icon: <LayoutDashboard className="w-4 h-4" /> },
    { id: 'sampul', label: 'Kelola Sampul', icon: <ImageIcon className="w-4 h-4" /> },
    { id: 'komik', label: 'Kelola Komik', icon: <BookOpen className="w-4 h-4" /> },
    { id: 'materi', label: 'Kelola Materi', icon: <Layers className="w-4 h-4" /> },
    { id: 'kuis', label: 'Kelola Kuis', icon: <FileQuestion className="w-4 h-4" /> },
    { id: 'hasil', label: 'Hasil Belajar', icon: <GraduationCap className="w-4 h-4" /> },
    { id: 'pengaturan', label: 'Pengaturan', icon: <Settings className="w-4 h-4" /> },
  ];

  return (
    <div className="py-6 max-w-6xl mx-auto space-y-6">
      
      {/* Top Admin Header */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-xl flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3.5">
          <div className="w-11 h-11 rounded-2xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold border border-emerald-500/30">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider">
                PANEL KONTROL GURU & ADMINISTRATOR
              </span>
              <span className="px-2 py-0.5 rounded-full bg-emerald-950 text-emerald-300 border border-emerald-800 text-[10px] font-bold">
                Online
              </span>
            </div>
            <h2 className="text-xl sm:text-2xl font-heading font-extrabold text-white">
              LMS {teacherProfile.school} · {teacherProfile.name}
            </h2>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => exportResultsToCSV(evaluationResults, reflections)}
            className="px-3.5 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-xl text-xs font-bold flex items-center gap-1.5 border border-slate-700 shadow"
            title="Ekspor seluruh rekap nilai murid ke berkas CSV"
          >
            <Download className="w-4 h-4 text-amber-400" />
            <span>Unduh CSV Nilai</span>
          </button>
          <button
            onClick={onLogout}
            className="px-3.5 py-2 bg-rose-600/90 hover:bg-rose-500 text-white rounded-xl text-xs font-bold shadow"
          >
            Keluar Panel
          </button>
        </div>
      </div>

      {/* Toast Alert Banner */}
      {statusMessage && (
        <div
          className={`p-4 rounded-2xl border text-xs sm:text-sm font-semibold flex items-center gap-2.5 shadow-lg ${
            statusMessage.type === 'success'
              ? 'bg-emerald-950/80 border-emerald-500 text-emerald-200'
              : 'bg-rose-950/80 border-rose-500 text-rose-200'
          }`}
        >
          {statusMessage.type === 'success' ? (
            <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
          ) : (
            <AlertCircle className="w-5 h-5 text-rose-400 shrink-0" />
          )}
          <span>{statusMessage.text}</span>
        </div>
      )}

      {/* Tabs Bar */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
        {tabs.map((tab) => {
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-4 py-2.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all flex items-center gap-2 shrink-0 border ${
                isActive
                  ? 'bg-amber-400 border-amber-400 text-slate-950 shadow-md font-extrabold'
                  : 'bg-slate-900 border-slate-800 text-slate-300 hover:text-white hover:border-slate-700'
              }`}
            >
              {tab.icon}
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* 1. TAB DASHBOARD */}
      {activeTab === 'dashboard' && (
        <div className="space-y-6">
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 space-y-1">
              <span className="text-[10px] uppercase font-bold text-slate-400">Judul Komik</span>
              <p className="text-2xl font-heading font-extrabold text-white">{comics.length}</p>
              <span className="text-[10px] text-emerald-400 font-semibold">Aktif Dipublikasikan</span>
            </div>
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 space-y-1">
              <span className="text-[10px] uppercase font-bold text-slate-400">Total Halaman</span>
              <p className="text-2xl font-heading font-extrabold text-white">{comicPages.length}</p>
              <span className="text-[10px] text-amber-400 font-semibold">Kualitas Gambar HD</span>
            </div>
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 space-y-1">
              <span className="text-[10px] uppercase font-bold text-slate-400">Modul Materi</span>
              <p className="text-2xl font-heading font-extrabold text-white">{materials.length}</p>
              <span className="text-[10px] text-blue-400 font-semibold">Lengkap Contoh</span>
            </div>
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 space-y-1">
              <span className="text-[10px] uppercase font-bold text-slate-400">Bank Soal Kuis</span>
              <p className="text-2xl font-heading font-extrabold text-white">{questions.length}</p>
              <span className="text-[10px] text-cyan-400 font-semibold">Pilihan Ganda A-E</span>
            </div>
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 space-y-1">
              <span className="text-[10px] uppercase font-bold text-slate-400">Kuis Terkirim</span>
              <p className="text-2xl font-heading font-extrabold text-white">{evaluationResults.length}</p>
              <span className="text-[10px] text-purple-400 font-semibold">Riwayat Murid</span>
            </div>
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 space-y-1">
              <span className="text-[10px] uppercase font-bold text-slate-400">Lembar Refleksi</span>
              <p className="text-2xl font-heading font-extrabold text-white">{reflections.length}</p>
              <span className="text-[10px] text-rose-400 font-semibold">Respon Murid</span>
            </div>
          </div>

          {/* Quick Storage Status Notice */}
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="p-3 rounded-2xl bg-amber-400/20 text-amber-400 border border-amber-400/30">
                <Database className="w-6 h-6" />
              </div>
              <div className="space-y-0.5">
                <h4 className="font-heading font-bold text-white text-base">
                  Sistem Penyimpanan Persisten Lokal Aktif (IndexedDB)
                </h4>
                <p className="text-xs text-slate-300">
                  Semua komik yang Anda unggah, foto sampul baru, data kuis, serta hasil refleksi murid tersimpan secara lokal dan persisten di browser ini. Anda dapat mengunduh rekap nilai kapan saja ke format CSV.
                </p>
              </div>
            </div>

            <button
              onClick={() => setActiveTab('komik')}
              className="px-4 py-2.5 bg-amber-400 text-slate-950 font-bold rounded-xl text-xs hover:bg-amber-300 shrink-0 shadow"
            >
              Kelola Komik Sekarang
            </button>
          </div>
        </div>
      )}

      {/* 2. TAB KELOLA SAMPUL */}
      {activeTab === 'sampul' && (
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-6 shadow-xl">
          <div className="border-b border-slate-800 pb-4">
            <h3 className="text-xl font-heading font-bold text-white">Kelola Sampul Utama Komik</h3>
            <p className="text-xs text-slate-400">
              Ganti foto sampul depan yang ditampilkan pada Halaman Beranda dan halaman pertama komik.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
            <div className="md:col-span-5 flex flex-col items-center">
              <span className="text-xs font-bold text-slate-400 mb-2">Pratinjau Sampul Aktif:</span>
              <div className="w-full max-w-xs bg-slate-950 border-2 border-amber-400 rounded-2xl overflow-hidden shadow-2xl">
                <img
                  src={previewCoverUrl}
                  alt="Pratinjau Sampul"
                  className="w-full h-auto object-contain block"
                  referrerPolicy="no-referrer"
                />
              </div>
            </div>

            <div className="md:col-span-7 space-y-5">
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-200">
                  Unggah Berkas Sampul Baru (PNG / JPG)
                </label>
                <input
                  type="file"
                  ref={coverInputRef}
                  accept="image/png, image/jpeg, image/webp"
                  onChange={handleCoverUpload}
                  className="block w-full text-xs text-slate-400 file:mr-4 file:py-2.5 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-bold file:bg-blue-600 file:text-white hover:file:bg-blue-500 cursor-pointer"
                />
                <p className="text-[11px] text-slate-500">
                  Disarankan rasio 3:4 dengan resolusi tajam agar karakter guru dan murid tampil prima.
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-3 pt-3">
                <button
                  onClick={handleSaveCover}
                  className="px-5 py-2.5 bg-emerald-500 hover:bg-emerald-400 text-white font-bold rounded-xl text-xs flex items-center gap-2 shadow"
                >
                  <Save className="w-4 h-4" />
                  <span>Simpan Sampul Baru</span>
                </button>
                <button
                  onClick={handleResetCover}
                  className="px-4 py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-xl text-xs flex items-center gap-2 border border-slate-700"
                >
                  <RotateCcw className="w-4 h-4" />
                  <span>Kembalikan ke Sampul Standar</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 3. TAB KELOLA KOMIK */}
      {activeTab === 'komik' && (
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-6 shadow-xl">
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-800 pb-4">
            <div>
              <h3 className="text-xl font-heading font-bold text-white">Kelola Komik Digital & Unggahan</h3>
              <p className="text-xs text-slate-400">
                Unggah berkas komik karya Pak Suwandi dalam format gambar (banyak sekaligus) atau dokumen PDF.
              </p>
            </div>

            <div className="flex items-center gap-3">
              <label className="flex items-center gap-2 text-xs font-semibold text-slate-300 cursor-pointer bg-slate-950 px-3 py-1.5 rounded-xl border border-slate-800">
                <input
                  type="checkbox"
                  checked={isComicPublished}
                  onChange={(e) => setIsComicPublished(e.target.checked)}
                  className="accent-amber-400 w-4 h-4 rounded"
                />
                <span>Publikasikan ke Murid</span>
              </label>

              <button
                onClick={handleSaveComicChanges}
                className="px-5 py-2 bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold rounded-xl text-xs flex items-center gap-1.5 shadow"
              >
                <Save className="w-4 h-4" />
                <span>Simpan Perubahan</span>
              </button>
            </div>
          </div>

          {/* Form Meta Komik */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-200">Judul Komik</label>
              <input
                type="text"
                value={comicTitle}
                onChange={(e) => setComicTitle(e.target.value)}
                className="w-full bg-slate-950 border border-slate-700 rounded-xl px-4 py-2.5 text-xs sm:text-sm text-white focus:outline-none focus:border-amber-400"
              />
            </div>
            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-200">Deskripsi Singkat</label>
              <input
                type="text"
                value={comicDesc}
                onChange={(e) => setComicDesc(e.target.value)}
                className="w-full bg-slate-950 border border-slate-700 rounded-xl px-4 py-2.5 text-xs sm:text-sm text-white focus:outline-none focus:border-amber-400"
              />
            </div>
          </div>

          {/* Upload Dropzones */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Multi-image upload */}
            <div className="bg-slate-950 border-2 border-dashed border-slate-700 hover:border-amber-400 rounded-2xl p-5 text-center space-y-2 transition-colors">
              <Upload className="w-8 h-8 text-amber-400 mx-auto" />
              <p className="text-xs font-bold text-white">Unggah Banyak Gambar Sekaligus (PNG/JPG)</p>
              <p className="text-[11px] text-slate-400">Pilih satu atau beberapa gambar halaman dari komputer.</p>
              <input
                type="file"
                ref={comicImagesInputRef}
                multiple
                accept="image/png, image/jpeg, image/webp"
                onChange={handleMultipleImagesUpload}
                className="hidden"
              />
              <button
                type="button"
                onClick={() => comicImagesInputRef.current?.click()}
                className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-white rounded-xl text-xs font-semibold"
              >
                Pilih Berkas Gambar
              </button>
            </div>

            {/* PDF upload */}
            <div className="bg-slate-950 border-2 border-dashed border-slate-700 hover:border-rose-400 rounded-2xl p-5 text-center space-y-2 transition-colors">
              <FileText className="w-8 h-8 text-rose-400 mx-auto" />
              <p className="text-xs font-bold text-white">Unggah Komik Format Dokumen PDF</p>
              <p className="text-[11px] text-slate-400">Mendukung satu file PDF komik lengkap.</p>
              <input
                type="file"
                ref={comicPdfInputRef}
                accept="application/pdf"
                onChange={handlePdfUpload}
                className="hidden"
              />
              <button
                type="button"
                onClick={() => comicPdfInputRef.current?.click()}
                className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-white rounded-xl text-xs font-semibold"
              >
                Pilih Berkas PDF
              </button>
            </div>
          </div>

          {uploadProgress && (
            <div className="p-3 rounded-xl bg-blue-950 border border-blue-500 text-xs font-semibold text-blue-200">
              {uploadProgress}
            </div>
          )}

          {/* Page List & Reordering */}
          <div className="space-y-3 pt-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">
              Daftar Halaman Komik ({comicPages.length} Halaman)
            </h4>

            <div className="space-y-2.5">
              {comicPages.map((page, idx) => (
                <div
                  key={page.id}
                  className="bg-slate-950 border border-slate-800 rounded-xl p-3 flex items-center justify-between gap-4"
                >
                  <div className="flex items-center gap-3">
                    <span className="w-7 h-7 rounded-lg bg-slate-800 text-white flex items-center justify-center font-bold text-xs shrink-0">
                      {idx + 1}
                    </span>
                    <div className="w-12 h-14 bg-slate-900 rounded-lg overflow-hidden shrink-0 border border-slate-700">
                      <img
                        src={page.imageUrl}
                        alt={`Hal ${idx + 1}`}
                        className="w-full h-full object-cover"
                        referrerPolicy="no-referrer"
                      />
                    </div>
                    <div>
                      <p className="text-xs font-bold text-white line-clamp-1">{page.title || `Halaman ${idx + 1}`}</p>
                      <p className="text-[11px] text-slate-400 line-clamp-1">{page.caption || '-'}</p>
                    </div>
                  </div>

                  {/* Actions: move up, down, delete */}
                  <div className="flex items-center gap-1.5 shrink-0">
                    <button
                      onClick={() => handleMovePage(idx, 'up')}
                      disabled={idx === 0}
                      className="p-1.5 bg-slate-800 hover:bg-slate-700 disabled:opacity-30 rounded-lg text-slate-300"
                      title="Geser ke Atas"
                    >
                      <ArrowUp className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleMovePage(idx, 'down')}
                      disabled={idx === comicPages.length - 1}
                      className="p-1.5 bg-slate-800 hover:bg-slate-700 disabled:opacity-30 rounded-lg text-slate-300"
                      title="Geser ke Bawah"
                    >
                      <ArrowDown className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleDeletePage(page.id)}
                      className="p-1.5 bg-slate-800 hover:bg-rose-900 text-rose-400 rounded-lg"
                      title="Hapus Halaman"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* 4. TAB KELOLA MATERI */}
      {activeTab === 'materi' && (
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-6 shadow-xl">
          <div className="flex items-center justify-between border-b border-slate-800 pb-4">
            <div>
              <h3 className="text-xl font-heading font-bold text-white">Kelola 6 Modul Laboratorium</h3>
              <p className="text-xs text-slate-400">
                Atur ringkasan teori, formula, dan contoh soal terapan kejuruan untuk setiap modul.
              </p>
            </div>
          </div>

          <div className="space-y-4">
            {materials.map((mod) => (
              <div key={mod.id} className="bg-slate-950 border border-slate-800 rounded-2xl p-5 space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="w-6 h-6 rounded-lg bg-blue-600/30 text-blue-400 font-bold text-xs flex items-center justify-center">
                      {mod.number}
                    </span>
                    <h4 className="font-heading font-bold text-white text-base">{mod.title}</h4>
                  </div>
                  <span className="text-xs text-amber-400 font-mono font-bold">{mod.keyFormula}</span>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">{mod.summary}</p>
                <div className="text-[11px] text-slate-400 bg-slate-900 p-2.5 rounded-xl border border-slate-800">
                  <strong className="text-emerald-400">Koneksi SMK:</strong> {mod.contextualSMK}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 5. TAB KELOLA KUIS */}
      {activeTab === 'kuis' && (
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-6 shadow-xl">
          <div className="flex items-center justify-between border-b border-slate-800 pb-4">
            <div>
              <h3 className="text-xl font-heading font-bold text-white">Bank Soal Evaluasi Akhir (10 Soal)</h3>
              <p className="text-xs text-slate-400">
                Kelola butir soal pilihan ganda (5 opsi), tentukan kunci jawaban, dan susun pembahasan.
              </p>
            </div>

            <button
              onClick={() => {
                const newQ: QuizQuestion = {
                  id: `q_${Date.now()}`,
                  number: questions.length + 1,
                  question: 'Tentukan akar-akar persamaan kuadrat baru...',
                  equation: 'x² - 1 = 0',
                  options: ['x = ±1', 'x = 1 saja', 'x = -1 saja', 'x = 0', 'x = 2'],
                  correctIndex: 0,
                  explanation: 'Faktorisasi selisih kuadrat: (x - 1)(x + 1) = 0.',
                  difficulty: 'Mudah',
                  topic: 'Faktorisasi Dasar'
                };
                setEditingQuestion(newQ);
                setIsCreatingQuestion(true);
              }}
              className="px-4 py-2 bg-emerald-500 hover:bg-emerald-400 text-white font-bold rounded-xl text-xs flex items-center gap-1.5 shadow"
            >
              <Plus className="w-4 h-4" />
              <span>Tambah Soal Baru</span>
            </button>
          </div>

          {/* Form Modal if editing question */}
          {editingQuestion && (
            <form onSubmit={handleSaveQuestionSubmit} className="bg-slate-950 border-2 border-amber-400 rounded-2xl p-6 space-y-4 shadow-2xl">
              <div className="flex items-center justify-between">
                <h4 className="font-heading font-bold text-amber-300 text-base">
                  {isCreatingQuestion ? 'Tambah Soal Baru' : `Edit Soal #${editingQuestion.number}`}
                </h4>
                <button
                  type="button"
                  onClick={() => setEditingQuestion(null)}
                  className="text-slate-400 hover:text-white text-xs"
                >
                  Tutup ✕
                </button>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-200">Teks Soal</label>
                <textarea
                  required
                  value={editingQuestion.question}
                  onChange={(e) => setEditingQuestion({ ...editingQuestion, question: e.target.value })}
                  rows={2}
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl p-2.5 text-xs text-white"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-200">Persamaan Matematika (Opsional)</label>
                  <input
                    type="text"
                    value={editingQuestion.equation || ''}
                    onChange={(e) => setEditingQuestion({ ...editingQuestion, equation: e.target.value })}
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white font-math"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-200">Topik Materi</label>
                  <input
                    type="text"
                    value={editingQuestion.topic}
                    onChange={(e) => setEditingQuestion({ ...editingQuestion, topic: e.target.value })}
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white"
                  />
                </div>
              </div>

              {/* 5 Options Inputs */}
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-200">5 Pilihan Jawaban & Kunci:</label>
                {editingQuestion.options.map((opt, idx) => (
                  <div key={idx} className="flex items-center gap-2">
                    <span className="w-6 h-6 rounded-md bg-slate-800 text-white font-bold text-xs flex items-center justify-center shrink-0">
                      {String.fromCharCode(65 + idx)}
                    </span>
                    <input
                      type="text"
                      required
                      value={opt}
                      onChange={(e) => {
                        const newOpts = [...editingQuestion.options] as [string, string, string, string, string];
                        newOpts[idx] = e.target.value;
                        setEditingQuestion({ ...editingQuestion, options: newOpts });
                      }}
                      className="flex-1 bg-slate-900 border border-slate-700 rounded-xl px-3 py-1.5 text-xs text-white"
                    />
                    <label className="flex items-center gap-1.5 text-xs text-slate-300 cursor-pointer">
                      <input
                        type="radio"
                        name="correctAnswer"
                        checked={editingQuestion.correctIndex === idx}
                        onChange={() => setEditingQuestion({ ...editingQuestion, correctIndex: idx })}
                        className="accent-emerald-400"
                      />
                      <span>Kunci</span>
                    </label>
                  </div>
                ))}
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-200">Pembahasan Soal</label>
                <textarea
                  required
                  value={editingQuestion.explanation}
                  onChange={(e) => setEditingQuestion({ ...editingQuestion, explanation: e.target.value })}
                  rows={2}
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl p-2.5 text-xs text-white font-mono"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setEditingQuestion(null)}
                  className="px-4 py-2 bg-slate-800 text-slate-300 text-xs rounded-xl"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-amber-400 text-slate-950 font-bold text-xs rounded-xl"
                >
                  Simpan Soal
                </button>
              </div>
            </form>
          )}

          {/* Question List */}
          <div className="space-y-3">
            {questions.map((q, idx) => (
              <div key={q.id} className="bg-slate-950 border border-slate-800 rounded-2xl p-4 flex items-start justify-between gap-4">
                <div className="space-y-1">
                  <div className="flex items-center gap-2 text-xs font-bold">
                    <span className="w-5 h-5 rounded-md bg-amber-400 text-slate-950 flex items-center justify-center font-bold text-[10px]">
                      {idx + 1}
                    </span>
                    <span className="text-white">{q.topic}</span>
                    <span className="text-emerald-400 font-mono">Kunci: {String.fromCharCode(65 + q.correctIndex)}</span>
                  </div>
                  <p className="text-xs text-slate-300 line-clamp-2">{q.question}</p>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <button
                    onClick={() => {
                      setEditingQuestion(q);
                      setIsCreatingQuestion(false);
                    }}
                    className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-xl text-xs font-semibold"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => {
                      if (confirm('Hapus butir soal ini?')) onDeleteQuestion(q.id);
                    }}
                    className="p-1.5 bg-slate-800 hover:bg-rose-900 text-rose-400 rounded-xl"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 6. TAB HASIL BELAJAR & CSV */}
      {activeTab === 'hasil' && (
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-6 shadow-xl">
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-800 pb-4">
            <div>
              <h3 className="text-xl font-heading font-bold text-white">Rekapitulasi Hasil Belajar Murid</h3>
              <p className="text-xs text-slate-400">
                Data hasil evaluasi 10 butir soal dan catatan lembar refleksi diri peserta didik SMKN 4 Soppeng.
              </p>
            </div>

            <button
              onClick={() => exportResultsToCSV(evaluationResults, reflections)}
              className="px-4 py-2 bg-emerald-500 hover:bg-emerald-400 text-white font-bold rounded-xl text-xs flex items-center gap-1.5 shadow"
            >
              <Download className="w-4 h-4" />
              <span>Unduh Berkas CSV</span>
            </button>
          </div>

          {evaluationResults.length === 0 ? (
            <div className="p-10 text-center text-slate-400 text-xs bg-slate-950 rounded-2xl border border-slate-800">
              Belum ada peserta didik yang menyelesaikan evaluasi akhir. Nilai akan otomatis masuk begitu murid mengirim jawaban.
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-slate-800 text-slate-400 uppercase text-[10px] font-bold">
                    <th className="py-3 px-3">No</th>
                    <th className="py-3 px-3">Nama Murid</th>
                    <th className="py-3 px-3">Kelas</th>
                    <th className="py-3 px-3">Skor</th>
                    <th className="py-3 px-3">Status KKTP (75)</th>
                    <th className="py-3 px-3">Waktu Pengerjaan</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60">
                  {evaluationResults.map((res, i) => {
                    const isPassed = res.score >= 75;
                    return (
                      <tr key={res.id} className="hover:bg-slate-800/40">
                        <td className="py-3 px-3 font-bold text-slate-500">{i + 1}</td>
                        <td className="py-3 px-3 font-semibold text-white">{res.studentName}</td>
                        <td className="py-3 px-3 text-slate-300">{res.studentClass}</td>
                        <td className="py-3 px-3 font-mono font-bold text-amber-300 text-sm">{res.score}</td>
                        <td className="py-3 px-3">
                          <span
                            className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                              isPassed
                                ? 'bg-emerald-950 text-emerald-300 border border-emerald-800'
                                : 'bg-rose-950 text-rose-300 border border-rose-800'
                            }`}
                          >
                            {isPassed ? 'Tuntas' : 'Perlu Bimbingan'}
                          </span>
                        </td>
                        <td className="py-3 px-3 text-slate-400 text-[11px]">
                          {new Date(res.completedAt).toLocaleString('id-ID')}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}

          {/* Reflections List */}
          <div className="pt-6 border-t border-slate-800 space-y-4">
            <h4 className="font-heading font-bold text-white text-base">
              Lembar Refleksi Terkumpul ({reflections.length})
            </h4>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {reflections.map((ref) => (
                <div key={ref.id} className="bg-slate-950 border border-slate-800 rounded-2xl p-4 space-y-2">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-bold text-white">{ref.studentName} ({ref.studentClass})</span>
                    <span className="text-amber-400 font-semibold">{ref.understandingLevel}</span>
                  </div>
                  <p className="text-xs text-slate-300">
                    <strong className="text-slate-400">Pengetahuan Baru:</strong> {ref.answers.pengetahuanBaru}
                  </p>
                  <p className="text-xs text-slate-300">
                    <strong className="text-slate-400">Metode Favorit:</strong> {ref.answers.metodePalingMudah}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* 7. TAB PENGATURAN IDENTITAS */}
      {activeTab === 'pengaturan' && (
        <form onSubmit={handleSaveProfile} className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-5 shadow-xl">
          <div className="border-b border-slate-800 pb-4">
            <h3 className="text-xl font-heading font-bold text-white">Pengaturan Identitas & Metadata LMS</h3>
            <p className="text-xs text-slate-400">
              Sesuaikan identitas guru, nama sekolah, kelas, dan seri pembelajaran.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-200">Nama Guru Pengampu</label>
              <input
                type="text"
                value={profileForm.name}
                onChange={(e) => setProfileForm({ ...profileForm, name: e.target.value })}
                className="w-full bg-slate-950 border border-slate-700 rounded-xl px-4 py-2.5 text-xs text-white"
              />
            </div>
            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-200">Nama Sekolah</label>
              <input
                type="text"
                value={profileForm.school}
                onChange={(e) => setProfileForm({ ...profileForm, school: e.target.value })}
                className="w-full bg-slate-950 border border-slate-700 rounded-xl px-4 py-2.5 text-xs text-white"
              />
            </div>
            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-200">Tahun Ajaran</label>
              <input
                type="text"
                value={profileForm.year}
                onChange={(e) => setProfileForm({ ...profileForm, year: e.target.value })}
                className="w-full bg-slate-950 border border-slate-700 rounded-xl px-4 py-2.5 text-xs text-white"
              />
            </div>
            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-200">Jenjang / Fase</label>
              <input
                type="text"
                value={`${profileForm.grade} - ${profileForm.phase}`}
                onChange={(e) => {
                  const parts = e.target.value.split('-');
                  setProfileForm({ ...profileForm, grade: parts[0]?.trim() || '', phase: parts[1]?.trim() || '' });
                }}
                className="w-full bg-slate-950 border border-slate-700 rounded-xl px-4 py-2.5 text-xs text-white"
              />
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-xs font-bold text-slate-200">Deskripsi Aplikasi</label>
            <textarea
              rows={3}
              value={profileForm.appDescription}
              onChange={(e) => setProfileForm({ ...profileForm, appDescription: e.target.value })}
              className="w-full bg-slate-950 border border-slate-700 rounded-xl p-3 text-xs text-white"
            />
          </div>

          <div className="pt-3 flex justify-end">
            <button
              type="submit"
              className="px-6 py-2.5 bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold rounded-xl text-xs shadow"
            >
              Simpan Pengaturan LMS
            </button>
          </div>
        </form>
      )}

    </div>
  );
};
