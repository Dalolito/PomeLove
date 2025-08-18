import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  console.log('🚀 MIDDLEWARE FUNCIONANDO!', request.nextUrl.pathname)
  
  // Por ahora solo redirigir / a /es/
  if (request.nextUrl.pathname === '/') {
    console.log('🔄 Redirigiendo a /es/')
    return NextResponse.redirect(new URL('/es/', request.url))
  }
  
  return NextResponse.next()
}

// Configuración más simple
export const config = {
  matcher: ['/', '/((?!_next).*)',],
}