import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { STORAGE_KEYS, ROUTES } from '@/constants';

// ============================================================
// Proxy — Route protection & auth guards (Next.js 16+)
// ============================================================

const publicRoutes = [ROUTES.LOGIN, ROUTES.REGISTER, '/forgot-password'];
const authRoutes = [ROUTES.LOGIN, ROUTES.REGISTER];

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Read auth token from cookies (set by server-side auth)
  const token = request.cookies.get(STORAGE_KEYS.AUTH_TOKEN)?.value;
  const isAuthenticated = Boolean(token);

  const isPublicRoute = publicRoutes.some((route) => pathname.startsWith(route));
  const isAuthRoute = authRoutes.some((route) => pathname.startsWith(route));

  // Redirect authenticated users away from auth pages
  if (isAuthenticated && isAuthRoute) {
    return NextResponse.redirect(new URL(ROUTES.DASHBOARD, request.url));
  }

  // Redirect unauthenticated users to login
  if (!isAuthenticated && !isPublicRoute) {
    const loginUrl = new URL(ROUTES.LOGIN, request.url);
    loginUrl.searchParams.set('callbackUrl', pathname);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  // Matcher: apply middleware to all routes except static files and API routes
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|public|api/health).*)',
  ],
};
