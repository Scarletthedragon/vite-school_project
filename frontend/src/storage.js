const STORAGE_KEYS = {
  scores: 'dd:scores:v1',
  messages: 'dd:messages:v1'
}

export const getStorageKey = (name) => STORAGE_KEYS[name]

export const readJson = (key, fallback) => {
  try {
    const raw = localStorage.getItem(key)
    if (!raw) return fallback
    const parsed = JSON.parse(raw)
    return parsed ?? fallback
  } catch {
    return fallback
  }
}

export const writeJson = (key, value) => {
  try {
    localStorage.setItem(key, JSON.stringify(value))
    return true
  } catch {
    return false
  }
}
