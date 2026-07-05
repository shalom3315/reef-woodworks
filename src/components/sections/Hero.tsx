'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import { ChevronDown } from 'lucide-react'
import { useEditContext } from '@/contexts/EditContext'
import { EditField } from '@/components/EditField'

export default function Hero() {
  const { editing, draft } = useEditContext()

  const badge = draft.hero_badge || 'נגרות בהתאמה אישית · עבודת יד'
  const title = draft.hero_title || 'עבודות עץ בהתאמה אישית'
  const subtitle = draft.hero_subtitle || 'רהיטים, שולחנות ופתרונות עץ בעבודת יד מקצועית.'
  const statYears = draft.stat_years || '15+'
  const statProjects = draft.stat_projects || '200+'
  const statHandmade = draft.stat_handmade || '100%'
  const heroImage = (draft.hero_image && draft.hero_image.startsWith('http')) ? draft.hero_image : '/hero.jpg'
  const heroVideo = (draft.hero_video && draft.hero_video.startsWith('http')) ? draft.hero_video : null

  return (
    <section className="relative h-screen min-h-[720px] flex items-center overflow-hidden">
      {heroVideo ? (
        <video
          src={heroVideo}
          autoPlay
          muted
          loop
          playsInline
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 min-w-full min-h-full"
          style={{ width: 'auto', height: 'auto' }}
        />
      ) : (
        <Image
          src={heroImage}
          alt="Reef Woodworks – עבודת יד מקצועית"
          fill
          className="object-cover object-center"
          priority
          sizes="100vw"
        />
      )}
      <div className="absolute inset-0 bg-gradient-to-b from-charcoal/75 via-charcoal/45 to-charcoal/85" />
      <div className="absolute inset-0 bg-gradient-to-l from-transparent to-charcoal/30" />


      <div className="relative z-10 max-w-7xl mx-auto px-6 w-full pt-20">
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1 }} className="max-w-2xl">
          {/* Vintage badge */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="flex items-center gap-3 mb-7"
          >
            <div className="h-px flex-1 bg-gold/40" />
            <span className="text-gold text-xs tracking-[0.3em] uppercase font-body">
              {editing
                ? <EditField fieldKey="hero_badge" className="text-gold text-xs tracking-[0.3em]" placeholder="טקסט הבאנר" />
                : badge
              }
            </span>
            <div className="h-px flex-1 bg-gold/40" />
          </motion.div>

          {/* Main title */}
          <motion.h1
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.45, duration: 0.8 }}
            className="font-heading text-5xl md:text-6xl lg:text-7xl text-cream leading-[1.15] mb-4"
            style={{ textShadow: '2px 2px 12px rgba(0,0,0,0.6)' }}
          >
            {editing
              ? <EditField fieldKey="hero_title" className="font-heading text-5xl md:text-6xl lg:text-7xl text-cream leading-[1.15]" placeholder="כותרת ראשית" />
              : title
            }
          </motion.h1>

          {/* Decorative divider */}
          <motion.div
            initial={{ opacity: 0, scaleX: 0 }}
            animate={{ opacity: 1, scaleX: 1 }}
            transition={{ delay: 0.6, duration: 0.6 }}
            className="flex items-center gap-3 mb-4 origin-right"
          >
            <div className="h-[2px] w-12 bg-gold" />
            <span className="text-gold text-lg">✦</span>
            <div className="h-[2px] w-6 bg-gold/50" />
          </motion.div>

          {/* Subtitle */}
          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.7 }}
            className="font-heading text-2xl md:text-3xl text-gold/90 mb-3 font-normal tracking-wide"
          >
            איכות שנשארת לשנים
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.85, duration: 0.6 }}
            className="text-cream/60 text-base leading-relaxed mb-8 max-w-md font-body tracking-wide border-r-2 border-gold/30 pr-4"
          >
            {editing
              ? <EditField fieldKey="hero_subtitle" className="text-cream/60 text-base leading-relaxed" placeholder="תיאור קצר" multiline />
              : subtitle
            }
          </motion.p>

          {/* Buttons — vintage style */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.0, duration: 0.7 }}
            className="flex flex-wrap gap-4"
          >
            <a
              href="#contact"
              className="inline-flex items-center gap-2 bg-gold hover:bg-gold-light text-charcoal font-heading font-bold px-8 py-3.5 text-base tracking-wider transition-all duration-300 hover:shadow-2xl hover:shadow-gold/40 hover:-translate-y-0.5"
              style={{ clipPath: 'polygon(8px 0%, 100% 0%, calc(100% - 8px) 100%, 0% 100%)' }}
            >
              קבל הצעת מחיר
            </a>
            <a
              href="#gallery"
              className="inline-flex items-center gap-2 border border-cream/50 hover:border-gold text-cream hover:text-gold font-heading font-semibold px-8 py-3.5 text-base tracking-wider transition-all duration-300"
              style={{ clipPath: 'polygon(8px 0%, 100% 0%, calc(100% - 8px) 100%, 0% 100%)' }}
            >
              צפה בגלריה
            </a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2 }}
            className="flex items-center gap-6 mt-12 pt-8 border-t border-cream/15"
          >
            {[
              { key: 'stat_years', val: statYears, label: 'שנות ניסיון' },
              { key: 'stat_projects', val: statProjects, label: 'פרויקטים' },
              { key: 'stat_handmade', val: statHandmade, label: 'עבודת יד' },
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                {editing
                  ? <EditField fieldKey={stat.key} className="text-gold font-heading text-2xl font-bold text-center" placeholder={stat.val} />
                  : <div className="text-gold font-heading text-2xl font-bold">{stat.val}</div>
                }
                <div className="text-cream/50 text-xs mt-0.5">{stat.label}</div>
              </div>
            ))}
          </motion.div>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5 text-cream/40"
      >
        <span className="text-xs tracking-widest uppercase font-body">גלול</span>
        <motion.div animate={{ y: [0, 8, 0] }} transition={{ repeat: Infinity, duration: 1.8 }}>
          <ChevronDown size={20} />
        </motion.div>
      </motion.div>
    </section>
  )
}
