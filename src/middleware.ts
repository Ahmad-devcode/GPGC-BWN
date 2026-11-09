// src/middleware.ts
// Protects /admin/* and /portal/* (except their login pages): refreshes the
// Supabase session and redirects signed-out visitors to the matching login
// page. Role checks happen in the pages themselves. When Supabase is not
// configured yet, both areas simply redirect to their login pages.
import { createServerClient, type CookieOptions } from '@supabase/ssr';
import { NextResponse, type NextRequest } from 'next/server';

type CookieToSet = { name: string; value: string; options: CookieOptions };

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // The login pages themselves must stay reachable.
  if (pathname === '/admin/login' || pathname === '/portal/login') {
    return NextResponse.next();
  }

  const loginPath = pathname.startsWith('/portal')
    ? '/portal/login'
    : '/admin/login';

  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !anonKey) {
    const loginUrl = request.nextUrl.clone();
    loginUrl.pathname = loginPath;
    return NextResponse.redirect(loginUrl);
  }

  let response = NextResponse.next({ request });

  const supabase = createServerClient(url, anonKey, {
    cookies: {
      getAll() {
        return request.cookies.getAll();
      },
      setAll(cookiesToSet: CookieToSet[]) {
        cookiesToSet.forEach(({ name, value }) =>
          request.cookies.set(name, value),
        );
        response = NextResponse.next({ request });
        cookiesToSet.forEach(({ name, value, options }) =>
          response.cookies.set(name, value, options),
        );
      },
    },
  });

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    const loginUrl = request.nextUrl.clone();
    loginUrl.pathname = loginPath;
    loginUrl.searchParams.set('next', pathname);
    return NextResponse.redirect(loginUrl);
  }

  return response;
}

export const config = {
  matcher: ['/admin/:path*', '/portal/:path*'],
};
