import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import GeneralStat from "./components/general-stat";
import SelectTimeRange from "./components/select-time-range";
import OverviewTab from "./components/overview-tab";
import ActivityTab from "./components/activity-tab";
import CoursesTab from "./components/courses-tab";

const ReportPage = () => {
  return (
    <div className="space-y-6 p-6">
      <div className="flex items-center justify-between">
        <div>
          <h1>Progress Report</h1>
          <p className="text-muted-foreground">
            Track your learning progress
          </p>
        </div>
        <SelectTimeRange />
      </div>

      {/* Stat Grid */}
      <GeneralStat />
      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">
            Overview
          </TabsTrigger>
          <TabsTrigger value="activity">
            Activity
          </TabsTrigger>
          <TabsTrigger value="courses">
            Courses
          </TabsTrigger>
        </TabsList>

        <TabsContent value="overview">
          <OverviewTab />
        </TabsContent>

        <TabsContent value="activity">
          <ActivityTab />
        </TabsContent>

        <TabsContent value="courses">
          <CoursesTab />
        </TabsContent>
      </Tabs>
    </div>
  );

};

export default ReportPage;