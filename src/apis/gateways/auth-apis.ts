
import { LoginReq, LogoutNextServerReq, RegisterReq } from "../requests/auth-req";
import { AuthRes, RefreshRes } from "../responses/auth-res";
import { ApiResult } from "../responses/api-res";
import { kyInstance, kyLocalInstance } from "@/config/ky";
import { User } from "@/types/user-types";
import { getAuthHeaders } from "@/lib/utils";

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
    accessToken: string;
    refreshToken: string;
  }): Promise<RefreshRes> {
    const reqPath = `api/v1/auth/refresh`;
    const res = await kyInstance.post(reqPath, {
      headers: getAuthHeaders(req.accessToken),
      json: {
        token: req.refreshToken
      }
    }).json<ApiResult<RefreshRes>>();
    return res.data;
  }

  public async refreshNextServer(): Promise<RefreshRes> {
    const reqPath = 'api/auth/refresh';
    const res = await kyLocalInstance.post(reqPath).json<ApiResult<RefreshRes>>();
    return res.data;
  }

  public async logout(req: {
    accessToken: string;
    refreshToken: string;
  }): Promise<void> {
    const reqPath = `api/v1/auth/logout`;
    await kyInstance.post(reqPath, {
      headers: getAuthHeaders(req.accessToken),
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
    const reqPath = 'api/auth';
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
    const reqPath = 'api/auth';
    const res = await kyLocalInstance.get(reqPath).json<ApiResult<{
      isAuth: boolean;
      user: User;
      accessToken: string;
      refreshToken: string;
    }>>();
    return res.data;
  }

  public async logoutNextServer(req: LogoutNextServerReq) {
    const reqPath = 'api/auth/logout';
    await kyLocalInstance.post(reqPath, {
      json: { forced: req.forced }
    })
  }

  public async forgotPassword(req: { email: string }): Promise<void> {
    const reqPath = 'api/v1/auth/forgot-password';
    await kyInstance.post(reqPath, {
      json: req
    })
  }

  public async resetPassword(req: { newPassword: string, token: string }): Promise<void> {
    const reqPath = 'api/v1/auth/reset-password';
    await kyInstance.post(reqPath, {
      json: req
    })
  }
}

export const authApis = new AuthApis();