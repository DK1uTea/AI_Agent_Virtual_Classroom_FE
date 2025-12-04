import { ApiResult } from "@/apis/responses/api-res";
import { cookies } from "next/headers";
import { buildCorsHeaders } from "@/lib/cors";

export const OPTIONS = async (request: Request) => {
  return new Response(null, { status: 204, headers: buildCorsHeaders(request) });
};

export const POST = async (request: Request) => {
  const cookieStore = await cookies();
  const res = await request.json();
  const userData = res.user;
  const accessToken = res.accessToken;
  const refreshToken = res.refreshToken;
  const data = {
    user: userData,
    accessToken: accessToken,
    refreshToken: refreshToken
  }
  console.log('Data received from Next Client', data);

  if (!userData || !accessToken || !refreshToken) {
    const errorResponse: ApiResult<null> = {
      data: null,
      message: "Invalid data provided"
    };
    return Response.json(errorResponse, { status: 400 });
  }

  const successResponse: ApiResult<typeof data> = {
    data: data,
    message: "Auth data set successfully"
  };

  console.log('Success response to be set in cookies: ', successResponse);

  cookieStore.set({
    name: 'user',
    value: JSON.stringify(userData),
    path: '/',
    httpOnly: true,
    sameSite: 'lax'
  });

  cookieStore.set({
    name: 'accessToken',
    value: accessToken,
    path: '/',
    httpOnly: true,
    sameSite: 'lax'
  });

  cookieStore.set({
    name: 'refreshToken',
    value: refreshToken,
    path: '/',
    httpOnly: true,
    sameSite: 'lax'
  });

  return Response.json(successResponse, {
    status: 200,
  });
};

export const GET = async () => {
  try {
    const cookieStore = await cookies();
    const userData = cookieStore.get('user')?.value || '';
    const accessToken = cookieStore.get('accessToken')?.value || '';
    const refreshToken = cookieStore.get('refreshToken')?.value || '';
    const isAuth = !!(userData && accessToken && refreshToken);

    if (!isAuth || !userData || !accessToken || !refreshToken) {
      const notFoundResponse: ApiResult<null> = {
        data: null,
        message: "Authentication failed!"
      }
      return Response.json(notFoundResponse, { status: 404 });
    }
    let parsedUser;
    try {
      parsedUser = JSON.parse(userData);
    } catch (e) {
      const errorResponse: ApiResult<null> = {
        data: null,
        message: "Invalid user cookie data"
      }
      return Response.json(errorResponse, { status: 400 });
    }

    const data = {
      isAuth: isAuth,
      user: parsedUser,
      accessToken: accessToken,
      refreshToken: refreshToken
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