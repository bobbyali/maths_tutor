import React from 'react';
import { STRANDS, TOPICS } from '../../data/curriculumData';
import { StudentProfile } from '../../types/student';
import { StorageService } from '../../services/storageService';
import { CheckCircle2, Clock, Play, HelpCircle } from 'lucide-react';

interface MasteryMatrixProps {
  student: StudentProfile;
  onPracticeTopic: (topicId: string) => void;
}

export const MasteryMatrix: React.FC<MasteryMatrixProps> = ({
  student,
  onPracticeTopic
}) => {
  const masteryMap = StorageService.getMasteryForStudent(student.id);

  const stats = {
    mastered: Object.values(masteryMap).filter(m => m.status === 'mastered').length,
    secure: Object.values(masteryMap).filter(m => m.status === 'secure').length,
    practicing: Object.values(masteryMap).filter(m => m.status === 'practicing').length,
    unattempted: Object.values(masteryMap).filter(m => m.status === 'unattempted').length,
  };

  return (
    <div className="space-y-6">
      {/* Overview Stat Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs">
          <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-700 block">Mastered (85%+)</span>
          <span className="text-2xl font-black text-slate-900">{stats.mastered}</span>
          <span className="text-xs text-slate-400 block mt-0.5">Top tier confidence</span>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs">
          <span className="text-[11px] font-bold uppercase tracking-wider text-blue-700 block">Secure (70-84%)</span>
          <span className="text-2xl font-black text-slate-900">{stats.secure}</span>
          <span className="text-xs text-slate-400 block mt-0.5">Solid foundation</span>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs">
          <span className="text-[11px] font-bold uppercase tracking-wider text-amber-700 block">In Progress</span>
          <span className="text-2xl font-black text-slate-900">{stats.practicing}</span>
          <span className="text-xs text-slate-400 block mt-0.5">Active practice</span>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs">
          <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500 block">To Explore</span>
          <span className="text-2xl font-black text-slate-900">{stats.unattempted}</span>
          <span className="text-xs text-slate-400 block mt-0.5">Curriculum ahead</span>
        </div>
      </div>

      {/* Strand by Strand Heatmap */}
      <div className="space-y-6">
        {STRANDS.map(strand => {
          const strandTopics = TOPICS.filter(t => t.strandId === strand.id);
          if (strandTopics.length === 0) return null;

          return (
            <div key={strand.id} className="bg-white rounded-3xl border border-slate-200 p-5 sm:p-6 shadow-xs space-y-4">
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <div className="flex items-center gap-2">
                  <span className={`text-xs font-bold px-2.5 py-0.5 rounded-full border ${strand.badgeBg}`}>
                    {strand.name}
                  </span>
                  <span className="text-xs text-slate-400">
                    {strandTopics.length} topics
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {strandTopics.map(topic => {
                  const m = masteryMap[topic.id] || { status: 'unattempted', averageScore: 0, totalAttempts: 0 };
                  return (
                    <div
                      key={topic.id}
                      onClick={() => onPracticeTopic(topic.id)}
                      className={`p-3.5 rounded-2xl border cursor-pointer transition-all hover:shadow-sm ${
                        m.status === 'mastered'
                          ? 'bg-emerald-50/50 border-emerald-200 hover:border-emerald-300'
                          : m.status === 'secure'
                            ? 'bg-blue-50/50 border-blue-200 hover:border-blue-300'
                            : m.status === 'practicing'
                              ? 'bg-amber-50/50 border-amber-200 hover:border-amber-300'
                              : 'bg-slate-50/60 border-slate-200 hover:border-slate-300'
                      }`}
                    >
                      <div className="flex items-start justify-between gap-2">
                        <span className="font-bold text-xs text-slate-900 leading-tight">
                          {topic.title}
                        </span>
                        {m.status === 'mastered' && <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />}
                        {m.status === 'secure' && <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0" />}
                        {m.status === 'practicing' && <Clock className="w-4 h-4 text-amber-600 shrink-0" />}
                      </div>

                      <div className="flex items-center justify-between mt-2 pt-2 border-t border-slate-100/60 text-[11px]">
                        <span className="font-semibold text-slate-500 capitalize">{m.status}</span>
                        {m.totalAttempts > 0 ? (
                          <span className="font-bold text-slate-800">{m.averageScore}% avg</span>
                        ) : (
                          <span className="text-brand-600 font-semibold flex items-center gap-0.5">
                            Start <Play className="w-2.5 h-2.5 fill-brand-600" />
                          </span>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
