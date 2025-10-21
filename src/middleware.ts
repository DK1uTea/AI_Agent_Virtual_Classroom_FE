import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

const privatePaths = ['/dashboard', '/profile'];
const authPaths = ['/', '/login', '/register'];

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const user = request.cookies.get('user')?.value || '';
  const accessToken = request.cookies.get('accessToken')?.value || '';
  const refreshToken = request.cookies.get('refreshToken')?.value || '';

  const isAuthed = Boolean(user && accessToken && refreshToken);

  const isPrivatePath =
    pathname !== '/' &&
    privatePaths.some(p => pathname === p || pathname.startsWith(`${p}/`));

  const isAuthPath =
    pathname === '/' ||
    ['/login', '/register'].some(p => pathname === p || pathname.startsWith(`${p}/`));

  if (isPrivatePath && !isAuthed) {
    if (pathname !== '/') {
      return NextResponse.redirect(new URL('/', request.url));
    }
  }

  if (isAuthPath && isAuthed) {
    if (pathname !== '/dashboard') {
      return NextResponse.redirect(new URL('/dashboard', request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [...privatePaths, ...authPaths],
};
