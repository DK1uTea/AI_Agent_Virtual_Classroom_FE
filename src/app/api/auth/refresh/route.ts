import { authApis } from "@/apis/gateways/auth-apis";
import { ApiResult } from "@/apis/responses/api-res";
import { kyInstance } from "@/config/ky";
import { cookies } from "next/headers";

export const POST = async () => {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("accessToken")?.value;
  const refreshToken = cookieStore.get("refreshToken")?.value;

  if (!accessToken || !refreshToken) {
    const errorResponse: ApiResult<null> = {
      data: null,
      message: "No tokens found"
    };
    return Response.json(errorResponse, { status: 401 });
  }

  const req = {
    accessToken,
    refreshToken
  };

  try {
    const res = await authApis.refresh(req);
    cookieStore.set({
      name: "accessToken",
      value: res.accessToken,
    });
    cookieStore.set({
      name: "refreshToken",
      value: res.refreshToken,
    });
    const data = {
      accessToken: res.accessToken,
      refreshToken: res.refreshToken
    };
    const successResponse: ApiResult<typeof data> = {
      data: data,
      message: "Tokens retrieved successfully"
    };
    return Response.json(successResponse);

  } catch (error) {
    const errorResponse: ApiResult<null> = {
      data: null,
      message: "Error refreshing tokens"
    };
    return Response.json(errorResponse, { status: 500 });
  }
}