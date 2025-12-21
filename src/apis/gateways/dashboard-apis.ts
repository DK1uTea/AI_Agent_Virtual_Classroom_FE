import { kyInstance } from "@/config/ky";
import { DashboardRes } from "../responses/dashboard-res";
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

}

export const dashboardAPIs = new DashboardAPIs();