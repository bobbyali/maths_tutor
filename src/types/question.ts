import { DifficultyLevel, StrandId } from './curriculum';

export type QuestionSourceType = 'past_paper' | 'ukmt' | 'custom_stretch';

export interface QuestionCitation {
  sourceType: QuestionSourceType;
  examBoard?: 'Edexcel' | 'AQA' | 'OCR' | 'UKMT';
  series?: string; // e.g. "June 2023" or "2022"
  paper?: string;  // e.g. "Paper 1H (Non-Calc)" or "Junior Challenge"
  questionNumber?: string | number; // e.g. "Q18" or "Q21"
  citationUrl: string;
  sourceLabel: string; // e.g. "Edexcel 2023 Paper 1H, Q18"
  isOfficialPublicArchive: boolean;
}

export interface SolutionStep {
  description: string;
  math?: string;
  markTag?: string; // e.g. "M1 (Method)", "A1 (Accuracy)", "B1 (Independent)"
}

export interface QuestionSolution {
  steps: SolutionStep[];
  finalAnswer: string;
  examinerTips?: string;
}

export interface DigitalAnswerValidation {
  expected: string | string[]; // Can accept equivalent representations
  type: 'number' | 'algebra' | 'fraction' | 'text';
  unit?: string;
  tolerance?: number;
}

export interface Question {
  id: string;
  topicId: string;
  strandId: StrandId;
  title: string;
  prompt: string; // Markdown text with embedded LaTeX $...$ or $$...$$
  svgDiagram?: string; // Optional embedded SVG code for geometry/graphs
  maxMarks: number;
  calculatorAllowed: boolean;
  difficulty: DifficultyLevel;
  tags: string[];
  isMorningQuickEligible: boolean; // Suitable for 5-10 min rapid morning session
  citation: QuestionCitation;
  hints: string[]; // [Hint 1: Conceptual / Strategy, Hint 2: Operational / Next step]
  solution: QuestionSolution;
  digitalAnswer?: DigitalAnswerValidation;
}
