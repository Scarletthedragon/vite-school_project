<script setup>
import { onMounted, ref } from 'vue'
import { RouterView, useRouter } from 'vue-router'
import { currentLanguage, setLanguage, t } from './i18n'
import { user, logout, isLoggedIn } from './auth'

const router = useRouter()
const isDarkMode = ref(false)
const isMenuOpen = ref(false)

const toggleDarkMode = () => {
  isDarkMode.value = !isDarkMode.value
  document.body.classList.toggle('dark-mode', isDarkMode.value)
  localStorage.setItem('darkMode', String(isDarkMode.value))
}

const toggleLanguage = () => {
  const nextLanguage = currentLanguage.value === 'lv' ? 'en' : 'lv'
  setLanguage(nextLanguage)
}

const handleLogout = () => {
  logout()
  router.push('/')
}

onMounted(() => {
  const saved = localStorage.getItem('darkMode') === 'true'
  isDarkMode.value = saved
  document.body.classList.toggle('dark-mode', saved)
})
</script>

<template>
  <!-- Dark Mode Toggle -->
  <button
    id="darkModeToggle"
    class="dark-mode-toggle"
    type="button"
    @click="toggleDarkMode"
  >
    {{ isDarkMode ? '☀️' : '🌙' }}
  </button>

  <!-- Language Toggle -->
  <RouterLink to="/" class="home-top-btn" aria-label="Go to home">
    🏠
  </RouterLink>

  <div class="language-selector">
    <button class="language-select" type="button" @click="toggleLanguage" aria-label="Toggle language">
      {{ currentLanguage === 'lv' ? '🇱🇻' : '🇬🇧' }}
    </button>
  </div>

  <RouterLink v-if="isLoggedIn && user?.role !== 'visitor'" to="/profile" class="profile-top-btn" aria-label="Go to profile">
    👤
  </RouterLink>

  <!-- User Menu -->
  <div class="user-menu">
    <div v-if="isLoggedIn" class="user-info">
      <span class="user-name">👤 {{ user?.name }}</span>
      <span v-if="user?.role === 'admin'" class="user-badge admin">👑 ADMIN</span>
      <span v-else-if="user?.role === 'user'" class="user-badge user">USER</span>
      <span v-else-if="user?.role === 'visitor'" class="user-badge visitor">👁️ VISITOR</span>
    </div>
    <div class="user-buttons">
      <RouterLink v-if="isLoggedIn && user?.role !== 'visitor'" to="/profile" class="auth-btn">Profile</RouterLink>
      <button v-if="isLoggedIn" @click="handleLogout" class="auth-btn logout">Logout</button>
      <RouterLink v-else to="/login" class="auth-btn login">Login</RouterLink>
    </div>
  </div>

  <!-- Admin Nav -->
  <nav v-if="user?.role === 'admin'" class="admin-nav">
    <RouterLink to="/" class="admin-nav-btn">🏠 Home</RouterLink>
    <RouterLink to="/missions" class="admin-nav-btn">📘 Missions</RouterLink>
    <RouterLink to="/profile" class="admin-nav-btn">👤 Profile</RouterLink>
  </nav>

  <!-- User Nav -->
  <nav v-else-if="user?.role === 'user'" class="admin-nav user-nav">
    <RouterLink to="/profile" class="admin-nav-btn">👤 Profile</RouterLink>
  </nav>

  <!-- Header -->
  <header>
    <div class="container">
      <h1 class="logo">🐉 Dragons Den</h1>
    </div>
  </header>

  <RouterView />

  <!-- Footer -->
  <footer>
    <div class="container">
      <p>{{ t('footer') }}</p>
    </div>
  </footer>
</template>
