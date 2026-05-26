// Delete a user by email (admin only)
export const deleteUser = async (email) => {
  if (!email) return { success: false };
  try {
    const res = await fetch(`${API}/api/delete-user`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
      body: JSON.stringify({ email }),
    });
    const data = await res.json();
    if (res.ok && data.success) {
      await fetchLeaderboard();
    }
    return data;
  } catch (e) {
    return { success: false, message: e?.message || 'Error' };
  }
};
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

export const getScore = (email) => {
  const entry = leaderboard.value.find(e => e.email === email)
  return entry?.score ?? 0
}

