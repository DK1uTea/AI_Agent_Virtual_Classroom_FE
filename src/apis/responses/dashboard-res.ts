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

export type ReportProgressRes = {
  totalTime: {
    value: number;
    change: string;
    comparisonText: string;
  };
  lessonsCompleted: {
    value: number;
    change: string;
    comparisonText: string;
  };
  averageScore: {
    value: number;
    change: string;
    comparisonText: string;
  };
  currentStreak: {
    current: number;
    record: number;
  }
}

export type ReportOverviewRes = {
  studyTimeByDay: {
    day: string;
    date: string;
    value: number;
  }[];
  lessonsCompletedByDay: {
    day: string;
    date: string;
    value: number;
  }[];
  studyTimeDistribution: {
    courseId: number | string;
    courseTitle: string;
    hours: number;
    percentage: number;
  }[];
}

export type ReportActivityRes = {
  items: {
    time: string;
    activity: string;
    details: string;
    lessonId: number | string;
    courseId: number | string;
  }[];
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

export type ReportCourseRes = {
  courses: {
    courseId: number | string;
    title: string;
    progressPercent: number;
    completedLessons: number;
    totalLessons: number;
    duration: number;
    averageScore: number;
  }[];
}