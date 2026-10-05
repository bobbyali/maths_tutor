import React, { useState, useEffect } from 'react';
import { StudentProfile } from '../../types/student';
import { DifficultyLevel } from '../../types/curriculum';
import { Question, CustomQuestionRequest, QuestionRequestStyle } from '../../types/question';
import { TOPICS } from '../../data/curriculumData';
import { StorageService } from '../../services/storageService';
import { 
  X, 
  Sparkles, 
  PlusCircle, 
  Check, 
  Copy, 
  Trash2, 
  Layers, 
  Send, 
  Lightbulb, 
  FileText,
  AlertCircle
} from 'lucide-react';

interface CustomQuestionRequestModalProps {
  isOpen: boolean;
  onClose: () => void;
  students: StudentProfile[];
  initialTopicId?: string;
  onQuestionAdded?: () => void;
}

export const CustomQuestionRequestModal: React.FC<CustomQuestionRequestModalProps> = ({
  isOpen,
  onClose,
  students,
  initialTopicId,
  onQuestionAdded
}) => {
  const [activeTab, setActiveTab] = useState<'request' | 'create' | 'manage'>('request');

  // --- REQUEST FORM STATE ---
  const [topicId, setTopicId] = useState<string>(initialTopicId || 'geo_pythagoras');
  const [customTopicName, setCustomTopicName] = useState<string>('');
  const [targetStudentId, setTargetStudentId] = useState<string>('all');
  const [difficulty, setDifficulty] = useState<DifficultyLevel>('grade_8_9');
  const [style, setStyle] = useState<QuestionRequestStyle>('gcse_multi_step');
  const [count, setCount] = useState<number>(3);
  const [notes, setNotes] = useState<string>('');
  const [createdPrompt, setCreatedPrompt] = useState<string | null>(null);
  const [copiedSuccess, setCopiedSuccess] = useState<boolean>(false);

  // --- MANUAL CREATE FORM STATE ---
  const [createTopicId, setCreateTopicId] = useState<string>(initialTopicId || 'geo_pythagoras');
  const [createTitle, setCreateTitle] = useState<string>('');
  const [createPrompt, setCreatePrompt] = useState<string>('');
  const [createDifficulty, setCreateDifficulty] = useState<DifficultyLevel>('grade_8_9');
  const [createCalcAllowed, setCreateCalcAllowed] = useState<boolean>(false);
  const [createMaxMarks, setCreateMaxMarks] = useState<number>(4);
  const [createIsMorning, setCreateIsMorning] = useState<boolean>(false);
  const [createHint1, setCreateHint1] = useState<string>('');
  const [createHint2, setCreateHint2] = useState<string>('');
  const [createFinalAnswer, setCreateFinalAnswer] = useState<string>('');
  const [createStepDesc, setCreateStepDesc] = useState<string>('');
  const [createStepMath, setCreateStepMath] = useState<string>('');
  const [createSourceLabel, setCreateSourceLabel] = useState<string>('Custom Tutor Problem');
  const [createSuccessMsg, setCreateSuccessMsg] = useState<string | null>(null);

  // --- SAVED LISTS ---
  const [savedRequests, setSavedRequests] = useState<CustomQuestionRequest[]>([]);
  const [savedCustomQuestions, setSavedCustomQuestions] = useState<Question[]>([]);

  useEffect(() => {
    if (initialTopicId) {
      setTopicId(initialTopicId);
      setCreateTopicId(initialTopicId);
    }
  }, [initialTopicId]);

  useEffect(() => {
    if (isOpen) {
      setSavedRequests(StorageService.getCustomRequests());
      setSavedCustomQuestions(StorageService.getCustomQuestions());
      setCreatedPrompt(null);
      setCopiedSuccess(false);
      setCreateSuccessMsg(null);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleTopicChange = (newTopicId: string) => {
    setTopicId(newTopicId);
    if (newTopicId !== 'custom') {
      setCustomTopicName('');
    }
  };

  const getTopicTitle = (tId: string) => {
    if (tId === 'custom') return customTopicName || 'Custom Lateral Topic';
    const match = TOPICS.find(t => t.id === tId);
    return match ? match.title : 'General Maths Stretch';
  };

  const getSelectedStudentName = () => {
    if (targetStudentId === 'all') return 'the boys (Rayan & Zayd)';
    const found = students.find(s => s.id === targetStudentId);
    return found ? `${found.name} (Year ${found.yearGroup})` : 'the student';
  };

  const handleGenerateAndSaveRequest = (e: React.FormEvent) => {
    e.preventDefault();
    const effectiveTopicTitle = getTopicTitle(topicId);
    const studentName = getSelectedStudentName();

    const newReq = StorageService.addCustomRequest({
      topicId,
      topicTitle: effectiveTopicTitle,
      customTopicName: topicId === 'custom' ? customTopicName : undefined,
      targetStudentId,
      difficulty,
      style,
      notes: notes.trim(),
      count
    });

    const styleLabels: Record<QuestionRequestStyle, string> = {
      gcse_multi_step: 'Multi-Step Higher GCSE Grade 8/9 Stretch',
      morning_quick: 'Rapid Morning 5-10 Min Quick Challenge',
      lateral_puzzle: 'UKMT Lateral Olympiad / Problem Solving',
      algebraic_proof: 'Algebraic & Geometric Proof Problem'
    };

    const promptText = `Can you add ${count} custom question(s) for:
- Topic: ${effectiveTopicTitle}
- Target Learner: ${studentName}
- Target Difficulty: ${difficulty.replace('_', ' ').toUpperCase()}
- Format Style: ${styleLabels[style]}
${notes.trim() ? `- Focus Notes: ${notes.trim()}\n` : ''}
Please include step-by-step working, mark schemes (M1, A1), conceptual hints, and examiner tips for each question.`;

    setCreatedPrompt(promptText);
    setSavedRequests(StorageService.getCustomRequests());
  };

  const handleCopyPrompt = async () => {
    if (!createdPrompt) return;
    try {
      await navigator.clipboard.writeText(createdPrompt);
      setCopiedSuccess(true);
      setTimeout(() => setCopiedSuccess(false), 3000);
    } catch {
      // Fallback
      setCopiedSuccess(true);
    }
  };

  const handleDeleteRequest = (reqId: string) => {
    StorageService.deleteCustomRequest(reqId);
    setSavedRequests(StorageService.getCustomRequests());
  };

  const handleCreateCustomQuestion = (e: React.FormEvent) => {
    e.preventDefault();
    if (!createTitle.trim() || !createPrompt.trim() || !createFinalAnswer.trim()) {
      return;
    }

    const topicMeta = TOPICS.find(t => t.id === createTopicId);
    const strandId = topicMeta?.strandId || 'geometry';

    const newQuestion: Question = {
      id: `q_custom_${Date.now()}`,
      topicId: createTopicId,
      strandId,
      title: createTitle.trim(),
      prompt: createPrompt.trim(),
      maxMarks: createMaxMarks,
      calculatorAllowed: createCalcAllowed,
      difficulty: createDifficulty,
      tags: ['Custom Question', topicMeta?.title || 'Stretch'],
      isMorningQuickEligible: createIsMorning,
      citation: {
        sourceType: 'custom_stretch',
        sourceLabel: createSourceLabel.trim() || 'Custom Tutor Question',
        isOfficialPublicArchive: false
      },
      hints: [
        ...(createHint1.trim() ? [createHint1.trim()] : []),
        ...(createHint2.trim() ? [createHint2.trim()] : [])
      ],
      solution: {
        steps: [
          {
            description: createStepDesc.trim() || 'Step-by-step method:',
            math: createStepMath.trim() || undefined,
            markTag: 'M1'
          }
        ],
        finalAnswer: createFinalAnswer.trim(),
        examinerTips: 'Check your units and algebraic signs carefully.'
      }
    };

    StorageService.addCustomQuestion(newQuestion);
    setSavedCustomQuestions(StorageService.getCustomQuestions());
    setCreateSuccessMsg(`✓ Added "${createTitle}" into the Question Bank!`);

    // Reset fields
    setCreateTitle('');
    setCreatePrompt('');
    setCreateFinalAnswer('');
    setCreateHint1('');
    setCreateHint2('');
    setCreateStepDesc('');
    setCreateStepMath('');

    if (onQuestionAdded) {
      onQuestionAdded();
    }
  };

  const handleDeleteCustomQuestion = (qId: string) => {
    StorageService.deleteCustomQuestion(qId);
    setSavedCustomQuestions(StorageService.getCustomQuestions());
    if (onQuestionAdded) {
      onQuestionAdded();
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 animate-fadeIn overflow-y-auto">
      <div className="bg-white rounded-3xl shadow-2xl border border-slate-200 w-full max-w-2xl my-8 overflow-hidden flex flex-col">
        {/* Header */}
        <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 text-white p-6 relative">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-indigo-500/20 text-indigo-300 flex items-center justify-center border border-indigo-500/30">
                <Sparkles className="w-5 h-5 text-amber-400" />
              </div>
              <div>
                <h2 className="text-xl font-extrabold tracking-tight">Request & Add Custom Questions</h2>
                <p className="text-xs text-slate-300">
                  Request stretch problems from your AI tutor or add textbook questions directly to the bank
                </p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="text-slate-400 hover:text-white transition-colors p-2 rounded-xl hover:bg-white/10"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Navigation Sub-Tabs */}
          <div className="flex gap-2 mt-6 pt-2 border-t border-white/10 text-xs sm:text-sm font-semibold">
            <button
              onClick={() => setActiveTab('request')}
              className={`px-4 py-2 rounded-xl transition-all flex items-center gap-1.5 ${
                activeTab === 'request'
                  ? 'bg-brand-600 text-white shadow-sm'
                  : 'text-slate-300 hover:bg-white/10'
              }`}
            >
              <Send className="w-3.5 h-3.5" />
              Request New Questions
            </button>
            <button
              onClick={() => setActiveTab('create')}
              className={`px-4 py-2 rounded-xl transition-all flex items-center gap-1.5 ${
                activeTab === 'create'
                  ? 'bg-brand-600 text-white shadow-sm'
                  : 'text-slate-300 hover:bg-white/10'
              }`}
            >
              <PlusCircle className="w-3.5 h-3.5" />
              Add Question to Bank
            </button>
            <button
              onClick={() => setActiveTab('manage')}
              className={`px-4 py-2 rounded-xl transition-all flex items-center gap-1.5 ${
                activeTab === 'manage'
                  ? 'bg-brand-600 text-white shadow-sm'
                  : 'text-slate-300 hover:bg-white/10'
              }`}
            >
              <Layers className="w-3.5 h-3.5" />
              My Requests & Bank ({savedRequests.length + savedCustomQuestions.length})
            </button>
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto max-h-[70vh]">
          {/* ================================================= */}
          {/* TAB 1: REQUEST NEW QUESTIONS (AI PROMPT BUILDER) */}
          {/* ================================================= */}
          {activeTab === 'request' && (
            <div className="space-y-6">
              {!createdPrompt ? (
                <form onSubmit={handleGenerateAndSaveRequest} className="space-y-4">
                  {/* Topic Select */}
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                      Curriculum Topic / Concept
                    </label>
                    <select
                      value={topicId}
                      onChange={(e) => handleTopicChange(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm font-semibold text-slate-800 bg-white focus:outline-none focus:ring-2 focus:ring-brand-500"
                    >
                      <optgroup label="Core Curriculum Topics">
                        {TOPICS.map((t) => (
                          <option key={t.id} value={t.id}>
                            [{t.shortCode}] {t.title}
                          </option>
                        ))}
                      </optgroup>
                      <option value="custom">✨ Other / Custom Lateral Topic...</option>
                    </select>
                  </div>

                  {/* Custom Topic Name (if selected) */}
                  {topicId === 'custom' && (
                    <div className="animate-fadeIn">
                      <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                        Specific Topic Name
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. 3D Pythagoras on Frustums or Pigeonhole Principle"
                        value={customTopicName}
                        onChange={(e) => setCustomTopicName(e.target.value)}
                        required
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm text-slate-800 bg-white focus:outline-none focus:ring-2 focus:ring-brand-500"
                      />
                    </div>
                  )}

                  {/* Grid: Target Student & Difficulty */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                        Target Student
                      </label>
                      <select
                        value={targetStudentId}
                        onChange={(e) => setTargetStudentId(e.target.value)}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm font-semibold text-slate-800 bg-white focus:outline-none focus:ring-2 focus:ring-brand-500"
                      >
                        <option value="all">Both Boys (Rayan & Zayd)</option>
                        {students.map((s) => (
                          <option key={s.id} value={s.id}>
                            {s.avatarEmoji} {s.name} (Year {s.yearGroup})
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                        Target Difficulty
                      </label>
                      <select
                        value={difficulty}
                        onChange={(e) => setDifficulty(e.target.value as DifficultyLevel)}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm font-semibold text-slate-800 bg-white focus:outline-none focus:ring-2 focus:ring-brand-500"
                      >
                        <option value="grade_7">GCSE Grade 7 (Strong Foundation)</option>
                        <option value="grade_8_9">GCSE Grade 8/9 (Top Tier Stretch)</option>
                        <option value="ukmt_junior">UKMT Junior Challenge (Lateral Thinking)</option>
                        <option value="ukmt_intermediate">UKMT Intermediate Challenge (Olympiad)</option>
                      </select>
                    </div>
                  </div>

                  {/* Grid: Style & Question Count */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                        Question Format / Style
                      </label>
                      <select
                        value={style}
                        onChange={(e) => setStyle(e.target.value as QuestionRequestStyle)}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm font-semibold text-slate-800 bg-white focus:outline-none focus:ring-2 focus:ring-brand-500"
                      >
                        <option value="gcse_multi_step">🎯 Multi-Step Exam Stretch</option>
                        <option value="morning_quick">⚡ Morning 5-Min Rapid Challenge</option>
                        <option value="lateral_puzzle">💡 Lateral UKMT Puzzle / Unfolding Nets</option>
                        <option value="algebraic_proof">📐 Rigorous Proof (Show that...)</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                        Quantity
                      </label>
                      <select
                        value={count}
                        onChange={(e) => setCount(Number(e.target.value))}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm font-semibold text-slate-800 bg-white focus:outline-none focus:ring-2 focus:ring-brand-500"
                      >
                        <option value={1}>1 Question (Focused single challenge)</option>
                        <option value={2}>2 Questions (Duo set)</option>
                        <option value={3}>3 Questions (Standard Practice Set)</option>
                        <option value={5}>5 Questions (Comprehensive deep dive)</option>
                      </select>
                    </div>
                  </div>

                  {/* Tutor Focus Notes */}
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                      Specific Focus, Weaknesses or Context (Optional)
                    </label>
                    <textarea
                      rows={3}
                      placeholder="e.g. Make sure it involves algebraic side expressions that form a quadratic equation, or include a circle chord distance diagram..."
                      value={notes}
                      onChange={(e) => setNotes(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm text-slate-800 bg-white focus:outline-none focus:ring-2 focus:ring-brand-500"
                    />
                  </div>

                  {/* Submit Button */}
                  <div className="pt-2">
                    <button
                      type="submit"
                      className="w-full py-3 px-5 rounded-2xl bg-brand-600 hover:bg-brand-700 text-white font-bold text-sm shadow-md transition-all flex items-center justify-center gap-2 active:scale-98"
                    >
                      <Sparkles className="w-4 h-4 text-amber-300" />
                      Create Question Request & Generate AI Prompt
                    </button>
                  </div>
                </form>
              ) : (
                /* Success Prompt View */
                <div className="space-y-4 animate-fadeIn">
                  <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-900 text-sm flex items-start gap-3">
                    <div className="w-7 h-7 rounded-xl bg-emerald-200 text-emerald-800 flex items-center justify-center shrink-0 mt-0.5">
                      <Check className="w-4 h-4 stroke-[3]" />
                    </div>
                    <div>
                      <p className="font-bold">Question Request Saved to Your Backlog!</p>
                      <p className="text-xs text-emerald-700 mt-0.5">
                        Copy the prompt below and paste it directly into our conversation to have these questions instantly added to your bank.
                      </p>
                    </div>
                  </div>

                  {/* Formatted Prompt Card */}
                  <div className="bg-slate-900 text-slate-100 rounded-2xl p-4 font-mono text-xs relative group">
                    <pre className="whitespace-pre-wrap leading-relaxed">{createdPrompt}</pre>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-3 pt-2">
                    <button
                      onClick={handleCopyPrompt}
                      className={`flex-1 py-3 px-4 rounded-2xl font-bold text-sm shadow-md transition-all flex items-center justify-center gap-2 active:scale-98 ${
                        copiedSuccess
                          ? 'bg-emerald-600 text-white'
                          : 'bg-indigo-600 hover:bg-indigo-700 text-white'
                      }`}
                    >
                      {copiedSuccess ? (
                        <>
                          <Check className="w-4 h-4" />
                          Copied to Clipboard!
                        </>
                      ) : (
                        <>
                          <Copy className="w-4 h-4" />
                          Copy Prompt for AI Assistant
                        </>
                      )}
                    </button>

                    <button
                      onClick={() => setCreatedPrompt(null)}
                      className="py-3 px-4 rounded-2xl font-bold text-sm border border-slate-200 text-slate-700 hover:bg-slate-100 transition-all text-center"
                    >
                      Submit Another Request
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* ================================================= */}
          {/* TAB 2: ADD QUESTION DIRECTLY TO LOCAL BANK */}
          {/* ================================================= */}
          {activeTab === 'create' && (
            <form onSubmit={handleCreateCustomQuestion} className="space-y-4">
              {createSuccessMsg && (
                <div className="p-3 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold flex items-center gap-2 animate-fadeIn">
                  <Check className="w-4 h-4 text-emerald-600" />
                  {createSuccessMsg}
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                    Curriculum Topic
                  </label>
                  <select
                    value={createTopicId}
                    onChange={(e) => setCreateTopicId(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 text-sm font-semibold text-slate-800 bg-white focus:outline-none focus:ring-2 focus:ring-brand-500"
                  >
                    {TOPICS.map((t) => (
                      <option key={t.id} value={t.id}>
                        [{t.shortCode}] {t.title}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                    Difficulty Level
                  </label>
                  <select
                    value={createDifficulty}
                    onChange={(e) => setCreateDifficulty(e.target.value as DifficultyLevel)}
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 text-sm font-semibold text-slate-800 bg-white focus:outline-none focus:ring-2 focus:ring-brand-500"
                  >
                    <option value="grade_7">Grade 7</option>
                    <option value="grade_8_9">Grade 8/9</option>
                    <option value="ukmt_junior">UKMT Junior</option>
                    <option value="ukmt_intermediate">UKMT Intermediate</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  Question Title
                </label>
                <input
                  type="text"
                  placeholder="e.g. Algebraic Pythagoras: Right-angled Triangle Hypotenuse"
                  value={createTitle}
                  onChange={(e) => setCreateTitle(e.target.value)}
                  required
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm text-slate-800 bg-white focus:outline-none focus:ring-2 focus:ring-brand-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  Question Prompt (Markdown & LaTeX supported e.g. $x^2$)
                </label>
                <textarea
                  rows={3}
                  placeholder="Type or paste question prompt here. You can use math notation like $a^2 + b^2 = c^2$..."
                  value={createPrompt}
                  onChange={(e) => setCreatePrompt(e.target.value)}
                  required
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm text-slate-800 bg-white font-mono text-xs focus:outline-none focus:ring-2 focus:ring-brand-500"
                />
              </div>

              {/* Hints */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                    Hint 1 (Conceptual)
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Set up Pythagoras' theorem $a^2+b^2=c^2$."
                    value={createHint1}
                    onChange={(e) => setCreateHint1(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs text-slate-800 bg-white"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                    Hint 2 (Next Step)
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Expand $(x+7)^2$ and rearrange to quadratic."
                    value={createHint2}
                    onChange={(e) => setCreateHint2(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs text-slate-800 bg-white"
                  />
                </div>
              </div>

              {/* Final Answer & Solution Method */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                    Final Answer
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. x = 6, Area = 30 cm²"
                    value={createFinalAnswer}
                    onChange={(e) => setCreateFinalAnswer(e.target.value)}
                    required
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs font-bold text-slate-800 bg-white"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                    Citation / Source
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Edexcel 2023 Paper 1H, Q19 or Dad's Book"
                    value={createSourceLabel}
                    onChange={(e) => setCreateSourceLabel(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs text-slate-800 bg-white"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                    Solution Step Description
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Substitute sides into Pythagoras:"
                    value={createStepDesc}
                    onChange={(e) => setCreateStepDesc(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs text-slate-800 bg-white"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                    Step Math (LaTeX)
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. (x-1)^2 + (x+6)^2 = (x+7)^2"
                    value={createStepMath}
                    onChange={(e) => setCreateStepMath(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs font-mono text-slate-800 bg-white"
                  />
                </div>
              </div>

              {/* Toggles */}
              <div className="flex flex-wrap items-center gap-6 pt-2 text-xs font-semibold text-slate-700">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={createCalcAllowed}
                    onChange={(e) => setCreateCalcAllowed(e.target.checked)}
                    className="rounded text-brand-600 focus:ring-brand-500 w-4 h-4"
                  />
                  <span>Calculator Allowed</span>
                </label>

                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={createIsMorning}
                    onChange={(e) => setCreateIsMorning(e.target.checked)}
                    className="rounded text-amber-600 focus:ring-amber-500 w-4 h-4"
                  />
                  <span>Eligible for Morning 5-Min Challenge</span>
                </label>
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full py-3 px-5 rounded-2xl bg-brand-600 hover:bg-brand-700 text-white font-bold text-sm shadow-md transition-all flex items-center justify-center gap-2 active:scale-98"
                >
                  <PlusCircle className="w-4 h-4 text-white" />
                  Save Question to Question Bank
                </button>
              </div>
            </form>
          )}

          {/* ================================================= */}
          {/* TAB 3: SAVED REQUESTS & CUSTOM BANK */}
          {/* ================================================= */}
          {activeTab === 'manage' && (
            <div className="space-y-6">
              {/* Custom Questions in Bank */}
              <div>
                <h3 className="text-sm font-bold text-slate-900 mb-3 flex items-center gap-2">
                  <FileText className="w-4 h-4 text-brand-600" />
                  Custom Questions in Local Bank ({savedCustomQuestions.length})
                </h3>
                {savedCustomQuestions.length === 0 ? (
                  <p className="text-xs text-slate-400 bg-slate-50 p-4 rounded-xl border border-slate-200">
                    No custom questions created yet. Use the "Add Question to Bank" tab to save your own questions!
                  </p>
                ) : (
                  <div className="space-y-2">
                    {savedCustomQuestions.map((q) => (
                      <div
                        key={q.id}
                        className="bg-white border border-slate-200 rounded-xl p-3.5 flex items-center justify-between gap-3 shadow-xs hover:border-slate-300 transition-all"
                      >
                        <div>
                          <p className="text-xs font-bold text-slate-800">{q.title}</p>
                          <p className="text-[11px] text-slate-500">
                            Topic: {getTopicTitle(q.topicId)} • {q.difficulty.replace('_', ' ').toUpperCase()} • {q.maxMarks} marks
                          </p>
                        </div>
                        <button
                          onClick={() => handleDeleteCustomQuestion(q.id)}
                          className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                          title="Delete custom question"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Saved Question Requests Backlog */}
              <div className="pt-4 border-t border-slate-200">
                <h3 className="text-sm font-bold text-slate-900 mb-3 flex items-center gap-2">
                  <Lightbulb className="w-4 h-4 text-amber-500" />
                  Requested Questions Backlog ({savedRequests.length})
                </h3>
                {savedRequests.length === 0 ? (
                  <p className="text-xs text-slate-400 bg-slate-50 p-4 rounded-xl border border-slate-200">
                    No active requests. Submit a request in Tab 1 to track topics you want more questions for!
                  </p>
                ) : (
                  <div className="space-y-2">
                    {savedRequests.map((r) => (
                      <div
                        key={r.id}
                        className="bg-slate-50 border border-slate-200 rounded-xl p-3.5 flex items-start justify-between gap-3"
                      >
                        <div className="space-y-1">
                          <div className="flex items-center gap-2">
                            <span className="text-xs font-bold text-slate-900">
                              {r.topicTitle || getTopicTitle(r.topicId)}
                            </span>
                            <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-amber-100 text-amber-800">
                              {r.count} questions • {r.difficulty}
                            </span>
                          </div>
                          {r.notes && (
                            <p className="text-xs text-slate-600 italic">"{r.notes}"</p>
                          )}
                          <p className="text-[10px] text-slate-400">
                            Requested {new Date(r.requestedAt).toLocaleDateString()}
                          </p>
                        </div>
                        <button
                          onClick={() => handleDeleteRequest(r.id)}
                          className="p-1.5 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                          title="Remove request"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
