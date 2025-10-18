import { ApiResult } from "@/apis/responses/api-res";
import { cookies } from "next/headers";

export const POST = async (request: Request) => {
  const cookieStore = await cookies();
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

  cookieStore.set({
    name: 'user',
    value: JSON.stringify(userData),
    path: '/',
    httpOnly: true,
    sameSite: 'lax'
  });

  return Response.json(successResponse, {
    status: 200,
    // headers: {
    //   'Set-Cookie': `user=${JSON.stringify(userData)}; Path=/; HttpOnly; SameSite=Lax`
    // }
  });
};

export const GET = async () => {
  try {
    const cookieStore = await cookies();
    const userData = cookieStore.get('user')?.value || '';
    const isAuth = !!userData;
    console.log('User from cookie: ', userData);

    if (!isAuth || !userData) {
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