'use client'

import { RecentLessonItem } from "@/apis/responses/dashboard-res";
import { Progress } from "@/components/ui/progress";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { Play } from "lucide-react";

dayjs.extend(relativeTime);
import { useRouter } from "next/navigation";
type RecentLessonItemComponentProps = {
  recentLessonItemData: RecentLessonItem;
}

const RecentLessonItemComponent = ({ recentLessonItemData }: RecentLessonItemComponentProps) => {
  const router = useRouter();
  return (
    <div className="flex items-center gap-4 rounded-lg border p-4 hover:bg-accent cursor-pointer" onClick={() => router.push(`/lesson/${recentLessonItemData.courseId}/${recentLessonItemData.lessonId}`)}>
      <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
        <Play className="h-6 w-6 text-primary" />
      </div>
      <div className="flex-1 space-y-1">
        <p>{recentLessonItemData.lessonTitle}</p>
        <p className="text-muted-foreground">{recentLessonItemData.courseTitle}</p>
        <div className="flex items-center gap-2">
          <Progress value={recentLessonItemData.progressPercent} className="h-1" />
          <span className="text-muted-foreground">{recentLessonItemData.progressPercent}%</span>
        </div>
      </div>
      <span className="text-muted-foreground">{dayjs(recentLessonItemData.lastAccessedAt).fromNow()}</span>
    </div>
  );
};

export default RecentLessonItemComponent;