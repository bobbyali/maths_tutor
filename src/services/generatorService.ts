import { Question } from '../types/question';
import { DifficultyLevel } from '../types/curriculum';
import { QUESTION_BANK } from '../data/questionBank';
import { TOPICS } from '../data/curriculumData';

export interface SetGenerationOptions {
  mode: 'topic' | 'mixed_gcse' | 'ukmt' | 'smart';
  topicId?: string;
  difficulty?: DifficultyLevel;
  count: number;
  calculatorAllowed?: boolean | 'any';
}

export class GeneratorService {
  static getQuestionsByTopic(topicId: string): Question[] {
    return QUESTION_BANK.filter(q => q.topicId === topicId);
  }

  static generateProblemSet(options: SetGenerationOptions): Question[] {
    let pool: Question[] = [...QUESTION_BANK];

    if (options.mode === 'topic' && options.topicId) {
      pool = pool.filter(q => q.topicId === options.topicId);
    } else if (options.mode === 'mixed_gcse') {
      // Pick higher tier GCSE questions across Number, Algebra, Geometry
      pool = pool.filter(q => q.difficulty === 'grade_7' || q.difficulty === 'grade_8_9');
    } else if (options.mode === 'ukmt') {
      // Pick lateral challenge questions
      pool = pool.filter(q => q.difficulty === 'ukmt_junior' || q.difficulty === 'ukmt_intermediate');
    }

    if (options.difficulty) {
      const diffMatches = pool.filter(q => q.difficulty === options.difficulty);
      if (diffMatches.length > 0) {
        pool = diffMatches;
      }
    }

    if (options.calculatorAllowed !== undefined && options.calculatorAllowed !== 'any') {
      const calcMatches = pool.filter(q => q.calculatorAllowed === options.calculatorAllowed);
      if (calcMatches.length > 0) {
        pool = calcMatches;
      }
    }

    // Shuffle and pick desired count
    const shuffled = [...pool].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, Math.min(options.count, shuffled.length));
  }

  static getMorningQuickQuestion(difficulty: DifficultyLevel): Question {
    // Filter for rapid morning questions (5-10 min)
    let pool = QUESTION_BANK.filter(q => q.isMorningQuickEligible);

    // Try to match student difficulty
    const targeted = pool.filter(q => q.difficulty === difficulty);
    if (targeted.length > 0) {
      return targeted[Math.floor(Math.random() * targeted.length)];
    }

    // Fallback to any morning eligible question
    return pool[Math.floor(Math.random() * pool.length)] || QUESTION_BANK[0];
  }

  static getTopicTitle(topicId: string): string {
    const topic = TOPICS.find(t => t.id === topicId);
    return topic ? topic.title : 'General Maths Stretch';
  }
}
