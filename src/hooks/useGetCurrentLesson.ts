import { lessonApis } from "@/apis/gateways/lesson-apis";
import { LessonPlaybackRes } from "@/apis/responses/lesson-res";
import { getErrorJson, isHTTPError } from "@/lib/exception/http-error";
import { LessonWithPlayback, SidebarLessonItem, TranscriptItem } from "@/types/main-flow";
import { useQuery } from "@tanstack/react-query";

export const useGetCurrentLesson = (
  req: {
    accessToken: string;
    lessonId: string;

  },
  onSuccessExtra?: ({
    lessonPlaybackInfo,
    lessonTranscripts
  }: {
    lessonPlaybackInfo: LessonPlaybackRes;
    lessonTranscripts: TranscriptItem[];
  }) => void,
  onErrorExtra?: () => void,
) => {
  return useQuery({
    queryKey: ['current-lesson', req.lessonId],
    enabled: Boolean(req.accessToken) && Boolean(req.lessonId),
    refetchOnWindowFocus: false,
    queryFn: async () => {
      try {
        const res = await Promise.all([
          lessonApis.getLessonPlayBack({
            accessToken: req.accessToken,
            lessonId: req.lessonId,
          }),
          lessonApis.getLessonTranscripts({
            accessToken: req.accessToken,
            lessonId: req.lessonId,
          }),
        ]);
        const [lessonPlaybackInfo, lessonTranscripts] = res;
        console.log('current lesson res: ', res);

        onSuccessExtra?.({ lessonPlaybackInfo, lessonTranscripts });
        return { lessonPlaybackInfo, lessonTranscripts };
      } catch (error) {
        onErrorExtra?.();
        console.error('Error fetching current lesson data', error);
        if (isHTTPError(error)) {
          await getErrorJson(error).then((res) => {
            console.error('Error fetching current lesson details: ', res.message);
          })
        }
      }
    }
  })
}