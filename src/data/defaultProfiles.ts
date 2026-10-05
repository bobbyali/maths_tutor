import { StudentProfile } from '../types/student';

export const DEFAULT_PROFILES: StudentProfile[] = [
  {
    id: 'student_1',
    name: 'Son 1 (11yo, Year 7)',
    age: 11,
    yearGroup: 7,
    defaultDifficulty: 'ukmt_junior',
    avatarEmoji: '👦',
    themeColor: 'indigo',
    targetGoals: [
      'Master Year 7-8 Algebra & Indices',
      'UKMT Junior Mathematical Challenge Gold',
      'Bridge to GCSE Grade 7 Higher content'
    ],
    createdAt: new Date().toISOString()
  },
  {
    id: 'student_2',
    name: 'Son 2 (14yo, Year 9)',
    age: 14,
    yearGroup: 9,
    defaultDifficulty: 'grade_8_9',
    avatarEmoji: '🧑',
    themeColor: 'blue',
    targetGoals: [
      'GCSE Maths Grade 9 Mastery (Edexcel/AQA)',
      'Circle Theorems & Vector Proofs',
      'UKMT Intermediate Mathematical Challenge'
    ],
    createdAt: new Date().toISOString()
  }
];
