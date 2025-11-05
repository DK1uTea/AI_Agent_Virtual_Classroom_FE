import { kyInstance } from "@/config/ky";
import { CourseListRes } from "../responses/course-res";
import { getAuthHeaders } from "@/lib/utils";
import { ApiResult } from "../responses/api-res";
import { Course } from "@/types/main-flow";

class CourseApis {
  public async listCourse(req: {
    accessToken: string;
    page?: number;
    limit?: number;
    title?: string;
    category?: string;
    level?: string;
    sort?: string;
    sortBy?: string;
  }): Promise<CourseListRes> {
    const reqPath = `api/courses`;
    const params: Record<string, any> = {
      page: req.page || 1,
      limit: req.limit || 10,
    };
    if (req.title) params.title = req.title;
    if (req.category) params.category = req.category;
    if (req.level) params.level = req.level;
    if (req.sort) params.sort = req.sort;
    if (req.sortBy) params.sortBy = req.sortBy;

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
}

export const courseApis = new CourseApis();