'use client'

import { authApis } from "@/apis/gateways/auth-apis";
import { kyLocalInstance } from "@/config/ky";
import { getCookieValue } from "@/lib/utils";
import { useAuthStore } from "@/stores/auth-store";
import { useEffect } from "react";
import { useShallow } from "zustand/shallow";

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const { sessionToken, setSessionToken } = useAuthStore(useShallow((state) => ({
    sessionToken: state.sessionToken,
    setSessionToken: state.setSessionToken,
  })));

  const fetchSessionToken = async () => {
    if (!sessionToken) {
      const res = await authApis.getSessionTokenFromNextServer();
      console.log(`Test token: ${res.sessionToken}`);
      setSessionToken(res.sessionToken);
    }
  };

  useEffect(() => {
    fetchSessionToken();
  }, [sessionToken]);

  return <>
    {children}
  </>;
}