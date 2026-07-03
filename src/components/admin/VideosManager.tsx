'use client'

import { useState, useEffect } from 'react'
import { createClient } from '@/lib/supabase'
import { Plus, Trash2, Check, Video, CheckCircle } from 'lucide-react'
import VideoUploader from './VideoUploader'
import { Input, Textarea } from '@/components/ui/Input'
import { Button } from '@/components/ui/Button'
import { Modal } from '@/components/ui/Modal'

interface VideoItem {
  id: string
  title: string
  description: string
  video_url: string
  order_index: number
  created_at: string
}

const EMPTY = { title: '', description: '', video_url: '', order_index: 0 }

interface Props {
  initialData?: VideoItem[]
}

export default function VideosManager({ initialData }: Props) {
  const [videos, setVideos] = useState<VideoItem[]>(initialData ?? [])
  const [loading, setLoading] = useState(!initialData)
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

  useEffect(() => { if (!initialData) load() }, [])

  const close = () => { setIsNew(false); setForm(EMPTY) }

  const save = async () => {
    if (!form.title || !form.video_url) return
    setSaving(true)
    const { error } = await supabase.from('videos').insert([{ ...form, order_index: videos.length + 1 }])
    setSaving(false)
    if (error) {
      setToast(`שגיאה: ${error.message}`)
      setTimeout(() => setToast(''), 5000)
      return
    }
    close()
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
          <CheckCircle size={16} />{toast}
        </div>
      )}

      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-charcoal">סרטונים</h2>
        <Button onClick={() => setIsNew(true)} variant="primary" className="px-4 py-2">
          <Plus size={16} />סרטון חדש
        </Button>
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
              <Button variant="danger" onClick={() => del(v.id)} className="flex-shrink-0">
                <Trash2 size={14} className="text-red-400" />
              </Button>
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

      <Modal
        open={isNew}
        onClose={close}
        title="סרטון חדש"
        scrollable
        footer={
          <>
            <Button variant="secondary" onClick={close}>ביטול</Button>
            <Button
              variant="primary"
              onClick={save}
              disabled={saving || !form.title || !form.video_url}
            >
              <Check size={15} />{saving ? 'שומר...' : 'שמור'}
            </Button>
          </>
        }
      >
        <div>
          <label className="block text-xs font-medium text-charcoal/60 mb-1.5">שם הסרטון *</label>
          <Input value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} placeholder="תהליך ייצור שולחן..." />
        </div>
        <div>
          <label className="block text-xs font-medium text-charcoal/60 mb-1.5">תיאור (אופציונלי)</label>
          <Textarea value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} rows={2} placeholder="תיאור קצר של הסרטון..." />
        </div>
        <div>
          <label className="block text-xs font-medium text-charcoal/60 mb-1.5">העלאת סרטון *</label>
          <VideoUploader value={form.video_url} onChange={(url) => setForm({ ...form, video_url: url })} />
        </div>
      </Modal>
    </div>
  )
}
