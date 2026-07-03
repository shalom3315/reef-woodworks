'use client'

import { motion } from 'framer-motion'
import { Star, Quote, Send, CheckCircle } from 'lucide-react'
import { useState } from 'react'
import { createClient } from '@/lib/supabase'
import type { Testimonial } from '@/types'

const DEFAULT_TESTIMONIALS: Testimonial[] = [
  { id: '1', name: 'מיכל כ.', location: 'תל אביב', text: 'שולחן האוכל שהזמנו הפך לנקודת המוקד של הבית שלנו. כל מי שמגיע שואל עליו. איכות שלא ראיתי אף פעם בקנייה רגילה – זה ממש אחרת.', rating: 5, project: 'שולחן אוכל אגוז', created_at: '' },
  { id: '2', name: 'דני א.', location: 'הרצליה', text: 'הוא הקשיב בסבלנות לכל מה שרצינו, הגיע לראות את המקום, ויצר משהו שמעבר לכל ציפייה. מקצוען אמיתי שאוהב את מה שהוא עושה – זה מרגישים בכל פרט.', rating: 5, project: 'ספרייה מרצפה לתקרה', created_at: '' },
  { id: '3', name: 'יעל ר.', location: 'רמת גן', text: 'מדפי הספרים שבנה לנו הם יצירת אמנות של ממש. גם ההסבר בזמן העבודה, גם הזמינות לשאלות, גם התוצאה הסופית – הכל היה מושלם. ממליצה בחום!', rating: 5, project: 'מדפי ספרים', created_at: '' },
]

function ReviewForm() {
  const [form, setForm] = useState({ name: '', location: '', text: '', rating: 5, project: '' })
  const [saving, setSaving] = useState(false)
  const [done, setDone] = useState(false)
  const [error, setError] = useState('')
  const supabase = createClient()

  const submit = async () => {
    if (!form.name || !form.text) return
    setSaving(true)
    setError('')
    const { error: e } = await supabase.from('testimonials').insert([form])
    setSaving(false)
    if (e) { setError('שגיאה בשליחה, נסה שוב'); return }
    setDone(true)
  }

  if (done) return (
    <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="text-center py-10">
      <CheckCircle size={44} className="text-gold mx-auto mb-3" />
      <p className="font-heading text-xl text-charcoal">תודה על הביקורת!</p>
      <p className="text-charcoal/50 text-sm mt-1">זה מאוד עוזר לנו 🙏</p>
    </motion.div>
  )

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="bg-white rounded-2xl p-8 border border-charcoal/8 shadow-wood max-w-2xl mx-auto" dir="rtl">
      <h3 className="font-heading text-2xl text-charcoal mb-6 text-center">השאירו ביקורת</h3>

      {/* דירוג */}
      <div className="flex justify-center gap-2 mb-6">
        {[1,2,3,4,5].map((s) => (
          <button key={s} onClick={() => setForm({...form, rating: s})} className="transition-transform hover:scale-110">
            <Star size={28} className={s <= form.rating ? 'text-gold fill-gold' : 'text-charcoal/20'} />
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
        <div>
          <label className="text-xs font-medium text-charcoal/50 block mb-1.5">שם *</label>
          <input value={form.name} onChange={(e) => setForm({...form, name: e.target.value})} placeholder="ישראל ישראלי" className={inputCls} />
        </div>
        <div>
          <label className="text-xs font-medium text-charcoal/50 block mb-1.5">עיר</label>
          <input value={form.location} onChange={(e) => setForm({...form, location: e.target.value})} placeholder="תל אביב" className={inputCls} />
        </div>
      </div>

      <div className="mb-4">
        <label className="text-xs font-medium text-charcoal/50 block mb-1.5">מה הזמנתם? (אופציונלי)</label>
        <input value={form.project} onChange={(e) => setForm({...form, project: e.target.value})} placeholder="שולחן אוכל, ארון, מדפים..." className={inputCls} />
      </div>

      <div className="mb-6">
        <label className="text-xs font-medium text-charcoal/50 block mb-1.5">הביקורת שלכם *</label>
        <textarea value={form.text} onChange={(e) => setForm({...form, text: e.target.value})} rows={4} placeholder="ספרו על החוויה שלכם..." className={inputCls} />
      </div>

      {error && <p className="text-red-500 text-sm mb-4 text-center">{error}</p>}

      <button
        onClick={submit}
        disabled={saving || !form.name || !form.text}
        className="w-full flex items-center justify-center gap-2 bg-gold hover:bg-gold-light text-cream font-semibold py-3.5 rounded-xl transition-all disabled:opacity-50"
      >
        <Send size={16} />
        {saving ? 'שולח...' : 'שלח ביקורת'}
      </button>
    </motion.div>
  )
}

const inputCls = 'w-full border border-charcoal/12 rounded-xl px-4 py-2.5 text-sm text-charcoal placeholder-charcoal/30 focus:outline-none focus:border-gold focus:ring-2 focus:ring-gold/10 transition-all bg-white'

export default function Testimonials({ testimonials }: { testimonials?: Testimonial[] }) {
  const data = (testimonials && testimonials.length > 0) ? testimonials : DEFAULT_TESTIMONIALS

  return (
    <section id="testimonials" className="py-28 bg-cream relative">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-16">
          <span className="inline-block text-gold font-medium text-sm tracking-[0.2em] uppercase mb-4">מה אומרים לקוחות</span>
          <h2 className="font-heading text-4xl md:text-5xl text-charcoal mb-4">ביקורות מהשטח</h2>
          <p className="text-charcoal/55 max-w-sm mx-auto">אמינות אמיתית מגיעה מאנשים שכבר עבדו איתנו.</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-7 mb-16">
          {data.map((t, i) => (
            <motion.div key={t.id} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.14, duration: 0.65 }} className="bg-white rounded-2xl p-8 shadow-wood border border-charcoal/5 hover:shadow-wood-lg hover:border-gold/15 transition-all duration-400 relative overflow-hidden group">
              <Quote className="absolute -top-2 left-4 text-gold/8 group-hover:text-gold/12 transition-colors" size={80} strokeWidth={1} />
              <div className="flex gap-1 mb-5 relative z-10">
                {Array.from({ length: t.rating }).map((_, si) => (
                  <Star key={si} size={16} className="text-gold fill-gold" />
                ))}
              </div>
              <p className="text-charcoal/70 leading-relaxed mb-7 relative z-10 text-[0.95rem]">&ldquo;{t.text}&rdquo;</p>
              <div className="border-t border-charcoal/8 pt-5 flex items-center gap-3">
                <div className="w-9 h-9 bg-gold/15 rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-gold font-heading font-bold text-sm">{t.name.charAt(0)}</span>
                </div>
                <div>
                  <div className="font-semibold text-charcoal text-sm">{t.name}</div>
                  <div className="text-charcoal/40 text-xs mt-0.5">{t.location}{t.project ? ` · ${t.project}` : ''}</div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <ReviewForm />
      </div>
    </section>
  )
}
