import { Course } from "@/types/main-flow";

export type CourseListRes = {
  items: Course[];
  total: number;
  page: number;
  limit: number;
}