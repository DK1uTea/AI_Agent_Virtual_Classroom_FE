'use client'

import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Course } from "@/types/main-flow";
import { Search } from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import CourseCard from "./course-card";
import { useCourseStore } from "@/stores/course-store";
import { useShallow } from "zustand/shallow";
import { useCourseList } from "@/hooks/useCourseList";
import { useAuthStore } from "@/stores/auth-store";
import { useMyCourse } from "@/hooks/useMyCourse";

const CourseList = () => {
  const {
    accessToken
  } = useAuthStore((useShallow((state) => ({
    accessToken: state.accessToken,
  }))));

  const {
    data: courseListData,
    isLoading: isCourseListLoading,
  } = useCourseList({
    accessToken,
    page: 1,
    limit: 6,
  });

  const {
    data: myCoursesData,
    isLoading: isMyCourseLoading,
  } = useMyCourse({
    accessToken,
  })

  const {
    courseList,
    setCourseList,
    setCurrentPage,
    setCurrentLimit,
    setCurrentTotalPages,
    myCourses,
    setMyCourses,
  } = useCourseStore((useShallow((state) => ({
    courseList: state.courseList,
    setCourseList: state.setCourseList,
    setCurrentPage: state.setCurrentPage,
    setCurrentLimit: state.setCurrentLimit,
    setCurrentTotalPages: state.setCurrentTotalPages,
    myCourses: state.myCourses,
    setMyCourses: state.setMyCourses,
  }))))

  useEffect(() => {
    if (!isCourseListLoading && courseListData) {
      setCourseList(courseListData.items);
      setCurrentPage(courseListData.page);
      setCurrentLimit(courseListData.limit);
      setCurrentTotalPages(courseListData.totalPages);
    }
  }, [courseListData])

  useEffect(() => {
    if (!isMyCourseLoading && myCoursesData) {
      setMyCourses(myCoursesData);
    }
  }, [myCoursesData])

  useEffect(() => {
    myCourses.forEach((course) => {
      if (courseList.find((c) => c.id === course.id)) {
        setCourseList((prev) => {
          return prev.map((c) => {
            if (c.id === course.id) {
              return { ...c, status: 'Active', enrolledAt: course.enrolledAt };
            }
            return c;
          })
        })
      }
    })
  }, [courseList, myCourses])

  return (
    <div>
      <p>
        Found {courseList.length} courses.
      </p>

      {
        (isCourseListLoading || isMyCourseLoading) && (
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
        !isCourseListLoading && courseList.length === 0 && (
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
        !isCourseListLoading && courseList.length > 0 && !isMyCourseLoading && (
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