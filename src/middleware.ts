import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

const privatePaths = ['/me'];
const authPaths = ['/', '/login', '/register'];

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const user = request.cookies.get('user')?.value || '';

  console.log('User from in middleware: ', user);

  const isPrivatePath = privatePaths.some(path => pathname.startsWith(path));

  const isAuthPath = pathname === '/' || authPaths.some(path => pathname !== '/' && pathname.startsWith(path));

  if (isPrivatePath && !user) {
    return NextResponse.redirect(new URL('/', request.url));
  }

  if (isAuthPath && user) {
    return NextResponse.redirect(new URL('/dashboard', request.url));
  }

  return NextResponse.next();
}


export const config = {
  matcher: [...privatePaths, ...authPaths],
}