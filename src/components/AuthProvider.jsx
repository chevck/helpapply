import { useCallback, useEffect, useMemo, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { getMe, logOut as logOutRequest } from '../lib/api'
import {
  AUTH_MODE,
  AUTH_REASON,
  AUTH_STATUS,
  oauthErrorMessage,
} from '../lib/auth'
import { AuthContext } from '../lib/authContext'
import { clearPendingSave } from '../lib/pendingSave'
import AuthModal from './AuthModal'

const CLOSED_MODAL = { open: false, reason: AUTH_REASON.DEFAULT, mode: AUTH_MODE.LOG_IN, error: null }

function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [status, setStatus] = useState(AUTH_STATUS.LOADING)
  const [searchParams, setSearchParams] = useSearchParams()
  const [modal, setModal] = useState(() => {
    const provider = searchParams.get('auth_error')
    return provider === null
      ? CLOSED_MODAL
      : { ...CLOSED_MODAL, open: true, error: oauthErrorMessage(provider) }
  })
  const hasAuthError = searchParams.has('auth_error')

  useEffect(() => {
    const controller = new AbortController()
    getMe({ signal: controller.signal })
      .then((response) => {
        const me = response?.data?.user ?? null
        setUser(me)
        setStatus(me ? AUTH_STATUS.AUTHENTICATED : AUTH_STATUS.ANONYMOUS)
      })
      .catch((err) => {
        if (err.name === 'AbortError') return
        setStatus(AUTH_STATUS.ANONYMOUS)
      })
    return () => controller.abort()
  }, [])

  useEffect(() => {
    if (!hasAuthError) return
    setSearchParams(
      (params) => {
        params.delete('auth_error')
        return params
      },
      { replace: true },
    )
  }, [hasAuthError, setSearchParams])

  const openAuthModal = useCallback(({ reason = AUTH_REASON.DEFAULT, mode = AUTH_MODE.LOG_IN } = {}) => {
    setModal({ open: true, reason, mode, error: null })
  }, [])

  const closeModal = useCallback(() => {
    clearPendingSave()
    setModal(CLOSED_MODAL)
  }, [])

  const onSignedIn = useCallback((signedInUser) => {
    setUser(signedInUser)
    setStatus(AUTH_STATUS.AUTHENTICATED)
    setModal(CLOSED_MODAL)
  }, [])

  const setMode = useCallback((mode) => {
    setModal((current) => ({ ...current, mode, error: null }))
  }, [])

  const logOut = useCallback(async () => {
    await logOutRequest()
    setUser(null)
    setStatus(AUTH_STATUS.ANONYMOUS)
  }, [])

  const value = useMemo(
    () => ({ user, status, openAuthModal, logOut }),
    [user, status, openAuthModal, logOut],
  )

  return (
    <AuthContext.Provider value={value}>
      {children}
      <AuthModal modal={modal} onClose={closeModal} onSignedIn={onSignedIn} onModeChange={setMode} />
    </AuthContext.Provider>
  )
}

export default AuthProvider
