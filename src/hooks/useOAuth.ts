import { authApis } from "@/apis/gateways/auth-apis";
import { AuthRes } from "@/apis/responses/auth-res"
import { getErrorJson, isHTTPError } from "@/lib/exception/http-error";
import { useMutation } from "@tanstack/react-query"
import { toast } from "sonner";

export const useOAuth = (
  onSuccessExtra?: (data: AuthRes) => void,
  onErrorExtra?: (error: Error) => void

) => {
  return useMutation({
    mutationFn: async (req: {
      code: string;
    }) => {
      const res = await authApis.OAuthLogin({
        code: req.code
      });
      return res;
    },
    onSuccess: (data) => {
      onSuccessExtra?.(data);
    },
    onError: (error) => {
      onErrorExtra?.(error);
      console.error('OAuth login error: ', error);
      if (isHTTPError(error)) {
        getErrorJson(error).then((errJson) => {
          toast.error(errJson.message || 'OAuth login failed.');
        });
      }
    }
  })
}