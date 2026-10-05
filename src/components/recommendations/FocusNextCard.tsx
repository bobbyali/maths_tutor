import React from 'react';
import { RecommendationCard } from '../../services/recommenderService';
import { 
  AlertTriangle, 
  RotateCcw, 
  Unlock, 
  Lightbulb, 
  Play, 
  ArrowRight,
  Sparkles
} from 'lucide-react';

interface FocusNextCardProps {
  recommendation: RecommendationCard;
  onLaunch: (topicId: string) => void;
}

export const FocusNextCard: React.FC<FocusNextCardProps> = ({
  recommendation,
  onLaunch
}) => {
  const isWeak = recommendation.type === 'weak_spot';
  const isRep = recommendation.type === 'spaced_repetition';
  const isUnlock = recommendation.type === 'next_unlock';
  const isLateral = recommendation.type === 'lateral_stretch';

  const badgeConfig = isWeak
    ? { bg: 'bg-rose-50 text-rose-800 border-rose-200', icon: AlertTriangle, label: 'Weak Spot Intervention' }
    : isRep
      ? { bg: 'bg-amber-50 text-amber-800 border-amber-200', icon: RotateCcw, label: 'Spaced Repetition Review' }
      : isUnlock
        ? { bg: 'bg-blue-50 text-blue-800 border-blue-200', icon: Unlock, label: 'Curriculum Unlock' }
        : { bg: 'bg-purple-50 text-purple-800 border-purple-200', icon: Lightbulb, label: 'UKMT Lateral Challenge' };

  const Icon = badgeConfig.icon;

  return (
    <div className="bg-white rounded-3xl border border-slate-200 p-5 sm:p-6 shadow-xs hover:shadow-md transition-all flex flex-col justify-between space-y-4">
      <div className="space-y-3">
        {/* Category Badge */}
        <div className="flex items-center justify-between">
          <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold border ${badgeConfig.bg}`}>
            <Icon className="w-3.5 h-3.5" />
            <span>{badgeConfig.label}</span>
          </span>
          <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
            {recommendation.suggestedAction}
          </span>
        </div>

        {/* Title */}
        <div>
          <h3 className="text-base sm:text-lg font-bold text-slate-900 leading-snug">
            {recommendation.title}
          </h3>
          <p className="text-xs sm:text-sm text-slate-600 mt-1 leading-relaxed">
            {recommendation.reason}
          </p>
        </div>
      </div>

      {/* Action CTA */}
      <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
        <span className="text-xs font-semibold text-slate-400">
          Target: {recommendation.questionCount} Questions
        </span>

        <button
          onClick={() => onLaunch(recommendation.topicId)}
          className="flex items-center gap-2 px-4 py-2 bg-brand-600 hover:bg-brand-700 text-white rounded-xl text-xs font-bold shadow-xs hover:shadow transition-all"
        >
          <span>Start Session</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
};
