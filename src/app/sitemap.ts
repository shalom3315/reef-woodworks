import type { MetadataRoute } from 'next'
import { createClient } from '@/lib/supabase'

const SITE_URL = 'https://reef-woodworks.vercel.app'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  let projectUrls: MetadataRoute.Sitemap = []
  try {
    const supabase = createClient()
    const { data } = await supabase.from('projects').select('id, created_at')
    projectUrls = (data || []).map((p: { id: string; created_at: string }) => ({
      url: `${SITE_URL}/projects/${p.id}`,
      lastModified: p.created_at ? new Date(p.created_at) : new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    }))
  } catch {
    // silently skip if DB unavailable
  }

  return [
    { url: SITE_URL, lastModified: new Date(), changeFrequency: 'weekly', priority: 1 },
    { url: `${SITE_URL}/#about`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 },
    { url: `${SITE_URL}/#gallery`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.9 },
    { url: `${SITE_URL}/#contact`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.7 },
    ...projectUrls,
  ]
}
