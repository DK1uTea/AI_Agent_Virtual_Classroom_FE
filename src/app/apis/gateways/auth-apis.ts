import kyInstance from "@/config/ky";
import { RegisterReq } from "../requests/auth-req";
import { RegisterRes } from "../responses/auth-res";
import envConfig from "@/config/config";
import { ApiResult } from "../responses/api-res";

class AuthApis {
  public async register(req: RegisterReq): Promise<RegisterRes> {
    const reqPath = `${envConfig.NEXT_PUBLIC_API_ENDPOINT}/auth/register`;
    const res = await kyInstance.post<RegisterReq>(reqPath, {
      json: req,
    }).json<ApiResult<RegisterRes>>();
    return res.data;
  }
}

export const authApis = new AuthApis();