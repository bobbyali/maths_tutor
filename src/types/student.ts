import { DifficultyLevel } from './curriculum';

export interface StudentProfile {
  id: string;
  name: string;
  age: number;
  yearGroup: number; // e.g. 7 or 9
  defaultDifficulty: DifficultyLevel;
  avatarEmoji: string;
  themeColor: string; // Tailwind color class or hex
  targetGoals: string[];
  createdAt: string;
}
