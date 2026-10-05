import React, { useState, useEffect } from 'react';
import { StudentProfile } from './types/student';
import { Question } from './types/question';
import { StorageService } from './services/storageService';
import { GeneratorService, SetGenerationOptions } from './services/generatorService';
import { RecommenderService } from './services/recommenderService';
import { Header } from './components/layout/Header';
import { Navigation, NavTab } from './components/layout/Navigation';
import { ProfileModal } from './components/layout/ProfileModal';
import { MorningChallenge } from './components/morning/MorningChallenge';
import { SetConfigurator } from './components/practice/SetConfigurator';
import { ProblemCard } from './components/practice/ProblemCard';
import { PrintWorksheet } from './components/practice/PrintWorksheet';
import { MarkingLoggerModal } from './components/practice/MarkingLoggerModal';
import { CurriculumExplorer } from './components/curriculum/CurriculumExplorer';
import { MasteryMatrix } from './components/progress/MasteryMatrix';
import { SessionHistory } from './components/progress/SessionHistory';
import { FocusNextCard } from './components/recommendations/FocusNextCard';
import { CustomQuestionRequestModal } from './components/custom/CustomQuestionRequestModal';
import { 
  Zap, 
  FileText, 
  Printer, 
  Edit3, 
  Sparkles, 
  ArrowRight
} from 'lucide-react';

const getInitialTab = (): NavTab => {
  const hash = window.location.hash.replace('#', '') as NavTab;
  const validTabs: NavTab[] = ['dashboard', 'morning', 'practice', 'curriculum', 'history'];
  return validTabs.includes(hash) ? hash : 'dashboard';
};

export const App: React.FC = () => {
  // State
  const [students, setStudents] = useState<StudentProfile[]>([]);
  const [activeStudentId, setActiveStudentId] = useState<string>('');
  const [activeTab, setActiveTab] = useState<NavTab>(getInitialTab);
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
  const [isRequestModalOpen, setIsRequestModalOpen] = useState(false);
  const [requestTopicId, setRequestTopicId] = useState<string | undefined>(undefined);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [refreshKey, setRefreshKey] = useState(0);

  // Practice state with sessionStorage persistence across refreshes
  const [problemSet, setProblemSet] = useState<Question[]>(() => {
    try {
      const saved = sessionStorage.getItem('gcse_active_problem_set');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });
  const [currentTopicId, setCurrentTopicId] = useState<string | undefined>(() => {
    try {
      return sessionStorage.getItem('gcse_active_topic_id') || undefined;
    } catch {
      return undefined;
    }
  });
  const [isPrintView, setIsPrintView] = useState(false);
  const [isMarkingModalOpen, setIsMarkingModalOpen] = useState(false);

  const handleOpenRequestModal = (topicId?: string) => {
    setRequestTopicId(topicId);
    setIsRequestModalOpen(true);
  };

  // Sync activeTab with URL hash
  const changeTab = (tab: NavTab) => {
    setActiveTab(tab);
    if (window.location.hash !== `#${tab}`) {
      window.location.hash = tab;
    }
  };

  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace('#', '') as NavTab;
      const validTabs: NavTab[] = ['dashboard', 'morning', 'practice', 'curriculum', 'history'];
      if (validTabs.includes(hash)) {
        setActiveTab(hash);
      }
    };
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  // Persist problem set to sessionStorage
  useEffect(() => {
    try {
      if (problemSet.length > 0) {
        sessionStorage.setItem('gcse_active_problem_set', JSON.stringify(problemSet));
      } else {
        sessionStorage.removeItem('gcse_active_problem_set');
      }
    } catch (e) {
      console.error('Failed to save problem set to sessionStorage', e);
    }
  }, [problemSet]);

  useEffect(() => {
    try {
      if (currentTopicId) {
        sessionStorage.setItem('gcse_active_topic_id', currentTopicId);
      } else {
        sessionStorage.removeItem('gcse_active_topic_id');
      }
    } catch (e) {
      console.error('Failed to save topic ID to sessionStorage', e);
    }
  }, [currentTopicId]);

  // Initialize and load storage
  useEffect(() => {
    const loadedStudents = StorageService.getStudents();
    setStudents(loadedStudents);
    const activeId = StorageService.getActiveStudentId();
    setActiveStudentId(activeId);
  }, [refreshKey]);

  const handleDataRefresh = () => {
    setRefreshKey(prev => prev + 1);
  };

  const activeStudent = students.find(s => s.id === activeStudentId) || students[0];
  const activeStreak = activeStudent ? StorageService.getStreak(activeStudent.id) : { studentId: '', currentStreak: 0, bestStreak: 0, lastCompletedDate: '' };

  const handleSelectStudent = (id: string) => {
    StorageService.setActiveStudentId(id);
    setActiveStudentId(id);
    // Reset problem set when switching student
    setProblemSet([]);
    setCurrentTopicId(undefined);
    sessionStorage.removeItem('gcse_active_problem_set');
    sessionStorage.removeItem('gcse_active_topic_id');
  };

  const handleAddStudent = (data: Omit<StudentProfile, 'id' | 'createdAt'>) => {
    const created = StorageService.addStudent(data);
    handleDataRefresh();
    handleSelectStudent(created.id);
  };

  const handleUpdateStudent = (updated: StudentProfile) => {
    StorageService.updateStudent(updated);
    handleDataRefresh();
  };

  const handleDeleteStudent = (id: string) => {
    StorageService.deleteStudent(id);
    handleDataRefresh();
  };

  const handleGenerateProblemSet = (options: SetGenerationOptions) => {
    const questions = GeneratorService.generateProblemSet(options);
    setProblemSet(questions);
    setCurrentTopicId(options.topicId);
    changeTab('practice');
  };

  const handlePracticeTopicFromCurriculum = (topicId: string) => {
    handleGenerateProblemSet({
      mode: 'topic',
      topicId,
      count: 3
    });
  };

  const handleRecommendSimilar = (question: Question) => {
    const similar = GeneratorService.getSimilarQuestions(question, 3);
    // Create a targeted set starting with the favored question followed by similar ones
    const newSet = [question, ...similar];
    setProblemSet(newSet);
    setCurrentTopicId(question.topicId);
    changeTab('practice');

    setTimeout(() => {
      const el = document.getElementById('problem-set-container');
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, 100);
  };

  if (!activeStudent) {
    return <div className="p-12 text-center text-slate-500">Loading student profiles...</div>;
  }

  const recommendations = RecommenderService.getRecommendations(activeStudent.id);
  const recentSessions = StorageService.getSessionsForStudent(activeStudent.id).slice(0, 3);
  const masteryMap = StorageService.getMasteryForStudent(activeStudent.id);
  const masteredCount = Object.values(masteryMap).filter(m => m.status === 'mastered').length;
  const secureCount = Object.values(masteryMap).filter(m => m.status === 'secure').length;

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      {/* Top App Header */}
      <Header
        students={students}
        activeStudent={activeStudent}
        activeStreak={activeStreak}
        onSelectStudent={handleSelectStudent}
        onOpenProfileModal={() => setIsProfileModalOpen(true)}
        onOpenRequestModal={() => handleOpenRequestModal()}
        isMobileMenuOpen={isMobileMenuOpen}
        setIsMobileMenuOpen={setIsMobileMenuOpen}
        onDataRefresh={handleDataRefresh}
      />

      {/* Main Navigation Bar */}
      <Navigation
        activeTab={activeTab}
        setActiveTab={changeTab}
        isMobileMenuOpen={isMobileMenuOpen}
        setIsMobileMenuOpen={setIsMobileMenuOpen}
        onOpenProfileModal={() => setIsProfileModalOpen(true)}
      />

      {/* Profile Management Modal */}
      <ProfileModal
        isOpen={isProfileModalOpen}
        onClose={() => setIsProfileModalOpen(false)}
        students={students}
        activeStudentId={activeStudent.id}
        onSelectStudent={handleSelectStudent}
        onAddStudent={handleAddStudent}
        onUpdateStudent={handleUpdateStudent}
        onDeleteStudent={handleDeleteStudent}
      />

      {/* Custom Question Request & Direct Add Modal */}
      <CustomQuestionRequestModal
        isOpen={isRequestModalOpen}
        onClose={() => setIsRequestModalOpen(false)}
        students={students}
        initialTopicId={requestTopicId}
        onQuestionAdded={() => {
          handleDataRefresh();
        }}
      />

      {/* Main Content Area */}
      <main className="flex-1">
        {/* ================================================= */}
        {/* TAB 1: DASHBOARD & FOCUS NEXT */}
        {/* ================================================= */}
        {activeTab === 'dashboard' && (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 space-y-8">
            {/* Student Hero Banner */}
            <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 text-white rounded-3xl p-6 sm:p-8 shadow-xl relative overflow-hidden">
              <div className="absolute top-0 right-0 -mr-12 -mt-12 w-64 h-64 bg-indigo-500/10 rounded-full blur-2xl pointer-events-none" />

              <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <span className="text-3xl">{activeStudent.avatarEmoji}</span>
                    <span className="text-xs font-bold uppercase tracking-wider bg-white/10 px-3 py-1 rounded-full border border-white/10">
                      Year {activeStudent.yearGroup} • Age {activeStudent.age}
                    </span>
                  </div>
                  <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
                    Welcome back, {activeStudent.name}!
                  </h1>
                  <p className="text-slate-300 text-sm max-w-xl">
                    Targeting GCSE Higher Distinction & UKMT Lateral Thinking. {masteredCount} topics mastered, {secureCount} secure.
                  </p>
                </div>

                {/* Quick Action Buttons */}
                <div className="flex flex-wrap gap-2.5 w-full md:w-auto">
                  <button
                    onClick={() => changeTab('morning')}
                    className="flex-1 sm:flex-initial flex items-center justify-center gap-2 px-5 py-3 rounded-2xl bg-amber-500 hover:bg-amber-600 text-white font-bold text-xs sm:text-sm shadow-md transition-all active:scale-95"
                  >
                    <Zap className="w-4 h-4 fill-white" />
                    Morning 5-Min Stretch
                  </button>

                  <button
                    onClick={() => changeTab('practice')}
                    className="flex-1 sm:flex-initial flex items-center justify-center gap-2 px-5 py-3 rounded-2xl bg-brand-600 hover:bg-brand-700 text-white font-bold text-xs sm:text-sm shadow-md transition-all active:scale-95"
                  >
                    <FileText className="w-4 h-4" />
                    New Problem Set
                  </button>
                </div>
              </div>
            </div>

            {/* Smart Focus Next Section */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-xl font-extrabold text-slate-900 tracking-tight flex items-center gap-2">
                    <Sparkles className="w-5 h-5 text-brand-600" />
                    Smart Focus: Recommended Next Sessions
                  </h2>
                  <p className="text-xs text-slate-500">
                    Calculated from recent performance, tutor observation notes, and spaced repetition intervals
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {recommendations.map(rec => (
                  <FocusNextCard
                    key={rec.id}
                    recommendation={rec}
                    onLaunch={(topicId) => {
                      handleGenerateProblemSet({
                        mode: 'topic',
                        topicId,
                        count: rec.questionCount
                      });
                    }}
                  />
                ))}
              </div>
            </div>

            {/* Recent Tutoring Sessions & Tutor Notes */}
            <div className="space-y-4 pt-4 border-t border-slate-200">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-bold text-slate-900">
                  Recent Tutoring Observations
                </h3>
                <button
                  onClick={() => changeTab('history')}
                  className="text-xs font-semibold text-brand-600 hover:text-brand-800 flex items-center gap-1"
                >
                  View full history <ArrowRight className="w-3 h-3" />
                </button>
              </div>

              {recentSessions.length === 0 ? (
                <div className="bg-white rounded-2xl border border-slate-200 p-6 text-center text-slate-400 text-xs">
                  No sessions recorded yet. Launch a problem set or morning challenge to start logging!
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {recentSessions.map(s => (
                    <div key={s.id} className="bg-white p-4 rounded-2xl border border-slate-200 space-y-2">
                      <div className="flex items-center justify-between text-xs text-slate-400">
                        <span>{s.date}</span>
                        <span className="font-bold text-brand-600">{s.percentage}%</span>
                      </div>
                      <h4 className="font-bold text-sm text-slate-900 truncate">{s.topicTitle}</h4>
                      {s.tutorNotes && (
                        <p className="text-xs text-slate-600 italic line-clamp-2">"{s.tutorNotes}"</p>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

        {/* ================================================= */}
        {/* TAB 2: MORNING 5-MIN QUICK STRETCH */}
        {/* ================================================= */}
        {activeTab === 'morning' && (
          <MorningChallenge
            student={activeStudent}
            onDataRefresh={handleDataRefresh}
            onNavigateToTopic={(topicId) => {
              handlePracticeTopicFromCurriculum(topicId);
            }}
            onRecommendSimilar={handleRecommendSimilar}
          />
        )}

        {/* ================================================= */}
        {/* TAB 3: PRACTICE SETS & WORKSHEET */}
        {/* ================================================= */}
        {activeTab === 'practice' && (
          <div className="max-w-5xl mx-auto px-4 sm:px-6 py-6 sm:py-8 space-y-8">
            {/* If in Printable Worksheet view */}
            {isPrintView ? (
              <PrintWorksheet
                questions={problemSet}
                student={activeStudent}
                topicTitle={currentTopicId ? GeneratorService.getTopicTitle(currentTopicId) : 'Mixed GCSE Stretch'}
                onBack={() => setIsPrintView(false)}
              />
            ) : (
              <>
                {/* Problem Set Configurator (Collapsible/Top) */}
                <SetConfigurator
                  student={activeStudent}
                  initialTopicId={currentTopicId}
                  onGenerate={handleGenerateProblemSet}
                  onOpenRequestModal={() => handleOpenRequestModal(currentTopicId)}
                />

                {/* Generated Problem Set Display */}
                {problemSet.length > 0 && (
                  <div id="problem-set-container" className="space-y-6 scroll-mt-20">
                    {/* Action Bar for Set */}
                    <div className="bg-slate-900 text-white rounded-3xl p-5 sm:p-6 shadow-md flex flex-wrap items-center justify-between gap-4">
                      <div>
                        <span className="text-xs font-bold uppercase tracking-wider text-brand-400 block mb-1">
                          Active Problem Set
                        </span>
                        <h2 className="text-xl font-bold">
                          {currentTopicId ? GeneratorService.getTopicTitle(currentTopicId) : 'Mixed GCSE Stretch'} ({problemSet.length} Questions)
                        </h2>
                      </div>

                      <div className="flex flex-wrap items-center gap-2.5">
                        <button
                          onClick={() => setIsPrintView(true)}
                          className="flex items-center gap-2 px-4 py-2.5 bg-slate-800 hover:bg-slate-700 text-white rounded-xl text-xs font-bold border border-slate-700 transition-colors"
                        >
                          <Printer className="w-4 h-4 text-brand-400" />
                          <span>Printable Worksheet</span>
                        </button>

                        <button
                          onClick={() => setIsMarkingModalOpen(true)}
                          className="flex items-center gap-2 px-5 py-2.5 bg-brand-600 hover:bg-brand-500 text-white rounded-xl text-xs font-bold shadow-sm transition-all"
                        >
                          <Edit3 className="w-4 h-4" />
                          <span>Log Pen & Paper Marks & Notes</span>
                        </button>
                      </div>
                    </div>

                    {/* Question Cards */}
                    <div className="space-y-6">
                      {problemSet.map((q, idx) => (
                        <ProblemCard
                          key={q.id}
                          question={q}
                          index={idx}
                          total={problemSet.length}
                          onRecommendSimilar={handleRecommendSimilar}
                        />
                      ))}
                    </div>

                    {/* Bottom Log Results CTA */}
                    <div className="text-center pt-4">
                      <button
                        onClick={() => setIsMarkingModalOpen(true)}
                        className="inline-flex items-center gap-2 px-8 py-3.5 bg-brand-600 hover:bg-brand-700 text-white rounded-2xl text-sm font-bold shadow-md hover:shadow-lg transition-all"
                      >
                        <Edit3 className="w-4 h-4" />
                        Finished Working? Log Pen & Paper Marks & Notes
                      </button>
                    </div>
                  </div>
                )}
              </>
            )}

            {/* Marking Logger Modal */}
            <MarkingLoggerModal
              isOpen={isMarkingModalOpen}
              onClose={() => setIsMarkingModalOpen(false)}
              questions={problemSet}
              student={activeStudent}
              allStudents={students}
              topicId={currentTopicId}
              onSessionLogged={() => {
                handleDataRefresh();
                changeTab('history');
              }}
            />
          </div>
        )}

        {/* ================================================= */}
        {/* TAB 4: CURRICULUM TREE EXPLORER */}
        {/* ================================================= */}
        {activeTab === 'curriculum' && (
          <CurriculumExplorer
            student={activeStudent}
            onPracticeTopic={handlePracticeTopicFromCurriculum}
            onRequestCustomTopic={(topicId) => handleOpenRequestModal(topicId)}
          />
        )}

        {/* ================================================= */}
        {/* TAB 5: MASTERY HEATMAP & HISTORY LOG */}
        {/* ================================================= */}
        {activeTab === 'history' && (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 space-y-8">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="text-xs font-bold uppercase tracking-wider text-brand-600 bg-brand-50 px-3 py-1 rounded-full border border-brand-200">
                  Progress & Observation Log
                </span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                {activeStudent.name}'s Mastery & Tutoring History
              </h1>
              <p className="text-slate-600 text-sm mt-1 max-w-2xl">
                Review scores, dates, and qualitative notes recorded during pen-and-paper tutoring sessions.
              </p>
            </div>

            <div className="space-y-8">
              <section className="space-y-4">
                <h2 className="text-lg font-bold text-slate-900">
                  Topic Mastery Heatmap
                </h2>
                <MasteryMatrix
                  student={activeStudent}
                  onPracticeTopic={handlePracticeTopicFromCurriculum}
                />
              </section>

              <section className="space-y-4 pt-6 border-t border-slate-200">
                <h2 className="text-lg font-bold text-slate-900">
                  Chronological Tutoring Session Log & Notes
                </h2>
                <SessionHistory
                  student={activeStudent}
                  onDataRefresh={handleDataRefresh}
                />
              </section>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default App;
