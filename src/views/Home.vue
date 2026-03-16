<script setup>
import { computed, ref } from 'vue'

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
    errors.value.name = 'Vārds ir obligāts!'
    isValid = false
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!form.value.email.trim()) {
    errors.value.email = 'E-pasts ir obligāts!'
    isValid = false
  } else if (!emailRegex.test(form.value.email.trim())) {
    errors.value.email = 'E-pasta adrese nav derīga!'
    isValid = false
  }

  if (!form.value.subject.trim()) {
    errors.value.subject = 'Temats ir obligāts!'
    isValid = false
  }

  if (!form.value.message.trim()) {
    errors.value.message = 'Ziņojums ir obligāts!'
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
      throw new Error(result?.message || 'Neizdevās nosūtīt ziņojumu.')
    }

    successMessage.value = `✓ ${result.message || 'Paldies! Ziņojums nosūtīts.'}`

    setTimeout(() => {
      form.value = { name: '', email: '', subject: '', message: '' }
      successMessage.value = ''
    }, 3000)
  } catch (error) {
    successMessage.value = error?.message || 'Kļūda nosūtot ziņojumu.'
  }
}

const games = [
  {
    title: 'Loģikas Labirints',
    description: 'Mācies plānot soļus un atrisini labirinta uzdevumus.',
    icon: '🧩',
    color: '#9b59b6'
  },
  {
    title: 'Robotu Izaicinājums',
    description: 'Programmē robotu ar komandām un savāc enerģiju.',
    icon: '🤖',
    color: '#e74c3c'
  },
  {
    title: 'Krāsu Kods',
    description: 'Sajauc krāsas, lai atbloķētu noslēpumus.',
    icon: '🎨',
    color: '#3498db'
  },
  {
    title: 'Matemātikas Misija',
    description: 'Atrisini īsos uzdevumus un uzkrāj punktus.',
    icon: '🔢',
    color: '#f39c12'
  },
  {
    title: 'Ģeogrāfijas Ceļojums',
    description: 'Atpazīsti valstis un atklāj jaunas vietas.',
    icon: '🌍',
    color: '#2ecc71'
  },
  {
    title: 'Vārdu Varonis',
    description: 'Veido vārdus un uzlabo valodas prasmes.',
    icon: '📚',
    color: '#e91e63'
  }
]

const quizQuestions = [
  {
    question: 'Kura komanda atkārto darbību vairākas reizes?',
    options: ['Loop', 'Click', 'Color', 'Save'],
    answer: 0
  },
  {
    question: 'Cik ir 8 + 6?',
    options: ['12', '13', '14', '15'],
    answer: 2
  },
  {
    question: 'Kura ir okeāna valsts?',
    options: ['Latvija', 'Norvēģija', 'Japāna', 'Austrija'],
    answer: 2
  }
]

const quizStarted = ref(false)
const quizComplete = ref(false)
const currentIndex = ref(0)
const selectedAnswer = ref(null)
const score = ref(0)

const currentQuestion = computed(() => quizQuestions[currentIndex.value])

const startQuiz = () => {
  quizStarted.value = true
  quizComplete.value = false
  currentIndex.value = 0
  selectedAnswer.value = null
  score.value = 0
}

const selectAnswer = (index) => {
  if (selectedAnswer.value !== null) return
  selectedAnswer.value = index
  if (index === currentQuestion.value.answer) {
    score.value += 1
  }
}

const nextQuestion = () => {
  if (currentIndex.value >= quizQuestions.length - 1) {
    quizComplete.value = true
    return
  }
  currentIndex.value += 1
  selectedAnswer.value = null
}

const playGame = () => {
  window.alert('Spēle tiek sagatavota! Drīzumā būs pieejama 🎮')
}
</script>

<template>
  <main class="container">
    <!-- Hero Section -->
    <section id="home" class="hero">
      <h1>🐉 Dragons Den</h1>
      <p class="subtitle">Spēlē, mācies un trenē prasmes katru dienu.</p>
      <div style="margin-top: 1.5rem;">
        <a href="#games" class="create-btn" style="text-decoration: none;">Spēlēt tagad</a>
      </div>
    </section>

    <!-- Navigation Cards -->
    <section class="content-section">
      <h2>🧭 Izvēlies sadaļu</h2>
      <div class="platform-cards">
        <RouterLink to="/" class="card" style="text-decoration: none; color: inherit; border-top: 4px solid #9b59b6;">
          <div class="card-content">
            <div style="font-size: 3rem; text-align: center; margin-bottom: 1rem;">🏠</div>
            <h3>Sākums</h3>
            <p>Spēļu starta zona un ātrā viktorīna.</p>
          </div>
        </RouterLink>
        <RouterLink to="/about" class="card" style="text-decoration: none; color: inherit; border-top: 4px solid #e74c3c;">
          <div class="card-content">
            <div style="font-size: 3rem; text-align: center; margin-bottom: 1rem;">🎮</div>
            <h3>Spēles</h3>
            <p>Apskati spēļu bibliotēku un sasniegumus.</p>
          </div>
        </RouterLink>
        <RouterLink to="/technical" class="card" style="text-decoration: none; color: inherit; border-top: 4px solid #3498db;">
          <div class="card-content">
            <div style="font-size: 3rem; text-align: center; margin-bottom: 1rem;">📘</div>
            <h3>Mācīties</h3>
            <p>Izvēlies mācību misijas un uzdevumus.</p>
          </div>
        </RouterLink>
      </div>
    </section>

    <!-- Games Section -->
    <section id="games" class="content-section">
      <h2>🎮 Spēļu zona</h2>

      <div class="platform-cards">
        <div
          v-for="game in games"
          :key="game.title"
          class="card"
          :style="{ borderTop: `4px solid ${game.color}` }"
        >
          <div class="card-content">
            <div style="font-size: 3rem; text-align: center; margin-bottom: 1rem;">
              {{ game.icon }}
            </div>
            <h3>{{ game.title }}</h3>
            <p>{{ game.description }}</p>
            <div class="card-buttons">
              <button class="card-btn learn-more-btn" type="button" @click="playGame">Sākt</button>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Quick Quiz Section -->
    <section class="content-section">
      <h2>⚡ Ātrais prāta duelis</h2>
      <div class="concept-box">
        <div v-if="!quizStarted">
          <p>Atbildi uz 3 jautājumiem un nopelni savu pūķa nozīmīti.</p>
          <button class="create-btn" type="button" @click="startQuiz">Sākt viktorīnu</button>
        </div>

        <div v-else-if="!quizComplete">
          <h3>{{ currentQuestion.question }}</h3>
          <div class="features-grid" style="margin-top: 1rem;">
            <button
              v-for="(option, index) in currentQuestion.options"
              :key="option"
              class="card-btn"
              type="button"
              :style="{
                background: selectedAnswer === index
                  ? (index === currentQuestion.answer ? 'linear-gradient(135deg, #2ecc71, #27ae60)' : 'linear-gradient(135deg, #e74c3c, #c0392b)')
                  : 'var(--purple-gradient)',
                color: 'white'
              }"
              @click="selectAnswer(index)"
            >
              {{ option }}
            </button>
          </div>
          <div style="margin-top: 1.5rem;">
            <button class="create-btn" type="button" @click="nextQuestion" :disabled="selectedAnswer === null">
              Nākamais
            </button>
          </div>
        </div>

        <div v-else>
          <h3>Gatavs! Tavs rezultāts: {{ score }}/{{ quizQuestions.length }}</h3>
          <p>Super! Pievieno vēl vienu misiju vai sāc no jauna.</p>
          <button class="create-btn" type="button" @click="startQuiz">Spēlēt vēlreiz</button>
        </div>
      </div>
    </section>

    <!-- Contact Form Section -->
    <section id="contact" class="content-section">
      <h2>📧 Sazinieties ar mums</h2>
      <form id="contactForm" class="contact-form" @submit.prevent="submitForm">
        <div class="form-group">
          <label for="name">Vārds:</label>
          <input type="text" id="name" name="name" v-model="form.name" required>
          <span class="error-message" id="nameError">{{ errors.name }}</span>
        </div>
        <div class="form-group">
          <label for="email">E-pasts:</label>
          <input type="email" id="email" name="email" v-model="form.email" required>
          <span class="error-message" id="emailError">{{ errors.email }}</span>
        </div>
        <div class="form-group">
          <label for="subject">Temats:</label>
          <input type="text" id="subject" name="subject" v-model="form.subject" required>
          <span class="error-message" id="subjectError">{{ errors.subject }}</span>
        </div>
        <div class="form-group">
          <label for="message">Ziņojums:</label>
          <textarea id="message" name="message" rows="8" v-model="form.message" required></textarea>
          <span class="error-message" id="messageError">{{ errors.message }}</span>
        </div>
        <button type="submit" class="submit-btn">Nosūtīt</button>
        <div class="success-message" :class="{ show: successMessage }" id="successMessage">
          {{ successMessage }}
        </div>
      </form>
    </section>
  </main>
</template>
