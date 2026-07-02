'use client'

import { createContext, useContext } from 'react'
import type { SiteSettings } from '@/types'

interface EditContextValue {
  editing: boolean
  saving: boolean
  draft: SiteSettings
  setField: (key: string, value: string) => void
  startEditing: () => void
  cancel: () => void
  save: () => void
}

export const EditContext = createContext<EditContextValue>({
  editing: false,
  saving: false,
  draft: {},
  setField: () => {},
  startEditing: () => {},
  cancel: () => {},
  save: () => {},
})

export const useEditContext = () => useContext(EditContext)
