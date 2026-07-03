'use client'

import { useRef, useState } from 'react'
import { createClient } from '@/lib/supabase'
import { X, Loader2, Video, Scissors } from 'lucide-react'

const BUCKET = 'SSSS'
const MAX_BYTES = 50 * 1024 * 1024 // 50 MB

interface VideoUploaderProps {
  value: string
  onChange: (url: string) => void
}

export default function VideoUploader({ value, onChange }: VideoUploaderProps) {
  const [uploading, setUploading] = useState(false)
  const [compressing, setCompressing] = useState(false)
  const [error, setError] = useState('')
  const [dragging, setDragging] = useState(false)
  const [progress, setProgress] = useState(0)
  const [status, setStatus] = useState('')
  const inputRef = useRef<HTMLInputElement>(null)
  const supabase = createClient()

  const compressVideo = async (file: File): Promise<File> => {
    const { FFmpeg } = await import('@ffmpeg/ffmpeg')
    const { fetchFile, toBlobURL } = await import('@ffmpeg/util')

    const ffmpeg = new FFmpeg()
    ffmpeg.on('progress', ({ progress }: { progress: number }) => {
      setProgress(Math.round(progress * 85))
    })

    setStatus('טוען מנוע דחיסה (חד-פעמי, עשוי לקחת כחצי דקה)...')
    const base = 'https://unpkg.com/@ffmpeg/core@0.12.6/dist/umd'
    await ffmpeg.load({
      coreURL: await toBlobURL(`${base}/ffmpeg-core.js`, 'text/javascript'),
      wasmURL: await toBlobURL(`${base}/ffmpeg-core.wasm`, 'application/wasm'),
    })

    const ext = file.name.split('.').pop() || 'mp4'
    const inputName = `input.${ext}`
    setStatus('דוחס סרטון...')
    await ffmpeg.writeFile(inputName, await fetchFile(file))

    await ffmpeg.exec([
      '-i', inputName,
      '-c:v', 'libx264', '-crf', '30', '-preset', 'faster',
      '-c:a', 'aac', '-b:a', '96k',
      '-movflags', '+faststart',
      'output.mp4',
    ])

    const data = await ffmpeg.readFile('output.mp4')
    return new File([data as ArrayBuffer], 'compressed.mp4', { type: 'video/mp4' })
  }

  const upload = async (file: File) => {
    if (!file.type.startsWith('video/')) {
      setError('יש לבחור קובץ וידאו בלבד')
      return
    }

    setError('')
    setProgress(0)

    let fileToUpload = file

    if (file.size > MAX_BYTES) {
      setCompressing(true)
      try {
        fileToUpload = await compressVideo(file)
      } catch (e) {
        setError(`שגיאה בדחיסה: ${e}`)
        setCompressing(false)
        return
      }
      setCompressing(false)
    }

    setUploading(true)
    setStatus('מעלה סרטון...')
    setProgress(90)

    const path = `videos/${Date.now()}.mp4`
    const { error: uploadError } = await supabase.storage
      .from(BUCKET)
      .upload(path, fileToUpload, { cacheControl: '3600', upsert: true })

    if (uploadError) {
      setError(`שגיאה בהעלאה: ${uploadError.message}`)
      setUploading(false)
      return
    }

    const { data } = supabase.storage.from(BUCKET).getPublicUrl(path)
    onChange(data.publicUrl)
    setUploading(false)
    setProgress(100)
    setStatus('')
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setDragging(false)
    const file = e.dataTransfer.files[0]
    if (file) upload(file)
  }

  const busy = uploading || compressing

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
        onClick={() => !busy && inputRef.current?.click()}
        onDragOver={(e) => { e.preventDefault(); setDragging(true) }}
        onDragLeave={() => setDragging(false)}
        onDrop={handleDrop}
        className={`border-2 border-dashed rounded-xl p-5 text-center transition-all ${
          busy ? 'cursor-default' : 'cursor-pointer'
        } ${dragging ? 'border-gold bg-gold/8' : 'border-charcoal/15 hover:border-gold/50 hover:bg-cream/60'}`}
      >
        {busy ? (
          <div className="flex flex-col items-center gap-2 text-charcoal/50">
            {compressing
              ? <Scissors size={24} className="text-gold animate-pulse" />
              : <Loader2 size={24} className="animate-spin text-gold" />
            }
            <span className="text-sm">{status}</span>
            <div className="w-full bg-charcoal/10 rounded-full h-1.5 mt-1">
              <div
                className="bg-gold h-1.5 rounded-full transition-all duration-500"
                style={{ width: `${progress}%` }}
              />
            </div>
            <span className="text-xs text-charcoal/30">{progress}%</span>
          </div>
        ) : (
          <div className="flex flex-col items-center gap-2 text-charcoal/40">
            <Video size={24} className="opacity-50" />
            <div className="text-sm">
              <span className="text-gold font-medium">לחצו לבחירת סרטון</span>
              <span> או גררו לכאן</span>
            </div>
            <span className="text-xs text-charcoal/30">MP4, MOV, WEBM · סרטונים מעל 50MB יידחסו אוטומטית</span>
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
