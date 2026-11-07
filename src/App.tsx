import React, { useState, useEffect } from 'react';
import { 
  ComicPublication, 
  LearningObjectiveData, 
  MaterialModule, 
  NavPage, 
  QuizQuestion, 
  ReflectionSubmission, 
  StudentEvaluationResult, 
  StudentProgress, 
  TeacherProfile 
} from './types';
import { 
  getComics, 
  getEvaluationResults, 
  getLearningObjectives, 
  getMaterials, 
  getQuizQuestions, 
  getReflections, 
  getStoredStudentProgress, 
  getTeacherProfile, 
  saveComic, 
  saveEvaluationResult, 
  saveLearningObjectives, 
  saveMaterial, 
  saveQuizQuestion, 
  saveReflection, 
  saveStoredStudentProgress, 
  saveTeacherProfile,
  deleteComic,
  deleteMaterial,
  deleteQuizQuestion
} from './services/storage';
import { Navbar } from './components/Navbar';
import { HomeHero } from './components/HomeHero';
import { UserGuide } from './components/UserGuide';
import { LearningObjectives } from './components/LearningObjectives';
import { ComicReader } from './components/ComicReader';
import { MathLab } from './components/MathLab';
import { MathChallenges } from './components/MathChallenges';
import { FinalEvaluation } from './components/FinalEvaluation';
import { LearningReflection } from './components/LearningReflection';
import { TeacherPanel } from './components/TeacherPanel';
import { TeacherAuthModal } from './components/TeacherAuthModal';
import { 
  DEFAULT_COMIC, 
  DEFAULT_MATERIALS, 
  DEFAULT_OBJECTIVES, 
  DEFAULT_QUIZ_QUESTIONS, 
  DEFAULT_TEACHER_PROFILE, 
  INITIAL_STUDENT_PROGRESS 
} from './data/initialData';

export default function App() {
  const [currentPage, setCurrentPage] = useState<NavPage>('beranda');
  const [teacherProfile, setTeacherProfile] = useState<TeacherProfile>(DEFAULT_TEACHER_PROFILE);
  const [objectives, setObjectives] = useState<LearningObjectiveData>(DEFAULT_OBJECTIVES);
  const [comics, setComics] = useState<ComicPublication[]>([DEFAULT_COMIC]);
  const [materials, setMaterials] = useState<MaterialModule[]>(DEFAULT_MATERIALS);
  const [questions, setQuestions] = useState<QuizQuestion[]>(DEFAULT_QUIZ_QUESTIONS);
  const [evaluationResults, setEvaluationResults] = useState<StudentEvaluationResult[]>([]);
  const [reflections, setReflections] = useState<ReflectionSubmission[]>([]);
  const [studentProgress, setStudentProgress] = useState<StudentProgress>(INITIAL_STUDENT_PROGRESS);

  const [isTeacherAuthenticated, setIsTeacherAuthenticated] = useState<boolean>(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  // Initialize data from IndexedDB
  useEffect(() => {
    async function loadData() {
      try {
        const [prof, obj, com, mat, q, evalRes, ref] = await Promise.all([
          getTeacherProfile(),
          getLearningObjectives(),
          getComics(),
          getMaterials(),
          getQuizQuestions(),
          getEvaluationResults(),
          getReflections()
        ]);
        setTeacherProfile(prof);
        setObjectives(obj);
        setComics(com);
        setMaterials(mat);
        setQuestions(q);
        setEvaluationResults(evalRes);
        setReflections(ref);
        setStudentProgress(getStoredStudentProgress());
      } catch (err) {
        console.error('Error loading initial data from storage:', err);
      } finally {
        setIsLoading(false);
      }
    }
    loadData();
  }, []);

  // Handlers for data updates
  const handleSaveTeacherProfile = async (updated: TeacherProfile) => {
    await saveTeacherProfile(updated);
    setTeacherProfile(updated);
  };

  const handleSaveComic = async (comic: ComicPublication) => {
    await saveComic(comic);
    const updated = await getComics();
    setComics(updated);
  };

  const handleDeleteComic = async (id: string) => {
    await deleteComic(id);
    const updated = await getComics();
    setComics(updated);
  };

  const handleSaveObjectives = async (updated: LearningObjectiveData) => {
    await saveLearningObjectives(updated);
    setObjectives(updated);
  };

  const handleSaveMaterial = async (material: MaterialModule) => {
    await saveMaterial(material);
    const updated = await getMaterials();
    setMaterials(updated);
  };

  const handleDeleteMaterial = async (id: string) => {
    await deleteMaterial(id);
    const updated = await getMaterials();
    setMaterials(updated);
  };

  const handleSaveQuestion = async (question: QuizQuestion) => {
    await saveQuizQuestion(question);
    const updated = await getQuizQuestions();
    setQuestions(updated);
  };

  const handleDeleteQuestion = async (id: string) => {
    await deleteQuizQuestion(id);
    const updated = await getQuizQuestions();
    setQuestions(updated);
  };

  const handleSaveEvaluationResult = async (result: StudentEvaluationResult) => {
    await saveEvaluationResult(result);
    setEvaluationResults((prev) => [result, ...prev]);
    // update student progress
    const updatedProg: StudentProgress = {
      ...studentProgress,
      lastEvaluationScore: result.score
    };
    setStudentProgress(updatedProg);
    saveStoredStudentProgress(updatedProg);
  };

  const handleSaveReflection = async (ref: ReflectionSubmission) => {
    await saveReflection(ref);
    setReflections((prev) => [ref, ...prev]);
    // update student progress
    const updatedProg: StudentProgress = {
      ...studentProgress,
      reflectionCompleted: true
    };
    setStudentProgress(updatedProg);
    saveStoredStudentProgress(updatedProg);
  };

  const handleUpdateChallengeScore = (
    gameKey: keyof StudentProgress['challengesScore'],
    score: number
  ) => {
    const updatedScores = {
      ...studentProgress.challengesScore,
      [gameKey]: score
    };
    const updatedProg = { ...studentProgress, challengesScore: updatedScores };
    setStudentProgress(updatedProg);
    saveStoredStudentProgress(updatedProg);
  };

  const handleMaterialCompleted = (materialId: string) => {
    if (!studentProgress.materialsRead.includes(materialId)) {
      const updated = {
        ...studentProgress,
        materialsRead: [...studentProgress.materialsRead, materialId]
      };
      setStudentProgress(updated);
      saveStoredStudentProgress(updated);
    }
  };

  const handleComicProgress = (pageNumber: number) => {
    const updated = {
      ...studentProgress,
      comicProgress: Math.max(studentProgress.comicProgress, pageNumber)
    };
    setStudentProgress(updated);
    saveStoredStudentProgress(updated);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center text-slate-200 space-y-4">
        <div className="w-12 h-12 border-4 border-amber-400 border-t-transparent rounded-full animate-spin" />
        <p className="font-heading font-bold text-base text-amber-300">
          Memuat LMS Mathematika Adventure SMKN 4 Soppeng...
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col selection:bg-amber-400 selection:text-slate-950">
      
      {/* Top Bar Navigation */}
      <Navbar
        currentPage={currentPage}
        onNavigate={(page) => {
          if (page === 'guru' && !isTeacherAuthenticated) {
            setIsAuthModalOpen(true);
          } else {
            setCurrentPage(page);
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }
        }}
        teacherProfile={teacherProfile}
        isTeacherAuthenticated={isTeacherAuthenticated}
        onOpenTeacherLogin={() => setIsAuthModalOpen(true)}
        onTeacherLogout={() => {
          setIsTeacherAuthenticated(false);
          setCurrentPage('beranda');
        }}
      />

      {/* Main Container Viewport */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6">
        {currentPage === 'beranda' && (
          <HomeHero
            teacherProfile={teacherProfile}
            studentProgress={studentProgress}
            onNavigate={(page) => {
              setCurrentPage(page);
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          />
        )}

        {currentPage === 'petunjuk' && (
          <UserGuide
            onNavigate={(page) => {
              setCurrentPage(page);
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          />
        )}

        {currentPage === 'tujuan' && (
          <LearningObjectives
            objectives={objectives}
            isTeacherAuthenticated={isTeacherAuthenticated}
            onSaveObjectives={handleSaveObjectives}
            onNavigate={(page) => {
              setCurrentPage(page);
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            onOpenTeacherLogin={() => setIsAuthModalOpen(true)}
          />
        )}

        {currentPage === 'komik' && (
          <ComicReader
            comics={comics}
            onNavigate={(page) => {
              setCurrentPage(page);
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            onUpdateProgress={handleComicProgress}
            initialPage={studentProgress.comicProgress || 1}
          />
        )}

        {currentPage === 'laboratorium' && (
          <MathLab
            materials={materials}
            onNavigate={(page) => {
              setCurrentPage(page);
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            onMaterialCompleted={handleMaterialCompleted}
            completedMaterials={studentProgress.materialsRead}
          />
        )}

        {currentPage === 'tantangan' && (
          <MathChallenges
            studentProgress={studentProgress}
            onUpdateScore={handleUpdateChallengeScore}
            onNavigate={(page) => {
              setCurrentPage(page);
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          />
        )}

        {currentPage === 'evaluasi' && (
          <FinalEvaluation
            questions={questions}
            onSaveResult={handleSaveEvaluationResult}
            onNavigate={(page) => {
              setCurrentPage(page);
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          />
        )}

        {currentPage === 'refleksi' && (
          <LearningReflection
            onSaveReflection={handleSaveReflection}
            onNavigate={(page) => {
              setCurrentPage(page);
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          />
        )}

        {currentPage === 'guru' && isTeacherAuthenticated && (
          <TeacherPanel
            teacherProfile={teacherProfile}
            comics={comics}
            materials={materials}
            questions={questions}
            evaluationResults={evaluationResults}
            reflections={reflections}
            onSaveTeacherProfile={handleSaveTeacherProfile}
            onSaveComic={handleSaveComic}
            onDeleteComic={handleDeleteComic}
            onSaveMaterial={handleSaveMaterial}
            onDeleteMaterial={handleDeleteMaterial}
            onSaveQuestion={handleSaveQuestion}
            onDeleteQuestion={handleDeleteQuestion}
            onLogout={() => {
              setIsTeacherAuthenticated(false);
              setCurrentPage('beranda');
            }}
          />
        )}
      </main>

      {/* Teacher Authentication Modal */}
      <TeacherAuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        onAuthenticated={() => {
          setIsTeacherAuthenticated(true);
          setCurrentPage('guru');
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
      />

      {/* Quiet Anti-Slop Educational Footer */}
      <footer className="mt-auto border-t border-slate-900 bg-slate-950/80 py-8 text-xs text-slate-400">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-4 text-center sm:text-left">
            <span className="font-heading font-extrabold text-white tracking-tight">
              MATHEMATIKA ADVENTURE
            </span>
            <span className="hidden sm:inline text-slate-600">·</span>
            <span>{teacherProfile.seriesTitle}</span>
            <span className="hidden sm:inline text-slate-600">·</span>
            <span>{teacherProfile.topicTitle}</span>
          </div>

          <div className="text-center sm:text-right text-slate-400 text-[11px]">
            Created by <strong className="text-slate-200">{teacherProfile.name}</strong> · {teacherProfile.school} ({teacherProfile.year})
          </div>
        </div>
      </footer>

    </div>
  );
}
