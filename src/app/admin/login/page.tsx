'use client'

export const dynamic = 'force-dynamic'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase'
import { Eye, EyeOff, Lock } from 'lucide-react'

export default function AdminLogin() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const router = useRouter()
  const supabase = createClient()

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      if (data.session) router.replace('/admin/dashboard')
    })
  }, [])

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    const { error: authError } = await supabase.auth.signInWithPassword({ email, password })

    if (authError) {
      setError('פרטי ההתחברות שגויים. בדקו את האימייל והסיסמה.')
      setLoading(false)
    } else {
      router.replace('/admin/dashboard')
    }
  }

  return (
    <div className="min-h-screen bg-cream flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-14 h-14 bg-charcoal rounded-2xl mb-4 shadow-lg">
            <Lock size={24} className="text-gold" />
          </div>
          <h1 className="font-heading text-3xl text-charcoal">כניסה לניהול</h1>
          <p className="text-charcoal/45 mt-1.5 text-sm">בן-דוד נגרות · מערכת ניהול</p>
        </div>

        <div className="bg-white rounded-2xl shadow-wood p-8 border border-charcoal/5">
          <form onSubmit={handleLogin} className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-charcoal mb-2">
                כתובת אימייל
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                autoComplete="email"
                className="w-full border border-charcoal/15 rounded-xl px-4 py-3 text-charcoal placeholder-charcoal/30 focus:outline-none focus:border-gold focus:ring-2 focus:ring-gold/20 transition-all"
                placeholder="admin@example.com"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-charcoal mb-2">
                סיסמה
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  autoComplete="current-password"
                  className="w-full border border-charcoal/15 rounded-xl px-4 py-3 text-charcoal placeholder-charcoal/30 focus:outline-none focus:border-gold focus:ring-2 focus:ring-gold/20 transition-all pl-12"
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-charcoal/35 hover:text-charcoal/60 transition-colors"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            {error && (
              <div className="bg-red-50 border border-red-200 rounded-xl px-4 py-3 text-red-600 text-sm text-center">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gold hover:bg-gold-light text-cream font-semibold py-3.5 rounded-xl transition-all duration-300 hover:shadow-lg hover:shadow-gold/25 disabled:opacity-60 disabled:cursor-not-allowed mt-2"
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/>
                  </svg>
                  מתחבר...
                </span>
              ) : 'כניסה'}
            </button>
          </form>
        </div>

        <p className="text-center text-charcoal/30 text-xs mt-6">
          <a href="/" className="hover:text-charcoal/50 transition-colors">← חזרה לאתר</a>
        </p>
      </div>
    </div>
  )
}
