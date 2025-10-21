export type AuthRes = {
  userId: number;
  username: string;
  email: string;
  accessToken: string;
  refreshToken: string;
}

export type RefreshRes = {
  accessToken: string;
  refreshToken: string;
}