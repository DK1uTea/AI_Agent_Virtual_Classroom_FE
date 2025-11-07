'use client'

import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { useRouter } from "next/navigation";

type QuizBreadcrumbProps = {
  courseIdOrSlug: string;
  courseTitle: string;
  lessonId: string;
  lessonTitle: string;
  text: string;
}

const QuizBreadcrumb = ({ courseIdOrSlug, courseTitle, lessonId, lessonTitle, text }: QuizBreadcrumbProps) => {

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
          <BreadcrumbLink href={`/course-detail/${courseIdOrSlug}`} className="cursor-pointer">
            {courseTitle}
          </BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbLink href={`/course-detail/${courseIdOrSlug}/lesson/${lessonId}`} className="cursor-pointer">
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