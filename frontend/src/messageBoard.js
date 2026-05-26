import { ref } from 'vue'
const API = import.meta.env.VITE_API_URL ?? 'http://localhost:8000'
const MESSAGE_COLORS = [
  '#ff6b6b',
  '#f59f00',
  '#2ec4b6',
  '#4dabf7',
  '#845ef7',
  '#e64980',
  '#51cf66',
  '#ff922b'
]

const isValidHexColor = (value) => /^#[0-9a-fA-F]{6}$/.test(String(value || ''))

const getRandomMessageColor = () => {
  const index = Math.floor(Math.random() * MESSAGE_COLORS.length)
  return MESSAGE_COLORS[index]
}

const normalizeMessages = (items) => {
  if (!Array.isArray(items)) return []

  return items
    .filter((entry) => entry && typeof entry === 'object')
    .map((entry) => ({
      id: entry.id || Date.now() + Math.random(),
      name: String(entry.name || 'Visitor'),
      message: String(entry.message || '').trim(),
      role: String(entry.role || 'visitor'),
      color: isValidHexColor(entry.color) ? entry.color : getRandomMessageColor(),
      createdAt: entry.createdAt || entry.created_at || new Date().toISOString()
    }))
    .filter((entry) => entry.message.length > 0)
}

const messages = ref([])

export const boardMessages = messages

export const fetchBoardMessages = async () => {
  try {
    const res = await fetch(`${API}/api/board-messages`, {
      headers: { Accept: 'application/json' },
    })

    if (!res.ok) {
      return { success: false, message: 'Failed to load messages' }
    }

    const data = await res.json().catch(() => [])
    messages.value = normalizeMessages(data)
    return { success: true }
  } catch {
    return { success: false, message: 'Could not connect to server' }
  }
}

export const postBoardMessage = async (payload) => {
  const name = String(payload?.name || 'Visitor').trim()
  const message = String(payload?.message || '').trim()
  const role = String(payload?.role || 'visitor')
  const color = getRandomMessageColor()

  if (!message) return { success: false, message: 'Message is required' }

  try {
    const res = await fetch(`${API}/api/board-messages`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify({ name, message, role, color }),
    })

    const data = await res.json().catch(() => ({}))
    if (!res.ok || !data?.success) {
      return { success: false, message: data?.message || 'Failed to save message' }
    }

    const normalized = normalizeMessages([data.message])
    if (normalized.length) {
      messages.value.unshift(normalized[0])
      messages.value = messages.value.slice(0, 30)
    } else {
      await fetchBoardMessages()
    }

    return { success: true }
  } catch {
    return { success: false, message: 'Could not connect to server' }
  }
}
