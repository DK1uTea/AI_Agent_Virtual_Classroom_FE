'use client'

import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { useCourseStore } from "@/stores/course-store";
import { useLessonStore } from "@/stores/lesson-store";
import { useRouter } from "next/navigation";
import { useMemo } from "react";
import { useShallow } from "zustand/shallow";

type QuizBreadcrumbProps = {
  text: string;
  courseId: string;
  courseTitle: string;
  lessonId: string;
  lessonTitle: string;
}

const QuizBreadcrumb = ({ text, courseId, courseTitle, lessonId, lessonTitle }: QuizBreadcrumbProps) => {

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
          <BreadcrumbLink href={`/course-detail/${courseId}`} className="cursor-pointer">
            {courseTitle}
          </BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbLink href={`/lesson/${courseId}/${lessonId}`} className="cursor-pointer">
            {lessonTitle}
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