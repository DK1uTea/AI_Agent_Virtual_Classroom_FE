import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BookOpen, Clock, Flame, Trophy } from "lucide-react";

type GeneralStatProps = {
  generalStatData: {
    enrolledCourses: number;
    weeklyStudyHours: number;
    avgQuizScore: number;
    streak: number;
  }
}

const GeneralStat = ({ generalStatData }: GeneralStatProps) => {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle>Courses</CardTitle>
          <BookOpen className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div>{generalStatData.enrolledCourses}</div>
          <p className="text-muted-foreground">
            Total enrolled
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle>Study Time</CardTitle>
          <Clock className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div>{generalStatData.weeklyStudyHours} hours</div>
          <p className="text-muted-foreground">
            This week
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle>Average Score</CardTitle>
          <Trophy className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div>{generalStatData.avgQuizScore}%</div>
          <p className="text-muted-foreground">
            Across all courses
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle>Streak</CardTitle>
          <Flame className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div>{generalStatData.streak} days</div>
          <p className="text-muted-foreground">
            In a row
          </p>
        </CardContent>
      </Card>
    </div>
  );

};

export default GeneralStat;