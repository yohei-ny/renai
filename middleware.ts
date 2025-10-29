import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // 管理画面へのアクセスをチェック
  if (pathname.startsWith('/admin')) {
    // ログインページとAPIは除外
    if (pathname === '/admin/login' || pathname.startsWith('/api/admin/auth')) {
      return NextResponse.next();
    }

    // IPアドレス制限をチェック
    const allowedIPs = process.env.ADMIN_ALLOWED_IPS?.split(',') || [];
    const clientIP = request.headers.get('x-forwarded-for')?.split(',')[0] ||
                     request.headers.get('x-real-ip') ||
                     'unknown';

    if (allowedIPs.length > 0 && !allowedIPs.includes(clientIP.trim())) {
      console.log(`Blocked IP: ${clientIP}`);
      return NextResponse.json(
        { error: 'Access denied' },
        { status: 403 }
      );
    }

    // セッションCookieをチェック
    const session = request.cookies.get('admin_session');

    if (!session || session.value !== 'authenticated') {
      // 未認証の場合はログインページにリダイレクト
      const url = request.nextUrl.clone();
      url.pathname = '/admin/login';
      return NextResponse.redirect(url);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: '/admin/:path*',
};
