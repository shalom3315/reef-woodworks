'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'

export default function CookieBanner() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    if (!localStorage.getItem('cookie_consent')) {
      setVisible(true)
    }
  }, [])

  const accept = () => {
    localStorage.setItem('cookie_consent', '1')
    setVisible(false)
  }

  if (!visible) return null

  return (
    <div className="fixed bottom-0 left-0 right-0 z-[100] bg-charcoal/97 backdrop-blur-sm border-t border-gold/20 px-6 py-4" dir="rtl">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        <p className="text-cream/70 text-sm text-center sm:text-right">
          האתר משתמש בעוגיות לצורך ניתוח תנועה ושיפור החוויה.{' '}
          <Link href="/privacy" className="text-gold underline hover:text-gold-light transition-colors">
            מדיניות פרטיות
          </Link>
        </p>
        <button
          onClick={accept}
          className="flex-shrink-0 bg-gold hover:bg-gold-light text-charcoal font-semibold text-sm px-6 py-2.5 rounded-xl transition-colors"
        >
          הבנתי, אני מסכים
        </button>
      </div>
    </div>
  )
}
