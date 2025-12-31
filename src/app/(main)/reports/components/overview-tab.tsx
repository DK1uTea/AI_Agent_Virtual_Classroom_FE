'use client'

import { ReportOverviewRes } from "@/apis/responses/dashboard-res";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useGetReportOverview } from "@/hooks/useDashboard";
import { useAuthStore } from "@/stores/auth-store";
import { useEffect, useMemo, useState } from "react";
import { Bar, BarChart, CartesianGrid, Cell, Line, LineChart, Pie, PieChart, ResponsiveContainer, XAxis, YAxis } from "recharts";
import { useShallow } from "zustand/shallow";

import { OverviewTabSkeleton } from "./overview-tab-skeleton";
import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";

const COLORS = ['var(--chart-1)', 'var(--chart-2)', 'var(--chart-3)'];

const chartConfig = {
  hours: {
    label: "Study Time (Hours)",
    color: "var(--primary)",
  },
  lessons: {
    label: "Lessons Completed",
    color: "var(--primary)",
  },
  value: {
    label: "Distribution (%)",
  }
} satisfies ChartConfig;

type OverviewTabProps = {
  timeRange: string;
};

const OverviewTab = ({ timeRange }: OverviewTabProps) => {

  const {
    accessToken,
  } = useAuthStore(useShallow((state) => ({
    accessToken: state.accessToken,
  })))

  const reportOverviewQuery = useGetReportOverview({
    accessToken: accessToken,
    period: timeRange,
  })

  const [overviewData, setOverviewData] = useState<ReportOverviewRes | null>(null);

  const barChartData = useMemo(() => {
    return overviewData?.studyTimeByDay?.map((item) => ({
      day: item.day,
      hours: item.value,
      date: item.date,
    }))
  }, [overviewData])

  const lineChartData = useMemo(() => {
    return overviewData?.lessonsCompletedByDay?.map((item) => ({
      day: item.day,
      lessons: item.value,
      date: item.date,
    }))
  }, [overviewData])

  const pieChartData = useMemo(() => {
    return overviewData?.studyTimeDistribution?.map((item) => ({
      name: item.courseTitle,
      value: item.percentage,
    }))
  }, [overviewData])

  useEffect(() => {
    if (reportOverviewQuery.data) {
      setOverviewData(reportOverviewQuery.data);
    }
  }, [reportOverviewQuery.data]);

  if (reportOverviewQuery.isLoading) {
    return <OverviewTabSkeleton />;
  }

  return (
    <div className="space-y-6">
      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Study Time by Day</CardTitle>
            <CardDescription>Last {timeRange} days</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer config={chartConfig} className="h-[300px] w-full">
              <BarChart data={barChartData}>
                <CartesianGrid strokeDasharray="3 3" className="stroke-muted" vertical={false} />
                <XAxis dataKey="day" className="text-muted-foreground" />
                <YAxis className="text-muted-foreground" />
                <ChartTooltip
                  cursor={false}
                  content={<ChartTooltipContent hideLabel />}
                />
                <Bar dataKey="hours" fill="var(--color-hours)" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ChartContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Lessons Completed</CardTitle>
            <CardDescription>Last {timeRange} days</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer config={chartConfig} className="h-[300px] w-full">
              <LineChart data={lineChartData}>
                <CartesianGrid strokeDasharray="3 3" className="stroke-muted" vertical={false} />
                <XAxis dataKey="day" className="text-muted-foreground" />
                <YAxis className="text-muted-foreground" />
                <ChartTooltip
                  cursor={false}
                  content={<ChartTooltipContent hideLabel />}
                />
                <Line
                  type="monotone"
                  dataKey="lessons"
                  stroke="var(--color-lessons)"
                  strokeWidth={2}
                  dot={{ fill: 'var(--color-lessons)' }}
                />
              </LineChart>
            </ChartContainer>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Study Time Distribution</CardTitle>
          <CardDescription>By Course</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col lg:flex-row items-center gap-8">
            <ChartContainer config={chartConfig} className="h-[300px] w-full">
              <PieChart>
                <Pie
                  data={pieChartData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {pieChartData?.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <ChartTooltip
                  cursor={false}
                  content={<ChartTooltipContent hideLabel />}
                />
              </PieChart>
            </ChartContainer>

            <div className="space-y-2 w-full lg:w-auto">
              {pieChartData?.map((item, index) => (
                <div key={index} className="flex items-center gap-2">
                  <div
                    className="h-4 w-4 rounded"
                    style={{ backgroundColor: COLORS[index] }}
                  />
                  <span>{item.name}</span>
                  <span className="text-muted-foreground">{item.value}%</span>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default OverviewTab;