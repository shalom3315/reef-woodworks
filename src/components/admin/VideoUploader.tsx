'use client'

import { useRef, useState } from 'react'
import { createClient } from '@/lib/supabase'
import { Upload, X, Loader2, Video } from 'lucide-react'

const BUCKET = 'SSSS'

interface VideoUploaderProps {
  value: string
  onChange: (url: string) => void
}

export default function VideoUploader({ value, onChange }: VideoUploaderProps) {
  const [uploading, setUploading] = useState(false)
  const [error, setError] = useState('')
  const [dragging, setDragging] = useState(false)
  const [progress, setProgress] = useState(0)
  const inputRef = useRef<HTMLInputElement>(null)
  const supabase = createClient()

  const upload = async (file: File) => {
    if (!file.type.startsWith('video/')) {
      setError('יש לבחור קובץ וידאו בלבד')
      return
    }
    if (file.size > 200 * 1024 * 1024) {
      setError('הקובץ גדול מדי (מקסימום 200MB)')
      return
    }

    setUploading(true)
    setError('')
    setProgress(0)

    const ext = file.name.split('.').pop()
    const path = `videos/${Date.now()}.${ext}`

    const { error: uploadError } = await supabase.storage
      .from(BUCKET)
      .upload(path, file, { cacheControl: '3600', upsert: true })

    if (uploadError) {
      setError(`שגיאה בהעלאה: ${uploadError.message}`)
      setUploading(false)
      return
    }

    const { data } = supabase.storage.from(BUCKET).getPublicUrl(path)
    onChange(data.publicUrl)
    setUploading(false)
    setProgress(100)
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setDragging(false)
    const file = e.dataTransfer.files[0]
    if (file) upload(file)
  }

  return (
    <div className="space-y-2">
      {value && (
        <div className="relative rounded-xl overflow-hidden border border-charcoal/10 bg-black">
          <video src={value} controls className="w-full max-h-48 object-contain" />
          <button
            onClick={() => onChange('')}
            className="absolute top-2 left-2 w-7 h-7 bg-charcoal/70 hover:bg-charcoal rounded-full flex items-center justify-center transition-colors"
          >
            <X size={13} className="text-white" />
          </button>
        </div>
      )}

      <div
        onClick={() => inputRef.current?.click()}
        onDragOver={(e) => { e.preventDefault(); setDragging(true) }}
        onDragLeave={() => setDragging(false)}
        onDrop={handleDrop}
        className={`border-2 border-dashed rounded-xl p-5 text-center cursor-pointer transition-all ${
          dragging ? 'border-gold bg-gold/8' : 'border-charcoal/15 hover:border-gold/50 hover:bg-cream/60'
        }`}
      >
        {uploading ? (
          <div className="flex flex-col items-center gap-2 text-charcoal/50">
            <Loader2 size={24} className="animate-spin text-gold" />
            <span className="text-sm">מעלה סרטון... (עשוי לקחת כמה שניות)</span>
          </div>
        ) : (
          <div className="flex flex-col items-center gap-2 text-charcoal/40">
            <Video size={24} className="opacity-50" />
            <div className="text-sm">
              <span className="text-gold font-medium">לחצו לבחירת סרטון</span>
              <span> או גררו לכאן</span>
            </div>
            <span className="text-xs text-charcoal/30">MP4, MOV, WEBM · עד 200MB</span>
          </div>
        )}
      </div>

      <input
        ref={inputRef}
        type="file"
        accept="video/*"
        className="hidden"
        onChange={(e) => { const f = e.target.files?.[0]; if (f) upload(f) }}
      />

      {error && (
        <p className="text-red-500 text-xs flex items-center gap-1.5">
          <X size={12} />{error}
        </p>
      )}
    </div>
  )
}
