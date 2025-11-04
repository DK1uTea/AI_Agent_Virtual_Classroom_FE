'use client'

import { Button } from "@/components/ui/button";
import { Lesson } from "@/types/main-flow";
import { ArrowUpIcon } from "lucide-react";
import { useRouter } from "next/navigation";

type LessonListTabProps = {
  lessons: Lesson[];
  currentLessonId: string;
}
const LessonListTab = ({ lessons, currentLessonId }: LessonListTabProps) => {
  const router = useRouter();

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
            <div>
              <p>Lesson {lesson.order}: {lesson.title}</p>
              <p className={lesson.id === currentLessonId ? 'text-primary-foreground/80' : 'text-muted-foreground'}>
                {lesson.duration}
              </p>
            </div>
            {
              currentLessonId === lesson.id &&
              <Button
                className="space-x-1"
                variant={"secondary"}
                onClick={(e) => {
                  e.stopPropagation();
                  router.push('quiz');
                }}
              >
                <span>Take a quiz test</span>
                <ArrowUpIcon className="h-4 w-4" />
              </Button>
            }
          </div>
        ))}
      </div>

    </div>
  );
};

export default LessonListTab;