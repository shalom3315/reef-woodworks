'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Paintbrush2, CheckCircle2 } from 'lucide-react'
import { COLOR_GROUPS, type ColorSwatch, type ColorGroup } from '@/data/colorSwatches'

function Modal({ color, onClose }: { color: ColorSwatch; onClose: () => void }) {
  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[200] bg-charcoal/60 backdrop-blur-sm flex items-center justify-center p-4"
        onClick={onClose}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.92, y: 16 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.92, y: 16 }}
          transition={{ type: 'spring', damping: 22, stiffness: 300 }}
          className="bg-white rounded-2xl shadow-2xl w-full max-w-sm overflow-hidden"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Color bar */}
          <div className="h-32 w-full relative" style={{ backgroundColor: color.hex }}>
            <button
              onClick={onClose}
              className="absolute top-3 left-3 w-8 h-8 bg-white/80 hover:bg-white rounded-full flex items-center justify-center transition-colors"
            >
              <X size={14} className="text-charcoal" />
            </button>
          </div>

          <div className="p-5" dir="rtl">
            <div className="flex items-start justify-between mb-3">
              <div>
                <h3 className="font-heading text-xl font-bold text-charcoal">{color.name}</h3>
                <span className="text-xs text-charcoal/40 font-mono">{color.code}</span>
              </div>
              <div className="w-10 h-10 rounded-xl border border-charcoal/10 shadow-sm flex-shrink-0" style={{ backgroundColor: color.hex }} />
            </div>

            <p className="text-charcoal/70 text-sm leading-relaxed mb-4">{color.description}</p>

            <div className="flex items-center gap-2 bg-gold/10 border border-gold/25 rounded-xl px-3 py-2.5">
              <CheckCircle2 size={15} className="text-gold flex-shrink-0" />
              <span className="text-sm text-charcoal/80">
                <span className="font-medium text-charcoal">מתאים ל: </span>
                {color.suitable}
              </span>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}

export default function ColorSwatches() {
  const [activeGroup, setActiveGroup] = useState<string>(COLOR_GROUPS[0].id)
  const [selected, setSelected] = useState<ColorSwatch | null>(null)

  const group: ColorGroup = COLOR_GROUPS.find(g => g.id === activeGroup)!

  return (
    <section className="py-24 bg-white" id="colors">
      <div className="max-w-7xl mx-auto px-6" dir="rtl">
        {/* Header */}
        <div className="text-center mb-14">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="h-px w-12 bg-gold/40" />
            <span className="text-gold text-xs tracking-[0.3em] uppercase font-body flex items-center gap-1.5">
              <Paintbrush2 size={13} />
              מניפת גוונים
            </span>
            <div className="h-px w-12 bg-gold/40" />
          </div>
          <h2 className="font-heading text-3xl md:text-4xl text-charcoal mb-3">
            גוונים לעץ חיצוני
          </h2>
          <p className="text-charcoal/50 text-base max-w-xl mx-auto font-body">
            כל הגוונים הם מחברת <strong className="text-charcoal/70">גוונים</strong> — הספק המרכזי שלנו לצבעים ושמנים לעץ.
            לחצו על גוון לפרטים והמלצת שימוש.
          </p>
        </div>

        {/* Tabs */}
        <div className="flex flex-wrap justify-center gap-2 mb-10">
          {COLOR_GROUPS.map((g) => (
            <button
              key={g.id}
              onClick={() => setActiveGroup(g.id)}
              className={`px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-200 ${
                activeGroup === g.id
                  ? 'bg-charcoal text-cream shadow-lg'
                  : 'bg-cream text-charcoal/60 hover:text-charcoal hover:bg-charcoal/8 border border-charcoal/10'
              }`}
            >
              {g.label}
            </button>
          ))}
        </div>

        {/* Group subtitle */}
        <p className="text-center text-charcoal/45 text-sm mb-8 font-body">{group.subtitle}</p>

        {/* Swatches grid */}
        <motion.div
          key={activeGroup}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-3"
        >
          {group.colors.map((color) => (
            <button
              key={color.code}
              onClick={() => setSelected(color)}
              className="group flex flex-col items-center gap-2 cursor-pointer"
            >
              <div
                className="w-full aspect-[4/3] rounded-xl shadow-md group-hover:shadow-xl group-hover:scale-105 transition-all duration-200 border border-charcoal/8"
                style={{ backgroundColor: color.hex }}
              />
              <div className="text-center">
                <p className="text-xs font-medium text-charcoal group-hover:text-gold transition-colors leading-tight">{color.name}</p>
                <p className="text-[10px] text-charcoal/35 font-mono">{color.code}</p>
              </div>
            </button>
          ))}
        </motion.div>

        {/* Disclaimer */}
        <p className="text-center text-charcoal/30 text-xs mt-10 font-body">
          הגוונים מוצגים לצורך התרשמות בלבד — הצבעים האמיתיים עשויים להיות שונים מהמסך. ניתן לצפות בדוגמיות פיזיות בפגישת ייעוץ.
        </p>
      </div>

      {selected && <Modal color={selected} onClose={() => setSelected(null)} />}
    </section>
  )
}
