'use client'

import { useState, useRef, useEffect } from 'react'
import { MessageCircle, X, Send, Loader2 } from 'lucide-react'

interface Message {
  role: 'user' | 'assistant'
  content: string
}

function FormattedText({ text }: { text: string }) {
  const lines = text.split('\n')
  return (
    <div className="space-y-1">
      {lines.map((line, i) => {
        if (!line.trim()) return <div key={i} className="h-1" />
        const parts = line.split(/(\*\*[^*]+\*\*)/)
        return (
          <p key={i} className={line.startsWith('•') ? 'flex gap-1.5' : ''}>
            {line.startsWith('•') && <span className="text-gold mt-0.5 flex-shrink-0">•</span>}
            <span>
              {parts.map((part, j) =>
                part.startsWith('**') && part.endsWith('**')
                  ? <strong key={j} className="font-semibold">{part.slice(2, -2)}</strong>
                  : <span key={j}>{line.startsWith('•') && j === 0 ? part.slice(1).trim() : part}</span>
              )}
            </span>
          </p>
        )
      })}
    </div>
  )
}

export default function ChatWidget() {
  const [open, setOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([
    { role: 'assistant', content: 'שלום! אני מומחה הנגרות של ריף וודוורקס 🪵\nאשמח לעזור לך לבחור סוג עץ, גימור, או לענות על כל שאלה. במה אפשר לעזור?' }
  ])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const bottomRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (sessionStorage.getItem('chat_opened')) return
    const t = setTimeout(() => {
      setOpen(true)
      sessionStorage.setItem('chat_opened', '1')
    }, 3000)
    return () => clearTimeout(t)
  }, [])

  useEffect(() => {
    if (open) bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, open])

  const send = async () => {
    const text = input.trim()
    if (!text || loading) return

    const newMessages: Message[] = [...messages, { role: 'user', content: text }]
    setMessages(newMessages)
    setInput('')
    setLoading(true)

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: newMessages }),
      })
      const data = await res.json()
      const raw = data.text || (data.error ? `שגיאה: ${data.error}` : 'מצטער, הייתה שגיאה. נסה שוב.')
      // תיקון • שנמצאת לבד בשורה — מחברים אותה לשורה הבאה
      const lines = raw.replace(/\*+/g, '').split('\n')
      const fixed: string[] = []
      for (let i = 0; i < lines.length; i++) {
        if (lines[i].trim() === '•' && i + 1 < lines.length && lines[i + 1].trim()) {
          fixed.push('• ' + lines[i + 1].trim())
          i++
        } else {
          fixed.push(lines[i])
        }
      }
      const clean = fixed.join('\n').replace(/\n{3,}/g, '\n\n').trim()
      setMessages([...newMessages, { role: 'assistant', content: clean }])
    } catch {
      setMessages([...newMessages, { role: 'assistant', content: 'מצטער, הייתה שגיאה. נסה שוב.' }])
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3">
      {open && (
        <div className="w-64 md:w-80 bg-white rounded-2xl shadow-2xl border border-charcoal/10 flex flex-col overflow-hidden max-h-[55vh] md:max-h-[70vh]">
          {/* Header */}
          <div className="bg-charcoal px-4 py-3 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 bg-gold/20 rounded-full flex items-center justify-center">
                <span className="text-gold text-sm">🪵</span>
              </div>
              <div>
                <p className="text-cream text-sm font-semibold">מומחה ריף וודוורקס</p>
                <p className="text-cream/40 text-xs">AI · עונה מיד</p>
              </div>
            </div>
            <button onClick={() => setOpen(false)} className="text-cream/40 hover:text-cream transition-colors">
              <X size={18} />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3" dir="rtl">
            {messages.map((m, i) => (
              <div key={i} className={`flex ${m.role === 'user' ? 'justify-start' : 'justify-end'}`}>
                <div className={`max-w-[85%] px-3.5 py-2.5 rounded-2xl text-sm leading-relaxed ${
                  m.role === 'user'
                    ? 'bg-gold text-cream rounded-tr-sm'
                    : 'bg-cream text-charcoal rounded-tl-sm border border-charcoal/8'
                }`}>
                  {m.role === 'assistant'
                    ? <FormattedText text={m.content} />
                    : m.content
                  }
                </div>
              </div>
            ))}
            {loading && (
              <div className="flex justify-end">
                <div className="bg-cream border border-charcoal/8 px-3.5 py-2.5 rounded-2xl rounded-tl-sm flex items-center gap-1.5">
                  <Loader2 size={14} className="animate-spin text-gold" />
                  <span className="text-charcoal/50 text-xs">מעבד...</span>
                </div>
              </div>
            )}
            <div ref={bottomRef} />
          </div>

          {/* Input */}
          <div className="p-3 border-t border-charcoal/8 flex gap-2" dir="rtl">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && send()}
              placeholder="שאל על סוגי עץ, גימורים..."
              className="flex-1 bg-cream/60 border border-charcoal/12 rounded-xl px-3 py-2 text-sm text-charcoal placeholder-charcoal/35 focus:outline-none focus:border-gold focus:ring-1 focus:ring-gold/20"
            />
            <button
              onClick={send}
              disabled={!input.trim() || loading}
              className="w-9 h-9 bg-gold hover:bg-gold-light disabled:opacity-40 rounded-xl flex items-center justify-center transition-colors flex-shrink-0"
            >
              <Send size={15} className="text-cream -scale-x-100" />
            </button>
          </div>
        </div>
      )}

      {/* Toggle button */}
      <div className="flex items-center gap-2.5">
        {!open && (
          <span className="bg-charcoal/90 text-cream text-xs font-medium px-3 py-1.5 rounded-full shadow-lg whitespace-nowrap" dir="rtl">
            שאל את ה-ReefBot
          </span>
        )}
        <button
          onClick={() => setOpen(!open)}
          className="w-14 h-14 bg-charcoal hover:bg-charcoal/80 text-cream rounded-full shadow-xl flex items-center justify-center transition-all duration-300 hover:-translate-y-0.5 hover:shadow-2xl"
        >
          {open ? <X size={22} /> : <MessageCircle size={22} />}
        </button>
      </div>
    </div>
  )
}
