export interface RegisterRes {
  token: string;
  expiresAt: string;
  account: {
    id: number;
    name: string;
    email: string;
  }
}

export interface LoginRes {
  token: string;
  expiresAt: string;
  account: {
    id: number;
    name: string;
    email: string;
  }
}