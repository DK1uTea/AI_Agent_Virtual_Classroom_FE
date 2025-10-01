import { ApiResult } from "@/app/apis/responses/api-res";

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