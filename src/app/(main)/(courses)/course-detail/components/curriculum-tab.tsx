'use client'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Lesson } from "@/types/main-flow";
import { CheckCircle2, ChevronRight, Circle, PlayCircle } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

const CurriculumTab = () => {
  const [courseLessons, setCourseLessons] = useState<Lesson[]>([]);
  const [enrolled, setEnrolled] = useState<boolean>(true);
  const router = useRouter();
  return (
    <Card>
      <CardHeader>
        <CardTitle>Learning Roadmap</CardTitle>
        <CardDescription>
          {courseLessons.length} lessons - Learn sequentially from start to finish
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          {courseLessons.map((lesson, index) => {
            const Icon =
              lesson.status === 'completed'
                ? CheckCircle2
                : lesson.status === 'in-progress'
                  ? PlayCircle
                  : Circle;
            const iconColor =
              lesson.status === 'completed'
                ? 'text-primary'
                : lesson.status === 'in-progress'
                  ? 'text-blue-500'
                  : 'text-muted-foreground';

            return (
              <div
                key={lesson.id}
                className="flex items-center gap-4 rounded-lg border p-4 hover:bg-accent cursor-pointer transition-colors"
                onClick={() => enrolled && router.push(`/lesson/${lesson.id}`)}
              >
                <Icon className={`h-5 w-5 ${iconColor}`} />
                <div className="flex-1">
                  <p>{lesson.title}</p>
                  <p className="text-muted-foreground">
                    Lesson {index + 1} · {lesson.duration}
                  </p>
                </div>
                {enrolled && <ChevronRight className="h-5 w-5 text-muted-foreground" />}
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}

export default CurriculumTab;