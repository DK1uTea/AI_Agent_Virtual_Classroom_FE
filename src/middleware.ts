import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

const privatePaths = ['/', '/me'];
const authPaths = ['/login', '/register'];

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const user = request.cookies.get('user')?.value || '';

  console.log('User from in middleware: ', user);

  const isPrivatePath = pathname === '/' || privatePaths.some(path => path !== '/' && pathname.startsWith(path));

  if (isPrivatePath && !user) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  if (authPaths.some(path => pathname.startsWith(path)) && user) {
    return NextResponse.redirect(new URL('/', request.url));
  }

  return NextResponse.next();
}


export const config = {
  matcher: [...privatePaths, ...authPaths],
}