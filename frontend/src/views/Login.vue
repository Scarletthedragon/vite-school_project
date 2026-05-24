<script setup>
import { ref } from 'vue'
import { login as authLogin, register as authRegister, continueAsVisitor } from '../auth'
import { t } from '../i18n'
import { useRouter } from 'vue-router'

const router = useRouter()
const isLogin = ref(true)
const email = ref('')
const password = ref('')
const confirmPassword = ref('')
const name = ref('')
const error = ref('')
const success = ref('')

const toggleMode = () => {
  isLogin.value = !isLogin.value
  error.value = ''
  success.value = ''
  email.value = ''
  password.value = ''
  confirmPassword.value = ''
  name.value = ''
}

const handleVisitor = () => {
  continueAsVisitor()
  router.push('/')
}

const handleSubmit = async () => {
  error.value = ''
  success.value = ''

  if (!email.value || !password.value) {
    error.value = 'Please fill in all fields'
    return
  }

  if (isLogin.value) {
    const result = await authLogin(email.value, password.value)
    if (result.success) {
      success.value = result.message
      setTimeout(() => {
        router.push('/')
      }, 1500)
    } else {
      error.value = result.message
    }
  } else {
    if (password.value !== confirmPassword.value) {
      error.value = 'Passwords do not match'
      return
    }
    if (!name.value) {
      error.value = 'Please enter your name'
      return
    }
    const result = await authRegister(email.value, password.value, name.value)
    if (result.success) {
      success.value = result.message
      setTimeout(() => {
        isLogin.value = true
        email.value = ''
        password.value = ''
        confirmPassword.value = ''
        name.value = ''
      }, 1500)
    } else {
      error.value = result.message
    }
  }
}
</script>

<template>
  <main class="container">
    <section class="hero">
      <h1>🐉 {{ isLogin ? 'Login' : 'Register' }}</h1>
      <p class="subtitle">{{ isLogin ? 'Welcome back!' : 'Join Dragons Den!' }}</p>
    </section>

    <section class="content-section" style="max-width: 500px; margin: 0 auto;">
      <div class="concept-box">
        <form @submit.prevent="handleSubmit">
          <div class="form-group">
            <label for="email">Email:</label>
            <input 
              type="email" 
              id="email" 
              v-model="email" 
              required
              placeholder="user@example.com"
            >
          </div>

          <div v-if="!isLogin" class="form-group">
            <label for="name">Full Name:</label>
            <input 
              type="text" 
              id="name" 
              v-model="name" 
              placeholder="Your Name"
            >
          </div>

          <div class="form-group">
            <label for="password">Password:</label>
            <input 
              type="password" 
              id="password" 
              v-model="password" 
              required
              placeholder="••••••••"
            >
          </div>

          <div v-if="!isLogin" class="form-group">
            <label for="confirmPassword">Confirm Password:</label>
            <input 
              type="password" 
              id="confirmPassword" 
              v-model="confirmPassword" 
              placeholder="••••••••"
            >
          </div>

          <div v-if="error" class="error-message" style="margin-bottom: 1rem; padding: 1rem; background: #ffe6e6; border-radius: 8px; color: #c0392b;">
            ❌ {{ error }}
          </div>

          <div v-if="success" class="success-message" style="margin-bottom: 1rem; padding: 1rem; background: #e6ffe6; border-radius: 8px; color: #27ae60;">
            ✓ {{ success }}
          </div>

          <button type="submit" class="submit-btn" style="width: 100%; margin-bottom: 1rem;">
            {{ isLogin ? 'Login' : 'Register' }}
          </button>
        </form>

        <div style="text-align: center; padding-top: 1rem; border-top: 1px solid rgba(0,0,0,0.1);">
          <p style="margin-bottom: 1rem;">
            {{ isLogin ? "Don't have an account?" : 'Already have an account?' }}
            <button 
              type="button" 
              @click="toggleMode"
              style="background: none; border: none; color: var(--primary-color); cursor: pointer; font-weight: bold; text-decoration: underline;"
            >
              {{ isLogin ? 'Register' : 'Login' }}
            </button>
          </p>
        </div>

        <div style="margin-top: 1.5rem; text-align: center;">
          <button
            type="button"
            @click="handleVisitor"
            style="width: 100%; padding: 0.9rem; background: transparent; border: 2px dashed var(--primary-color); color: var(--primary-color); border-radius: 8px; font-size: 1rem; font-weight: bold; cursor: pointer; transition: all 0.3s ease;"
            @mouseenter="e => e.target.style.background = 'rgba(155,89,182,0.1)'"
            @mouseleave="e => e.target.style.background = 'transparent'"
          >
            👁️ Continue as Visitor
          </button>
          <p style="margin-top: 0.5rem; font-size: 0.85rem; opacity: 0.7;">Browse the site without an account</p>
        </div>

        <div v-if="isLogin" style="margin-top: 2rem; padding: 1rem; background: var(--bg-color); border-radius: 8px;">
          <h4>📝 Demo Accounts:</h4>
          <p><strong>Admin:</strong> admin@dragons.com / admin123</p>
          <p><strong>User:</strong> user@dragons.com / user123</p>
        </div>
      </div>
    </section>
  </main>
</template>
