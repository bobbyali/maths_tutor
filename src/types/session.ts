export type SessionMode = 
  | 'topic_set' 
  | 'mixed_stretch' 
  | 'morning_quick' 
  | 'ukmt_challenge' 
  | 'smart_focus';

export type PerformanceRating = 
  | 'nailed_it'    // Full marks, clean method
  | 'minor_slip'   // Got method right, arithmetic/sign slip
  | 'needed_hint'  // Needed 1 or more hints to proceed
  | 'concept_gap'  // Did not understand concept, needs review
  | 'skipped';     // Skipped / not attempted

export interface QuestionResult {
  questionId: string;
  earnedMarks: number;
  maxMarks: number;
  rating: PerformanceRating;
  note?: string;
  timeSpentSeconds?: number;
}

export interface SessionRecord {
  id: string;
  studentId: string;
  date: string; // ISO string YYYY-MM-DD
  timestamp: number;
  mode: SessionMode;
  topicId?: string;
  topicTitle?: string;
  questionsAttempted: number;
  totalMarks: number;
  earnedMarks: number;
  percentage: number;
  tutorNotes: string; // Qualitative notes entered by the parent/tutor
  questionResults: QuestionResult[];
}

export interface TopicMasteryState {
  topicId: string;
  studentId: string;
  status: 'unattempted' | 'practicing' | 'secure' | 'mastered';
  totalAttempts: number;
  lastScore: number;
  averageScore: number;
  lastPracticedDate: string; // ISO string
  conceptGapCount: number;
}

export interface MorningStreak {
  studentId: string;
  currentStreak: number;
  bestStreak: number;
  lastCompletedDate: string; // YYYY-MM-DD
}
