'use client'

import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { Play } from 'lucide-react'

interface VideoItem {
  id: string
  title: string
  description: string
  video_url: string
  order_index: number
}

export default function Videos({ videos }: { videos: VideoItem[] }) {
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

        <div className={`grid gap-6 ${videos.length === 1 ? 'max-w-3xl mx-auto' : 'md:grid-cols-2 max-w-5xl mx-auto'}`}>
          {videos.map((v, i) => (
            <VideoCard key={v.id} video={v} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}

function VideoCard({ video, index }: { video: VideoItem; index: number }) {
  const ref = useRef<HTMLVideoElement>(null)
  const [playing, setPlaying] = useState(false)

  // Seek to 1s on metadata load to show a real thumbnail frame (not black)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const onMeta = () => { el.currentTime = 1 }
    el.addEventListener('loadedmetadata', onMeta)
    return () => el.removeEventListener('loadedmetadata', onMeta)
  }, [])

  const handlePlay = () => {
    const el = ref.current
    if (!el) return
    el.muted = false
    el.currentTime = 0
    el.play().catch(() => {
      el.muted = true
      el.play()
    })
    setPlaying(true)
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.15 }}
      className="group bg-black rounded-2xl overflow-hidden border border-cream/8 hover:border-gold/40 transition-colors"
    >
      <div className="relative w-full bg-black" style={{ aspectRatio: '16/10' }}>
        <video
          ref={ref}
          src={`${video.video_url}#t=1`}
          className={`w-full h-full ${playing ? 'object-contain bg-black' : 'object-cover'}`}
          preload="metadata"
          playsInline
          muted
          controls={playing}
          onEnded={() => setPlaying(false)}
        />
        {!playing && (
          <div
            className="absolute inset-0 bg-black/40 hover:bg-black/55 transition-colors flex items-center justify-center cursor-pointer"
            onClick={handlePlay}
          >
            <div className="w-16 h-16 rounded-full bg-gold hover:bg-gold-light flex items-center justify-center shadow-2xl transition-all hover:scale-110 duration-300">
              <Play size={24} className="text-cream ms-1" />
            </div>
          </div>
        )}
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
