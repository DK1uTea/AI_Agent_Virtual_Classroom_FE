import { kyInstance } from "@/config/ky";
import { getAuthHeaders } from "@/lib/utils";
import { ApiResult } from "../responses/api-res";
import { TranscriptItem } from "@/types/main-flow";
import { LessonPlaybackRes } from "../responses/lesson-res";
import { MessageType } from "@/types/chat-types";

class LessonApis {
  public async getLessonPlayBack(req: {
    accessToken: string;
    lessonId: string;
  }): Promise<LessonPlaybackRes> {
    const reqPath = `api/lessons/${req.lessonId}/playback`;
    const res = await kyInstance.get(
      reqPath,
      { headers: getAuthHeaders(req.accessToken) }
    ).json<ApiResult<LessonPlaybackRes>>();
    return res.data;
  }

  public async getLessonTranscripts(req: {
    accessToken: string;
    lessonId: string;
  }): Promise<TranscriptItem[]> {
    const reqPath = `api/lessons/${req.lessonId}/transcripts`;
    const res = await kyInstance.get(
      reqPath,
      { headers: getAuthHeaders(req.accessToken) }
    ).json<ApiResult<TranscriptItem[]>>();
    return res.data;
  }

  public async getHistoryLessonChat(req: {
    accessToken: string;
    lessonId: string;
  }): Promise<MessageType[]> {
    const reqPath = `api/lessons/${req.lessonId}/chat`;
    const res = await kyInstance.get(
      reqPath,
      { headers: getAuthHeaders(req.accessToken) }
    ).json<ApiResult<MessageType[]>>();
    return res.data;
  }

  public async markLearnVideoCompleted(req: {
    accessToken: string;
    lessonId: string;
  }): Promise<void> {
    const reqPath = `api/lessons/${req.lessonId}/progress/video_completed`;
    await kyInstance.patch(
      reqPath,
      { headers: getAuthHeaders(req.accessToken) }
    ).json<ApiResult<void>>();
  }

  public async markLearnLessonCompleted(req: {
    accessToken: string;
    lessonId: string;
  }): Promise<void> {
    const reqPath = `api/lessons/${req.lessonId}/progress/complete`;
    await kyInstance.patch(
      reqPath,
      { headers: getAuthHeaders(req.accessToken) }
    ).json<ApiResult<void>>();
  }
}

export const lessonApis = new LessonApis();