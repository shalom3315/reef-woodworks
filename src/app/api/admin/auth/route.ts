import { NextRequest, NextResponse } from 'next/server'
import { createAuthClient } from '@/lib/supabase'

const COOKIE = 'admin_token'
const COOKIE_OPTS = {
  httpOnly: true,
  secure: process.env.NODE_ENV === 'production',
  sameSite: 'strict' as const,
  path: '/',
  maxAge: 60 * 60 * 24 * 7, // 7 days
}

// Called after successful Supabase login — stores the JWT in an HTTP-only cookie
export async function POST(req: NextRequest) {
  const { token } = await req.json()
  if (!token) return NextResponse.json({ error: 'Missing token' }, { status: 400 })

  // Verify the token is real before storing it
  const supabase = createAuthClient(token)
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return NextResponse.json({ error: 'Invalid token' }, { status: 401 })

  const res = NextResponse.json({ ok: true })
  res.cookies.set(COOKIE, token, COOKIE_OPTS)
  return res
}

// Called on logout — clears the cookie
export async function DELETE() {
  const res = NextResponse.json({ ok: true })
  res.cookies.set(COOKIE, '', { ...COOKIE_OPTS, maxAge: 0 })
  return res
}
