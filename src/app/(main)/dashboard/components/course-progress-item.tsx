import { Progress } from "@/components/ui/progress";
import { Course } from "@/types/main-flow";

type CourseProgressItemProps = {
  course: Course;
}

const CourseProgressItem = ({ course }: CourseProgressItemProps) => {
  return (
    <div key={course.id} className="space-y-2">
      <div className="flex items-center justify-between">
        <p>{course.title}</p>
        <span className="text-muted-foreground">
          {course.progress?.percent}%
        </span>
      </div>
      <Progress value={course.progress?.percent} />
      {
        course.totalLessons &&
        <p className="text-muted-foreground">
          {course.progress?.completedLessons}/{course.progress?.totalLessons} lessons
        </p>
      }
    </div>
  );

};

export default CourseProgressItem;