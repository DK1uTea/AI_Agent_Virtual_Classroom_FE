'use client'

import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Course } from "@/types/main-flow";
import { Search } from "lucide-react";
import { useEffect, useState } from "react";
import CourseCard from "./course-card";
import { useCourseStore } from "@/stores/course-store";
import { useShallow } from "zustand/shallow";
import { useCourseList } from "@/hooks/useCourseList";
import { useAuthStore } from "@/stores/auth-store";

const CourseList = () => {
  const {
    accessToken
  } = useAuthStore((useShallow((state) => ({
    accessToken: state.accessToken,
  }))));

  const {
    data: courseListData,
    isLoading,
  } = useCourseList({
    accessToken,
    page: 1,
    limit: 6,
  });

  const {
    courseList,
    setCourseList,
    setCurrentPage,
    setCurrentLimit,
    setCurrentTotalPages
  } = useCourseStore((useShallow((state) => ({
    courseList: state.courseList,
    setCourseList: state.setCourseList,
    setCurrentPage: state.setCurrentPage,
    setCurrentLimit: state.setCurrentLimit,
    setCurrentTotalPages: state.setCurrentTotalPages,
  }))))

  useEffect(() => {
    if (!isLoading && courseListData) {
      setCourseList(courseListData.items);
      setCurrentPage(courseListData.page);
      setCurrentLimit(courseListData.limit);
      setCurrentTotalPages(courseListData.totalPages);
    }
  }, [courseListData])

  return (
    <div>
      <p>
        Found {courseList.length} courses.
      </p>

      {
        isLoading && (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {[...Array(6)].map((_, i) => (
              <Card key={i}>
                <Skeleton className="h-48 w-full rounded-t-xl" />
                <CardHeader>
                  <Skeleton className="h-6 w-3/4" />
                  <Skeleton className="h-4 w-full" />
                </CardHeader>
              </Card>
            ))}
          </div>
        )
      }

      {
        !isLoading && courseList.length === 0 && (
          <Card>
            <CardContent className="flex flex-col items-center justify-center py-16">
              <div className="mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-muted">
                <Search className="h-10 w-10 text-muted-foreground" />
              </div>
              <h3>Not found any courses</h3>
              <p className="text-muted-foreground">
                Try changing the filter or search keyword
              </p>
            </CardContent>
          </Card>
        )
      }

      {
        !isLoading && courseList.length > 0 && (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {courseList.map((course) => (
              <CourseCard key={course.id} course={course} />
            ))}
          </div>
        )
      }
    </div>

  );
};

export default CourseList;