import { useActionState, useEffect, useRef } from 'react'
import { useFormStatus } from 'react-dom'
import { CircleNotch, X } from '@phosphor-icons/react'
import { logIn, oauthStartUrl, signUp } from '../lib/api'
import {
  AUTH_MODE,
  AUTH_PROVIDER,
  AUTH_REASON,
  PROVIDER_LABEL,
} from '../lib/auth'

const SAVE_NOTE = "Saving needs an account. Sign in or create one and we'll save your CV."

const MODE_COPY = {
  [AUTH_MODE.LOG_IN]: {
    title: 'Log in',
    submit: 'Log in',
    toggle: "Don't have an account?",
    toggleAction: 'Create one',
    other: AUTH_MODE.SIGN_UP,
  },
  [AUTH_MODE.SIGN_UP]: {
    title: 'Create account',
    submit: 'Create account',
    toggle: 'Already have an account?',
    toggleAction: 'Log in',
    other: AUTH_MODE.LOG_IN,
  },
}

const inputClass =
  'w-full rounded-lg border border-ink-line bg-ink px-4 py-3 text-[15px] text-paper placeholder:text-paper-dim/60 focus:border-paper-dim focus:outline-none'

function SubmitButton({ children }) {
  const { pending } = useFormStatus()
  return (
    <button
      type="submit"
      disabled={pending}
      className="flex items-center justify-center gap-2 rounded-full bg-paper px-5 py-3 text-[15px] font-medium text-ink transition-all duration-200 hover:bg-white active:scale-[0.98] disabled:pointer-events-none disabled:opacity-60"
    >
      {pending && <CircleNotch size={16} weight="bold" className="animate-spin" />}
      {children}
    </button>
  )
}

function EmailForm({ isSignUp, submitLabel, oauthError, onSignedIn }) {
  const [formState, formAction] = useActionState(
    async (_previous, formData) => {
      const credentials = Object.fromEntries(formData)
      try {
        const response = await (isSignUp ? signUp(credentials) : logIn(credentials))
        onSignedIn(response.data.user)
        return { error: null }
      } catch (err) {
        return { error: err.message }
      }
    },
    { error: null },
  )
  const error = formState.error ?? oauthError

  return (
    <form action={formAction} className="flex flex-col gap-4">
      {isSignUp && (
        <input name="name" type="text" required autoComplete="name" placeholder="Full name" aria-label="Full name" className={inputClass} />
      )}
      <input name="email" type="email" required autoComplete="email" placeholder="Email" aria-label="Email" className={inputClass} />
      <input
        name="password"
        type="password"
        required
        minLength={isSignUp ? 8 : undefined}
        autoComplete={isSignUp ? 'new-password' : 'current-password'}
        placeholder="Password"
        aria-label="Password"
        className={inputClass}
      />
      {error && (
        <p role="alert" className="text-sm text-ember">
          {error}
        </p>
      )}
      <SubmitButton>{submitLabel}</SubmitButton>
    </form>
  )
}

function AuthModal({ modal, onClose, onSignedIn, onModeChange }) {
  const dialogRef = useRef(null)
  const openRef = useRef(false)
  const { open, reason, mode, error: oauthError } = modal
  const copy = MODE_COPY[mode]

  useEffect(() => {
    const dialog = dialogRef.current
    openRef.current = open
    if (open && !dialog.open) dialog.showModal()
    if (!open && dialog.open) dialog.close()
  }, [open])

  useEffect(() => {
    const dialog = dialogRef.current
    const handleClose = () => {
      if (openRef.current) onClose()
    }
    dialog.addEventListener('close', handleClose)
    return () => dialog.removeEventListener('close', handleClose)
  }, [onClose])

  return (
    <dialog
      ref={dialogRef}
      aria-labelledby="auth-modal-title"
      className="m-auto w-[calc(100%-2rem)] max-w-md rounded-2xl border border-ink-line bg-ink-raised p-0 text-paper backdrop:bg-black/60"
    >
      <div className="flex flex-col gap-6 p-6 sm:p-8">
        <div className="flex items-start justify-between gap-4">
          <h2 id="auth-modal-title" className="font-display text-2xl font-semibold tracking-tight">
            {copy.title}
          </h2>
          <button
            type="button"
            onClick={() => dialogRef.current.close()}
            aria-label="Close"
            className="text-paper-dim transition-colors hover:text-paper"
          >
            <X size={20} />
          </button>
        </div>

        {reason === AUTH_REASON.SAVE && <p className="text-sm text-paper-dim">{SAVE_NOTE}</p>}

        <div className="flex flex-col gap-3">
          {Object.values(AUTH_PROVIDER).map((provider) => (
            <button
              key={provider}
              type="button"
              onClick={() => window.location.assign(oauthStartUrl(provider, window.location.pathname))}
              className="rounded-full border border-ink-line px-5 py-3 text-[15px] font-medium transition-colors hover:border-paper-dim"
            >
              Continue with {PROVIDER_LABEL[provider]}
            </button>
          ))}
        </div>

        <p className="text-center text-xs uppercase tracking-widest text-paper-dim">or</p>

        <EmailForm
          key={`${mode}-${open}`}
          isSignUp={mode === AUTH_MODE.SIGN_UP}
          submitLabel={copy.submit}
          oauthError={oauthError}
          onSignedIn={onSignedIn}
        />

        <p className="text-center text-sm text-paper-dim">
          {copy.toggle}{' '}
          <button
            type="button"
            onClick={() => onModeChange(copy.other)}
            className="font-medium text-paper underline underline-offset-4"
          >
            {copy.toggleAction}
          </button>
        </p>
      </div>
    </dialog>
  )
}

export default AuthModal
