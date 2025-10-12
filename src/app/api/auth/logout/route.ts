import { authApis } from "@/apis/gateways/auth-apis";
import { ApiResult } from "@/apis/responses/api-res";
import { cookies } from "next/headers";

export const POST = async (request: Request) => {
  try {
    const cookieStore = await cookies();
    const sessionToken = cookieStore.get('sessionToken');

    const authHeader = request.headers.get('authorization');
    if (!authHeader) {
      const unauthorizedResponse: ApiResult<null> = {
        data: null,
        message: "Authorization header missing!"
      };
      return Response.json(unauthorizedResponse, { status: 401 });
    }

    const clientSessionToken = authHeader.split(' ')[1];

    if (!sessionToken) {
      const notFoundResponse: ApiResult<null> = {
        data: null,
        message: "Session token not found!"
      };
      return Response.json(notFoundResponse, { status: 404 });
    }

    if (!clientSessionToken || clientSessionToken !== sessionToken?.value) {
      const unauthorizedResponse: ApiResult<null> = {
        data: null,
        message: "Invalid session token!"
      };
      return Response.json(unauthorizedResponse, { status: 401 });
    }

    const data = await request.json();
    const forced = data.forced;
    if (forced) {
      const successResponse = {
        message: "Logout successful!"
      };
      cookieStore.set('sessionToken', '', {
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
        cookieStore.set('sessionToken', '', {
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