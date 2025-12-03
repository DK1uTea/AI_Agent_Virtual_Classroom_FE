'use client'

import { authApis } from "@/apis/gateways/auth-apis";
import { useAuthStore } from "@/stores/auth-store";
import { useEffect, useState } from "react";
import { useShallow } from "zustand/shallow";
import dayjs from "dayjs";
import { decodeJwt, forcedSignOut } from "@/lib/utils";
import { decode } from "punycode";
import { access } from "fs";
import Loading from "./ui/loading";

const REFRESH_INTERVAL_MINUTES = 5
const REFRESH_THRESHOLD_MINUTES = 5

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [isInitializing, setIsInitializing] = useState(true);

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
      } finally {
        setIsInitializing(false);
      }
    } else {
      setIsInitializing(false);
    }
  };

  useEffect(() => {
    fetchAuth();
  }, []);

  useEffect(() => {

    if (!accessToken) return;

    const interval = setInterval(async () => {
      const now = dayjs();

      const decodedAccessToken = decodeJwt(accessToken);

      if (decodedAccessToken && decodedAccessToken.exp) {
        const expiresAt = dayjs.unix(decodedAccessToken.exp);
        const minutesToExpire = expiresAt.diff(now, 'minute');
        console.log(`Access token expires in ${minutesToExpire} minutes`);

        if (minutesToExpire <= REFRESH_THRESHOLD_MINUTES) {
          try {
            const res = await authApis.refreshNextServer();
            console.log("Token refreshed successfully in AuthProvider!");
            setAuthState(true, user, res.accessToken, res.refreshToken);
          } catch (error) {
            console.error("Error refreshing token in AuthProvider: ", error);
            forcedSignOut();
            setAuthState(false, {
              userId: null,
              username: '',
              email: ''
            }, '', '');
          }
        }

      }

    }, 1000 * 60 * REFRESH_INTERVAL_MINUTES);

    return () => clearInterval(interval);
  }, [accessToken]);

  if (isInitializing) {
    return <Loading />;
  }

  return <>
    {children}
  </>;
}
