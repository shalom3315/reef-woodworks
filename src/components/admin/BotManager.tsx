'use client'

import { useState, useEffect } from 'react'
import { createClient } from '@/lib/supabase'
import { Check, Bot, RotateCcw } from 'lucide-react'
import { Input, Textarea } from '@/components/ui/Input'
import { Button } from '@/components/ui/Button'

const FIELDS = [
  { key: 'bot_name',       label: 'שם העסק',           placeholder: 'ריף וודוורקס',                         type: 'input' },
  { key: 'bot_owner',      label: 'שם הבעלים',          placeholder: 'אלי מרקוס',                             type: 'input' },
  { key: 'bot_phone',      label: 'טלפון / וואטסאפ',    placeholder: '053-313-9394',                          type: 'input' },
  { key: 'bot_specialty',  label: 'התמחות העסק',         placeholder: 'שולחנות, ארונות, פרגולות...',           type: 'textarea' },
  { key: 'bot_price_from', label: 'מחיר התחלתי',         placeholder: 'שולחן אוכל ארוך: החל מ-5,000 ₪',       type: 'input' },
  { key: 'bot_wood_types', label: 'סוגי עץ (מופרדים בפסיק)', placeholder: 'אלון, אגוז, אש, עץ מחזור, אקציה', type: 'textarea' },
  { key: 'bot_finishes',   label: 'גימורים (מופרדים בפסיק)', placeholder: 'שמן טבעי, לכה, שעווה, פיגמנט',     type: 'textarea' },
  { key: 'bot_extra_info', label: 'מידע נוסף לבוט (אופציונלי)', placeholder: 'שעות פעילות, אזורי שירות...',   type: 'textarea' },
] as const

type FieldKey = (typeof FIELDS)[number]['key']
type FormState = Record<FieldKey, string>

const EMPTY: FormState = Object.fromEntries(FIELDS.map(f => [f.key, ''])) as FormState

export default function BotManager() {
  const [form, setForm] = useState<FormState>(EMPTY)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState(false)
  const supabase = createClient()

  useEffect(() => {
    supabase
      .from('site_settings')
      .select('key, value')
      .in('key', FIELDS.map(f => f.key))
      .then(({ data }) => {
        if (data) {
          const map: Partial<FormState> = {}
          data.forEach((r: { key: string; value: string }) => {
            map[r.key as FieldKey] = r.value
          })
          setForm(prev => ({ ...prev, ...map }))
        }
        setLoading(false)
      })
  }, [])

  const save = async () => {
    setSaving(true)
    const { data: { session } } = await supabase.auth.getSession()
    const token = session?.access_token
    if (!token) { setSaving(false); return }

    await fetch('/api/settings', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(form),
    })

    setSaving(false)
    setSaved(true)
    setTimeout(() => setSaved(false), 3000)
  }

  if (loading) {
    return (
      <div className="flex justify-center py-16">
        <div className="w-8 h-8 border-2 border-gold border-t-transparent rounded-full animate-spin" />
      </div>
    )
  }

  return (
    <div className="max-w-2xl">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-xl font-semibold text-charcoal flex items-center gap-2">
            <Bot size={20} className="text-gold" />
            הגדרות בוט הצ'אט
          </h2>
          <p className="text-charcoal/45 text-sm mt-1">הטקסטים האלה בונים את האישיות של הבוט שמשוחח עם הלקוחות</p>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-charcoal/8 p-6 space-y-5">
        {FIELDS.map(({ key, label, placeholder, type }) => (
          <div key={key}>
            <label className="block text-xs font-medium text-charcoal/60 mb-1.5">{label}</label>
            {type === 'textarea' ? (
              <Textarea
                value={form[key]}
                onChange={(e) => setForm(prev => ({ ...prev, [key]: e.target.value }))}
                placeholder={placeholder}
                rows={3}
              />
            ) : (
              <Input
                value={form[key]}
                onChange={(e) => setForm(prev => ({ ...prev, [key]: e.target.value }))}
                placeholder={placeholder}
              />
            )}
          </div>
        ))}

        <div className="pt-2 flex gap-3 justify-end border-t border-charcoal/8">
          <Button
            variant="secondary"
            onClick={() => setForm(EMPTY)}
            className="gap-1.5"
          >
            <RotateCcw size={13} />
            איפוס
          </Button>
          <Button onClick={save} disabled={saving}>
            <Check size={15} />
            {saving ? 'שומר...' : saved ? '✓ נשמר!' : 'שמור הגדרות'}
          </Button>
        </div>
      </div>

      <div className="mt-4 bg-gold/8 border border-gold/20 rounded-xl px-4 py-3 text-sm text-charcoal/60">
        <strong className="text-charcoal/80">טיפ:</strong> שינויים כאן יופיעו בבוט תוך דקה (הגדרות נשמרות במטמון 60 שניות).
      </div>
    </div>
  )
}
