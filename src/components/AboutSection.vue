<script setup>
import { ref, computed } from 'vue';
import { developerInfo, skillsData } from '../data/portfolioData';

// Importação da imagem de perfil a partir da pasta src/assets/images/
import avatarImage from '../assets/styles/images/1772056228371.png';

const selectedSkillCategory = ref('Todos');
const imageFailed = ref(false);

const categories = ['Todos', 'Frontend', 'Backend', 'Database', 'Tools'];

const filteredSkills = computed(() => {
  if (selectedSkillCategory.value === 'Todos') {
    return skillsData;
  }
  return skillsData.filter(s => s.category === selectedSkillCategory.value);
});

const handleImageError = () => {
  imageFailed.value = true;
};

const principles = [
  {
    title: "Código Limpo & Escalável",
    desc: "Estruturação modular de componentes, convenções de código rigorosas e documentação clara para fácil manutenção.",
    icon: "💻"
  },
  {
    title: "UI/UX Focado no Utilizador",
    desc: "Interfaces reativas com Vue 3, glassmorphic design moderno, animações subtis e responsividade total.",
    icon: "🎨"
  },
  {
    title: "Performance & Otimização",
    desc: "Carregamento rápido (Vite), requisições assíncronas eficientes e otimização de queries de base de dados.",
    icon: "⚡"
  },
  {
    title: "Evolução e Aprendizagem Contínua",
    desc: "Exploração constante de novas ferramentas, acompanhamento de boas práticas e mentalidade de solução de problemas.",
    icon: "🚀"
  }
];
</script>

<template>
  <section id="about" class="section-padding about-section">
    <div class="container">
      <!-- Section Header -->
      <div class="section-header">
        <span class="section-badge">Sobre Mim</span>
        <h2 class="section-title">Quem Sou & <span class="gradient-text">Minha Filosofia</span></h2>
        <p class="section-subtitle">
          Combino sensibilidade de design frontend com a lógica robusta de sistemas backend.
        </p>
      </div>

      <!-- Profile Bio Showcase Box -->
      <div class="profile-showcase-box glass-card mb-5">
        <div class="profile-image-col">
          <div class="profile-photo-wrapper">
            <img
              v-if="!imageFailed"
              :src="avatarImage"
              :alt="developerInfo.name"
              class="developer-large-photo"
              @error="handleImageError"
            />
            <div v-else class="developer-large-fallback">
              <span class="large-initials">RM</span>
            </div>
            <div class="photo-glow-effect"></div>
          </div>
        </div>

        <div class="profile-details-col">
          <div class="profile-header-info">
            <span class="dev-title-pill">{{ developerInfo.role }}</span>
            <h3 class="dev-name">{{ developerInfo.name }}</h3>
            <p class="dev-location">📍 {{ developerInfo.location }}</p>
          </div>

          <p class="dev-bio-text">
            {{ developerInfo.about }}
          </p>

          <!-- Bio Highlights -->
          <div class="bio-highlights-grid">
            <div v-for="(detail, dIdx) in developerInfo.bioDetails" :key="dIdx" class="bio-detail-item">
              <span class="detail-label">{{ detail.title }}</span>
              <span class="detail-val">{{ detail.value }}</span>
            </div>
          </div>
        </div>
      </div>

      <!-- Principles Grid -->
      <div class="principles-grid">
        <div v-for="(item, idx) in principles" :key="idx" class="principle-card glass-card">
          <div class="principle-icon">{{ item.icon }}</div>
          <h3 class="principle-title">{{ item.title }}</h3>
          <p class="principle-desc">{{ item.desc }}</p>
        </div>
      </div>

      <!-- Skills Header & Filter Tabs -->
      <div class="skills-wrapper">
        <div class="skills-header">
          <div>
            <h3 class="skills-main-title">Stack Tecnológica & Competências</h3>
            <p class="skills-main-subtitle">Linguagens, frameworks e ferramentas que utilizo no dia a dia</p>
          </div>

          <!-- Category Pills -->
          <div class="skill-category-pills">
            <button
              v-for="cat in categories"
              :key="cat"
              class="cat-pill"
              :class="{ active: selectedSkillCategory === cat }"
              @click="selectedSkillCategory = cat"
            >
              {{ cat }}
            </button>
          </div>
        </div>

        <!-- Skills Grid -->
        <transition-group name="list" tag="div" class="skills-grid">
          <div
            v-for="skill in filteredSkills"
            :key="skill.name"
            class="skill-card glass-card"
          >
            <div class="skill-top">
              <div class="skill-name-group">
                <span class="skill-color-dot" :style="{ backgroundColor: skill.color }"></span>
                <span class="skill-name">{{ skill.name }}</span>
              </div>
              <span class="skill-percentage">{{ skill.level }}%</span>
            </div>

            <p class="skill-description">{{ skill.description }}</p>

            <div class="skill-progress-track">
              <div
                class="skill-progress-bar"
                :style="{ width: skill.level + '%', backgroundColor: skill.color }"
              ></div>
            </div>
          </div>
        </transition-group>
      </div>
    </div>
  </section>
</template>

<style scoped>
.about-section {
  position: relative;
}

.mb-5 {
  margin-bottom: 3.5rem;
}

/* Profile Showcase Box */
.profile-showcase-box {
  padding: 2.25rem;
  display: grid;
  grid-template-columns: 240px 1fr;
  gap: 2.5rem;
  align-items: center;
}

.profile-photo-wrapper {
  position: relative;
  width: 220px;
  height: 220px;
  border-radius: var(--radius-md);
  overflow: hidden;
  border: 2px solid rgba(255, 255, 255, 0.12);
  box-shadow: 0 15px 35px rgba(0, 0, 0, 0.5);
  margin: 0 auto;
}

.developer-large-photo {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.developer-large-fallback {
  width: 100%;
  height: 100%;
  background: linear-gradient(135deg, #1e1b4b 0%, #312e81 50%, #4338ca 100%);
  display: flex;
  align-items: center;
  justify-content: center;
}

.large-initials {
  font-size: 3.5rem;
  font-weight: 900;
  color: #fff;
}

.photo-glow-effect {
  position: absolute;
  inset: 0;
  border-radius: var(--radius-md);
  box-shadow: inset 0 0 20px rgba(99, 102, 241, 0.3);
  pointer-events: none;
}

.dev-title-pill {
  font-size: 0.8rem;
  font-weight: 700;
  text-transform: uppercase;
  color: var(--primary-light);
  letter-spacing: 1px;
}

.dev-name {
  font-size: 2rem;
  font-weight: 800;
  letter-spacing: -0.5px;
  margin: 0.2rem 0;
}

.dev-location {
  color: var(--text-dim);
  font-size: 0.9rem;
  font-weight: 500;
  margin-bottom: 1rem;
}

.dev-bio-text {
  color: var(--text-muted);
  font-size: 1.05rem;
  line-height: 1.65;
  margin-bottom: 1.5rem;
}

.bio-highlights-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1rem;
  padding-top: 1rem;
  border-top: 1px solid rgba(255, 255, 255, 0.08);
}

.bio-detail-item {
  display: flex;
  flex-direction: column;
}

.detail-label {
  font-size: 0.78rem;
  color: var(--text-dim);
  font-weight: 600;
  text-transform: uppercase;
}

.detail-val {
  font-size: 0.92rem;
  color: var(--text-main);
  font-weight: 600;
}

.principles-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  gap: 1.5rem;
  margin-bottom: 4rem;
}

.principle-card {
  padding: 1.75rem;
  display: flex;
  flex-direction: column;
  gap: 0.85rem;
}

.principle-icon {
  font-size: 2.2rem;
  margin-bottom: 0.25rem;
}

.principle-title {
  font-size: 1.15rem;
  font-weight: 700;
}

.principle-desc {
  color: var(--text-muted);
  font-size: 0.92rem;
  line-height: 1.6;
}

/* Skills Section */
.skills-wrapper {
  margin-top: 2rem;
}

.skills-header {
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 1.5rem;
  margin-bottom: 2.5rem;
}

.skills-main-title {
  font-size: 1.75rem;
  font-weight: 800;
  letter-spacing: -0.5px;
}

.skills-main-subtitle {
  color: var(--text-muted);
  font-size: 0.95rem;
  margin-top: 0.25rem;
}

.skill-category-pills {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  flex-wrap: wrap;
  background: rgba(255, 255, 255, 0.03);
  padding: 0.3rem;
  border-radius: var(--radius-full);
  border: 1px solid rgba(255, 255, 255, 0.08);
}

.cat-pill {
  background: none;
  border: none;
  padding: 0.4rem 1rem;
  font-size: 0.85rem;
  font-weight: 600;
  color: var(--text-muted);
  border-radius: var(--radius-full);
  cursor: pointer;
  transition: var(--transition-fast);
}

.cat-pill:hover {
  color: var(--text-main);
}

.cat-pill.active {
  background: var(--primary);
  color: #ffffff;
  box-shadow: 0 4px 15px rgba(99, 102, 241, 0.4);
}

.skills-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(270px, 1fr));
  gap: 1.25rem;
}

.skill-card {
  padding: 1.25rem 1.5rem;
}

.skill-top {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 0.5rem;
}

.skill-name-group {
  display: flex;
  align-items: center;
  gap: 0.6rem;
}

.skill-color-dot {
  width: 10px;
  height: 10px;
  border-radius: 50%;
}

.skill-name {
  font-weight: 700;
  font-size: 1.05rem;
}

.skill-percentage {
  font-family: var(--font-code);
  font-size: 0.85rem;
  color: var(--text-dim);
  font-weight: 600;
}

.skill-description {
  color: var(--text-muted);
  font-size: 0.84rem;
  margin-bottom: 1rem;
  line-height: 1.4;
  min-height: 2.4em;
}

.skill-progress-track {
  width: 100%;
  height: 6px;
  background: rgba(255, 255, 255, 0.08);
  border-radius: var(--radius-full);
  overflow: hidden;
}

.skill-progress-bar {
  height: 100%;
  border-radius: var(--radius-full);
  transition: width 0.8s ease-out;
}

@media (max-width: 850px) {
  .profile-showcase-box {
    grid-template-columns: 1fr;
    text-align: center;
  }
  .profile-photo-wrapper {
    width: 180px;
    height: 180px;
  }
}

@media (max-width: 768px) {
  .skills-header {
    flex-direction: column;
    align-items: flex-start;
  }
}
</style>