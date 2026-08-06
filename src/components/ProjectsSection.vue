<script setup>
import { ref, computed } from 'vue';
import { projectsData } from '../data/portfolioData';

const emit = defineEmits(['open-modal']);

const selectedStack = ref('Todos');
const statusFilter = ref('all'); // 'all', 'live', 'offline'
const searchQuery = ref('');

// Extract all unique stacks for filter pills
const availableStacks = computed(() => {
  const stacks = new Set();
  projectsData.forEach(p => {
    p.tags.forEach(t => stacks.add(t));
  });
  return ['Todos', 'Fullstack', 'Frontend', 'Backend', ...Array.from(stacks)];
});

// Filter logic combining Stack Pill, Status Toggle, and Search Query
const filteredProjects = computed(() => {
  return projectsData.filter(project => {
    // 1. Stack / Category Filter
    let matchesStack = false;
    if (selectedStack.value === 'Todos') {
      matchesStack = true;
    } else if (['Fullstack', 'Frontend', 'Backend'].includes(selectedStack.value)) {
      matchesStack = project.category === selectedStack.value;
    } else {
      matchesStack = project.tags.includes(selectedStack.value);
    }

    // 2. Status Filter
    let matchesStatus = true;
    if (statusFilter.value === 'live') {
      matchesStatus = project.isLive === true;
    } else if (statusFilter.value === 'offline') {
      matchesStatus = project.isLive === false;
    }

    // 3. Search Query Filter
    let matchesSearch = true;
    if (searchQuery.value.trim() !== '') {
      const q = searchQuery.value.toLowerCase();
      const matchTitle = project.title.toLowerCase().includes(q);
      const matchSub = project.subtitle.toLowerCase().includes(q);
      const matchTags = project.tags.some(t => t.toLowerCase().includes(q));
      matchesSearch = matchTitle || matchSub || matchTags;
    }

    return matchesStack && matchesStatus && matchesSearch;
  });
});

const handleOpenModal = (project) => {
  emit('open-modal', project);
};
</script>

<template>
  <section id="projects" class="section-padding projects-section">
    <div class="container">
      <!-- Section Header -->
      <div class="section-header">
        <span class="section-badge">Portfólio de Projetos</span>
        <h2 class="section-title">Trabalhos em Destaque & <span class="gradient-text">Stack de Código</span></h2>
        <p class="section-subtitle">
          Explore aplicações fullstack deployed ao vivo ou visualize capturas de ecrã (screenshots) de projetos offline.
        </p>
      </div>

      <!-- Controls Area: Stack Filters, Search & Status Toggle -->
      <div class="projects-controls glass-card">
        <!-- Search Input -->
        <div class="search-box">
          <svg class="search-icon" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
          <input
            v-model="searchQuery"
            type="text"
            placeholder="Pesquisar por nome do projeto ou stack (ex: Vue, Node, PostgreSQL)..."
            class="search-input"
          />
          <button v-if="searchQuery" @click="searchQuery = ''" class="clear-search">&times;</button>
        </div>

        <!-- Status Filter Switcher -->
        <div class="status-toggle-group">
          <button
            class="status-btn"
            :class="{ active: statusFilter === 'all' }"
            @click="statusFilter = 'all'"
          >
            Todos os Projetos
          </button>
          <button
            class="status-btn"
            :class="{ active: statusFilter === 'live' }"
            @click="statusFilter = 'live'"
          >
            <span class="status-dot online"></span> Live Demo
          </button>
          <button
            class="status-btn"
            :class="{ active: statusFilter === 'offline' }"
            @click="statusFilter = 'offline'"
          >
            <span class="status-dot offline"></span> Offline (Com Fotos 📷)
          </button>
        </div>

        <!-- Stack Filter Pills Bar -->
        <div class="stack-pills-bar">
          <button
            v-for="stack in availableStacks"
            :key="stack"
            class="stack-pill"
            :class="{ active: selectedStack === stack }"
            @click="selectedStack = stack"
          >
            {{ stack }}
          </button>
        </div>

        <!-- Results Counter Bar -->
        <div class="results-info">
          <span>A mostrar <strong>{{ filteredProjects.length }}</strong> de {{ projectsData.length }} projetos</span>
          <span v-if="selectedStack !== 'Todos'" class="active-filter-tag">Stack: {{ selectedStack }}</span>
        </div>
      </div>

      <!-- Empty State -->
      <div v-if="filteredProjects.length === 0" class="empty-state glass-card">
        <div class="empty-icon">🔍</div>
        <h3>Nenhum projeto encontrado</h3>
        <p>Tente ajustar a sua pesquisa ou alterar os filtros de stack selecionados.</p>
        <button @click="selectedStack = 'Todos'; statusFilter = 'all'; searchQuery = '';" class="btn btn-secondary mt-3">
          Limpar Filtros
        </button>
      </div>

      <!-- Projects Grid -->
      <transition-group name="list" tag="div" class="projects-grid">
        <div
          v-for="project in filteredProjects"
          :key="project.id"
          class="project-card glass-card"
        >
          <!-- Card Image Thumbnail Header -->
          <div class="card-image-container">
            <img
              :src="project.thumbnail"
              :alt="project.title"
              class="project-img"
              @error="(e) => e.target.style.display = 'none'"
            />
            <!-- Fallback Gradient if image fails or loading -->
            <div
              class="project-img-fallback"
              :style="{ background: project.fallbackGradient }"
            >
              <span class="fallback-title">{{ project.title }}</span>
            </div>

            <!-- Status Badge Overlay -->
            <div class="card-badge-overlay">
              <span v-if="project.isLive" class="badge-live">
                <span class="status-dot online"></span> Live Demo
              </span>
              <span v-else class="badge-offline" @click="handleOpenModal(project)">
                <span class="camera-icon">📷</span> Offline ({{ project.photos.length }} Fotos)
              </span>
            </div>
          </div>

          <!-- Card Content -->
          <div class="card-body">
            <div class="card-category-pill">{{ project.category }}</div>
            <h3 class="card-title">{{ project.title }}</h3>
            <p class="card-subtitle">{{ project.subtitle }}</p>
            <p class="card-desc">{{ project.description }}</p>

            <!-- Features Checklist -->
            <ul class="card-features">
              <li v-for="(feat, fIdx) in project.features.slice(0, 5)" :key="fIdx">
                <span class="check-icon">✓</span> {{ feat }}
              </li>
            </ul>

            <!-- Tags Stack Pills -->
            <div class="card-tags">
              <span
                v-for="tag in project.tags"
                :key="tag"
                class="tag-pill"
                :class="{ highlighted: selectedStack === tag }"
              >
                {{ tag }}
              </span>
            </div>

            <!-- Card Actions Footer -->
            <div class="card-actions">
              <!-- Live Demo button if online -->
              <a
                v-if="project.isLive && project.liveUrl"
                :href="project.liveUrl"
                target="_blank"
                rel="noopener noreferrer"
                class="btn btn-primary btn-sm flex-1"
              >
                <span>Live Demo</span>
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path><polyline points="15 3 21 3 21 9"></polyline><line x1="10" y1="14" x2="21" y2="3"></line></svg>
              </a>

              <!-- Photo Gallery Trigger for Offline/Photo Projects -->
              <button
                v-if="project.photos && project.photos.length > 0"
                @click="handleOpenModal(project)"
                class="btn btn-secondary btn-sm flex-1 photo-gallery-btn"
                :class="{ 'pulse-border': !project.isLive }"
              >
                <span>📷 Ver Screenshots ({{ project.photos.length }})</span>
              </button>

              <!-- GitHub Repo Link -->
              <a
                v-if="project.githubUrl"
                :href="project.githubUrl"
                target="_blank"
                rel="noopener noreferrer"
                class="btn btn-secondary btn-sm icon-only"
                title="Ver Código no GitHub"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path></svg>
              </a>
            </div>
          </div>
        </div>
      </transition-group>
    </div>
  </section>
</template>

<style scoped>
.projects-section {
  position: relative;
}

.projects-controls {
  padding: 1.75rem;
  margin-bottom: 3.5rem;
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
}

/* Search Box */
.search-box {
  position: relative;
  width: 100%;
}

.search-icon {
  position: absolute;
  left: 1.1rem;
  top: 50%;
  transform: translateY(-50%);
  color: var(--text-dim);
}

.search-input {
  width: 100%;
  padding: 0.85rem 2.8rem 0.85rem 2.8rem;
  background: rgba(255, 255, 255, 0.04);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: var(--radius-md);
  color: var(--text-main);
  font-family: var(--font-main);
  font-size: 0.95rem;
  outline: none;
  transition: var(--transition-fast);
}

.search-input:focus {
  border-color: var(--primary);
  background: rgba(255, 255, 255, 0.07);
  box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.25);
}

.clear-search {
  position: absolute;
  right: 1rem;
  top: 50%;
  transform: translateY(-50%);
  background: none;
  border: none;
  color: var(--text-dim);
  font-size: 1.3rem;
  cursor: pointer;
}

/* Status Toggle */
.status-toggle-group {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  flex-wrap: wrap;
}

.status-btn {
  background: rgba(255, 255, 255, 0.04);
  border: 1px solid rgba(255, 255, 255, 0.08);
  padding: 0.45rem 1rem;
  border-radius: var(--radius-full);
  color: var(--text-muted);
  font-size: 0.85rem;
  font-weight: 500;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  transition: var(--transition-fast);
}

.status-btn:hover {
  background: rgba(255, 255, 255, 0.08);
  color: var(--text-main);
}

.status-btn.active {
  background: rgba(99, 102, 241, 0.2);
  border-color: var(--primary-light);
  color: #ffffff;
}

/* Stack Pills Bar */
.stack-pills-bar {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  flex-wrap: wrap;
}

.stack-pill {
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.06);
  padding: 0.4rem 0.95rem;
  border-radius: var(--radius-sm);
  color: var(--text-muted);
  font-size: 0.85rem;
  font-weight: 500;
  cursor: pointer;
  transition: var(--transition-fast);
}

.stack-pill:hover {
  background: rgba(255, 255, 255, 0.08);
  color: var(--text-main);
}

.stack-pill.active {
  background: linear-gradient(135deg, var(--primary) 0%, var(--secondary) 100%);
  color: #ffffff;
  border-color: transparent;
  box-shadow: 0 4px 12px rgba(99, 102, 241, 0.35);
}

.results-info {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-top: 0.5rem;
  border-top: 1px solid rgba(255, 255, 255, 0.05);
  font-size: 0.85rem;
  color: var(--text-dim);
}

.active-filter-tag {
  color: var(--primary-light);
  font-weight: 600;
}

/* Empty State */
.empty-state {
  text-align: center;
  padding: 4rem 2rem;
}
.empty-icon {
  font-size: 3rem;
  margin-bottom: 1rem;
}

/* Projects Grid */
.projects-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
  gap: 2rem;
}

.project-card {
  display: flex;
  flex-direction: column;
  overflow: hidden;
  height: 100%;
}

.card-image-container {
  position: relative;
  height: 200px;
  width: 100%;
  overflow: hidden;
  background: #0d121e;
}

/* O fundo roxo/fallback fica ATRÁS (z-index: 1) */
.project-img-fallback {
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1.5rem;
  text-align: center;
  z-index: 1; 
}


.project-img {
  position: relative;
  z-index: 2; 
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.5s ease;
}

.project-card:hover .project-img {
  transform: scale(1.06);
}

.project-img-fallback {
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1.5rem;
  text-align: center;
  z-index: 1;
}

.fallback-title {
  font-size: 1.25rem;
  font-weight: 800;
  color: rgba(255, 255, 255, 0.9);
  letter-spacing: -0.5px;
}

.card-badge-overlay {
  position: absolute;
  top: 12px;
  right: 12px;
  z-index: 2;
}

.badge-live {
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  padding: 0.35rem 0.8rem;
  background: rgba(16, 185, 129, 0.85);
  backdrop-filter: blur(8px);
  border-radius: var(--radius-full);
  color: #fff;
  font-size: 0.78rem;
  font-weight: 700;
  box-shadow: 0 4px 12px rgba(16, 185, 129, 0.3);
}

.badge-offline {
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  padding: 0.35rem 0.8rem;
  background: rgba(245, 158, 11, 0.88);
  backdrop-filter: blur(8px);
  border-radius: var(--radius-full);
  color: #000;
  font-size: 0.78rem;
  font-weight: 700;
  cursor: pointer;
  box-shadow: 0 4px 12px rgba(245, 158, 11, 0.35);
  transition: var(--transition-fast);
}

.badge-offline:hover {
  transform: scale(1.05);
}

/* Card Body */
.card-body {
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  flex-grow: 1;
}

.card-category-pill {
  display: inline-block;
  font-size: 0.75rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 1px;
  color: var(--primary-light);
  margin-bottom: 0.4rem;
}

.card-title {
  font-size: 1.35rem;
  font-weight: 800;
  letter-spacing: -0.3px;
  margin-bottom: 0.25rem;
}

.card-subtitle {
  color: var(--text-muted);
  font-size: 0.88rem;
  margin-bottom: 0.85rem;
  font-weight: 500;
}

.card-desc {
  color: var(--text-muted);
  font-size: 0.9rem;
  line-height: 1.55;
  margin-bottom: 1rem;
}

.card-features {
  list-style: none;
  margin-bottom: 1.25rem;
  display: flex;
  flex-direction: column;
  gap: 0.35rem;
}

.card-features li {
  font-size: 0.84rem;
  color: var(--text-main);
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.check-icon {
  color: var(--emerald);
  font-weight: bold;
}

.card-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.4rem;
  margin-bottom: 1.5rem;
  margin-top: auto;
}

.tag-pill {
  font-family: var(--font-code);
  font-size: 0.75rem;
  padding: 0.2rem 0.6rem;
  border-radius: var(--radius-sm);
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.08);
  color: var(--text-muted);
}

.tag-pill.highlighted {
  background: rgba(99, 102, 241, 0.25);
  border-color: var(--primary-light);
  color: #fff;
}

.card-actions {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  margin-top: auto;
  padding-top: 1rem;
  border-top: 1px solid rgba(255, 255, 255, 0.06);
}

.flex-1 {
  flex: 1;
}

.icon-only {
  padding: 0.5rem 0.75rem;
}

.photo-gallery-btn {
  background: rgba(168, 85, 247, 0.15);
  border-color: rgba(168, 85, 247, 0.3);
  color: #e9d5ff;
}

.photo-gallery-btn:hover {
  background: rgba(168, 85, 247, 0.3);
  border-color: rgba(168, 85, 247, 0.6);
}

.pulse-border {
  animation: pulseGlow 2s infinite;
}

@keyframes pulseGlow {
  0% { box-shadow: 0 0 0 0 rgba(168, 85, 247, 0.4); }
  70% { box-shadow: 0 0 0 8px rgba(168, 85, 247, 0); }
  100% { box-shadow: 0 0 0 0 rgba(168, 85, 247, 0); }
}

@media (max-width: 768px) {
  .projects-grid {
    grid-template-columns: 1fr;
  }
}
</style>
