import { dashboardAPIs } from "@/apis/gateways/dashboard-apis";
import { DashboardRes, ReportActivityRes, ReportCourseRes, ReportOverviewRes, ReportProgressRes } from "@/apis/responses/dashboard-res";
import { getErrorJson, isHTTPError } from "@/lib/exception/http-error";
import { useQuery } from "@tanstack/react-query";
import { on } from "events";
import { get } from "http";
import { toast } from "sonner";

export const useGetDashboard = (
  req: {
    accessToken: string;
  },
  onSuccessExtra?: (data: DashboardRes) => void,
  onErrorExtra?: (error: Error) => void
) => {
  return useQuery({
    queryKey: ['dashboard-data'],
    enabled: !!req.accessToken,
    refetchOnWindowFocus: false,
    queryFn: async () => {
      try {
        const res = await dashboardAPIs.getDashboardData(req);
        onSuccessExtra?.(res);
        return res;
      } catch (error) {
        onErrorExtra?.(error as Error);
        console.error('Error fetching dashboard data:', error);
        if (isHTTPError(error)) {
          getErrorJson(error).then((res) => {
            toast.error(res.message || 'An error occurred while fetching dashboard data.');
          })
        }
        throw error;
      }
    }
  })
}

export const useReportProgress = (
  req: {
    accessToken: string;
    period?: string;
  },
  onSuccessExtra?: (data: ReportProgressRes) => void,
  onErrorExtra?: (error: Error) => void
) => {
  return useQuery({
    queryKey: ['dashboard-report-progress', req.period],
    enabled: !!req.accessToken,
    refetchOnWindowFocus: false,
    queryFn: async () => {
      try {
        const res = await dashboardAPIs.getReportProgress(req);
        onSuccessExtra?.(res);
        return res;
      } catch (error) {
        onErrorExtra?.(error as Error);
        console.error('Error fetching dashboard report progress:', error);
        if (isHTTPError(error)) {
          getErrorJson(error).then((res) => {
            toast.error(res.message || 'An error occurred while fetching dashboard report progress.');
          })
        }
        throw error;
      }
    }
  })
}

export const useGetReportOverview = (
  req: {
    accessToken: string;
    period?: string;
  },
  onSuccessExtra?: (data: ReportOverviewRes) => void,
  onErrorExtra?: (error: Error) => void
) => {
  return useQuery({
    queryKey: ['dashboard-report-overview', req.period],
    enabled: !!req.accessToken,
    refetchOnWindowFocus: false,
    queryFn: async () => {
      try {
        const res = await dashboardAPIs.getReportOverview(req);
        onSuccessExtra?.(res);
        return res;
      } catch (error) {
        onErrorExtra?.(error as Error);
        console.error('Error fetching dashboard report overview:', error);
        if (isHTTPError(error)) {
          getErrorJson(error).then((res) => {
            toast.error(res.message || 'An error occurred while fetching dashboard report overview.');
          })
        }
        throw error;
      }
    }
  })
}

export const useGetReportActivity = (
  req: {
    accessToken: string;
    page?: number;
    limit?: number;
  },
  onSuccessExtra?: (data: ReportActivityRes) => void,
  onErrorExtra?: (error: Error) => void
) => {
  return useQuery({
    queryKey: ['dashboard-report-activity', req.page, req.limit],
    enabled: !!req.accessToken,
    refetchOnWindowFocus: false,
    queryFn: async () => {
      try {
        const res = await dashboardAPIs.getReportActivity(req);
        onSuccessExtra?.(res);
        return res;
      } catch (error) {
        onErrorExtra?.(error as Error);
        console.error('Error fetching dashboard report activity:', error);
        if (isHTTPError(error)) {
          getErrorJson(error).then((res) => {
            toast.error(res.message || 'An error occurred while fetching dashboard report activity.');
          })
        }
        throw error;
      }
    }
  })
}

export const useGetReportCourse = (
  req: {
    accessToken: string;
  },
  onSuccessExtra?: (data: ReportCourseRes) => void,
  onErrorExtra?: (error: Error) => void
) => {
  return useQuery({
    queryKey: ['dashboard-report-course'],
    queryFn: async () => {
      try {
        const res = await dashboardAPIs.getReportCourse(req);
        onSuccessExtra?.(res);
        return res;
      } catch (error) {
        onErrorExtra?.(error as Error);
        console.error('Error fetching dashboard report course:', error);
        if (isHTTPError(error)) {
          getErrorJson(error).then((res) => {
            toast.error(res.message || 'An error occurred while fetching dashboard report course.');
          })
        }
        throw error;
      }
    }
  })
}
