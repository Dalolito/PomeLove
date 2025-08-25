import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { auth } from '@/lib/auth/auth';

export default auth((req) => {
  const { pathname } = req.nextUrl;

  if (pathname === '/') {
    return NextResponse.redirect(new URL('/es', req.url));
  }

  if (pathname.startsWith('/admin') && !pathname.startsWith('/es/admin')) {
    return NextResponse.redirect(new URL(`/es${pathname}`, req.url));
  }

  const isAdminRoute = pathname.includes('/admin') && !pathname.includes('/admin/login');
  const isAuthenticated = !!req.auth;

  if (isAdminRoute && !isAuthenticated) {
    const loginUrl = new URL('/es/admin/login', req.url);
    loginUrl.searchParams.set('callbackUrl', pathname);
    return NextResponse.redirect(loginUrl);
  }

  if (pathname.includes('/admin/login') && isAuthenticated) {
    return NextResponse.redirect(new URL('/es/admin/puppys', req.url));
  }

  return NextResponse.next();
});

export const config = {
  matcher: ['/((?!_next|api|favicon.ico|uploads).*)'],
};
