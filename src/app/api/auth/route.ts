import { ApiResult } from "@/apis/responses/api-res";
import { cookies } from "next/headers";

export const POST = async (request: Request) => {
  const res = await request.json();
  const userData = res.user;
  const data = {
    user: userData
  }
  console.log("user receive from NextClient: ", userData);

  if (!userData) {
    const errorResponse: ApiResult<null> = {
      data: null,
      message: "User data not received!"
    };
    return Response.json(errorResponse, { status: 400 });
  }

  const successResponse: ApiResult<typeof data> = {
    data: data,
    message: "User data set successfully"
  };

  return Response.json(successResponse, {
    status: 200,
    headers: {
      'Set-Cookie': `user=${userData}; Path=/; HttpOnly; SameSite=Lax`
    }
  });
};

export const GET = async () => {
  try {
    const cookieStore = await cookies();
    const accessToken = cookieStore.get('ACCESS_TOKEN')?.value || '';
    const refreshToken = cookieStore.get('REFRESH_TOKEN')?.value || '';

    console.log('Access Token from cookie: ', accessToken);
    console.log('Refresh Token from cookie: ', refreshToken);

    const isAuth = (accessToken && refreshToken);

    const userData = cookieStore.get('user')?.value || '';
    console.log('User from cookie: ', userData);
    const data = {
      isAuth: isAuth,
      user: userData
    }
    if (!isAuth || !userData) {
      const notFoundResponse: ApiResult<null> = {
        data: null,
        message: "Authentication failed!"
      }
      return Response.json(notFoundResponse, { status: 404 });
    }
    const successResponse: ApiResult<typeof data> = {
      data: data,
      message: "Authentication successful!"
    }
    return Response.json(successResponse, { status: 200 });

  } catch {
    const errorResponse: ApiResult<null> = {
      data: null,
      message: "Error when getting auth from NextServer!"
    }
    return Response.json(errorResponse, { status: 500 });
  }
}