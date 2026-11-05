import { createContext } from 'react'

export const TOAST_KIND = Object.freeze({
  ERROR: 'error',
  SUCCESS: 'success',
})

export const ToastContext = createContext(null)
