import { lessonApis } from "@/apis/gateways/lesson-apis";
import { getErrorJson, isHTTPError } from "@/lib/exception/http-error";
import { LessonWithPlayback, SidebarLessonItem, TranscriptItem } from "@/types/main-flow";
import { useQuery } from "@tanstack/react-query";

export const useGetCurrentLesson = (req: {
  accessToken: string;
  lessonId: string;
  setCurrentLesson: (lesson: LessonWithPlayback | null) => void;
  setCurrentSidebarLessons: (lessons: SidebarLessonItem[]) => void;
  setCurrentTranscripts: (transcripts: TranscriptItem[]) => void;
}) => {
  return useQuery({
    queryKey: ['current-lesson'],
    enabled: Boolean(req.accessToken) && Boolean(req.lessonId),
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

        req.setCurrentSidebarLessons(lessonPlaybackInfo.sidebarLessons);
        const { sidebarLessons, ...currentLesson } = lessonPlaybackInfo;
        req.setCurrentLesson(currentLesson);
        req.setCurrentTranscripts(lessonTranscripts);
        return { lessonPlaybackInfo, lessonTranscripts };
      } catch (error) {
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