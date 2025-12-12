import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const accessToken = request.cookies.get('accessToken');
  const refreshToken = request.cookies.get('refreshToken');

  // API Routes 제외
  if (pathname.startsWith('/api')) {
    return NextResponse.next();
  }

  const isPublicPage =
    pathname.startsWith('/login') || pathname.startsWith('/signup');

  // 갱신 시도
  if (!accessToken && refreshToken) {
    try {
      const baseUrl = request.nextUrl.origin;
      const refreshResponse = await fetch(`${baseUrl}/api/auth/refresh`, {
        method: 'POST',
        headers: {
          Cookie: request.headers.get('cookie') || '',
        },
      });

      if (refreshResponse.ok) {
        const response = NextResponse.next();
        const setCookieHeaders = refreshResponse.headers.getSetCookie();
        setCookieHeaders.forEach((cookie) => {
          response.headers.append('set-cookie', cookie);
        });
        response.headers.set('isLoggedIn', 'true');
        return response;
      }
    } catch {
      // 리프레시 실패
    }
  }

  if (isPublicPage) {
    const response = NextResponse.next();
    response.headers.set('isLoggedIn', accessToken ? 'true' : 'false');
    return response;
  }

  // accessToken 없으면 로그인 페이지로 리다이렉트
  if (!accessToken) {
    const response = NextResponse.redirect(new URL('/login', request.url));
    response.cookies.delete('accessToken');
    response.cookies.delete('refreshToken');
    return response;
  }

  // 로그인된 사용자는 통과
  const response = NextResponse.next();
  response.headers.set('isLoggedIn', 'true');
  return response;
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};
