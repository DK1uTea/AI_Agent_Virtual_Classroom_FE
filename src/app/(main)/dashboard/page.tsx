'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import DashboardHeader from "./components/dashboard-header";
import GeneralStat from "./components/general-stat";
import ProgressStat from "./components/progress-stat";
import { Flame } from "lucide-react";
import { useEffect, useState } from "react";
import { DashboardRes } from "@/apis/responses/dashboard-res";
import { useGetDashboard } from "@/hooks/useDashboard";
import { useAuthStore } from "@/stores/auth-store";
import { useShallow } from "zustand/shallow";
import { DashboardSkeleton } from "./components/dashboard-skeleton";
import RecentLessonItemComponent from "./components/recent-lesson-item-component";

const Dashboard = () => {

  const {
    accessToken
  } = useAuthStore(useShallow((state) => ({
    accessToken: state.accessToken,
  })));

  const [dashboardData, setDashboardData] = useState<DashboardRes | null>(null);

  const {
    data: DashboardData,
    isLoading: isDashboardLoading,
  } = useGetDashboard({
    accessToken: accessToken || '',
  })

  useEffect(() => {
    if (DashboardData) {
      setDashboardData(DashboardData);
    }
  }, [DashboardData]);

  console.log('Dashboard Data: ', dashboardData);

  if (isDashboardLoading || !dashboardData) {
    return (
      <DashboardSkeleton />
    )
  }

  return (
    <div className="space-y-6 p-6">
      {/* Dashboard header */}
      <DashboardHeader />
      {/* Stats Grid */}
      <GeneralStat
        generalStatData={dashboardData.summary}
      />
      <ProgressStat
        weeklyStudyHours={dashboardData.summary.weeklyStudyHours}
        weeklyStudyData={dashboardData.weeklyStudyTime}
        courseProgressData={dashboardData.courseProgress}
      />
      {/* Recent Lessons */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Lessons</CardTitle>
          <CardDescription>Continue from where you left off</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {dashboardData.recentLessons.map((item) => (
              <RecentLessonItemComponent
                key={item.lessonId}
                recentLessonItemData={item}
              />
            ))}
          </div>
        </CardContent>
      </Card>
      {/* Streak Widget */}
      <Card className="bg-gradient-to-br from-orange-500/10 to-red-500/10 border-orange-500/20">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Flame className="h-5 w-5 text-orange-500" />
            Streak {dashboardData.summary.streak} days!
          </CardTitle>
          <CardDescription>
            You're on a {dashboardData.summary.streak}-day learning streak. Keep it up!
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-2">
            {[...Array(7)].map((_, i) => (
              <div
                key={i}
                className={`h-10 w-10 rounded-lg flex items-center justify-center ${i < 5
                  ? 'bg-orange-500 text-white'
                  : 'bg-muted text-muted-foreground'
                  }`}
              >
                {i < dashboardData.summary.streak ? '🔥' : '·'}
              </div>
            ))}
          </div>
          <p className="mt-4 text-muted-foreground">
            Keep your streak going by completing at least one lesson each day!
          </p>
        </CardContent>
      </Card>
    </div>
  );
}

export default Dashboard;