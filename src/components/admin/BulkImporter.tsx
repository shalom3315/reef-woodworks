'use client'

import { useState, useCallback } from 'react'
import { createClient } from '@/lib/supabase'
import { Upload, X, Check, Loader2, Wand2, Save, RefreshCw } from 'lucide-react'

interface ImageItem {
  id: string
  file: File
  preview: string
  status: 'analyzing' | 'ready' | 'uploading' | 'done' | 'error'
  title: string
  description: string
  material: string
  duration: string
  category: string
  error?: string
}

const CATEGORIES = ['ריהוט', 'שולחנות', 'חדר שינה', 'מטבח', 'ריהוט גן', 'חיצוני', 'אחר']

async function toBase64(file: File): Promise<string> {
  return new Promise((resolve) => {
    const reader = new FileReader()
    reader.onload = () => {
      const result = reader.result as string
      resolve(result.split(',')[1])
    }
    reader.readAsDataURL(file)
  })
}

export default function BulkImporter({ onDone }: { onDone: () => void }) {
  const [items, setItems] = useState<ImageItem[]>([])
  const [saving, setSaving] = useState(false)
  const supabase = createClient()

  const analyzeImage = useCallback(async (item: ImageItem) => {
    try {
      const base64 = await toBase64(item.file)
      const res = await fetch('/api/describe-image', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ base64, mediaType: item.file.type }),
      })
      const data = await res.json()
      setItems(prev => prev.map(i => i.id === item.id ? {
        ...i,
        status: 'ready',
        title: data.title || '',
        description: data.description || '',
        material: data.material || '',
        duration: data.duration || '',
        category: CATEGORIES.includes(data.category) ? data.category : 'ריהוט',
      } : i))
    } catch {
      setItems(prev => prev.map(i => i.id === item.id ? { ...i, status: 'error', error: 'שגיאה בניתוח AI' } : i))
    }
  }, [])

  const addFiles = useCallback(async (files: FileList) => {
    const newItems: ImageItem[] = Array.from(files)
      .filter(f => f.type.startsWith('image/'))
      .map(file => ({
        id: `${Date.now()}_${Math.random().toString(36).slice(2)}`,
        file,
        preview: URL.createObjectURL(file),
        status: 'analyzing' as const,
        title: '', description: '', material: '', duration: '', category: 'ריהוט',
      }))

    setItems(prev => [...prev, ...newItems])
    for (const item of newItems) analyzeImage(item)
  }, [analyzeImage])

  const update = (id: string, field: string, value: string) =>
    setItems(prev => prev.map(i => i.id === id ? { ...i, [field]: value } : i))

  const remove = (id: string) =>
    setItems(prev => prev.filter(i => i.id !== id))

  const retry = (item: ImageItem) => {
    setItems(prev => prev.map(i => i.id === item.id ? { ...i, status: 'analyzing', error: undefined } : i))
    analyzeImage(item)
  }

  const saveAll = async () => {
    const ready = items.filter(i => i.status === 'ready')
    if (!ready.length) return
    setSaving(true)

    for (const item of ready) {
      setItems(prev => prev.map(i => i.id === item.id ? { ...i, status: 'uploading' } : i))
      try {
        const path = `projects/${Date.now()}_${item.file.name.replace(/[^\w.-]/g, '_')}`
        const { error: uploadError } = await supabase.storage
          .from('SSSS')
          .upload(path, item.file, { upsert: true, cacheControl: '31536000' })
        if (uploadError) throw uploadError

        const { data: urlData } = supabase.storage.from('SSSS').getPublicUrl(path)

        const { error: insertError } = await supabase.from('projects').insert({
          title: item.title,
          description: item.description,
          material: item.material,
          duration: item.duration,
          image_url: urlData.publicUrl,
          category: item.category,
          featured: false,
          order_index: Date.now(),
        })
        if (insertError) throw insertError

        setItems(prev => prev.map(i => i.id === item.id ? { ...i, status: 'done' } : i))
      } catch (e: unknown) {
        const msg = e instanceof Error ? e.message : 'שגיאה'
        setItems(prev => prev.map(i => i.id === item.id ? { ...i, status: 'error', error: msg } : i))
      }
    }

    setSaving(false)
  }

  const allDone = items.length > 0 && items.every(i => i.status === 'done')
  const readyCount = items.filter(i => i.status === 'ready').length
  const doneCount = items.filter(i => i.status === 'done').length
  const analyzingCount = items.filter(i => i.status === 'analyzing').length

  return (
    <div className="space-y-5" dir="rtl">
      {/* Drop zone */}
      <div
        onDragOver={e => e.preventDefault()}
        onDrop={e => { e.preventDefault(); addFiles(e.dataTransfer.files) }}
        onClick={() => document.getElementById('bulk-file-input')?.click()}
        className="border-2 border-dashed border-charcoal/15 hover:border-gold/50 rounded-2xl p-10 text-center cursor-pointer transition-all hover:bg-cream/40 group"
      >
        <div className="w-14 h-14 bg-cream group-hover:bg-gold/10 rounded-2xl flex items-center justify-center mx-auto mb-4 transition-colors">
          <Upload size={24} className="text-charcoal/40 group-hover:text-gold transition-colors" />
        </div>
        <p className="text-charcoal/70 font-medium mb-1">גרור תמונות לכאן או לחץ לבחירה</p>
        <p className="text-charcoal/35 text-sm">ניתן לבחור מספר תמונות בבת אחת — AI יכתוב תיאור לכל אחת אוטומטית</p>
        <input
          id="bulk-file-input"
          type="file"
          multiple
          accept="image/*"
          className="hidden"
          onChange={e => e.target.files && addFiles(e.target.files)}
        />
      </div>

      {/* Status summary */}
      {items.length > 0 && analyzingCount > 0 && (
        <div className="flex items-center gap-2 bg-gold/8 border border-gold/20 rounded-xl px-4 py-3">
          <Wand2 size={16} className="text-gold animate-pulse" />
          <span className="text-charcoal/70 text-sm">AI מנתח {analyzingCount} תמונות...</span>
        </div>
      )}

      {/* Image cards */}
      {items.map(item => (
        <div key={item.id} className={`bg-white rounded-2xl border overflow-hidden transition-colors ${
          item.status === 'done' ? 'border-green-200' :
          item.status === 'error' ? 'border-red-200' :
          'border-charcoal/8'
        }`}>
          <div className="flex gap-4 p-4">
            {/* Thumbnail */}
            <div className="w-28 h-28 rounded-xl overflow-hidden flex-shrink-0 bg-cream relative">
              <img src={item.preview} alt="" className="w-full h-full object-cover" />
              {item.status === 'analyzing' && (
                <div className="absolute inset-0 bg-charcoal/60 flex flex-col items-center justify-center gap-1.5">
                  <Loader2 size={20} className="animate-spin text-gold" />
                  <span className="text-cream/80 text-[10px]">מנתח...</span>
                </div>
              )}
              {item.status === 'uploading' && (
                <div className="absolute inset-0 bg-charcoal/60 flex flex-col items-center justify-center gap-1.5">
                  <Loader2 size={20} className="animate-spin text-gold" />
                  <span className="text-cream/80 text-[10px]">שומר...</span>
                </div>
              )}
              {item.status === 'done' && (
                <div className="absolute inset-0 bg-green-500/70 flex items-center justify-center">
                  <Check size={28} className="text-white" />
                </div>
              )}
            </div>

            {/* Fields */}
            <div className="flex-1 min-w-0">
              {item.status === 'analyzing' && (
                <div className="flex items-center gap-2 py-8">
                  <Wand2 size={15} className="text-gold" />
                  <span className="text-charcoal/50 text-sm">AI כותב תיאור...</span>
                </div>
              )}

              {item.status === 'done' && (
                <div className="py-2">
                  <p className="font-semibold text-charcoal">{item.title}</p>
                  <p className="text-charcoal/50 text-sm mt-1 line-clamp-2">{item.description}</p>
                  <span className="inline-block mt-2 text-xs bg-green-50 text-green-600 px-2 py-0.5 rounded-full">נשמר ✓</span>
                </div>
              )}

              {item.status === 'error' && (
                <div className="py-2">
                  <p className="text-red-500 text-sm mb-2">{item.error}</p>
                  <button onClick={() => retry(item)} className="flex items-center gap-1.5 text-xs text-charcoal/50 hover:text-gold transition-colors">
                    <RefreshCw size={12} />
                    נסה שוב
                  </button>
                </div>
              )}

              {(item.status === 'ready') && (
                <div className="grid grid-cols-2 gap-2">
                  <input
                    value={item.title}
                    onChange={e => update(item.id, 'title', e.target.value)}
                    placeholder="כותרת"
                    className={inputCls}
                  />
                  <input
                    value={item.material}
                    onChange={e => update(item.id, 'material', e.target.value)}
                    placeholder="חומר"
                    className={inputCls}
                  />
                  <select
                    value={item.category}
                    onChange={e => update(item.id, 'category', e.target.value)}
                    className={inputCls}
                  >
                    {CATEGORIES.map(c => <option key={c}>{c}</option>)}
                  </select>
                  <input
                    value={item.duration}
                    onChange={e => update(item.id, 'duration', e.target.value)}
                    placeholder="זמן ייצור"
                    className={inputCls}
                  />
                  <textarea
                    value={item.description}
                    onChange={e => update(item.id, 'description', e.target.value)}
                    placeholder="תיאור"
                    rows={2}
                    className={`${inputCls} col-span-2 resize-none`}
                  />
                </div>
              )}
            </div>

            <button
              onClick={() => remove(item.id)}
              className="flex-shrink-0 w-7 h-7 bg-cream hover:bg-red-50 rounded-lg flex items-center justify-center transition-colors self-start"
            >
              <X size={13} className="text-charcoal/40" />
            </button>
          </div>
        </div>
      ))}

      {/* Bottom bar */}
      {items.length > 0 && (
        <div className="sticky bottom-0 bg-white/95 backdrop-blur-sm border border-charcoal/10 rounded-2xl p-4 flex items-center justify-between shadow-lg">
          <div className="text-sm text-charcoal/50">
            {analyzingCount > 0 && <span className="ml-3">⏳ מנתח {analyzingCount}</span>}
            {readyCount > 0 && <span className="ml-3">✏️ מוכן {readyCount}</span>}
            {doneCount > 0 && <span className="text-green-600">✅ נשמר {doneCount}</span>}
          </div>
          <div className="flex gap-3">
            {allDone && (
              <button onClick={onDone} className="px-4 py-2 text-sm text-charcoal/60 hover:text-charcoal transition-colors">
                סגור
              </button>
            )}
            <button
              onClick={saveAll}
              disabled={saving || readyCount === 0}
              className="flex items-center gap-2 bg-gold hover:bg-gold-light text-cream px-5 py-2.5 rounded-xl font-medium text-sm transition-colors disabled:opacity-40"
            >
              {saving ? <Loader2 size={15} className="animate-spin" /> : <Save size={15} />}
              שמור הכל ({readyCount})
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

const inputCls = 'w-full border border-charcoal/12 rounded-lg px-3 py-2 text-sm text-charcoal placeholder-charcoal/30 focus:outline-none focus:border-gold focus:ring-1 focus:ring-gold/15 bg-white'
