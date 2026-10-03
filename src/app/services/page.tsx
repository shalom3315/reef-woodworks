import type { Metadata } from 'next'
import Link from 'next/link'
import { ChevronLeft } from 'lucide-react'
import { SERVICES } from '@/data/services'

const SITE_URL = 'https://reefwoodwork.com'

export const metadata: Metadata = {
  title: 'שירותי נגרות חוץ: פרגולות, דקים, גדרות וריהוט גן',
  description: 'כל שירותי הנגרות של ריף וודוורקס: פרגולות עץ, דקים, גדרות, ריהוט גן, גזיבו וסוכות, וחידוש עץ קיים. בהתאמה אישית במרכז הארץ.',
  alternates: { canonical: `${SITE_URL}/services` },
}

export default function ServicesPage() {
  return (
    <main className="min-h-screen bg-cream" dir="rtl">
      <div className="max-w-3xl mx-auto px-6 py-20">
        <div className="mb-12 text-center">
          <span className="text-gold text-xs tracking-[0.3em] uppercase font-body">מה אנחנו עושים</span>
          <h1 className="font-heading text-4xl md:text-5xl text-charcoal mt-3 mb-4">שירותי נגרות חוץ</h1>
          <p className="text-charcoal/50 text-base max-w-md mx-auto">עבודות עץ לחצר, לגינה ולמרפסת, בהתאמה אישית ובעבודת יד</p>
        </div>

        <div className="space-y-4">
          {SERVICES.map(service => (
            <Link
              key={service.slug}
              href={`/services/${service.slug}`}
              className="group block bg-white rounded-2xl p-6 border border-charcoal/8 hover:border-gold/40 hover:shadow-md transition-all"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <h2 className="font-heading text-xl text-charcoal group-hover:text-gold transition-colors leading-snug mb-2">
                    {service.title}
                  </h2>
                  <p className="text-sm text-charcoal/55 leading-relaxed line-clamp-2">{service.intro}</p>
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
