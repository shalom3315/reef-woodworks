'use client'

import { motion } from 'framer-motion'
import { Hammer, Leaf, Sliders, HeartHandshake } from 'lucide-react'
import { useEditContext } from '@/contexts/EditContext'
import { EditField } from '@/components/EditField'

const ICONS = [Hammer, Leaf, Sliders, HeartHandshake]

export default function Benefits() {
  const { editing, draft } = useEditContext()

  const label   = draft.benefits_label   || 'למה לבחור בנו'
  const heading = draft.benefits_heading || 'הבדל שמרגישים'
  const desc    = draft.benefits_desc    || 'כל פרויקט הוא מחויבות. לאיכות, לדיוק, ולתוצאה שתשמח אתכם שנים קדימה.'

  const cards = [0, 1, 2, 3].map((i) => ({
    icon: ICONS[i],
    accent: draft[`benefits_${i}_accent`] || '',
    title:  draft[`benefits_${i}_title`]  || '',
    desc:   draft[`benefits_${i}_desc`]   || '',
  }))

  return (
    <section className="py-28 bg-cream relative overflow-hidden">
      <div className="absolute inset-0 opacity-[0.03]" style={{
        backgroundImage: 'repeating-linear-gradient(90deg, #6B4F3A 0px, #6B4F3A 1px, transparent 1px, transparent 80px)',
      }} />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-block text-gold font-medium text-sm tracking-[0.2em] uppercase mb-4">
            {editing
              ? <EditField fieldKey="benefits_label" className="text-gold font-medium text-sm tracking-[0.2em] uppercase" placeholder="תווית קטנה" />
              : label}
          </span>
          <h2 className="font-heading text-4xl md:text-5xl text-charcoal">
            {editing
              ? <EditField fieldKey="benefits_heading" className="font-heading text-4xl md:text-5xl text-charcoal" placeholder="כותרת" />
              : heading}
          </h2>
          <p className="text-charcoal/55 mt-4 max-w-md mx-auto leading-relaxed">
            {editing
              ? <EditField fieldKey="benefits_desc" className="text-charcoal/55 leading-relaxed" placeholder="תיאור" multiline />
              : desc}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {cards.map((b, i) => {
            const Icon = b.icon
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.12, duration: 0.6, ease: 'easeOut' }}
                className="group bg-white rounded-2xl p-8 shadow-wood border border-wood-dark/8 hover:shadow-wood-lg hover:border-gold/25 transition-all duration-400 relative overflow-hidden"
              >
                <div className="absolute top-0 right-0 left-0 h-0.5 bg-gradient-to-r from-transparent via-gold/0 to-transparent group-hover:via-gold/60 transition-all duration-500" />

                <div className="w-14 h-14 bg-gold/10 group-hover:bg-gold/20 rounded-xl flex items-center justify-center mb-6 transition-colors duration-300">
                  <Icon className="text-gold" size={26} strokeWidth={1.5} />
                </div>

                <span className="text-gold/70 text-xs font-medium tracking-wide uppercase mb-2 block">
                  {editing
                    ? <EditField fieldKey={`benefits_${i}_accent`} className="text-gold/70 text-xs font-medium tracking-wide uppercase" placeholder="טקסט קטן" />
                    : b.accent}
                </span>
                <h3 className="font-heading text-xl text-charcoal mb-3">
                  {editing
                    ? <EditField fieldKey={`benefits_${i}_title`} className="font-heading text-xl text-charcoal" placeholder="כותרת כרטיס" />
                    : b.title}
                </h3>
                <p className="text-charcoal/58 leading-relaxed text-sm">
                  {editing
                    ? <EditField fieldKey={`benefits_${i}_desc`} className="text-charcoal/58 leading-relaxed text-sm" placeholder="תיאור" multiline />
                    : b.desc}
                </p>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
