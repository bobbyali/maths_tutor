import { StorageService } from './storageService';
import { TOPICS } from '../data/curriculumData';

export interface RecommendationCard {
  id: string;
  type: 'weak_spot' | 'spaced_repetition' | 'next_unlock' | 'lateral_stretch';
  topicId: string;
  topicTitle: string;
  strandId: string;
  priority: 'high' | 'medium' | 'low';
  title: string;
  reason: string;
  suggestedAction: string;
  questionCount: number;
}

export class RecommenderService {
  static getRecommendations(studentId: string): RecommendationCard[] {
    const masteryMap = StorageService.getMasteryForStudent(studentId);
    const sessions = StorageService.getSessionsForStudent(studentId);
    const recommendations: RecommendationCard[] = [];

    const now = Date.now();
    const FOURTEEN_DAYS_MS = 14 * 24 * 60 * 60 * 1000;

    // 1. Check for Weak Spots (< 70% or concept gaps logged)
    Object.values(masteryMap).forEach(m => {
      if (m.totalAttempts > 0 && (m.averageScore < 70 || m.conceptGapCount > 0)) {
        const topic = TOPICS.find(t => t.id === m.topicId);
        if (topic) {
          recommendations.push({
            id: `rec_weak_${topic.id}`,
            type: 'weak_spot',
            topicId: topic.id,
            topicTitle: topic.title,
            strandId: topic.strandId,
            priority: 'high',
            title: `Reinforce: ${topic.title}`,
            reason: `Average score is ${m.averageScore}% with ${m.conceptGapCount} concept notes logged during tutoring.`,
            suggestedAction: '3-Question Targeted Booster',
            questionCount: 3
          });
        }
      }
    });

    // 2. Check for Spaced Repetition (practiced > 14 days ago)
    Object.values(masteryMap).forEach(m => {
      if (m.totalAttempts > 0 && m.lastPracticedDate) {
        const lastDate = new Date(m.lastPracticedDate).getTime();
        if (now - lastDate > FOURTEEN_DAYS_MS && m.averageScore >= 70) {
          const topic = TOPICS.find(t => t.id === m.topicId);
          if (topic) {
            const daysAgo = Math.floor((now - lastDate) / (24 * 60 * 60 * 1000));
            recommendations.push({
              id: `rec_rep_${topic.id}`,
              type: 'spaced_repetition',
              topicId: topic.id,
              topicTitle: topic.title,
              strandId: topic.strandId,
              priority: 'medium',
              title: `Spaced Repetition: ${topic.title}`,
              reason: `Last practiced ${daysAgo} days ago. A quick refresh prevents memory fade.`,
              suggestedAction: 'Rapid 3-Question Review',
              questionCount: 3
            });
          }
        }
      }
    });

    // 3. Check for Next Curriculum Unlocks
    TOPICS.forEach(topic => {
      const state = masteryMap[topic.id];
      if (!state || state.totalAttempts === 0) {
        // Check if prerequisites are satisfied
        const prereqsMet = topic.prerequisites.every(preId => {
          const preState = masteryMap[preId];
          return preState && preState.averageScore >= 70;
        });

        if (prereqsMet && topic.strandId !== 'lateral') {
          recommendations.push({
            id: `rec_unlock_${topic.id}`,
            type: 'next_unlock',
            topicId: topic.id,
            topicTitle: topic.title,
            strandId: topic.strandId,
            priority: 'medium',
            title: `Ready to Unlock: ${topic.title}`,
            reason: 'All prerequisite foundational topics are secure. Ready for this stretch concept!',
            suggestedAction: 'Introductory 3-Question Set',
            questionCount: 3
          });
        }
      }
    });

    // 4. Lateral Stretch Recommendation
    const students = StorageService.getStudents();
    const currentStudent = students.find(s => s.id === studentId);
    const lateralTopic = currentStudent?.yearGroup && currentStudent.yearGroup <= 8
      ? TOPICS.find(t => t.id === 'lat_ukmt_junior')
      : TOPICS.find(t => t.id === 'lat_ukmt_intermediate');

    if (lateralTopic) {
      recommendations.push({
        id: `rec_lateral_${lateralTopic.id}`,
        type: 'lateral_stretch',
        topicId: lateralTopic.id,
        topicTitle: lateralTopic.title,
        strandId: 'lateral',
        priority: 'high',
        title: `Lateral Stretch: ${lateralTopic.title}`,
        reason: 'Sharpen deduction and non-routine problem solving with authentic UKMT competition puzzles.',
        suggestedAction: 'UKMT Challenge Problem',
        questionCount: 2
      });
    }

    // Default recommendation if brand new student with no sessions yet
    if (sessions.length === 0) {
      const defaultTopic = currentStudent?.yearGroup && currentStudent.yearGroup <= 8
        ? TOPICS.find(t => t.id === 'num_primes_hcf')!
        : TOPICS.find(t => t.id === 'num_surds')!;

      recommendations.unshift({
        id: 'rec_starter',
        type: 'next_unlock',
        topicId: defaultTopic.id,
        topicTitle: defaultTopic.title,
        strandId: defaultTopic.strandId,
        priority: 'high',
        title: `Start Diagnostic: ${defaultTopic.title}`,
        reason: 'Great initial topic to calibrate baseline mastery and problem-solving confidence.',
        suggestedAction: 'Start 3-Question Baseline',
        questionCount: 3
      });
    }

    // Sort by priority
    const priorityWeight = { high: 1, medium: 2, low: 3 };
    return recommendations.sort((a, b) => priorityWeight[a.priority] - priorityWeight[b.priority]).slice(0, 4);
  }
}
