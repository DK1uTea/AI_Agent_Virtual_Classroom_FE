'use client'

import { Lesson } from "@/types/main-flow";

type LessonListTabProps = {
  lessons: Lesson[];
  currentLessonId: string;
}
const LessonListTab = ({ lessons, currentLessonId }: LessonListTabProps) => {

  return (
    <div className="space-y-4">
      <h3>Lesson List</h3>
      <div className="space-y-2">
        {lessons.map((lesson) => (
          <div
            key={lesson.id}
            className={`p-3 rounded-lg border cursor-pointer transition-colors ${lesson.id === currentLessonId
              ? 'bg-primary text-primary-foreground border-primary'
              : 'hover:bg-accent'
              }`}
          >
            <p>Lesson {lesson.order}: {lesson.title}</p>
            <p className={lesson.id === currentLessonId ? 'text-primary-foreground/80' : 'text-muted-foreground'}>
              {lesson.duration}
            </p>
          </div>
        ))}
      </div>

    </div>
  );
};

export default LessonListTab;