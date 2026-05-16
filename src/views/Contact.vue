<script setup>
import { ref, watchEffect } from 'vue'
import { t, currentLanguage } from '../i18n'
import { user } from '../auth'

const form = ref({
  name: '',
  email: '',
  subject: '',
  message: ''
})

watchEffect(() => {
  if (user.value) {
    form.value.name = user.value.name || ''
    form.value.email = user.value.email || ''
  }
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
        <input type="hidden" name="name" v-model="form.name">
        <input type="hidden" name="email" v-model="form.email">
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

    <!-- FAQ Section -->
    <section class="content-section">
      <h2>❓ {{ currentLanguage === 'lv' ? 'Biežāk uzdotie jautājumi' : 'Frequently Asked Questions' }}</h2>

      <div class="concept-box">
        <h3>{{ currentLanguage === 'lv' ? 'Cik ilgi jāgaida atbilde?' : 'How long until I get a reply?' }}</h3>
        <p>
          {{ currentLanguage === 'lv'
            ? 'Mēs cenšamies atbildēt uz visiem ziņojumiem 1–2 darba dienu laikā. Ja nepieciešama steidzama palīdzība, norādiet to ziņojuma tēmā.'
            : 'We aim to respond to all messages within 1–2 business days. If your request is urgent, please mention it in the subject line.' }}
        </p>
      </div>

      <div class="concept-box">
        <h3>{{ currentLanguage === 'lv' ? 'Ko rakstīt ziņojuma tēmā?' : 'What should I write in the subject?' }}</h3>
        <p>
          {{ currentLanguage === 'lv'
            ? 'Izvēlieties skaidru tēmu, piemēram: "Kļūda spēlē", "Jautājums par kontu" vai "Ieteikums". Tas palīdzēs mums ātrāk atbildēt.'
            : 'Choose a clear subject like "Bug in game", "Account question", or "Suggestion". This helps us respond faster.' }}
        </p>
      </div>

      <div class="concept-box">
        <h3>{{ currentLanguage === 'lv' ? 'Ko darīt, ja nevarēju pieteikties kontā?' : 'What if I cannot log into my account?' }}</h3>
        <p>
          {{ currentLanguage === 'lv'
            ? 'Ja nevarat pieteikties, lūdzu, sazinieties ar mums, norādot savu lietotājvārdu. Mēs palīdzēsim atjaunot piekļuvi.'
            : 'If you cannot log in, please contact us with your username and we will help restore your access.' }}
        </p>
      </div>

      <div class="concept-box">
        <h3>{{ currentLanguage === 'lv' ? 'Kā ziņot par kļūdu?' : 'How do I report a bug?' }}</h3>
        <p>
          {{ currentLanguage === 'lv'
            ? 'Aizpildiet kontaktformu augstāk un aprakstiet kļūdu pēc iespējas sīkāk — kurā lapā tā notika un ko jūs darījāt pirms tam.'
            : 'Fill in the contact form above and describe the bug in as much detail as possible — which page it occurred on and what you were doing beforehand.' }}
        </p>
      </div>
    </section>

  </main>
</template>

<style scoped>
.submit-btn {
  background: linear-gradient(135deg, #7c5cbf, #a07fd4) !important;
  box-shadow: 0 4px 15px rgba(124, 92, 191, 0.25) !important;
}
.submit-btn:hover {
  background: linear-gradient(135deg, #7c5cbf, #a07fd4) !important;
  box-shadow: 0 6px 20px rgba(124, 92, 191, 0.35) !important;
}
</style>
