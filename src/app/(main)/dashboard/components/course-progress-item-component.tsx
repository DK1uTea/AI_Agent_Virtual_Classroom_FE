import { CourseProgressItem } from "@/apis/responses/dashboard-res";
import { Progress } from "@/components/ui/progress";


type CourseProgressItemComponentProps = {
  course: CourseProgressItem;
}

const CourseProgressItemComponent = ({ course }: CourseProgressItemComponentProps) => {
  return (
    <div key={course.courseId} className="space-y-2">
      <div className="flex items-center justify-between">
        <p>{course.title}</p>
        <span className="text-muted-foreground">
          {course.progressPercent}%
        </span>
      </div>
      <Progress value={course.progressPercent} />
      {
        course.totalLessons &&
        <p className="text-muted-foreground">
          {course.completedLessons}/{course.totalLessons} lessons
        </p>
      }
    </div>
  );

};

export default CourseProgressItemComponent;