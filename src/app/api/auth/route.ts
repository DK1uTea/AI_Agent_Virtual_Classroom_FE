import { ApiResult } from "@/apis/responses/api-res";
import { cookies } from "next/headers";

export const POST = async (request: Request) => {
  const data = await request.json();
  const sessionToken = data.token;
  console.log("sessionToken receive from NextClient: ", sessionToken);

  if (!sessionToken) {
    const errorResponse: ApiResult<null> = {
      data: null,
      message: "Session token not received!"
    };
    return Response.json(errorResponse, { status: 400 });
  }

  const successResponse: ApiResult<typeof data> = {
    data: data,
    message: "Session token set successfully"
  };

  return Response.json(successResponse, {
    status: 200,
    headers: {
      'Set-Cookie': `sessionToken=${sessionToken}; Path=/; HttpOnly; SameSite=Lax`
    }
  });
};

export const GET = async () => {
  try {
    const cookieStore = await cookies();
    const sessionToken = cookieStore.get('sessionToken')?.value || '';
    const data = {
      sessionToken: sessionToken
    }
    if (!sessionToken) {
      const notFoundResponse: ApiResult<null> = {
        data: null,
        message: "SessionToken not found!"
      }
      return Response.json(notFoundResponse, { status: 404 });
    }
    const successResponse: ApiResult<typeof data> = {
      data: data,
      message: "Get sessionToken successful!"
    }
    return Response.json(successResponse, { status: 200 });

  } catch {
    const errorResponse: ApiResult<null> = {
      data: null,
      message: "Error when getting sessionToken!"
    }
    return Response.json(errorResponse, { status: 500 });
  }
}