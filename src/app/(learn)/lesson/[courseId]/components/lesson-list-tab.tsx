'use client'

import { Button } from "@/components/ui/button";
import { formatTimer } from "@/lib/utils";
import { useLessonStore } from "@/stores/lesson-store";
import { Lesson } from "@/types/main-flow";
import { ArrowUpIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useShallow } from "zustand/shallow";

const LessonListTab = () => {
  const router = useRouter();

  const {
    currentLesson,
    currentSidebarLessons,
  } = useLessonStore(useShallow((state) => ({
    currentLesson: state.currentLesson,
    currentSidebarLessons: state.currentSidebarLessons,
  })))

  return (
    <div className="space-y-4">
      <h3>Lesson List</h3>
      <div className="space-y-2">
        {currentSidebarLessons.map((lesson) => (
          <div
            key={lesson.id}
            className={`p-3 rounded-lg border cursor-pointer transition-colors ${lesson.id === currentLesson?.id
              ? 'bg-primary text-primary-foreground border-primary'
              : 'hover:bg-accent'
              }`}
          >
            <div>
              <p>Lesson {lesson.order}: {lesson.title}</p>
              <p className={lesson.id === currentLesson?.id ? 'text-primary-foreground/80' : 'text-muted-foreground'}>
                {formatTimer(lesson.duration || 0)}
              </p>
            </div>
            {
              currentLesson?.id === lesson.id &&
              <Button
                className="space-x-1"
                variant={"secondary"}
                onClick={(e) => {
                  e.stopPropagation();
                  router.push(`/quiz/${currentLesson?.id}`);
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