import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { useCourseStore } from "@/stores/course-store";
import { useLessonStore } from "@/stores/lesson-store";
import { useMemo } from "react";
import { useShallow } from "zustand/shallow";

const LessonBreadcrumb = () => {

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
    <div className="border-b p-4">
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
            <BreadcrumbPage>{currentLesson?.title}</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
    </div>
  );
};

export default LessonBreadcrumb;