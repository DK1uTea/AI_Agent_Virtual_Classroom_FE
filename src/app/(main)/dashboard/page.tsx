import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import DashboardHeader from "./components/dashboard-header";
import GeneralStat from "./components/general-stat";
import ProgressStat from "./components/progress-stat";
import { Flame } from "lucide-react";

const Dashboard = async () => {
  return (
    <div className="space-y-6 p-6">
      {/* Dashboard header */}
      <DashboardHeader />
      {/* Stats Grid */}
      <GeneralStat />
      <ProgressStat />
      {/* Recent Lessons */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Lessons</CardTitle>
          <CardDescription>Continue from where you left off</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {/* TODO: Map recent lessons */}
          </div>
        </CardContent>
      </Card>
      {/* Streak Widget */}
      <Card className="bg-gradient-to-br from-orange-500/10 to-red-500/10 border-orange-500/20">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Flame className="h-5 w-5 text-orange-500" />
            Streak {5} days!
          </CardTitle>
          <CardDescription>
            You're on a {5}-day learning streak. Keep it up!
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
                {i < 5 ? '🔥' : '·'}
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