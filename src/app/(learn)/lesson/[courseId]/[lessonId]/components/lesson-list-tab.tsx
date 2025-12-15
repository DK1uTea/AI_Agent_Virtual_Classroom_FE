'use client'

import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { formatTimer } from "@/lib/utils";
import { useCourseStore } from "@/stores/course-store";
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
    <div className="flex flex-col space-y-4 h-full rounded-lg outline-dashed outline-2 outline-muted-foreground/50 p-2">
      <h3>Lesson List</h3>
      <ScrollArea className="flex-1 h-0">
        <div className="space-y-2 p-3">
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
                // <Button
                //   className="space-x-1"
                //   variant={"secondary"}
                //   onClick={(e) => {
                //     e.stopPropagation();
                //     if(currentLesson.status === 'completed') {
                //       router.push(`/quiz/${currentLesson?.courseId}/${currentLesson?.id}`);
                //     } else {

                //       return;
                //     }
                //   }}
                // >
                //   <span>Take a quiz test</span>
                //   <ArrowUpIcon className="h-4 w-4" />
                // </Button>
                (
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button variant="outline" className="flex justify-center items-center gap-2">
                        <span>Take a quiz test</span>
                        <ArrowUpIcon className="h-4 w-4" />
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>
                          {currentLesson?.completed?.videoCompleted ? 'Proceed to Quiz Test' : 'Quiz Unavailable'}
                        </AlertDialogTitle>
                        <AlertDialogDescription>
                          {currentLesson?.completed?.videoCompleted
                            ? 'You have completed this lesson. Click Continue to proceed to the quiz test.'
                            : 'You need to complete the lesson before taking the quiz test.'}
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        {currentLesson?.completed?.videoCompleted && (
                          <AlertDialogAction
                            onClick={() => router.push(`/quiz/${currentLesson?.courseId}/${currentLesson?.id}`)}
                          >Continue</AlertDialogAction>
                        )}
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                )
              }
            </div>
          ))}
        </div>
      </ScrollArea>
    </div>
  );
};

export default LessonListTab;