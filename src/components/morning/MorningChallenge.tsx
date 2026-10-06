import React, { useState, useEffect } from 'react';
import { StudentProfile } from '../../types/student';
import { Question } from '../../types/question';
import { GeneratorService } from '../../services/generatorService';
import { StorageService } from '../../services/storageService';
import { MathText } from '../common/MathText';
import { CitationLink } from '../common/CitationLink';
import confetti from 'canvas-confetti';
import { 
  Flame, 
  Clock, 
  Eye, 
  EyeOff,
  HelpCircle, 
  CheckCircle2, 
  RefreshCw, 
  Sparkles,
  ChevronRight,
  SkipForward
} from 'lucide-react';

interface MorningChallengeProps {
  student: StudentProfile;
  onDataRefresh: () => void;
  onNavigateToTopic?: (topicId: string) => void;
  onNavigateToPractice?: () => void;
  onRecommendSimilar?: (question: Question) => void;
}

export const MorningChallenge: React.FC<MorningChallengeProps> = ({
  student,
  onDataRefresh,
  onNavigateToTopic,
  onNavigateToPractice,
  onRecommendSimilar
}) => {
  const [morningTier, setMorningTier] = useState<'grade_5_6' | 'grade_7'>('grade_5_6');
  const [question, setQuestion] = useState<Question | null>(null);
  const [hintLevel, setHintLevel] = useState(0);
  const [showSolution, setShowSolution] = useState(false);
  const [loggedStatus, setLoggedStatus] = useState<string | null>(null);

  // Timer state (default 3 mins for morning warm-up)
  const [timerDuration, setTimerDuration] = useState<180 | 300>(180);
  const [seconds, setSeconds] = useState(180);
  const [isTimerRunning, setIsTimerRunning] = useState(false);

  // Fetch question on student change or load
  const loadNewQuestion = (tier: 'grade_5_6' | 'grade_7' = morningTier) => {
    const q = GeneratorService.getMorningQuickQuestion(tier, question?.id);
    setQuestion(q);
    setHintLevel(0);
    setShowSolution(false);
    setLoggedStatus(null);
    setSeconds(timerDuration);
    setIsTimerRunning(false);
  };

  const handleTierChange = (newTier: 'grade_5_6' | 'grade_7') => {
    setMorningTier(newTier);
    loadNewQuestion(newTier);
  };

  const handleTimerDurationChange = (newDuration: 180 | 300) => {
    setTimerDuration(newDuration);
    setSeconds(newDuration);
    setIsTimerRunning(false);
  };

  useEffect(() => {
    loadNewQuestion();
  }, [student.id]);

  useEffect(() => {
    let interval: any = null;
    if (isTimerRunning && seconds > 0) {
      interval = setInterval(() => {
        setSeconds((prev) => prev - 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isTimerRunning, seconds]);

  const toggleTimer = () => setIsTimerRunning(!isTimerRunning);

  const formatTimer = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  const handleRecordResult = (resultType: 'nailed_it' | 'needed_hint' | 'concept_gap' | 'skipped') => {
    if (!question) return;

    const isSkipped = resultType === 'skipped';
    // Record session
    const earnedMarks = resultType === 'nailed_it' 
      ? question.maxMarks 
      : resultType === 'needed_hint' 
        ? Math.max(1, question.maxMarks - 1) 
        : 0;

    StorageService.saveSession({
      id: `session_morning_${Date.now()}`,
      studentId: student.id,
      date: new Date().toISOString().split('T')[0],
      timestamp: Date.now(),
      mode: 'morning_quick',
      topicId: question.topicId,
      topicTitle: GeneratorService.getTopicTitle(question.topicId),
      questionsAttempted: isSkipped ? 0 : 1,
      totalMarks: question.maxMarks,
      earnedMarks,
      percentage: isSkipped ? 0 : Math.round((earnedMarks / question.maxMarks) * 100),
      tutorNotes: isSkipped
        ? `Morning Warm-up: Question was skipped by ${student.name}.`
        : `Morning Quick Warm-up: ${resultType === 'nailed_it' ? 'Completed independently in morning drill.' : resultType === 'needed_hint' ? 'Needed a clue to spot key step.' : 'Challenging morning puzzle - plan for weekend session.'}`,
      questionResults: [
        {
          questionId: question.id,
          earnedMarks,
          maxMarks: question.maxMarks,
          rating: resultType
        }
      ]
    });

    if (!isSkipped) {
      // Update streak
      StorageService.recordMorningCompletion(student.id);

      // Fire celebratory confetti!
      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.6 }
      });
    }

    setLoggedStatus(resultType);
    onDataRefresh();
  };

  if (!question) {
    return (
      <div className="p-12 text-center text-slate-500">
        <RefreshCw className="w-6 h-6 animate-spin mx-auto mb-2" />
        <p>Loading morning stretch question...</p>
      </div>
    );
  }

  const streak = StorageService.getStreak(student.id);

  return (
    <div className="max-w-3xl mx-auto px-4 py-6 sm:py-8 space-y-6">
      {/* Morning Header */}
      <div className="bg-gradient-to-r from-amber-500 to-orange-500 text-white rounded-3xl p-6 sm:p-8 shadow-lg relative overflow-hidden">
        <div className="absolute top-0 right-0 -mr-8 -mt-8 w-40 h-40 bg-white/10 rounded-full blur-xl pointer-events-none" />
        
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="text-2xl">{student.avatarEmoji}</span>
              <span className="text-xs font-bold uppercase tracking-wider bg-white/20 px-3 py-1 rounded-full">
                ⚡ 2–3 Min Morning Routine
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              {student.name}'s Morning Warm-up
            </h1>
            <p className="text-white/90 text-sm mt-1 max-w-lg">
              One quick, bite-sized warm-up before school to build speed, accuracy, and confidence. Challenge puzzles are saved for Practice Sets!
            </p>
          </div>

          <div className="bg-white/20 backdrop-blur-md rounded-2xl px-5 py-3 text-center self-stretch sm:self-auto border border-white/20">
            <div className="flex items-center justify-center gap-1.5 text-amber-200">
              <Flame className="w-5 h-5 fill-amber-300 text-amber-300" />
              <span className="text-2xl font-black text-white">{streak.currentStreak}</span>
            </div>
            <p className="text-[11px] font-bold tracking-wider uppercase text-white/80">Day Streak</p>
          </div>
        </div>
      </div>

      {/* Info banner: Math challenge questions reminder */}
      <div className="bg-amber-50/90 border border-amber-200 rounded-2xl p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs text-amber-900 shadow-xs">
        <div className="flex items-center gap-2.5">
          <span className="text-xl">💡</span>
          <div>
            <p className="font-bold text-amber-950">Morning flash cards are kept quick & confidence-boosting!</p>
            <p className="text-amber-800 mt-0.5">Looking for lateral Olympiad puzzles or 5-mark proofs? Head over to <strong>Practice Sets</strong> for weekend study.</p>
          </div>
        </div>
        {onNavigateToPractice && (
          <button
            onClick={onNavigateToPractice}
            className="shrink-0 inline-flex items-center gap-1 text-xs font-bold text-amber-900 bg-white hover:bg-amber-100 border border-amber-200 px-3 py-1.5 rounded-xl transition-all cursor-pointer shadow-2xs self-start sm:self-auto"
          >
            <span>Practice Sets</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        )}
      </div>

      {/* Main Flashcard Card */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-md p-6 sm:p-8 space-y-6 transition-all">
        {/* Tier Selector & Timer Controls */}
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 pb-4">
          {/* Difficulty Tier Tabs */}
          <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-2xl">
            <button
              type="button"
              onClick={() => handleTierChange('grade_5_6')}
              className={`px-3 py-1.5 text-xs font-bold rounded-xl transition-all cursor-pointer ${
                morningTier === 'grade_5_6'
                  ? 'bg-white text-amber-700 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              ⚡ Quick Warm-up (Grades 5–6)
            </button>
            <button
              type="button"
              onClick={() => handleTierChange('grade_7')}
              className={`px-3 py-1.5 text-xs font-bold rounded-xl transition-all cursor-pointer ${
                morningTier === 'grade_7'
                  ? 'bg-white text-amber-700 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              🎯 Grade 7 Fluency
            </button>
          </div>

          {/* Timer Controls */}
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1.5 bg-slate-50 border border-slate-200 px-3 py-1.5 rounded-xl">
              <Clock className="w-4 h-4 text-slate-500" />
              <span className={`font-mono text-sm font-bold ${seconds < 45 ? 'text-rose-600' : 'text-slate-700'}`}>
                {formatTimer(seconds)}
              </span>
              <button
                onClick={toggleTimer}
                className="text-xs font-semibold text-brand-600 hover:text-brand-800 ml-1 px-1.5 py-0.5 rounded hover:bg-slate-200 transition-colors cursor-pointer"
              >
                {isTimerRunning ? 'Pause' : seconds === timerDuration ? 'Start' : 'Resume'}
              </button>
            </div>
            {/* Quick 3m / 5m switcher */}
            <button
              onClick={() => handleTimerDurationChange(timerDuration === 180 ? 300 : 180)}
              className="text-[11px] font-semibold text-slate-500 hover:text-slate-800 bg-slate-100 hover:bg-slate-200 px-2 py-1 rounded-lg border border-slate-200 cursor-pointer"
              title="Toggle timer duration between 3 and 5 minutes"
            >
              {timerDuration === 180 ? '3m' : '5m'}
            </button>
          </div>
        </div>

        {/* Question Topic & Meta */}
        <div className="flex items-center justify-between flex-wrap gap-2 text-xs">
          <div className="flex items-center gap-2">
            <span className="font-bold uppercase px-3 py-1 rounded-full bg-slate-100 text-slate-700">
              {GeneratorService.getTopicTitle(question.topicId)}
            </span>
            <span className="font-semibold text-slate-400">
              {question.calculatorAllowed ? 'Calculator Allowed' : 'Non-Calculator'}
            </span>
          </div>
          <span className="font-bold text-amber-700 bg-amber-50 border border-amber-200/80 px-2.5 py-0.5 rounded-full">
            {question.difficulty === 'grade_5_6' ? 'Grade 5–6 Warm-up' : 'Grade 7 Fluency'} • {question.maxMarks} {question.maxMarks === 1 ? 'Mark' : 'Marks'}
          </span>
        </div>

        {/* Question Title & Prompt */}
        <div className="space-y-4">
          <h2 className="text-lg sm:text-xl font-bold text-slate-900 leading-snug">
            {question.title}
          </h2>
          
          <div className="text-slate-800 text-base sm:text-lg leading-relaxed bg-slate-50/70 p-5 rounded-2xl border border-slate-100 font-normal">
            <MathText content={question.prompt} />
          </div>

          {/* Past Paper Citation Link & Recommendations */}
          <div className="pt-1 flex items-center justify-between flex-wrap gap-2">
            <CitationLink citation={question.citation} />
            <div className="flex items-center gap-3">
              {onRecommendSimilar && (
                <button
                  type="button"
                  onClick={() => onRecommendSimilar(question)}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-violet-50 hover:bg-violet-100 text-violet-700 hover:text-violet-800 text-xs font-bold transition-all border border-violet-200/80 shadow-xs active:scale-95 cursor-pointer"
                  title="Practice more questions like this in a full set"
                >
                  <Sparkles className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
                  <span>More Like This</span>
                </button>
              )}
              <span className="text-xs font-semibold text-slate-400">
                Max Marks: {question.maxMarks}
              </span>
            </div>
          </div>
        </div>

        {/* Hints Drawer */}
        {question.hints && question.hints.length > 0 && (
          <div className="space-y-3 pt-2">
            {hintLevel > 0 && (
              <div className="space-y-2">
                {question.hints.slice(0, hintLevel).map((hint, idx) => (
                  <div key={idx} className="bg-amber-50/90 border border-amber-200 p-4 rounded-2xl text-amber-950 text-sm animate-fadeIn">
                    <div className="flex items-center justify-between mb-1">
                      <p className="font-bold flex items-center gap-1.5 text-amber-800">
                        <HelpCircle className="w-4 h-4 text-amber-600" />
                        Clue {idx + 1}:
                      </p>
                      <button
                        onClick={() => setHintLevel(0)}
                        className="text-xs font-semibold text-amber-700 hover:text-amber-950 flex items-center gap-1 hover:underline cursor-pointer"
                        title="Hide clue immediately"
                      >
                        <EyeOff className="w-3.5 h-3.5" /> Hide Clue
                      </button>
                    </div>
                    <MathText content={hint} />
                  </div>
                ))}
              </div>
            )}

            <div className="flex items-center gap-2 flex-wrap">
              {hintLevel < question.hints.length && !showSolution && (
                <button
                  onClick={() => setHintLevel((prev) => prev + 1)}
                  className="inline-flex items-center gap-2 text-xs font-bold text-amber-700 hover:text-amber-900 bg-amber-50 hover:bg-amber-100 border border-amber-200 px-4 py-2 rounded-xl transition-all cursor-pointer"
                >
                  <HelpCircle className="w-4 h-4" />
                  {hintLevel === 0 ? 'Need a Clue? (Hint 1)' : 'Give Another Clue (Hint 2)'}
                </button>
              )}

              {hintLevel > 0 && (
                <button
                  onClick={() => setHintLevel(0)}
                  className="inline-flex items-center gap-2 text-xs font-bold text-slate-600 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 border border-slate-200 px-4 py-2 rounded-xl transition-all cursor-pointer"
                  title="Hide clues so students cannot see"
                >
                  <EyeOff className="w-4 h-4 text-slate-500" />
                  <span>Hide Clues (Tuck Away)</span>
                </button>
              )}
            </div>
          </div>
        )}

        {/* Worked Solution Reveal */}
        <div className="pt-2">
          {!showSolution ? (
            <button
              onClick={() => setShowSolution(true)}
              className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-2xl bg-indigo-50 hover:bg-indigo-100 text-indigo-700 text-sm font-bold border border-indigo-200/80 transition-all shadow-xs cursor-pointer"
            >
              <Eye className="w-4 h-4" />
              Flip Card & Check Worked Solution
            </button>
          ) : (
            <div className="space-y-4 bg-indigo-50/50 border border-indigo-200 p-5 sm:p-6 rounded-2xl animate-fadeIn">
              <div className="flex items-center justify-between border-b border-indigo-100 pb-3">
                <span className="font-bold text-indigo-900 flex items-center gap-2 text-sm sm:text-base">
                  <CheckCircle2 className="w-5 h-5 text-indigo-600" />
                  Official Mark Scheme & Working
                </span>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-semibold text-indigo-600 bg-indigo-100 px-2.5 py-0.5 rounded-full">
                    Step-by-step
                  </span>
                  <button
                    onClick={() => setShowSolution(false)}
                    className="flex items-center gap-1.5 px-3 py-1 bg-white hover:bg-indigo-100 text-indigo-800 rounded-xl text-xs font-bold border border-indigo-200 transition-colors cursor-pointer shadow-xs"
                    title="Flip card back to hide answer"
                  >
                    <EyeOff className="w-3.5 h-3.5" />
                    <span>Flip Back / Hide</span>
                  </button>
                </div>
              </div>

              <div className="space-y-3">
                {question.solution.steps.map((step, idx) => (
                  <div key={idx} className="bg-white p-3.5 rounded-xl border border-indigo-100 text-sm">
                    <div className="flex items-center justify-between gap-2 mb-1">
                      <div className="font-medium text-slate-800">
                        <MathText content={step.description} />
                      </div>
                      {step.markTag && (
                        <span className="text-[11px] font-bold text-brand-700 bg-brand-50 px-2 py-0.5 rounded border border-brand-200">
                          {step.markTag}
                        </span>
                      )}
                    </div>
                    {step.math && <MathText content={step.math} block={true} />}
                  </div>
                ))}
              </div>

              <div className="bg-indigo-600 text-white p-4 rounded-xl">
                <p className="text-xs uppercase font-bold tracking-wider text-indigo-200 mb-1">Final Answer</p>
                <div className="text-lg font-bold">
                  <MathText content={question.solution.finalAnswer} />
                </div>
              </div>

              {question.solution.examinerTips && (
                <div className="text-xs text-indigo-900 bg-indigo-100/60 p-3 rounded-lg italic">
                  💡 <strong>Examiner Tip:</strong> <MathText content={question.solution.examinerTips} />
                </div>
              )}
            </div>
          )}
        </div>

        {/* Quick Result Logger Buttons */}
        <div className="pt-4 border-t border-slate-100">
          <p className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3 text-center sm:text-left">
            Record Today's Morning Drill:
          </p>

          {loggedStatus ? (
            <div className={`border rounded-2xl p-4 flex items-center justify-between animate-fadeIn ${
              loggedStatus === 'skipped'
                ? 'bg-slate-50 border-slate-200'
                : 'bg-emerald-50 border-emerald-200'
            }`}>
              <div className="flex items-center gap-2 font-bold text-sm">
                {loggedStatus === 'skipped' ? (
                  <>
                    <SkipForward className="w-5 h-5 text-slate-500" />
                    <span className="text-slate-700">Question recorded as skipped for {student.name}.</span>
                  </>
                ) : (
                  <>
                    <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                    <span className="text-emerald-800">Logged to {student.name}'s history & streak! 🔥</span>
                  </>
                )}
              </div>
              <button
                onClick={() => loadNewQuestion()}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold transition-all shadow-xs cursor-pointer ${
                  loggedStatus === 'skipped'
                    ? 'bg-slate-800 hover:bg-slate-900 text-white'
                    : 'bg-emerald-600 hover:bg-emerald-700 text-white'
                }`}
              >
                <RefreshCw className="w-3.5 h-3.5" /> Next Question
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5">
              <button
                onClick={() => handleRecordResult('nailed_it')}
                className="flex items-center justify-center gap-2 py-3 px-3 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs sm:text-sm font-bold shadow-xs transition-transform active:scale-95 cursor-pointer"
              >
                <Sparkles className="w-4 h-4" />
                Nailed it!
              </button>

              <button
                onClick={() => handleRecordResult('needed_hint')}
                className="flex items-center justify-center gap-2 py-3 px-3 rounded-2xl bg-amber-500 hover:bg-amber-600 text-white text-xs sm:text-sm font-bold shadow-xs transition-transform active:scale-95 cursor-pointer"
              >
                <HelpCircle className="w-4 h-4" />
                Needed a Hint
              </button>

              <button
                onClick={() => handleRecordResult('concept_gap')}
                className="flex items-center justify-center gap-2 py-3 px-3 rounded-2xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs sm:text-sm font-bold transition-transform active:scale-95 cursor-pointer"
              >
                Review Later
              </button>

              <button
                onClick={() => handleRecordResult('skipped')}
                className="flex items-center justify-center gap-2 py-3 px-3 rounded-2xl bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-200 text-xs sm:text-sm font-bold transition-transform active:scale-95 cursor-pointer"
                title="Mark this question as skipped / not attempted"
              >
                <SkipForward className="w-4 h-4 text-slate-500" />
                Skipped Question
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Footer controls: Refresh or Jump to topic */}
      <div className="flex items-center justify-between text-xs text-slate-500 px-2">
        <button
          onClick={() => loadNewQuestion()}
          className="flex items-center gap-1.5 text-slate-600 hover:text-slate-900 font-semibold"
        >
          <RefreshCw className="w-4 h-4" /> Try a different morning question
        </button>

        {onNavigateToTopic && (
          <button
            onClick={() => onNavigateToTopic(question.topicId)}
            className="flex items-center gap-1 text-brand-600 hover:text-brand-800 font-semibold"
          >
            <span>Explore full topic</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        )}
      </div>
    </div>
  );
};
