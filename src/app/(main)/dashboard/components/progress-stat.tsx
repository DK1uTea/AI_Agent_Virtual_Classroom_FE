'use client'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { CourseProgressItem, WeeklyStudyItem } from "@/apis/responses/dashboard-res";
import { useMemo } from "react";
import CourseProgressItemComponent from "./course-progress-item-component";

type ProgressStatProps = {
  weeklyStudyHours: number;
  weeklyStudyData: WeeklyStudyItem[];
  courseProgressData: CourseProgressItem[];
}

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

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-card border border-border rounded-lg p-2 shadow-sm">
          <p className="text-sm font-medium">{payload[0].payload.date}</p>
          <p className="text-sm text-muted-foreground">
            {`Hours: ${payload[0].value}`}
          </p>
        </div>
      );
    }
    return null;
  };

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
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={studyTimeData}>
              <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
              <XAxis dataKey="day" className="text-muted-foreground" />
              <YAxis className="text-muted-foreground" />
              <Tooltip content={<CustomTooltip />} />
              <Bar dataKey="hours" fill="hsl(var(--primary))" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );
};

export default ProgressStat;