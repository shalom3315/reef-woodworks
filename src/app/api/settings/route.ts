import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase'

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const updates: Record<string, string> = body

    const supabase = createClient()

    const rows = Object.entries(updates).map(([key, value]) => ({ key, value }))

    const { error } = await supabase
      .from('site_settings')
      .upsert(rows, { onConflict: 'key' })

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json({ ok: true })
  } catch (e) {
    return NextResponse.json({ error: String(e) }, { status: 500 })
  }
}
