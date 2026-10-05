import React from 'react';
import { StudentProfile } from '../../types/student';
import { StorageService } from '../../services/storageService';
import { Calendar, Trash2, Award, Zap, BookOpen, MessageSquare } from 'lucide-react';

interface SessionHistoryProps {
  student: StudentProfile;
  onDataRefresh: () => void;
}

export const SessionHistory: React.FC<SessionHistoryProps> = ({
  student,
  onDataRefresh
}) => {
  const sessions = StorageService.getSessionsForStudent(student.id);

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
                  className="p-1 rounded-lg text-slate-300 hover:text-rose-600 hover:bg-rose-50 transition-colors"
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
                {sess.questionsAttempted} {sess.questionsAttempted === 1 ? 'question' : 'questions'} attempted
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

            {/* Question Badges */}
            {sess.questionResults && sess.questionResults.length > 0 && (
              <div className="flex flex-wrap gap-2 pt-1">
                {sess.questionResults.map((qr, i) => (
                  <span
                    key={i}
                    className={`text-[11px] font-semibold px-2.5 py-1 rounded-xl border ${
                      qr.rating === 'nailed_it'
                        ? 'bg-emerald-50 text-emerald-800 border-emerald-200'
                        : qr.rating === 'minor_slip'
                          ? 'bg-amber-50 text-amber-800 border-amber-200'
                          : qr.rating === 'needed_hint'
                            ? 'bg-blue-50 text-blue-800 border-blue-200'
                            : 'bg-rose-50 text-rose-800 border-rose-200'
                    }`}
                  >
                    Q{i + 1}: {qr.earnedMarks}/{qr.maxMarks} • {qr.rating.replace('_', ' ')}
                  </span>
                ))}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};
