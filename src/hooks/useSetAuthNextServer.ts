import { authApis } from "@/apis/gateways/auth-apis";
import { getErrorJson, isHTTPError } from "@/lib/exception/http-error";
import { User } from "@/types/user-types";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

export const useSetAuthNextServerMutation = () => {
  return useMutation({
    mutationFn: (data: { user: User, accessToken: string, refreshToken: string }) => authApis.reqSetAuthNextServer(data),
    onSuccess: (res) => {
      console.log('Set user data to cookies success: ', res);
    },
    onError: (error) => {
      if (isHTTPError(error)) {
        getErrorJson(error).then((res) => {
          console.error('Error set user data to cookies: ', error);
          toast.error(res.message);
        })
      }
    }
  });
}