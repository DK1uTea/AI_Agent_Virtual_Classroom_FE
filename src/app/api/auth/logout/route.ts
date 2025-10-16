import { authApis } from "@/apis/gateways/auth-apis";
import { ApiResult } from "@/apis/responses/api-res";
import { cookies } from "next/headers";

export const POST = async (request: Request) => {
  try {
    const cookieStore = await cookies();
    const data = await request.json();
    const forced = data.forced;
    if (forced) {
      const successResponse = {
        message: "Logout successful!"
      };
      cookieStore.set('ACCESS_TOKEN', '', {
        path: '/',
        httpOnly: true,
        sameSite: 'lax',
        maxAge: 0,
      })

      cookieStore.set('REFRESH_TOKEN', '', {
        path: '/',
        httpOnly: true,
        sameSite: 'lax',
        maxAge: 0,
      })

      cookieStore.set('user', '', {
        path: '/',
        httpOnly: true,
        sameSite: 'lax',
        maxAge: 0,
      })

      cookieStore.set('logoutType', 'forced', {
        path: '/',
        httpOnly: true,
        sameSite: 'lax',
        maxAge: 10,
      })

      return Response.json(successResponse, {
        status: 200,
      })

    } else {
      try {
        await authApis.logout();
        const successResponse = {
          message: "Logout successful!"
        };
        cookieStore.set('user', '', {
          path: '/',
          httpOnly: true,
          sameSite: 'lax',
          maxAge: 0,
        })

        cookieStore.set('logoutType', 'normal', {
          path: '/',
          httpOnly: true,
          sameSite: 'lax',
          maxAge: 10,
        })

        return Response.json(successResponse, {
          status: 200,
        });
      } catch (error) {
        console.error('Logout error:', error);

        const errorResponse: ApiResult<null> = {
          data: null,
          message: "Internal server error during logout!"
        };
        return Response.json(errorResponse, { status: 500 });
      }
    }


  } catch (error) {
    console.error('Logout error:', error);

    const errorResponse: ApiResult<null> = {
      data: null,
      message: "Internal server error during logout!"
    };
    return Response.json(errorResponse, { status: 500 });
  }
};