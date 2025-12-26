import { kyInstance } from "@/config/ky";
import { AIChatReq } from "../requests/ai-req";
import { AIAnalyzeRes, AIChatRes, AIMindMapRes } from "../responses/ai-res";
import { getAuthHeaders } from "@/lib/utils";
import { ApiResult } from "../responses/api-res";

class AIApis {
  public async AIChat(req: AIChatReq): Promise<AIChatRes> {
    const reqPath = `api/agent/chat`;
    const res = await kyInstance.post<AIChatRes>(
      reqPath, {
      headers: getAuthHeaders(req.accessToken),
      json: {
        lessonId: req.lessonId,
        userMessage: req.userMessage
      }
    }
    ).json<ApiResult<AIChatRes>>();
    return res.data;
  }

  public async AIMindMap(req: {
    accessToken: string;
    lessonId: string;
  }
  ): Promise<AIMindMapRes> {
    const reqPath = `api/agent/mindmap/${req.lessonId}`;
    const res = await kyInstance.get<AIMindMapRes>(
      reqPath,
      {
        headers: getAuthHeaders(req.accessToken),
      }
    ).json<ApiResult<AIMindMapRes>>();
    return res.data;
  }

  public async AIAnalyze(req: {
    accessToken: string;
    lessonId: string;
  }): Promise<AIAnalyzeRes> {
    const reqPath = `api/agent/analyzer/${req.lessonId}`;
    const res = await kyInstance.get<AIAnalyzeRes>(
      reqPath,
      {
        headers: getAuthHeaders(req.accessToken),
      }
    ).json<ApiResult<AIAnalyzeRes>>();
    return res.data;
  }
}

export const aiApis = new AIApis();