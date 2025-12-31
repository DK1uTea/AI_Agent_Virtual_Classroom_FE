'use client'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts";
import { CourseProgressItem, WeeklyStudyItem } from "@/apis/responses/dashboard-res";
import { useMemo } from "react";
import CourseProgressItemComponent from "./course-progress-item-component";
import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";

type ProgressStatProps = {
  weeklyStudyHours: number;
  weeklyStudyData: WeeklyStudyItem[];
  courseProgressData: CourseProgressItem[];
}

const chartConfig = {
  hours: {
    label: "Study Time (Hours)",
    color: "var(--primary)",
  },
} satisfies ChartConfig;

const ProgressStat = (
  { weeklyStudyHours, weeklyStudyData, courseProgressData }: ProgressStatProps
) => {

  const studyTimeData = useMemo(() => {
    return weeklyStudyData.map((item) => ({
      day: item.day,
      hours: item.hours,
      date: item.date,
    }))
  }, [weeklyStudyData]);


  return (
    <div className="grid gap-6 lg:grid-cols-2">
      {/* Course Progress */}
      <Card>
        <CardHeader>
          <CardTitle>Course Progress</CardTitle>
          <CardDescription>Courses you are currently enrolled in</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {courseProgressData.map((course) => (
            <CourseProgressItemComponent
              key={course.courseId}
              course={course} />
          ))}
        </CardContent>
      </Card>

      {/* Study Time Chart */}
      <Card>
        <CardHeader>
          <CardTitle>Total time study this week</CardTitle>
          <CardDescription>Total: {weeklyStudyHours} hours</CardDescription>
        </CardHeader>
        <CardContent>
          <ChartContainer config={chartConfig} className="h-[200px] w-full">
            <BarChart data={studyTimeData}>
              <CartesianGrid strokeDasharray="3 3" className="stroke-muted" vertical={false} />
              <XAxis dataKey="day" className="text-muted-foreground" />
              <YAxis className="text-muted-foreground" />
              <ChartTooltip
                cursor={false}
                content={<ChartTooltipContent hideIndicator />}
              />
              <Bar dataKey="hours" fill="var(--color-hours)" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ChartContainer>
        </CardContent>
      </Card>
    </div>
  );
};

export default ProgressStat;