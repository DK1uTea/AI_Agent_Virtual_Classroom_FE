'use client'
import { Button } from "@/components/ui/button";
import { Course } from "@/types/main-flow";
import { PlayCircle } from "lucide-react";
import { useRouter } from "next/navigation";
import { useMemo } from "react";
import { toast } from "sonner";

type ContinueLearnButtonProps = {
  course: Course;
}

const ContinueLearnButton = ({ course }: ContinueLearnButtonProps) => {
  const router = useRouter();

  const continuedLessonId = useMemo(() => {
    if (!course.lessons || course.lessons.length === 0) {
      console.log("No lessons found in course");
      return undefined;
    }

    if (!course.progress?.completedLessons || course.progress.completedLessons === 0) {
      console.log("Starting from first lesson");
      return course.lessons[0].id;
    }

    if (course.progress.completedLessons < (course.progress.totalLessons || course.lessons.length)) {
      console.log(`Continuing from lesson ${course.progress.completedLessons}`);
      return course.lessons[course.progress.completedLessons]?.id;
    }

    console.log("Course completed, returning to last lesson");
    return course.lessons[course.lessons.length - 1].id;
  }, [course]);

  return (
    <Button size="lg"
      onClick={() => {
        if (course.id && continuedLessonId) {
          router.push(`/lesson/${course.id}/${continuedLessonId}`);
        } else {
          toast.error("Unable to continue learning. Please try again.");
        }
      }}
    >
      <PlayCircle className="mr-2 h-5 w-5" />
      Continue Learning
    </Button >
  )
}
export default ContinueLearnButton;