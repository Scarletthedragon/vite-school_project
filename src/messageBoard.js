import { ref } from 'vue'
import { getStorageKey, readJson, writeJson } from './storage'

const MESSAGES_KEY = getStorageKey('messages')

const normalizeMessages = (items) => {
  if (!Array.isArray(items)) return []

  return items
    .filter((entry) => entry && typeof entry === 'object')
    .map((entry) => ({
      id: entry.id || Date.now() + Math.random(),
      name: String(entry.name || 'Visitor'),
      message: String(entry.message || '').trim(),
      role: String(entry.role || 'visitor'),
      createdAt: entry.createdAt || new Date().toISOString()
    }))
    .filter((entry) => entry.message.length > 0)
}

const messages = ref(normalizeMessages(readJson(MESSAGES_KEY, [])))

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
    createdAt: new Date().toISOString()
  })

  messages.value = messages.value.slice(0, 30)
  saveMessages()
  return true
}
