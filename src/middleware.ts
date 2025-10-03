import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

const privatePaths = ['/', '/me'];
const authPaths = ['/login', '/register'];

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const sessionToken = request.cookies.get('sessionToken')?.value;

  const isPrivatePath = pathname === '/' || privatePaths.some(path => path !== '/' && pathname.startsWith(path));

  if (isPrivatePath && !sessionToken) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  if (authPaths.some(path => pathname.startsWith(path)) && sessionToken) {
    return NextResponse.redirect(new URL('/me', request.url));
  }

  return NextResponse.next();
}


export const config = {
  matcher: [...privatePaths, ...authPaths],
}