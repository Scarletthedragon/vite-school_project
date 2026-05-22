</template>

<!--
<button @click="makeAdmin" style="margin-top: 1rem; padding: 0.7rem 1.5rem; background: #e67e22; color: #fff; border: none; border-radius: 6px; font-weight: bold; cursor: pointer;">
  Become Admin
</button>
-->
<script setup>
import { ref, computed, onMounted } from 'vue'
import { user, logout } from '../auth'
import { useRouter } from 'vue-router'
import { t } from '../i18n'
import { userScore, awardScore, getScore, fetchLeaderboard, leaderboard } from '../scores'

const router = useRouter()

const handleLogout = () => {
  logout()
  router.push('/')
}

// Admin: award points
const awardMessage = ref('')
const userFilter = ref('')
const roleFilter = ref('all')
const sortBy = ref('name-asc')
const rowPoints = ref({})

const handleRowAward = async (email, name) => {
  const pts = Number(rowPoints.value[email] ?? 10)
  if (!pts || pts <= 0) return
  await awardScore(email, pts)
  awardMessage.value = `✅ +${pts} punkti piešķirti ${name}`
  setTimeout(() => { awardMessage.value = '' }, 3000)
}

// Users loaded from leaderboard API
const knownUsers = computed(() => leaderboard.value.map(e => ({ email: e.email, name: e.name, role: e.role ?? 'user' })))

const filteredUsers = computed(() => {
  const q = userFilter.value.toLowerCase().trim()
  let result = knownUsers.value.filter(u => {
    const matchesSearch = !q ||
      u.name.toLowerCase().includes(q) ||
      u.email.toLowerCase().includes(q)
    const matchesRole = roleFilter.value === 'all' || u.role === roleFilter.value
    return matchesSearch && matchesRole
  })
  if (sortBy.value === 'name-asc') result = [...result].sort((a, b) => a.name.localeCompare(b.name))
  else if (sortBy.value === 'name-desc') result = [...result].sort((a, b) => b.name.localeCompare(a.name))
  else if (sortBy.value === 'points-desc') result = [...result].sort((a, b) => getScore(b.email) - getScore(a.email))
  else if (sortBy.value === 'points-asc') result = [...result].sort((a, b) => getScore(a.email) - getScore(b.email))
  return result
})

const makeAdmin = async () => {
  await fetch('https://vite-schoolproject-production.up.railway.app/api/make-admin', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email: user.email }),
  });
  alert('You are now an admin! Please log out and log in again to see changes.');
}

onMounted(() => fetchLeaderboard())
</script>

<template>
  <main class="container">
    <section class="hero">
      <h1>{{ t('profileTitle') }}</h1>
      <p class="subtitle">{{ t('profileSubtitle') }}</p>
    </section>

    <section class="content-section" style="max-width: 600px; margin: 0 auto;">
      <div class="concept-box">
        <h2>{{ t('profileInfo') }}</h2>
        <div style="margin: 2rem 0; padding: 1.5rem; background: var(--card-bg); border-radius: 10px;">
          <div v-if="user?.role !== 'visitor'" style="margin-bottom: 1.5rem;">
            <label style="font-weight: bold; color: var(--primary-color);">{{ t('points') }}:</label>
            <p style="font-size: 1.5rem; margin-top: 0.5rem; font-weight: bold;">
              {{ userScore ?? 0 }} ⭐
            </p>
          </div>

          <div style="margin-bottom: 1.5rem;">
            <p style="font-size: 1.1rem; margin-top: 0.5rem;">{{ user?.name }}</p>
          </div>
          <div style="margin-bottom: 1.5rem;">
            <label style="font-weight: bold; color: var(--primary-color);">{{ t('email') }}:</label>
            <p style="font-size: 1.1rem; margin-top: 0.5rem;">{{ user?.email }}</p>
          </div>
          <div style="margin-bottom: 1.5rem;">
            <label style="font-weight: bold; color: var(--primary-color);">{{ t('accountType') }}:</label>
            <p style="font-size: 1.1rem; margin-top: 0.5rem;">
              <span v-if="user?.role === 'admin'" style="background: #e74c3c; color: white; padding: 0.5rem 1rem; border-radius: 5px;">
                👑 {{ user?.role.toUpperCase() }}
              </span>
              <span v-else-if="user?.role === 'user'" style="background: #3498db; color: white; padding: 0.5rem 1rem; border-radius: 5px;">
                👤 {{ user?.role.toUpperCase() }}
              </span>
            </p>
          </div>
        </div>

        <div style="margin-top: 2rem;">
          <h3>{{ t('accountActions') }}</h3>
          <button 
            class="create-btn logout-btn" 
            @click="handleLogout"
            style="margin-top: 1rem; width: 100%;"
          >
            {{ t('logout') }}
          </button>
        </div>

        <div v-if="user?.role === 'admin'" style="margin-top: 2rem; padding: 1rem; background: rgba(243,156,18,0.15); border-radius: 8px; border-left: 4px solid #f39c12; color: var(--text-color);">
          <h4>{{ t('adminPanel') }}</h4>

          <div style="margin-top: 1rem; margin-bottom: 1rem; display: flex; flex-direction: column; gap: 0.6rem;">
            <input
              v-model="userFilter"
              type="text"
              :placeholder="t('adminSearchPlaceholder')"
              style="width: 100%; padding: 0.5rem 0.8rem; border-radius: 6px; border: 1px solid #f39c12; background: var(--card-bg); color: var(--text-color); font-size: 0.95rem; box-sizing: border-box;"
            />
            <div style="display: flex; gap: 0.5rem; flex-wrap: wrap; align-items: center;">
              <span style="font-size: 0.85rem; opacity: 0.7;">{{ t('adminRoleLabel') }}</span>
              <button
                v-for="opt in [{ val: 'all', label: t('adminRoleAll') }, { val: 'admin', label: '👑 Admin' }, { val: 'user', label: '👤 User' }]"
                :key="opt.val"
                @click="roleFilter = opt.val"
                :style="`padding: 0.25rem 0.7rem; border-radius: 20px; border: 1px solid #f39c12; cursor: pointer; font-size: 0.82rem; background: ${roleFilter === opt.val ? '#f39c12' : 'transparent'}; color: ${roleFilter === opt.val ? '#fff' : 'var(--text-color)'};`"
              >{{ opt.label }}</button>
              <select
                v-model="sortBy"
                style="margin-left: auto; padding: 0.25rem 0.5rem; border-radius: 6px; border: 1px solid #f39c12; background: var(--card-bg); color: var(--text-color); font-size: 0.82rem; cursor: pointer;"
              >
                <option value="name-asc">{{ t('adminSortNameAsc') }}</option>
                <option value="name-desc">{{ t('adminSortNameDesc') }}</option>
                <option value="points-desc">{{ t('adminSortPointsDesc') }}</option>
                <option value="points-asc">{{ t('adminSortPointsAsc') }}</option>
              </select>
            </div>
          </div>

          <p v-if="awardMessage" style="color: #27ae60; font-weight: bold; margin-bottom: 0.8rem;">{{ awardMessage }}</p>

          <div>
            <table style="width: 100%; border-collapse: collapse; font-size: 0.9rem; table-layout: fixed;">
              <thead>
                <tr style="background: rgba(243,156,18,0.25);">
                  <th style="text-align: left; padding: 0.6rem 0.5rem; border-bottom: 2px solid #f39c12; width: 22%;">{{ t('adminColName') }}</th>
                  <th style="text-align: left; padding: 0.6rem 0.5rem; border-bottom: 2px solid #f39c12; width: 30%;">{{ t('adminColEmail') }}</th>
                  <th style="text-align: left; padding: 0.6rem 0.5rem; border-bottom: 2px solid #f39c12; width: 14%;">{{ t('adminColRole') }}</th>
                  <th style="text-align: right; padding: 0.6rem 0.5rem; border-bottom: 2px solid #f39c12; width: 12%;">{{ t('adminColPoints') }}</th>
                  <th style="text-align: center; padding: 0.6rem 0.5rem; border-bottom: 2px solid #f39c12; width: 22%;">{{ t('adminColAward') }}</th>
                </tr>
              </thead>
              <tbody>
                <tr v-if="filteredUsers.length === 0">
                  <td colspan="5" style="padding: 1rem; text-align: center; opacity: 0.6;">{{ t('adminNoUsers') }}</td>
                </tr>
                <tr v-for="u in filteredUsers" :key="u.email" style="border-bottom: 1px solid rgba(243,156,18,0.15);">
                  <td style="padding: 0.6rem 0.5rem; font-weight: bold; word-break: break-word;">{{ u.name }}</td>
                  <td style="padding: 0.6rem 0.5rem; font-size: 0.82rem; opacity: 0.8; word-break: break-all;">{{ u.email }}</td>
                  <td style="padding: 0.6rem 0.5rem;">
                    <span v-if="u.role === 'admin'" style="background: #e74c3c; color: white; padding: 0.2rem 0.5rem; border-radius: 4px; font-size: 0.8rem;">👑 Admin</span>
                    <span v-else style="background: #3498db; color: white; padding: 0.2rem 0.5rem; border-radius: 4px; font-size: 0.8rem;">👤 User</span>
                  </td>
                  <td style="padding: 0.6rem 0.5rem; text-align: right; font-weight: bold;">{{ getScore(u.email) }} ⭐</td>
                  <td style="padding: 0.6rem 0.5rem;">
                    <div style="display: flex; gap: 0.4rem; align-items: center; justify-content: center;">
                      <input
                        type="number"
                        :value="rowPoints[u.email] ?? 10"
                        @input="rowPoints[u.email] = $event.target.value"
                        min="1"
                        style="width: 60px; padding: 0.3rem 0.4rem; border-radius: 5px; border: 1px solid #ccc; background: var(--card-bg); color: var(--text-color); font-size: 0.85rem;"
                      />
                      <button
                        @click="handleRowAward(u.email, u.name)"
                        style="padding: 0.3rem 0.6rem; border-radius: 5px; border: none; background: #f39c12; color: white; cursor: pointer; font-size: 0.85rem; white-space: nowrap;"
                      >➕</button>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <p style="margin-top: 0.6rem; font-size: 0.8rem; opacity: 0.6;">{{ filteredUsers.length }} / {{ knownUsers.length }} {{ t('adminUserCount') }}</p>
        </div>

        <div v-if="user?.role === 'user'" style="margin-top: 2rem; padding: 1rem; background: rgba(52,152,219,0.15); border-radius: 8px; border-left: 4px solid #2196f3; color: var(--text-color);">
          <h4>{{ t('yourGames') }}</h4>
          <p>{{ t('yourGamesDesc') }}</p>
          <button @click="makeAdmin" style="margin-top: 1rem; padding: 0.7rem 1.5rem; background: #e67e22; color: #fff; border: none; border-radius: 6px; font-weight: bold; cursor: pointer;">
            Become Admin
          </button>
        </div>
      </div>
    </section>
  </main>
</template>
 
