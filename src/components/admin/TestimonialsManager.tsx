'use client'

import { useState, useEffect } from 'react'
import { createClient } from '@/lib/supabase'
import type { Testimonial } from '@/types'
import { Plus, Pencil, Trash2, Check, Star, MessageSquare } from 'lucide-react'
import { Input, Textarea } from '@/components/ui/Input'
import { Button } from '@/components/ui/Button'
import { Modal } from '@/components/ui/Modal'

const EMPTY: Omit<Testimonial, 'id' | 'created_at'> = {
  name: '',
  location: '',
  text: '',
  project: '',
  rating: 5,
}

interface Props {
  initialData?: Testimonial[]
}

export default function TestimonialsManager({ initialData }: Props) {
  const [testimonials, setTestimonials] = useState<Testimonial[]>(initialData ?? [])
  const [loading, setLoading] = useState(!initialData)
  const [editing, setEditing] = useState<Testimonial | null>(null)
  const [isNew, setIsNew] = useState(false)
  const [form, setForm] = useState(EMPTY)
  const [saving, setSaving] = useState(false)
  const supabase = createClient()

  const load = async () => {
    setLoading(true)
    const { data } = await supabase
      .from('testimonials')
      .select('*')
      .order('created_at', { ascending: false })
    setTestimonials(data || [])
    setLoading(false)
  }

  useEffect(() => { if (!initialData) load() }, [])

  const openEdit = (t: Testimonial) => {
    setEditing(t)
    setIsNew(false)
    setForm({ name: t.name, location: t.location, text: t.text, project: t.project, rating: t.rating })
  }

  const openNew = () => { setEditing(null); setIsNew(true); setForm(EMPTY) }
  const close = () => { setEditing(null); setIsNew(false) }

  const save = async () => {
    setSaving(true)
    if (isNew) {
      await supabase.from('testimonials').insert([form])
    } else if (editing) {
      await supabase.from('testimonials').update(form).eq('id', editing.id)
    }
    setSaving(false)
    close()
    load()
  }

  const del = async (id: string) => {
    if (!confirm('למחוק המלצה זו?')) return
    await supabase.from('testimonials').delete().eq('id', id)
    load()
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-charcoal">המלצות לקוחות</h2>
        <Button onClick={openNew} variant="primary" className="px-4 py-2">
          <Plus size={16} />
          המלצה חדשה
        </Button>
      </div>

      {loading ? (
        <div className="flex justify-center py-12">
          <div className="w-8 h-8 border-2 border-gold border-t-transparent rounded-full animate-spin" />
        </div>
      ) : (
        <div className="grid gap-3">
          {testimonials.map((t) => (
            <div key={t.id} className="bg-white rounded-xl p-5 border border-charcoal/8 hover:border-gold/30 transition-colors">
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap mb-1">
                    <span className="font-semibold text-charcoal text-sm">{t.name}</span>
                    <span className="text-charcoal/40 text-xs">{t.location}</span>
                    <div className="flex gap-0.5">
                      {Array.from({ length: t.rating }).map((_, i) => (
                        <Star key={i} size={12} className="text-gold fill-gold" />
                      ))}
                    </div>
                  </div>
                  <p className="text-charcoal/60 text-sm leading-relaxed line-clamp-2">&ldquo;{t.text}&rdquo;</p>
                  {t.project && <p className="text-xs text-charcoal/35 mt-1">פרויקט: {t.project}</p>}
                </div>
                <div className="flex gap-2 flex-shrink-0">
                  <Button variant="icon" onClick={() => openEdit(t)}>
                    <Pencil size={14} className="text-charcoal/60" />
                  </Button>
                  <Button variant="danger" onClick={() => del(t.id)}>
                    <Trash2 size={14} className="text-red-400" />
                  </Button>
                </div>
              </div>
            </div>
          ))}

          {testimonials.length === 0 && (
            <div className="text-center py-12 text-charcoal/40">
              <MessageSquare size={40} className="mx-auto mb-3 opacity-30" />
              <p>אין המלצות עדיין. הוסיפו את הראשונה!</p>
            </div>
          )}
        </div>
      )}

      <Modal
        open={!!(editing || isNew)}
        onClose={close}
        title={isNew ? 'המלצה חדשה' : 'עריכת המלצה'}
        footer={
          <>
            <Button variant="secondary" onClick={close}>ביטול</Button>
            <Button
              variant="primary"
              onClick={save}
              disabled={saving || !form.name || !form.text}
            >
              <Check size={15} />
              {saving ? 'שומר...' : 'שמור'}
            </Button>
          </>
        }
      >
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-medium text-charcoal/60 mb-1.5">שם הלקוח *</label>
            <Input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="מיכל כ." />
          </div>
          <div>
            <label className="block text-xs font-medium text-charcoal/60 mb-1.5">עיר</label>
            <Input value={form.location} onChange={(e) => setForm({ ...form, location: e.target.value })} placeholder="תל אביב" />
          </div>
        </div>

        <div>
          <label className="block text-xs font-medium text-charcoal/60 mb-1.5">טקסט ההמלצה *</label>
          <Textarea value={form.text} onChange={(e) => setForm({ ...form, text: e.target.value })} rows={4} placeholder="כתבו את המלצת הלקוח..." />
        </div>

        <div>
          <label className="block text-xs font-medium text-charcoal/60 mb-1.5">פרויקט</label>
          <Input value={form.project} onChange={(e) => setForm({ ...form, project: e.target.value })} placeholder="שולחן אוכל אגוז" />
        </div>

        <div>
          <label className="block text-xs font-medium text-charcoal/60 mb-2">דירוג</label>
          <div className="flex gap-2">
            {[1, 2, 3, 4, 5].map((n) => (
              <button key={n} type="button" onClick={() => setForm({ ...form, rating: n })} className="focus:outline-none">
                <Star size={24} className={n <= form.rating ? 'text-gold fill-gold' : 'text-charcoal/20'} />
              </button>
            ))}
          </div>
        </div>
      </Modal>
    </div>
  )
}
