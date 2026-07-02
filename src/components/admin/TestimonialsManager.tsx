'use client'

import { useState, useEffect } from 'react'
import { createClient } from '@/lib/supabase'
import type { Testimonial } from '@/types'
import { Plus, Pencil, Trash2, X, Check, Star, MessageSquare } from 'lucide-react'

const EMPTY: Omit<Testimonial, 'id' | 'created_at'> = {
  name: '',
  location: '',
  text: '',
  project: '',
  rating: 5,
}

export default function TestimonialsManager() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([])
  const [loading, setLoading] = useState(true)
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

  useEffect(() => { load() }, [])

  const openEdit = (t: Testimonial) => {
    setEditing(t)
    setIsNew(false)
    setForm({ name: t.name, location: t.location, text: t.text, project: t.project, rating: t.rating })
  }

  const openNew = () => {
    setEditing(null)
    setIsNew(true)
    setForm(EMPTY)
  }

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
        <button
          onClick={openNew}
          className="flex items-center gap-2 bg-gold hover:bg-gold-light text-cream px-4 py-2 rounded-xl text-sm font-medium transition-colors"
        >
          <Plus size={16} />
          המלצה חדשה
        </button>
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
                  <button onClick={() => openEdit(t)} className="w-8 h-8 bg-cream hover:bg-gold/15 rounded-lg flex items-center justify-center transition-colors">
                    <Pencil size={14} className="text-charcoal/60" />
                  </button>
                  <button onClick={() => del(t.id)} className="w-8 h-8 bg-cream hover:bg-red-50 rounded-lg flex items-center justify-center transition-colors">
                    <Trash2 size={14} className="text-red-400" />
                  </button>
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

      {/* Modal */}
      {(editing || isNew) && (
        <div className="fixed inset-0 z-50 bg-charcoal/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg">
            <div className="flex items-center justify-between p-6 border-b border-charcoal/8">
              <h3 className="font-semibold text-charcoal">{isNew ? 'המלצה חדשה' : 'עריכת המלצה'}</h3>
              <button onClick={close} className="w-8 h-8 bg-cream rounded-lg flex items-center justify-center hover:bg-gold/15 transition-colors">
                <X size={16} />
              </button>
            </div>

            <div className="p-6 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-charcoal/60 mb-1.5">שם הלקוח *</label>
                  <input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className={inputCls} placeholder="מיכל כ." />
                </div>
                <div>
                  <label className="block text-xs font-medium text-charcoal/60 mb-1.5">עיר</label>
                  <input value={form.location} onChange={(e) => setForm({ ...form, location: e.target.value })} className={inputCls} placeholder="תל אביב" />
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-charcoal/60 mb-1.5">טקסט ההמלצה *</label>
                <textarea
                  value={form.text}
                  onChange={(e) => setForm({ ...form, text: e.target.value })}
                  rows={4}
                  className={inputCls}
                  placeholder="כתבו את המלצת הלקוח..."
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-charcoal/60 mb-1.5">פרויקט</label>
                <input value={form.project} onChange={(e) => setForm({ ...form, project: e.target.value })} className={inputCls} placeholder="שולחן אוכל אגוז" />
              </div>

              <div>
                <label className="block text-xs font-medium text-charcoal/60 mb-2">דירוג</label>
                <div className="flex gap-2">
                  {[1, 2, 3, 4, 5].map((n) => (
                    <button
                      key={n}
                      type="button"
                      onClick={() => setForm({ ...form, rating: n })}
                      className="focus:outline-none"
                    >
                      <Star size={24} className={n <= form.rating ? 'text-gold fill-gold' : 'text-charcoal/20'} />
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="p-6 border-t border-charcoal/8 flex gap-3 justify-end">
              <button onClick={close} className="px-5 py-2.5 rounded-xl border border-charcoal/15 text-charcoal/60 hover:bg-cream transition-colors text-sm">ביטול</button>
              <button
                onClick={save}
                disabled={saving || !form.name || !form.text}
                className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gold hover:bg-gold-light text-cream font-medium text-sm transition-colors disabled:opacity-50"
              >
                <Check size={15} />
                {saving ? 'שומר...' : 'שמור'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

const inputCls = 'w-full border border-charcoal/15 rounded-xl px-3.5 py-2.5 text-charcoal text-sm placeholder-charcoal/30 focus:outline-none focus:border-gold focus:ring-2 focus:ring-gold/15 transition-all bg-white'
