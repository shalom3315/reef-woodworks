import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import Link from 'next/link'
import { ChevronRight, ChevronLeft, MessageCircle, MapPin } from 'lucide-react'
import { SERVICES, getService } from '@/data/services'
import { ARTICLES } from '@/data/articles'
import { SERVICE_CITIES } from '@/data/areas'
import { safeJsonLd } from '@/lib/safeJsonLd'
import { waLink } from '@/lib/contact'
import RichBody from '@/components/RichBody'

const SITE_URL = 'https://reefwoodwork.com'

export function generateStaticParams() {
  return SERVICES.map(s => ({ slug: s.slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const service = getService(slug)
  if (!service) return { title: 'שירות לא נמצא' }
  const url = `${SITE_URL}/services/${service.slug}`
  return {
    title: service.metaTitle,
    description: service.metaDescription,
    alternates: { canonical: url },
    openGraph: {
      title: service.metaTitle,
      description: service.metaDescription,
      url,
      type: 'website',
      locale: 'he_IL',
      siteName: 'ריף וודוורקס',
    },
  }
}

export default async function ServicePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const service = getService(slug)
  if (!service) notFound()

  const url = `${SITE_URL}/services/${service.slug}`
  const related = ARTICLES.filter(a => service.relatedArticles.includes(a.slug))
  const otherServices = SERVICES.filter(s => s.slug !== service.slug)

  const schema = [
    {
      '@context': 'https://schema.org',
      '@type': 'Service',
      name: service.title,
      serviceType: service.name,
      description: service.metaDescription,
      url,
      provider: { '@id': SITE_URL },
      areaServed: SERVICE_CITIES.map(name => ({ '@type': 'City', name })),
    },
    {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: service.faqs.map(f => ({
        '@type': 'Question',
        name: f.question,
        acceptedAnswer: { '@type': 'Answer', text: f.answer },
      })),
    },
    {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'ריף וודוורקס', item: SITE_URL },
        { '@type': 'ListItem', position: 2, name: 'שירותים', item: `${SITE_URL}/services` },
        { '@type': 'ListItem', position: 3, name: service.name, item: url },
      ],
    },
  ]

  return (
    <main className="min-h-screen bg-cream" dir="rtl">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: safeJsonLd(schema) }} />

      {/* Top nav */}
      <div className="bg-white border-b border-charcoal/8">
        <div className="max-w-3xl mx-auto px-6 py-4 flex items-center gap-2 text-sm text-charcoal/50">
          <Link href="/" className="hover:text-gold transition-colors">ריף וודוורקס</Link>
          <ChevronRight size={14} className="rotate-180" />
          <Link href="/services" className="hover:text-gold transition-colors">שירותים</Link>
          <ChevronRight size={14} className="rotate-180" />
          <span className="text-charcoal/80 truncate max-w-[200px]">{service.name}</span>
        </div>
      </div>

      <article className="max-w-3xl mx-auto px-6 py-16">
        <header className="mb-12">
          <span className="text-gold text-xs tracking-[0.3em] uppercase font-body">ריף וודוורקס · מרכז הארץ</span>
          <h1 className="font-heading text-3xl md:text-4xl lg:text-5xl text-charcoal leading-tight mt-3 mb-6">
            {service.title}
          </h1>
          <p className="text-lg text-charcoal/70 leading-relaxed border-r-4 border-gold pr-4">
            {service.intro}
          </p>
          <a
            href={waLink(service.waMessage)}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-8 inline-flex items-center gap-2.5 bg-[#25D366] hover:bg-[#20bd5c] text-charcoal font-medium px-6 py-3.5 rounded-xl transition-colors"
          >
            <MessageCircle size={20} />
            הצעת מחיר בוואטסאפ
          </a>
        </header>

        <div className="space-y-10">
          {service.sections.map((section, i) => (
            <section key={i}>
              <h2 className="font-heading text-xl md:text-2xl text-charcoal mb-3">{section.heading}</h2>
              <RichBody body={section.body} />
            </section>
          ))}
        </div>

        {/* FAQ */}
        <section className="mt-14">
          <h2 className="font-heading text-xl md:text-2xl text-charcoal mb-5">שאלות נפוצות על {service.name}</h2>
          <div className="space-y-3">
            {service.faqs.map(f => (
              <details key={f.question} className="group bg-white rounded-2xl border border-charcoal/8 p-5">
                <summary className="font-semibold text-charcoal cursor-pointer list-none flex items-center justify-between gap-4">
                  {f.question}
                  <ChevronLeft size={16} className="text-charcoal/30 transition-transform group-open:-rotate-90 flex-shrink-0" />
                </summary>
                <p className="text-charcoal/70 leading-relaxed mt-3">{f.answer}</p>
              </details>
            ))}
          </div>
        </section>

        {/* Areas */}
        <section className="mt-14">
          <h2 className="font-heading text-xl md:text-2xl text-charcoal mb-4 flex items-center gap-2">
            <MapPin size={20} className="text-gold" />
            {service.name} במרכז הארץ
          </h2>
          <p className="text-charcoal/70 leading-relaxed">
            אנחנו מגיעים למדוד, לייעץ ולהתקין ב{SERVICE_CITIES.join(', ')} ובשאר יישובי גוש דן והמרכז.
          </p>
        </section>

        {related.length > 0 && (
          <section className="mt-14">
            <h2 className="font-heading text-xl md:text-2xl text-charcoal mb-4">מדריכים שכדאי לקרוא</h2>
            <ul className="space-y-2">
              {related.map(a => (
                <li key={a.slug}>
                  <Link href={`/blog/${a.slug}`} className="text-charcoal/75 hover:text-gold transition-colors underline underline-offset-4 decoration-gold/40">
                    {a.title}
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        )}

        {/* CTA */}
        <div className="mt-16 bg-charcoal rounded-2xl p-8 text-center">
          <p className="text-cream/80 text-base leading-relaxed mb-6">
            שלחו לנו תמונה של המקום ומידות משוערות, ונחזור אליכם עם הצעת מחיר. המדידה בשטח בחינם.
          </p>
          <a
            href={waLink(service.waMessage)}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2.5 bg-[#25D366] hover:bg-[#20bd5c] text-charcoal font-medium px-8 py-4 rounded-xl transition-colors text-base"
          >
            <MessageCircle size={20} />
            שלחו הודעה בוואטסאפ
          </a>
          <p className="text-cream/40 text-xs mt-4">053-221-3939 · ריף וודוורקס</p>
        </div>

        {/* Other services */}
        <nav className="mt-14" aria-label="שירותים נוספים">
          <h2 className="font-heading text-lg text-charcoal mb-4">שירותים נוספים</h2>
          <div className="flex flex-wrap gap-2">
            {otherServices.map(s => (
              <Link
                key={s.slug}
                href={`/services/${s.slug}`}
                className="bg-white border border-charcoal/10 hover:border-gold/50 rounded-full px-4 py-2 text-sm text-charcoal/70 hover:text-gold transition-colors"
              >
                {s.name}
              </Link>
            ))}
          </div>
        </nav>

        <div className="mt-10 text-center">
          <Link href="/" className="text-sm text-charcoal/40 hover:text-gold transition-colors">
            ← חזרה לאתר הראשי
          </Link>
        </div>
      </article>
    </main>
  )
}
