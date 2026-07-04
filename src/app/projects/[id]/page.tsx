export const revalidate = 3600

import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { createClient } from '@/lib/supabase'
import { ChevronRight, Clock, Layers, MessageCircle, ArrowRight } from 'lucide-react'
import type { Project } from '@/types'

const SITE_URL = 'https://reef-woodworks.vercel.app'
const WA_NUMBER = '972532213939'

async function getProject(id: string): Promise<Project | null> {
  try {
    const supabase = createClient()
    const { data } = await supabase.from('projects').select('*').eq('id', id).single()
    return data as Project | null
  } catch {
    return null
  }
}

export async function generateStaticParams() {
  try {
    const supabase = createClient()
    const { data } = await supabase.from('projects').select('id')
    return (data || []).map((p: { id: string }) => ({ id: p.id }))
  } catch {
    return []
  }
}

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const { id } = await params
  const project = await getProject(id)
  if (!project) return { title: 'פרויקט לא נמצא' }

  const title = `${project.title} | ריף וודוורקס`
  const description = project.description
    ? `${project.description} — ${project.material ? `חומר: ${project.material}` : ''} — עבודת יד מקצועית, ריף וודוורקס.`
    : `${project.title} — עבודת עץ בהתאמה אישית. ${project.material || ''} ${project.duration ? `· ${project.duration}` : ''} — ריף וודוורקס.`

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      images: project.image_url ? [{ url: project.image_url, width: 1200, height: 630, alt: project.title }] : [],
      type: 'article',
      locale: 'he_IL',
      siteName: 'ריף וודוורקס',
    },
    alternates: { canonical: `${SITE_URL}/projects/${id}` },
  }
}

export default async function ProjectPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const project = await getProject(id)
  if (!project) notFound()

  const safeImage = project.image_url?.startsWith('http')
    ? project.image_url
    : 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=1200&q=80'

  const waMessage = encodeURIComponent(`שלום אלי, ראיתי את הפרויקט "${project.title}" באתר ואשמח לקבל הצעת מחיר`)

  const productSchema = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: project.title,
    description: project.description || `${project.title} — עבודת עץ בהתאמה אישית`,
    image: safeImage,
    category: project.category,
    brand: { '@type': 'Brand', name: 'ריף וודוורקס' },
    offers: {
      '@type': 'Offer',
      availability: 'https://schema.org/InStock',
      priceCurrency: 'ILS',
      seller: {
        '@type': 'LocalBusiness',
        name: 'ריף וודוורקס',
        telephone: '+972532213939',
        url: SITE_URL,
      },
    },
    ...(project.material && { material: project.material }),
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }}
      />

      {/* Minimal nav header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-charcoal/95 backdrop-blur-md shadow-xl">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3">
            <img src="/logo.png" alt="ריף וודוורקס" className="h-14 w-auto object-contain" />
          </Link>
          <Link
            href="/#gallery"
            className="flex items-center gap-2 text-cream/70 hover:text-gold transition-colors font-body text-sm"
          >
            <ArrowRight size={16} />
            חזרה לגלריה
          </Link>
        </div>
      </header>

      <main className="min-h-screen bg-cream pt-[72px]" dir="rtl">
        {/* Hero image */}
        <div className="relative h-[55vh] min-h-[360px] bg-charcoal overflow-hidden">
          <Image
            src={safeImage}
            alt={project.title}
            fill
            className="object-cover opacity-90"
            priority
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-charcoal/80 via-charcoal/20 to-transparent" />

          {/* Breadcrumb over image */}
          <div className="absolute bottom-6 right-0 left-0 px-6 max-w-7xl mx-auto">
            <nav className="flex items-center gap-2 text-cream/60 text-xs mb-3">
              <Link href="/" className="hover:text-gold transition-colors">בית</Link>
              <ChevronRight size={12} className="rotate-180" />
              <Link href="/#gallery" className="hover:text-gold transition-colors">גלריה</Link>
              <ChevronRight size={12} className="rotate-180" />
              <span className="text-cream/90">{project.title}</span>
            </nav>
            <span className="inline-block bg-gold/90 text-charcoal text-xs font-semibold px-3 py-1 rounded-full mb-2">
              {project.category}
            </span>
            <h1 className="font-heading text-3xl md:text-4xl lg:text-5xl text-cream leading-tight">
              {project.title}
            </h1>
          </div>
        </div>

        {/* Content */}
        <div className="max-w-4xl mx-auto px-6 py-12">
          <div className="flex flex-col md:flex-row gap-8 md:gap-16">

            {/* Left: details */}
            <div className="flex-1">
              {project.description && (
                <p className="text-charcoal/75 text-lg leading-relaxed mb-8 font-body">
                  {project.description}
                </p>
              )}

              {/* Meta chips */}
              <div className="flex flex-wrap gap-4 mb-10">
                {project.material && (
                  <div className="flex items-center gap-2.5 bg-white border border-charcoal/10 rounded-xl px-4 py-3 shadow-sm">
                    <Layers size={16} className="text-gold flex-shrink-0" />
                    <div>
                      <div className="text-charcoal/45 text-xs mb-0.5">חומר</div>
                      <div className="text-charcoal font-semibold text-sm">{project.material}</div>
                    </div>
                  </div>
                )}
                {project.duration && (
                  <div className="flex items-center gap-2.5 bg-white border border-charcoal/10 rounded-xl px-4 py-3 shadow-sm">
                    <Clock size={16} className="text-gold flex-shrink-0" />
                    <div>
                      <div className="text-charcoal/45 text-xs mb-0.5">זמן ייצור</div>
                      <div className="text-charcoal font-semibold text-sm">{project.duration}</div>
                    </div>
                  </div>
                )}
              </div>

              {/* Divider */}
              <div className="flex items-center gap-3 mb-8">
                <div className="h-[2px] w-10 bg-gold" />
                <span className="text-gold">✦</span>
                <div className="h-[2px] w-5 bg-gold/40" />
              </div>

              <p className="text-charcoal/60 text-sm leading-relaxed mb-6 font-body">
                כל פרויקט מותאם אישית לפי הצרכים, המידות והסגנון שלך. שיחה ראשונה היא תמיד חינם וללא התחייבות.
              </p>

              {/* CTA */}
              <div className="flex flex-wrap gap-3">
                <a
                  href={`https://wa.me/${WA_NUMBER}?text=${waMessage}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2.5 bg-[#25D366] hover:bg-[#1ebe5d] text-white font-semibold px-7 py-4 rounded-xl transition-all duration-300 hover:shadow-lg hover:shadow-green-500/30 hover:-translate-y-0.5"
                >
                  <MessageCircle size={18} />
                  רוצה כזה — שלח הודעה
                </a>
                <Link
                  href="/#gallery"
                  className="inline-flex items-center gap-2 border border-charcoal/20 text-charcoal/70 hover:border-gold hover:text-gold font-medium px-6 py-4 rounded-xl transition-all duration-300"
                >
                  <ArrowRight size={16} />
                  עוד עבודות
                </Link>
              </div>
            </div>

            {/* Right: trust badges */}
            <div className="md:w-64 flex-shrink-0">
              <div className="bg-white rounded-2xl border border-charcoal/8 p-6 shadow-sm">
                <h3 className="font-heading text-charcoal text-lg mb-5">למה ריף וודוורקס?</h3>
                {[
                  { label: 'עבודת יד מקצועית', desc: '15+ שנות ניסיון' },
                  { label: 'חומרים איכותיים', desc: 'עץ טבעי מהטבע' },
                  { label: 'התאמה אישית מלאה', desc: 'ממידות ועד גוון' },
                  { label: 'שירות עד הבית', desc: 'התקנה מקצועית' },
                ].map((item) => (
                  <div key={item.label} className="flex items-start gap-3 mb-4 last:mb-0">
                    <div className="w-2 h-2 bg-gold rounded-full mt-1.5 flex-shrink-0" />
                    <div>
                      <div className="text-charcoal font-semibold text-sm">{item.label}</div>
                      <div className="text-charcoal/45 text-xs">{item.desc}</div>
                    </div>
                  </div>
                ))}

                <div className="mt-6 pt-5 border-t border-charcoal/8">
                  <a
                    href="tel:+972532213939"
                    className="block text-center text-charcoal font-semibold text-sm hover:text-gold transition-colors"
                  >
                    053-221-3939
                  </a>
                  <p className="text-center text-charcoal/40 text-xs mt-1">זמין ראשון–שישי</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  )
}
