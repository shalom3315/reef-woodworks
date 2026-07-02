import { createClient as createSupabaseClient, type SupabaseClient } from '@supabase/supabase-js'

export function createClient(): SupabaseClient {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL ?? ''
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? ''
  return createSupabaseClient(
    url || 'https://placeholder.supabase.co',
    key || 'placeholder',
    {
      global: {
        fetch: (input, init) =>
          fetch(input, { ...init, cache: 'no-store' }),
      },
    }
  )
}
