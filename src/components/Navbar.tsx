'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X } from 'lucide-react'
import Link from 'next/link'
import { useEditContext } from '@/contexts/EditContext'
import { EditField } from '@/components/EditField'

const navLinks = [
  { href: '#gallery', label: 'עבודות' },
  { href: '#process', label: 'תהליך' },
  { href: '#about', label: 'אודות' },
  { href: '#testimonials', label: 'המלצות' },
  { href: '#contact', label: 'צור קשר' },
]

export default function Navbar({ businessName = 'Reef Woodworks', logoUrl }: { businessName?: string; logoUrl?: string }) {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const { editing, draft } = useEditContext()

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20)
    handleScroll()
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const displayName = draft.business_name || businessName
  const [first, ...rest] = displayName.split(' ')

  return (
    <>
      <motion.nav
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled ? 'bg-charcoal/97 backdrop-blur-md shadow-xl' : 'bg-charcoal/75 backdrop-blur-sm'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3" onClick={editing ? (e) => e.preventDefault() : undefined}>
            {editing ? (
              <EditField fieldKey="business_name" className="font-heading text-xl font-bold text-cream tracking-wide" placeholder="שם העסק" />
            ) : logoUrl ? (
              <img src={logoUrl} alt={displayName} className="h-10 w-auto object-contain" />
            ) : (
              <span className="font-heading text-xl font-bold text-cream tracking-wide">
                <span className="text-gold">{first}</span>{rest.length ? ' ' + rest.join(' ') : ''}
              </span>
            )}
          </Link>

          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="w-10 h-10 flex items-center justify-center rounded-xl bg-white/10 hover:bg-white/20 transition-colors text-cream"
            aria-label="תפריט"
          >
            {menuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </motion.nav>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, x: 80 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 80 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
            className="fixed top-0 left-0 bottom-0 w-72 z-[70] bg-charcoal shadow-2xl flex flex-col pt-24 pb-10 px-8"
          >
            <button
              onClick={() => setMenuOpen(false)}
              className="absolute top-4 left-4 w-9 h-9 flex items-center justify-center rounded-lg bg-white/10 hover:bg-white/20 text-cream transition-colors"
              aria-label="סגור"
            >
              <X size={18} />
            </button>

            <nav className="flex flex-col gap-2">
              {navLinks.map((link, i) => (
                <motion.a
                  key={link.href}
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.06 }}
                  className="text-cream/80 hover:text-gold text-xl font-heading py-3 border-b border-white/8 transition-colors"
                >
                  {link.label}
                </motion.a>
              ))}
            </nav>

            <motion.a
              href="#contact"
              onClick={() => setMenuOpen(false)}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: navLinks.length * 0.06 + 0.1 }}
              className="mt-auto bg-gold hover:bg-gold-light text-cream text-center py-4 rounded-2xl text-lg font-semibold transition-colors"
            >
              קבל הצעת מחיר
            </motion.a>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.5 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[65] bg-black"
            onClick={() => setMenuOpen(false)}
          />
        )}
      </AnimatePresence>
    </>
  )
}
