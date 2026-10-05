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
    let chosen: Question[] = [];

    if (options.mode === 'topic' && options.topicId) {
      // 1. Direct matches for the requested topic
      const topicMatches = QUESTION_BANK.filter(q => q.topicId === options.topicId);
      chosen.push(...topicMatches);

      // 2. If we need more questions to fulfill the count, pull from the same strand
      if (chosen.length < options.count) {
        const topicMeta = TOPICS.find(t => t.id === options.topicId);
        const strandId = topicMeta?.strandId;
        if (strandId) {
          const strandMatches = QUESTION_BANK.filter(
            q => q.strandId === strandId && !chosen.some(c => c.id === q.id)
          );
          // Shuffle strand matches
          const shuffledStrand = [...strandMatches].sort(() => 0.5 - Math.random());
          chosen.push(...shuffledStrand.slice(0, options.count - chosen.length));
        }
      }

      // 3. Fallback if still under count
      if (chosen.length < options.count) {
        const remaining = QUESTION_BANK.filter(q => !chosen.some(c => c.id === q.id));
        const shuffledRemaining = [...remaining].sort(() => 0.5 - Math.random());
        chosen.push(...shuffledRemaining.slice(0, options.count - chosen.length));
      }
    } else if (options.mode === 'mixed_gcse') {
      // Pick higher tier GCSE questions across Number, Algebra, Geometry
      const pool = QUESTION_BANK.filter(q => q.difficulty === 'grade_7' || q.difficulty === 'grade_8_9');
      const shuffled = [...pool].sort(() => 0.5 - Math.random());
      chosen = shuffled.slice(0, Math.min(options.count, pool.length));
    } else if (options.mode === 'ukmt') {
      // Pick lateral challenge questions
      const pool = QUESTION_BANK.filter(q => q.difficulty === 'ukmt_junior' || q.difficulty === 'ukmt_intermediate');
      const shuffled = [...pool].sort(() => 0.5 - Math.random());
      chosen = shuffled.slice(0, Math.min(options.count, pool.length));
    } else {
      const shuffled = [...QUESTION_BANK].sort(() => 0.5 - Math.random());
      chosen = shuffled.slice(0, Math.min(options.count, QUESTION_BANK.length));
    }

    // Filter by calculator if explicitly requested
    if (options.calculatorAllowed !== undefined && options.calculatorAllowed !== 'any') {
      const calcFiltered = chosen.filter(q => q.calculatorAllowed === options.calculatorAllowed);
      if (calcFiltered.length > 0) {
        chosen = calcFiltered;
      }
    }

    // Always shuffle the final selection to ensure variation on repeated clicks
    return [...chosen].sort(() => 0.5 - Math.random());
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
