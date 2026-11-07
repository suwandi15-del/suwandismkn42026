import {
  ComicPublication,
  LearningObjectiveData,
  MaterialModule,
  QuizQuestion,
  ReflectionSubmission,
  StudentEvaluationResult,
  StudentProgress,
  TeacherProfile
} from '../types';
import {
  DEFAULT_COMIC,
  DEFAULT_MATERIALS,
  DEFAULT_OBJECTIVES,
  DEFAULT_QUIZ_QUESTIONS,
  DEFAULT_TEACHER_PROFILE,
  INITIAL_STUDENT_PROGRESS
} from '../data/initialData';

const DB_NAME = 'MathematikaAdventureDB';
const DB_VERSION = 1;

function openDB(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    if (typeof window === 'undefined' || !window.indexedDB) {
      reject(new Error('IndexedDB not supported'));
      return;
    }
    const request = indexedDB.open(DB_NAME, DB_VERSION);

    request.onupgradeneeded = (event) => {
      const db = (event.target as IDBOpenDBRequest).result;
      if (!db.objectStoreNames.contains('settings')) {
        db.createObjectStore('settings', { keyPath: 'key' });
      }
      if (!db.objectStoreNames.contains('comics')) {
        db.createObjectStore('comics', { keyPath: 'id' });
      }
      if (!db.objectStoreNames.contains('materials')) {
        db.createObjectStore('materials', { keyPath: 'id' });
      }
      if (!db.objectStoreNames.contains('questions')) {
        db.createObjectStore('questions', { keyPath: 'id' });
      }
      if (!db.objectStoreNames.contains('evaluationResults')) {
        db.createObjectStore('evaluationResults', { keyPath: 'id' });
      }
      if (!db.objectStoreNames.contains('reflections')) {
        db.createObjectStore('reflections', { keyPath: 'id' });
      }
    };

    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
}

async function idbGet<T>(storeName: string, key: string): Promise<T | null> {
  try {
    const db = await openDB();
    return new Promise((resolve) => {
      const tx = db.transaction(storeName, 'readonly');
      const store = tx.objectStore(storeName);
      const req = store.get(key);
      req.onsuccess = () => resolve(req.result ? (req.result.value ?? req.result) : null);
      req.onerror = () => resolve(null);
    });
  } catch {
    const raw = localStorage.getItem(`${DB_NAME}_${storeName}_${key}`);
    return raw ? JSON.parse(raw) : null;
  }
}

async function idbGetAll<T>(storeName: string): Promise<T[]> {
  try {
    const db = await openDB();
    return new Promise((resolve) => {
      const tx = db.transaction(storeName, 'readonly');
      const store = tx.objectStore(storeName);
      const req = store.getAll();
      req.onsuccess = () => resolve(req.result || []);
      req.onerror = () => resolve([]);
    });
  } catch {
    const raw = localStorage.getItem(`${DB_NAME}_${storeName}_all`);
    return raw ? JSON.parse(raw) : [];
  }
}

async function idbSet<T>(storeName: string, item: T): Promise<void> {
  try {
    const db = await openDB();
    return new Promise((resolve, reject) => {
      const tx = db.transaction(storeName, 'readwrite');
      const store = tx.objectStore(storeName);
      const req = store.put(item);
      req.onsuccess = () => resolve();
      req.onerror = () => reject(req.error);
    });
  } catch {
    // fallback
  }
}

async function idbDelete(storeName: string, key: string): Promise<void> {
  try {
    const db = await openDB();
    return new Promise((resolve, reject) => {
      const tx = db.transaction(storeName, 'readwrite');
      const store = tx.objectStore(storeName);
      const req = store.delete(key);
      req.onsuccess = () => resolve();
      req.onerror = () => reject(req.error);
    });
  } catch {
    // fallback
  }
}

// Teacher Profile
export async function getTeacherProfile(): Promise<TeacherProfile> {
  const data = await idbGet<TeacherProfile>('settings', 'teacherProfile');
  if (data && data.name) return data;
  return DEFAULT_TEACHER_PROFILE;
}

export async function saveTeacherProfile(profile: TeacherProfile): Promise<void> {
  await idbSet('settings', { key: 'teacherProfile', ...profile });
}

// Learning Objectives
export async function getLearningObjectives(): Promise<LearningObjectiveData> {
  const data = await idbGet<LearningObjectiveData>('settings', 'learningObjectives');
  if (data && data.capaianPembelajaran) return data;
  return DEFAULT_OBJECTIVES;
}

export async function saveLearningObjectives(objectives: LearningObjectiveData): Promise<void> {
  await idbSet('settings', { key: 'learningObjectives', ...objectives });
}

// Comics
export async function getComics(): Promise<ComicPublication[]> {
  const items = await idbGetAll<ComicPublication>('comics');
  if (items.length > 0) {
    return items;
  }
  // Store default
  await saveComic(DEFAULT_COMIC);
  return [DEFAULT_COMIC];
}

export async function saveComic(comic: ComicPublication): Promise<void> {
  await idbSet('comics', comic);
}

export async function deleteComic(id: string): Promise<void> {
  await idbDelete('comics', id);
}

// Materials
export async function getMaterials(): Promise<MaterialModule[]> {
  const items = await idbGetAll<MaterialModule>('materials');
  if (items.length > 0) {
    return items.sort((a, b) => a.number - b.number);
  }
  for (const m of DEFAULT_MATERIALS) {
    await idbSet('materials', m);
  }
  return DEFAULT_MATERIALS;
}

export async function saveMaterial(material: MaterialModule): Promise<void> {
  await idbSet('materials', material);
}

export async function deleteMaterial(id: string): Promise<void> {
  await idbDelete('materials', id);
}

// Questions
export async function getQuizQuestions(): Promise<QuizQuestion[]> {
  const items = await idbGetAll<QuizQuestion>('questions');
  if (items.length > 0) {
    return items.sort((a, b) => a.number - b.number);
  }
  for (const q of DEFAULT_QUIZ_QUESTIONS) {
    await idbSet('questions', q);
  }
  return DEFAULT_QUIZ_QUESTIONS;
}

export async function saveQuizQuestion(question: QuizQuestion): Promise<void> {
  await idbSet('questions', question);
}

export async function deleteQuizQuestion(id: string): Promise<void> {
  await idbDelete('questions', id);
}

// Student Evaluations
export async function getEvaluationResults(): Promise<StudentEvaluationResult[]> {
  const items = await idbGetAll<StudentEvaluationResult>('evaluationResults');
  return items.sort((a, b) => new Date(b.completedAt).getTime() - new Date(a.completedAt).getTime());
}

export async function saveEvaluationResult(result: StudentEvaluationResult): Promise<void> {
  await idbSet('evaluationResults', result);
}

// Reflections
export async function getReflections(): Promise<ReflectionSubmission[]> {
  const items = await idbGetAll<ReflectionSubmission>('reflections');
  return items.sort((a, b) => new Date(b.submittedAt).getTime() - new Date(a.submittedAt).getTime());
}

export async function saveReflection(ref: ReflectionSubmission): Promise<void> {
  await idbSet('reflections', ref);
}

// Student Progress
export function getStoredStudentProgress(): StudentProgress {
  try {
    const raw = localStorage.getItem('mathematika_student_progress');
    return raw ? JSON.parse(raw) : INITIAL_STUDENT_PROGRESS;
  } catch {
    return INITIAL_STUDENT_PROGRESS;
  }
}

export function saveStoredStudentProgress(progress: StudentProgress): void {
  try {
    localStorage.setItem('mathematika_student_progress', JSON.stringify(progress));
  } catch {
    // fallback
  }
}

// CSV Exporter for Results
export function exportResultsToCSV(results: StudentEvaluationResult[], reflections: ReflectionSubmission[]): void {
  const reflectionMap = new Map<string, ReflectionSubmission>();
  reflections.forEach((r) => {
    reflectionMap.set(`${r.studentName}_${r.studentClass}`, r);
  });

  const headers = [
    'No',
    'Nama Murid',
    'Kelas',
    'Skor Evaluasi (/100)',
    'Status Kelulusan (KKTP >= 75)',
    'Tingkat Pemahaman Refleksi',
    'Metode Paling Mudah',
    'Kendala Yang Dihadapi',
    'Tanggal Pengerjaan'
  ];

  const rows = results.map((res, idx) => {
    const ref = reflectionMap.get(`${res.studentName}_${res.studentClass}`);
    const isPassed = res.score >= 75 ? 'Tuntas' : 'Perlu Bimbingan';
    return [
      idx + 1,
      `"${res.studentName.replace(/"/g, '""')}"`,
      `"${res.studentClass.replace(/"/g, '""')}"`,
      res.score,
      `"${isPassed}"`,
      `"${ref?.understandingLevel || 'Belum Refleksi'}"`,
      `"${ref?.answers.metodePalingMudah ? ref.answers.metodePalingMudah.replace(/"/g, '""') : '-'}"`,
      `"${ref?.answers.kesulitan ? ref.answers.kesulitan.replace(/"/g, '""') : '-'}"`,
      `"${new Date(res.completedAt).toLocaleString('id-ID')}"`
    ].join(',');
  });

  const csvContent = 'data:text/csv;charset=utf-8,\uFEFF' + [headers.join(','), ...rows].join('\n');
  const encodedUri = encodeURI(csvContent);
  const link = document.createElement('a');
  link.setAttribute('href', encodedUri);
  link.setAttribute('download', `Rekap_Nilai_Matematika_SMKN4_Soppeng_${new Date().toISOString().slice(0, 10)}.csv`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}
