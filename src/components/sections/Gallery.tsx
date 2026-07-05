'use client'

import { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import { X, ChevronRight, ChevronLeft, Clock, Layers, MessageCircle, ExternalLink } from 'lucide-react'
import Link from 'next/link'
import type { Project } from '@/types'

const DEFAULT_PROJECTS: Project[] = [
  { id: '1', title: 'שולחן אוכל אגוז', description: 'שולחן אוכל מוצק מעץ אגוז אמריקאי, ל-8 מקומות ישיבה. רגליים מעוגלות בעיבוד ידני.', material: 'אגוז אמריקאי', duration: '4 שבועות', image_url: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=900&q=80', category: 'שולחנות', featured: true, order_index: 1, created_at: '' },
  { id: '2', title: 'ספרייה מרצפה לתקרה', description: 'ספרייה בנויה לפי מידות מרצפה לתקרה, עם ארונות תחתונים ותאים פתוחים מעץ אלון מעושן.', material: 'אלון מעושן', duration: '6 שבועות', image_url: 'https://images.unsplash.com/photo-1594312915251-48db9280c8f1?w=900&q=80', category: 'ריהוט', featured: true, order_index: 2, created_at: '' },
  { id: '3', title: 'שידת לילה מינימליסטית', description: 'זוג שידות לילה מעץ שיטה טבעי. עיצוב נקי עם מגירה ומדף. גוון ושעווה בגימור מט.', material: 'שיטה טבעי', duration: '2 שבועות', image_url: 'https://images.unsplash.com/photo-1616594039964-ae9021a400a0?w=900&q=80', category: 'חדר שינה', featured: false, order_index: 3, created_at: '' },
  { id: '4', title: 'ספסל כניסה עם אחסון', description: 'ספסל כניסה עם מגירות אחסון נסתרות, ידיות פליז וכרית עור.', material: 'אלמוג + פליז', duration: '3 שבועות', image_url: 'https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?w=900&q=80', category: 'ריהוט', featured: false, order_index: 4, created_at: '' },
  { id: '5', title: 'שולחן קפה – ריינה חי', description: 'שולחן מרכזי עם לוח עץ ריינה עם שפה חיה, ממולא אפוקסי כחול. רגליים ממתכת שחורה.', material: 'ריינה + אפוקסי + מתכת', duration: '3 שבועות', image_url: 'https://images.unsplash.com/photo-1506439773649-6e0eb8cfb237?w=900&q=80', category: 'שולחנות', featured: false, order_index: 5, created_at: '' },
  { id: '6', title: 'ארונות מטבח עץ מלא', description: 'מטבח שלם מעץ אגוז מלא עם חזיתות ידיות משוקעות. לפיות עץ מוצק תואמות.', material: 'אגוז + ספיר', duration: '8 שבועות', image_url: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=900&q=80', category: 'מטבח', featured: true, order_index: 6, created_at: '' },
]

const PHONE = '0532213939'
const WA_BASE = `https://wa.me/972${PHONE.replace(/^0/, '')}`

export default function Gallery({ projects }: { projects?: Project[] }) {
  const data = (projects && projects.length > 0) ? projects : DEFAULT_PROJECTS
  const [selectedIdx, setSelectedIdx] = useState<number | null>(null)
  const [filter, setFilter] = useState('הכל')

  const ALL_CATEGORIES = ['פרגולות', 'פרגולה הצללה', 'דקים', 'גדרות', 'ריהוט גן', 'פרויקטים מיוחדים']
  const usedCategories = new Set(data.map((p) => p.category))
  const categories = ['הכל', ...ALL_CATEGORIES.filter(c => usedCategories.has(c))]
  const filtered = filter === 'הכל' ? data : data.filter((p) => p.category === filter)

  const selected = selectedIdx !== null ? filtered[selectedIdx] : null

  const close = useCallback(() => setSelectedIdx(null), [])
  const prev = useCallback(() => {
    if (selectedIdx === null) return
    setSelectedIdx((selectedIdx - 1 + filtered.length) % filtered.length)
  }, [selectedIdx, filtered.length])
  const next = useCallback(() => {
    if (selectedIdx === null) return
    setSelectedIdx((selectedIdx + 1) % filtered.length)
  }, [selectedIdx, filtered.length])

  useEffect(() => {
    if (selectedIdx === null) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') close()
      if (e.key === 'ArrowLeft') next()   // RTL: left = forward
      if (e.key === 'ArrowRight') prev()  // RTL: right = back
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [selectedIdx, close, prev, next])

  // Lock body scroll when lightbox is open
  useEffect(() => {
    document.body.style.overflow = selectedIdx !== null ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [selectedIdx])

  const safeUrl = (url?: string) =>
    url?.startsWith('http') ? url : 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=900&q=80'

  return (
    <section id="gallery" className="py-28 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <span className="inline-block text-gold font-medium text-sm tracking-[0.2em] uppercase mb-4">הגלריה שלנו</span>
          <h2 className="font-heading text-4xl md:text-5xl text-charcoal mb-4">עבודות נבחרות</h2>
          <p className="text-charcoal/55 max-w-md mx-auto leading-relaxed">כל פרויקט הוא סיפור אחר. לחצו על תמונה לצפייה בגודל מלא.</p>
        </motion.div>

        {/* Filter buttons */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="flex flex-wrap justify-center gap-3 mb-12"
        >
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => { setFilter(cat); setSelectedIdx(null) }}
              className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                filter === cat
                  ? 'bg-gold text-cream shadow-lg shadow-gold/25'
                  : 'bg-cream text-charcoal hover:bg-gold/12 border border-charcoal/10'
              }`}
            >
              {cat}
            </button>
          ))}
        </motion.div>

        {/* Grid */}
        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          <AnimatePresence mode="popLayout">
            {filtered.map((project, i) => (
              <motion.div
                key={project.id}
                layout
                initial={{ opacity: 0, scale: 0.94 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.94 }}
                transition={{ duration: 0.3, delay: i * 0.04 }}
                className="group relative rounded-2xl overflow-hidden cursor-pointer shadow-wood hover:shadow-wood-lg transition-shadow duration-400"
                style={{ aspectRatio: '4/3' }}
                onClick={() => setSelectedIdx(i)}
              >
                <Image
                  src={safeUrl(project.image_url)}
                  alt={project.title}
                  fill
                  className="object-cover transition-opacity duration-300"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
                {/* Hover overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-charcoal/85 via-charcoal/15 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                {/* Category badge */}
                <div className="absolute top-3 right-3 bg-charcoal/70 backdrop-blur-sm text-cream/85 text-xs px-3 py-1 rounded-full border border-cream/15">
                  {project.category}
                </div>
                {/* Title on hover */}
                <div className="absolute bottom-0 right-0 left-0 p-5 translate-y-2 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-300">
                  <h3 className="text-cream font-heading text-lg leading-snug">{project.title}</h3>
                  <p className="text-cream/60 text-xs mt-1">{project.material} · {project.duration}</p>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* ─── Full-screen Lightbox ─── */}
      <AnimatePresence>
        {selected && selectedIdx !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
            className="fixed inset-0 z-50 bg-black flex flex-col"
            onClick={close}
          >
            {/* Top bar */}
            <div className="flex-shrink-0 flex items-center justify-between px-5 py-4 bg-black/80">
              <span className="text-white/50 text-sm tabular-nums">
                {selectedIdx + 1} / {filtered.length}
              </span>
              <span className="text-white font-heading text-base truncate max-w-xs text-center">{selected.title}</span>
              <button
                onClick={close}
                className="w-10 h-10 rounded-full bg-white/15 hover:bg-white/30 flex items-center justify-center transition-colors"
              >
                <X size={20} className="text-white" />
              </button>
            </div>

            {/* Image — fills remaining space */}
            <div className="flex-1 relative min-h-0" onClick={(e) => e.stopPropagation()}>
              <Image
                src={safeUrl(selected.image_url)}
                alt={selected.title}
                fill
                className="object-contain"
                sizes="100vw"
                priority
                unoptimized
              />

              {/* Prev arrow — right side (RTL) */}
              {filtered.length > 1 && (
                <button
                  onClick={(e) => { e.stopPropagation(); prev() }}
                  className="absolute right-4 top-1/2 -translate-y-1/2 w-14 h-14 rounded-full bg-black/60 hover:bg-black/90 border border-white/20 flex items-center justify-center transition-all"
                  aria-label="הקודם"
                >
                  <ChevronRight size={30} className="text-white" />
                </button>
              )}
              {/* Next arrow — left side (RTL) */}
              {filtered.length > 1 && (
                <button
                  onClick={(e) => { e.stopPropagation(); next() }}
                  className="absolute left-4 top-1/2 -translate-y-1/2 w-14 h-14 rounded-full bg-black/60 hover:bg-black/90 border border-white/20 flex items-center justify-center transition-all"
                  aria-label="הבא"
                >
                  <ChevronLeft size={30} className="text-white" />
                </button>
              )}
            </div>

            {/* Bottom info bar */}
            <div
              className="bg-charcoal/95 backdrop-blur-sm px-5 py-4 flex items-center gap-6"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Category + title */}
              <div className="flex-1 min-w-0">
                <span className="text-gold text-xs font-semibold tracking-widest uppercase">{selected.category}</span>
                <h3 className="text-white font-heading text-lg leading-tight mt-0.5 truncate">{selected.title}</h3>
              </div>

              {/* Meta chips */}
              <div className="hidden sm:flex items-center gap-5 flex-shrink-0">
                {selected.material && (
                  <div className="flex items-center gap-2">
                    <Layers size={14} className="text-gold flex-shrink-0" />
                    <span className="text-white/60 text-sm">{selected.material}</span>
                  </div>
                )}
                {selected.duration && (
                  <div className="flex items-center gap-2">
                    <Clock size={14} className="text-gold flex-shrink-0" />
                    <span className="text-white/60 text-sm">{selected.duration}</span>
                  </div>
                )}
              </div>

              {/* View full page */}
              <Link
                href={`/projects/${selected.slug || selected.id}`}
                className="flex-shrink-0 flex items-center gap-2 border border-white/20 hover:border-gold text-white/70 hover:text-gold text-sm font-medium px-4 py-2.5 rounded-xl transition-colors"
                onClick={(e) => e.stopPropagation()}
              >
                <ExternalLink size={15} />
                <span className="hidden sm:inline">עמוד מלא</span>
              </Link>

              {/* WhatsApp CTA */}
              <a
                href={`${WA_BASE}?text=שלום אלי, ראיתי את הפרויקט "${selected.title}" באתר ואשמח לקבל הצעת מחיר`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-shrink-0 flex items-center gap-2 bg-[#25D366] hover:bg-[#1ebe5d] text-white text-sm font-semibold px-4 py-2.5 rounded-xl transition-colors"
                onClick={(e) => e.stopPropagation()}
              >
                <MessageCircle size={16} />
                <span className="hidden sm:inline">רוצה כזה</span>
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}
