<script setup>
import { computed, ref } from 'vue'
import { useRoute } from 'vue-router'
import { currentLanguage } from '../i18n'
import { addScore, removeScore } from '../scores'
import { user } from '../auth'

const route = useRoute()

const categories = {
  'logic-maze': {
    icon: '🧩',
    color: '#9b59b6',
    titleLv: 'Loģikas labirints',
    titleEn: 'Logic Maze',
    subtitleLv: 'Atrisini mīklas un trenē domāšanu.',
    subtitleEn: 'Solve puzzles and train your thinking.',
    games: [
      { lv: 'Patern meklētājs', en: 'Pattern Finder', level: 'Easy' },
      { lv: 'Secību meistars', en: 'Sequence Master', level: 'Medium' },
      { lv: 'Labirinta kods', en: 'Maze Code', level: 'Hard' }
    ]
  },
  'robot-challenge': {
    icon: '🤖',
    color: '#e74c3c',
    titleLv: 'Robotu izaicinājums',
    titleEn: 'Robot Challenge',
    subtitleLv: 'Programmē robotu un sasniedz mērķi.',
    subtitleEn: 'Program your robot and reach the goal.',
    games: [
      { lv: 'Komandu ķēde', en: 'Command Chain', level: 'Easy' },
      { lv: 'Robota maršruts', en: 'Robot Route', level: 'Medium' },
      { lv: 'Automātikas tornis', en: 'Automation Tower', level: 'Hard' }
    ]
  },
  'color-code': {
    icon: '🎨',
    color: '#3498db',
    titleLv: 'Krāsu kods',
    titleEn: 'Color Code',
    subtitleLv: 'Mācies krāsu sajaukšanu un kombinācijas.',
    subtitleEn: 'Learn color mixing and combinations.',
    games: [
      { lv: 'Krāsu laboratorija', en: 'Color Lab', level: 'Easy' },
      { lv: 'Tonalitāšu detektīvs', en: 'Shade Detective', level: 'Medium' },
      { lv: 'Dizaina kods', en: 'Design Code', level: 'Hard' }
    ]
  },
  'math-mission': {
    icon: '🔢',
    color: '#f39c12',
    titleLv: 'Matemātikas misija',
    titleEn: 'Math Mission',
    subtitleLv: 'Risini uzdevumus un uzlabo ātrumu.',
    subtitleEn: 'Solve tasks and improve speed.',
    games: [
      { lv: 'Skaitļu sprints', en: 'Number Sprint', level: 'Easy' },
      { lv: 'Formulu mednieks', en: 'Formula Hunter', level: 'Medium' },
      { lv: 'Misija vienādojumi', en: 'Equation Mission', level: 'Hard' }
    ]
  },
  'geo-journey': {
    icon: '🌍',
    color: '#2ecc71',
    titleLv: 'Ģeogrāfijas ceļojums',
    titleEn: 'Geo Journey',
    subtitleLv: 'Atpazīsti valstis un kontinentus.',
    subtitleEn: 'Recognize countries and continents.',
    games: [
      { lv: 'Kartes meistars', en: 'Map Master', level: 'Easy' },
      { lv: 'Galvaspilsētu duelis', en: 'Capital Duel', level: 'Medium' },
      { lv: 'Karogu eksperts', en: 'Flag Expert', level: 'Hard' }
    ]
  },
  'word-hero': {
    icon: '📚',
    color: '#e91e63',
    titleLv: 'Vārdu varonis',
    titleEn: 'Word Hero',
    subtitleLv: 'Veido vārdus un uzlabo valodu.',
    subtitleEn: 'Build words and improve language skills.',
    games: [
      { lv: 'Burtu tornis', en: 'Letter Tower', level: 'Easy' },
      { lv: 'Teikumu salikšana', en: 'Sentence Builder', level: 'Medium' },
      { lv: 'Stāsta arhitekts', en: 'Story Architect', level: 'Hard' }
    ]
  }
}

const isLv = computed(() => currentLanguage.value === 'lv')
const isVisitor = computed(() => user.value?.role === 'visitor')

const category = computed(() => categories[route.params.slug])

const pageTitle = computed(() => {
  if (!category.value) return isLv.value ? 'Kategorija nav atrasta' : 'Category not found'
  return isLv.value ? category.value.titleLv : category.value.titleEn
})

const pageSubtitle = computed(() => {
  if (!category.value) return isLv.value ? 'Atgriezies sākumlapā un izvēlies kategoriju vēlreiz.' : 'Go back to home and choose a category again.'
  return isLv.value ? category.value.subtitleLv : category.value.subtitleEn
})

const categoryTests = {
  'logic-maze': [
    { questionLv: 'Kurš skaitlis turpina secību 2, 4, 8, 16, ...?', questionEn: 'Which number continues the sequence 2, 4, 8, 16, ...?', options: ['18', '24', '32', '30'], answer: 2 },
    { questionLv: 'Kurš ir nākamais burts: A, C, E, ...?', questionEn: 'Which letter comes next: A, C, E, ...?', options: ['F', 'G', 'H', 'I'], answer: 1 },
    { questionLv: 'Ja visi roboti ir gudri, un Lina ir robots, Lina ir ...?', questionEn: 'If all robots are smart, and Lina is a robot, Lina is ...?', options: ['lēna', 'gudra', 'sarkana', 'jauna'], answer: 1 }
  ],
  'robot-challenge': [
    { questionLv: 'Kura komanda liek robotam iet uz priekšu?', questionEn: 'Which command moves a robot forward?', options: ['TURN', 'JUMP', 'MOVE', 'STOP'], answer: 2 },
    { questionLv: 'Kas notiek, ja robots saņem STOP?', questionEn: 'What happens if a robot gets STOP?', options: ['Paātrinās', 'Apstājas', 'Pagriežas', 'Lec'], answer: 1 },
    { questionLv: 'Labākā secība mērķim: uz priekšu, pa labi, uz priekšu?', questionEn: 'Best sequence to reach target: forward, right, forward?', options: ['MOVE-RIGHT-MOVE', 'LEFT-MOVE-RIGHT', 'STOP-MOVE-MOVE', 'RIGHT-STOP-MOVE'], answer: 0 }
  ],
  'color-code': [
    { questionLv: 'Sarkans + zils = ?', questionEn: 'Red + blue = ?', options: ['Zaļš', 'Violets', 'Oranžs', 'Dzeltens'], answer: 1 },
    { questionLv: 'Kura ir aukstā krāsa?', questionEn: 'Which is a cool color?', options: ['Sarkana', 'Oranža', 'Zila', 'Dzeltena'], answer: 2 },
    { questionLv: 'Balts + melns rada ...?', questionEn: 'White + black makes ...?', options: ['Pelēku', 'Rozā', 'Brūnu', 'Zaļu'], answer: 0 }
  ],
  'math-mission': [
    { questionLv: '7 + 8 = ?', questionEn: '7 + 8 = ?', options: ['14', '15', '16', '17'], answer: 1 },
    { questionLv: '9 x 6 = ?', questionEn: '9 x 6 = ?', options: ['48', '52', '54', '56'], answer: 2 },
    { questionLv: '36 / 4 = ?', questionEn: '36 / 4 = ?', options: ['8', '9', '10', '12'], answer: 1 }
  ],
  'geo-journey': [
    { questionLv: 'Latvijas galvaspilsēta ir ...?', questionEn: 'Capital of Latvia is ...?', options: ['Tallina', 'Rīga', 'Viļņa', 'Helsinki'], answer: 1 },
    { questionLv: 'Kurš ir lielākais okeāns?', questionEn: 'Which is the largest ocean?', options: ['Atlantijas', 'Indijas', 'Arktikas', 'Klusais'], answer: 3 },
    { questionLv: 'Eiropa ir ...?', questionEn: 'Europe is a ...?', options: ['Valsts', 'Pilsēta', 'Kontinents', 'Sala'], answer: 2 }
  ],
  'word-hero': [
    { questionLv: 'Kurš ir darbības vārds?', questionEn: 'Which is a verb?', options: ['skaists', 'skriet', 'koks', 'ātri'], answer: 1 },
    { questionLv: 'Kurā vārdā ir visvairāk burtu?', questionEn: 'Which word has the most letters?', options: ['suns', 'kaķis', 'dators', 'pele'], answer: 2 },
    { questionLv: 'Pabeidz teikumu: Es ... uz skolu.', questionEn: 'Complete: I ... to school.', options: ['grāmata', 'eju', 'zils', 'logs'], answer: 1 }
  ]
}

const gamesWithTests = computed(() => {
  if (!category.value) return []
  const tests = categoryTests[route.params.slug] || []
  return category.value.games.map((game, index) => ({ ...game, test: tests[index] }))
})

const activeGame = ref(null)
const selectedAnswer = ref(null)
const feedback = ref('')
const completedGames = ref([])
const completionPointsByLevel = {
  Easy: 10,
  Medium: 20,
  Hard: 30
}
const penaltyPointsByLevel = {
  Easy: 3,
  Medium: 6,
  Hard: 10
}

const openTest = (gameKey) => {
  activeGame.value = gameKey
  selectedAnswer.value = null
  feedback.value = ''
}

const isCompleted = (gameKey) => completedGames.value.includes(gameKey)

const submitTest = (game) => {
  if (selectedAnswer.value === null || !game.test) return

  const pointsForCompletion = completionPointsByLevel[game.level] || 10
  const penaltyForWrong = penaltyPointsByLevel[game.level] || 3
  const isCorrect = selectedAnswer.value === game.test.answer
  if (isCorrect) {
    if (!completedGames.value.includes(game.en)) {
      completedGames.value.push(game.en)
      if (isVisitor.value) {
        feedback.value = isLv.value ? 'Pareizi! Tests izpildīts.' : 'Correct! Test completed.'
      } else {
        addScore(pointsForCompletion)
        feedback.value = isLv.value
          ? `Pareizi! Tests izpildīts. +${pointsForCompletion} punkti.`
          : `Correct! Test completed. +${pointsForCompletion} points.`
      }
    } else {
      feedback.value = isLv.value
        ? 'Pareizi! Šis tests jau pabeigts, papildu punkti netiek piešķirti.'
        : 'Correct! This test is already completed, no extra points awarded.'
    }
  } else {
    if (isVisitor.value) {
      feedback.value = isLv.value ? 'Nepareiza atbilde, mēģini vēlreiz.' : 'Wrong answer, try again.'
    } else {
      removeScore(penaltyForWrong)
      feedback.value = isLv.value
        ? `Nepareiza atbilde, mēģini vēlreiz. -${penaltyForWrong} punkti.`
        : `Wrong answer, try again. -${penaltyForWrong} points.`
    }
  }
}
</script>

<template>
  <main class="container">
    <section class="hero">
      <h1>
        <span v-if="category">{{ category.icon }}</span>
        {{ pageTitle }}
      </h1>
      <p class="subtitle">{{ pageSubtitle }}</p>
    </section>

    <section v-if="category" class="content-section">
      <h2>{{ isLv ? 'Spēļu saraksts' : 'Game List' }}</h2>
      <div class="platform-cards">
        <div
          v-for="game in gamesWithTests"
          :key="game.en"
          class="card"
          :style="{ borderTop: `4px solid ${category.color}` }"
        >
          <div class="card-content">
            <h3>{{ isLv ? game.lv : game.en }}</h3>
            <p>{{ isLv ? 'Grūtības līmenis' : 'Difficulty level' }}: {{ game.level }}</p>
            <div class="card-buttons" style="margin-top: 1rem;">
              <button class="card-btn learn-more-btn" type="button" @click="openTest(game.en)">
                {{ isCompleted(game.en) ? (isLv ? 'Pabeigts' : 'Completed') : (isLv ? 'Sākt testu' : 'Start test') }}
              </button>
            </div>

            <div v-if="activeGame === game.en && game.test" style="margin-top: 1rem; background: rgba(255,255,255,0.08); padding: 1rem; border-radius: 10px;">
              <p style="font-weight: bold; margin-bottom: 0.8rem;">{{ isLv ? game.test.questionLv : game.test.questionEn }}</p>
              <div class="features-grid" style="margin-top: 0;">
                <button
                  v-for="(option, index) in game.test.options"
                  :key="option"
                  class="card-btn"
                  type="button"
                  :style="{ background: selectedAnswer === index ? 'var(--primary-color)' : 'var(--purple-gradient)' }"
                  @click="selectedAnswer = index"
                >
                  {{ option }}
                </button>
              </div>
              <button class="create-btn" type="button" style="margin-top: 1rem;" :disabled="selectedAnswer === null" @click="submitTest(game)">
                {{ isLv ? 'Pārbaudīt atbildi' : 'Check answer' }}
              </button>
              <p v-if="feedback" style="margin-top: 0.8rem; font-weight: bold;">{{ feedback }}</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section v-else class="content-section">
      <div class="concept-box">
        <RouterLink to="/" class="create-btn" style="text-decoration: none; display: inline-block;">
          {{ isLv ? 'Atpakaļ uz sākumu' : 'Back to Home' }}
        </RouterLink>
      </div>
    </section>
  </main>
</template>
