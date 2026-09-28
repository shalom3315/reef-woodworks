'use client'

import { useEffect, useState } from 'react'
import { MotionConfig } from 'framer-motion'

// The CSS reduce-motion rules only stop CSS transitions — Framer Motion runs in JS
// and ignores them. This honours both the OS setting ("user") and the toggle in
// AccessibilityWidget, which marks <html> with the `reduce-motion` class.
export default function MotionProvider({ children }: { children: React.ReactNode }) {
  // Read the saved preference up front: the widget only adds the class in an
  // effect, after the hero's entrance animations have already started.
  const [forced, setForced] = useState(() => {
    try {
      return !!JSON.parse(localStorage.getItem('a11y-prefs') || '{}').reduceMotion
    } catch {
      return false
    }
  })

  useEffect(() => {
    const html = document.documentElement
    const sync = () => setForced(html.classList.contains('reduce-motion'))
    sync()
    const observer = new MutationObserver(sync)
    observer.observe(html, { attributes: true, attributeFilter: ['class'] })
    return () => observer.disconnect()
  }, [])

  return <MotionConfig reducedMotion={forced ? 'always' : 'user'}>{children}</MotionConfig>
}
