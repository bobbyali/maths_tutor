import React, { useRef } from 'react';
import { StudentProfile } from '../../types/student';
import { MorningStreak } from '../../types/session';
import { StorageService } from '../../services/storageService';
import { 
  Users, 
  Flame, 
  Download, 
  Upload, 
  ChevronDown, 
  Menu, 
  X,
  Sparkles
} from 'lucide-react';

interface HeaderProps {
  students: StudentProfile[];
  activeStudent: StudentProfile;
  activeStreak: MorningStreak;
  onSelectStudent: (id: string) => void;
  onOpenProfileModal: () => void;
  isMobileMenuOpen: boolean;
  setIsMobileMenuOpen: (open: boolean) => void;
  onDataRefresh: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  students,
  activeStudent,
  activeStreak,
  onSelectStudent,
  onOpenProfileModal,
  isMobileMenuOpen,
  setIsMobileMenuOpen,
  onDataRefresh
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleExport = () => {
    const jsonStr = StorageService.exportBackup();
    const blob = new Blob([jsonStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `maths_tutor_backup_${new Date().toISOString().split('T')[0]}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleImport = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const content = event.target?.result as string;
      if (content) {
        const success = StorageService.importBackup(content);
        if (success) {
          alert('Backup restored successfully!');
          onDataRefresh();
        } else {
          alert('Failed to parse backup file. Please check file format.');
        }
      }
    };
    reader.readAsText(file);
    e.target.value = '';
  };

  return (
    <header className="bg-white border-b border-slate-200 sticky top-0 z-40 no-print">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo & Title */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-brand-600 to-indigo-600 text-white flex items-center justify-center font-bold text-xl shadow-sm">
              📐
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-extrabold text-slate-900 tracking-tight text-base sm:text-lg">
                  Maths Stretch Tutor
                </span>
                <span className="hidden sm:inline-flex items-center gap-1 text-[11px] font-semibold px-2 py-0.5 rounded-full bg-indigo-50 text-indigo-700 border border-indigo-200">
                  <Sparkles className="w-3 h-3" /> GCSE 9-1 & UKMT
                </span>
              </div>
              <p className="text-xs text-slate-500 hidden sm:block">
                On-demand stretch problems, past papers & progress tracking
              </p>
            </div>
          </div>

          {/* Center / Right controls */}
          <div className="flex items-center gap-2 sm:gap-4">
            {/* Morning Streak */}
            <div 
              title={`Morning Challenge Streak: ${activeStreak.currentStreak} consecutive days (Best: ${activeStreak.bestStreak})`}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-amber-50 border border-amber-200 text-amber-900 text-xs sm:text-sm font-bold shadow-xs cursor-default"
            >
              <Flame className="w-4 h-4 text-amber-500 fill-amber-500 animate-pulse" />
              <span>{activeStreak.currentStreak} <span className="hidden sm:inline font-normal text-amber-700">day streak</span></span>
            </div>

            {/* Student Switcher Dropdown */}
            <div className="relative flex items-center">
              <button
                onClick={onOpenProfileModal}
                className="flex items-center gap-2 px-3 py-1.5 rounded-xl border border-slate-200 hover:border-brand-500 bg-slate-50/80 hover:bg-white text-slate-800 transition-all shadow-xs"
              >
                <span className="text-lg">{activeStudent.avatarEmoji}</span>
                <div className="text-left hidden md:block">
                  <p className="text-xs font-bold leading-tight text-slate-900">{activeStudent.name}</p>
                  <p className="text-[10px] text-slate-500 font-medium">Year {activeStudent.yearGroup}</p>
                </div>
                <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
              </button>
            </div>

            {/* Backup / Export / Import */}
            <div className="hidden lg:flex items-center gap-1">
              <button
                onClick={handleExport}
                title="Export JSON data backup (notes, scores, history)"
                className="p-2 text-slate-500 hover:text-slate-700 hover:bg-slate-100 rounded-lg text-xs font-medium flex items-center gap-1 transition-colors"
              >
                <Download className="w-4 h-4" />
                <span className="hidden xl:inline">Backup</span>
              </button>

              <button
                onClick={() => fileInputRef.current?.click()}
                title="Restore from JSON backup"
                className="p-2 text-slate-500 hover:text-slate-700 hover:bg-slate-100 rounded-lg text-xs font-medium flex items-center gap-1 transition-colors"
              >
                <Upload className="w-4 h-4" />
                <span className="hidden xl:inline">Restore</span>
              </button>
              <input
                ref={fileInputRef}
                type="file"
                accept=".json"
                className="hidden"
                onChange={handleImport}
              />
            </div>

            {/* Mobile menu toggle */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 rounded-lg text-slate-500 hover:text-slate-700 hover:bg-slate-100"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};
