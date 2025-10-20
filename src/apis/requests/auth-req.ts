export type RegisterReq = {
  username: string;
  email: string;
  password: string;
}

export type LoginReq = {
  username: string;
  password: string;
}

export type LogoutNextServerReq = {
  forced?: boolean;
}