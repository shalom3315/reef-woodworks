// Supabase Storage sends `cache-control: no-cache`, so every visit re-downloads
// every file and burns the plan's egress quota. /media/* is rewritten to the
// public bucket in vercel.json and cached on Vercel's CDN, so Supabase serves
// each file roughly once instead of once per visitor.
const PUBLIC_STORAGE = `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/`

export function mediaUrl(url: string): string {
  return url.startsWith(PUBLIC_STORAGE) ? '/media/' + url.slice(PUBLIC_STORAGE.length) : url
}
