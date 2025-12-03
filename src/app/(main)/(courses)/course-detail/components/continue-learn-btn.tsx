'use client'
import { Button } from "@/components/ui/button";
import { Course } from "@/types/main-flow";
import { PlayCircle } from "lucide-react";
import { useRouter } from "next/navigation";
import { useMemo } from "react";

type ContinueLearnButtonProps = {
  course: Course;
}

const ContinueLearnButton = ({ course }: ContinueLearnButtonProps) => {
  const router = useRouter();

  const continuedLessonId = useMemo(() => {
    if (course.progress?.completedLessons && course.progress?.completedLessons === 0) {
      return course.lessons?.[0].id;
    } else if (course.progress?.completedLessons && course.progress?.totalLessons && course.progress.completedLessons > 0 && course.progress.completedLessons < course.progress.totalLessons) {
      return course.lessons?.[course.progress.completedLessons].id;
    }
  }, [course]);

  return (
    <Button size="lg" onClick={() => router.push(`/lesson/${course.id}/${continuedLessonId}`)}>
      <PlayCircle className="mr-2 h-5 w-5" />
      Continue Learning
    </Button>
  )
}
export default ContinueLearnButton;