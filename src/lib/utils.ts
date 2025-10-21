import { authApis } from "@/apis/gateways/auth-apis";
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const refreshToken = async () => {
  try {
    const res = await authApis.refreshNextServer();
    console.log("Token refreshed successfully!");
    return res;
  } catch (error) {
    forcedSignOut();
    console.error("Error refreshing token: ", error);
  }
}

export const forcedSignOut = async () => {
  try {
    await authApis.logoutNextServer({ forced: true });
    console.log("Forced sign out successfully!");
  } catch (error) {
    console.error("Error during forced sign out: ", error);
  }
}

export const getAuthHeaders = (accessToken: string) => {
  return {
    'Authorization': `Bearer ${accessToken}`
  };
}