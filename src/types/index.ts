export type NavPage = 
  | 'beranda'
  | 'petunjuk'
  | 'tujuan'
  | 'komik'
  | 'laboratorium'
  | 'tantangan'
  | 'evaluasi'
  | 'refleksi'
  | 'guru';

export interface TeacherProfile {
  name: string;
  title: string;
  school: string;
  year: string;
  grade: string;
  phase: string;
  subject: string;
  seriesTitle: string;
  topicTitle: string;
  appDescription: string;
  coverImageUrl: string;
}

export interface ComicPageItem {
  id: string;
  pageNumber: number;
  imageUrl: string;
  title?: string;
  caption?: string;
}

export interface ComicPublication {
  id: string;
  title: string;
  description: string;
  pdfUrl?: string; // If uploaded as PDF
  fileType: 'images' | 'pdf';
  pages: ComicPageItem[];
  isPublished: boolean;
  uploadedAt: string;
}

export interface LearningObjectiveData {
  capaianPembelajaran: string;
  tujuanPembelajaran: string[];
  indikatorKetercapaian: string[];
  materiPrasyarat: string[];
  alurPembelajaran: {
    tahap: number;
    judul: string;
    deskripsi: string;
    durasi: string;
  }[];
}

export interface MaterialModule {
  id: string;
  number: number;
  title: string;
  subtitle: string;
  summary: string;
  content: string[];
  keyFormula?: string;
  contextualSMK: string;
  sampleProblems: {
    question: string;
    steps: string[];
    solution: string;
  }[];
  interactivePractice: {
    question: string;
    options: string[];
    correctIndex: number;
    explanation: string;
  };
}

export interface QuizQuestion {
  id: string;
  number: number;
  question: string;
  equation?: string;
  options: [string, string, string, string, string]; // 5 choices: A, B, C, D, E
  correctIndex: number; // 0 for A, 1 for B, 2 for C, 3 for D, 4 for E
  explanation: string;
  difficulty: 'Mudah' | 'Sedang' | 'Tinggi (HOTS)';
  topic: string;
}

export interface StudentEvaluationResult {
  id: string;
  studentName: string;
  studentClass: string;
  score: number;
  totalQuestions: number;
  answers: {
    questionId: string;
    selectedOption: number;
    isCorrect: boolean;
  }[];
  completedAt: string;
}

export interface ReflectionSubmission {
  id: string;
  studentName: string;
  studentClass: string;
  understandingLevel: 'Sangat Memahami' | 'Memahami' | 'Cukup Memahami' | 'Masih Memerlukan Bantuan';
  answers: {
    pengetahuanBaru: string;
    bagianPalingMenarik: string;
    metodePalingMudah: string;
    kesulitan: string;
    rencanaTindakLanjut: string;
  };
  submittedAt: string;
}

export interface StudentProgress {
  materialsRead: string[];
  comicProgress: number; // last page read
  challengesScore: {
    tebakAkar: number;
    misiFaktorisasi: number;
    detektifAbc: number;
    tantanganDiskriminan: number;
    battleMatematika: number;
  };
  lastEvaluationScore?: number;
  reflectionCompleted: boolean;
}
