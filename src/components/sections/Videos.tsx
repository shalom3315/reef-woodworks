'use client'

import { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Play, X, Maximize2 } from 'lucide-react'

interface VideoItem {
  id: string
  title: string
  description: string
  video_url: string
  order_index: number
}

export default function Videos({ videos }: { videos: VideoItem[] }) {
  const [active, setActive] = useState<VideoItem | null>(null)

  if (!videos || videos.length === 0) return null

  return (
    <section id="videos" className="py-24 bg-charcoal" dir="rtl">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center mb-14"
        >
          <span className="text-gold text-sm font-medium tracking-widest uppercase block mb-3">
            מאחורי הקלעים
          </span>
          <h2 className="font-heading text-4xl md:text-5xl text-cream mb-4">
            תהליך היצירה
          </h2>
          <p className="text-cream/50 text-lg max-w-xl mx-auto">
            צפו בעבודה מקרוב – מהחומר הגולמי ועד המוצר המוגמר
          </p>
        </motion.div>

        <div className={`grid gap-6 ${videos.length === 1 ? 'max-w-3xl mx-auto' : videos.length === 2 ? 'md:grid-cols-2 max-w-4xl mx-auto' : 'md:grid-cols-2 lg:grid-cols-3'}`}>
          {videos.map((v, i) => (
            <VideoCard key={v.id} video={v} index={i} onOpen={() => setActive(v)} />
          ))}
        </div>
      </div>

      {/* מודל מסך מלא */}
      <AnimatePresence>
        {active && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black/95 flex flex-col items-center justify-center p-4"
            onClick={() => setActive(null)}
          >
            <motion.div
              initial={{ scale: 0.92, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.92, opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="w-full max-w-5xl"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between mb-3 px-1">
                <h3 className="text-cream font-heading text-xl">{active.title}</h3>
                <button
                  onClick={() => setActive(null)}
                  className="w-9 h-9 bg-cream/10 hover:bg-cream/20 rounded-full flex items-center justify-center transition-colors"
                >
                  <X size={18} className="text-cream" />
                </button>
              </div>
              <video
                src={active.video_url}
                controls
                autoPlay
                playsInline
                className="w-full rounded-2xl max-h-[75vh] bg-black"
              />
              {active.description && (
                <p className="text-cream/50 text-sm mt-3 px-1">{active.description}</p>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}

function VideoCard({ video, index, onOpen }: { video: VideoItem; index: number; onOpen: () => void }) {
  const ref = useRef<HTMLVideoElement>(null)

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.15 }}
      className="group bg-black rounded-2xl overflow-hidden border border-cream/8 hover:border-gold/40 transition-all cursor-pointer"
      onClick={onOpen}
    >
      {/* תצוגה מקדימה — גובה גדול */}
      <div className="relative w-full bg-black" style={{ aspectRatio: '16/10' }}>
        <video
          ref={ref}
          src={video.video_url}
          className="w-full h-full object-cover"
          preload="metadata"
          playsInline
          muted
        />
        {/* שכבת hover */}
        <div className="absolute inset-0 bg-black/30 group-hover:bg-black/50 transition-colors flex items-center justify-center">
          <div className="flex flex-col items-center gap-3">
            <div className="w-16 h-16 rounded-full bg-gold group-hover:bg-gold-light flex items-center justify-center shadow-2xl transition-all group-hover:scale-110 duration-300">
              <Play size={24} className="text-cream ms-1" />
            </div>
            <div className="flex items-center gap-1.5 bg-black/50 backdrop-blur-sm px-3 py-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
              <Maximize2 size={12} className="text-cream/70" />
              <span className="text-cream/70 text-xs">פתח מסך מלא</span>
            </div>
          </div>
        </div>
      </div>

      <div className="p-5">
        <h3 className="font-heading text-lg text-cream mb-1">{video.title}</h3>
        {video.description && (
          <p className="text-cream/45 text-sm leading-relaxed">{video.description}</p>
        )}
      </div>
    </motion.div>
  )
}
