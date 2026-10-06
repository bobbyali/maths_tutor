import React, { useState } from 'react';
import { StudentProfile } from '../../types/student';
import { Question } from '../../types/question';
import { SessionRecord } from '../../types/session';
import { StorageService } from '../../services/storageService';
import { GeneratorService } from '../../services/generatorService';
import { MathText } from '../common/MathText';
import { CitationLink } from '../common/CitationLink';
import { 
  Calendar, 
  Trash2, 
  Zap, 
  BookOpen, 
  MessageSquare, 
  ArrowUpRight, 
  X, 
  ChevronLeft, 
  ChevronRight, 
  Eye, 
  EyeOff, 
  Sparkles, 
  CheckCircle2 
} from 'lucide-react';

interface SessionHistoryProps {
  student: StudentProfile;
  onDataRefresh: () => void;
  onRevisitQuestions?: (questions: Question[]) => void;
  onRecommendSimilar?: (question: Question) => void;
}

export const SessionHistory: React.FC<SessionHistoryProps> = ({
  student,
  onDataRefresh,
  onRevisitQuestions,
  onRecommendSimilar
}) => {
  const sessions = StorageService.getSessionsForStudent(student.id);

  // Modal state for reviewing an individual question from a past session
  const [selectedQuestionModal, setSelectedQuestionModal] = useState<{
    session: SessionRecord;
    questionIndex: number;
  } | null>(null);
  const [showSolutionInModal, setShowSolutionInModal] = useState(false);

  const handleDelete = (id: string) => {
    if (confirm('Delete this session record?')) {
      StorageService.deleteSession(id);
      onDataRefresh();
    }
  };

  if (sessions.length === 0) {
    return (
      <div className="bg-white rounded-3xl border border-slate-200 p-12 text-center text-slate-500 space-y-3">
        <div className="w-12 h-12 rounded-2xl bg-slate-100 flex items-center justify-center mx-auto text-xl">
          📝
        </div>
        <h3 className="text-base font-bold text-slate-800">No Tutoring Sessions Logged Yet</h3>
        <p className="text-xs text-slate-500 max-w-sm mx-auto">
          When you practice with {student.name} using pen and paper or morning drills, use the "Log Results" button to record scores and qualitative notes.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {sessions.map(sess => {
        const isMorning = sess.mode === 'morning_quick';
        return (
          <div
            key={sess.id}
            className="bg-white rounded-3xl border border-slate-200 p-5 sm:p-6 shadow-xs hover:shadow-sm transition-all space-y-4"
          >
            {/* Top Bar: Mode, Topic, Date, Score */}
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 pb-3">
              <div className="flex items-center gap-2">
                <span className={`text-[11px] font-bold px-2.5 py-0.5 rounded-full flex items-center gap-1 ${
                  isMorning 
                    ? 'bg-amber-100 text-amber-800' 
                    : 'bg-indigo-100 text-indigo-800'
                }`}>
                  {isMorning ? <Zap className="w-3 h-3 text-amber-600" /> : <BookOpen className="w-3 h-3 text-indigo-600" />}
                  {isMorning ? 'Morning Quick Drill' : 'Problem Set Session'}
                </span>

                <span className="text-xs font-semibold text-slate-400 flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5" />
                  {sess.date}
                </span>
              </div>

              <div className="flex items-center gap-3">
                <span className="text-sm font-black text-slate-900">
                  {sess.earnedMarks} / {sess.totalMarks} <span className="text-xs text-brand-600 font-bold">({sess.percentage}%)</span>
                </span>
                <button
                  onClick={() => handleDelete(sess.id)}
                  title="Delete session"
                  className="p-1 rounded-lg text-slate-300 hover:text-rose-600 hover:bg-rose-50 transition-colors cursor-pointer"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Topic & Questions info */}
            <div>
              <h4 className="text-base font-bold text-slate-900">
                {sess.topicTitle || 'General Stretch Session'}
              </h4>
              <p className="text-xs text-slate-500 mt-0.5">
                {(() => {
                  const totalCount = sess.questionResults?.length || sess.questionsAttempted;
                  const skippedCount = sess.questionResults?.filter(qr => qr.rating === 'skipped').length || 0;
                  if (skippedCount > 0) {
                    return `${sess.questionsAttempted} of ${totalCount} attempted (${skippedCount} skipped)`;
                  }
                  return `${sess.questionsAttempted} ${sess.questionsAttempted === 1 ? 'question' : 'questions'} attempted`;
                })()}
              </p>
            </div>

            {/* Qualitative Tutor Notes (Highlighted for Dad) */}
            {sess.tutorNotes && (
              <div className="bg-slate-50 border border-slate-200/80 rounded-2xl p-4 text-xs sm:text-sm text-slate-800 space-y-1">
                <div className="flex items-center gap-1.5 font-bold text-slate-600 text-[11px] uppercase tracking-wider">
                  <MessageSquare className="w-3.5 h-3.5 text-brand-600" />
                  <span>Tutor Observations & Notes:</span>
                </div>
                <p className="italic leading-relaxed font-medium">"{sess.tutorNotes}"</p>
              </div>
            )}

            {/* Question Badges & Quick Jump Controls */}
            {sess.questionResults && sess.questionResults.length > 0 && (
              <div className="space-y-2 pt-1">
                <div className="flex items-center justify-between flex-wrap gap-2 text-xs">
                  <span className="font-bold text-slate-400 text-[11px] uppercase tracking-wider">
                    Questions In This Session <span className="font-normal text-slate-400 lowercase">(click to view prompt & solution)</span>:
                  </span>

                  {onRevisitQuestions && (
                    <button
                      type="button"
                      onClick={() => {
                        const qs = GeneratorService.getQuestionsByIds(sess.questionResults.map(r => r.questionId));
                        if (qs.length > 0) onRevisitQuestions(qs);
                      }}
                      className="inline-flex items-center gap-1 text-xs font-bold text-brand-600 hover:text-brand-800 bg-brand-50 hover:bg-brand-100 border border-brand-200/80 px-2.5 py-1 rounded-xl transition-all cursor-pointer shadow-2xs"
                      title="Load all questions from this session into Practice Sets"
                    >
                      <span>Revisit full set in practice</span>
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>

                <div className="flex flex-wrap gap-2">
                  {sess.questionResults.map((qr, i) => {
                    const isSkipped = qr.rating === 'skipped';
                    return (
                      <button
                        key={i}
                        type="button"
                        onClick={() => {
                          setSelectedQuestionModal({
                            session: sess,
                            questionIndex: i
                          });
                          setShowSolutionInModal(false);
                        }}
                        title="Click to view question prompt, solution and review details"
                        className={`inline-flex items-center gap-1.5 text-[11px] font-semibold px-3 py-1.5 rounded-xl border transition-all cursor-pointer hover:shadow-xs active:scale-95 ${
                          qr.rating === 'nailed_it'
                            ? 'bg-emerald-50 text-emerald-800 border-emerald-200 hover:bg-emerald-100'
                            : qr.rating === 'minor_slip'
                              ? 'bg-amber-50 text-amber-800 border-amber-200 hover:bg-amber-100'
                              : qr.rating === 'needed_hint'
                                ? 'bg-blue-50 text-blue-800 border-blue-200 hover:bg-blue-100'
                                : isSkipped
                                  ? 'bg-slate-100 text-slate-600 border-slate-300 hover:bg-slate-200'
                                  : 'bg-rose-50 text-rose-800 border-rose-200 hover:bg-rose-100'
                        }`}
                      >
                        <span>
                          {isSkipped
                            ? `Q${i + 1}: Skipped`
                            : `Q${i + 1}: ${qr.earnedMarks}/${qr.maxMarks} • ${qr.rating.replace('_', ' ')}`
                          }
                        </span>
                        <ArrowUpRight className="w-3 h-3 opacity-60" />
                      </button>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        );
      })}

      {/* Question Review Modal */}
      {selectedQuestionModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fadeIn">
          <div className="bg-white rounded-3xl shadow-2xl border border-slate-200 w-full max-w-2xl overflow-hidden flex flex-col max-h-[92vh]">
            {/* Modal Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 bg-slate-50/80">
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold uppercase tracking-wider px-2.5 py-1 rounded-full bg-slate-200 text-slate-700">
                  {selectedQuestionModal.session.mode === 'morning_quick' ? 'Morning Drill' : 'Problem Set'}
                </span>
                <span className="text-xs font-semibold text-slate-400">
                  {selectedQuestionModal.session.date}
                </span>
              </div>
              <button
                onClick={() => setSelectedQuestionModal(null)}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Content */}
            <div className="p-6 overflow-y-auto space-y-6">
              {/* Question Navigation Bar */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="w-7 h-7 rounded-lg bg-slate-900 text-white font-bold flex items-center justify-center text-xs">
                    Q{selectedQuestionModal.questionIndex + 1}
                  </span>
                  <span className="text-xs font-semibold text-slate-500">
                    of {selectedQuestionModal.session.questionResults.length} questions
                  </span>
                </div>

                {/* Prev / Next buttons */}
                <div className="flex items-center gap-1.5">
                  <button
                    disabled={selectedQuestionModal.questionIndex === 0}
                    onClick={() => {
                      setSelectedQuestionModal(prev => prev ? {
                        ...prev,
                        questionIndex: prev.questionIndex - 1
                      } : null);
                      setShowSolutionInModal(false);
                    }}
                    className="p-1.5 rounded-lg border border-slate-200 text-slate-600 hover:bg-slate-50 disabled:opacity-30 disabled:pointer-events-none transition-all cursor-pointer"
                    title="Previous question"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </button>
                  <button
                    disabled={selectedQuestionModal.questionIndex === selectedQuestionModal.session.questionResults.length - 1}
                    onClick={() => {
                      setSelectedQuestionModal(prev => prev ? {
                        ...prev,
                        questionIndex: prev.questionIndex + 1
                      } : null);
                      setShowSolutionInModal(false);
                    }}
                    className="p-1.5 rounded-lg border border-slate-200 text-slate-600 hover:bg-slate-50 disabled:opacity-30 disabled:pointer-events-none transition-all cursor-pointer"
                    title="Next question"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Result & Note banner for this question */}
              {(() => {
                const qr = selectedQuestionModal.session.questionResults[selectedQuestionModal.questionIndex];
                if (!qr) return null;
                const isSkipped = qr.rating === 'skipped';
                return (
                  <div className={`p-4 rounded-2xl border space-y-2 ${
                    qr.rating === 'nailed_it'
                      ? 'bg-emerald-50/70 border-emerald-200 text-emerald-950'
                      : qr.rating === 'minor_slip'
                        ? 'bg-amber-50/70 border-amber-200 text-amber-950'
                        : qr.rating === 'needed_hint'
                          ? 'bg-blue-50/70 border-blue-200 text-blue-950'
                          : isSkipped
                            ? 'bg-slate-100/80 border-slate-200 text-slate-800'
                            : 'bg-rose-50/70 border-rose-200 text-rose-950'
                  }`}>
                    <div className="flex items-center justify-between flex-wrap gap-2 text-xs font-bold">
                      <div className="flex items-center gap-1.5">
                        <span>Student Outcome:</span>
                        <span className="capitalize px-2 py-0.5 rounded-md bg-white/80 shadow-2xs">
                          {isSkipped ? 'Skipped / Not Attempted' : qr.rating.replace('_', ' ')}
                        </span>
                      </div>
                      <span>
                        Marks: {qr.earnedMarks} / {qr.maxMarks}
                      </span>
                    </div>

                    {qr.note && (
                      <p className="text-xs font-medium italic mt-1 bg-white/60 p-2 rounded-xl">
                        Note: "{qr.note}"
                      </p>
                    )}
                  </div>
                );
              })()}

              {/* Question Details */}
              {(() => {
                const qr = selectedQuestionModal.session.questionResults[selectedQuestionModal.questionIndex];
                const question = qr ? GeneratorService.getQuestionById(qr.questionId) : undefined;

                if (!question) {
                  return (
                    <div className="p-6 bg-slate-50 rounded-2xl text-center text-xs text-slate-500">
                      Original question data not found in question bank (ID: {qr?.questionId}).
                    </div>
                  );
                }

                return (
                  <div className="space-y-4">
                    <div>
                      <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                        {GeneratorService.getTopicTitle(question.topicId)}
                      </span>
                      <h3 className="text-base font-bold text-slate-900 mt-0.5">
                        {question.title}
                      </h3>
                    </div>

                    {/* Question Prompt */}
                    <div className="text-slate-800 text-sm leading-relaxed bg-slate-50/80 p-4 rounded-2xl border border-slate-100">
                      <MathText content={question.prompt} />
                    </div>

                    {/* Citation */}
                    <CitationLink citation={question.citation} />

                    {/* Solution Toggle */}
                    <div className="pt-2">
                      {!showSolutionInModal ? (
                        <button
                          type="button"
                          onClick={() => setShowSolutionInModal(true)}
                          className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-indigo-50 hover:bg-indigo-100 text-indigo-700 text-xs font-bold border border-indigo-200 transition-all cursor-pointer"
                        >
                          <Eye className="w-3.5 h-3.5" />
                          <span>Show Worked Solution & Mark Scheme</span>
                        </button>
                      ) : (
                        <div className="space-y-3 bg-indigo-50/40 border border-indigo-200 p-4 rounded-2xl animate-fadeIn text-xs">
                          <div className="flex items-center justify-between border-b border-indigo-100 pb-2">
                            <span className="font-bold text-indigo-900 flex items-center gap-1.5">
                              <CheckCircle2 className="w-4 h-4 text-indigo-600" />
                              Official Worked Solution
                            </span>
                            <button
                              type="button"
                              onClick={() => setShowSolutionInModal(false)}
                              className="text-xs text-indigo-600 hover:text-indigo-800 font-bold flex items-center gap-1 cursor-pointer"
                            >
                              <EyeOff className="w-3 h-3" /> Hide
                            </button>
                          </div>

                          <div className="space-y-2">
                            {question.solution.steps.map((step, idx) => (
                              <div key={idx} className="bg-white p-2.5 rounded-xl border border-indigo-100">
                                <div className="font-medium text-slate-800">
                                  <MathText content={step.description} />
                                </div>
                                {step.math && <MathText content={step.math} block={true} />}
                              </div>
                            ))}
                          </div>

                          <div className="bg-indigo-600 text-white p-3 rounded-xl font-bold">
                            <span className="text-[10px] uppercase tracking-wider text-indigo-200 block mb-0.5">Final Answer:</span>
                            <MathText content={question.solution.finalAnswer} />
                          </div>

                          {question.solution.examinerTips && (
                            <div className="text-[11px] text-indigo-900 bg-indigo-100/60 p-2.5 rounded-lg italic">
                              💡 <strong>Examiner Tip:</strong> <MathText content={question.solution.examinerTips} />
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                );
              })()}
            </div>

            {/* Modal Footer Actions */}
            {(() => {
              const qr = selectedQuestionModal.session.questionResults[selectedQuestionModal.questionIndex];
              const question = qr ? GeneratorService.getQuestionById(qr.questionId) : undefined;
              return (
                <div className="flex items-center justify-between flex-wrap gap-2 px-6 py-3.5 border-t border-slate-100 bg-slate-50/80">
                  <div className="flex items-center gap-2">
                    {onRecommendSimilar && question && (
                      <button
                        type="button"
                        onClick={() => {
                          onRecommendSimilar(question);
                          setSelectedQuestionModal(null);
                        }}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-violet-50 hover:bg-violet-100 text-violet-700 text-xs font-bold border border-violet-200 transition-all cursor-pointer shadow-2xs"
                      >
                        <Sparkles className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
                        <span>More Like This</span>
                      </button>
                    )}
                  </div>

                  <div className="flex items-center gap-2">
                    {onRevisitQuestions && question && (
                      <button
                        type="button"
                        onClick={() => {
                          onRevisitQuestions([question]);
                          setSelectedQuestionModal(null);
                        }}
                        className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-brand-600 hover:bg-brand-700 text-white text-xs font-bold transition-all shadow-xs cursor-pointer"
                      >
                        <span>Revisit in Practice</span>
                        <ArrowUpRight className="w-3.5 h-3.5" />
                      </button>
                    )}
                    <button
                      type="button"
                      onClick={() => setSelectedQuestionModal(null)}
                      className="px-3.5 py-1.5 rounded-xl border border-slate-200 text-slate-600 hover:bg-slate-100 text-xs font-bold transition-all cursor-pointer"
                    >
                      Close
                    </button>
                  </div>
                </div>
              );
            })()}
          </div>
        </div>
      )}
    </div>
  );
};
