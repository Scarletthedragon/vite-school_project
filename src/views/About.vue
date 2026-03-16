<template>
  <main class="container">
    <!-- Hero Section -->
    <section class="hero">
      <h1>🎮 Spēļu bibliotēka</h1>
      <p class="subtitle">Izvēlies sev piemērotu spēli un trenē prasmes katru dienu.</p>
      <img
        src="https://via.placeholder.com/800x400/9b59b6/ffffff?text=Dragons+Den+Games"
        alt="Dragons Den Games"
        class="hero-image"
      >
    </section>

    <section class="content-section">
      <h2>🚀 Kā tas strādā?</h2>
      <div class="features-grid">
        <div class="feature-item">
          <span class="feature-icon">🎯</span>
          <h4>Izvēlies misiju</h4>
          <p>Katram līmenim ir sava tēma un uzdevums.</p>
        </div>
        <div class="feature-item">
          <span class="feature-icon">🧠</span>
          <h4>Spēlē un mācies</h4>
          <p>Spēles trenē loģiku, matemātiku un valodu.</p>
        </div>
        <div class="feature-item">
          <span class="feature-icon">🏆</span>
          <h4>Iegūsti balvas</h4>
          <p>Punkti atver jaunus līmeņus un nozīmītes.</p>
        </div>
      </div>
    </section>

    <section class="content-section">
      <h2>🏅 Sasniegumi</h2>
      <div class="concept-box">
        <ul>
          <li>🔥 Uguns čempions — 5 pareizi pēc kārtas</li>
          <li>❄️ Ledus taktiķis — 3 misijas bez kļūdām</li>
          <li>⚡ Zibens prāts — pabeigta viktorīna zem 60 sekundēm</li>
        </ul>
      </div>
    </section>

    <section class="content-section">
      <h2>👨‍🏫 Skolotājiem un vecākiem</h2>
      <div class="concept-box">
        <p>
          Dragons Den palīdz mācīties spēlējoties. Katrs uzdevums ir veidots tā, lai bērni
          praktiski izmēģinātu jaunas prasmes un uzreiz redzētu rezultātu.
        </p>
        <RouterLink to="/contact" class="create-btn" style="display: inline-block; text-decoration: none;">
          Sazināties par klases kontu
        </RouterLink>
      </div>
    </section>
  </main>
</template>
