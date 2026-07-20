import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import Link from 'next/link'
import { ChevronRight, MessageCircle, Calendar } from 'lucide-react'
import { ARTICLES, getArticle } from '@/data/articles'

const SITE_URL = 'https://woodworking-landing-three.vercel.app'
const WA_NUMBER = '972532213939'

export function generateStaticParams() {
  return ARTICLES.map(a => ({ slug: a.slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const article = getArticle(slug)
  if (!article) return { title: 'מאמר לא נמצא' }
  return {
    title: article.metaTitle,
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

  const waLink = `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent('שלום, ראיתי את המאמר באתר ורציתי לשאול על ' + article.title)}`

  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: article.title,
    description: article.metaDescription,
    datePublished: article.publishedAt,
    author: { '@type': 'Person', name: 'אלי מרקוס' },
    publisher: { '@type': 'Organization', name: 'ריף וודוורקס', url: SITE_URL },
    url: `${SITE_URL}/blog/${article.slug}`,
    inLanguage: 'he',
  }

  return (
    <main className="min-h-screen bg-cream" dir="rtl">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />

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
              <div className="text-charcoal/75 leading-relaxed whitespace-pre-line prose-like">
                {section.body.split('\n').map((line, j) => {
                  if (line.startsWith('|')) {
                    return null
                  }
                  const bold = line.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
                  return (
                    <p key={j} className="mb-2" dangerouslySetInnerHTML={{ __html: bold }} />
                  )
                })}
                {section.body.includes('|') && (
                  <div className="overflow-x-auto mt-3">
                    <table className="w-full text-sm border border-charcoal/10 rounded-xl overflow-hidden">
                      {section.body.split('\n').filter(l => l.startsWith('|')).map((row, ri) => {
                        const cells = row.split('|').filter(Boolean).map(c => c.trim())
                        if (cells.every(c => c.match(/^-+$/))) return null
                        return (
                          <tr key={ri} className={ri === 0 ? 'bg-gold/10 font-medium' : 'border-t border-charcoal/8'}>
                            {cells.map((cell, ci) => (
                              <td key={ci} className="px-4 py-2.5">{cell}</td>
                            ))}
                          </tr>
                        )
                      })}
                    </table>
                  </div>
                )}
              </div>
            </section>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-16 bg-charcoal rounded-2xl p-8 text-center">
          <p className="text-cream/80 text-base leading-relaxed mb-6">{article.ctaText}</p>
          <a
            href={waLink}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2.5 bg-[#25D366] hover:bg-[#20bd5c] text-white font-medium px-8 py-4 rounded-xl transition-colors text-base"
          >
            <MessageCircle size={20} />
            שלחו הודעה בוואטסאפ
          </a>
          <p className="text-cream/40 text-xs mt-4">053-221-3939 · ריף וודוורקס</p>
        </div>

        {/* Back link */}
        <div className="mt-10 text-center">
          <Link href="/#colors" className="text-sm text-charcoal/40 hover:text-gold transition-colors">
            ← חזרה לאתר הראשי
          </Link>
        </div>
      </article>
    </main>
  )
}
