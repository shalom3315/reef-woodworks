'use client'

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Paintbrush2, CheckCircle2 } from 'lucide-react'
import { COLOR_GROUPS, type ColorSwatch } from '@/data/colorSwatches'

function WoodPlank({ hex, className, seed = 5 }: { hex: string; className?: string; seed?: number }) {
  const id = `wg-${hex.slice(1)}-${seed}`
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      style={{ display: 'block', width: '100%', height: '100%' }}
      preserveAspectRatio="xMidYMid slice"
    >
      <defs>
        <filter id={id} x="0%" y="0%" width="100%" height="100%" colorInterpolationFilters="sRGB">
          <feTurbulence type="fractalNoise" baseFrequency="0.012 0.72" numOctaves="5" seed={seed} result="noise" />
          <feColorMatrix type="saturate" values="0" in="noise" result="gray" />
          <feComponentTransfer in="gray" result="grain">
            <feFuncR type="linear" slope="1.6" intercept="-0.28" />
            <feFuncG type="linear" slope="1.6" intercept="-0.28" />
            <feFuncB type="linear" slope="1.6" intercept="-0.28" />
          </feComponentTransfer>
        </filter>
        <linearGradient id={`shine-${id}`} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="white" stopOpacity="0.4" />
          <stop offset="50%" stopColor="white" stopOpacity="0" />
          <stop offset="100%" stopColor="white" stopOpacity="0.15" />
        </linearGradient>
      </defs>
      <rect width="100%" height="100%" fill="white" filter={`url(#${id})`} />
      <rect width="100%" height="100%" fill={hex} style={{ mixBlendMode: 'multiply' }} />
      <rect width="100%" height="100%" fill={`url(#shine-${id})`} style={{ mixBlendMode: 'screen', opacity: 0.12 }} />
    </svg>
  )
}

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
          <div className="h-36 w-full relative overflow-hidden">
            <WoodPlank hex={color.hex} seed={7} className="absolute inset-0" />
            <button
              onClick={onClose}
              className="absolute top-3 left-3 w-8 h-8 bg-white/80 hover:bg-white rounded-full flex items-center justify-center transition-colors z-10"
            >
              <X size={14} className="text-charcoal" />
            </button>
            {color.transparent && (
              <span className="absolute top-3 right-3 bg-white/80 text-charcoal/60 text-[10px] font-medium px-2 py-0.5 rounded-full">
                שקוף
              </span>
            )}
          </div>

          <div className="p-5" dir="rtl">
            <div className="flex items-start justify-between mb-3">
              <div>
                <h3 className="font-heading text-xl font-bold text-charcoal">{color.name}</h3>
                <span className="text-xs text-charcoal/40 font-mono">{color.code}</span>
              </div>
              <div className="w-10 h-10 rounded-xl border border-charcoal/10 shadow-sm flex-shrink-0 overflow-hidden">
                <WoodPlank hex={color.hex} seed={3} />
              </div>
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
  const [selected, setSelected] = useState<ColorSwatch | null>(null)
  const group = COLOR_GROUPS[0]
  const colored = group.colors.filter(c => !c.transparent)
  const transparent = group.colors.filter(c => c.transparent)

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
            AquaTECH לזור — גוונים לעץ חיצוני
          </h2>
          <p className="text-charcoal/50 text-base max-w-xl mx-auto font-body">
            ציפוי לעץ חיצוני על בסיס מים עם הגנת UV, מחברת <strong className="text-charcoal/70">גוונים</strong>.
            לחצו על גוון לפרטים והמלצת שימוש.
          </p>
        </div>

        {/* Colored swatches */}
        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-4 mb-10">
          {colored.map((color, i) => (
            <button
              key={color.code}
              onClick={() => setSelected(color)}
              className="group flex flex-col items-center gap-2 cursor-pointer"
            >
              <div className="w-full aspect-[4/3] rounded-xl shadow-md group-hover:shadow-xl group-hover:scale-105 transition-all duration-200 border border-charcoal/8 overflow-hidden">
                <WoodPlank hex={color.hex} seed={i + 2} />
              </div>
              <div className="text-center">
                <p className="text-xs font-medium text-charcoal group-hover:text-gold transition-colors leading-tight">{color.name}</p>
                <p className="text-[10px] text-charcoal/35 font-mono">{color.code}</p>
              </div>
            </button>
          ))}
        </div>

        {/* Transparent / clear coatings */}
        {transparent.length > 0 && (
          <>
            <div className="flex items-center gap-3 mb-6">
              <div className="h-px flex-1 bg-charcoal/10" />
              <span className="text-xs text-charcoal/40 tracking-widest uppercase">ציפויים שקופים</span>
              <div className="h-px flex-1 bg-charcoal/10" />
            </div>
            <div className="grid grid-cols-3 gap-4">
              {transparent.map((color, i) => (
                <button
                  key={color.code}
                  onClick={() => setSelected(color)}
                  className="group flex flex-col items-center gap-2 cursor-pointer"
                >
                  <div className="w-full aspect-[4/3] rounded-xl shadow-md group-hover:shadow-xl group-hover:scale-105 transition-all duration-200 border border-charcoal/8 overflow-hidden">
                    <WoodPlank hex={color.hex} seed={i + 20} />
                  </div>
                  <div className="text-center">
                    <p className="text-xs font-medium text-charcoal group-hover:text-gold transition-colors leading-tight">{color.name}</p>
                    <p className="text-[10px] text-charcoal/35 font-mono">{color.code}</p>
                  </div>
                </button>
              ))}
            </div>
          </>
        )}

        <p className="text-center text-charcoal/30 text-xs mt-10 font-body">
          הגוונים מוצגים לצורך התרשמות בלבד — הצבעים האמיתיים עשויים להיות שונים מהמסך. ניתן לצפות בדוגמיות פיזיות בפגישת ייעוץ.
        </p>
      </div>

      {selected && <Modal color={selected} onClose={() => setSelected(null)} />}
    </section>
  )
}
