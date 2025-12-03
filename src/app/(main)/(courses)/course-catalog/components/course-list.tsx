'use client'

import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { EnrollmentStatus } from "@/types/main-flow";
import { Search } from "lucide-react";
import { useEffect } from "react";
import CourseCard from "./course-card";
import { useCourseStore } from "@/stores/course-store";
import { useShallow } from "zustand/shallow";
import { useGetCourseList } from "@/hooks/useGetCourseList";
import { useAuthStore } from "@/stores/auth-store";
import { useGetMyCourse } from "@/hooks/useGetMyCourse";
import { Pagination, PaginationContent, PaginationEllipsis, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/components/ui/pagination";

const CourseList = () => {
  const {
    accessToken
  } = useAuthStore((useShallow((state) => ({
    accessToken: state.accessToken,
  }))));

  const {
    courseList,
    setCourseList,
    currentListConfig,
    setCurrentListConfig,
    currentTotalPages,
    setCurrentTotalPages,
    myCourses,
    setMyCourses,
  } = useCourseStore((useShallow((state) => ({
    courseList: state.courseList,
    setCourseList: state.setCourseList,
    currentListConfig: state.currentListConfig,
    setCurrentListConfig: state.setCurrentListConfig,
    currentTotalPages: state.currentTotalPages,
    setCurrentTotalPages: state.setCurrentTotalPages,
    myCourses: state.myCourses,
    setMyCourses: state.setMyCourses,
  }))));

  const {
    data: courseListData,
    isLoading: isCourseListLoading,
  } = useGetCourseList({
    accessToken,
    ...currentListConfig,
  });

  const {
    data: myCoursesData,
    isLoading: isMyCourseLoading,
  } = useGetMyCourse({
    accessToken,
  });


  useEffect(() => {
    if (!isCourseListLoading && courseListData) {
      setCourseList(courseListData.items);
      setCurrentListConfig((prev) => ({
        ...prev,
        page: courseListData.page,
        limit: courseListData.limit,
      }));
      setCurrentTotalPages(courseListData.totalPages);
    }
  }, [courseListData])

  useEffect(() => {
    if (!isMyCourseLoading && myCoursesData) {
      setMyCourses(myCoursesData);
    }
  }, [myCoursesData])

  useEffect(() => {
    if (myCourses.length === 0 || courseList.length === 0) return;

    let hasChanges = false;
    const updatedList = courseList.map((c) => {
      const enrolledCourse = myCourses.find((course) => course.id === c.id);
      if (enrolledCourse && c.status !== EnrollmentStatus.ACTIVE) {
        hasChanges = true;
        return { ...c, status: EnrollmentStatus.ACTIVE, enrolledAt: enrolledCourse.enrolledAt };
      }
      return c;
    });

    // Chỉ cập nhật nếu có thay đổi
    if (hasChanges) {
      setCourseList(updatedList);
    }
  }, [myCourses])

  const maxVisiblePages = 5;

  const handlePageChange = (page: number) => {
    if (page < 1 || page > currentTotalPages) return;
    setCurrentListConfig((prev) => ({
      ...prev,
      page,
    }));
  };

  const getVisiblePages = () => {
    const pages: (number | 'ellipsis')[] = [];

    let start = Math.max(1, currentListConfig.page - Math.floor(maxVisiblePages / 2));
    let end = Math.min(currentTotalPages, start + maxVisiblePages - 1);
    if (end - start + 1 < maxVisiblePages) {
      start = Math.max(1, end - maxVisiblePages + 1);
    }

    if (start > 1) {
      pages.push(1);
      if (start > 2) {
        pages.push('ellipsis');
      }
    }

    for (let i = start; i <= end; i++) {
      pages.push(i);
    }

    if (end < currentTotalPages) {
      if (end < currentTotalPages - 1) {
        pages.push('ellipsis');
      }
      pages.push(currentTotalPages);
    }

    return pages;
  }

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
      {
        !isCourseListLoading && courseList.length > 0 && !isMyCourseLoading && (
          <div className="w-full flex items-center justify-center">
            <Pagination>
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious
                    onClick={() => handlePageChange(currentListConfig.page - 1)}
                    aria-disabled={currentListConfig.page === 1}
                  />
                </PaginationItem>
                {getVisiblePages().map((page, index) =>
                  page === 'ellipsis' ? (
                    <PaginationItem key={`e-${index}`}>
                      <PaginationEllipsis />
                    </PaginationItem>
                  )
                    : (
                      <PaginationItem key={page} >
                        <PaginationLink
                          isActive={page === currentListConfig.page}
                          onClick={() => handlePageChange(page)}
                        >
                          {page}
                        </PaginationLink>
                      </PaginationItem>
                    )
                )}
                <PaginationItem>
                  <PaginationNext
                    onClick={() => handlePageChange(currentListConfig.page + 1)}
                    aria-disabled={currentListConfig.page === currentTotalPages}
                  />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          </div>
        )
      }
    </div >

  );
};

export default CourseList;