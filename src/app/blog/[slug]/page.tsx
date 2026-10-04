import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import Link from 'next/link'
import { ChevronRight, MessageCircle, Calendar } from 'lucide-react'
import { ARTICLES, getArticle } from '@/data/articles'
import { safeJsonLd } from '@/lib/safeJsonLd'
import { waLink } from '@/lib/contact'
import RichBody from '@/components/RichBody'

const SITE_URL = 'https://reefwoodwork.com'

export function generateStaticParams() {
  return ARTICLES.map(a => ({ slug: a.slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const article = getArticle(slug)
  if (!article) return { title: 'מאמר לא נמצא' }
  return {
    title: { absolute: article.metaTitle },
    description: article.metaDescription,
    alternates: { canonical: `${SITE_URL}/blog/${article.slug}` },
    openGraph: {
      title: article.metaTitle,
      description: article.metaDescription,
      url: `${SITE_URL}/blog/${article.slug}`,
      type: 'article',
      publishedTime: article.publishedAt,
      locale: 'he_IL',
      siteName: 'ריף וודוורקס',
    },
  }
}

export default async function ArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const article = getArticle(slug)
  if (!article) notFound()

  const articleWaLink = waLink('שלום, ראיתי את המאמר באתר ורציתי לשאול על ' + article.title)

  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: article.title,
    description: article.metaDescription,
    datePublished: article.publishedAt,
    dateModified: article.updatedAt ?? article.publishedAt,
    author: { '@type': 'Person', name: 'אלי מרקוס' },
    publisher: { '@type': 'Organization', name: 'ריף וודוורקס', url: SITE_URL },
    url: `${SITE_URL}/blog/${article.slug}`,
    inLanguage: 'he',
  }

  const faqSchema = article.faqs?.length ? {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: article.faqs.map((f) => ({
      '@type': 'Question',
      name: f.question,
      acceptedAnswer: { '@type': 'Answer', text: f.answer },
    })),
  } : null

  const related = ARTICLES.filter((a) => a.slug !== article.slug).slice(0, 3)

  return (
    <main className="min-h-screen bg-cream" dir="rtl">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: safeJsonLd(articleSchema) }} />
      {faqSchema && <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: safeJsonLd(faqSchema) }} />}

      {/* Top nav */}
      <div className="bg-white border-b border-charcoal/8">
        <div className="max-w-3xl mx-auto px-6 py-4 flex items-center gap-2 text-sm text-charcoal/50">
          <Link href="/" className="hover:text-gold transition-colors">ריף וודוורקס</Link>
          <ChevronRight size={14} className="rotate-180" />
          <Link href="/blog" className="hover:text-gold transition-colors">מאמרים</Link>
          <ChevronRight size={14} className="rotate-180" />
          <span className="text-charcoal/80 truncate max-w-[200px]">{article.title}</span>
        </div>
      </div>

      <article className="max-w-3xl mx-auto px-6 py-16">
        {/* Header */}
        <header className="mb-12">
          <div className="flex items-center gap-2 text-xs text-charcoal/40 mb-4">
            <Calendar size={13} />
            <span>{new Date(article.publishedAt).toLocaleDateString('he-IL', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
            <span>·</span>
            <span>ריף וודוורקס</span>
          </div>
          <h1 className="font-heading text-3xl md:text-4xl lg:text-5xl text-charcoal leading-tight mb-6">
            {article.title}
          </h1>
          <p className="text-lg text-charcoal/70 leading-relaxed border-r-4 border-gold pr-4">
            {article.intro}
          </p>
        </header>

        {/* Body */}
        <div className="space-y-10">
          {article.sections.map((section, i) => (
            <section key={i}>
              <h2 className="font-heading text-xl md:text-2xl text-charcoal mb-3">{section.heading}</h2>
              <RichBody body={section.body} />
            </section>
          ))}
        </div>

        {article.faqs && article.faqs.length > 0 && (
          <section className="mt-14">
            <h2 className="font-heading text-xl md:text-2xl text-charcoal mb-5">שאלות נפוצות</h2>
            <div className="space-y-4">
              {article.faqs.map((f) => (
                <div key={f.question} className="bg-white rounded-xl border border-charcoal/8 p-5">
                  <h3 className="font-medium text-charcoal mb-1.5">{f.question}</h3>
                  <p className="text-charcoal/70 leading-relaxed text-sm">{f.answer}</p>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* CTA */}
        <div className="mt-16 bg-charcoal rounded-2xl p-8 text-center">
          <p className="text-cream/80 text-base leading-relaxed mb-6">{article.ctaText}</p>
          <a
            href={articleWaLink}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2.5 bg-[#25D366] hover:bg-[#20bd5c] text-charcoal font-medium px-8 py-4 rounded-xl transition-colors text-base"
          >
            <MessageCircle size={20} />
            שלחו הודעה בוואטסאפ
          </a>
          <p className="text-cream/40 text-xs mt-4">053-221-3939 · ריף וודוורקס</p>
        </div>

        {/* Related: keeps readers moving toward a service page instead of leaving */}
        <nav className="mt-12" aria-label="קריאה נוספת">
          <h2 className="font-heading text-lg text-charcoal mb-4">עוד באתר</h2>
          <div className="flex flex-wrap gap-2.5">
            <Link href="/services" className="bg-white border border-gold/40 text-charcoal hover:text-gold text-sm px-4 py-2 rounded-full transition-colors">כל השירותים והמחירים</Link>
            {related.map((a) => (
              <Link key={a.slug} href={`/blog/${a.slug}`} className="bg-white border border-charcoal/10 hover:border-gold/40 text-charcoal/70 hover:text-gold text-sm px-4 py-2 rounded-full transition-colors">{a.title}</Link>
            ))}
          </div>
        </nav>

        {/* Back link */}
        <div className="mt-10 text-center">
          <Link href="/" className="text-sm text-charcoal/40 hover:text-gold transition-colors">
            ← חזרה לאתר הראשי
          </Link>
        </div>
      </article>
    </main>
  )
}
