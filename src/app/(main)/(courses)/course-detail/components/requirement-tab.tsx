import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Course } from "@/types/main-flow";

type RequirementsTabProps = {
  course: Course;
};
const RequirementsTab = ({ course }: RequirementsTabProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Requirements</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <h4>Knowledge prerequisites:</h4>
          <ul className="list-disc list-inside space-y-1 text-muted-foreground">
            <li>Basic computer knowledge</li>
            <li>Passion for learning and development</li>
            <li>No prior experience required</li>
          </ul>
        </div>
        <div className="space-y-2">
          <h4>Required equipment:</h4>
          <ul className="list-disc list-inside space-y-1 text-muted-foreground">
            <li>Computer (Windows/Mac/Linux)</li>
            <li>Stable internet connection</li>
          </ul>
        </div>
      </CardContent>
    </Card>
  );
};

export default RequirementsTab;