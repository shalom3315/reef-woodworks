'use client'

import { useState, useEffect } from 'react'
import { createClient } from '@/lib/supabase'
import type { Project } from '@/types'
import { Plus, Pencil, Trash2, X, Check, Image as ImageIcon, CheckCircle } from 'lucide-react'
import ImageUploader from './ImageUploader'

const EMPTY: Omit<Project, 'id' | 'created_at'> = {
  title: '',
  description: '',
  material: '',
  duration: '',
  image_url: '',
  category: 'ריהוט',
  featured: false,
  order_index: 0,
}

const CATEGORIES = ['ריהוט', 'שולחנות', 'חדר שינה', 'מטבח', 'חיצוני', 'אחר']

export default function ProjectsManager() {
  const [projects, setProjects] = useState<Project[]>([])
  const [loading, setLoading] = useState(true)
  const [editing, setEditing] = useState<Project | null>(null)
  const [isNew, setIsNew] = useState(false)
  const [form, setForm] = useState(EMPTY)
  const [saving, setSaving] = useState(false)
  const [toast, setToast] = useState('')
  const supabase = createClient()

  const load = async () => {
    setLoading(true)
    const { data } = await supabase
      .from('projects')
      .select('*')
      .order('order_index', { ascending: true })
    setProjects(data || [])
    setLoading(false)
  }

  useEffect(() => { load() }, [])

  const openEdit = (project: Project) => {
    setEditing(project)
    setIsNew(false)
    setForm({
      title: project.title,
      description: project.description,
      material: project.material,
      duration: project.duration,
      image_url: project.image_url,
      category: project.category,
      featured: project.featured,
      order_index: project.order_index,
    })
  }

  const openNew = () => {
    setEditing(null)
    setIsNew(true)
    setForm({ ...EMPTY, order_index: projects.length + 1 })
  }

  const close = () => {
    setEditing(null)
    setIsNew(false)
  }

  const save = async () => {
    setSaving(true)
    if (isNew) {
      await supabase.from('projects').insert([form])
    } else if (editing) {
      await supabase.from('projects').update(form).eq('id', editing.id)
    }
    setSaving(false)
    close()
    load()
    setToast('הפרויקט נשמר בהצלחה!')
    setTimeout(() => setToast(''), 3000)
  }

  const del = async (id: string) => {
    if (!confirm('למחוק פרויקט זה?')) return
    await supabase.from('projects').delete().eq('id', id)
    load()
  }

  return (
    <div>
      {toast && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 bg-green-600 text-white px-5 py-3 rounded-full text-sm font-medium shadow-xl flex items-center gap-2">
          <CheckCircle size={16} />
          {toast}
        </div>
      )}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-charcoal">פרויקטים בגלריה</h2>
        <button
          onClick={openNew}
          className="flex items-center gap-2 bg-gold hover:bg-gold-light text-cream px-4 py-2 rounded-xl text-sm font-medium transition-colors"
        >
          <Plus size={16} />
          פרויקט חדש
        </button>
      </div>

      {loading ? (
        <div className="flex justify-center py-12">
          <div className="w-8 h-8 border-2 border-gold border-t-transparent rounded-full animate-spin" />
        </div>
      ) : (
        <div className="grid gap-3">
          {projects.map((p) => (
            <div
              key={p.id}
              className="bg-white rounded-xl p-4 border border-charcoal/8 flex items-center gap-4 hover:border-gold/30 transition-colors"
            >
              {/* Thumbnail */}
              <div className="w-16 h-16 rounded-lg overflow-hidden bg-cream flex-shrink-0">
                {p.image_url ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={p.image_url} alt={p.title} className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <ImageIcon size={20} className="text-charcoal/25" />
                  </div>
                )}
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="font-semibold text-charcoal text-sm">{p.title}</span>
                  {p.featured && (
                    <span className="bg-gold/15 text-gold text-xs px-2 py-0.5 rounded-full">מומלץ</span>
                  )}
                  <span className="bg-cream text-charcoal/50 text-xs px-2 py-0.5 rounded-full border border-charcoal/10">
                    {p.category}
                  </span>
                </div>
                <p className="text-charcoal/45 text-xs mt-1 truncate">{p.material} · {p.duration}</p>
              </div>

              <div className="flex gap-2 flex-shrink-0">
                <button
                  onClick={() => openEdit(p)}
                  className="w-8 h-8 bg-cream hover:bg-gold/15 rounded-lg flex items-center justify-center transition-colors"
                >
                  <Pencil size={14} className="text-charcoal/60" />
                </button>
                <button
                  onClick={() => del(p.id)}
                  className="w-8 h-8 bg-cream hover:bg-red-50 rounded-lg flex items-center justify-center transition-colors"
                >
                  <Trash2 size={14} className="text-red-400" />
                </button>
              </div>
            </div>
          ))}

          {projects.length === 0 && (
            <div className="text-center py-12 text-charcoal/40">
              <ImageIcon size={40} className="mx-auto mb-3 opacity-30" />
              <p>אין פרויקטים עדיין. הוסיפו את הראשון!</p>
            </div>
          )}
        </div>
      )}

      {/* Edit/New modal */}
      {(editing || isNew) && (
        <div className="fixed inset-0 z-50 bg-charcoal/60 backdrop-blur-sm flex items-start justify-center overflow-y-auto py-6 px-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg mt-4">
            <div className="flex items-center justify-between p-6 border-b border-charcoal/8">
              <h3 className="font-semibold text-charcoal">{isNew ? 'פרויקט חדש' : 'עריכת פרויקט'}</h3>
              <button onClick={close} className="w-8 h-8 bg-cream rounded-lg flex items-center justify-center hover:bg-gold/15 transition-colors">
                <X size={16} />
              </button>
            </div>

            <div className="p-6 space-y-4 max-h-[70vh] overflow-y-auto">
              <Field label="שם הפרויקט *">
                <input
                  value={form.title}
                  onChange={(e) => setForm({ ...form, title: e.target.value })}
                  className={inputCls}
                  placeholder="שולחן אוכל אגוז"
                />
              </Field>

              <Field label="תיאור">
                <textarea
                  value={form.description}
                  onChange={(e) => setForm({ ...form, description: e.target.value })}
                  rows={3}
                  className={inputCls}
                  placeholder="תיאור קצר של הפרויקט..."
                />
              </Field>

              <div className="grid grid-cols-2 gap-4">
                <Field label="חומר">
                  <input
                    value={form.material}
                    onChange={(e) => setForm({ ...form, material: e.target.value })}
                    className={inputCls}
                    placeholder="אגוז אמריקאי"
                  />
                </Field>
                <Field label="זמן ייצור">
                  <input
                    value={form.duration}
                    onChange={(e) => setForm({ ...form, duration: e.target.value })}
                    className={inputCls}
                    placeholder="4 שבועות"
                  />
                </Field>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <Field label="קטגוריה">
                  <select
                    value={form.category}
                    onChange={(e) => setForm({ ...form, category: e.target.value })}
                    className={inputCls}
                  >
                    {CATEGORIES.map((c) => <option key={c}>{c}</option>)}
                  </select>
                </Field>
                <Field label="סדר תצוגה">
                  <input
                    type="number"
                    value={form.order_index}
                    onChange={(e) => setForm({ ...form, order_index: Number(e.target.value) })}
                    className={inputCls}
                    min={0}
                  />
                </Field>
              </div>

              <Field label="תמונת הפרויקט *">
                <ImageUploader
                  value={form.image_url}
                  onChange={(url) => setForm({ ...form, image_url: url })}
                  folder="projects"
                />
              </Field>

              <label className="flex items-center gap-3 cursor-pointer">
                <div
                  onClick={() => setForm({ ...form, featured: !form.featured })}
                  className={`w-10 h-6 rounded-full transition-colors relative ${form.featured ? 'bg-gold' : 'bg-charcoal/20'}`}
                >
                  <div className={`absolute top-1 w-4 h-4 bg-white rounded-full shadow transition-all ${form.featured ? 'right-1' : 'left-1'}`} />
                </div>
                <span className="text-sm text-charcoal/70">פרויקט מומלץ (יופיע ראשון)</span>
              </label>
            </div>

            <div className="p-6 border-t border-charcoal/8 flex gap-3 justify-end">
              <button onClick={close} className="px-5 py-2.5 rounded-xl border border-charcoal/15 text-charcoal/60 hover:bg-cream transition-colors text-sm">
                ביטול
              </button>
              <button
                onClick={save}
                disabled={saving || !form.title || !form.image_url}
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

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <label className="block text-xs font-medium text-charcoal/60 mb-1.5">{label}</label>
      {children}
    </div>
  )
}

const inputCls =
  'w-full border border-charcoal/15 rounded-xl px-3.5 py-2.5 text-charcoal text-sm placeholder-charcoal/30 focus:outline-none focus:border-gold focus:ring-2 focus:ring-gold/15 transition-all bg-white'
