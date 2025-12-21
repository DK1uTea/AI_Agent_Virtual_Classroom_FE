import { dashboardAPIs } from "@/apis/gateways/dashboard-apis";
import { DashboardRes } from "@/apis/responses/dashboard-res";
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