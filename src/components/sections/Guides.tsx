import Link from 'next/link'
import { ChevronLeft } from 'lucide-react'
import { SERVICES } from '@/data/services'
import { getArticle } from '@/data/articles'

// The homepage gets nearly all the traffic, so this is where service pages and
// price guides get found by both visitors and Google
const GUIDE_SLUGS = ['kama-ole-pargola', 'kama-ole-gader-etz', 'dek-ipae-bambuk-hashvaa', 'eize-etz-lihuz-madrich']

export default function Guides() {
  const guides = GUIDE_SLUGS.map(getArticle).filter((a) => a !== undefined)

  return (
    <section id="guides" className="py-24 bg-cream" dir="rtl">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-14">
          <span className="text-gold text-sm font-medium tracking-widest uppercase block mb-3">מחירים ומדריכים</span>
          <h2 className="font-heading text-4xl md:text-5xl text-charcoal mb-4">לפני שמבקשים הצעת מחיר</h2>
          <p className="text-charcoal/50 text-lg max-w-xl mx-auto">מחירים למטר, סוגי עץ ומה כל עבודה כוללת</p>
        </div>

        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {SERVICES.map((s) => (
            <Link
              key={s.slug}
              href={`/services/${s.slug}`}
              className="bg-white border border-charcoal/10 hover:border-gold/50 hover:text-gold text-charcoal/75 text-sm px-5 py-2.5 rounded-full transition-colors"
            >
              {s.title}
            </Link>
          ))}
        </div>

        <div className="grid sm:grid-cols-2 gap-4">
          {guides.map((a) => (
            <Link
              key={a.slug}
              href={`/blog/${a.slug}`}
              className="group bg-white rounded-2xl p-6 border border-charcoal/8 hover:border-gold/40 hover:shadow-md transition-all flex items-start justify-between gap-4"
            >
              <div>
                <h3 className="font-heading text-xl text-charcoal group-hover:text-gold transition-colors leading-snug mb-2">{a.title}</h3>
                <p className="text-sm text-charcoal/55 leading-relaxed line-clamp-2">{a.intro}</p>
              </div>
              <ChevronLeft size={18} className="text-charcoal/20 group-hover:text-gold transition-colors flex-shrink-0 mt-1" />
            </Link>
          ))}
        </div>

        <div className="text-center mt-10">
          <Link href="/blog" className="text-sm text-charcoal/50 hover:text-gold transition-colors">כל המאמרים ←</Link>
        </div>
      </div>
    </section>
  )
}
