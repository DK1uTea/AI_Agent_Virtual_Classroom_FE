'use client'

import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { useCourseStore } from "@/stores/course-store";
import { useLessonStore } from "@/stores/lesson-store";
import { useRouter } from "next/navigation";
import { useMemo } from "react";
import { useShallow } from "zustand/shallow";

type QuizBreadcrumbProps = {
  text: string;
}

const QuizBreadcrumb = ({ text }: QuizBreadcrumbProps) => {

  const {
    currentCourseId,
    myCourses
  } = useCourseStore(useShallow((state) => ({
    currentCourseId: state.currentCourseId,
    myCourses: state.myCourses
  })))

  const {
    currentLesson
  } = useLessonStore(useShallow((state) => ({
    currentLesson: state.currentLesson,
  })))

  const courseTitle = useMemo(() => {
    const course = myCourses.find((course) => String(course.id) === String(currentCourseId));
    return course ? course.title : "Unknown Course";
  }, [currentCourseId, myCourses])

  return (
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink href="/course-catalog" className="cursor-pointer">
            Course Catalog
          </BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbLink href={`/course-detail/${currentCourseId}`} className="cursor-pointer">
            {courseTitle}
          </BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbLink href={`/course-detail/${currentCourseId}/lesson/${currentLesson?.id}`} className="cursor-pointer">
            {currentLesson?.title}
          </BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbPage>{text}</BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  );
};

export default QuizBreadcrumb;