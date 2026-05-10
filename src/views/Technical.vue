<script setup>
import { ref, computed } from 'vue'
import { t, currentLanguage } from '../i18n'
import { addScore } from '../scores'
import { user } from '../auth'

const missions = computed(() => [
  {
    id: 1,
    title: t('codeStart'),
    summary: t('codeStartSummary'),
    steps: [t('codeSteps1'), t('codeSteps2'), t('codeSteps3')],
    difficulty: t('easy'),
    icon: '🚀',
    color: '#9b59b6'
  },
  {
    id: 2,
    title: t('mathRace'),
    summary: t('mathRaceSummary'),
    steps: [t('mathSteps1'), t('mathSteps2'), t('mathSteps3')],
    difficulty: t('medium'),
    icon: '🧮',
    color: '#e74c3c'
  },
  {
    id: 3,
    title: t('languageMagic'),
    summary: t('languageMagicSummary'),
    steps: [t('langSteps1'), t('langSteps2'), t('langSteps3')],
    difficulty: t('medium'),
    icon: '✨',
    color: '#3498db'
  }
])

const selectedMission = ref(null)

const openMission = (mission) => {
  selectedMission.value = mission
}

const closeModal = () => {
  selectedMission.value = null
}

const completedMissions = ref(new Set())
const missionPopup = ref('')

const startMission = (mission) => {
  if (completedMissions.value.has(mission.id)) return
  if (user.value && user.value.role !== 'visitor') {
    addScore(25)
    completedMissions.value.add(mission.id)
    missionPopup.value = `+25 ⭐ ${mission.title}`
    setTimeout(() => { missionPopup.value = '' }, 2000)
  }
  closeModal()
}
</script>

<template>
  <main class="container">
    <!-- Hero Section -->
    <section class="hero">
      <h1>{{ t('missionsTitle') }}</h1>
      <p class="subtitle">{{ t('missionsSubtitle') }}</p>
    </section>

    <section class="content-section">
      <h2>{{ t('howItWorks') }}</h2>
      <div class="features-grid">
        <div class="feature-item">
          <span class="feature-icon">🎯</span>
          <h4>{{ t('chooseQuest') }}</h4>
          <p>{{ t('questDesc') }}</p>
        </div>
        <div class="feature-item">
          <span class="feature-icon">🧠</span>
          <h4>{{ t('playAndLearn') }}</h4>
          <p>{{ t('learnDesc') }}</p>
        </div>
        <div class="feature-item">
          <span class="feature-icon">🏆</span>
          <h4>{{ t('earnRewards') }}</h4>
          <p>{{ t('rewardsDesc') }}</p>
        </div>
      </div>
    </section>

    <section class="content-section">
      <h2>{{ t('chooseMission') }}</h2>
      <div class="platform-cards">
        <div
          v-for="mission in missions"
          :key="mission.id"
          class="card"
          :style="{ borderTop: `4px solid ${mission.color}` }"
        >
          <div class="card-content">
            <div style="font-size: 3rem; text-align: center; margin-bottom: 1rem;">
              {{ mission.icon }}
            </div>
            <h3>{{ mission.title }}</h3>
            <p>{{ mission.summary }}</p>
            <div class="card-buttons">
              <button class="card-btn learn-more-btn" type="button" @click="openMission(mission)">
                {{ t('startMission') }}
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section class="content-section">
      <h2>{{ t('learningPath') }}</h2>
      <div class="features-grid">
        <div class="feature-item">
          <span class="feature-icon">🧭</span>
          <h4>{{ t('beginner') }}</h4>
          <p>{{ t('beginnerDesc') }}</p>
        </div>
        <div class="feature-item">
          <span class="feature-icon">⚙️</span>
          <h4>{{ t('skilled') }}</h4>
          <p>{{ t('skilledDesc') }}</p>
        </div>
        <div class="feature-item">
          <span class="feature-icon">🏅</span>
          <h4>{{ t('master') }}</h4>
          <p>{{ t('masterDesc') }}</p>
        </div>
      </div>
    </section>

    <section class="content-section">
      <h2>{{ t('achievements') }}</h2>
      <div class="concept-box">
        <ul>
          <li>{{ t('fireChampion') }}</li>
          <li>{{ t('iceTactician') }}</li>
          <li>{{ t('lightningMind') }}</li>
        </ul>
      </div>
    </section>

  </main>

  <div v-if="selectedMission" class="modal" @click.self="closeModal">
    <div class="modal-content">
      <span class="close" @click="closeModal">&times;</span>
      <h2>{{ selectedMission.title }}</h2>
      <p style="font-size: 1.05rem; margin-bottom: 1rem;">{{ selectedMission.summary }}</p>
      <div class="concept-box" style="margin-bottom: 1rem;">
        <h4>🧩 Uzdevumi</h4>
        <ul>
          <li v-for="step in selectedMission.steps" :key="step">{{ step }}</li>
        </ul>
      </div>
      <p><strong>Grūtības pakāpe:</strong> {{ selectedMission.difficulty }}</p>
      <div style="margin-top: 1rem; display: flex; align-items: center; gap: 1rem;">
        <button class="create-btn" type="button" @click="startMission(selectedMission)" :disabled="completedMissions.has(selectedMission.id)">{{ completedMissions.has(selectedMission.id) ? '✅ Pabeigts' : t('startMission') }}</button>
        <span v-if="missionPopup" style="color: #f39c12; font-weight: bold;">{{ missionPopup }}</span>
      </div>
    </div>
  </div>
</template>
