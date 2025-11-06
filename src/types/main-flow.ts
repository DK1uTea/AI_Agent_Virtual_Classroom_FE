export type Course = {
  id: string;
  title: string;
  slug?: string;
  description?: string;
  coverImage?: string;
  createdAt?: string;
  updatedAt?: string;
  duration?: number;
  level?: CourseLevel;
  category?: CourseCategory;
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

export enum CourseCategory {
  MATH = 'Math',
  SCIENCE = 'Science',
  ARTS = 'Arts',
  TECHNOLOGY = 'Technology',
  ENGLISH = 'English',
  HISTORY = 'History',
  MUSIC = 'Music',
  GEOGRAPHY = 'Geography',
  LITERATURE = 'Literature',
  CIVIC_EDUCATION = 'Civic Education',
  PHYSICAL_EDUCATION = 'Physical Education',
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
  id: string;
  courseId?: string;
  title: string;
  duration: string;
  status?: 'not-started' | 'in-progress' | 'completed';
  videoUrl?: string;
  transcript?: TranscriptItem[];
  order: number;
}

export type TranscriptItem = {
  id: string;
  timestamp: string;
  time: number;
  text: string;
}

export interface ActivityLog {
  id: string;
  type: 'video-watch' | 'quiz-complete' | 'lesson-complete';
  timestamp: Date;
  details: string;
  duration?: string;
  score?: number;
}