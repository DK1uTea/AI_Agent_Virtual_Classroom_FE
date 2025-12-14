import { lessonApis } from "@/apis/gateways/lesson-apis";
import { getErrorJson, isHTTPError } from "@/lib/exception/http-error";
import { MessageType } from "@/types/chat-types";
import { useQuery } from "@tanstack/react-query";

export const useGetHistoryLessonChat = (
  req: {
    accessToken: string;
    lessonId: string;
  },
  onSuccessExtra?: (data: MessageType[]) => void,
  onErrorExtra?: () => void,
) => {
  return useQuery({
    queryKey: ['history-lesson-chat', req.lessonId],
    enabled: Boolean(req.accessToken) && Boolean(req.lessonId),
    refetchOnWindowFocus: false,
    queryFn: async () => {
      try {
        const res = await lessonApis.getHistoryLessonChat({
          accessToken: req.accessToken,
          lessonId: req.lessonId,
        });
        console.log('history lesson chat res: ', res);

        onSuccessExtra?.(res);
        return res;
      } catch (error) {
        onErrorExtra?.();
        console.error('Error fetching history lesson chat data', error);
        if (isHTTPError(error)) {
          await getErrorJson(error).then((res) => {
            console.error('Error fetching history lesson chat details: ', res.message);
          })
        }
      }
    }
  })
}