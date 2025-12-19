import { lessonApis } from "@/apis/gateways/lesson-apis";
import { getErrorJson, isHTTPError } from "@/lib/exception/http-error";
import { Answer, Quiz, QuizResult } from "@/types/main-flow";
import { useMutation, useQuery } from "@tanstack/react-query";
import { toast } from "sonner";

export const useGetQuizOfLesson = (
  req: {
    accessToken: string,
    lessonId: string
  },
  onSuccessExtra?: (res: Quiz) => void,
  onErrorExtra?: (error: Error) => void
) => {
  return useQuery({
    queryKey: ['quiz-of-lesson', req.lessonId],
    queryFn: async () => {
      try {
        const res = await lessonApis.getQuizOfLesson({
          accessToken: req.accessToken,
          lessonId: req.lessonId
        });
        onSuccessExtra?.(res);
        return res;
      } catch (error) {
        onErrorExtra?.(error as Error);
        console.error('Get Quiz Of Lesson Error: ', error);
        if (isHTTPError(error)) {
          getErrorJson(error).then((res) => {
            toast.error(res.message || 'An error occurred while fetching the quiz data.');
          })
        }
      }
    },
    enabled: !!req.accessToken && !!req.lessonId,
    refetchOnWindowFocus: false,
  })
}

export const useSubmitQuizAnswers = (
  onSuccessExtra?: (res: QuizResult) => void,
  onErrorExtra?: (error: Error) => void
) => {
  return useMutation({
    mutationFn: async (data: {
      accessToken: string;
      lessonId: string;
      answers: Answer[];
    }) => {
      const res = await lessonApis.submitQuizAnswers({
        accessToken: data.accessToken,
        lessonId: data.lessonId,
        answers: data.answers
      });
      return res;
    },
    onSuccess: (res) => {
      console.log('Submit Quiz Answers Response: ', res);
      onSuccessExtra?.(res);
    },
    onError: (error) => {
      onErrorExtra?.(error);
      console.error('Submit Quiz Answers Error: ', error);
      if (isHTTPError(error)) {
        getErrorJson(error).then((res) => {
          toast.error(res.message || 'An error occurred while submitting the quiz answers.');
        })
      }
    }
  })
}

export const useGetQuizAttemptHistory = (
  req: {
    accessToken: string,
    lessonId: string
  },
  onSuccessExtra?: (res: QuizResult[]) => void,
  onErrorExtra?: (error: Error) => void
) => {
  return useQuery({
    queryKey: ['quiz-attempt-history', req.lessonId],
    queryFn: async () => {
      try {
        const res = await lessonApis.getQuizAttemptHistory({
          accessToken: req.accessToken,
          lessonId: req.lessonId
        });
        onSuccessExtra?.(res);
        return res;
      } catch (error) {
        onErrorExtra?.(error as Error);
        console.error('Get Quiz Attempt History Error: ', error);
        if (isHTTPError(error)) {
          getErrorJson(error).then((res) => {
            toast.error(res.message || 'An error occurred while fetching the quiz attempt history.');
          })
        }
      }
    },
    enabled: !!req.accessToken && !!req.lessonId,
    refetchOnWindowFocus: false,
  })
}