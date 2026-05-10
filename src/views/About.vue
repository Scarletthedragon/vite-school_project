<script setup>
import { t, currentLanguage } from '../i18n'
</script>

<template>
  <main class="container">
    <!-- Hero Section -->
    <section class="hero">
      <h1>{{ t('gameLibraryTitle') }}</h1>
      <p class="subtitle">{{ t('gameLibrarySubtitle') }}</p>
      <img
        src="https://via.placeholder.com/800x400/9b59b6/ffffff?text=Dragons+Den+Games"
        alt="Dragons Den Games"
        class="hero-image"
      >
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
</template>
