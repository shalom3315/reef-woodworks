import { NextRequest, NextResponse } from 'next/server'
import { createAuthClient } from '@/lib/supabase'

// Only snake_case identifiers — no SQL injection or arbitrary key names
const VALID_KEY = /^[a-z][a-z0-9_]{0,63}$/

export async function POST(req: NextRequest) {
  try {
    const authHeader = req.headers.get('Authorization') ?? ''
    const token = authHeader.replace(/^Bearer\s+/i, '')
    if (!token) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

    const supabase = createAuthClient(token)
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

    const body = await req.json()
    const updates: Record<string, string> = body

    // Whitelist: only accept valid snake_case keys with string values
    const rows = Object.entries(updates)
      .filter(([key, val]) => VALID_KEY.test(key) && typeof val === 'string')
      .map(([key, value]) => ({ key, value }))

    if (rows.length === 0) return NextResponse.json({ ok: true })

    const { error } = await supabase.rpc('upsert_site_settings', { settings: rows })
    if (error) return NextResponse.json({ error: error.message }, { status: 500 })

    return NextResponse.json({ ok: true })
  } catch (e) {
    return NextResponse.json({ error: String(e) }, { status: 500 })
  }
}
