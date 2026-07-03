'use client'

import { useState, useEffect } from 'react'
import { createClient } from '@/lib/supabase'
import { Check, AlertCircle } from 'lucide-react'
import ImageUploader from './ImageUploader'
import VideoUploader from './VideoUploader'

const FIELDS = [
  // כללי
  { key: 'business_name', label: 'שם העסק', placeholder: 'Reef Woodworks', section: 'כללי' },
  { key: 'footer_desc', label: 'תיאור קצר (מופיע בתחתית האתר)', placeholder: 'עבודות עץ בהתאמה אישית...', section: 'כללי', multiline: true },

  // Hero
  { key: 'hero_title', label: 'כותרת ראשית', placeholder: 'עבודות עץ בהתאמה אישית', section: 'מסך פתיחה (Hero)' },
  { key: 'hero_subtitle', label: 'תת-כותרת', placeholder: 'רהיטים, שולחנות ופתרונות עץ...', section: 'מסך פתיחה (Hero)', multiline: true },
  { key: 'hero_badge', label: 'תג קטן מעל הכותרת', placeholder: 'נגרות בהתאמה אישית · עבודת יד', section: 'מסך פתיחה (Hero)' },
  { key: 'stat_years', label: 'סטטיסטיקה – שנות ניסיון', placeholder: '15+', section: 'מסך פתיחה (Hero)' },
  { key: 'stat_projects', label: 'סטטיסטיקה – פרויקטים', placeholder: '200+', section: 'מסך פתיחה (Hero)' },
  { key: 'stat_handmade', label: 'סטטיסטיקה – עבודת יד', placeholder: '100%', section: 'מסך פתיחה (Hero)' },

  // אודות
  { key: 'about_text', label: 'טקסט "אודות"', placeholder: 'ספרו על עצמכם...', section: 'אודות', multiline: true },
  { key: 'about_name', label: 'שם בעל העסק', placeholder: 'יוסי בן-דוד', section: 'אודות' },
  { key: 'about_title', label: 'תפקיד בעל העסק', placeholder: 'נגר ובעל הסדנה', section: 'אודות' },

  // CTA
  { key: 'cta_title', label: 'כותרת', placeholder: 'נהפוך אותו לעץ אמיתי', section: 'קריאה לפעולה (CTA)' },
  { key: 'cta_subtitle', label: 'תת-טקסט', placeholder: 'שיחה ראשונה היא תמיד חינם...', section: 'קריאה לפעולה (CTA)', multiline: true },
  { key: 'cta_badge', label: 'טקסט מעל הכותרת', placeholder: 'יש לכם רעיון?', section: 'קריאה לפעולה (CTA)' },
  { key: 'cta_btn_whatsapp', label: 'טקסט כפתור WhatsApp', placeholder: 'שלחו הודעה בוואטסאפ', section: 'קריאה לפעולה (CTA)' },

  // פרטי קשר
  { key: 'phone', label: 'טלפון', placeholder: '053-313-9394', section: 'פרטי קשר' },
  { key: 'whatsapp', label: 'WhatsApp (ספרות בלבד)', placeholder: '972533139394', section: 'פרטי קשר' },
  { key: 'email', label: 'אימייל', placeholder: 'reefww3939@gmail.com', section: 'פרטי קשר' },
  { key: 'address', label: 'כתובת / אזור', placeholder: 'מרכז הארץ', section: 'פרטי קשר' },

  // רשתות חברתיות
  { key: 'instagram', label: 'קישור Instagram', placeholder: 'https://instagram.com/...', section: 'רשתות חברתיות' },
  { key: 'facebook', label: 'קישור Facebook', placeholder: 'https://facebook.com/...', section: 'רשתות חברתיות' },
]

const SECTIONS = Array.from(new Set(FIELDS.map((f) => f.section)))

export default function SettingsManager() {
  const [values, setValues] = useState<Record<string, string>>({})
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState(false)
  const supabase = createClient()

  useEffect(() => {
    supabase
      .from('site_settings')
      .select('key, value')
      .then(({ data }) => {
        if (data) {
          const map: Record<string, string> = {}
          data.forEach((r) => { map[r.key] = r.value })
          setValues(map)
        }
        setLoading(false)
      })
  }, [])

  const set = (key: string, val: string) => setValues((v) => ({ ...v, [key]: val }))

  const save = async () => {
    setSaving(true)
    const upserts = Object.entries(values).map(([key, value]) => ({ key, value }))
    await supabase.from('site_settings').upsert(upserts, { onConflict: 'key' })
    setSaving(false)
    setSaved(true)
    setTimeout(() => setSaved(false), 2500)
  }

  if (loading) return (
    <div className="flex justify-center py-12">
      <div className="w-8 h-8 border-2 border-gold border-t-transparent rounded-full animate-spin" />
    </div>
  )

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-charcoal">הגדרות אתר</h2>
        <button
          onClick={save}
          disabled={saving}
          className="flex items-center gap-2 bg-gold hover:bg-gold-light text-cream px-5 py-2.5 rounded-xl text-sm font-medium transition-colors disabled:opacity-60"
        >
          {saved && <Check size={16} />}
          {saving ? 'שומר...' : saved ? 'נשמר!' : 'שמור הכל'}
        </button>
      </div>

      <div className="bg-amber-50 border border-amber-200 rounded-xl px-4 py-3 flex items-start gap-3 mb-8 text-sm text-amber-800">
        <AlertCircle size={16} className="mt-0.5 flex-shrink-0" />
        <p>שמרו ורענן את הדפדפן כדי לראות את השינויים באתר.</p>
      </div>

      <div className="space-y-10">

        {/* תמונות */}
        <div>
          <h3 className="text-xs font-bold text-charcoal/45 uppercase tracking-[0.15em] mb-4 pb-2 border-b border-charcoal/8">
            תמונות
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <label className="block text-sm font-medium text-charcoal mb-2">תמונת פתיחה (Hero)</label>
              <ImageUploader value={values['hero_image'] || ''} onChange={(url) => set('hero_image', url)} folder="hero" />
            </div>
            <div>
              <label className="block text-sm font-medium text-charcoal mb-2">תמונת "אודות"</label>
              <ImageUploader value={values['about_image'] || ''} onChange={(url) => set('about_image', url)} folder="about" />
            </div>
            <div>
              <label className="block text-sm font-medium text-charcoal mb-2">לוגו (אופציונלי)</label>
              <ImageUploader value={values['logo_url'] || ''} onChange={(url) => set('logo_url', url)} folder="logo" />
            </div>
          </div>
        </div>

        {/* סרטון רקע */}
        <div>
          <h3 className="text-xs font-bold text-charcoal/45 uppercase tracking-[0.15em] mb-4 pb-2 border-b border-charcoal/8">
            סרטון רקע (Hero)
          </h3>
          <p className="text-xs text-charcoal/45 mb-3">כשיש סרטון הוא מוצג במקום תמונת הפתיחה. רצוי MP4 קצר ומלוטש.</p>
          <VideoUploader value={values['hero_video'] || ''} onChange={(url) => set('hero_video', url)} />
        </div>

        {/* שאר השדות */}
        {SECTIONS.map((section) => (
          <div key={section}>
            <h3 className="text-xs font-bold text-charcoal/45 uppercase tracking-[0.15em] mb-4 pb-2 border-b border-charcoal/8">
              {section}
            </h3>
            <div className="space-y-4">
              {FIELDS.filter((f) => f.section === section).map((field) => (
                <div key={field.key}>
                  <label className="block text-sm font-medium text-charcoal mb-1.5">
                    {field.label}
                  </label>
                  {field.multiline ? (
                    <textarea
                      value={values[field.key] || ''}
                      onChange={(e) => set(field.key, e.target.value)}
                      rows={3}
                      className={inputCls}
                      placeholder={field.placeholder}
                    />
                  ) : (
                    <input
                      value={values[field.key] || ''}
                      onChange={(e) => set(field.key, e.target.value)}
                      className={inputCls}
                      placeholder={field.placeholder}
                    />
                  )}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="mt-10 pt-6 border-t border-charcoal/8 flex justify-end">
        <button
          onClick={save}
          disabled={saving}
          className="flex items-center gap-2 bg-gold hover:bg-gold-light text-cream px-8 py-3 rounded-xl font-medium transition-colors disabled:opacity-60"
        >
          {saved && <Check size={16} />}
          {saving ? 'שומר...' : saved ? 'נשמר בהצלחה!' : 'שמור הגדרות'}
        </button>
      </div>
    </div>
  )
}

const inputCls = 'w-full border border-charcoal/15 rounded-xl px-4 py-3 text-charcoal text-sm placeholder-charcoal/30 focus:outline-none focus:border-gold focus:ring-2 focus:ring-gold/15 transition-all bg-white'
