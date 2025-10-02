export interface RegisterReq {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export interface LoginReq {
  email: string;
  password: string;
}

export interface SessionTokenRes {
  sessionToken: string;
}