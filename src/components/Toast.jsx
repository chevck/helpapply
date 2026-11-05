import { useCallback, useMemo, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { AnimatePresence, motion, useReducedMotion } from 'motion/react'
import { CheckCircle, WarningCircle, X } from '@phosphor-icons/react'
import { TOAST_KIND, ToastContext } from '../lib/toastContext'

const DEFAULT_DURATION = 6000
const ease = [0.16, 1, 0.3, 1]

const KIND_PRESENTATION = {
  [TOAST_KIND.ERROR]: { Icon: WarningCircle, role: 'alert', iconClass: 'text-ember-dim' },
  [TOAST_KIND.SUCCESS]: { Icon: CheckCircle, role: 'status', iconClass: 'text-paper' },
}

function ToastViewport({ toasts, onDismiss }) {
  const reduce = useReducedMotion()

  return createPortal(
    <div className="pointer-events-none fixed inset-x-4 bottom-4 z-[100] flex flex-col items-center gap-3 sm:inset-x-auto sm:bottom-6 sm:right-6 sm:items-end">
      <AnimatePresence initial={false}>
        {toasts.map((toast) => {
          const { Icon, role, iconClass } = KIND_PRESENTATION[toast.kind]
          return (
            <motion.div
              key={toast.id}
              role={role}
              layout={!reduce}
              initial={reduce ? false : { opacity: 0, y: 16, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={reduce ? { opacity: 0 } : { opacity: 0, x: 24, transition: { duration: 0.2 } }}
              transition={{ duration: 0.35, ease }}
              className="pointer-events-auto flex w-full max-w-sm items-start gap-3 rounded-xl border border-ink-line bg-ink-raised p-4 shadow-[0_20px_50px_-20px_rgba(0,0,0,0.6)]"
            >
              <Icon size={20} weight="bold" className={`mt-0.5 shrink-0 ${iconClass}`} />
              <p className="flex-1 text-[14px] leading-snug text-paper">{toast.message}</p>
              <button
                type="button"
                onClick={() => onDismiss(toast.id)}
                aria-label="Dismiss"
                className="shrink-0 text-paper-dim transition-colors hover:text-paper"
              >
                <X size={16} />
              </button>
            </motion.div>
          )
        })}
      </AnimatePresence>
    </div>,
    document.body
  )
}

function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([])
  const idRef = useRef(0)
  const timersRef = useRef({})

  const dismiss = useCallback((id) => {
    clearTimeout(timersRef.current[id])
    delete timersRef.current[id]
    setToasts((current) => current.filter((t) => t.id !== id))
  }, [])

  const push = useCallback(
    (kind, message, duration = DEFAULT_DURATION) => {
      const id = idRef.current++
      setToasts((current) => [...current, { id, kind, message }])
      timersRef.current[id] = setTimeout(() => dismiss(id), duration)
    },
    [dismiss]
  )

  const value = useMemo(
    () => ({
      error: (message, duration) => push(TOAST_KIND.ERROR, message, duration),
      success: (message, duration) => push(TOAST_KIND.SUCCESS, message, duration),
    }),
    [push]
  )

  return (
    <ToastContext.Provider value={value}>
      {children}
      <ToastViewport toasts={toasts} onDismiss={dismiss} />
    </ToastContext.Provider>
  )
}

export default ToastProvider
