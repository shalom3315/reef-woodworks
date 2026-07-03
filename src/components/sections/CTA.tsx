'use client'

import { motion } from 'framer-motion'
import { MessageCircle, Phone } from 'lucide-react'
import Image from 'next/image'
import { useEditContext } from '@/contexts/EditContext'
import { EditField } from '@/components/EditField'

export default function CTA() {
  const { editing, draft } = useEditContext()

  const phone = draft.phone || '053-313-9394'
  const whatsapp = (draft.whatsapp || '972533139394').replace(/\D/g, '')
  const ctaBadge = draft.cta_badge || 'יש לכם רעיון?'
  const ctaTitle = draft.cta_title || 'נהפוך אותו לעץ אמיתי'
  const ctaSubtitle = draft.cta_subtitle || 'שיחה ראשונה היא תמיד חינם וללא התחייבות.'
  const ctaBtnWhatsapp = draft.cta_btn_whatsapp || 'שלחו הודעה בוואטסאפ'

  return (
    <section className="relative py-28 overflow-hidden bg-charcoal">
      <Image src="https://images.unsplash.com/photo-1530124566582-a618bc2615dc?w=1920&q=70" alt="סדנת נגרות" fill className="object-cover opacity-15" sizes="100vw" />
      <div className="absolute top-0 right-0 left-0 h-1 bg-gradient-to-r from-transparent via-gold to-transparent opacity-60" />

      <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
        <motion.div initial={{ opacity: 0, y: 25 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }}>
          <span className="inline-block text-gold font-medium text-sm tracking-[0.2em] uppercase mb-6">
            {editing
              ? <EditField fieldKey="cta_badge" className="text-gold font-medium text-sm tracking-[0.2em] uppercase" placeholder="באנר" />
              : ctaBadge
            }
          </span>
          <h2 className="font-heading text-5xl md:text-6xl lg:text-7xl text-cream leading-tight mb-6">
            {editing
              ? <EditField fieldKey="cta_title" className="font-heading text-5xl md:text-6xl text-cream leading-tight" placeholder="כותרת CTA" />
              : ctaTitle
            }
          </h2>
          <p className="text-cream/55 text-lg md:text-xl mb-12 max-w-xl mx-auto leading-relaxed">
            {editing
              ? <EditField fieldKey="cta_subtitle" className="text-cream/55 text-lg leading-relaxed" placeholder="תיאור CTA" multiline />
              : ctaSubtitle
            }
          </p>

          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <motion.a href={`https://wa.me/${whatsapp}`} target="_blank" rel="noopener noreferrer" whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }} className="inline-flex items-center justify-center gap-3 bg-gold hover:bg-gold-light text-cream font-semibold px-9 py-4 rounded-xl text-lg transition-all duration-300 hover:shadow-2xl hover:shadow-gold/35">
              <MessageCircle size={22} />
              {editing
                ? <EditField fieldKey="cta_btn_whatsapp" className="text-cream font-semibold text-lg" placeholder="טקסט כפתור" />
                : <span>{ctaBtnWhatsapp}</span>
              }
            </motion.a>
            <motion.a href={`tel:${phone}`} whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }} className="inline-flex items-center justify-center gap-3 border-2 border-cream/25 hover:border-cream/60 text-cream font-semibold px-9 py-4 rounded-xl text-lg transition-all duration-300 hover:bg-cream/8">
              <Phone size={20} />
              {editing
                ? <EditField fieldKey="phone" className="text-cream font-semibold text-lg" placeholder="מספר טלפון" />
                : <span>{phone}</span>
              }
            </motion.a>
          </div>

          {editing && (
            <div className="mt-8 p-4 bg-cream/5 rounded-xl border border-gold/20 text-right max-w-sm mx-auto">
              <label className="text-cream/40 text-xs block mb-1">וואטסאפ (מספר בינלאומי לקישורים)</label>
              <EditField fieldKey="whatsapp" className="text-cream/60 text-sm" placeholder="972533139394" />
            </div>
          )}

          <div className="mt-14 flex flex-wrap justify-center gap-8 text-cream/35 text-sm">
            {['ללא התחייבות', 'תשובה תוך 24 שעות', 'הצעת מחיר חינם'].map((item) => (
              <span key={item} className="flex items-center gap-2">
                <span className="text-gold">✓</span>{item}
              </span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
