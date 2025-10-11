import { LoginRes, RegisterRes } from "../responses/auth-res";

export type RegisterReq = {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export type LoginReq = {
  email: string;
  password: string;
}

export type NextServerSetCookiesReq = LoginRes & RegisterRes

export type LogoutNextServerReq = {
  sessionToken: string;
  forced?: boolean;
}