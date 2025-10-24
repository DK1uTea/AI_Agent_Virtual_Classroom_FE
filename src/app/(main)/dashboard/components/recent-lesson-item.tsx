'use client'

import { Progress } from "@/components/ui/progress";
import { Course, Lesson } from "@/types/main-flow";
import { Play } from "lucide-react";
import { useRouter } from "next/navigation";
type RecentLessonItemProps = {
  lesson: Lesson;
  course: Course;
}

const RecentLessonItem = ({ lesson, course }: RecentLessonItemProps) => {
  const router = useRouter();
  return (
    <div className="flex items-center gap-4 rounded-lg border p-4 hover:bg-accent cursor-pointer" onClick={() => router.push(`lessons/${lesson.id}`)}>
      <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
        <Play className="h-6 w-6 text-primary" />
      </div>
      <div className="flex-1 space-y-1">
        <p>{lesson.title}</p>
        <p className="text-muted-foreground">{course.title}</p>
        <div className="flex items-center gap-2">
          <Progress value={course.progress} className="h-1" />
          <span className="text-muted-foreground">{course.progress}%</span>
        </div>
      </div>
      <span className="text-muted-foreground">{"1 day ago"}</span>
    </div>
  );
};

export default RecentLessonItem;