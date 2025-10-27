export type Course = {
  id: string;
  title: string;
  description: string;
  coverImage: string;
  instructor: string;
  duration: string;
  lessonCount: number;
  level: 'beginner' | 'intermediate' | 'advanced';
  category: string;
  rating: number;
  isNew?: boolean;
  isHot?: boolean;
  progress?: number;
  enrolled?: boolean;
};

export type Lesson = {
  id: string;
  courseId: string;
  title: string;
  duration: string;
  status: 'not-started' | 'in-progress' | 'completed';
  videoUrl: string;
  transcript: TranscriptItem[];
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