import { aiApis } from "@/apis/gateways/ai-apis";
import { AIChatReq } from "@/apis/requests/ai-req";
import { AIChatRes, AIMindMapRes } from "@/apis/responses/ai-res";
import { getErrorJson, isHTTPError } from "@/lib/exception/http-error";
import { useMutation, useQuery } from "@tanstack/react-query";
import { toast } from "sonner";

export const useAIChat = (
  onSuccessExtra?: (res: AIChatRes) => void,
  onErrorExtra?: (error: Error) => void
) => {
  return useMutation({
    mutationFn: async (data: AIChatReq) => {
      const res = await aiApis.AIChat(data);
      return res;
    },
    onSuccess: (res) => {
      console.log('AI Chat Response: ', res);
      onSuccessExtra?.(res);
    },
    onError: (error) => {
      onErrorExtra?.(error);
      console.error('AI Chat Error: ', error);
      if (isHTTPError(error)) {
        getErrorJson(error).then((res) => {
          toast.error(res.message || 'An error occurred while processing your request.');
        })
      }
    },
  });
}

export const useAIMindMap = (
  req: {
    accessToken: string,
    lessonId: string
  },
  onSuccessExtra?: (res: AIMindMapRes) => void,
  onErrorExtra?: (error: Error) => void
) => {
  return useQuery({
    queryKey: ['ai-mind-map', req.lessonId],
    queryFn: async () => {
      try {
        const res = await aiApis.AIMindMap({
          accessToken: req.accessToken,
          lessonId: req.lessonId
        });
        onSuccessExtra?.(res);
        return res;
      } catch (error) {
        onErrorExtra?.(error as Error);
        console.error('AI Mind Map Error: ', error);
        if (isHTTPError(error)) {
          getErrorJson(error).then((res) => {
            toast.error(res.message || 'An error occurred while generating the mind map.');
          })
        }
        throw error;
      }
    },
    enabled: !!req.accessToken && !!req.lessonId,
    refetchOnWindowFocus: false,
  })
}