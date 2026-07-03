'use client'

export const dynamic = 'force-dynamic'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase'
import ProjectsManager from '@/components/admin/ProjectsManager'
import TestimonialsManager from '@/components/admin/TestimonialsManager'
import SettingsManager from '@/components/admin/SettingsManager'
import VideosManager from '@/components/admin/VideosManager'
import FAQManager from '@/components/admin/FAQManager'
import {
  LayoutGrid,
  MessageSquare,
  Settings,
  LogOut,
  ExternalLink,
  Menu,
  X,
  Video,
  HelpCircle,
} from 'lucide-react'

type Tab = 'projects' | 'testimonials' | 'settings' | 'videos' | 'faq'

const TABS = [
  { id: 'projects' as Tab, label: 'פרויקטים', icon: LayoutGrid },
  { id: 'videos' as Tab, label: 'סרטונים', icon: Video },
  { id: 'testimonials' as Tab, label: 'המלצות', icon: MessageSquare },
  { id: 'faq' as Tab, label: 'שאלות נפוצות', icon: HelpCircle },
  { id: 'settings' as Tab, label: 'הגדרות', icon: Settings },
]

export default function AdminDashboard() {
  const [tab, setTab] = useState<Tab>('projects')
  const [user, setUser] = useState<{ email?: string } | null>(null)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [checkingAuth, setCheckingAuth] = useState(true)
  const router = useRouter()
  const supabase = createClient()

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      if (!data.session) {
        router.replace('/admin/login')
      } else {
        setUser(data.session.user)
        setCheckingAuth(false)
      }
    })
  }, [])

  const logout = async () => {
    await supabase.auth.signOut()
    router.replace('/admin/login')
  }

  if (checkingAuth) {
    return (
      <div className="min-h-screen bg-cream flex items-center justify-center">
        <div className="w-10 h-10 border-2 border-gold border-t-transparent rounded-full animate-spin" />
      </div>
    )
  }

  const ActiveTab = tab === 'projects' ? ProjectsManager : tab === 'testimonials' ? TestimonialsManager : tab === 'videos' ? VideosManager : tab === 'faq' ? FAQManager : SettingsManager

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Top bar */}
      <header className="bg-charcoal border-b border-cream/10 sticky top-0 z-30">
        <div className="flex items-center justify-between px-4 md:px-6 h-16">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="md:hidden text-cream/60 hover:text-cream transition-colors"
            >
              {mobileOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
            <span className="font-heading text-cream text-lg">
              <span className="text-gold">בן-דוד</span> נגרות
            </span>
            <span className="hidden md:inline text-cream/25 text-sm">· ניהול</span>
          </div>

          <div className="flex items-center gap-3">
            <a
              href="/"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden md:flex items-center gap-1.5 text-cream/40 hover:text-cream/70 text-sm transition-colors"
            >
              <ExternalLink size={14} />
              צפה באתר
            </a>

            <div className="hidden md:flex items-center gap-2 border-r border-cream/10 pr-3 mr-1">
              <div className="w-7 h-7 bg-gold/20 rounded-full flex items-center justify-center">
                <span className="text-gold text-xs font-bold">
                  {user?.email?.charAt(0).toUpperCase()}
                </span>
              </div>
              <span className="text-cream/50 text-xs">{user?.email}</span>
            </div>

            <button
              onClick={logout}
              className="flex items-center gap-1.5 text-cream/40 hover:text-red-400 transition-colors text-sm"
            >
              <LogOut size={16} />
              <span className="hidden md:inline">יציאה</span>
            </button>
          </div>
        </div>
      </header>

      <div className="flex flex-1">
        {/* Sidebar */}
        <aside
          className={`
            fixed md:static inset-y-0 right-0 top-16 z-20
            w-56 bg-white border-l border-charcoal/8 shadow-lg md:shadow-none
            transition-transform duration-300 md:translate-x-0
            ${mobileOpen ? 'translate-x-0' : 'translate-x-full md:translate-x-0'}
          `}
        >
          <nav className="p-4 space-y-1 pt-6">
            {TABS.map((t) => (
              <button
                key={t.id}
                onClick={() => { setTab(t.id); setMobileOpen(false) }}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                  tab === t.id
                    ? 'bg-gold/12 text-gold border border-gold/20'
                    : 'text-charcoal/60 hover:bg-cream hover:text-charcoal'
                }`}
              >
                <t.icon size={17} />
                {t.label}
              </button>
            ))}
          </nav>

          <div className="absolute bottom-6 right-0 left-0 px-4 md:hidden">
            <a
              href="/"
              target="_blank"
              className="flex items-center gap-2 text-charcoal/40 hover:text-charcoal/60 text-sm px-4 py-2 transition-colors"
            >
              <ExternalLink size={14} />
              צפה באתר
            </a>
          </div>
        </aside>

        {/* Mobile overlay */}
        {mobileOpen && (
          <div
            className="fixed inset-0 bg-charcoal/50 z-10 md:hidden"
            onClick={() => setMobileOpen(false)}
          />
        )}

        {/* Main content */}
        <main className="flex-1 p-6 md:p-8 max-w-5xl">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-sm text-charcoal/40 mb-6">
            <span>ניהול</span>
            <span>/</span>
            <span className="text-charcoal font-medium">
              {TABS.find((t) => t.id === tab)?.label}
            </span>
          </div>

          <ActiveTab />
        </main>
      </div>
    </div>
  )
}
