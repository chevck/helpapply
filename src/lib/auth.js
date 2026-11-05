export const AUTH_STATUS = Object.freeze({
  LOADING: 'loading',
  AUTHENTICATED: 'authenticated',
  ANONYMOUS: 'anonymous',
})

export const AUTH_MODE = Object.freeze({
  LOG_IN: 'log-in',
  SIGN_UP: 'sign-up',
})

export const AUTH_REASON = Object.freeze({
  DEFAULT: 'default',
  SAVE: 'save',
  DASHBOARD: 'dashboard',
})

export const AUTH_PROVIDER = Object.freeze({
  GOOGLE: 'google',
  LINKEDIN: 'linkedin',
})

export const PROVIDER_LABEL = {
  [AUTH_PROVIDER.GOOGLE]: 'Google',
  [AUTH_PROVIDER.LINKEDIN]: 'LinkedIn',
}

const GENERIC_OAUTH_ERROR = "Sign-in didn't complete. Try again or use another method."

export function oauthErrorMessage(provider) {
  const label = PROVIDER_LABEL[provider]
  return label
    ? `${label} sign-in didn't complete. Try again or use another method.`
    : GENERIC_OAUTH_ERROR
}
