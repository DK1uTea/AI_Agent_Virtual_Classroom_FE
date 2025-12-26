import { kyInstance } from "@/config/ky";
import { DashboardRes, ReportActivityRes, ReportCourseRes, ReportOverviewRes, ReportProgressRes } from "../responses/dashboard-res";
import { get } from "http";
import { getAuthHeaders } from "@/lib/utils";
import { ApiResult } from "../responses/api-res";

class DashboardAPIs {
  public async getDashboardData(req: {
    accessToken: string;
  }): Promise<DashboardRes> {
    const reqPath = `api/dashboard`;
    const res = await kyInstance.get<DashboardRes>(
      reqPath,
      {
        headers: getAuthHeaders(req.accessToken),
      }
    ).json<ApiResult<DashboardRes>>();
    return res.data;
  }

  public async getReportProgress(req: {
    accessToken: string;
    period?: string;
  }): Promise<ReportProgressRes> {
    const reqPath = `api/dashboard/reports/progress`;
    const params: Record<string, any> = {
      period: req.period || 'all',
    };
    const res = await kyInstance.get<ReportProgressRes>(
      reqPath,
      {
        headers: getAuthHeaders(req.accessToken),
        searchParams: params,
      }
    ).json<ApiResult<ReportProgressRes>>();
    return res.data;
  }

  public async getReportOverview(req: {
    accessToken: string;
    period?: string;
  }): Promise<ReportOverviewRes> {
    const reqPath = `api/dashboard/reports/overview`;
    const params: Record<string, any> = {
      period: req.period || 'all',
    };
    const res = await kyInstance.get<ReportOverviewRes>(
      reqPath,
      {
        headers: getAuthHeaders(req.accessToken),
        searchParams: params,
      }
    ).json<ApiResult<ReportOverviewRes>>();
    return res.data;
  }

  public async getReportActivity(req: {
    accessToken: string;
    page?: number;
    limit?: number;
  }): Promise<ReportActivityRes> {
    const reqPath = `api/dashboard/reports/activities`;
    const params: Record<string, any> = {
      page: req.page || 1,
      limit: req.limit || 10,
    };
    const res = await kyInstance.get<ReportActivityRes>(
      reqPath,
      {
        headers: getAuthHeaders(req.accessToken),
        searchParams: params,
      }
    ).json<ApiResult<ReportActivityRes>>();
    return res.data;
  }

  public async getReportCourse(req: {
    accessToken: string;
  }): Promise<ReportCourseRes> {
    const reqPath = `api/dashboard/reports/courses`;
    const res = await kyInstance.get<ReportCourseRes>(
      reqPath,
      {
        headers: getAuthHeaders(req.accessToken),
      }
    ).json<ApiResult<ReportCourseRes>>();
    return res.data;
  }

}

export const dashboardAPIs = new DashboardAPIs();