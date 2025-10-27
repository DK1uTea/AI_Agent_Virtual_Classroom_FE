import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";

type LessonBreadcrumbProps = {
  courseIdOrSlug: string;
  courseTitle: string;
  lessonTitle: string;
}

const LessonBreadcrumb = ({ courseIdOrSlug, courseTitle, lessonTitle }: LessonBreadcrumbProps) => {
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
            <BreadcrumbLink href={`/course-detail/${courseIdOrSlug}`} className="cursor-pointer">
              {courseTitle}
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>{lessonTitle}</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
    </div>
  );
};

export default LessonBreadcrumb;