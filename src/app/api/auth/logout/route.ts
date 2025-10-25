import { authApis } from "@/apis/gateways/auth-apis";
import { ApiResult } from "@/apis/responses/api-res";
import { buildCorsHeaders } from "@/lib/cors";
import { cookies } from "next/headers";

export const OPTIONS = async (request: Request) => {
  return new Response(null, { status: 204, headers: buildCorsHeaders(request) });
};

export const POST = async (request: Request) => {
  try {
    const cookieStore = await cookies();
    const refreshToken = cookieStore.get('refreshToken')?.value;
    const accessToken = cookieStore.get('accessToken')?.value;
    const data = await request.json();
    const forced = data.forced;
    if (forced) {
      const successResponse = {
        message: "Logout successful!"
      };

      cookieStore.set('user', '', {
        path: '/',
        httpOnly: true,
        sameSite: 'lax',
        maxAge: 0,
      })

      cookieStore.set('accessToken', '', {
        path: '/',
        httpOnly: true,
        sameSite: 'lax',
        maxAge: 0,
      })

      cookieStore.set('refreshToken', '', {
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
        await authApis.logout({ accessToken: accessToken || '', refreshToken: refreshToken || '' });
        const successResponse = {
          message: "Logout successful!"
        };
        cookieStore.set('user', '', {
          path: '/',
          httpOnly: true,
          sameSite: 'lax',
          maxAge: 0,
        })

        cookieStore.set('accessToken', '', {
          path: '/',
          httpOnly: true,
          sameSite: 'lax',
          maxAge: 0,
        })

        cookieStore.set('refreshToken', '', {
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
        console.error('Logout Spring error:', error);

        const errorResponse: ApiResult<null> = {
          data: null,
          message: "Internal server error during logout!"
        };
        return Response.json(errorResponse, { status: 500 });
      }
    }


  } catch (error) {
    console.error('Logout Next error:', error);

    const errorResponse: ApiResult<null> = {
      data: null,
      message: "Internal server error during logout!"
    };
    return Response.json(errorResponse, { status: 500 });
  }
};