<script setup>
import { ref } from 'vue'

const missions = [
  {
    id: 1,
    title: 'Koda starts',
    summary: 'Iemācies komandu secību un izpildi vienkāršu algoritmu.',
    steps: ['Ievieto 3 soļus pareizā secībā', 'Nopelni 10 punktus', 'Atbloķē nākamo misiju'],
    difficulty: 'Viegli',
    icon: '🚀',
    color: '#9b59b6'
  },
  {
    id: 2,
    title: 'Matemātikas trase',
    summary: 'Atrisini uzdevumus, lai saglabātu ātrumu.',
    steps: ['Pareizi atbildi uz 5 uzdevumiem', 'Izvēlies īsāko ceļu', 'Sasniedz finišu'],
    difficulty: 'Vidēji',
    icon: '🧮',
    color: '#e74c3c'
  },
  {
    id: 3,
    title: 'Valodas burvestība',
    summary: 'Veido vārdus no burtiem un uzkrāj mana kristālus.',
    steps: ['Izveido 3 vārdus', 'Izmanto bonus burtu', 'Nopelni nozīmīti'],
    difficulty: 'Vidēji',
    icon: '✨',
    color: '#3498db'
  }
]

const selectedMission = ref(null)

const openMission = (mission) => {
  selectedMission.value = mission
}

const closeModal = () => {
  selectedMission.value = null
}
</script>

<template>
  <main class="container">
    <!-- Hero Section -->
    <section class="hero">
      <h1>📘 Mācību misijas</h1>
      <p class="subtitle">Soli pa solim uz prasmju līmeņa celšanu.</p>
    </section>

    <section class="content-section">
      <h2>🗺️ Izvēlies misiju</h2>
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
                Sākt misiju
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section class="content-section">
      <h2>🎯 Mācību ceļš</h2>
      <div class="features-grid">
        <div class="feature-item">
          <span class="feature-icon">🧭</span>
          <h4>1. Iesācējs</h4>
          <p>Vienkārši uzdevumi ar tūlītēju atgriezenisko saiti.</p>
        </div>
        <div class="feature-item">
          <span class="feature-icon">⚙️</span>
          <h4>2. Prasmīgais</h4>
          <p>Apvieno vairākas prasmes vienā misijā.</p>
        </div>
        <div class="feature-item">
          <span class="feature-icon">🏅</span>
          <h4>3. Meistars</h4>
          <p>Izpildi izaicinājumus ar laika limitu un bonusiem.</p>
        </div>
      </div>
    </section>

    <section class="content-section">
      <h2>💡 Padomi spēlei</h2>
      <div class="concept-box">
        <ul>
          <li>Izmēģini misiju vairākas reizes, lai uzlabotu rezultātu.</li>
          <li>Krāj punktus, lai atbloķētu jaunus pūķa talismanus.</li>
          <li>Spēlē kopā ar draugiem un salīdzini rezultātus.</li>
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
      <button class="create-btn" type="button" style="margin-top: 1rem;">Sākt tagad</button>
    </div>
  </div>
</template>
