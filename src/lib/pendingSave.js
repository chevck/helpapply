const KEY = 'helpapply.pendingSave'

export function stashPendingSave({ result, upgradedCv }) {
  try {
    sessionStorage.setItem(KEY, JSON.stringify({ result, upgradedCv }))
  } catch {
    // Storage full or blocked: the save simply won't survive an OAuth redirect.
  }
}

export function readPendingSave() {
  try {
    const raw = sessionStorage.getItem(KEY)
    const parsed = raw ? JSON.parse(raw) : null
    return parsed?.result && parsed?.upgradedCv ? parsed : null
  } catch {
    return null
  }
}

export function clearPendingSave() {
  try {
    sessionStorage.removeItem(KEY)
  } catch {
    // Nothing to clear when storage is unavailable.
  }
}
