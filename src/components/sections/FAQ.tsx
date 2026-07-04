'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Plus, Minus } from 'lucide-react'
import type { FAQ } from '@/types'

const DEFAULT_FAQS: FAQ[] = [
  { id: '1', order_index: 0, question: 'כמה זמן לוקח לייצר רהיט בהתאמה אישית?', answer: 'תלוי בסוג הרהיט ובעומס העבודה. שולחן אוכל לוקח בדרך כלל 3-5 שבועות, ארון גדול 5-8 שבועות. בכל מקרה תקבלו עדכון מדויק לפני תחילת העבודה.' },
  { id: '2', order_index: 1, question: 'מה ההבדל בין סוגי העץ השונים?', answer: 'כל עץ שונה באופיו — אלון קשה ועמיד מאוד ומתאים לשימוש יומיומי, וולנט כהה ויוקרתי ומתאים לסלון, עץ אש בהיר וגמיש לעיצוב. בשיחה הראשונה נמליץ לכם על הסוג המתאים לצורך שלכם.' },
  { id: '3', order_index: 2, question: 'האם אפשר לראות דוגמאות של עבודות קודמות?', answer: 'בהחלט — הגלריה באתר מציגה חלק מהפרויקטים שלנו. בפגישה ניתן לראות דוגמאות נוספות ולמשש את החומרים.' },
  { id: '4', order_index: 3, question: 'האם יש אפשרות לתשלום בפריסה?', answer: 'כן. בדרך כלל 50% מקדמה בהזמנה ו-50% במסירה. לפרויקטים גדולים ניתן לסכם על תנאי תשלום גמישים יותר.' },
  { id: '5', order_index: 4, question: 'מה קורה אם הרהיט לא מתאים בדיוק?', answer: 'כל פרויקט עובר מדידה קפדנית לפני ייצור. אם בכל זאת יש אי-התאמה קלה — מטפלים בה ללא עלות נוספת.' },
  { id: '6', order_index: 5, question: 'האם אתם מגיעים לבית הלקוח?', answer: 'כן — כולל מדידות, ייעוץ עיצובי במקום, ומשלוח והרכבה עד הבית. הכל כלול.' },
]

export default function FAQ({ faqs }: { faqs?: FAQ[] }) {
  const [open, setOpen] = useState<string | null>(null)
  const data = (faqs && faqs.length > 0) ? faqs : DEFAULT_FAQS

  return (
    <section id="faq" className="py-24 bg-white" dir="rtl">
      <div className="max-w-3xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <span className="text-gold text-sm font-medium tracking-widest uppercase block mb-3">שאלות נפוצות</span>
          <h2 className="font-heading text-4xl md:text-5xl text-charcoal mb-4">יש לכם שאלות?</h2>
          <p className="text-charcoal/50 text-lg">ריכזנו את השאלות שחוזרות הכי הרבה</p>
        </motion.div>

        <div className="space-y-3">
          {data.map((faq, i) => (
            <motion.div
              key={faq.id}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.07 }}
              className={`border rounded-2xl overflow-hidden transition-colors duration-200 ${open === faq.id ? 'border-gold/40 bg-cream/40' : 'border-charcoal/10 bg-white hover:border-gold/20'}`}
            >
              <button
                onClick={() => setOpen(open === faq.id ? null : faq.id)}
                className="w-full flex items-center justify-between gap-4 px-6 py-5 text-right"
              >
                <span className="font-semibold text-charcoal text-[0.95rem] leading-snug">{faq.question}</span>
                <div className={`w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 transition-colors ${open === faq.id ? 'bg-gold text-cream' : 'bg-cream text-charcoal/40'}`}>
                  {open === faq.id ? <Minus size={14} /> : <Plus size={14} />}
                </div>
              </button>

              <AnimatePresence initial={false}>
                {open === faq.id && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.25 }}
                  >
                    <p className="px-6 pb-5 text-charcoal/65 leading-relaxed text-sm border-t border-charcoal/8 pt-4">
                      {faq.answer}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center mt-10"
        >
          <p className="text-charcoal/45 text-sm mb-4">לא מצאתם תשובה? דברו איתנו ישירות</p>
          <a
            href="https://wa.me/972532213939"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-gold hover:bg-gold-light text-cream font-semibold px-7 py-3 rounded-xl transition-all hover:shadow-lg hover:shadow-gold/25"
          >
            שאלו אותנו בוואטסאפ
          </a>
        </motion.div>
      </div>
    </section>
  )
}
