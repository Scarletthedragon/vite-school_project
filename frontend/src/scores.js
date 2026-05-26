import { ref } from 'vue'
import { user } from './auth'

const API = import.meta.env.VITE_API_URL ?? 'http://localhost:8000'

export const userScore = ref(0)
export const leaderboard = ref([])

export const fetchLeaderboard = async () => {
  try {
    const res = await fetch(`${API}/api/leaderboard`)
    const data = await res.json()
    leaderboard.value = data
    if (user.value?.email) {
      const me = data.find(e => e.email === user.value.email)
      userScore.value = me?.score ?? 0
    }
  } catch {}
}

export const addScore = async (points) => {
  if (!user.value?.email || user.value.role === 'visitor') return
  try {
    const res = await fetch(`${API}/api/scores/add`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
      body: JSON.stringify({ email: user.value.email, points }),
    })
    const data = await res.json()
    if (res.ok) userScore.value = data.score
    await fetchLeaderboard()
  } catch {}
}

export const removeScore = async (points) => {
  if (!user.value?.email || user.value.role === 'visitor') return
  try {
    const res = await fetch(`${API}/api/scores/add`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
      body: JSON.stringify({ email: user.value.email, points: -points }),
    })
    const data = await res.json()
    if (res.ok) userScore.value = data.score
    await fetchLeaderboard()
  } catch {}
}

export const awardScore = async (email, points) => {
  if (!email || points <= 0) return
  try {
    await fetch(`${API}/api/scores/add`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
      body: JSON.stringify({ email, points }),
    })
    await fetchLeaderboard()
  } catch {}
}

// Delete a user by email (admin only)
export const deleteUserByAdmin = async (email, actorEmail) => {
  if (!email || !actorEmail) return { success: false, message: 'Missing user data' }
  try {
    const res = await fetch(`${API}/api/delete-user`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
      body: JSON.stringify({ email, actor_email: actorEmail }),
    })
    const data = await res.json().catch(() => ({}))
    if (res.ok && data.success) {
      await fetchLeaderboard()
    }
    return data
  } catch (e) {
    return { success: false, message: e?.message || 'Error deleting user' }
  }
}

export const deleteOwnAccount = async (email, password) => {
  if (!email || !password) return { success: false, message: 'Missing credentials' }
  try {
    const res = await fetch(`${API}/api/delete-account`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
      body: JSON.stringify({ email, password }),
    })
    return await res.json().catch(() => ({ success: false, message: 'Invalid server response' }))
  } catch (e) {
    return { success: false, message: e?.message || 'Error deleting account' }
  }
}

export const getScore = (email) => {
  const entry = leaderboard.value.find(e => e.email === email)
  return entry?.score ?? 0
}

