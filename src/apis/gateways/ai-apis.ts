import { kyInstance } from "@/config/ky";
import { AIChatReq } from "../requests/ai-req";
import { AIChatRes } from "../responses/ai-res";
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
}

export const aiApis = new AIApis();