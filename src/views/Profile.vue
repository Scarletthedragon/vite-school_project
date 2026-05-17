<script setup>
import { ref } from 'vue'
import { user, logout, users } from '../auth'
import { useRouter } from 'vue-router'
import { t } from '../i18n'
import { userScore, awardScore, getScore } from '../scores'

const router = useRouter()

const handleLogout = () => {
  logout()
  router.push('/')
}

// Admin: award points
const awardEmail = ref('')
const awardPoints = ref(10)
const awardMessage = ref('')

const handleAward = () => {
  if (!awardEmail.value || awardPoints.value <= 0) return
  awardScore(awardEmail.value, Number(awardPoints.value))
  awardMessage.value = `✅ +${awardPoints.value} punkti piešķirti ${awardEmail.value}`
  setTimeout(() => { awardMessage.value = '' }, 3000)
}

// Known registered users (for admin dropdown)
const knownUsers = Object.entries(users).map(([email, data]) => ({ email, name: data.name, role: data.role }))
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
          <h4>⚙️ Admin Panel — Piešķirt punktus</h4>
          <div style="margin-top: 1rem; display: flex; flex-direction: column; gap: 0.8rem;">
            <div>
              <label style="font-weight: bold;">Lietotājs:</label>
              <select v-model="awardEmail" style="display: block; margin-top: 0.4rem; padding: 0.5rem; border-radius: 6px; width: 100%; border: 1px solid #ccc; background: var(--card-bg); color: var(--text-color);">
                <option value="" disabled>-- Izvēlies lietotāju --</option>
                <option v-for="u in knownUsers" :key="u.email" :value="u.email">{{ u.name }} ({{ u.email }}) — {{ getScore(u.email) }} ⭐</option>
              </select>
            </div>
            <div>
              <label style="font-weight: bold;">Punkti:</label>
              <input type="number" v-model="awardPoints" min="1" style="display: block; margin-top: 0.4rem; padding: 0.5rem; border-radius: 6px; width: 100%; border: 1px solid #ccc; background: var(--card-bg); color: var(--text-color);" />
            </div>
            <button class="create-btn" @click="handleAward" style="margin-top: 0.5rem;">➕ Piešķirt punktus</button>
            <p v-if="awardMessage" style="color: #27ae60; font-weight: bold;">{{ awardMessage }}</p>
          </div>

          <div style="margin-top: 2rem;">
            <h4 style="margin-bottom: 1rem;">👥 Reģistrētie lietotāji ({{ knownUsers.length }})</h4>
            <table style="width: 100%; border-collapse: collapse; font-size: 0.95rem;">
              <thead>
                <tr style="background: rgba(243,156,18,0.25);">
                  <th style="text-align: left; padding: 0.6rem 0.8rem; border-bottom: 2px solid #f39c12;">Vārds</th>
                  <th style="text-align: left; padding: 0.6rem 0.8rem; border-bottom: 2px solid #f39c12;">E-pasts</th>
                  <th style="text-align: left; padding: 0.6rem 0.8rem; border-bottom: 2px solid #f39c12;">Loma</th>
                  <th style="text-align: right; padding: 0.6rem 0.8rem; border-bottom: 2px solid #f39c12;">Punkti</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="u in knownUsers" :key="u.email" style="border-bottom: 1px solid rgba(243,156,18,0.15);">
                  <td style="padding: 0.6rem 0.8rem;">{{ u.name }}</td>
                  <td style="padding: 0.6rem 0.8rem;">{{ u.email }}</td>
                  <td style="padding: 0.6rem 0.8rem;">
                    <span v-if="u.role === 'admin'" style="background: #e74c3c; color: white; padding: 0.2rem 0.5rem; border-radius: 4px; font-size: 0.8rem;">👑 Admin</span>
                    <span v-else style="background: #3498db; color: white; padding: 0.2rem 0.5rem; border-radius: 4px; font-size: 0.8rem;">👤 User</span>
                  </td>
                  <td style="padding: 0.6rem 0.8rem; text-align: right; font-weight: bold;">{{ getScore(u.email) }} ⭐</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <div v-if="user?.role === 'user'" style="margin-top: 2rem; padding: 1rem; background: rgba(52,152,219,0.15); border-radius: 8px; border-left: 4px solid #2196f3; color: var(--text-color);">
          <h4>{{ t('yourGames') }}</h4>
          <p>{{ t('yourGamesDesc') }}</p>
        </div>
      </div>
    </section>
  </main>
</template>
