'use client'

import { useState, useRef, useCallback } from 'react'
import { Pencil, Check, X, Loader2 } from 'lucide-react'
import { EditContext } from '@/contexts/EditContext'
import type { SiteSettings } from '@/types'

export default function EditProvider({
  initialSettings,
  children,
}: {
  initialSettings: SiteSettings
  children: React.ReactNode
}) {
  const [editing, setEditing] = useState(false)
  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState(false)
  const [error, setError] = useState('')
  const [draft, setDraft] = useState<SiteSettings>({ ...initialSettings })
  const original = useRef<SiteSettings>({ ...initialSettings })

  const setField = useCallback((key: string, value: string) => {
    setDraft((d) => ({ ...d, [key]: value }))
  }, [])

  const startEditing = useCallback(() => {
    setEditing(true)
    setError('')
  }, [])

  const cancel = useCallback(() => {
    setDraft({ ...original.current })
    setEditing(false)
    setError('')
  }, [])

  const save = useCallback(async () => {
    setSaving(true)
    setError('')
    try {
      const res = await fetch('/api/settings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(draft),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error || 'שגיאה בשמירה')
      original.current = { ...draft }
      setEditing(false)
      setSaved(true)
      setTimeout(() => setSaved(false), 3000)
    } catch (e) {
      setError(String(e))
    } finally {
      setSaving(false)
    }
  }, [draft])

  return (
    <EditContext.Provider value={{ editing, saving, draft, setField, startEditing, cancel, save }}>
      {children}

      {/* Floating edit button */}
      {!editing && (
        <button
          onClick={startEditing}
          className="fixed bottom-8 left-8 z-50 flex items-center gap-2 bg-charcoal/90 hover:bg-charcoal border border-gold/30 hover:border-gold/60 text-gold px-5 py-3 rounded-full shadow-2xl backdrop-blur-sm transition-all duration-300 hover:scale-105 text-sm font-semibold"
        >
          <Pencil size={15} />
          ✏️ ערוך אתר
        </button>
      )}

      {/* Edit mode save bar */}
      {editing && (
        <div className="fixed bottom-0 left-0 right-0 z-50 bg-charcoal/97 backdrop-blur-md border-t border-gold/25 px-6 py-4 flex items-center justify-between gap-4 shadow-2xl">
          <div className="flex items-center gap-2.5 text-gold text-sm font-medium">
            <div className="w-2 h-2 rounded-full bg-gold animate-pulse" />
            מצב עריכה – לחצו על כל טקסט לשינוי
          </div>
          <div className="flex items-center gap-3">
            {error && <span className="text-red-400 text-xs max-w-48 truncate">{error}</span>}
            <button
              onClick={cancel}
              className="flex items-center gap-1.5 px-4 py-2 rounded-full text-sm text-cream/50 hover:text-cream border border-cream/10 hover:border-cream/30 transition-all"
            >
              <X size={14} />
              בטל
            </button>
            <button
              onClick={save}
              disabled={saving}
              className="flex items-center gap-2 px-6 py-2 rounded-full text-sm bg-gold hover:bg-gold/80 text-charcoal font-bold transition-all disabled:opacity-60"
            >
              {saving ? <Loader2 size={14} className="animate-spin" /> : <Check size={14} />}
              {saving ? 'שומר...' : 'שמור הכל'}
            </button>
          </div>
        </div>
      )}

      {/* Success toast */}
      {saved && (
        <div className="fixed bottom-24 left-1/2 -translate-x-1/2 z-50 bg-green-600 text-white px-6 py-3 rounded-full text-sm font-medium shadow-xl flex items-center gap-2 animate-fade-in">
          <Check size={16} />
          האתר עודכן בהצלחה!
        </div>
      )}

      {/* Edit mode field highlight style */}
      {editing && (
        <style>{`
          .editable-field {
            border-bottom: 2px solid rgba(212, 175, 55, 0.5) !important;
            outline: none;
            background: transparent !important;
            transition: border-color 0.2s;
          }
          .editable-field:focus {
            border-bottom-color: rgba(212, 175, 55, 0.9) !important;
          }
          .editable-field::placeholder {
            opacity: 0.35;
          }
        `}</style>
      )}
    </EditContext.Provider>
  )
}
