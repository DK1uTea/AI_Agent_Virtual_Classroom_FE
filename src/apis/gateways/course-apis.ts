import { kyInstance } from "@/config/ky";
import { CourseListRes } from "../responses/course-res";
import { getAuthHeaders } from "@/lib/utils";
import { ApiResult } from "../responses/api-res";
import { Course, SortOrder } from "@/types/main-flow";
import { headers } from "next/headers";

class CourseApis {
  public async listCourse(req: {
    accessToken: string;
    page?: number;
    limit?: number;
    title?: string;
    category?: string;
    level?: string;
    sortOrder?: SortOrder;
  }): Promise<CourseListRes> {
    const reqPath = `api/courses`;
    const params: Record<string, any> = {
      page: req.page || 1,
      limit: req.limit || 10,
    };
    if (req.title) params.title = req.title;
    if (req.category) params.category = req.category;
    if (req.level) params.level = req.level;
    if (req.sortOrder) params.sortOrder = req.sortOrder;

    const res = await kyInstance.get(
      reqPath,
      {
        headers: getAuthHeaders(req.accessToken),
        searchParams: params,
      }
    ).json<ApiResult<CourseListRes>>();
    return res.data;
  }

  public async courseDetail(req: {
    accessToken: string;
    id: string;
  }): Promise<Course> {
    const reqPath = `api/courses/${req.id}/details`;
    const res = await kyInstance.get(
      reqPath,
      { headers: getAuthHeaders(req.accessToken) }
    ).json<ApiResult<Course>>();
    return res.data;
  }

  public async myEnrolledCourses(req: {
    accessToken: string;
  }): Promise<Course[]> {
    const reqPath = `api/courses/me/enrollments`;
    const res = await kyInstance.get(reqPath, {
      headers: getAuthHeaders(req.accessToken)
    }).json<ApiResult<Course[]>>();
    return res.data;
  }

  public async enrollCourse(req: {
    accessToken: string;
    courseId: string;
  }): Promise<Course> {
    const reqPath = `api/courses/${req.courseId}/enroll`;
    const res = await kyInstance.post(
      reqPath,
      {
        headers: getAuthHeaders(req.accessToken)
      }
    ).json<ApiResult<Course>>();
    return res.data;
  }

  public async cancelEnrollCourse(req: {
    accessToken: string;
    courseId: string;
  }): Promise<void> {
    const reqPath = `api/courses/${req.courseId}/cancel-enrollment`;
    await kyInstance.post(
      reqPath,
      {
        headers: getAuthHeaders(req.accessToken)
      }
    ).json<ApiResult<void>>();
  }
}

export const courseApis = new CourseApis();