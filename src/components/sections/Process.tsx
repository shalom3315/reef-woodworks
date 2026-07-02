'use client'

import { motion } from 'framer-motion'
import { MessageCircle, Ruler, Wrench, PackageCheck } from 'lucide-react'

const steps = [
  {
    icon: MessageCircle,
    title: 'יצירת קשר',
    description: 'שלחו הודעה בוואטסאפ או התקשרו. שיחה ראשונה קצרה תעזור לנו להבין מה אתם צריכים.',
    detail: 'ללא עלות · תוך 24 שעות',
  },
  {
    icon: Ruler,
    title: 'אפיון ועיצוב',
    description: 'נגיע לראות את המקום, נקשיב לרצונות ונציע פתרון מותאם עם סקיצות, מידות והצעת מחיר.',
    detail: 'פגישה בביתכם · בחינם',
  },
  {
    icon: Wrench,
    title: 'ייצור בעבודת יד',
    description: 'נבנה את הפריט בסדנה, עם תשומת לב לכל פרט. תקבלו עדכונים ותמונות לאורך הדרך.',
    detail: 'עדכונים שוטפים',
  },
  {
    icon: PackageCheck,
    title: 'מסירה והתקנה',
    description: 'נגיע אליכם, נדאג להתקנה מקצועית ונוודא שהכל מושלם ומשביע רצון לפני שנלך.',
    detail: 'שירות עד הבית',
  },
]

export default function Process() {
  return (
    <section id="process" className="py-28 bg-cream relative overflow-hidden">
      {/* Decorative wood grain */}
      <div className="absolute left-0 top-0 bottom-0 w-2 bg-gradient-to-b from-transparent via-gold/20 to-transparent" />

      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <span className="inline-block text-gold font-medium text-sm tracking-[0.2em] uppercase mb-4">
            איך זה עובד
          </span>
          <h2 className="font-heading text-4xl md:text-5xl text-charcoal mb-4">
            תהליך פשוט, תוצאה מושלמת
          </h2>
          <p className="text-charcoal/55 max-w-md mx-auto">
            מהרגע הראשון שאתם מתקשרים ועד שהרהיט עומד בבית – אנחנו ביחד.
          </p>
        </motion.div>

        <div className="relative">
          {/* Horizontal connector (desktop) */}
          <div className="hidden lg:block absolute top-[3.25rem] right-[12.5%] left-[12.5%] h-px">
            <div className="h-full bg-gradient-to-l from-transparent via-gold/30 to-transparent" />
            <div className="absolute inset-0 flex justify-between px-0">
              {[0, 1, 2].map((i) => (
                <div key={i} className="w-px h-full" />
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {steps.map((step, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 35 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15, duration: 0.65, ease: 'easeOut' }}
                className="relative flex flex-col items-center text-center lg:items-start lg:text-right"
              >
                {/* Step number + icon */}
                <div className="relative mb-6">
                  <div className="w-[6.5rem] h-[6.5rem] bg-charcoal rounded-2xl flex items-center justify-center shadow-lg mx-auto lg:mx-0">
                    <step.icon className="text-gold" size={30} strokeWidth={1.5} />
                  </div>
                  <div className="absolute -top-3 -right-3 w-7 h-7 bg-gold rounded-full flex items-center justify-center shadow-md">
                    <span className="text-cream text-xs font-bold">{i + 1}</span>
                  </div>
                </div>

                <div className="flex-1">
                  <h3 className="font-heading text-xl text-charcoal mb-2">{step.title}</h3>
                  <p className="text-charcoal/60 text-sm leading-relaxed mb-3">{step.description}</p>
                  <span className="inline-block bg-gold/10 text-gold/80 text-xs px-3 py-1 rounded-full">
                    {step.detail}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6 }}
          className="text-center mt-16"
        >
          <a
            href="#contact"
            className="inline-block bg-charcoal hover:bg-charcoal/85 text-cream font-semibold px-8 py-4 rounded-xl text-lg transition-all duration-300 hover:shadow-xl"
          >
            בואו נתחיל
          </a>
        </motion.div>
      </div>
    </section>
  )
}
