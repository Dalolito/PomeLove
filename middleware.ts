import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

function i18nMiddleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname

  if (pathname.startsWith('/es/') || pathname === '/es') {
    return null
  }

  if (pathname === '/') {
    return NextResponse.redirect(new URL('/es/', request.url))
  }

  return NextResponse.redirect(new URL(`/es${pathname}`, request.url))
}

function securityMiddleware(request: NextRequest) {
  const response = NextResponse.next()
  
  response.headers.set('X-Frame-Options', 'DENY')
  response.headers.set('X-Content-Type-Options', 'nosniff')
  
  return response
}

export function middleware(request: NextRequest) {
  const i18nResult = i18nMiddleware(request)
  if (i18nResult) return i18nResult
  
  return securityMiddleware(request)
}

export const config = {
  matcher: ['/((?!_next|favicon.ico|.*\\.).*)',],
}