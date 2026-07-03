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

    </EditContext.Provider>
  )
}
