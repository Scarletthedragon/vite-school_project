<script setup>
import { computed, ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { t, currentLanguage } from '../i18n'
import { user } from '../auth'
import { userScore, leaderboard, fetchLeaderboard } from '../scores'
import { boardMessages, postBoardMessage } from '../messageBoard'

const router = useRouter()

onMounted(() => fetchLeaderboard())

const messageBoardOpen = ref(false)
const boardForm = ref({
  message: ''
})
const boardErrors = ref({
  message: ''
})
const boardStatus = ref('')
const posterName = computed(() => user.value?.name || (currentLanguage.value === 'lv' ? 'Viesis' : 'Visitor'))

const formattedBoardMessages = computed(() => {
  return boardMessages.value.map((entry) => ({
    ...entry,
    date: new Date(entry.createdAt).toLocaleString(currentLanguage.value === 'lv' ? 'lv-LV' : 'en-GB')
  }))
})

const getRoleEmoji = (role) => {
  if (role === 'admin') return '👑'
  if (role === 'user') return '👤'
  return ''
}

const submitBoardMessage = () => {
  boardErrors.value = { message: '' }
  boardStatus.value = ''

  if (!boardForm.value.message.trim()) {
    boardErrors.value.message = t('messageRequired')
  }

  if (boardErrors.value.message) return

  postBoardMessage({
    name: posterName.value,
    message: boardForm.value.message.trim(),
    role: user.value?.role || 'visitor'
  })
  boardForm.value = { message: '' }
  boardStatus.value = currentLanguage.value === 'lv'
    ? 'Ziņa pievienota ziņojumu dēlim.'
    : 'Message added to the board.'
}

const games = computed(() => [
  {
    slug: 'logic-maze',
    title: t('logicMaze'),
    description: t('learnSteps'),
    icon: '🧩',
    color: '#9b59b6'
  },
  {
    slug: 'robot-challenge',
    title: t('robotChallenge'),
    description: t('programRobot'),
    icon: '🤖',
    color: '#e74c3c'
  },
  {
    slug: 'color-code',
    title: t('colorCode'),
    description: t('mixColors'),
    icon: '🎨',
    color: '#3498db'
  },
  {
    slug: 'math-mission',
    title: t('mathMission'),
    description: t('solveQuests'),
    icon: '🔢',
    color: '#f39c12'
  },
  {
    slug: 'geo-journey',
    title: t('geoJourney'),
    description: t('recognizeCountries'),
    icon: '🌍',
    color: '#2ecc71'
  },
  {
    slug: 'word-hero',
    title: t('wordHero'),
    description: t('buildWords'),
    icon: '📚',
    color: '#e91e63'
  }
])

const quizQuestions = computed(() => [
  {
    question: t('whichCommand'),
    options: ['Loop', 'Click', 'Color', 'Save'],
    answer: 0
  },
  {
    question: t('whatIs8Plus6'),
    options: ['12', '13', '14', '15'],
    answer: 2
  },
  {
    question: t('oceanCountry'),
    options: ['Latvija', 'Norvēģija', 'Japāna', 'Austrija'],
    answer: 2
  }
])

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

const openGameCategory = (slug) => {
  router.push({ name: 'game-category', params: { slug } })
}
</script>

<template>
  <main class="container">
    <!-- Hero Section -->
    <section id="home" class="hero">
      <h1>{{ t('heroTitle') }}</h1>
      <p class="subtitle">{{ t('heroSubtitle') }}</p>
    </section>

    <!-- Games Section -->
    <section id="games" class="content-section">
      <h2>{{ t('gameZone') }}</h2>

      <div class="platform-cards">
        <div
          v-for="game in games"
          :key="game.title"
          class="card"
          :style="{ borderTop: `4px solid ${game.color}`, '--card-color': game.color }"
        >
          <div class="card-content">
            <div style="font-size: 3rem; text-align: center; margin-bottom: 1rem;">
              {{ game.icon }}
            </div>
            <h3>{{ game.title }}</h3>
            <p>{{ game.description }}</p>
            <div class="card-buttons">
              <button
                class="card-btn learn-more-btn"
                type="button"
                :style="{
                  background: `linear-gradient(135deg, ${game.color}cc 0%, ${game.color} 100%)`,
                  boxShadow: `0 4px 14px ${game.color}55`
                }"
                @click="openGameCategory(game.slug)"
              >
                {{ t('openList') }}
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>



    <!-- Leaderboard Section -->
    <section v-if="user" class="content-section">
      <h2>{{ t('leaderboardTitle') }}</h2>
      <div class="concept-box">
        <div v-if="user.role !== 'visitor'" style="margin-bottom: 1rem; font-size: 1.1rem;">
          {{ t('yourPoints') }} <strong style="color: var(--primary-color); font-size: 1.4rem;">{{ userScore ?? 0 }} ⭐</strong>
        </div>
        <table style="width: 100%; border-collapse: collapse;">
          <thead>
            <tr style="border-bottom: 2px solid var(--primary-color);">
              <th style="text-align: left; padding: 0.5rem;">#</th>
              <th style="text-align: left; padding: 0.5rem;">{{ t('playerColumn') }}</th>
              <th style="text-align: right; padding: 0.5rem;">{{ t('pointsColumn') }} ⭐</th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="(entry, index) in leaderboard"
              :key="entry.email"
              :style="{ background: entry.email === user?.email ? 'rgba(155,89,182,0.15)' : 'transparent', borderBottom: '1px solid rgba(155,89,182,0.2)' }"
            >
              <td style="padding: 0.6rem 0.5rem; font-weight: bold;">{{ index + 1 }}</td>
              <td style="padding: 0.6rem 0.5rem;">{{ entry.name }}</td>
              <td style="padding: 0.6rem 0.5rem; text-align: right; font-weight: bold;">{{ entry.score }}</td>
            </tr>
            <tr v-if="leaderboard.length === 0">
              <td colspan="3" style="padding: 1rem; text-align: center; opacity: 0.6;">{{ t('noPointsYet') }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>

    <div class="two-col-sections">
      <section class="content-section" style="text-align: center;">
        <h2>{{ t('messageBoardTitle') }}</h2>
        <p>{{ t('messageBoardDesc') }}</p>
        <button class="create-btn" type="button" @click="messageBoardOpen = true">
          {{ t('openMessageBoard') }}
        </button>
      </section>

      <section class="content-section" style="text-align: center;">
        <h2>{{ currentLanguage === 'lv' ? '📧 Sazināties ar mums' : '📧 Contact Us' }}</h2>
        <p>{{ currentLanguage === 'lv' ? 'Jautājumi? Mēs esam šeit, lai palīdzētu.' : 'Questions? We are here to help.' }}</p>
        <RouterLink to="/contact" class="create-btn" style="text-decoration: none; display: inline-block;">
          {{ currentLanguage === 'lv' ? 'Atvērt kontaktformu' : 'Open contact form' }}
        </RouterLink>
      </section>
    </div>

    <div v-if="messageBoardOpen" class="message-board-backdrop" @click="messageBoardOpen = false"></div>
    <aside class="message-board-sidebar" :class="{ open: messageBoardOpen }">
      <div class="message-board-header">
        <h3>{{ t('messageBoardSidebar') }}</h3>
        <button class="message-board-close" type="button" @click="messageBoardOpen = false">✕</button>
      </div>

      <form class="contact-form" @submit.prevent="submitBoardMessage">
        <div class="form-group">
          <label for="board-message">{{ t('message') }}</label>
          <textarea id="board-message" rows="4" v-model="boardForm.message"></textarea>
          <span class="error-message">{{ boardErrors.message }}</span>
        </div>
        <button type="submit" class="submit-btn">{{ t('post') }}</button>
        <div class="success-message" :class="{ show: boardStatus }">{{ boardStatus }}</div>
      </form>

      <div class="message-board-list">
        <p v-if="formattedBoardMessages.length === 0" style="opacity: 0.7;">
          {{ t('noMessages') }}
        </p>
        <article v-for="entry in formattedBoardMessages" :key="entry.id" class="message-board-item">
          <div class="message-board-meta">
            <strong>{{ getRoleEmoji(entry.role) }} {{ entry.name }}</strong>
            <span>{{ entry.date }}</span>
          </div>
          <p>{{ entry.message }}</p>
        </article>
      </div>
    </aside>
  </main>
</template>

<style scoped>
.two-col-sections {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1.5rem;
}

@media (max-width: 640px) {
  .two-col-sections {
    grid-template-columns: 1fr;
  }
}
</style>
