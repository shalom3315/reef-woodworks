// Copies the videos and logo from Supabase Storage into public/media so Vercel
// serves them as static files (cached, Range-capable) instead of Supabase.
// /media/* falls back to Supabase via vercel.json for anything not mirrored yet,
// so run this after uploading new videos in the admin, then commit and push.
//   node --env-file=.env.local scripts/mirror-media.mjs
import { mkdir, writeFile, access } from 'node:fs/promises'
import { dirname } from 'node:path'

const url = process.env.NEXT_PUBLIC_SUPABASE_URL
const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
const prefix = `${url}/storage/v1/object/public/`
const headers = { apikey: key, Authorization: `Bearer ${key}` }

async function rows(table, select) {
  const res = await fetch(`${url}/rest/v1/${table}?select=${select}`, { headers })
  if (!res.ok) throw new Error(`${table}: ${res.status} ${await res.text()}`)
  return res.json()
}

const videos = await rows('videos', 'video_url')
const settings = await rows('site_settings', '*')
const candidates = [
  ...videos.map((v) => v.video_url),
  ...settings.flatMap((s) => Object.values(s)),
].filter((u) => typeof u === 'string' && u.startsWith(prefix) && /\.(mp4|mov|webm|png|svg|webp)$/i.test(u))

for (const src of new Set(candidates)) {
  const dest = 'public/media/' + src.slice(prefix.length)
  try { await access(dest); continue } catch {}
  const res = await fetch(src)
  if (!res.ok) { console.warn('skip', res.status, src); continue }
  await mkdir(dirname(dest), { recursive: true })
  await writeFile(dest, Buffer.from(await res.arrayBuffer()))
  console.log('mirrored', dest)
}
