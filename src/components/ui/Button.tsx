import { cn } from '@/lib/utils'

type Variant = 'primary' | 'secondary' | 'danger' | 'icon'

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant
  size?: 'sm' | 'md'
}

const variants: Record<Variant, string> = {
  primary: 'bg-gold hover:bg-gold-light text-cream font-medium px-5 py-2.5',
  secondary: 'border border-charcoal/15 text-charcoal/60 hover:bg-cream px-5 py-2.5',
  danger: 'bg-cream hover:bg-red-50 w-8 h-8',
  icon: 'bg-cream hover:bg-gold/15 w-8 h-8',
}

export function Button({ variant = 'primary', size, className, children, disabled, ...props }: ButtonProps) {
  return (
    <button
      className={cn(
        'flex items-center justify-center gap-2 rounded-xl text-sm transition-colors',
        'disabled:opacity-50 disabled:cursor-not-allowed',
        variants[variant],
        className
      )}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  )
}
