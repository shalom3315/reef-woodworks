'use client'

import { useState, useEffect } from 'react'
import { Accessibility, X, ZoomIn, ZoomOut, Contrast, Eye, RotateCcw } from 'lucide-react'

export default function AccessibilityWidget() {
  const [open, setOpen] = useState(false)
  const [fontSize, setFontSize] = useState(100)
  const [highContrast, setHighContrast] = useState(false)
  const [grayscale, setGrayscale] = useState(false)

  useEffect(() => {
    document.documentElement.style.fontSize = `${fontSize}%`
  }, [fontSize])

  useEffect(() => {
    if (highContrast) {
      document.documentElement.classList.add('high-contrast')
    } else {
      document.documentElement.classList.remove('high-contrast')
    }
  }, [highContrast])

  useEffect(() => {
    if (grayscale) {
      document.body.style.filter = 'grayscale(100%)'
    } else {
      document.body.style.filter = ''
    }
  }, [grayscale])

  const reset = () => {
    setFontSize(100)
    setHighContrast(false)
    setGrayscale(false)
  }

  return (
    <div className="fixed left-4 bottom-24 z-[90]" dir="rtl">
      {open && (
        <div className="mb-3 bg-white rounded-2xl shadow-2xl border border-charcoal/10 p-4 w-56">
          <div className="flex items-center justify-between mb-4">
            <span className="font-semibold text-charcoal text-sm">נגישות</span>
            <button onClick={() => setOpen(false)} className="w-6 h-6 flex items-center justify-center rounded-full hover:bg-cream transition-colors">
              <X size={14} className="text-charcoal/50" />
            </button>
          </div>

          <div className="space-y-3">
            {/* Font size */}
            <div>
              <p className="text-xs text-charcoal/50 mb-2">גודל טקסט</p>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setFontSize(f => Math.max(80, f - 10))}
                  className="flex-1 flex items-center justify-center gap-1.5 border border-charcoal/15 rounded-lg py-2 text-xs text-charcoal hover:bg-cream transition-colors"
                >
                  <ZoomOut size={14} /> הקטן
                </button>
                <span className="text-xs text-charcoal/40 w-10 text-center">{fontSize}%</span>
                <button
                  onClick={() => setFontSize(f => Math.min(140, f + 10))}
                  className="flex-1 flex items-center justify-center gap-1.5 border border-charcoal/15 rounded-lg py-2 text-xs text-charcoal hover:bg-cream transition-colors"
                >
                  <ZoomIn size={14} /> הגדל
                </button>
              </div>
            </div>

            {/* High contrast */}
            <button
              onClick={() => setHighContrast(v => !v)}
              className={`w-full flex items-center gap-2.5 border rounded-lg px-3 py-2.5 text-sm transition-colors ${highContrast ? 'border-gold bg-gold/10 text-gold' : 'border-charcoal/15 text-charcoal hover:bg-cream'}`}
            >
              <Contrast size={16} />
              ניגודיות גבוהה
            </button>

            {/* Grayscale */}
            <button
              onClick={() => setGrayscale(v => !v)}
              className={`w-full flex items-center gap-2.5 border rounded-lg px-3 py-2.5 text-sm transition-colors ${grayscale ? 'border-gold bg-gold/10 text-gold' : 'border-charcoal/15 text-charcoal hover:bg-cream'}`}
            >
              <Eye size={16} />
              גווני אפור
            </button>

            {/* Reset */}
            <button
              onClick={reset}
              className="w-full flex items-center gap-2.5 border border-charcoal/15 rounded-lg px-3 py-2.5 text-sm text-charcoal/50 hover:bg-cream transition-colors"
            >
              <RotateCcw size={16} />
              איפוס
            </button>
          </div>
        </div>
      )}

      <button
        onClick={() => setOpen(v => !v)}
        className="w-12 h-12 bg-charcoal hover:bg-charcoal/85 text-cream rounded-full shadow-xl flex items-center justify-center transition-all hover:scale-110"
        aria-label="תפריט נגישות"
      >
        <Accessibility size={22} />
      </button>
    </div>
  )
}
