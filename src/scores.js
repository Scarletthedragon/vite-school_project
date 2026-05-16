import { ref, computed, watch } from 'vue'
import { user, users } from './auth'
import { getStorageKey, readJson, writeJson } from './storage'

const SCORES_KEY = getStorageKey('scores')
const NAMES_KEY = getStorageKey('userNames')
const LEGACY_SCORES_KEY = 'scores'

const loadScores = () => {
  const persisted = readJson(SCORES_KEY, null)
  if (persisted && typeof persisted === 'object') return persisted

  const legacy = readJson(LEGACY_SCORES_KEY, {})
  if (legacy && typeof legacy === 'object') {
    writeJson(SCORES_KEY, legacy)
    return legacy
  }

  return {}
}

const scores = ref(loadScores())
const userNames = ref(readJson(NAMES_KEY, {}))

const saveScores = () => {
  writeJson(SCORES_KEY, scores.value)
}

const saveUserName = (email, name) => {
  if (email && name && name !== email) {
    userNames.value[email] = name
    writeJson(NAMES_KEY, userNames.value)
  }
}

// Save name whenever user logs in or session is restored
watch(user, (newUser) => {
  if (newUser?.email && newUser?.name) {
    saveUserName(newUser.email, newUser.name)
  }
}, { immediate: true })

// Current logged-in user's score
export const userScore = computed(() => {
  if (!user.value || user.value.role === 'visitor' || !user.value.email) return null
  return scores.value[user.value.email] || 0
})

// Add points to the current user (visitors are excluded)
export const addScore = (points) => {
  if (!user.value || user.value.role === 'visitor' || !user.value.email) return
  const email = user.value.email
  scores.value[email] = (scores.value[email] || 0) + points
  saveUserName(email, user.value.name)
  saveScores()
}

// Remove points from the current user (never below zero)
export const removeScore = (points) => {
  if (!user.value || user.value.role === 'visitor' || !user.value.email) return
  const email = user.value.email
  const current = scores.value[email] || 0
  scores.value[email] = Math.max(0, current - points)
  saveUserName(email, user.value.name)
  saveScores()
}

// Admin: award points to any user by email
export const awardScore = (email, points) => {
  if (!email || points <= 0) return
  scores.value[email] = (scores.value[email] || 0) + points
  saveScores()
}

// Get score for a specific email
export const getScore = (email) => scores.value[email] || 0

// Sorted leaderboard (all users with scores)
export const leaderboard = computed(() => {
  return Object.entries(scores.value)
    .map(([email, score]) => ({
      email,
      name: userNames.value[email] || users[email]?.name || email,
      score
    }))
    .sort((a, b) => b.score - a.score)
})
