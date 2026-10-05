import React, { useState, useEffect } from 'react';
import { SetGenerationOptions } from '../../services/generatorService';
import { TOPICS, STRANDS } from '../../data/curriculumData';
import { DifficultyLevel } from '../../types/curriculum';
import { StudentProfile } from '../../types/student';
import { Sliders, Sparkles, Lightbulb, BookOpen, CheckCircle2, Loader2 } from 'lucide-react';

interface SetConfiguratorProps {
  student: StudentProfile;
  initialTopicId?: string;
  onGenerate: (options: SetGenerationOptions) => void;
  onOpenRequestModal?: () => void;
}

export const SetConfigurator: React.FC<SetConfiguratorProps> = ({
  student,
  initialTopicId,
  onGenerate,
  onOpenRequestModal
}) => {
  const [mode, setMode] = useState<SetGenerationOptions['mode']>(initialTopicId ? 'topic' : 'topic');
  const [selectedTopicId, setSelectedTopicId] = useState<string>(initialTopicId || TOPICS[0].id);
  const [difficulty, setDifficulty] = useState<DifficultyLevel | 'all'>('all');
  const [count, setCount] = useState<number>(3);
  const [calcAllowed, setCalcAllowed] = useState<boolean | 'any'>('any');

  const [isGenerating, setIsGenerating] = useState(false);
  const [feedbackMessage, setFeedbackMessage] = useState<string | null>(null);

  // Sync if initialTopicId changes externally (e.g. from curriculum page or focus-next card)
  useEffect(() => {
    if (initialTopicId) {
      setSelectedTopicId(initialTopicId);
      setMode('topic');
    }
  }, [initialTopicId]);

  const handleGenerate = (e: React.FormEvent) => {
    e.preventDefault();
    setIsGenerating(true);
    setFeedbackMessage(null);

    // Provide immediate responsive feedback with quick animation
    setTimeout(() => {
      onGenerate({
        mode,
        topicId: mode === 'topic' ? selectedTopicId : undefined,
        difficulty: difficulty === 'all' ? undefined : difficulty,
        count,
        calculatorAllowed: calcAllowed
      });
      setIsGenerating(false);
      setFeedbackMessage(`✓ Problem set ready! Generated ${count} questions.`);

      // Smooth scroll down to questions container
      setTimeout(() => {
        const el = document.getElementById('problem-set-container');
        if (el) {
          el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 100);
    }, 250);
  };

  return (
    <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-6 sm:p-8 no-print mb-8">
      <div className="flex items-center justify-between mb-6 pb-4 border-b border-slate-100">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-brand-50 text-brand-600 flex items-center justify-center">
            <Sliders className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-lg sm:text-xl font-bold text-slate-900">
              Configure New Problem Set
            </h2>
            <p className="text-xs text-slate-500">
              Tailored for <span className="font-semibold text-slate-700">{student.name}</span>
            </p>
          </div>
        </div>

        {onOpenRequestModal && (
          <button
            type="button"
            onClick={onOpenRequestModal}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-indigo-50 hover:bg-indigo-100 text-indigo-700 text-xs sm:text-sm font-bold transition-all border border-indigo-200/80 shadow-xs active:scale-95"
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
            <span>Request Custom Questions</span>
          </button>
        )}
      </div>

      <form onSubmit={handleGenerate} className="space-y-6">
        {/* Practice Mode Selector */}
        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
            Practice Style
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {[
              {
                id: 'topic',
                label: 'Topic Deep-Dive',
                icon: BookOpen,
                desc: 'Master a specific curriculum topic'
              },
              {
                id: 'mixed_gcse',
                label: 'Mixed GCSE Stretch',
                icon: Sparkles,
                desc: 'Multi-topic Grade 8/9 exam synthesis'
              },
              {
                id: 'ukmt',
                label: 'UKMT Lateral Puzzles',
                icon: Lightbulb,
                desc: 'Olympiad & competition challenge'
              }
            ].map(item => {
              const Icon = item.icon;
              const isSelected = mode === item.id;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => {
                    setMode(item.id as any);
                    setFeedbackMessage(null);
                  }}
                  className={`flex flex-col items-start p-4 rounded-2xl border text-left transition-all ${
                    isSelected
                      ? 'border-brand-500 bg-brand-50/60 ring-2 ring-brand-500/20'
                      : 'border-slate-200 hover:border-slate-300 bg-white'
                  }`}
                >
                  <div className="flex items-center gap-2 mb-1">
                    <Icon className={`w-4 h-4 ${isSelected ? 'text-brand-600' : 'text-slate-500'}`} />
                    <span className="font-bold text-sm text-slate-900">{item.label}</span>
                  </div>
                  <span className="text-xs text-slate-500">{item.desc}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Topic Dropdown (if mode === 'topic') */}
        {mode === 'topic' && (
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-1">
              Select Specific Topic
            </label>
            <select
              value={selectedTopicId}
              onChange={e => {
                setSelectedTopicId(e.target.value);
                setFeedbackMessage(null);
              }}
              className="w-full px-4 py-3 rounded-2xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-brand-500 text-sm font-semibold bg-white text-slate-800"
            >
              {STRANDS.map(strand => {
                const strandTopics = TOPICS.filter(t => t.strandId === strand.id);
                if (strandTopics.length === 0) return null;
                return (
                  <optgroup key={strand.id} label={strand.name}>
                    {strandTopics.map(topic => (
                      <option key={topic.id} value={topic.id}>
                        {topic.shortCode} • {topic.title}
                      </option>
                    ))}
                  </optgroup>
                );
              })}
            </select>
          </div>
        )}

        {/* Difficulty & Count Options */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-1">
              Difficulty Tier
            </label>
            <select
              value={difficulty}
              onChange={e => {
                setDifficulty(e.target.value as any);
                setFeedbackMessage(null);
              }}
              className="w-full px-3 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-brand-500 text-sm font-medium bg-white text-slate-800"
            >
              <option value="all">Any Suitable Tier</option>
              <option value="grade_5_6">Grade 5-6 Standard (Conventional Foundation/Higher)</option>
              <option value="grade_7">Grade 7 Higher</option>
              <option value="grade_8_9">Grade 8-9 Top Tier</option>
              <option value="ukmt_junior">UKMT Junior (Y7/8 Lateral)</option>
              <option value="ukmt_intermediate">UKMT Intermediate (Y9/11 Lateral)</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-1">
              Number of Questions
            </label>
            <div className="grid grid-cols-3 gap-2">
              {[3, 5, 8].map(n => (
                <button
                  key={n}
                  type="button"
                  onClick={() => {
                    setCount(n);
                    setFeedbackMessage(null);
                  }}
                  className={`py-2 rounded-xl text-sm font-bold border transition-all ${
                    count === n
                      ? 'bg-brand-600 text-white border-brand-600 shadow-xs'
                      : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                  }`}
                >
                  {n}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-1">
              Calculator Mode
            </label>
            <select
              value={calcAllowed === 'any' ? 'any' : calcAllowed ? 'calc' : 'non_calc'}
              onChange={e => {
                const val = e.target.value;
                setCalcAllowed(val === 'any' ? 'any' : val === 'calc');
                setFeedbackMessage(null);
              }}
              className="w-full px-3 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-brand-500 text-sm font-medium bg-white text-slate-800"
            >
              <option value="any">Both / Any</option>
              <option value="non_calc">Non-Calculator (Mental / Paper)</option>
              <option value="calc">Calculator Permitted</option>
            </select>
          </div>
        </div>

        {/* Generate Button & Feedback Message */}
        <div className="pt-2 space-y-3">
          <button
            type="submit"
            disabled={isGenerating}
            className={`w-full flex items-center justify-center gap-2 py-3.5 px-6 rounded-2xl text-white text-base font-bold shadow-md hover:shadow-lg transition-all active:scale-[0.99] ${
              isGenerating
                ? 'bg-brand-400 cursor-wait'
                : 'bg-brand-600 hover:bg-brand-700'
            }`}
          >
            {isGenerating ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                <span>Generating Problem Set...</span>
              </>
            ) : (
              <>
                <Sparkles className="w-5 h-5" />
                <span>Generate Problem Set ({count} Questions)</span>
              </>
            )}
          </button>

          {feedbackMessage && (
            <div className="flex items-center justify-center gap-2 text-xs font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 py-2.5 px-4 rounded-xl animate-fadeIn">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>{feedbackMessage}</span>
            </div>
          )}
        </div>
      </form>
    </div>
  );
};
