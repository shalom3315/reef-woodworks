import { cn } from '@/lib/utils'

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {}

export function Input({ className, ...props }: InputProps) {
  return (
    <input
      className={cn(
        'w-full border border-charcoal/15 rounded-xl px-3.5 py-2.5 text-charcoal text-sm',
        'placeholder-charcoal/30 focus:outline-none focus:border-gold focus:ring-2',
        'focus:ring-gold/15 transition-all bg-white',
        className
      )}
      {...props}
    />
  )
}

interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {}

export function Textarea({ className, ...props }: TextareaProps) {
  return (
    <textarea
      className={cn(
        'w-full border border-charcoal/15 rounded-xl px-3.5 py-2.5 text-charcoal text-sm',
        'placeholder-charcoal/30 focus:outline-none focus:border-gold focus:ring-2',
        'focus:ring-gold/15 transition-all bg-white resize-none',
        className
      )}
      {...props}
    />
  )
}
