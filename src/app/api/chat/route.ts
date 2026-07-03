import Anthropic from '@anthropic-ai/sdk'
import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase'
import { buildBotPrompt, parseBotSettings } from '@/lib/buildBotPrompt'

const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY })

// In-memory IP rate limiter: 20 requests per minute per IP
const rl = new Map<string, { count: number; resetAt: number }>()
const RL_WINDOW = 60_000
const RL_MAX = 20

function isLimited(ip: string): boolean {
  const now = Date.now()
  const entry = rl.get(ip)
  if (!entry || now > entry.resetAt) {
    rl.set(ip, { count: 1, resetAt: now + RL_WINDOW })
    return false
  }
  if (entry.count >= RL_MAX) return true
  entry.count++
  return false
}

// Cache bot settings for 60 seconds to avoid a DB hit on every chat message
let settingsCache: { data: Record<string, string>; expiresAt: number } | null = null

async function getBotSettings(): Promise<Record<string, string>> {
  const now = Date.now()
  if (settingsCache && now < settingsCache.expiresAt) return settingsCache.data

  try {
    const { data } = await createClient()
      .from('site_settings')
      .select('key, value')
      .like('key', 'bot_%')

    const map: Record<string, string> = {}
    ;(data || []).forEach((r: { key: string; value: string }) => { map[r.key] = r.value })
    settingsCache = { data: map, expiresAt: now + 60_000 }
    return map
  } catch {
    // On DB error, return empty so buildBotPrompt falls back to defaults
    return {}
  }
}

export async function POST(req: NextRequest) {
  const ip =
    req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ||
    req.headers.get('x-real-ip') ||
    'unknown'

  if (isLimited(ip)) {
    return NextResponse.json(
      { error: 'יותר מדי הודעות. נסה שוב בעוד דקה.' },
      { status: 429, headers: { 'Retry-After': '60' } }
    )
  }

  try {
    const { messages } = await req.json()

    const raw = await getBotSettings()
    const system = buildBotPrompt(parseBotSettings(raw))

    const response = await client.messages.create({
      model: 'claude-haiku-4-5-20251001',
      max_tokens: 500,
      system,
      messages,
    })

    const text = response.content[0].type === 'text' ? response.content[0].text : ''
    return NextResponse.json({ text })
  } catch (e) {
    return NextResponse.json({ error: String(e) }, { status: 500 })
  }
}