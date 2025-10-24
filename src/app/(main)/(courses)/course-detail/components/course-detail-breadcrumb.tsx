'use client';
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { Course } from "@/types/main-flow";
import { useRouter } from "next/navigation";

type CourseDetailBreadcrumbProps = {
  course: Course;
}
const CourseDetailBreadcrumb = ({ course }: CourseDetailBreadcrumbProps) => {
  const router = useRouter();

  return (
    <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink onClick={() => router.push('/course-catalog')} className="cursor-pointer">
              Course Catalog
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>{course.title}</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
  );
};

export default CourseDetailBreadcrumb;