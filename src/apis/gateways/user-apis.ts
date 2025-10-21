import { kyInstance } from "@/config/ky";


import { ApiResult } from "../responses/api-res";
import { User } from "@/types/user-types";
import { headers } from "next/headers";
import { get } from "http";
import { getAuthHeaders } from "@/lib/utils";

class UserApis {
  public async getUserProfile(req: {
    accessToken: string;
  }): Promise<User> {
    const reqPath = 'api/v1/me';
    const res = await kyInstance.get(
      reqPath,
      { headers: getAuthHeaders(req.accessToken) }
    ).json<ApiResult<User>>();
    return res.data;
  }

  public async updateUserProfile(req: {
    accessToken: string;
    data: Partial<User>;
  }): Promise<User> {
    const reqPath = 'api/v1/me';
    const res = await kyInstance.patch(reqPath, {
      headers: getAuthHeaders(req.accessToken),
      json: req.data
    }).json<ApiResult<User>>();
    return res.data;
  }
}

export const userApis = new UserApis();