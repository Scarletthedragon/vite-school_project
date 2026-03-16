<script setup>
import { onMounted, ref } from 'vue'
import { RouterView } from 'vue-router'

const isDarkMode = ref(false)
const isMenuOpen = ref(false)

const toggleDarkMode = () => {
  isDarkMode.value = !isDarkMode.value
  document.body.classList.toggle('dark-mode', isDarkMode.value)
  localStorage.setItem('darkMode', String(isDarkMode.value))
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
      <p>&copy; 2025 Rīgas Valsts Tehnikums. Š. Tērmane - Programmēšanas tehniķis</p>
    </div>
  </footer>
</template>
