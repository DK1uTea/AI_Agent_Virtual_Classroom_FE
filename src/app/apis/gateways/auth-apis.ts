import kyInstance from "@/config/ky";
import { LoginReq, RegisterReq } from "../requests/auth-req";
import { LoginRes, RegisterRes } from "../responses/auth-res";
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

  public async login(req: LoginReq): Promise<LoginRes> {
    const reqPath = `${envConfig.NEXT_PUBLIC_API_ENDPOINT}/auth/login`;
    const res = await kyInstance.post<LoginReq>(reqPath, {
      json: req,
    }).json<ApiResult<LoginRes>>();
    return res.data;
  }
}

export const authApis = new AuthApis();