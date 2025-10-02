import { clsx, type ClassValue } from "clsx"
import { cookies } from "next/headers";
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const forceSignOut = () => {
  console.log("forceSignOut");
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

export const getCookieValue = (name: string): string => {
  if (typeof document === 'undefined') return '';
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop()?.split(';').shift() || '';
  return '';
};