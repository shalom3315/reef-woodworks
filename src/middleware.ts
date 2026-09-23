import { NextRequest, NextResponse } from 'next/server'

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://placeholder.supabase.co'
const SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'placeholder'

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl

  // Only guard /admin routes (except the login page itself)
  if (!pathname.startsWith('/admin') || pathname === '/admin/login') {
    return NextResponse.next()
  }

  const token = req.cookies.get('admin_token')?.value
  if (!token) {
    return NextResponse.redirect(new URL('/admin/login', req.url))
  }

  // Presence alone isn't enough — verify the cookie is still a live, valid Supabase session.
  // Without this, an expired/revoked or forged cookie value would still pass the gate.
  // Any failure (invalid token or a network/Supabase error) fails closed to the login page
  // rather than crashing the request or letting an unverified cookie through.
  try {
    const res = await fetch(`${SUPABASE_URL}/auth/v1/user`, {
      headers: { apikey: SUPABASE_ANON_KEY, Authorization: `Bearer ${token}` },
      cache: 'no-store',
    })
    if (!res.ok) {
      const redirect = NextResponse.redirect(new URL('/admin/login', req.url))
      redirect.cookies.set('admin_token', '', { path: '/', maxAge: 0 })
      return redirect
    }
  } catch {
    return NextResponse.redirect(new URL('/admin/login', req.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/admin/:path*'],
}
