import { authApis } from "@/apis/gateways/auth-apis";
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const refreshToken = async () => {
  try {
    // await authApis.refresh();
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

export const getServerAuthHeaders = async () => {
  const { cookies } = await import('next/headers');
  const cookieStore = await cookies();
  const sessionToken = cookieStore.get('sessionToken')?.value;

  return {
    'Authorization': `Bearer ${sessionToken}`
  };
}

export const getClientAuthHeaders = (token: string) => {
  return {
    'Authorization': `Bearer ${token}`
  };
}