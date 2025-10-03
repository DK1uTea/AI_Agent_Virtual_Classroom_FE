export type RegisterRes = {
  token: string;
  expiresAt: string;
  account: {
    id: number;
    name: string;
    email: string;
  }
}

export type LoginRes = {
  token: string;
  expiresAt: string;
  account: {
    id: number;
    name: string;
    email: string;
  }
}

export type SessionTokenRes = {
  sessionToken: string;
}