import { lessonApis } from "@/apis/gateways/lesson-apis";
import { getErrorJson, isHTTPError } from "@/lib/exception/http-error";
import { LessonWithPlayback, SidebarLessonItem, TranscriptItem } from "@/types/main-flow";
import { useQuery } from "@tanstack/react-query";

export const useCurrentLesson = (req: {
  accessToken: string;
  lessonId: string;
  setCurrentLesson: (lesson: LessonWithPlayback | null) => void;
  setCurrentSidebarLessons: (lessons: SidebarLessonItem[]) => void;
  setCurrentTranscripts: (transcripts: TranscriptItem[]) => void;
}) => {
  return useQuery({
    queryKey: ['current-lesson'],
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

        req.setCurrentSidebarLessons(lessonPlaybackInfo.sidebarLessons);
        const { sidebarLessons, ...currentLesson } = lessonPlaybackInfo;
        req.setCurrentLesson(currentLesson);
        req.setCurrentTranscripts(lessonTranscripts);
      } catch (error) {
        console.error('Error fetching current lesson data', error);
        if (isHTTPError(error)) {
          getErrorJson(error).then((res) => {
            console.error('Error fetching current lesson details: ', res.message);
          })
        }
      }
    }
  })
}