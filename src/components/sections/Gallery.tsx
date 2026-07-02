'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import { X, ZoomIn, Clock, Layers } from 'lucide-react'
import type { Project } from '@/types'

const DEFAULT_PROJECTS: Project[] = [
  { id: '1', title: 'שולחן אוכל אגוז', description: 'שולחן אוכל מוצק מעץ אגוז אמריקאי, ל-8 מקומות ישיבה. רגליים מעוגלות בעיבוד ידני.', material: 'אגוז אמריקאי', duration: '4 שבועות', image_url: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=900&q=80', category: 'שולחנות', featured: true, order_index: 1, created_at: '' },
  { id: '2', title: 'ספרייה מרצפה לתקרה', description: 'ספרייה בנויה לפי מידות מרצפה לתקרה, עם ארונות תחתונים ותאים פתוחים מעץ אלון מעושן.', material: 'אלון מעושן', duration: '6 שבועות', image_url: 'https://images.unsplash.com/photo-1594312915251-48db9280c8f1?w=900&q=80', category: 'ריהוט', featured: true, order_index: 2, created_at: '' },
  { id: '3', title: 'שידת לילה מינימליסטית', description: 'זוג שידות לילה מעץ שיטה טבעי. עיצוב נקי עם מגירה ומדף. גוון ושעווה בגימור מט.', material: 'שיטה טבעי', duration: '2 שבועות', image_url: 'https://images.unsplash.com/photo-1616594039964-ae9021a400a0?w=900&q=80', category: 'חדר שינה', featured: false, order_index: 3, created_at: '' },
  { id: '4', title: 'ספסל כניסה עם אחסון', description: 'ספסל כניסה עם מגירות אחסון נסתרות, ידיות פליז וכרית עור.', material: 'אלמוג + פליז', duration: '3 שבועות', image_url: 'https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?w=900&q=80', category: 'ריהוט', featured: false, order_index: 4, created_at: '' },
  { id: '5', title: 'שולחן קפה – ריינה חי', description: 'שולחן מרכזי עם לוח עץ ריינה עם שפה חיה, ממולא אפוקסי כחול. רגליים ממתכת שחורה.', material: 'ריינה + אפוקסי + מתכת', duration: '3 שבועות', image_url: 'https://images.unsplash.com/photo-1506439773649-6e0eb8cfb237?w=900&q=80', category: 'שולחנות', featured: false, order_index: 5, created_at: '' },
  { id: '6', title: 'ארונות מטבח עץ מלא', description: 'מטבח שלם מעץ אגוז מלא עם חזיתות ידיות משוקעות. לפיות עץ מוצק תואמות.', material: 'אגוז + ספיר', duration: '8 שבועות', image_url: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=900&q=80', category: 'מטבח', featured: true, order_index: 6, created_at: '' },
]

export default function Gallery({ projects }: { projects?: Project[] }) {
  const data = (projects && projects.length > 0) ? projects : DEFAULT_PROJECTS
  const [selected, setSelected] = useState<Project | null>(null)
  const [filter, setFilter] = useState('הכל')

  const categories = ['הכל', ...Array.from(new Set(data.map((p) => p.category)))]
  const filtered = filter === 'הכל' ? data : data.filter((p) => p.category === filter)

  return (
    <section id="gallery" className="py-28 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-12">
          <span className="inline-block text-gold font-medium text-sm tracking-[0.2em] uppercase mb-4">הגלריה שלנו</span>
          <h2 className="font-heading text-4xl md:text-5xl text-charcoal mb-4">עבודות נבחרות</h2>
          <p className="text-charcoal/55 max-w-md mx-auto leading-relaxed">כל פרויקט הוא סיפור אחר. לחצו על תמונה לפרטים נוספים.</p>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 }} className="flex flex-wrap justify-center gap-3 mb-12">
          {categories.map((cat) => (
            <button key={cat} onClick={() => setFilter(cat)} className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-300 ${filter === cat ? 'bg-gold text-cream shadow-lg shadow-gold/25' : 'bg-cream text-charcoal hover:bg-gold/12 border border-charcoal/10'}`}>
              {cat}
            </button>
          ))}
        </motion.div>

        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence mode="popLayout">
            {filtered.map((project, i) => (
              <motion.div
                key={project.id}
                layout
                initial={{ opacity: 0, scale: 0.94 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.94 }}
                transition={{ duration: 0.35, delay: i * 0.05 }}
                className="group relative rounded-2xl overflow-hidden cursor-pointer shadow-wood hover:shadow-wood-lg transition-shadow duration-400"
                style={{ aspectRatio: '4/3' }}
                onClick={() => setSelected(project)}
              >
                <Image src={project.image_url?.startsWith('http') ? project.image_url : 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=900&q=80'} alt={project.title} fill className="object-cover transition-transform duration-700 group-hover:scale-105" sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" />
                <div className="absolute inset-0 bg-gradient-to-t from-charcoal/85 via-charcoal/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-350" />
                <div className="absolute top-4 right-4 bg-charcoal/70 backdrop-blur-sm text-cream/80 text-xs px-3 py-1 rounded-full border border-cream/15">{project.category}</div>
                <div className="absolute top-4 left-4 w-9 h-9 bg-gold rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 scale-75 group-hover:scale-100">
                  <ZoomIn size={16} className="text-cream" />
                </div>
                <div className="absolute bottom-0 right-0 left-0 p-6 translate-y-3 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-350">
                  <h3 className="text-cream font-heading text-xl mb-1">{project.title}</h3>
                  <p className="text-cream/65 text-sm line-clamp-2 leading-relaxed">{project.description}</p>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>

      <AnimatePresence>
        {selected && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-50 bg-charcoal/96 backdrop-blur-sm flex items-center justify-center p-4" onClick={() => setSelected(null)}>
            <motion.div initial={{ scale: 0.88, opacity: 0, y: 20 }} animate={{ scale: 1, opacity: 1, y: 0 }} exit={{ scale: 0.88, opacity: 0 }} transition={{ type: 'spring', damping: 25 }} className="bg-white rounded-3xl overflow-hidden max-w-2xl w-full max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
              <div className="relative" style={{ aspectRatio: '16/9' }}>
                <Image src={selected.image_url?.startsWith('http') ? selected.image_url : 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=900&q=80'} alt={selected.title} fill className="object-cover" sizes="(max-width: 768px) 100vw, 672px" />
              </div>
              <div className="p-8">
                <div className="flex items-start justify-between gap-4 mb-4">
                  <div>
                    <span className="text-gold text-xs font-semibold tracking-wide uppercase">{selected.category}</span>
                    <h3 className="font-heading text-2xl text-charcoal mt-1">{selected.title}</h3>
                  </div>
                  <button onClick={() => setSelected(null)} className="w-9 h-9 flex-shrink-0 bg-cream rounded-full flex items-center justify-center hover:bg-gold/15 transition-colors">
                    <X size={17} className="text-charcoal" />
                  </button>
                </div>
                <p className="text-charcoal/65 leading-relaxed mb-6">{selected.description}</p>
                <div className="flex gap-8 pt-5 border-t border-charcoal/8">
                  <div className="flex items-center gap-2">
                    <Layers size={16} className="text-gold" />
                    <div>
                      <div className="text-xs text-charcoal/45 mb-0.5">חומר</div>
                      <div className="font-semibold text-charcoal text-sm">{selected.material}</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock size={16} className="text-gold" />
                    <div>
                      <div className="text-xs text-charcoal/45 mb-0.5">זמן ייצור</div>
                      <div className="font-semibold text-charcoal text-sm">{selected.duration}</div>
                    </div>
                  </div>
                </div>
                <a href="#contact" onClick={() => setSelected(null)} className="mt-6 w-full block text-center bg-gold hover:bg-gold-light text-cream font-semibold py-3.5 rounded-xl transition-colors">
                  הזמינו פרויקט דומה
                </a>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}
