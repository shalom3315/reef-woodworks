'use client'

import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { Play, Pause } from 'lucide-react'

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

        <div className={`grid gap-8 ${videos.length === 1 ? 'max-w-2xl mx-auto' : videos.length === 2 ? 'md:grid-cols-2 max-w-4xl mx-auto' : 'md:grid-cols-2 lg:grid-cols-3'}`}>
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

  const toggle = () => {
    if (!ref.current) return
    if (playing) {
      ref.current.pause()
      setPlaying(false)
    } else {
      ref.current.play()
      setPlaying(true)
    }
  }

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const onEnd = () => setPlaying(false)
    el.addEventListener('ended', onEnd)
    return () => el.removeEventListener('ended', onEnd)
  }, [])

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.15 }}
      className="group bg-charcoal-dark rounded-2xl overflow-hidden border border-cream/8 hover:border-gold/30 transition-colors"
    >
      <div className="relative aspect-video bg-black cursor-pointer" onClick={toggle}>
        <video
          ref={ref}
          src={video.video_url}
          className="w-full h-full object-cover"
          preload="metadata"
          playsInline
        />
        <div className={`absolute inset-0 flex items-center justify-center transition-opacity ${playing ? 'opacity-0 group-hover:opacity-100' : 'opacity-100'}`}>
          <div className="w-14 h-14 rounded-full bg-gold/90 backdrop-blur-sm flex items-center justify-center shadow-xl">
            {playing
              ? <Pause size={20} className="text-cream" />
              : <Play size={20} className="text-cream ms-1" />
            }
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
