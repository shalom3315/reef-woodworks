'use client'

import { useEditContext } from '@/contexts/EditContext'

interface EditFieldProps {
  fieldKey: string
  className?: string
  placeholder?: string
  multiline?: boolean
}

export function EditField({ fieldKey, className, placeholder, multiline }: EditFieldProps) {
  const { editing, draft, setField } = useEditContext()
  const value = draft[fieldKey] ?? ''

  if (!editing) {
    return <span className={className}>{value}</span>
  }

  if (multiline) {
    return (
      <textarea
        value={value}
        onChange={(e) => setField(fieldKey, e.target.value)}
        placeholder={placeholder ?? ''}
        rows={4}
        dir="rtl"
        className={`editable-field w-full resize-none ${className ?? ''}`}
        style={{ fontFamily: 'inherit', fontSize: 'inherit', lineHeight: 'inherit', color: 'inherit' }}
      />
    )
  }

  return (
    <input
      type="text"
      value={value}
      onChange={(e) => setField(fieldKey, e.target.value)}
      placeholder={placeholder ?? ''}
      dir="rtl"
      className={`editable-field w-full ${className ?? ''}`}
      style={{ fontFamily: 'inherit', fontSize: 'inherit', lineHeight: 'inherit', color: 'inherit' }}
    />
  )
}
