import { ReportProgressRes } from "@/apis/responses/dashboard-res";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useReportProgress } from "@/hooks/useDashboard";
import { useAuthStore } from "@/stores/auth-store";
import { stat } from "fs";
import { Calendar, Clock, TrendingUp, Trophy } from "lucide-react";
import { useEffect, useState } from "react";
import { useShallow } from "zustand/shallow";

import { GeneralStatSkeleton } from "./general-stat-skeleton";

type GeneralStatProps = {
  timeRange: string;
};

const GeneralStat = ({ timeRange }: GeneralStatProps) => {

  const {
    accessToken,
  } = useAuthStore(useShallow((state) => ({
    accessToken: state.accessToken,
  })))

  const reportProgressQuery = useReportProgress({
    accessToken: accessToken,
    period: timeRange,
  })

  const [statData, setStatData] = useState<ReportProgressRes | null>(null);

  useEffect(() => {
    if (reportProgressQuery.data) {
      setStatData(reportProgressQuery.data);
    }
  }, [reportProgressQuery.data]);

  if (reportProgressQuery.isLoading) {
    return <GeneralStatSkeleton />;
  }

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle>Total Time</CardTitle>
          <Clock className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div>{statData?.totalTime.value} hours</div>
          <p className="text-muted-foreground">
            {statData?.totalTime.change} {statData?.totalTime.comparisonText}
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle>Lessons Completed</CardTitle>
          <TrendingUp className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div>{statData?.lessonsCompleted.value} lessons</div>
          <p className="text-muted-foreground">
            {statData?.lessonsCompleted.change} {statData?.lessonsCompleted.comparisonText}
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle>Average Score</CardTitle>
          <Trophy className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div>{statData?.averageScore.value}%</div>
          <p className="text-muted-foreground">
            {statData?.averageScore.change} {statData?.averageScore.comparisonText}
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle>Current Streak</CardTitle>
          <Calendar className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div>{statData?.currentStreak.current} days</div>
          <p className="text-muted-foreground">
            Record: {statData?.currentStreak.record} days
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default GeneralStat;