import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

const PRIVATE = ['/dashboard', '/profile', '/course-catalog', '/course-detail', '/reports', '/my-courses', '/lesson', '/quiz'];
const AUTH = ['/', '/login', '/register'];

// function isHTMLNavigate(req: NextRequest) {
//   const isPrefetch =
//     req.headers.get('x-middleware-prefetch') === '1' ||
//     req.headers.get('purpose') === 'prefetch';

//   const isNavigate = req.headers.get('sec-fetch-mode') === 'navigate';
//   const accept = req.headers.get('accept') || '';
//   const wantsHTML = accept.includes('text/html');

//   const path = req.nextUrl.pathname;
//   const isNextInternal = path.startsWith('/_next/');

//   return !isPrefetch && isNavigate && wantsHTML && !isNextInternal;
// }

export function middleware(request: NextRequest) {
  // if (!isHTMLNavigate(request)) return NextResponse.next();F

  const { pathname } = request.nextUrl;

  const path = pathname.endsWith('/') && pathname !== '/' ? pathname.slice(0, -1) : pathname;

  const accessToken = request.cookies.get('accessToken')?.value || '';
  const isAuthed = Boolean(accessToken);

  const isPrivate =
    path !== '/' && PRIVATE.some(p => path === p || path.startsWith(`${p}/`));

  const isAuthPage =
    AUTH.some(p => path === p || path.startsWith(`${p}/`));

  if (isPrivate && !isAuthed) {
    return NextResponse.redirect(new URL('/', request.url));
  }

  if (isAuthPage && isAuthed && path !== '/dashboard') {
    return NextResponse.redirect(new URL('/dashboard', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/',
    '/login',
    '/register',
    '/dashboard',
    '/profile',
    '/course-catalog',
    '/course-catalog/:path*',
    '/course-detail',
    '/course-detail/:path*',
    '/reports',
    '/my-courses',
    '/lesson/:path*',
    '/quiz/:path*',
  ],
};
