import React, { useState } from 'react';
import { Question } from '../../types/question';
import { StudentProfile } from '../../types/student';
import { PerformanceRating, QuestionResult } from '../../types/session';
import { StorageService } from '../../services/storageService';
import { GeneratorService } from '../../services/generatorService';
import { X, CheckCircle, Award, Star, MessageSquare } from 'lucide-react';
import confetti from 'canvas-confetti';

interface MarkingLoggerModalProps {
  isOpen: boolean;
  onClose: () => void;
  questions: Question[];
  student: StudentProfile;
  topicId?: string;
  onSessionLogged: () => void;
}

export const MarkingLoggerModal: React.FC<MarkingLoggerModalProps> = ({
  isOpen,
  onClose,
  questions,
  student,
  topicId,
  onSessionLogged
}) => {
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [tutorNotes, setTutorNotes] = useState('');
  
  // Results per question
  const [results, setResults] = useState<Record<string, { marks: number; rating: PerformanceRating; note: string }>>(() => {
    const init: Record<string, { marks: number; rating: PerformanceRating; note: string }> = {};
    questions.forEach(q => {
      init[q.id] = {
        marks: q.maxMarks,
        rating: 'nailed_it',
        note: ''
      };
    });
    return init;
  });

  if (!isOpen) return null;

  const totalMaxMarks = questions.reduce((sum, q) => sum + q.maxMarks, 0);
  const earnedTotalMarks = questions.reduce((sum, q) => sum + (results[q.id]?.marks ?? 0), 0);
  const percentage = Math.round((earnedTotalMarks / totalMaxMarks) * 100);

  const handleSetMarks = (qId: string, marks: number) => {
    setResults(prev => ({
      ...prev,
      [qId]: {
        ...prev[qId],
        marks
      }
    }));
  };

  const handleSetRating = (qId: string, rating: PerformanceRating) => {
    setResults(prev => ({
      ...prev,
      [qId]: {
        ...prev[qId],
        rating
      }
    }));
  };

  const addQuickNote = (phrase: string) => {
    setTutorNotes(prev => prev ? `${prev}. ${phrase}` : phrase);
  };

  const handleSave = () => {
    const questionResults: QuestionResult[] = questions.map(q => ({
      questionId: q.id,
      earnedMarks: results[q.id]?.marks ?? 0,
      maxMarks: q.maxMarks,
      rating: results[q.id]?.rating ?? 'nailed_it',
      note: results[q.id]?.note || undefined
    }));

    StorageService.saveSession({
      id: `session_${Date.now()}`,
      studentId: student.id,
      date,
      timestamp: Date.now(),
      mode: topicId ? 'topic_set' : 'mixed_stretch',
      topicId: topicId || questions[0]?.topicId,
      topicTitle: topicId ? GeneratorService.getTopicTitle(topicId) : 'Mixed GCSE Stretch',
      questionsAttempted: questions.length,
      totalMarks: totalMaxMarks,
      earnedMarks: earnedTotalMarks,
      percentage,
      tutorNotes: tutorNotes.trim() || 'Pen and paper tutoring session completed.',
      questionResults
    });

    if (percentage >= 80) {
      confetti({ particleCount: 70, spread: 70, origin: { y: 0.5 } });
    }

    onSessionLogged();
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fadeIn">
      <div className="bg-white rounded-3xl shadow-2xl border border-slate-200 w-full max-w-2xl overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 bg-slate-50/80">
          <div>
            <h2 className="text-lg font-bold text-slate-900">
              Log Pen & Paper Tutoring Results
            </h2>
            <p className="text-xs text-slate-500">
              Recording session for <span className="font-semibold text-slate-800">{student.name}</span>
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-200 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content area */}
        <div className="p-6 overflow-y-auto space-y-6 flex-1">
          {/* Date & Overall Score Bar */}
          <div className="flex flex-wrap items-center justify-between gap-4 p-4 rounded-2xl bg-brand-50 border border-brand-200/60">
            <div>
              <label className="block text-[11px] font-bold uppercase tracking-wider text-brand-800 mb-1">
                Tutoring Date
              </label>
              <input
                type="date"
                value={date}
                onChange={e => setDate(e.target.value)}
                className="px-3 py-1.5 rounded-xl border border-brand-200 bg-white text-xs font-semibold text-slate-800"
              />
            </div>

            <div className="text-right">
              <span className="text-[11px] font-bold uppercase tracking-wider text-brand-800 block">
                Calculated Score
              </span>
              <span className="text-2xl font-black text-brand-900">
                {earnedTotalMarks} / {totalMaxMarks} <span className="text-sm font-semibold text-brand-600">({percentage}%)</span>
              </span>
            </div>
          </div>

          {/* Question by Question Scoring */}
          <div className="space-y-4">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">
              Question-by-Question Marks
            </h3>

            {questions.map((q, idx) => {
              const currentRes = results[q.id] || { marks: q.maxMarks, rating: 'nailed_it', note: '' };
              return (
                <div key={q.id} className="p-4 rounded-2xl border border-slate-200 bg-white space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-bold text-slate-800">
                      Q{idx + 1}: {q.title}
                    </span>
                    <span className="text-xs font-semibold text-slate-500">
                      Max: {q.maxMarks} marks
                    </span>
                  </div>

                  {/* Marks selector */}
                  <div className="flex items-center gap-1.5 flex-wrap">
                    <span className="text-xs font-semibold text-slate-500 mr-2">Marks awarded:</span>
                    {Array.from({ length: q.maxMarks + 1 }, (_, i) => i).map(mark => (
                      <button
                        key={mark}
                        type="button"
                        onClick={() => handleSetMarks(q.id, mark)}
                        className={`w-8 h-8 rounded-lg text-xs font-bold border transition-all ${
                          currentRes.marks === mark
                            ? 'bg-brand-600 text-white border-brand-600'
                            : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                        }`}
                      >
                        {mark}
                      </button>
                    ))}
                  </div>

                  {/* Qualitative Rating */}
                  <div className="flex items-center gap-1.5 flex-wrap">
                    <span className="text-xs font-semibold text-slate-500 mr-2">Method:</span>
                    {[
                      { id: 'nailed_it', label: 'Nailed it', color: 'emerald' },
                      { id: 'minor_slip', label: 'Minor Slip', color: 'amber' },
                      { id: 'needed_hint', label: 'Needed Hint', color: 'blue' },
                      { id: 'concept_gap', label: 'Concept Gap', color: 'rose' }
                    ].map(rating => (
                      <button
                        key={rating.id}
                        type="button"
                        onClick={() => handleSetRating(q.id, rating.id as PerformanceRating)}
                        className={`px-2.5 py-1 rounded-lg text-xs font-semibold border transition-all ${
                          currentRes.rating === rating.id
                            ? 'bg-slate-900 text-white border-slate-900 shadow-xs'
                            : 'bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100'
                        }`}
                      >
                        {rating.label}
                      </button>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Qualitative Parent / Tutor Notes */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-500">
                Tutor Observations & Notes
              </label>
              <span className="text-xs text-slate-400">Used by recommendation engine</span>
            </div>

            <textarea
              rows={3}
              placeholder="e.g. Understood circle theorem immediately; minor algebra slip when expanding brackets on Q2. Mastered the method."
              value={tutorNotes}
              onChange={e => setTutorNotes(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-2xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-brand-500 text-sm font-medium text-slate-800"
            />

            {/* Quick Phrase Chips */}
            <div className="flex flex-wrap gap-1.5 pt-1">
              {[
                'Spotted method instantly',
                'Arithmetic slip only',
                'Needed hint on first step',
                'Needs more practice on fractions',
                'Great lateral thinking'
              ].map(phrase => (
                <button
                  key={phrase}
                  type="button"
                  onClick={() => addQuickNote(phrase)}
                  className="text-[11px] font-medium px-2 py-1 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-600 transition-colors"
                >
                  + {phrase}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 px-6 border-t border-slate-100 bg-slate-50/70 flex justify-end gap-3">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 text-sm font-semibold text-slate-600 hover:bg-slate-200/60 rounded-xl transition-colors"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleSave}
            className="px-6 py-2 text-sm font-bold text-white bg-brand-600 hover:bg-brand-700 rounded-xl shadow-sm transition-all"
          >
            Save Tutoring Session
          </button>
        </div>
      </div>
    </div>
  );
};
