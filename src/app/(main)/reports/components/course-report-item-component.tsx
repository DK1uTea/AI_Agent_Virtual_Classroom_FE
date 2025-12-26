import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

type CourseReportItemComponentProps = {
  courseItem: {
    courseId: number | string;
    title: string;
    progressPercent: number;
    completedLessons: number;
    totalLessons: number;
    duration: number;
    averageScore: number;
  }
};

const CourseReportItemComponent = ({ courseItem }: CourseReportItemComponentProps) => {
  const router = useRouter();

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h4>{courseItem.title}</h4>
          <p className="text-muted-foreground">{courseItem.progressPercent}% Completed</p>
        </div>
        <Button variant="outline" onClick={() => router.push(`/course-detail/${courseItem.courseId}`)}>
          View Details
        </Button>
      </div>
      <div className="grid gap-4 sm:grid-cols-3">
        <div className="rounded-lg border p-4">
          <p className="text-muted-foreground">Lessons</p>
          <p>{courseItem.completedLessons}/{courseItem.totalLessons}</p>
        </div>
        <div className="rounded-lg border p-4">
          <p className="text-muted-foreground">Duration</p>
          <p>{courseItem.duration} hours</p>
        </div>
        <div className="rounded-lg border p-4">
          <p className="text-muted-foreground">Average Score</p>
          <p>{courseItem.averageScore}%</p>
        </div>
      </div>
    </div>
  );
}

export default CourseReportItemComponent;