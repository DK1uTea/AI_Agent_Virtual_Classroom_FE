import { authApis } from "@/apis/gateways/auth-apis";
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const refreshToken = async () => {
  try {
    await authApis.refresh();
    console.log("Token refreshed successfully!");
  } catch (error) {
    console.error("Error refreshing token: ", error);
    forcedSignOut();
  }
}

export const forcedSignOut = async () => {
  try {
    await authApis.reqLogoutNextServer({ forced: true });
    console.log("Forced sign out successfully!");
  } catch (error) {
    console.error("Error during forced sign out: ", error);
  }
}
