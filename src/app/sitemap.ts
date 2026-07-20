import type { MetadataRoute } from 'next'
import { createClient } from '@/lib/supabase'
import { ARTICLES } from '@/data/articles'

const SITE_URL = 'https://woodworking-landing-three.vercel.app'

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

  const articleUrls: MetadataRoute.Sitemap = ARTICLES.map(a => ({
    url: `${SITE_URL}/blog/${a.slug}`,
    lastModified: new Date(a.publishedAt),
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  }))

  return [
    { url: SITE_URL, lastModified: new Date(), changeFrequency: 'weekly', priority: 1 },
    { url: `${SITE_URL}/blog`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.6 },
    ...articleUrls,
    ...projectUrls,
  ]
}
