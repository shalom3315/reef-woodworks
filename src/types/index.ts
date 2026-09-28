export interface Project {
  id: string
  title: string
  description: string
  material: string
  duration: string
  image_url: string
  category: string
  featured: boolean
  order_index: number
  created_at: string
  slug?: string
}

export interface Testimonial {
  id: string
  name: string
  location: string
  text: string
  project: string
  rating: number
  created_at: string
  // Absent until supabase/migrations/testimonials_moderation.sql is applied
  approved?: boolean
}

export interface SiteSetting {
  key: string
  value: string
  updated_at: string
}

export type SiteSettings = Record<string, string | undefined>

export interface FAQ {
  id: string
  question: string
  answer: string
  order_index: number
}
