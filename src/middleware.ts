import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Redirect root to Spanish locale
  if (pathname === '/') {
    return NextResponse.redirect(new URL('/es', request.url));
  }

  // Handle admin routes protection
  if (pathname.includes('/admin') && !pathname.includes('/admin-login')) {
    const token = request.cookies.get('admin-token')?.value;

    if (!token || token !== 'authenticated') {
      const locale = pathname.startsWith('/es/') ? 'es' : 'en';
      const loginUrl = `/${locale}/admin-login`;
      return NextResponse.redirect(new URL(loginUrl, request.url));
    }
  }

  // Redirect old admin paths
  if (pathname.startsWith('/admin') && !pathname.startsWith('/es/admin')) {
    return NextResponse.redirect(new URL(`/es${pathname}`, request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!_next|api|favicon.ico|uploads).*)'],
};
