export type CourseProgressItem = {
  courseId: string | number;
  title: string;
  completedLessons: number;
  totalLessons: number;
  progressPercent: number;
}

export type WeeklyStudyItem = {
  day: string;
  date: string;
  hours: number;
}

export type RecentLessonItem = {
  lessonId: string | number;
  courseId: string | number;
  lessonTitle: string;
  courseTitle: string;
  progressPercent: number;
  lastAccessedAt: string;
}

export type DashboardRes = {
  summary: {
    enrolledCourses: number;
    weeklyStudyHours: number;
    avgQuizScore: number;
    streak: number;
  };
  courseProgress: CourseProgressItem[];
  weeklyStudyTime: WeeklyStudyItem[];
  recentLessons: RecentLessonItem[];
}