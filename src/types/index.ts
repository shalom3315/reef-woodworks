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
}

export interface Testimonial {
  id: string
  name: string
  location: string
  text: string
  project: string
  rating: number
  created_at: string
}

export interface SiteSetting {
  key: string
  value: string
  updated_at: string
}

export type SiteSettings = Record<string, string | undefined>
