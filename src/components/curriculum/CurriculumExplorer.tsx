import React, { useState } from 'react';
import { STRANDS, TOPICS } from '../../data/curriculumData';
import { StrandId, DifficultyLevel } from '../../types/curriculum';
import { StudentProfile } from '../../types/student';
import { StorageService } from '../../services/storageService';
import { MathText } from '../common/MathText';
import { 
  BookOpen, 
  Sparkles, 
  CheckCircle2, 
  Clock, 
  AlertCircle, 
  Play, 
  ChevronRight,
  Filter
} from 'lucide-react';

interface CurriculumExplorerProps {
  student: StudentProfile;
  onPracticeTopic: (topicId: string) => void;
  onRequestCustomTopic?: (topicId: string) => void;
}

export const CurriculumExplorer: React.FC<CurriculumExplorerProps> = ({
  student,
  onPracticeTopic,
  onRequestCustomTopic
}) => {
  const [selectedStrand, setSelectedStrand] = useState<StrandId | 'all'>('all');
  const [difficultyFilter, setDifficultyFilter] = useState<DifficultyLevel | 'all'>('all');

  const masteryMap = StorageService.getMasteryForStudent(student.id);

  const filteredTopics = TOPICS.filter(topic => {
    if (selectedStrand !== 'all' && topic.strandId !== selectedStrand) return false;
    if (difficultyFilter !== 'all' && !topic.targetGrades.includes(difficultyFilter)) return false;
    return true;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 space-y-8">
      {/* Header */}
      <div>
        <div className="flex items-center gap-2 mb-2">
          <span className="text-xs font-bold uppercase tracking-wider text-brand-600 bg-brand-50 px-3 py-1 rounded-full border border-brand-200">
            Syllabus Mastery Map
          </span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
          GCSE Higher & UKMT Curriculum
        </h1>
        <p className="text-slate-600 text-sm mt-1 max-w-2xl">
          Complete taxonomy for <span className="font-semibold text-slate-800">{student.name}</span>. Click any topic to view formulas or generate an on-demand problem set.
        </p>
      </div>

      {/* Filter Tabs by Strand */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
        <button
          onClick={() => setSelectedStrand('all')}
          className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold whitespace-nowrap transition-all ${
            selectedStrand === 'all'
              ? 'bg-slate-900 text-white shadow-sm'
              : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
          }`}
        >
          All Strands ({TOPICS.length})
        </button>

        {STRANDS.map(strand => {
          const count = TOPICS.filter(t => t.strandId === strand.id).length;
          const isSelected = selectedStrand === strand.id;
          return (
            <button
              key={strand.id}
              onClick={() => setSelectedStrand(strand.id)}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold whitespace-nowrap border transition-all ${
                isSelected
                  ? 'bg-brand-600 text-white border-brand-600 shadow-sm'
                  : 'bg-white text-slate-600 border-slate-200 hover:border-slate-300 hover:bg-slate-50'
              }`}
            >
              {strand.name} ({count})
            </button>
          );
        })}
      </div>

      {/* Topics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {filteredTopics.map(topic => {
          const mastery = masteryMap[topic.id] || { status: 'unattempted', averageScore: 0, totalAttempts: 0 };
          const strand = STRANDS.find(s => s.id === topic.strandId);

          return (
            <div
              key={topic.id}
              className="bg-white rounded-3xl border border-slate-200 shadow-xs hover:shadow-md p-6 space-y-4 transition-all flex flex-col justify-between"
            >
              <div className="space-y-3">
                {/* Meta header */}
                <div className="flex items-center justify-between gap-2">
                  <span className={`text-[11px] font-bold px-2.5 py-0.5 rounded-full border ${strand?.badgeBg}`}>
                    {strand?.name}
                  </span>

                  {/* Mastery Pill */}
                  <span className={`text-[11px] font-bold px-2.5 py-0.5 rounded-full flex items-center gap-1 ${
                    mastery.status === 'mastered'
                      ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                      : mastery.status === 'secure'
                        ? 'bg-blue-50 text-blue-700 border border-blue-200'
                        : mastery.status === 'practicing'
                          ? 'bg-amber-50 text-amber-700 border border-amber-200'
                          : 'bg-slate-100 text-slate-500'
                  }`}>
                    {mastery.status === 'mastered' && <CheckCircle2 className="w-3 h-3 text-emerald-600" />}
                    {mastery.status === 'practicing' && <Clock className="w-3 h-3 text-amber-600" />}
                    <span className="capitalize">{mastery.status}</span>
                    {mastery.totalAttempts > 0 && <span>({mastery.averageScore}%)</span>}
                  </span>
                </div>

                {/* Title & Description */}
                <div>
                  <h3 className="text-base font-bold text-slate-900 leading-snug">
                    {topic.title}
                  </h3>
                  <div className="text-xs text-slate-500 mt-1 leading-relaxed">
                    <MathText content={topic.description} />
                  </div>
                </div>

                {/* Key Formulas */}
                {topic.keyFormulas && topic.keyFormulas.length > 0 && (
                  <div className="bg-slate-50 p-3 rounded-2xl border border-slate-100 space-y-1">
                    <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Key Formula / Theorem:</p>
                    {topic.keyFormulas.map((f, i) => (
                      <div key={i} className="text-xs text-slate-800 overflow-x-auto py-0.5">
                        <MathText content={`$$${f}$$`} />
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Action Button */}
              <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
                <span className="text-[11px] font-semibold text-slate-400">
                  Target: {topic.targetGrades.map(g => g.replace('_', ' ')).join(', ')}
                </span>

                <div className="flex items-center gap-1.5">
                  {onRequestCustomTopic && (
                    <button
                      onClick={() => onRequestCustomTopic(topic.id)}
                      title={`Request custom stretch questions for ${topic.title}`}
                      className="p-1.5 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-xl transition-colors border border-transparent hover:border-indigo-200"
                    >
                      <Sparkles className="w-4 h-4 text-amber-500 fill-amber-500" />
                    </button>
                  )}

                  <button
                    onClick={() => onPracticeTopic(topic.id)}
                    className="flex items-center gap-1.5 px-3.5 py-1.5 bg-brand-50 hover:bg-brand-100 text-brand-700 rounded-xl text-xs font-bold border border-brand-200 transition-colors"
                  >
                    <Play className="w-3.5 h-3.5 fill-brand-600" />
                    Practice Topic
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
