
import { LoginReq, RegisterReq, SessionTokenRes } from "../requests/auth-req";
import { LoginRes, RegisterRes } from "../responses/auth-res";
import { ApiResult } from "../responses/api-res";
import { kyInstance, kyLocalInstance } from "@/config/ky";

class AuthApis {
  public async register(req: RegisterReq): Promise<RegisterRes> {
    const reqPath = `auth/register`;
    const res = await kyInstance.post<RegisterReq>(reqPath, {
      json: req,
    }).json<ApiResult<RegisterRes>>();
    return res.data;
  }

  public async login(req: LoginReq): Promise<LoginRes> {
    const reqPath = `auth/login`;
    const res = await kyInstance.post<LoginReq>(reqPath, {
      json: req,
    }).json<ApiResult<LoginRes>>();
    return res.data;
  }

  public async requestNextServerSetCookies(req: LoginRes | RegisterRes): Promise<LoginRes | RegisterRes> {
    const reqPath = '/api/auth';
    const res = await kyLocalInstance.post(reqPath, {
      json: req,
    }).json<ApiResult<LoginRes | RegisterRes>>();
    return res.data;
  }

  public async getSessionTokenFromNextServer(): Promise<SessionTokenRes> {
    const reqPath = '/api/auth';
    const res = await kyLocalInstance.get<SessionTokenRes>(reqPath).json<ApiResult<SessionTokenRes>>();
    return res.data;
  }
}

export const authApis = new AuthApis();