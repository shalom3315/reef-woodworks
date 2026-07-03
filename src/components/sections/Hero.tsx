'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import { ChevronDown, Play } from 'lucide-react'
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
    <section className="relative z-[60] h-screen min-h-[720px] overflow-hidden">
      {heroVideo ? (
        <video
          src={heroVideo}
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 w-full h-full object-cover object-center"
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

      <div className="relative z-10 h-full flex flex-col justify-center max-w-7xl mx-auto px-6 w-full pt-20">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.1, duration: 0.7 }}
          className="flex justify-center mb-10"
        >
          <Image
            src="/logo.png"
            alt="Reef Woodworks"
            width={260}
            height={260}
            className="object-contain drop-shadow-2xl"
            priority
          />
        </motion.div>

        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1 }} className="max-w-2xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="inline-flex items-center gap-2.5 bg-gold/15 border border-gold/35 backdrop-blur-sm rounded-full px-5 py-2.5 mb-8"
          >
            <span className="w-2 h-2 rounded-full bg-gold animate-pulse" />
            {editing
              ? <EditField fieldKey="hero_badge" className="text-gold text-sm font-medium tracking-wide" placeholder="טקסט הבאנר" />
              : <span className="text-gold text-sm font-medium tracking-wide">{badge}</span>
            }
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.45, duration: 0.8 }}
            className="font-heading text-5xl md:text-6xl lg:text-7xl text-cream leading-[1.1] mb-6"
          >
            {editing
              ? <EditField fieldKey="hero_title" className="font-heading text-5xl md:text-6xl lg:text-7xl text-cream leading-[1.1]" placeholder="כותרת ראשית" />
              : title
            }
          </motion.h1>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.7 }}
            className="font-heading text-2xl md:text-3xl text-cream/80 mb-6 font-normal"
          >
            איכות שנשארת לשנים
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.75, duration: 0.7 }}
            className="text-cream/65 text-lg leading-relaxed mb-10 max-w-lg mx-auto"
          >
            {editing
              ? <EditField fieldKey="hero_subtitle" className="text-cream/65 text-lg leading-relaxed" placeholder="תיאור קצר" multiline />
              : subtitle
            }
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9, duration: 0.7 }}
            className="flex flex-wrap gap-4 justify-center"
          >
            <a href="#contact" className="inline-flex items-center gap-2 bg-gold hover:bg-gold-light text-cream font-semibold px-8 py-4 rounded-xl text-lg transition-all duration-300 hover:shadow-2xl hover:shadow-gold/35 hover:-translate-y-0.5">
              קבל הצעת מחיר
            </a>
            <a href="#gallery" className="inline-flex items-center gap-2 border-2 border-cream/40 hover:border-cream/80 text-cream font-semibold px-8 py-4 rounded-xl text-lg transition-all duration-300 hover:bg-cream/10 backdrop-blur-sm">
              צפה בעבודות
            </a>
            <a href="#videos" className="inline-flex items-center gap-2 text-cream/70 hover:text-cream font-medium px-4 py-4 text-lg transition-all duration-300">
              <div className="w-9 h-9 rounded-full border border-cream/40 flex items-center justify-center">
                <Play size={14} className="ms-0.5" />
              </div>
              גלריית וידאו
            </a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2 }}
            className="flex items-center justify-center gap-6 mt-12 pt-8 border-t border-cream/15"
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
