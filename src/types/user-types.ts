export type User = {
  userId: number | null;
  username: string;
  email: string;
  phone?: string;
  gender?: "male" | "female";
  description?: string;
  linkedAccounts?: Record<string, boolean>;
}