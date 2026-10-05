import React, { useState, useEffect } from 'react';
import { Question } from '../../types/question';
import { StudentProfile } from '../../types/student';
import { PerformanceRating, QuestionResult } from '../../types/session';
import { StorageService } from '../../services/storageService';
import { GeneratorService } from '../../services/generatorService';
import { X, Users, Copy, CheckCircle2, Sparkles, MessageSquare, ArrowRight } from 'lucide-react';
import confetti from 'canvas-confetti';

interface MarkingLoggerModalProps {
  isOpen: boolean;
  onClose: () => void;
  questions: Question[];
  student: StudentProfile; // Current active student
  allStudents: StudentProfile[]; // All students in the household
  topicId?: string;
  onSessionLogged: () => void;
}

interface StudentMarkingState {
  results: Record<string, { marks: number; rating: PerformanceRating; note: string }>;
  tutorNotes: string;
}

export const MarkingLoggerModal: React.FC<MarkingLoggerModalProps> = ({
  isOpen,
  onClose,
  questions,
  student,
  allStudents,
  topicId,
  onSessionLogged
}) => {
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  
  // Which students are participating in this session (can select multiple!)
  const [participatingStudentIds, setParticipatingStudentIds] = useState<string[]>([student.id]);
  const [focusedStudentId, setFocusedStudentId] = useState<string>(student.id);

  // Initialise question results template
  const createDefaultResults = () => {
    const init: Record<string, { marks: number; rating: PerformanceRating; note: string }> = {};
    questions.forEach(q => {
      init[q.id] = {
        marks: q.maxMarks,
        rating: 'nailed_it',
        note: ''
      };
    });
    return init;
  };

  // State mapped by studentId: { [studentId]: { results, tutorNotes } }
  const [studentRecords, setStudentRecords] = useState<Record<string, StudentMarkingState>>({});

  // Reset or initialize when modal opens or questions change
  useEffect(() => {
    if (isOpen) {
      const records: Record<string, StudentMarkingState> = {};
      allStudents.forEach(s => {
        records[s.id] = {
          results: createDefaultResults(),
          tutorNotes: ''
        };
      });
      setStudentRecords(records);
      setParticipatingStudentIds([student.id]);
      setFocusedStudentId(student.id);
      setDate(new Date().toISOString().split('T')[0]);
    }
  }, [isOpen, student.id, questions]);

  if (!isOpen) return null;

  const totalMaxMarks = questions.reduce((sum, q) => sum + q.maxMarks, 0);

  // Toggle student participation
  const toggleStudentParticipation = (sId: string) => {
    if (participatingStudentIds.includes(sId)) {
      if (participatingStudentIds.length === 1) return; // Keep at least one
      const updated = participatingStudentIds.filter(id => id !== sId);
      setParticipatingStudentIds(updated);
      if (focusedStudentId === sId) {
        setFocusedStudentId(updated[0]);
      }
    } else {
      const updated = [...participatingStudentIds, sId];
      setParticipatingStudentIds(updated);
      setFocusedStudentId(sId);
    }
  };

  const currentData = studentRecords[focusedStudentId] || {
    results: createDefaultResults(),
    tutorNotes: ''
  };

  const currentStudentProfile = allStudents.find(s => s.id === focusedStudentId) || student;

  // Calculate scores for focused student
  const earnedTotalMarks = questions.reduce((sum, q) => sum + (currentData.results[q.id]?.marks ?? 0), 0);
  const percentage = Math.round((earnedTotalMarks / totalMaxMarks) * 100);

  const handleSetMarks = (qId: string, marks: number) => {
    setStudentRecords(prev => ({
      ...prev,
      [focusedStudentId]: {
        ...prev[focusedStudentId],
        results: {
          ...prev[focusedStudentId].results,
          [qId]: {
            ...prev[focusedStudentId].results[qId],
            marks
          }
        }
      }
    }));
  };

  const handleSetRating = (qId: string, rating: PerformanceRating) => {
    setStudentRecords(prev => ({
      ...prev,
      [focusedStudentId]: {
        ...prev[focusedStudentId],
        results: {
          ...prev[focusedStudentId].results,
          [qId]: {
            ...prev[focusedStudentId].results[qId],
            rating
          }
        }
      }
    }));
  };

  const handleSetTutorNotes = (notes: string) => {
    setStudentRecords(prev => ({
      ...prev,
      [focusedStudentId]: {
        ...prev[focusedStudentId],
        tutorNotes: notes
      }
    }));
  };

  const addQuickNote = (phrase: string) => {
    const currentNotes = currentData.tutorNotes;
    handleSetTutorNotes(currentNotes ? `${currentNotes}. ${phrase}` : phrase);
  };

  // Copy current student's marks & notes to all other participating students
  const handleCopyMarksToAll = () => {
    const sourceData = studentRecords[focusedStudentId];
    if (!sourceData) return;

    setStudentRecords(prev => {
      const updated = { ...prev };
      participatingStudentIds.forEach(sId => {
        if (sId !== focusedStudentId) {
          updated[sId] = {
            results: JSON.parse(JSON.stringify(sourceData.results)),
            tutorNotes: sourceData.tutorNotes
          };
        }
      });
      return updated;
    });
  };

  // Save session for all participating students
  const handleSave = () => {
    let highestPercentage = 0;

    participatingStudentIds.forEach((sId, index) => {
      const sData = studentRecords[sId] || { results: createDefaultResults(), tutorNotes: '' };
      const sEarned = questions.reduce((sum, q) => sum + (sData.results[q.id]?.marks ?? 0), 0);
      const sPct = Math.round((sEarned / totalMaxMarks) * 100);
      if (sPct > highestPercentage) highestPercentage = sPct;

      const questionResults: QuestionResult[] = questions.map(q => ({
        questionId: q.id,
        earnedMarks: sData.results[q.id]?.marks ?? 0,
        maxMarks: q.maxMarks,
        rating: sData.results[q.id]?.rating ?? 'nailed_it',
        note: sData.results[q.id]?.note || undefined
      }));

      StorageService.saveSession({
        id: `session_${Date.now()}_${index}`,
        studentId: sId,
        date,
        timestamp: Date.now() + index,
        mode: topicId ? 'topic_set' : 'mixed_stretch',
        topicId: topicId || questions[0]?.topicId,
        topicTitle: topicId ? GeneratorService.getTopicTitle(topicId) : 'Mixed GCSE Stretch',
        questionsAttempted: questions.length,
        totalMarks: totalMaxMarks,
        earnedMarks: sEarned,
        percentage: sPct,
        tutorNotes: sData.tutorNotes.trim() || 'Pen and paper tutoring session completed.',
        questionResults
      });
    });

    if (highestPercentage >= 80) {
      confetti({ particleCount: 75, spread: 70, origin: { y: 0.5 } });
    }

    onSessionLogged();
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fadeIn">
      <div className="bg-white rounded-3xl shadow-2xl border border-slate-200 w-full max-w-2xl overflow-hidden flex flex-col max-h-[92vh]">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 bg-slate-50/80">
          <div>
            <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
              <Users className="w-5 h-5 text-brand-600" />
              Log Tutoring Marks & Observations
            </h2>
            <p className="text-xs text-slate-500">
              Recording results for {participatingStudentIds.length} {participatingStudentIds.length === 1 ? 'student' : 'students'}
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
          {/* Participating Students Selection Bar */}
          <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 space-y-2.5">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
                Who Completed This Problem Set?
              </span>
              <span className="text-[11px] text-slate-400 font-medium">
                Click to include / exclude
              </span>
            </div>

            <div className="flex flex-wrap gap-2">
              {allStudents.map(s => {
                const isIncluded = participatingStudentIds.includes(s.id);
                return (
                  <button
                    key={s.id}
                    type="button"
                    onClick={() => toggleStudentParticipation(s.id)}
                    className={`flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-bold border transition-all ${
                      isIncluded
                        ? 'bg-brand-600 text-white border-brand-600 shadow-xs'
                        : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-100'
                    }`}
                  >
                    <span>{s.avatarEmoji}</span>
                    <span>{s.name}</span>
                    {isIncluded && <CheckCircle2 className="w-3.5 h-3.5 ml-0.5" />}
                  </button>
                );
              })}
            </div>
          </div>

          {/* If Multiple Students Selected: Student Tabs */}
          {participatingStudentIds.length > 1 && (
            <div className="flex items-center justify-between border-b border-slate-200 pb-2">
              <div className="flex gap-2 overflow-x-auto">
                {participatingStudentIds.map(sId => {
                  const s = allStudents.find(st => st.id === sId);
                  if (!s) return null;
                  const sData = studentRecords[sId];
                  const sEarned = questions.reduce((sum, q) => sum + (sData?.results[q.id]?.marks ?? 0), 0);
                  const sPct = Math.round((sEarned / totalMaxMarks) * 100);
                  const isCurrent = focusedStudentId === sId;

                  return (
                    <button
                      key={sId}
                      type="button"
                      onClick={() => setFocusedStudentId(sId)}
                      className={`flex items-center gap-2 px-3.5 py-1.5 rounded-xl text-xs font-bold border transition-all ${
                        isCurrent
                          ? 'bg-slate-900 text-white border-slate-900 shadow-sm'
                          : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'
                      }`}
                    >
                      <span>{s.avatarEmoji}</span>
                      <span>{s.name}</span>
                      <span className={`text-[10px] px-1.5 py-0.5 rounded ${isCurrent ? 'bg-white/20 text-white' : 'bg-slate-100 text-slate-600'}`}>
                        {sEarned}/{totalMaxMarks} ({sPct}%)
                      </span>
                    </button>
                  );
                })}
              </div>

              {/* Copy across button */}
              <button
                type="button"
                onClick={handleCopyMarksToAll}
                title="Copy current marks & notes to the other student"
                className="flex items-center gap-1 text-[11px] font-bold text-brand-600 hover:text-brand-800 bg-brand-50 hover:bg-brand-100 border border-brand-200 px-2.5 py-1 rounded-lg transition-colors whitespace-nowrap"
              >
                <Copy className="w-3 h-3" />
                <span>Copy marks to all</span>
              </button>
            </div>
          )}

          {/* Date & Overall Score Bar for Focused Student */}
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
                Score for {currentStudentProfile.name}
              </span>
              <span className="text-2xl font-black text-brand-900">
                {earnedTotalMarks} / {totalMaxMarks} <span className="text-sm font-semibold text-brand-600">({percentage}%)</span>
              </span>
            </div>
          </div>

          {/* Question by Question Scoring */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                Question Marks for {currentStudentProfile.name}
              </h3>
              <span className="text-xs text-slate-400">Click to set marks awarded</span>
            </div>

            {questions.map((q, idx) => {
              const currentRes = currentData.results[q.id] || { marks: q.maxMarks, rating: 'nailed_it', note: '' };
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
                Tutor Observations for {currentStudentProfile.name}
              </label>
              <span className="text-xs text-slate-400">Used by recommendation engine</span>
            </div>

            <textarea
              rows={3}
              placeholder={`e.g. ${currentStudentProfile.name} spotted circle theorem immediately; minor algebra slip when expanding brackets on Q2.`}
              value={currentData.tutorNotes}
              onChange={e => handleSetTutorNotes(e.target.value)}
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
        <div className="p-4 px-6 border-t border-slate-100 bg-slate-50/70 flex items-center justify-between">
          <div className="text-xs text-slate-500 font-medium">
            Saving session for: <strong>{participatingStudentIds.map(id => allStudents.find(s => s.id === id)?.name).filter(Boolean).join(', ')}</strong>
          </div>

          <div className="flex gap-2">
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
              Save Tutoring Session ({participatingStudentIds.length})
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
