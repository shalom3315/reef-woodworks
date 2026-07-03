'use client'

import { X } from 'lucide-react'
import { cn } from '@/lib/utils'

interface ModalProps {
  open: boolean
  onClose: () => void
  title: string
  children: React.ReactNode
  footer?: React.ReactNode
  className?: string
  scrollable?: boolean
}

export function Modal({ open, onClose, title, children, footer, className, scrollable }: ModalProps) {
  if (!open) return null

  const wrapperCls = scrollable
    ? 'fixed inset-0 z-50 bg-charcoal/60 backdrop-blur-sm flex items-start justify-center overflow-y-auto py-6 px-4'
    : 'fixed inset-0 z-50 bg-charcoal/60 backdrop-blur-sm flex items-center justify-center p-4'

  return (
    <div className={wrapperCls}>
      <div className={cn('bg-white rounded-2xl shadow-2xl w-full max-w-lg', scrollable && 'mt-4', className)}>
        <div className="flex items-center justify-between p-6 border-b border-charcoal/8">
          <h3 className="font-semibold text-charcoal">{title}</h3>
          <button
            onClick={onClose}
            className="w-8 h-8 bg-cream rounded-lg flex items-center justify-center hover:bg-gold/15 transition-colors"
          >
            <X size={16} />
          </button>
        </div>

        <div className="p-6 space-y-4">{children}</div>

        {footer && (
          <div className="p-6 border-t border-charcoal/8 flex gap-3 justify-end">
            {footer}
          </div>
        )}
      </div>
    </div>
  )
}
