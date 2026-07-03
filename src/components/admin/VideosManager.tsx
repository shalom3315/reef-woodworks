'use client'

import { useState, useEffect } from 'react'
import { createClient } from '@/lib/supabase'
import { Plus, Trash2, X, Check, Video, CheckCircle } from 'lucide-react'
import VideoUploader from './VideoUploader'

interface VideoItem {
  id: string
  title: string
  description: string
  video_url: string
  order_index: number
  created_at: string
}

const EMPTY = { title: '', description: '', video_url: '', order_index: 0 }

export default function VideosManager() {
  const [videos, setVideos] = useState<VideoItem[]>([])
  const [loading, setLoading] = useState(true)
  const [isNew, setIsNew] = useState(false)
  const [form, setForm] = useState(EMPTY)
  const [saving, setSaving] = useState(false)
  const [toast, setToast] = useState('')
  const supabase = createClient()

  const load = async () => {
    setLoading(true)
    const { data } = await supabase.from('videos').select('*').order('order_index')
    setVideos(data || [])
    setLoading(false)
  }

  useEffect(() => { load() }, [])

  const save = async () => {
    if (!form.title || !form.video_url) return
    setSaving(true)
    await supabase.from('videos').insert([{ ...form, order_index: videos.length + 1 }])
    setSaving(false)
    setIsNew(false)
    setForm(EMPTY)
    load()
    setToast('הסרטון נוסף בהצלחה!')
    setTimeout(() => setToast(''), 3000)
  }

  const del = async (id: string) => {
    if (!confirm('למחוק סרטון זה?')) return
    await supabase.from('videos').delete().eq('id', id)
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
        <h2 className="text-xl font-semibold text-charcoal">סרטונים</h2>
        <button
          onClick={() => setIsNew(true)}
          className="flex items-center gap-2 bg-gold hover:bg-gold-light text-cream px-4 py-2 rounded-xl text-sm font-medium transition-colors"
        >
          <Plus size={16} />
          סרטון חדש
        </button>
      </div>

      {loading ? (
        <div className="flex justify-center py-12">
          <div className="w-8 h-8 border-2 border-gold border-t-transparent rounded-full animate-spin" />
        </div>
      ) : (
        <div className="grid gap-3">
          {videos.map((v) => (
            <div key={v.id} className="bg-white rounded-xl p-4 border border-charcoal/8 flex items-center gap-4 hover:border-gold/30 transition-colors">
              <div className="w-16 h-16 rounded-lg bg-cream flex-shrink-0 flex items-center justify-center">
                <Video size={24} className="text-charcoal/30" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-semibold text-charcoal text-sm">{v.title}</p>
                {v.description && <p className="text-charcoal/45 text-xs mt-0.5 truncate">{v.description}</p>}
                <p className="text-charcoal/30 text-xs mt-1 truncate">{v.video_url}</p>
              </div>
              <button
                onClick={() => del(v.id)}
                className="w-8 h-8 bg-cream hover:bg-red-50 rounded-lg flex items-center justify-center transition-colors flex-shrink-0"
              >
                <Trash2 size={14} className="text-red-400" />
              </button>
            </div>
          ))}

          {videos.length === 0 && (
            <div className="text-center py-12 text-charcoal/40">
              <Video size={40} className="mx-auto mb-3 opacity-30" />
              <p>אין סרטונים עדיין. הוסיפו את הראשון!</p>
            </div>
          )}
        </div>
      )}

      {isNew && (
        <div className="fixed inset-0 z-50 bg-charcoal/60 backdrop-blur-sm flex items-start justify-center overflow-y-auto py-6 px-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg mt-4">
            <div className="flex items-center justify-between p-6 border-b border-charcoal/8">
              <h3 className="font-semibold text-charcoal">סרטון חדש</h3>
              <button onClick={() => setIsNew(false)} className="w-8 h-8 bg-cream rounded-lg flex items-center justify-center hover:bg-gold/15 transition-colors">
                <X size={16} />
              </button>
            </div>

            <div className="p-6 space-y-4">
              <div>
                <label className="block text-xs font-medium text-charcoal/60 mb-1.5">שם הסרטון *</label>
                <input
                  value={form.title}
                  onChange={(e) => setForm({ ...form, title: e.target.value })}
                  className={inputCls}
                  placeholder="תהליך ייצור שולחן..."
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-charcoal/60 mb-1.5">תיאור (אופציונלי)</label>
                <textarea
                  value={form.description}
                  onChange={(e) => setForm({ ...form, description: e.target.value })}
                  rows={2}
                  className={inputCls}
                  placeholder="תיאור קצר של הסרטון..."
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-charcoal/60 mb-1.5">העלאת סרטון *</label>
                <VideoUploader
                  value={form.video_url}
                  onChange={(url) => setForm({ ...form, video_url: url })}
                />
              </div>
            </div>

            <div className="p-6 border-t border-charcoal/8 flex gap-3 justify-end">
              <button onClick={() => setIsNew(false)} className="px-5 py-2.5 rounded-xl border border-charcoal/15 text-charcoal/60 hover:bg-cream transition-colors text-sm">
                ביטול
              </button>
              <button
                onClick={save}
                disabled={saving || !form.title || !form.video_url}
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
