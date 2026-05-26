import { ref } from 'vue'
import { getStorageKey, readJson, writeJson } from './storage'

const MESSAGES_KEY = getStorageKey('messages')
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
      createdAt: entry.createdAt || new Date().toISOString()
    }))
    .filter((entry) => entry.message.length > 0)
}

const messages = ref(normalizeMessages(readJson(MESSAGES_KEY, [])))
writeJson(MESSAGES_KEY, messages.value)

const saveMessages = () => {
  writeJson(MESSAGES_KEY, messages.value)
}

export const boardMessages = messages

export const postBoardMessage = (payload) => {
  const name = String(payload?.name || 'Visitor').trim()
  const message = String(payload?.message || '').trim()
  const role = String(payload?.role || 'visitor')

  if (!message) return false

  messages.value.unshift({
    id: Date.now(),
    name,
    message,
    role,
    color: getRandomMessageColor(),
    createdAt: new Date().toISOString()
  })

  messages.value = messages.value.slice(0, 30)
  saveMessages()
  return true
}
