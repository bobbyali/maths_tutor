import React, { useState } from 'react';
import { StudentProfile } from '../../types/student';
import { DifficultyLevel } from '../../types/curriculum';
import { X, Plus, Trash2, Edit2, Check } from 'lucide-react';

interface ProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  students: StudentProfile[];
  activeStudentId: string;
  onSelectStudent: (id: string) => void;
  onAddStudent: (student: Omit<StudentProfile, 'id' | 'createdAt'>) => void;
  onUpdateStudent: (student: StudentProfile) => void;
  onDeleteStudent: (id: string) => void;
}

export const ProfileModal: React.FC<ProfileModalProps> = ({
  isOpen,
  onClose,
  students,
  activeStudentId,
  onSelectStudent,
  onAddStudent,
  onUpdateStudent,
  onDeleteStudent
}) => {
  const [isAdding, setIsAdding] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);

  // Form state
  const [name, setName] = useState('');
  const [age, setAge] = useState(11);
  const [yearGroup, setYearGroup] = useState(7);
  const [difficulty, setDifficulty] = useState<DifficultyLevel>('ukmt_junior');
  const [avatarEmoji, setAvatarEmoji] = useState('👦');
  const [themeColor, setThemeColor] = useState('indigo');

  if (!isOpen) return null;

  const resetForm = () => {
    setName('');
    setAge(11);
    setYearGroup(7);
    setDifficulty('ukmt_junior');
    setAvatarEmoji('👦');
    setThemeColor('indigo');
    setIsAdding(false);
    setEditingId(null);
  };

  const handleStartAdd = () => {
    resetForm();
    setIsAdding(true);
  };

  const handleStartEdit = (student: StudentProfile) => {
    setEditingId(student.id);
    setName(student.name);
    setAge(student.age);
    setYearGroup(student.yearGroup);
    setDifficulty(student.defaultDifficulty);
    setAvatarEmoji(student.avatarEmoji);
    setThemeColor(student.themeColor);
    setIsAdding(false);
  };

  const handleSaveAdd = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    onAddStudent({
      name: name.trim(),
      age: Number(age),
      yearGroup: Number(yearGroup),
      defaultDifficulty: difficulty,
      avatarEmoji,
      themeColor,
      targetGoals: [
        `Stretch beyond Year ${yearGroup} curriculum`,
        `GCSE Higher Tier Mastery`,
        `UKMT Problem Solving`
      ]
    });
    resetForm();
  };

  const handleSaveEdit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingId || !name.trim()) return;

    const existing = students.find(s => s.id === editingId);
    if (!existing) return;

    onUpdateStudent({
      ...existing,
      name: name.trim(),
      age: Number(age),
      yearGroup: Number(yearGroup),
      defaultDifficulty: difficulty,
      avatarEmoji,
      themeColor
    });
    resetForm();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fadeIn">
      <div className="bg-white rounded-2xl shadow-2xl border border-slate-200 w-full max-w-lg overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 bg-slate-50/70">
          <h2 className="text-lg font-bold text-slate-800">
            {isAdding ? 'Add New Student' : editingId ? 'Edit Student Profile' : 'Manage Student Profiles'}
          </h2>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-200 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 max-h-[75vh] overflow-y-auto">
          {/* If Adding or Editing Form */}
          {(isAdding || editingId) ? (
            <form onSubmit={isAdding ? handleSaveAdd : handleSaveEdit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 mb-1">
                  Student Name / Nickname
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Leo, Zac, or Son 1"
                  value={name}
                  onChange={e => setName(e.target.value)}
                  className="w-full px-3.5 py-2 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-brand-500 text-sm font-medium"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 mb-1">
                    Age
                  </label>
                  <input
                    type="number"
                    min="8"
                    max="18"
                    value={age}
                    onChange={e => setAge(Number(e.target.value))}
                    className="w-full px-3.5 py-2 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-brand-500 text-sm font-medium"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 mb-1">
                    School Year
                  </label>
                  <select
                    value={yearGroup}
                    onChange={e => setYearGroup(Number(e.target.value))}
                    className="w-full px-3.5 py-2 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-brand-500 text-sm font-medium bg-white"
                  >
                    <option value={6}>Year 6 (Primary Stretch)</option>
                    <option value={7}>Year 7</option>
                    <option value={8}>Year 8</option>
                    <option value={9}>Year 9</option>
                    <option value={10}>Year 10</option>
                    <option value={11}>Year 11 (GCSE Year)</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 mb-1">
                  Default Target Tier
                </label>
                <select
                  value={difficulty}
                  onChange={e => setDifficulty(e.target.value as DifficultyLevel)}
                  className="w-full px-3.5 py-2 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-brand-500 text-sm font-medium bg-white"
                >
                  <option value="grade_5_6">GCSE Foundation-to-Higher (Grades 5-6)</option>
                  <option value="grade_7">GCSE Solid Higher (Grade 7)</option>
                  <option value="grade_8_9">GCSE Top Tier Distinction (Grade 8-9)</option>
                  <option value="ukmt_junior">UKMT Junior Challenge (Year 7-8 Lateral)</option>
                  <option value="ukmt_intermediate">UKMT Intermediate Challenge (Year 9-11 Lateral)</option>
                </select>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 mb-1">
                    Avatar Emoji
                  </label>
                  <div className="flex gap-2">
                    {['👦', '🧑', '👧', '🦁', '🚀', '🧠', '⭐'].map(emoji => (
                      <button
                        key={emoji}
                        type="button"
                        onClick={() => setAvatarEmoji(emoji)}
                        className={`text-xl p-1.5 rounded-lg border transition-transform ${
                          avatarEmoji === emoji ? 'border-brand-500 bg-brand-50 scale-110' : 'border-slate-200 hover:bg-slate-50'
                        }`}
                      >
                        {emoji}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 mb-1">
                    Theme Color
                  </label>
                  <div className="flex gap-2 items-center">
                    {[
                      { name: 'indigo', bg: 'bg-indigo-600' },
                      { name: 'blue', bg: 'bg-blue-600' },
                      { name: 'emerald', bg: 'bg-emerald-600' },
                      { name: 'amber', bg: 'bg-amber-600' },
                      { name: 'rose', bg: 'bg-rose-600' },
                    ].map(col => (
                      <button
                        key={col.name}
                        type="button"
                        onClick={() => setThemeColor(col.name)}
                        className={`w-6 h-6 rounded-full ${col.bg} transition-all ${
                          themeColor === col.name ? 'ring-2 ring-offset-2 ring-slate-800 scale-110' : 'opacity-80 hover:opacity-100'
                        }`}
                      />
                    ))}
                  </div>
                </div>
              </div>

              <div className="flex justify-end gap-2 pt-4 border-t border-slate-100">
                <button
                  type="button"
                  onClick={resetForm}
                  className="px-4 py-2 text-sm font-medium text-slate-600 hover:bg-slate-100 rounded-xl transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 text-sm font-semibold text-white bg-brand-600 hover:bg-brand-700 rounded-xl shadow-sm transition-colors"
                >
                  Save Profile
                </button>
              </div>
            </form>
          ) : (
            /* Student List View */
            <div className="space-y-3">
              {students.map(student => {
                const isActive = student.id === activeStudentId;
                return (
                  <div
                    key={student.id}
                    className={`flex items-center justify-between p-3.5 rounded-xl border transition-all ${
                      isActive
                        ? 'border-brand-500 bg-brand-50/50 shadow-sm'
                        : 'border-slate-200 hover:border-slate-300 bg-white'
                    }`}
                  >
                    <div
                      className="flex items-center gap-3 cursor-pointer flex-1"
                      onClick={() => {
                        onSelectStudent(student.id);
                        onClose();
                      }}
                    >
                      <div className="text-2xl w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center">
                        {student.avatarEmoji}
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <h3 className="font-semibold text-slate-900 text-sm">{student.name}</h3>
                          {isActive && (
                            <span className="inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-brand-600 text-white">
                              Active
                            </span>
                          )}
                        </div>
                        <p className="text-xs text-slate-500">
                          Year {student.yearGroup} • {student.age} yo • Target: {student.defaultDifficulty.replace('_', ' ')}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-1">
                      <button
                        title="Edit profile"
                        onClick={() => handleStartEdit(student)}
                        className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors"
                      >
                        <Edit2 className="w-4 h-4" />
                      </button>
                      {students.length > 1 && (
                        <button
                          title="Delete profile"
                          onClick={() => {
                            if (confirm(`Are you sure you want to remove ${student.name}? Their session data will be preserved in export.`)) {
                              onDeleteStudent(student.id);
                            }
                          }}
                          className="p-1.5 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-colors"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      )}
                      {!isActive && (
                        <button
                          title="Switch to this student"
                          onClick={() => {
                            onSelectStudent(student.id);
                            onClose();
                          }}
                          className="p-1.5 rounded-lg text-brand-600 hover:bg-brand-100 transition-colors"
                        >
                          <Check className="w-4 h-4" />
                        </button>
                      )}
                    </div>
                  </div>
                );
              })}

              <button
                type="button"
                onClick={handleStartAdd}
                className="w-full flex items-center justify-center gap-2 py-3 rounded-xl border border-dashed border-slate-300 text-slate-600 hover:border-brand-500 hover:text-brand-600 hover:bg-brand-50/40 text-sm font-semibold transition-all mt-4"
              >
                <Plus className="w-4 h-4" />
                Add Another Child / Student
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
