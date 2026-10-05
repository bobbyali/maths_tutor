import React, { useState } from 'react';
import { Question } from '../../types/question';
import { MathText } from '../common/MathText';
import { CitationLink } from '../common/CitationLink';
import { 
  Eye, 
  EyeOff,
  HelpCircle, 
  CheckCircle2, 
  XCircle, 
  Calculator, 
  ChevronDown, 
  ChevronUp,
  Sparkles
} from 'lucide-react';

interface ProblemCardProps {
  question: Question;
  index: number;
  total: number;
  onRecommendSimilar?: (question: Question) => void;
}

export const ProblemCard: React.FC<ProblemCardProps> = ({
  question,
  index,
  total,
  onRecommendSimilar
}) => {
  const [hintLevel, setHintLevel] = useState(0);
  const [showSolution, setShowSolution] = useState(false);
  
  // Optional digital input testing
  const [digitalInput, setDigitalInput] = useState('');
  const [digitalStatus, setDigitalStatus] = useState<'idle' | 'correct' | 'incorrect'>('idle');

  const checkDigitalAnswer = () => {
    if (!question.digitalAnswer || !digitalInput.trim()) return;
    const cleanInput = digitalInput.trim().toLowerCase().replace(/\s+/g, '');
    const expectedList = Array.isArray(question.digitalAnswer.expected) 
      ? question.digitalAnswer.expected 
      : [question.digitalAnswer.expected];

    const match = expectedList.some(exp => exp.toLowerCase().replace(/\s+/g, '') === cleanInput);
    setDigitalStatus(match ? 'correct' : 'incorrect');
  };

  return (
    <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-6 sm:p-8 space-y-6 page-break-inside-avoid">
      {/* Header bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 pb-4">
        <div className="flex items-center gap-2">
          <span className="w-8 h-8 rounded-xl bg-slate-900 text-white font-bold flex items-center justify-center text-sm">
            {index + 1}
          </span>
          <span className="text-xs font-semibold text-slate-400">
            of {total}
          </span>
          <span className="text-xs font-bold uppercase tracking-wider px-2.5 py-1 rounded-full bg-slate-100 text-slate-700">
            {question.difficulty.replace('_', ' ')}
          </span>
        </div>

        <div className="flex items-center gap-3">
          <span className="flex items-center gap-1 text-xs font-semibold text-slate-500">
            <Calculator className={`w-3.5 h-3.5 ${question.calculatorAllowed ? 'text-emerald-600' : 'text-slate-400'}`} />
            {question.calculatorAllowed ? 'Calculator' : 'Non-Calc'}
          </span>
          <span className="text-xs font-bold text-brand-700 bg-brand-50 px-2.5 py-1 rounded-full border border-brand-200">
            {question.maxMarks} Marks
          </span>
        </div>
      </div>

      {/* Title & Prompt */}
      <div className="space-y-4">
        <h3 className="text-lg font-bold text-slate-900 leading-snug">
          {question.title}
        </h3>

        <div className="text-slate-800 text-base leading-relaxed bg-slate-50/70 p-5 rounded-2xl border border-slate-100">
          <MathText content={question.prompt} />
        </div>

        {/* Citation Link & Targeted Recommendations */}
        <div className="pt-1 flex items-center justify-between gap-3 flex-wrap">
          <CitationLink citation={question.citation} />

          {onRecommendSimilar && (
            <button
              type="button"
              onClick={() => onRecommendSimilar(question)}
              className="no-print inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-violet-50 hover:bg-violet-100 text-violet-700 hover:text-violet-800 text-xs font-bold transition-all border border-violet-200/80 shadow-xs active:scale-95 cursor-pointer"
              title="Generate a custom set of questions similar to this topic and difficulty"
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
              <span>More Like This</span>
            </button>
          )}
        </div>
      </div>

      {/* Optional Digital Answer Input for self-paced testing */}
      {question.digitalAnswer && (
        <div className="no-print bg-slate-50 border border-slate-200 rounded-2xl p-4 space-y-2">
          <p className="text-xs font-semibold text-slate-600">
            Optional Independent Check:
          </p>
          <div className="flex items-center gap-2">
            <input
              type="text"
              placeholder="Enter numerical or simplified answer..."
              value={digitalInput}
              onChange={e => {
                setDigitalInput(e.target.value);
                setDigitalStatus('idle');
              }}
              onKeyDown={e => e.key === 'Enter' && checkDigitalAnswer()}
              className="flex-1 px-3 py-2 text-sm bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-500 font-mono"
            />
            <button
              onClick={checkDigitalAnswer}
              className="px-4 py-2 text-xs font-bold bg-slate-800 hover:bg-slate-900 text-white rounded-xl transition-colors"
            >
              Verify
            </button>
          </div>

          {digitalStatus === 'correct' && (
            <p className="text-xs font-bold text-emerald-600 flex items-center gap-1.5 animate-fadeIn">
              <CheckCircle2 className="w-4 h-4" /> That matches the mark scheme!
            </p>
          )}
          {digitalStatus === 'incorrect' && (
            <p className="text-xs font-bold text-rose-600 flex items-center gap-1.5 animate-fadeIn">
              <XCircle className="w-4 h-4" /> Not quite—try expanding with pen and paper or consult a hint.
            </p>
          )}
        </div>
      )}

      {/* Hints & Solutions (Collapsible for tutoring) */}
      <div className="no-print space-y-3 pt-2 border-t border-slate-100">
        {/* Progressive Hints */}
        {question.hints && question.hints.length > 0 && (
          <div className="space-y-2">
            {hintLevel > 0 && (
              <div className="space-y-2">
                {question.hints.slice(0, hintLevel).map((h, i) => (
                  <div key={i} className="bg-amber-50 border border-amber-200 p-3.5 rounded-xl text-xs sm:text-sm text-amber-950 animate-fadeIn">
                    <div className="flex items-center justify-between mb-1">
                      <p className="font-bold text-amber-800">Hint {i + 1}:</p>
                      <button
                        onClick={() => setHintLevel(0)}
                        className="text-[11px] font-semibold text-amber-700 hover:text-amber-900 flex items-center gap-1 hover:underline cursor-pointer"
                        title="Hide hints so students cannot see"
                      >
                        <EyeOff className="w-3 h-3" /> Hide Hint
                      </button>
                    </div>
                    <MathText content={h} />
                  </div>
                ))}
              </div>
            )}

            <div className="flex items-center gap-2 flex-wrap">
              {hintLevel < question.hints.length && !showSolution && (
                <button
                  onClick={() => setHintLevel(prev => prev + 1)}
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-amber-700 hover:text-amber-900 bg-amber-50 hover:bg-amber-100 border border-amber-200 px-3 py-1.5 rounded-xl transition-colors cursor-pointer"
                >
                  <HelpCircle className="w-3.5 h-3.5" />
                  {hintLevel === 0 ? 'Give a Hint / Tip' : 'Give Next Hint'}
                </button>
              )}

              {hintLevel > 0 && (
                <button
                  onClick={() => setHintLevel(0)}
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-600 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 border border-slate-200 px-3 py-1.5 rounded-xl transition-colors cursor-pointer"
                  title="Hide hints immediately"
                >
                  <EyeOff className="w-3.5 h-3.5 text-slate-500" />
                  <span>Hide Hints</span>
                </button>
              )}
            </div>
          </div>
        )}

        {/* Full Solution Toggle */}
        <div>
          <button
            onClick={() => setShowSolution(!showSolution)}
            className="flex items-center gap-1.5 text-xs font-bold text-indigo-700 hover:text-indigo-900 py-1.5 transition-colors"
          >
            <Eye className="w-3.5 h-3.5" />
            <span>{showSolution ? 'Hide Worked Solution' : 'Reveal Full Worked Solution & Mark Scheme'}</span>
            {showSolution ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
          </button>

          {showSolution && (
            <div className="mt-3 bg-indigo-50/50 border border-indigo-200 p-4 sm:p-5 rounded-2xl space-y-3 animate-fadeIn">
              <div className="flex items-center justify-between border-b border-indigo-100 pb-2">
                <span className="font-bold text-indigo-900 text-xs sm:text-sm flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-indigo-600" /> Mark Scheme Working
                </span>
                <span className="text-[11px] font-semibold text-indigo-600">Method & Accuracy Marks</span>
              </div>

              <div className="space-y-2.5">
                {question.solution.steps.map((st, i) => (
                  <div key={i} className="bg-white p-3 rounded-xl border border-indigo-100 text-xs sm:text-sm">
                    <div className="flex items-center justify-between gap-2 mb-1">
                      <div className="font-medium text-slate-800">
                        <MathText content={st.description} />
                      </div>
                      {st.markTag && (
                        <span className="text-[10px] font-bold text-brand-700 bg-brand-50 px-1.5 py-0.5 rounded border border-brand-200">
                          {st.markTag}
                        </span>
                      )}
                    </div>
                    {st.math && <MathText content={st.math} block={true} />}
                  </div>
                ))}
              </div>

              <div className="bg-indigo-600 text-white p-3.5 rounded-xl">
                <p className="text-[10px] uppercase font-bold tracking-wider text-indigo-200 mb-0.5">Final Mark</p>
                <div className="text-base font-bold">
                  <MathText content={question.solution.finalAnswer} />
                </div>
              </div>

              {question.solution.examinerTips && (
                <div className="text-xs text-indigo-900 bg-indigo-100/60 p-2.5 rounded-lg italic">
                  💡 <strong>Examiner Note:</strong> <MathText content={question.solution.examinerTips} />
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
