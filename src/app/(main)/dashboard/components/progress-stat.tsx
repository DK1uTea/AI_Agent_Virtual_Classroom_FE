'use client'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import CourseProgressItem from "./course-progress-item";

const ProgressStat = () => {

  const studyTimeData = [
    { day: 'T2', hours: 2 },
    { day: 'T3', hours: 1.5 },
    { day: 'T4', hours: 3 },
    { day: 'T5', hours: 2.5 },
    { day: 'T6', hours: 1 },
    { day: 'T7', hours: 4 },
    { day: 'CN', hours: 3.5 },
  ];

  return (
    <div className="grid gap-6 lg:grid-cols-2">
      {/* Course Progress */}
      <Card>
        <CardHeader>
          <CardTitle>Course Progress</CardTitle>
          <CardDescription>Courses you are currently enrolled in</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* {enrolledCourses.map((course) => (
            <CourseProgressItem key={course.id} course={course} />
          ))} */}
        </CardContent>
      </Card>

      {/* Study Time Chart */}
      <Card>
        <CardHeader>
          <CardTitle>Total time study this week</CardTitle>
          <CardDescription>Total: 17.5 hours</CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={studyTimeData}>
              <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
              <XAxis dataKey="day" className="text-muted-foreground" />
              <YAxis className="text-muted-foreground" />
              <Tooltip
                contentStyle={{
                  backgroundColor: 'hsl(var(--card))',
                  border: '1px solid hsl(var(--border))',
                  borderRadius: '8px',
                }}
              />
              <Bar dataKey="hours" fill="hsl(var(--primary))" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );
};

export default ProgressStat;