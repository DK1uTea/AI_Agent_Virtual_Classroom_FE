'use client'

import { ReportCourseRes } from "@/apis/responses/dashboard-res";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useGetReportCourse } from "@/hooks/useDashboard";
import { useAuthStore } from "@/stores/auth-store";
import { useEffect, useState } from "react";
import { useShallow } from "zustand/shallow";
import CourseReportItemComponent from "./course-report-item-component";

const CoursesTab = () => {

  const {
    accessToken,
  } = useAuthStore(useShallow((state) => ({
    accessToken: state.accessToken,
  })))

  const reportCourseQuery = useGetReportCourse({
    accessToken: accessToken,
  })

  const [courseReportData, setCourseReportData] = useState<ReportCourseRes | null>(null);

  useEffect(() => {
    if (reportCourseQuery.data) {
      setCourseReportData(reportCourseQuery.data);
    }
  }, [reportCourseQuery.data]);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Course Progress</CardTitle>
        <CardDescription>Details of each course's progress</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {courseReportData?.courses.map((courseItem) => (
            <CourseReportItemComponent
              key={courseItem.courseId}
              courseItem={courseItem}
            />
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

export default CoursesTab;