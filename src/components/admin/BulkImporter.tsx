'use client'

import { useState, useRef } from 'react'
import { createClient } from '@/lib/supabase'
import { Upload, X, Check, Loader2, Save } from 'lucide-react'

const CATEGORIES = ['פרגולות', 'פרגולה הצללה', 'דקים', 'גדרות', 'ריהוט גן', 'פרויקטים מיוחדים']
const BUCKET = 'SSSS'

interface Item {
  id: string
  file: File
  preview: string
  title: string
  category: string
  material: string
  duration: string
  description: string
  status: 'idle' | 'uploading' | 'done' | 'error'
  error?: string
}

const inputCls = 'w-full border border-charcoal/12 rounded-lg px-3 py-2 text-sm text-charcoal placeholder-charcoal/30 focus:outline-none focus:border-gold focus:ring-1 focus:ring-gold/15 bg-white'

export default function BulkImporter({ onDone }: { onDone: () => void }) {
  const [items, setItems] = useState<Item[]>([])
  const [saving, setSaving] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)
  const supabase = createClient()

  const handleFiles = (files: FileList | null) => {
    if (!files || files.length === 0) return
    const newItems: Item[] = Array.from(files)
      .filter(f => f.type.startsWith('image/'))
      .map(file => ({
        id: `${Date.now()}_${Math.random().toString(36).slice(2)}`,
        file,
        preview: URL.createObjectURL(file),
        title: '',
        category: 'פרגולות',
        material: '',
        duration: '',
        description: '',
        status: 'idle',
      }))
    setItems(prev => [...prev, ...newItems])
  }

  const update = (id: string, field: keyof Item, value: string) =>
    setItems(prev => prev.map(i => i.id === id ? { ...i, [field]: value } : i))

  const remove = (id: string) => {
    setItems(prev => {
      const item = prev.find(i => i.id === id)
      if (item) URL.revokeObjectURL(item.preview)
      return prev.filter(i => i.id !== id)
    })
  }

  const saveAll = async () => {
    const ready = items.filter(i => i.status === 'idle' && i.title)
    if (!ready.length) return
    setSaving(true)

    for (const item of ready) {
      setItems(prev => prev.map(i => i.id === item.id ? { ...i, status: 'uploading' } : i))

      try {
        const ext = item.file.name.split('.').pop() || 'jpg'
        const path = `projects/${Date.now()}_${Math.random().toString(36).slice(2)}.${ext}`

        const { error: uploadErr } = await supabase.storage
          .from(BUCKET)
          .upload(path, item.file, { upsert: true, cacheControl: '31536000' })
        if (uploadErr) throw new Error(uploadErr.message)

        const { data: urlData } = supabase.storage.from(BUCKET).getPublicUrl(path)

        const { error: insertErr } = await supabase.from('projects').insert({
          title: item.title,
          description: item.description,
          material: item.material,
          duration: item.duration,
          category: item.category,
          image_url: urlData.publicUrl,
          featured: false,
          order_index: Date.now(),
        })
        if (insertErr) throw new Error(insertErr.message)

        setItems(prev => prev.map(i => i.id === item.id ? { ...i, status: 'done' } : i))
      } catch (e) {
        const msg = e instanceof Error ? e.message : 'שגיאה'
        setItems(prev => prev.map(i => i.id === item.id ? { ...i, status: 'error', error: msg } : i))
      }
    }

    setSaving(false)
  }

  const readyCount = items.filter(i => i.status === 'idle' && i.title).length
  const doneCount = items.filter(i => i.status === 'done').length
  const allDone = items.length > 0 && items.every(i => i.status === 'done')

  return (
    <div className="space-y-4" dir="rtl">
      {/* Drop zone */}
      <div
        className="border-2 border-dashed border-charcoal/20 hover:border-gold/60 rounded-2xl p-10 text-center cursor-pointer transition-all hover:bg-gold/4 group"
        onClick={() => inputRef.current?.click()}
        onDragOver={e => e.preventDefault()}
        onDrop={e => { e.preventDefault(); handleFiles(e.dataTransfer.files) }}
      >
        <Upload size={28} className="mx-auto mb-3 text-charcoal/30 group-hover:text-gold transition-colors" />
        <p className="text-charcoal/70 font-medium mb-1">גרור תמונות לכאן או לחץ לבחירה</p>
        <p className="text-charcoal/35 text-sm">ניתן לבחור מספר תמונות בבת אחת</p>
        <input
          ref={inputRef}
          type="file"
          multiple
          accept="image/*"
          className="hidden"
          onChange={e => handleFiles(e.target.files)}
        />
      </div>

      {/* Items */}
      {items.map(item => (
        <div
          key={item.id}
          className={`bg-white rounded-2xl border overflow-hidden ${
            item.status === 'done' ? 'border-green-300' :
            item.status === 'error' ? 'border-red-300' :
            'border-charcoal/10'
          }`}
        >
          <div className="flex gap-4 p-4">
            {/* Thumbnail */}
            <div className="relative w-28 h-28 rounded-xl overflow-hidden flex-shrink-0 bg-cream">
              <img src={item.preview} alt="" className="w-full h-full object-cover" />
              {item.status === 'uploading' && (
                <div className="absolute inset-0 bg-charcoal/60 flex items-center justify-center">
                  <Loader2 size={22} className="animate-spin text-gold" />
                </div>
              )}
              {item.status === 'done' && (
                <div className="absolute inset-0 bg-green-500/75 flex items-center justify-center">
                  <Check size={28} className="text-white" />
                </div>
              )}
            </div>

            {/* Fields */}
            <div className="flex-1 min-w-0">
              {item.status === 'done' && (
                <div className="py-3">
                  <p className="font-semibold text-charcoal">{item.title}</p>
                  <span className="inline-block mt-2 text-xs bg-green-50 text-green-600 px-2 py-0.5 rounded-full">נשמר ✓</span>
                </div>
              )}

              {item.status === 'error' && (
                <div className="py-3">
                  <p className="text-red-500 text-sm font-medium mb-1">שגיאה בשמירה</p>
                  <p className="text-red-400 text-xs">{item.error}</p>
                  <button
                    onClick={() => setItems(prev => prev.map(i => i.id === item.id ? { ...i, status: 'idle', error: undefined } : i))}
                    className="mt-2 text-xs text-charcoal/50 hover:text-gold underline"
                  >
                    נסה שוב
                  </button>
                </div>
              )}

              {(item.status === 'idle' || item.status === 'uploading') && (
                <div className="grid grid-cols-2 gap-2">
                  <input
                    value={item.title}
                    onChange={e => update(item.id, 'title', e.target.value)}
                    placeholder="כותרת *"
                    className={inputCls}
                    disabled={item.status === 'uploading'}
                  />
                  <select
                    value={item.category}
                    onChange={e => update(item.id, 'category', e.target.value)}
                    className={inputCls}
                    disabled={item.status === 'uploading'}
                  >
                    {CATEGORIES.map(c => <option key={c}>{c}</option>)}
                  </select>
                  <input
                    value={item.material}
                    onChange={e => update(item.id, 'material', e.target.value)}
                    placeholder="חומר (אורן, אלון...)"
                    className={inputCls}
                    disabled={item.status === 'uploading'}
                  />
                  <input
                    value={item.duration}
                    onChange={e => update(item.id, 'duration', e.target.value)}
                    placeholder="זמן ביצוע"
                    className={inputCls}
                    disabled={item.status === 'uploading'}
                  />
                  <textarea
                    value={item.description}
                    onChange={e => update(item.id, 'description', e.target.value)}
                    placeholder="תיאור קצר (אופציונלי)"
                    rows={2}
                    className={`${inputCls} col-span-2 resize-none`}
                    disabled={item.status === 'uploading'}
                  />
                </div>
              )}
            </div>

            {/* Remove */}
            {item.status !== 'uploading' && (
              <button
                onClick={() => remove(item.id)}
                className="flex-shrink-0 w-7 h-7 rounded-lg bg-cream hover:bg-red-50 flex items-center justify-center transition-colors self-start"
              >
                <X size={13} className="text-charcoal/40" />
              </button>
            )}
          </div>
        </div>
      ))}

      {/* Bottom bar */}
      {items.length > 0 && (
        <div className="sticky bottom-0 bg-white/95 backdrop-blur-sm border border-charcoal/10 rounded-2xl px-5 py-4 flex items-center justify-between shadow-lg">
          <div className="text-sm text-charcoal/50 flex gap-4">
            {readyCount > 0 && <span>✏️ מוכן לשמירה: {readyCount}</span>}
            {doneCount > 0 && <span className="text-green-600">✅ נשמר: {doneCount}</span>}
            {items.filter(i => i.status === 'idle' && !i.title).length > 0 && (
              <span className="text-amber-500">⚠️ חסרה כותרת בחלק מהתמונות</span>
            )}
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
              שמור ({readyCount})
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
