'use client'

import { motion } from 'framer-motion'
import { Star, Quote } from 'lucide-react'
import type { Testimonial } from '@/types'

const DEFAULT_TESTIMONIALS: Testimonial[] = [
  { id: '1', name: 'מיכל כ.', location: 'תל אביב', text: 'שולחן האוכל שהזמנו הפך לנקודת המוקד של הבית שלנו. כל מי שמגיע שואל עליו. איכות שלא ראיתי אף פעם בקנייה רגילה – זה ממש אחרת.', rating: 5, project: 'שולחן אוכל אגוז', created_at: '' },
  { id: '2', name: 'דני א.', location: 'הרצליה', text: 'הוא הקשיב בסבלנות לכל מה שרצינו, הגיע לראות את המקום, ויצר משהו שמעבר לכל ציפייה. מקצוען אמיתי שאוהב את מה שהוא עושה – זה מרגישים בכל פרט.', rating: 5, project: 'ספרייה מרצפה לתקרה', created_at: '' },
  { id: '3', name: 'יעל ר.', location: 'רמת גן', text: 'מדפי הספרים שבנה לנו הם יצירת אמנות של ממש. גם ההסבר בזמן העבודה, גם הזמינות לשאלות, גם התוצאה הסופית – הכל היה מושלם. ממליצה בחום!', rating: 5, project: 'מדפי ספרים', created_at: '' },
]

export default function Testimonials({ testimonials }: { testimonials?: Testimonial[] }) {
  const data = (testimonials && testimonials.length > 0) ? testimonials : DEFAULT_TESTIMONIALS

  return (
    <section id="testimonials" className="py-28 bg-cream relative">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-16">
          <span className="inline-block text-gold font-medium text-sm tracking-[0.2em] uppercase mb-4">מה אומרים לקוחות</span>
          <h2 className="font-heading text-4xl md:text-5xl text-charcoal mb-4">ביקורות מהשטח</h2>
          <p className="text-charcoal/55 max-w-sm mx-auto">אמינות אמיתית מגיעה מאנשים שכבר עבדו איתנו.</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-7">
          {data.map((t, i) => (
            <motion.div key={t.id} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.14, duration: 0.65 }} className="bg-white rounded-2xl p-8 shadow-wood border border-charcoal/5 hover:shadow-wood-lg hover:border-gold/15 transition-all duration-400 relative overflow-hidden group">
              <Quote className="absolute -top-2 left-4 text-gold/8 group-hover:text-gold/12 transition-colors" size={80} strokeWidth={1} />
              <div className="flex gap-1 mb-5 relative z-10">
                {Array.from({ length: t.rating }).map((_, si) => (
                  <Star key={si} size={16} className="text-gold fill-gold" />
                ))}
              </div>
              <p className="text-charcoal/70 leading-relaxed mb-7 relative z-10 text-[0.95rem]">&ldquo;{t.text}&rdquo;</p>
              <div className="border-t border-charcoal/8 pt-5 flex items-center gap-3">
                <div className="w-9 h-9 bg-gold/15 rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-gold font-heading font-bold text-sm">{t.name.charAt(0)}</span>
                </div>
                <div>
                  <div className="font-semibold text-charcoal text-sm">{t.name}</div>
                  <div className="text-charcoal/40 text-xs mt-0.5">{t.location}{t.project ? ` · ${t.project}` : ''}</div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
