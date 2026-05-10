<script setup>
import { ref } from 'vue'
import { t, currentLanguage } from '../i18n'

const form = ref({
  name: '',
  email: '',
  subject: '',
  message: ''
})

const errors = ref({
  name: '',
  email: '',
  subject: '',
  message: ''
})

const successMessage = ref('')

const validateForm = () => {
  errors.value = { name: '', email: '', subject: '', message: '' }

  let isValid = true

  if (!form.value.name.trim()) {
    errors.value.name = t('nameRequired')
    isValid = false
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!form.value.email.trim()) {
    errors.value.email = t('emailRequired')
    isValid = false
  } else if (!emailRegex.test(form.value.email.trim())) {
    errors.value.email = t('invalidEmail')
    isValid = false
  }

  if (!form.value.subject.trim()) {
    errors.value.subject = t('subjectRequired')
    isValid = false
  }

  if (!form.value.message.trim()) {
    errors.value.message = t('messageRequired')
    isValid = false
  }

  return isValid
}

const submitForm = async () => {
  successMessage.value = ''
  if (!validateForm()) return

  try {
    const response = await fetch('http://localhost:8000/api/contact', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: form.value.name.trim(),
        email: form.value.email.trim(),
        subject: form.value.subject.trim(),
        message: form.value.message.trim()
      })
    })

    const result = await response.json()

    if (!response.ok) {
      throw new Error(result?.message || t('failedToSend'))
    }

    successMessage.value = `✓ ${result.message || t('messageSent')}`

    setTimeout(() => {
      form.value = { name: '', email: '', subject: '', message: '' }
      successMessage.value = ''
    }, 3000)
  } catch (error) {
    successMessage.value = error?.message || t('failedToSend')
  }
}
</script>

<template>
  <main class="container">
    <!-- Hero Section -->
    <section class="hero">
      <h1>{{ t('contactTitle') }}</h1>
      <p>
        {{ t('contactSubtitle') }}
      </p>
    </section>

    <!-- Contact Form Section -->
    <section class="contact-section">
      <h2>Sūtīt ziņojumu</h2>
      <form id="contactForm" class="contact-form" @submit.prevent="submitForm">
        <div class="form-group">
          <label for="name">{{ t('name') }}:</label>
          <input type="text" id="name" name="name" v-model="form.name" required>
          <span class="error-message" id="nameError">{{ errors.name }}</span>
        </div>
        <div class="form-group">
          <label for="email">{{ t('email') }}:</label>
          <input type="email" id="email" name="email" v-model="form.email" required>
          <span class="error-message" id="emailError">{{ errors.email }}</span>
        </div>
        <div class="form-group">
          <label for="subject">{{ t('subject') }}:</label>
          <input type="text" id="subject" name="subject" v-model="form.subject" required>
          <span class="error-message" id="subjectError">{{ errors.subject }}</span>
        </div>
        <div class="form-group">
          <label for="message">{{ t('message') }}:</label>
          <textarea id="message" name="message" rows="8" v-model="form.message" required></textarea>
          <span class="error-message" id="messageError">{{ errors.message }}</span>
        </div>
        <button type="submit" class="submit-btn">{{ t('send') }}</button>
        <div class="success-message" :class="{ show: successMessage }" id="successMessage">
          {{ successMessage }}
        </div>
      </form>
    </section>

    <!-- Contact Info Section -->
    <section class="content-section">
      <h2>Kontaktinformācija</h2>

      <div class="features-grid">
        <div class="feature-item">
          <span class="feature-icon">🏫</span>
          <h4>Izglītības iestāde</h4>
          <p>Rīgas Valsts Tehnikums<br> Datorikas nodaļa</p>
        </div>
        <div class="feature-item">
          <span class="feature-icon">👨‍🎓</span>
          <h4>Audzēknis</h4>
          <p>Š. Tērmane<br> Programmēšanas tehniķis</p>
        </div>
        <div class="feature-item">
          <span class="feature-icon">📅</span>
          <h4>Projekta gads</h4>
          <p>2025<br> Referāta darbs</p>
        </div>
        <div class="feature-item">
          <span class="feature-icon">🌐</span>
          <h4>GitHub</h4>
          <p>
            <a href="https://github.com/Scarletthedragon/dragons-den" target="_blank" style="color: var(--primary-color);">
              dragons-den
            </a>
          </p>
        </div>
      </div>
    </section>

    <!-- FAQ Section -->
    <section class="content-section">
      <h2>❓ Biežāk uzdotie jautājumi</h2>

      <div class="concept-box">
        <h3>Kas ir Dragons Den?</h3>
        <p>
          Dragons Den ir izglītojošas izklaides spēļu mājaslapa, kas izstrādāta kā referāta darbs
          Rīgas Valsts Tehnikumā. Projekts demonstrē mūsdienīgas web tehnoloģijas un izglītības
          platformu analīzi.
        </p>
      </div>

      <div class="concept-box">
        <h3>Kādas tehnoloģijas tiek izmantotas?</h3>
        <p>
          Projekts izmanto HTML5, CSS3, JavaScript ES6+, NewsAPI integrāciju, localStorage, un ir
          publicēts uz GitHub Pages. Dizains ietver purple rainbow tēmu ar dinamiskiem gradientiem
          un animācijām.
        </p>
      </div>

      <div class="concept-box">
        <h3>Vai varu izmantot šo projektu savām vajadzībām?</h3>
        <p>
          Projekts ir izveidots akadēmiskiem mērķiem. Ja vēlaties izmantot kodu vai idejas, lūdzu,
          sazinieties ar mums, izmantojot kontaktformu augstāk.
        </p>
      </div>

      <div class="concept-box">
        <h3>Kā varu dot atsauksmi?</h3>
        <p>
          Mēs ļoti novērtējam jūsu atsauksmes! Lūdzu, aizpildiet kontaktformu augstāk vai atveriet
          Issue GitHub repozitorijā.
        </p>
      </div>
    </section>

    <!-- Social Links -->
    <section class="content-section">
      <h2>🔗 Saites</h2>
      <div class="concept-box">
        <div class="features-grid">
          <div class="feature-item">
            <span class="feature-icon">🏠</span>
            <h4>
              <RouterLink to="/" style="color: var(--primary-color); text-decoration: none;">
                Sākumlapa
              </RouterLink>
            </h4>
            <p>Atgriezties uz galveno lapu</p>
          </div>
          <div class="feature-item">
            <span class="feature-icon">📖</span>
            <h4>
              <RouterLink to="/missions" style="color: var(--primary-color); text-decoration: none;">
                Misijas
              </RouterLink>
            </h4>
            <p>Pāriet uz misiju informāciju un uzdevumiem</p>
          </div>
          <div class="feature-item">
            <span class="feature-icon">📊</span>
            <h4>
              <RouterLink to="/#dashboard" style="color: var(--primary-color); text-decoration: none;">
                Dashboard
              </RouterLink>
            </h4>
            <p>Ziņu meklēšanas funkcija</p>
          </div>
          <div class="feature-item">
            <span class="feature-icon">🔬</span>
            <h4>
              <RouterLink to="/#research" style="color: var(--primary-color); text-decoration: none;">
                Pētniecība
              </RouterLink>
            </h4>
            <p>Platformu analīzes rezultāti</p>
          </div>
        </div>
      </div>
    </section>
  </main>
</template>
