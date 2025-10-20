'use client'

import { authApis } from "@/apis/gateways/auth-apis";
import { useAuthStore } from "@/stores/auth-store";
import { useEffect } from "react";
import { useShallow } from "zustand/shallow";

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const {
    isAuth,
    user,
    accessToken,
    refreshToken,
    setAuthState
  } = useAuthStore(useShallow((state) => ({
    isAuth: state.isAuth,
    user: state.user,
    accessToken: state.accessToken,
    refreshToken: state.refreshToken,
    setAuthState: state.setAuthState
  })));

  const fetchAuth = async () => {
    if (!isAuth || !user || !accessToken || !refreshToken) {
      try {
        const res = await authApis.getAuthFromNextServer();
        console.log('Get auth from NextServer: ', res);
        setAuthState(res.isAuth,
          {
            userId: res.user.userId,
            username: res.user.username,
            email: res.user.email
          },
          res.accessToken,
          res.refreshToken
        );
      } catch (error) {
        console.error('Error fetching auth from NextServer: ', error);
      }
    }
  };

  useEffect(() => {
    fetchAuth();
  }, []);

  return <>
    {children}
  </>;
}
