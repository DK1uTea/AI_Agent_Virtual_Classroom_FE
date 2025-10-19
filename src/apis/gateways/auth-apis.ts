
import { LoginReq, LogoutNextServerReq, RegisterReq } from "../requests/auth-req";
import { LoginRes, RegisterRes } from "../responses/auth-res";
import { ApiResult } from "../responses/api-res";
import { kyInstance, kyLocalInstance } from "@/config/ky";
import { User } from "@/types/user-types";

class AuthApis {
  public async register(req: RegisterReq): Promise<RegisterRes> {
    const reqPath = `api/v1/auth/signup`;
    const res = await kyInstance.post<RegisterReq>(reqPath, {
      json: req,
    }).json<ApiResult<RegisterRes>>();
    return res.data;
  }

  public async login(req: LoginReq): Promise<LoginRes> {
    const reqPath = `api/v1/auth/login`;
    const res = await kyInstance.post<LoginReq>(reqPath, {
      json: req,
    }).json<ApiResult<LoginRes>>();
    return res.data;
  }

  public async refresh(): Promise<void> {
    const reqPath = `api/v1/auth/refresh`;
    await kyInstance.post(reqPath);
  }

  public async logout(): Promise<void> {
    const reqPath = `api/v1/auth/logout`;
    await kyInstance.post(reqPath);
  }

  public async requestNextServerSetUserDataToCookies(req: {
    user: User
  }): Promise<{
    user: User
  }> {
    const reqPath = '/api/auth';
    const res = await kyLocalInstance.post(reqPath, {
      json: req,
    }).json<ApiResult<{
      user: User
    }>>();
    return res.data;
  }

  public async getAuthFromNextServer(): Promise<{
    isAuth: boolean;
    user: User
  }> {
    const reqPath = '/api/auth';
    const res = await kyLocalInstance.get(reqPath).json<ApiResult<{
      isAuth: boolean;
      user: User
    }>>();
    return res.data;
  }

  public async reqLogoutNextServer(req: LogoutNextServerReq) {
    const reqPath = '/api/auth/logout';
    await kyLocalInstance.post(reqPath, {
      json: { forced: req.forced }
    })
  }
}

export const authApis = new AuthApis();