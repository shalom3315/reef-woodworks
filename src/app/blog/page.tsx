import type { Metadata } from 'next'
import Link from 'next/link'
import { ChevronLeft } from 'lucide-react'
import { ARTICLES } from '@/data/articles'

const SITE_URL = 'https://woodworking-landing-three.vercel.app'

export const metadata: Metadata = {
  title: 'מאמרים ומדריכים | ריף וודוורקס',
  description: 'מדריכים מקצועיים על פרגולות, דקים וגדרות עץ — מחירים, בחירת חומרים, תחזוקה ועוד. ריף וודוורקס.',
  alternates: { canonical: `${SITE_URL}/blog` },
}

export default function BlogPage() {
  return (
    <main className="min-h-screen bg-cream" dir="rtl">
      <div className="max-w-3xl mx-auto px-6 py-20">
        <div className="mb-12 text-center">
          <span className="text-gold text-xs tracking-[0.3em] uppercase font-body">ידע מקצועי</span>
          <h1 className="font-heading text-4xl md:text-5xl text-charcoal mt-3 mb-4">מאמרים ומדריכים</h1>
          <p className="text-charcoal/50 text-base max-w-md mx-auto">כל מה שרצית לדעת על עץ חוץ — בלי שקר שיווקי</p>
        </div>

        <div className="space-y-4">
          {ARTICLES.map(article => (
            <Link
              key={article.slug}
              href={`/blog/${article.slug}`}
              className="group block bg-white rounded-2xl p-6 border border-charcoal/8 hover:border-gold/40 hover:shadow-md transition-all"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <p className="text-xs text-charcoal/35 mb-2">
                    {new Date(article.publishedAt).toLocaleDateString('he-IL', { year: 'numeric', month: 'long' })}
                  </p>
                  <h2 className="font-heading text-xl text-charcoal group-hover:text-gold transition-colors leading-snug mb-2">
                    {article.title}
                  </h2>
                  <p className="text-sm text-charcoal/55 leading-relaxed line-clamp-2">{article.intro}</p>
                </div>
                <ChevronLeft size={18} className="text-charcoal/20 group-hover:text-gold transition-colors flex-shrink-0 mt-1" />
              </div>
            </Link>
          ))}
        </div>

        <div className="mt-12 text-center">
          <Link href="/" className="text-sm text-charcoal/40 hover:text-gold transition-colors">
            ← חזרה לאתר הראשי
          </Link>
        </div>
      </div>
    </main>
  )
}
