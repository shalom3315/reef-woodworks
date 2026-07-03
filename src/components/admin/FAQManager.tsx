'use client'

import { useState, useEffect } from 'react'
import { createClient } from '@/lib/supabase'
import type { FAQ } from '@/types'
import { Plus, Pencil, Trash2, X, Check, HelpCircle, GripVertical } from 'lucide-react'

const EMPTY: Omit<FAQ, 'id'> = {
  question: '',
  answer: '',
  order_index: 0,
}

export default function FAQManager() {
  const [faqs, setFaqs] = useState<FAQ[]>([])
  const [loading, setLoading] = useState(true)
  const [editing, setEditing] = useState<FAQ | null>(null)
  const [isNew, setIsNew] = useState(false)
  const [form, setForm] = useState(EMPTY)
  const [saving, setSaving] = useState(false)
  const supabase = createClient()

  const load = async () => {
    setLoading(true)
    const { data } = await supabase.from('faqs').select('*').order('order_index')
    setFaqs(data || [])
    setLoading(false)
  }

  useEffect(() => { load() }, [])

  const openEdit = (f: FAQ) => {
    setEditing(f)
    setIsNew(false)
    setForm({ question: f.question, answer: f.answer, order_index: f.order_index })
  }

  const openNew = () => {
    setEditing(null)
    setIsNew(true)
    setForm({ ...EMPTY, order_index: faqs.length })
  }

  const close = () => { setEditing(null); setIsNew(false) }

  const save = async () => {
    if (!form.question.trim() || !form.answer.trim()) return
    setSaving(true)
    if (isNew) {
      await supabase.from('faqs').insert([form])
    } else if (editing) {
      await supabase.from('faqs').update(form).eq('id', editing.id)
    }
    setSaving(false)
    close()
    load()
  }

  const del = async (id: string) => {
    if (!confirm('למחוק שאלה זו?')) return
    await supabase.from('faqs').delete().eq('id', id)
    load()
  }

  const moveUp = async (i: number) => {
    if (i === 0) return
    const a = faqs[i], b = faqs[i - 1]
    await Promise.all([
      supabase.from('faqs').update({ order_index: b.order_index }).eq('id', a.id),
      supabase.from('faqs').update({ order_index: a.order_index }).eq('id', b.id),
    ])
    load()
  }

  const moveDown = async (i: number) => {
    if (i === faqs.length - 1) return
    const a = faqs[i], b = faqs[i + 1]
    await Promise.all([
      supabase.from('faqs').update({ order_index: b.order_index }).eq('id', a.id),
      supabase.from('faqs').update({ order_index: a.order_index }).eq('id', b.id),
    ])
    load()
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-charcoal">שאלות נפוצות (FAQ)</h2>
        <button
          onClick={openNew}
          className="flex items-center gap-2 bg-gold hover:bg-gold-light text-cream px-4 py-2 rounded-xl text-sm font-medium transition-colors"
        >
          <Plus size={16} />
          שאלה חדשה
        </button>
      </div>

      {loading ? (
        <div className="flex justify-center py-12">
          <div className="w-8 h-8 border-2 border-gold border-t-transparent rounded-full animate-spin" />
        </div>
      ) : (
        <div className="grid gap-3">
          {faqs.map((f, i) => (
            <div key={f.id} className="bg-white rounded-xl p-5 border border-charcoal/8 hover:border-gold/30 transition-colors">
              <div className="flex items-start gap-3">
                <div className="flex flex-col gap-1 pt-0.5 flex-shrink-0">
                  <button onClick={() => moveUp(i)} disabled={i === 0} className="w-6 h-6 bg-cream hover:bg-gold/15 rounded flex items-center justify-center transition-colors disabled:opacity-20 text-[10px] text-charcoal/50">▲</button>
                  <button onClick={() => moveDown(i)} disabled={i === faqs.length - 1} className="w-6 h-6 bg-cream hover:bg-gold/15 rounded flex items-center justify-center transition-colors disabled:opacity-20 text-[10px] text-charcoal/50">▼</button>
                </div>

                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-charcoal text-sm mb-1.5">{f.question}</p>
                  <p className="text-charcoal/55 text-sm leading-relaxed line-clamp-2">{f.answer}</p>
                </div>

                <div className="flex gap-2 flex-shrink-0">
                  <button onClick={() => openEdit(f)} className="w-8 h-8 bg-cream hover:bg-gold/15 rounded-lg flex items-center justify-center transition-colors">
                    <Pencil size={14} className="text-charcoal/60" />
                  </button>
                  <button onClick={() => del(f.id)} className="w-8 h-8 bg-cream hover:bg-red-50 rounded-lg flex items-center justify-center transition-colors">
                    <Trash2 size={14} className="text-red-400" />
                  </button>
                </div>
              </div>
            </div>
          ))}

          {faqs.length === 0 && (
            <div className="text-center py-12 text-charcoal/40">
              <HelpCircle size={40} className="mx-auto mb-3 opacity-30" />
              <p className="mb-1">אין שאלות נפוצות עדיין</p>
              <p className="text-xs">הוסיפו שאלות כדי שיופיעו באתר</p>
            </div>
          )}
        </div>
      )}

      {(editing || isNew) && (
        <div className="fixed inset-0 z-50 bg-charcoal/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg">
            <div className="flex items-center justify-between p-6 border-b border-charcoal/8">
              <h3 className="font-semibold text-charcoal">{isNew ? 'שאלה חדשה' : 'עריכת שאלה'}</h3>
              <button onClick={close} className="w-8 h-8 bg-cream rounded-lg flex items-center justify-center hover:bg-gold/15 transition-colors">
                <X size={16} />
              </button>
            </div>

            <div className="p-6 space-y-4">
              <div>
                <label className="block text-xs font-medium text-charcoal/60 mb-1.5">שאלה *</label>
                <input
                  value={form.question}
                  onChange={(e) => setForm({ ...form, question: e.target.value })}
                  className={inputCls}
                  placeholder="כמה זמן לוקח לייצר רהיט בהתאמה אישית?"
                  dir="rtl"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-charcoal/60 mb-1.5">תשובה *</label>
                <textarea
                  value={form.answer}
                  onChange={(e) => setForm({ ...form, answer: e.target.value })}
                  rows={5}
                  className={inputCls}
                  placeholder="כתבו את התשובה המפורטת כאן..."
                  dir="rtl"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-charcoal/60 mb-1.5">סדר תצוגה</label>
                <input
                  type="number"
                  value={form.order_index}
                  onChange={(e) => setForm({ ...form, order_index: parseInt(e.target.value) || 0 })}
                  className={inputCls}
                  min={0}
                />
              </div>
            </div>

            <div className="p-6 border-t border-charcoal/8 flex gap-3 justify-end">
              <button onClick={close} className="px-5 py-2.5 rounded-xl border border-charcoal/15 text-charcoal/60 hover:bg-cream transition-colors text-sm">ביטול</button>
              <button
                onClick={save}
                disabled={saving || !form.question.trim() || !form.answer.trim()}
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
