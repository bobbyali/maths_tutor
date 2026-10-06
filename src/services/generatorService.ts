import { Question } from '../types/question';
import { DifficultyLevel } from '../types/curriculum';
import { QUESTION_BANK } from '../data/questionBank';
import { TOPICS } from '../data/curriculumData';
import { StorageService } from './storageService';

export interface SetGenerationOptions {
  mode: 'topic' | 'mixed_gcse' | 'ukmt' | 'smart';
  topicId?: string;
  difficulty?: DifficultyLevel;
  count: number;
  calculatorAllowed?: boolean | 'any';
}

export class GeneratorService {
  static getAllQuestions(): Question[] {
    try {
      const custom = StorageService.getCustomQuestions();
      return [...QUESTION_BANK, ...custom];
    } catch {
      return QUESTION_BANK;
    }
  }

  static getQuestionsByTopic(topicId: string): Question[] {
    return this.getAllQuestions().filter(q => q.topicId === topicId);
  }

  static generateProblemSet(options: SetGenerationOptions): Question[] {
    const allQuestions = this.getAllQuestions();
    let chosen: Question[] = [];

    if (options.mode === 'topic' && options.topicId) {
      // 1. Direct matches for the requested topic
      let topicMatches = allQuestions.filter(q => q.topicId === options.topicId);
      
      // If a specific difficulty was requested, prioritize questions matching it
      if (options.difficulty && options.difficulty !== ('all' as any)) {
        const exactDifficulty = topicMatches.filter(q => q.difficulty === options.difficulty);
        const otherDifficulty = topicMatches.filter(q => q.difficulty !== options.difficulty);
        topicMatches = [...exactDifficulty, ...otherDifficulty];
      }
      chosen.push(...topicMatches);

      // 2. If we need more questions to fulfill the count, pull from the same strand
      if (chosen.length < options.count) {
        const topicMeta = TOPICS.find(t => t.id === options.topicId);
        const strandId = topicMeta?.strandId;
        if (strandId) {
          const strandMatches = allQuestions.filter(
            q => q.strandId === strandId && !chosen.some(c => c.id === q.id)
          );
          const shuffledStrand = [...strandMatches].sort(() => 0.5 - Math.random());
          chosen.push(...shuffledStrand.slice(0, options.count - chosen.length));
        }
      }

      // 3. Fallback if still under count
      if (chosen.length < options.count) {
        const remaining = allQuestions.filter(q => !chosen.some(c => c.id === q.id));
        const shuffledRemaining = [...remaining].sort(() => 0.5 - Math.random());
        chosen.push(...shuffledRemaining.slice(0, options.count - chosen.length));
      }
    } else if (options.mode === 'mixed_gcse') {
      let pool: Question[];
      if (options.difficulty === 'grade_5_6') {
        pool = allQuestions.filter(q => q.difficulty === 'grade_5_6' || q.difficulty === 'grade_7');
      } else if (options.difficulty === 'grade_7') {
        pool = allQuestions.filter(q => q.difficulty === 'grade_7');
      } else if (options.difficulty === 'grade_8_9') {
        pool = allQuestions.filter(q => q.difficulty === 'grade_8_9');
      } else {
        // Any GCSE level
        pool = allQuestions.filter(q => q.difficulty === 'grade_5_6' || q.difficulty === 'grade_7' || q.difficulty === 'grade_8_9');
      }
      const shuffled = [...pool].sort(() => 0.5 - Math.random());
      chosen = shuffled.slice(0, Math.min(options.count, pool.length));
    } else if (options.mode === 'ukmt') {
      // Pick lateral challenge questions
      const pool = allQuestions.filter(q => q.difficulty === 'ukmt_junior' || q.difficulty === 'ukmt_intermediate');
      const shuffled = [...pool].sort(() => 0.5 - Math.random());
      chosen = shuffled.slice(0, Math.min(options.count, pool.length));
    } else {
      const shuffled = [...allQuestions].sort(() => 0.5 - Math.random());
      chosen = shuffled.slice(0, Math.min(options.count, allQuestions.length));
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

  /**
   * Recommend questions similar to a given question based on topic, difficulty, and conceptual tags
   */
  static getSimilarQuestions(question: Question, count: number = 3): Question[] {
    const all = this.getAllQuestions().filter(q => q.id !== question.id);

    // Compute similarity score
    const scored = all.map(q => {
      let score = 0;
      // Same topic gets highest priority
      if (q.topicId === question.topicId) score += 15;
      // Same difficulty tier gets strong boost
      if (q.difficulty === question.difficulty) score += 8;
      // Same strand
      if (q.strandId === question.strandId) score += 4;
      // Matching tags (e.g. Surds, Factorising, Hypotenuse)
      const matchingTags = q.tags.filter(t => question.tags.includes(t)).length;
      score += matchingTags * 3;
      // Matching calculator requirement
      if (q.calculatorAllowed === question.calculatorAllowed) score += 1;
      // Slight random perturbation to prevent identical order each time
      score += Math.random() * 1.5;

      return { question: q, score };
    });

    scored.sort((a, b) => b.score - a.score);
    return scored.slice(0, count).map(s => s.question);
  }

  /**
   * Return a quick, confidence-boosting morning warm-up question.
   * By default, returns accessible Grade 5-6 warm-up questions (1-3 marks) to build momentum before school.
   * Can optionally target Grade 7 fluency if requested.
   * Never serves 4-5 mark lateral challenge puzzles or Grade 8/9 proofs in the morning.
   */
  static getMorningQuickQuestion(
    preferredDifficulty: DifficultyLevel | 'grade_5_6' | 'grade_7' = 'grade_5_6',
    excludeId?: string
  ): Question {
    const all = this.getAllQuestions();
    // Exclusively draw from questions marked isMorningQuickEligible
    let pool = all.filter(q => q.isMorningQuickEligible);
    if (excludeId) {
      const nonCurrent = pool.filter(q => q.id !== excludeId);
      if (nonCurrent.length > 0) pool = nonCurrent;
    }

    // If requested Grade 7 explicitly, try to find Grade 7 quick questions
    if (preferredDifficulty === 'grade_7') {
      const g7Pool = pool.filter(q => q.difficulty === 'grade_7');
      if (g7Pool.length > 0) {
        return g7Pool[Math.floor(Math.random() * g7Pool.length)];
      }
    }

    // Default to Grade 5-6 warm-ups (procedural fluency, accessible confidence builders)
    const easyWarmups = pool.filter(q => q.difficulty === 'grade_5_6');
    if (easyWarmups.length > 0) {
      return easyWarmups[Math.floor(Math.random() * easyWarmups.length)];
    }

    // Fallback: any morning-eligible question
    return pool[Math.floor(Math.random() * pool.length)] || all[0];
  }

  static getTopicTitle(topicId: string): string {
    const topic = TOPICS.find(t => t.id === topicId);
    return topic ? topic.title : 'General Maths Stretch';
  }

  static getQuestionById(id: string): Question | undefined {
    return this.getAllQuestions().find(q => q.id === id);
  }

  static getQuestionsByIds(ids: string[]): Question[] {
    const all = this.getAllQuestions();
    const map = new Map(all.map(q => [q.id, q]));
    const result: Question[] = [];
    for (const id of ids) {
      const found = map.get(id);
      if (found) result.push(found);
    }
    return result;
  }
}
