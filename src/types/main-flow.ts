export type Course = {
  id: string | number;
  title: string;
  slug?: string;
  description?: string;
  coverImage?: string;
  createdAt?: string;
  updatedAt?: string;
  duration?: number;
  level?: CourseLevel;
  category?: string;
  requirements?: string;
  rating?: number;
  isNew?: boolean;
  isHot?: boolean;
  instructor?: string;
  progress?: {
    status: string;
    enrolledAt: string;
    percent: number;
    completedLessons: number;
    totalLessons: number;
  }
  totalLessons?: number;
  lessons?: Lesson[];
  createdBy: string;
  status?: string;
  enrolledAt?: string;
};

export enum CourseLevel {
  BASIC = "Basic",
  MEDIUM = "Medium",
  ADVANCED = "Advanced",
}

export enum EnrollmentStatus {
  ACTIVE = 'Active',
  COMPLETED = 'Completed',
  CANCELLED = 'Cancelled',
}

export enum SortOrder {
  ASC = 'ASC',
  DESC = 'DESC',
}

export type Lesson = {
  id: string | number;
  title: string;
  order: number;
  duration: number;
  status?: 'not-started' | 'in-progress' | 'completed';
  videoCompleted?: boolean;
  quizCompleted?: boolean;
}

export type TranscriptItem = {
  id: string;
  start: number;
  end: number;
  text: string;
}

export type SidebarLessonItem = {
  id: string | number;
  title: string;
  order: string | number;
  duration: number;
}

export type LessonWithPlayback = Lesson & {
  url: string;
  type: string;
  courseId: string | number;
}

export interface ActivityLog {
  id: string;
  type: 'video-watch' | 'quiz-complete' | 'lesson-complete';
  timestamp: Date;
  details: string;
  duration?: string;
  score?: number;
}

export type Question = {
  id: string;
  type: 'multiple-choice' | 'true-false';
  question: string;
  options?: string[];
}

export type Quiz = {
  id: string;
  lessonId: string;
  title: string;
  questions: Question[];
  timeLimit?: number;
  status?: 'not-started' | 'in-progress' | 'completed';
}