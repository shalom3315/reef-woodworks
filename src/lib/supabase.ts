import { createClient as createSupabaseClient, type SupabaseClient } from '@supabase/supabase-js'

const URL = () => process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://placeholder.supabase.co'
const KEY = () => process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'placeholder'

export function createClient(): SupabaseClient {
  return createSupabaseClient(URL(), KEY(), {
    global: { fetch: (input, init) => fetch(input, { ...init, cache: 'no-store' }) },
    realtime: { enabled: false } as never,
    db: { schema: 'public' },
  })
}

export function createAuthClient(accessToken: string): SupabaseClient {
  return createSupabaseClient(URL(), KEY(), {
    global: {
      headers: { Authorization: `Bearer ${accessToken}` },
      fetch: (input, init) => fetch(input, { ...init, cache: 'no-store' }),
    },
    auth: { persistSession: false },
    db: { schema: 'public' },
  })
}
