'use client'

import { useAuthStore } from "@/stores/auth-store";
import { Button } from "./button";
import { useShallow } from "zustand/shallow";
import { useMutation } from "@tanstack/react-query";
import { LogoutNextServerReq } from "@/apis/requests/auth-req";
import { authApis } from "@/apis/gateways/auth-apis";
import { useRouter } from "next/navigation";
import { getErrorJson, isHTTPError } from "@/lib/exception/http-error";
import { toast } from "sonner";
import { cn } from "@/lib/utils";


const LogoutButton = () => {

  const router = useRouter();

  const { sessionToken, clearSessionToken } = useAuthStore
    (useShallow((state) => ({
      sessionToken: state.sessionToken,
      clearSessionToken: state.clearSessionToken,
    })))

  const logoutMutation = useMutation({
    mutationFn: (req: LogoutNextServerReq) => authApis.reqLogoutNextServer(req),
    onSuccess: () => {
      clearSessionToken();
      router.refresh();
      router.push('/login');
      toast.success("Logout successful!");
    },
    onError: (error) => {
      if (isHTTPError(error)) {
        getErrorJson(error).then((res) => {
          console.error('Logout error: ', error);
          toast.error(res.message);
        })
      }
    }
  });

  const onClickLogout = async () => {
    logoutMutation.mutate({ sessionToken });
    console.log("Logout ne!!!");
  }

  return (
    <Button
      className={cn('hover:cursor-pointer')}
      variant="destructive"
      onClick={onClickLogout}>
      Logout
    </Button>
  );
}

export default LogoutButton;