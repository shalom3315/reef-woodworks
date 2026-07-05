import type { MetadataRoute } from 'next'
import { createClient } from '@/lib/supabase'

const SITE_URL = 'https://reef-woodworks.vercel.app'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  let projectUrls: MetadataRoute.Sitemap = []
  try {
    const supabase = createClient()
    const { data } = await supabase.from('projects').select('id, slug, created_at')
    projectUrls = (data || []).map((p: { id: string; slug?: string; created_at: string }) => ({
      url: `${SITE_URL}/projects/${p.slug || p.id}`,
      lastModified: p.created_at ? new Date(p.created_at) : new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    }))
  } catch {
    // silently skip if DB unavailable
  }

  return [
    { url: SITE_URL, lastModified: new Date(), changeFrequency: 'weekly', priority: 1 },
    ...projectUrls,
  ]
}
