<script setup>
import { workExperience, education } from '../data/portfolioData';
</script>

<template>
  <section id="experience" class="section-padding experience-section">
    <div class="container">
      <!-- Section Header -->
      <div class="section-header">
        <span class="section-badge">Percurso & Formação</span>
        <h2 class="section-title">Minha Trajetória <span class="gradient-text">Profissional</span></h2>
        <p class="section-subtitle">
          Evolução contínua, aprendizagem prática e consolidação de competências fullstack.
        </p>
      </div>

      <!-- Timeline Component -->
      <div class="timeline">

  <!-- Work Experience -->
  <h3 class="timeline-section-title">Experiência de Trabalho</h3>

  <div
    v-for="(item, idx) in workExperience"
    :key="'work-' + idx"
    class="timeline-item"
  >
    <div class="timeline-marker">
      <div class="marker-dot"></div>
      <div v-if="idx !== workExperience.length - 1" class="marker-line"></div>
    </div>

    <div class="timeline-content glass-card">
      <div class="timeline-header">
        <span class="timeline-period">{{ item.period }}</span>
        <span class="timeline-company">{{ item.company }}</span>
      </div>

      <h3 class="timeline-role">{{ item.role }}</h3>
      
<div
  v-if="item.location || item.workMode"
  class="timeline-location"
>
  <div v-if="item.location" class="location-info">
    <i class="fas fa-location-dot"></i>
    <span>{{ item.location }}</span>
  </div>

  <span
    v-if="item.workMode"
    class="work-mode"
    :class="item.workMode.toLowerCase()"
  >
    <i
      :class="{
        'fas fa-house-laptop': item.workMode === 'Remoto',
        'fas fa-building': item.workMode === 'Presencial',
        'fas fa-laptop-house': item.workMode === 'Híbrido'
      }"
    ></i>
    {{ item.workMode }}
  </span>
</div>

      <ul class="timeline-desc">
  <li
    v-for="(point, index) in item.description"
    :key="index"
  >
    {{ point }}
  </li>
</ul>

      <div class="timeline-badges">
        <span
          v-for="badge in item.badges"
          :key="badge"
          class="glass-pill"
        >
          {{ badge }}
        </span>
      </div>
    </div>
  </div>

  <!-- Education -->
  <h3 class="timeline-section-title">Educação</h3>

  <div
    v-for="(item, idx) in education"
    :key="'edu-' + idx"
    class="timeline-item"
  >
    <div class="timeline-marker">
      <div class="marker-dot"></div>
      <div v-if="idx !== education.length - 1" class="marker-line"></div>
    </div>

    <div class="timeline-content glass-card">
      <div class="timeline-header">
        <span class="timeline-period">{{ item.period }}</span>
        <span class="timeline-company">{{ item.company }}</span>
      </div>

      <h3 class="timeline-role">{{ item.role }}</h3>
      <p class="timeline-desc">{{ item.description }}</p>

      <div class="timeline-badges">
        <span
          v-for="badge in item.badges"
          :key="badge"
          class="glass-pill"
        >
          {{ badge }}
        </span>
      </div>
    </div>
  </div>

</div>
    </div>
  </section>
</template>

<style scoped>
.experience-section {
  position: relative;
}

.timeline {
  max-width: 800px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

.timeline-section-title {
  font-size: 1.25rem;
  font-weight: 700;
  color: var(--text-primary);
  margin: 3rem 0 1.5rem;
  text-transform: uppercase;
  letter-spacing: 0.08em;
}

.timeline-item {
  display: grid;
  grid-template-columns: 40px 1fr;
  gap: 1.5rem;
}

.timeline-marker {
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
}

.marker-dot {
  width: 18px;
  height: 18px;
  border-radius: 50%;
  background: var(--primary);
  border: 4px solid var(--bg-dark);
  box-shadow: 0 0 15px var(--primary);
  margin-top: 0.35rem;
  z-index: 2;
}

.marker-line {
  width: 2px;
  flex-grow: 1;
  background: linear-gradient(180deg, var(--primary) 0%, rgba(168, 85, 247, 0.2) 100%);
  margin-top: 0.5rem;
}

.timeline-content {
  padding: 1.75rem;
}

.timeline-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  margin-bottom: 0.5rem;
  flex-wrap: wrap;
}

.timeline-period {
  font-family: var(--font-code);
  font-size: 0.82rem;
  font-weight: 600;
  color: var(--primary-light);
  background: rgba(99, 102, 241, 0.1);
  padding: 0.25rem 0.75rem;
  border-radius: var(--radius-full);
}

.timeline-company {
  color: var(--text-dim);
  font-size: 0.88rem;
  font-weight: 500;
}

.timeline-role {
  font-size: 1.35rem;
  font-weight: 800;
  margin-bottom: 0.65rem;
  letter-spacing: -0.3px;
}

.timeline-desc {
  color: var(--text-muted);
  font-size: 0.95rem;
  line-height: 1.65;
  margin-bottom: 1.25rem;
  padding-left: 1.2rem;
}

.timeline-desc li {
  margin-bottom: 0.5rem;
}

.timeline-desc li:last-child {
  margin-bottom: 0;
}


.timeline-location {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 0.75rem;
  margin: 0.5rem 0 1rem;
}

.location-info {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: var(--text-muted);
  font-size: 0.9rem;
}

.location-info i {
  color: var(--primary);
}

.work-mode {
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  padding: 0.3rem 0.7rem;
  border-radius: var(--radius-full);
  font-size: 0.75rem;
  font-weight: 600;
  border: 1px solid;
}

/* Remoto - Azul */
.work-mode.remoto {
  color: #818cf8;
  background: rgba(99, 102, 241, 0.1);
  border-color: rgba(99, 102, 241, 0.25);
}

/* Presencial - Verde */
.work-mode.presencial {
  color: #34d399;
  background: rgba(52, 211, 153, 0.1);
  border-color: rgba(52, 211, 153, 0.25);
}

/* Híbrido - Roxo */
.work-mode.híbrido {
  color: #c084fc;
  background: rgba(192, 132, 252, 0.1);
  border-color: rgba(192, 132, 252, 0.25);
}


.timeline-badges {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

@media (max-width: 600px) {
  .timeline-item {
    grid-template-columns: 24px 1fr;
    gap: 1rem;
  }
  .marker-dot {
    width: 14px;
    height: 14px;
  }
  .timeline-content {
    padding: 1.25rem;
  }
}
</style>
