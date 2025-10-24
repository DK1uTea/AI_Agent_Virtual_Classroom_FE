import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Course } from "@/types/main-flow";

type DescriptionTabProps = {
  course: Course;
}
const DescriptionTab = ({ course }: DescriptionTabProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>About this course</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-muted-foreground">
          {course.description}
        </p>
        <div className="space-y-2">
          <h4>What you will learn?</h4>
          <ul className="list-disc list-inside space-y-1 text-muted-foreground">
            <li>Master the basic and advanced concepts</li>
            <li>Build real-world projects</li>
            <li>Apply knowledge to work</li>
            <li>Prepare for career opportunities</li>
          </ul>
        </div>
      </CardContent>
    </Card>
  );
};

export default DescriptionTab;