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
          {course.progress}%
        </span>
      </div>
      <Progress value={course.progress} />
      <p className="text-muted-foreground">
        {Math.round((course.lessonCount * (course.progress || 0)) / 100)}/{course.lessonCount} lessons
      </p>
    </div>
  );

};

export default CourseProgressItem;