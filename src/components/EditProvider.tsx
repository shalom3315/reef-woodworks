'use client'

import { useState, useRef, useCallback, useEffect } from 'react'
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
  const [isAdmin, setIsAdmin] = useState(false)
  const [draft, setDraft] = useState<SiteSettings>({ ...initialSettings })
  const original = useRef<SiteSettings>({ ...initialSettings })

  useEffect(() => {
    import('@/lib/supabase').then(({ createClient }) => {
      createClient().auth.getSession().then(({ data }) => {
        setIsAdmin(!!data.session)
      })
    })
  }, [])

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
      const { createClient } = await import('@/lib/supabase')
      const { data: { session } } = await createClient().auth.getSession()
      const res = await fetch('/api/settings', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...(session?.access_token ? { Authorization: `Bearer ${session.access_token}` } : {}),
        },
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

      {/* Floating edit toolbar — visible to admins only */}
      {isAdmin && (
        <div className="fixed bottom-6 right-6 z-[80] flex flex-col items-end gap-2">
          {error && (
            <div className="bg-red-500 text-white text-xs px-3 py-2 rounded-lg max-w-[200px] text-right">
              {error}
            </div>
          )}
          {saved && (
            <div className="bg-green-600 text-white text-xs px-3 py-2 rounded-lg">
              ✓ נשמר בהצלחה
            </div>
          )}

          {editing ? (
            <div className="flex items-center gap-2">
              <button
                onClick={cancel}
                className="flex items-center gap-1.5 bg-white border border-charcoal/15 text-charcoal/70 hover:text-charcoal text-sm font-medium px-4 py-2.5 rounded-xl shadow-lg transition-all"
              >
                <X size={15} />
                ביטול
              </button>
              <button
                onClick={save}
                disabled={saving}
                className="flex items-center gap-1.5 bg-gold hover:bg-gold-light text-white text-sm font-semibold px-5 py-2.5 rounded-xl shadow-lg shadow-gold/30 transition-all disabled:opacity-60"
              >
                {saving ? <Loader2 size={15} className="animate-spin" /> : <Check size={15} />}
                {saving ? 'שומר...' : 'שמור'}
              </button>
            </div>
          ) : (
            <button
              onClick={startEditing}
              className="flex items-center gap-2 bg-charcoal hover:bg-charcoal/80 text-cream text-sm font-medium px-4 py-2.5 rounded-xl shadow-xl transition-all hover:-translate-y-0.5"
            >
              <Pencil size={15} />
              עריכת האתר
            </button>
          )}
        </div>
      )}
    </EditContext.Provider>
  )
}
