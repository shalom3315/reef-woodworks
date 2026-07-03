'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import { Award, Clock, Users, Sparkles } from 'lucide-react'
import { useEditContext } from '@/contexts/EditContext'
import { EditField } from '@/components/EditField'

const stats = [
  { icon: Clock, value: '15+', label: 'שנות ניסיון' },
  { icon: Users, value: '200+', label: 'לקוחות' },
  { icon: Award, value: '100%', label: 'עבודת יד' },
  { icon: Sparkles, value: '0', label: 'פשרות' },
]

export default function About() {
  const { editing, draft } = useEditContext()

  const text = draft.about_text || 'עם למעלה מ-15 שנות ניסיון בנגרות אמנותית, אני מאמין שכל חתיכת עץ מספרת סיפור.'
  const name = draft.about_name || 'יוסי בן-דוד'
  const title = draft.about_title || 'נגר ובעל הסדנה'
  const rawImage = draft.about_image || ''
  const FALLBACK_IMAGE = 'https://images.unsplash.com/photo-1588854337221-4cf9fa96059c?w=800&q=80'
  const image = (rawImage.startsWith('http://') || rawImage.startsWith('https://') || rawImage.startsWith('/'))
    ? rawImage
    : FALLBACK_IMAGE

  return (
    <section id="about" className="py-28 bg-white relative overflow-hidden">
      <div className="absolute top-0 bottom-0 left-0 w-1/2 bg-cream/40 -z-0 hidden lg:block" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-20 items-center">
          <motion.div initial={{ opacity: 0, x: 40 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }} className="relative order-2 lg:order-1">
            <div className="absolute -top-5 -right-5 w-full h-full border-2 border-gold/15 rounded-3xl" />
            <div className="relative rounded-3xl overflow-hidden shadow-2xl" style={{ aspectRatio: '3/4' }}>
              <Image src={image} alt={name} fill className="object-cover" sizes="(max-width: 1024px) 100vw, 50vw" />
              <div className="absolute inset-0 ring-1 ring-inset ring-charcoal/10" />
            </div>
            {editing && (
              <div className="mt-3">
                <label className="text-charcoal/40 text-xs block mb-1">URL של תמונת אודות</label>
                <EditField fieldKey="about_image" className="text-charcoal/60 text-xs" placeholder="https://..." />
              </div>
            )}
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.5 }} className="absolute -bottom-8 -left-6 bg-charcoal rounded-2xl p-5 shadow-2xl">
              <div className="grid grid-cols-2 gap-4">
                {stats.map((s, i) => (
                  <div key={i} className="flex items-center gap-2.5">
                    <s.icon size={16} className="text-gold flex-shrink-0" />
                    <div>
                      <div className="text-cream font-bold text-lg leading-none">{s.value}</div>
                      <div className="text-cream/45 text-xs mt-0.5">{s.label}</div>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </motion.div>

          <motion.div initial={{ opacity: 0, x: -40 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }} className="order-1 lg:order-2 pb-8 lg:pb-0">
            <span className="inline-block text-gold font-medium text-sm tracking-[0.2em] uppercase mb-5">אודות</span>
            <h2 className="font-heading text-4xl md:text-5xl text-charcoal leading-tight mb-8">
              נגר שאוהב<br />את מה שהוא עושה
            </h2>
            <p className="text-charcoal/65 leading-relaxed whitespace-pre-line">
              {editing
                ? <EditField fieldKey="about_text" className="text-charcoal/65 leading-relaxed" placeholder="טקסט אודות..." multiline />
                : text
              }
            </p>

            {/* כרטיס משפחה */}
            <div className="mt-8 flex items-center gap-3 bg-cream/60 border border-gold/15 rounded-2xl px-5 py-4">
              <div className="text-2xl">🌿</div>
              <p className="text-charcoal/60 text-sm leading-relaxed">
                בעלה של <span className="text-charcoal font-medium">מטי</span> ואבא של{' '}
                <span className="text-gold font-semibold">ריף</span> — הילד שנתן את שמו למותג
              </p>
            </div>

            <div className="mt-8 pt-8 border-t border-charcoal/10 flex items-center gap-4">
              <div className="w-12 h-12 bg-gold/15 rounded-full flex items-center justify-center">
                <span className="font-heading text-gold text-lg font-bold">{(draft.about_name || name).charAt(0)}</span>
              </div>
              <div>
                <div className="font-heading text-charcoal text-lg">
                  {editing
                    ? <EditField fieldKey="about_name" className="font-heading text-charcoal text-lg" placeholder="שם" />
                    : name
                  }
                </div>
                <div className="text-charcoal/45 text-sm">
                  {editing
                    ? <EditField fieldKey="about_title" className="text-charcoal/45 text-sm" placeholder="תפקיד" />
                    : title
                  }
                </div>
              </div>
            </div>
            <div className="mt-8 flex flex-wrap gap-4">
              <a href="#contact" className="bg-gold hover:bg-gold-light text-cream font-semibold px-7 py-3.5 rounded-xl transition-all duration-300 hover:shadow-lg hover:shadow-gold/25">בואו נדבר</a>
              <a href="#gallery" className="border border-charcoal/20 text-charcoal hover:border-gold hover:text-gold font-semibold px-7 py-3.5 rounded-xl transition-all duration-300">ראה עבודות</a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
