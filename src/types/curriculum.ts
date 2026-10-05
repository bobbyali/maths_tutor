export type StrandId = 
  | 'number' 
  | 'algebra' 
  | 'ratio' 
  | 'geometry' 
  | 'probability' 
  | 'statistics' 
  | 'lateral';

export type DifficultyLevel = 
  | 'grade_5_6'       // Foundation-to-Higher bridge
  | 'grade_7'         // Solid Higher GCSE
  | 'grade_8_9'       // Top Tier GCSE Distinction
  | 'ukmt_junior'     // UKMT JMC (Ideal for 11yo / Y7 stretch)
  | 'ukmt_intermediate'; // UKMT IMC (Ideal for 14yo / Y9 stretch)

export interface Strand {
  id: StrandId;
  name: string;
  iconName: string;
  color: string;
  badgeBg: string;
  description: string;
}

export interface Topic {
  id: string;
  strandId: StrandId;
  title: string;
  shortCode: string;
  description: string;
  tier: 'foundation_higher' | 'higher_only' | 'lateral_challenge';
  targetGrades: DifficultyLevel[];
  recommendedYears: number[]; // e.g. [7, 8] or [9, 10, 11]
  prerequisites: string[]; // Topic IDs
  keyFormulas?: string[]; // LaTeX strings
  tags: string[];
}
