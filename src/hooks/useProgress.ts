import { lessonApis } from "@/apis/gateways/lesson-apis";
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { on } from "events";

export const useMarkLearnVideoCompleted = (
  onSuccessExtra?: () => void,
  onErrorExtra?: (error: Error) => void
) => {
  return useMutation({
    mutationKey: ['mark-learn-video-completed'],
    mutationFn: async (req: {
      accessToken: string;
      lessonId: string;
    }) => {
      await lessonApis.markLearnVideoCompleted(req);
    },
    onSuccess: () => {
      onSuccessExtra?.();
    },
    onError: (error: Error) => {
      onErrorExtra?.(error);
      console.error('Error marking video as completed:', error);
    }
  })
}

export const useMarkLearnLessonCompleted = (
  onSuccessExtra?: () => void,
  onErrorExtra?: (error: Error) => void
) => {
  return useMutation({
    mutationKey: ['mark-learn-lesson-completed'],
    mutationFn: async (req: {
      accessToken: string;
      lessonId: string;
    }) => {
      await lessonApis.markLearnLessonCompleted(req);
    },
    onSuccess: () => {
      onSuccessExtra?.();
    },
    onError: (error: Error) => {
      onErrorExtra?.(error);
      console.error('Error marking lesson as completed:', error);
    }
  })
}

export const useSaveVideoProgress = (
  onSuccessExtra?: () => void,
  onErrorExtra?: (error: Error) => void
) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ['save-video-progress'],
    mutationFn: async (req: {
      accessToken: string;
      lessonId: string;
      currentTime: number;
    }) => {
      await lessonApis.saveVideoProgress(req);
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['current-lesson', variables.lessonId] });
      onSuccessExtra?.();
    },
    onError: (error: Error) => {
      onErrorExtra?.(error);
      console.error('Error saving video progress:', error);
    }
  })
}