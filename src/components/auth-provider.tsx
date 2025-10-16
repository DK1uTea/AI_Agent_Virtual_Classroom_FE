'use client'

import { authApis } from "@/apis/gateways/auth-apis";
import { useAuthStore } from "@/stores/auth-store";
import { useEffect } from "react";
import { useShallow } from "zustand/shallow";

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const {
    isAuth,
    user,
    setIsAuth,
    setUser
  } = useAuthStore(useShallow((state) => ({
    isAuth: state.isAuth,
    user: state.user,
    setIsAuth: state.setIsAuth,
    setUser: state.setUser,
  })));

  const fetchAuth = async () => {
    if (!isAuth || !user) {
      try {
        const res = await authApis.getAuthFromNextServer();
        console.log('Get auth from NextServer: ', res);
        setIsAuth(res.isAuth);
        setUser(res.user);
      } catch (error) {
        console.error('Error fetching auth from NextServer: ', error);
      }
    }
  };

  useEffect(() => {
    fetchAuth();
  }, [isAuth, user]);

  return <>
    {children}
  </>;
}