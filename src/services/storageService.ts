import { StudentProfile } from '../types/student';
import { SessionRecord, TopicMasteryState, MorningStreak } from '../types/session';
import { DEFAULT_PROFILES } from '../data/defaultProfiles';
import { TOPICS } from '../data/curriculumData';

const STORAGE_KEYS = {
  STUDENTS: 'maths_tutor_students_v1',
  ACTIVE_STUDENT_ID: 'maths_tutor_active_student_id_v1',
  SESSIONS: 'maths_tutor_sessions_v1',
  STREAKS: 'maths_tutor_streaks_v1',
};

export class StorageService {
  // --- STUDENTS ---
  static getStudents(): StudentProfile[] {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.STUDENTS);
      if (data) {
        return JSON.parse(data);
      }
    } catch (e) {
      console.error('Error reading students from storage', e);
    }
    // Seed default profiles
    localStorage.setItem(STORAGE_KEYS.STUDENTS, JSON.stringify(DEFAULT_PROFILES));
    return DEFAULT_PROFILES;
  }

  static saveStudents(students: StudentProfile[]): void {
    localStorage.setItem(STORAGE_KEYS.STUDENTS, JSON.stringify(students));
  }

  static getActiveStudentId(): string {
    const activeId = localStorage.getItem(STORAGE_KEYS.ACTIVE_STUDENT_ID);
    const students = this.getStudents();
    if (activeId && students.some(s => s.id === activeId)) {
      return activeId;
    }
    const defaultId = students[0]?.id || DEFAULT_PROFILES[0].id;
    this.setActiveStudentId(defaultId);
    return defaultId;
  }

  static setActiveStudentId(id: string): void {
    localStorage.setItem(STORAGE_KEYS.ACTIVE_STUDENT_ID, id);
  }

  static addStudent(student: Omit<StudentProfile, 'id' | 'createdAt'>): StudentProfile {
    const students = this.getStudents();
    const newStudent: StudentProfile = {
      ...student,
      id: `student_${Date.now()}`,
      createdAt: new Date().toISOString()
    };
    students.push(newStudent);
    this.saveStudents(students);
    return newStudent;
  }

  static updateStudent(updated: StudentProfile): void {
    const students = this.getStudents();
    const index = students.findIndex(s => s.id === updated.id);
    if (index !== -1) {
      students[index] = updated;
      this.saveStudents(students);
    }
  }

  static deleteStudent(id: string): void {
    let students = this.getStudents();
    students = students.filter(s => s.id !== id);
    if (students.length === 0) {
      students = DEFAULT_PROFILES;
    }
    this.saveStudents(students);
    const currentActive = this.getActiveStudentId();
    if (currentActive === id) {
      this.setActiveStudentId(students[0].id);
    }
  }

  // --- SESSIONS ---
  static getSessions(): SessionRecord[] {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.SESSIONS);
      if (data) {
        return JSON.parse(data);
      }
    } catch (e) {
      console.error('Error reading sessions from storage', e);
    }
    return [];
  }

  static getSessionsForStudent(studentId: string): SessionRecord[] {
    return this.getSessions().filter(s => s.studentId === studentId);
  }

  static saveSession(session: SessionRecord): void {
    const sessions = this.getSessions();
    sessions.unshift(session); // Latest first
    localStorage.setItem(STORAGE_KEYS.SESSIONS, JSON.stringify(sessions));
  }

  static deleteSession(sessionId: string): void {
    const sessions = this.getSessions().filter(s => s.id !== sessionId);
    localStorage.setItem(STORAGE_KEYS.SESSIONS, JSON.stringify(sessions));
  }

  // --- MORNING STREAKS ---
  static getStreak(studentId: string): MorningStreak {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.STREAKS);
      if (data) {
        const streaks: Record<string, MorningStreak> = JSON.parse(data);
        if (streaks[studentId]) {
          return streaks[studentId];
        }
      }
    } catch (e) {
      console.error('Error reading streak', e);
    }
    return {
      studentId,
      currentStreak: 0,
      bestStreak: 0,
      lastCompletedDate: ''
    };
  }

  static recordMorningCompletion(studentId: string): MorningStreak {
    const today = new Date().toISOString().split('T')[0];
    const streak = this.getStreak(studentId);

    if (streak.lastCompletedDate === today) {
      return streak; // Already recorded today
    }

    const yesterday = new Date(Date.now() - 86400000).toISOString().split('T')[0];
    if (streak.lastCompletedDate === yesterday) {
      streak.currentStreak += 1;
    } else {
      streak.currentStreak = 1;
    }

    if (streak.currentStreak > streak.bestStreak) {
      streak.bestStreak = streak.currentStreak;
    }
    streak.lastCompletedDate = today;

    // Save
    try {
      const data = localStorage.getItem(STORAGE_KEYS.STREAKS);
      const streaks: Record<string, MorningStreak> = data ? JSON.parse(data) : {};
      streaks[studentId] = streak;
      localStorage.setItem(STORAGE_KEYS.STREAKS, JSON.stringify(streaks));
    } catch (e) {
      console.error('Error saving streak', e);
    }

    return streak;
  }

  // --- TOPIC MASTERY CALCULATOR ---
  static getMasteryForStudent(studentId: string): Record<string, TopicMasteryState> {
    const sessions = this.getSessionsForStudent(studentId);
    const masteryMap: Record<string, TopicMasteryState> = {};

    // Initialize all topics
    TOPICS.forEach(topic => {
      masteryMap[topic.id] = {
        topicId: topic.id,
        studentId,
        status: 'unattempted',
        totalAttempts: 0,
        lastScore: 0,
        averageScore: 0,
        lastPracticedDate: '',
        conceptGapCount: 0
      };
    });

    // Aggregate sessions
    sessions.forEach(sess => {
      if (sess.topicId && masteryMap[sess.topicId]) {
        const m = masteryMap[sess.topicId];
        m.totalAttempts += 1;
        m.lastScore = sess.percentage;
        m.averageScore = Math.round(((m.averageScore * (m.totalAttempts - 1)) + sess.percentage) / m.totalAttempts);
        if (!m.lastPracticedDate || sess.date > m.lastPracticedDate) {
          m.lastPracticedDate = sess.date;
        }

        // Count concept gaps
        sess.questionResults.forEach(qr => {
          if (qr.rating === 'concept_gap') {
            m.conceptGapCount += 1;
          }
        });

        // Determine status
        if (m.averageScore >= 85 && m.totalAttempts >= 2 && m.conceptGapCount === 0) {
          m.status = 'mastered';
        } else if (m.averageScore >= 70) {
          m.status = 'secure';
        } else {
          m.status = 'practicing';
        }
      }
    });

    return masteryMap;
  }

  // --- JSON EXPORT / IMPORT BACKUP ---
  static exportBackup(): string {
    const backup = {
      version: 1,
      exportedAt: new Date().toISOString(),
      students: this.getStudents(),
      activeStudentId: this.getActiveStudentId(),
      sessions: this.getSessions(),
      streaks: localStorage.getItem(STORAGE_KEYS.STREAKS) 
        ? JSON.parse(localStorage.getItem(STORAGE_KEYS.STREAKS)!) 
        : {}
    };
    return JSON.stringify(backup, null, 2);
  }

  static importBackup(jsonString: string): boolean {
    try {
      const data = JSON.parse(jsonString);
      if (data.students && Array.isArray(data.students)) {
        localStorage.setItem(STORAGE_KEYS.STUDENTS, JSON.stringify(data.students));
      }
      if (data.activeStudentId) {
        localStorage.setItem(STORAGE_KEYS.ACTIVE_STUDENT_ID, data.activeStudentId);
      }
      if (data.sessions && Array.isArray(data.sessions)) {
        localStorage.setItem(STORAGE_KEYS.SESSIONS, JSON.stringify(data.sessions));
      }
      if (data.streaks) {
        localStorage.setItem(STORAGE_KEYS.STREAKS, JSON.stringify(data.streaks));
      }
      return true;
    } catch (e) {
      console.error('Failed to import backup JSON', e);
      return false;
    }
  }
}
