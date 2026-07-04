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
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3" onClick={editing ? (e) => e.preventDefault() : undefined}>
            {editing ? (
              <EditField fieldKey="business_name" className="font-heading text-2xl font-bold text-cream tracking-wide" placeholder="שם העסק" />
            ) : logoUrl ? (
              <img src={logoUrl} alt={displayName} className="h-20 w-auto object-contain" />
            ) : (
              <span className="font-heading text-2xl font-bold text-cream tracking-wide">
                <span className="text-gold">{first}</span>{rest.length ? ' ' + rest.join(' ') : ''}
              </span>
            )}
          </Link>

          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a key={link.href} href={link.href} className="text-cream/75 hover:text-gold transition-colors duration-200 font-body text-sm font-medium">
                {link.label}
              </a>
            ))}
            <a href="#contact" className="bg-gold hover:bg-gold-light text-cream px-6 py-2.5 rounded-full text-sm font-semibold transition-all duration-300 hover:shadow-lg hover:shadow-gold/30">
              קבל הצעת מחיר
            </a>
          </div>

          <button onClick={() => setMenuOpen(!menuOpen)} className="md:hidden text-cream p-1" aria-label="תפריט">
            {menuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </motion.nav>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 bg-charcoal/98 flex flex-col items-center justify-center gap-8"
          >
            {navLinks.map((link, i) => (
              <motion.a
                key={link.href}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.07 }}
                className="text-cream text-3xl font-heading hover:text-gold transition-colors"
              >
                {link.label}
              </motion.a>
            ))}
            <motion.a
              href="#contact"
              onClick={() => setMenuOpen(false)}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: navLinks.length * 0.07 }}
              className="mt-4 bg-gold text-cream px-10 py-4 rounded-full text-xl font-semibold hover:bg-gold-light transition-colors"
            >
              קבל הצעת מחיר
            </motion.a>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
