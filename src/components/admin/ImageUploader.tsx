'use client'

import { useRef, useState } from 'react'
import { createClient } from '@/lib/supabase'
import { Upload, X, Loader2, Image as ImageIcon } from 'lucide-react'

const BUCKET = 'SSSS'

interface ImageUploaderProps {
  value: string
  onChange: (url: string) => void
  folder?: string
}

export default function ImageUploader({ value, onChange, folder = 'general' }: ImageUploaderProps) {
  const [uploading, setUploading] = useState(false)
  const [error, setError] = useState('')
  const [dragging, setDragging] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)
  const supabase = createClient()

  const upload = async (file: File) => {
    if (!file.type.startsWith('image/')) {
      setError('יש לבחור קובץ תמונה בלבד')
      return
    }
    if (file.size > 10 * 1024 * 1024) {
      setError('הקובץ גדול מדי (מקסימום 10MB)')
      return
    }

    setUploading(true)
    setError('')

    const ext = file.name.split('.').pop()
    const path = `${folder}/${Date.now()}.${ext}`

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
  }

  const handleFile = (file: File | undefined) => {
    if (file) upload(file)
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setDragging(false)
    handleFile(e.dataTransfer.files[0])
  }

  return (
    <div className="space-y-2">
      {/* Preview */}
      {value && value.startsWith('http') && (
        <div className="relative rounded-xl overflow-hidden border border-charcoal/10 bg-cream" style={{ aspectRatio: '16/9' }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={value} alt="תצוגה מקדימה" className="w-full h-full object-cover" />
          <button
            onClick={() => onChange('')}
            className="absolute top-2 left-2 w-7 h-7 bg-charcoal/70 hover:bg-charcoal rounded-full flex items-center justify-center transition-colors"
          >
            <X size={13} className="text-white" />
          </button>
        </div>
      )}

      {/* Upload zone */}
      <div
        onClick={() => inputRef.current?.click()}
        onDragOver={(e) => { e.preventDefault(); setDragging(true) }}
        onDragLeave={() => setDragging(false)}
        onDrop={handleDrop}
        className={`border-2 border-dashed rounded-xl p-5 text-center cursor-pointer transition-all ${
          dragging
            ? 'border-gold bg-gold/8 scale-[1.01]'
            : 'border-charcoal/15 hover:border-gold/50 hover:bg-cream/60'
        }`}
      >
        {uploading ? (
          <div className="flex flex-col items-center gap-2 text-charcoal/50">
            <Loader2 size={24} className="animate-spin text-gold" />
            <span className="text-sm">מעלה...</span>
          </div>
        ) : (
          <div className="flex flex-col items-center gap-2 text-charcoal/40">
            {value && value.startsWith('http') ? (
              <Upload size={20} />
            ) : (
              <ImageIcon size={24} className="opacity-50" />
            )}
            <div className="text-sm">
              <span className="text-gold font-medium">לחצו לבחירת תמונה</span>
              <span> או גררו לכאן</span>
            </div>
            <span className="text-xs text-charcoal/30">JPG, PNG, WEBP · עד 10MB</span>
          </div>
        )}
      </div>

      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={(e) => handleFile(e.target.files?.[0])}
      />

      {error && (
        <p className="text-red-500 text-xs flex items-center gap-1.5">
          <X size={12} />
          {error}
        </p>
      )}
    </div>
  )
}
