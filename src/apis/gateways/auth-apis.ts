
import { LoginReq, LogoutNextServerReq, RegisterReq } from "../requests/auth-req";
import { AuthRes } from "../responses/auth-res";
import { ApiResult } from "../responses/api-res";
import { kyInstance, kyLocalInstance } from "@/config/ky";
import { User } from "@/types/user-types";

class AuthApis {
  public async register(req: RegisterReq): Promise<AuthRes> {
    const reqPath = `api/v1/auth/signup`;
    const res = await kyInstance.post<RegisterReq>(reqPath, {
      json: req,
    }).json<ApiResult<AuthRes>>();
    return res.data;
  }

  public async login(req: LoginReq): Promise<AuthRes> {
    const reqPath = `api/v1/auth/login`;
    const res = await kyInstance.post<LoginReq>(reqPath, {
      json: req,
    }).json<ApiResult<AuthRes>>();
    return res.data;
  }

  public async refresh(req: {
    token: string;
  }): Promise<{
    accessToken: string;
    refreshToken: string;
  }> {
    const reqPath = `api/v1/auth/refresh`;
    const res = await kyInstance.post(reqPath).json<ApiResult<{
      accessToken: string;
      refreshToken: string;
    }>>();
    return res.data;
  }

  public async logout(req: {
    accessToken: string;
    refreshToken: string;
  }): Promise<void> {
    const reqPath = `api/v1/auth/logout`;
    await kyInstance.post(reqPath, {
      headers: {
        Authorization: `Bearer ${req.accessToken}`,
      },
      json: {
        token: req.refreshToken
      }
    });
  }

  public async reqSetAuthNextServer(req: {
    user: User;
    accessToken: string;
    refreshToken: string;
  }): Promise<void> {
    const reqPath = '/api/auth';
    await kyLocalInstance.post(reqPath, {
      json: req,
    });
  }

  public async getAuthFromNextServer(): Promise<{
    isAuth: boolean;
    user: User;
    accessToken: string;
    refreshToken: string;
  }> {
    const reqPath = '/api/auth';
    const res = await kyLocalInstance.get(reqPath).json<ApiResult<{
      isAuth: boolean;
      user: User;
      accessToken: string;
      refreshToken: string;
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