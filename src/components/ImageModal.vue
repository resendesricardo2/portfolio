<script setup>
import { ref, watch, onMounted, onUnmounted } from 'vue';

const props = defineProps({
  isOpen: {
    type: Boolean,
    default: false
  },
  project: {
    type: Object,
    default: () => null
  }
});

const emit = defineEmits(['close']);

const currentIndex = ref(0);
const isZoomed = ref(false);
const imageError = ref(false);

// Reseta estados quando o modal abre/fecha ou altera a imagem selecionada
watch([() => props.isOpen, currentIndex], ([newIsOpen]) => {
  imageError.value = false;
  if (newIsOpen) {
    document.body.style.overflow = 'hidden';
  } else {
    currentIndex.value = 0;
    isZoomed.value = false;
    document.body.style.overflow = '';
  }
});

const nextPhoto = () => {
  if (!props.project || !props.project.photos) return;
  currentIndex.value = (currentIndex.value + 1) % props.project.photos.length;
};

const prevPhoto = () => {
  if (!props.project || !props.project.photos) return;
  currentIndex.value = (currentIndex.value - 1 + props.project.photos.length) % props.project.photos.length;
};

const setPhotoIndex = (idx) => {
  currentIndex.value = idx;
};

const toggleZoom = () => {
  isZoomed.value = !isZoomed.value;
};

const closeModal = () => {
  emit('close');
};

const handleKeyDown = (e) => {
  if (!props.isOpen) return;
  if (e.key === 'Escape') closeModal();
  if (e.key === 'ArrowRight') nextPhoto();
  if (e.key === 'ArrowLeft') prevPhoto();
};

const handleImageError = () => {
  imageError.value = true;
};

onMounted(() => {
  window.addEventListener('keydown', handleKeyDown);
});

onUnmounted(() => {
  window.removeEventListener('keydown', handleKeyDown);
});
</script>

<template>
  <transition name="fade">
    <div v-if="isOpen && project" class="modal-backdrop" @click.self="closeModal">
      <div class="modal-container glass-card" :class="{ zoomed: isZoomed }">
        <!-- Modal Header -->
        <div class="modal-header">
          <div class="modal-title-group">
            <span class="modal-badge">📷 Galeria de Capturas de Ecrã</span>
            <h3 class="modal-project-title">{{ project.title }}</h3>
          </div>
          <div class="modal-controls">
            <button @click="toggleZoom" class="control-btn" :title="isZoomed ? 'Reduzir' : 'Ampliar'">
              <svg v-if="!isZoomed" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="15 3 21 3 21 9"></polyline><polyline points="9 21 3 21 3 15"></polyline><line x1="21" y1="3" x2="14" y2="10"></line><line x1="3" y1="21" x2="10" y2="14"></line></svg>
              <svg v-else xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="4 14 10 14 10 20"></polyline><polyline points="20 10 14 10 14 4"></polyline><line x1="14" y1="10" x2="21" y2="3"></line><line x1="10" y1="14" x2="3" y2="21"></line></svg>
            </button>
            <button @click="closeModal" class="control-btn close" title="Fechar (Esc)">
              &times;
            </button>
          </div>
        </div>

        <!-- Main Display Container -->
        <div class="modal-main-display">
          <!-- Previous Arrow -->
          <button
            v-if="project.photos && project.photos.length > 1"
            @click="prevPhoto"
            class="nav-arrow prev"
            title="Foto Anterior (Seta Esquerda)"
          >
            &#10094;
          </button>

          <!-- Current Screenshot Image -->
          <div class="image-wrapper">
            <template v-if="project.photos && project.photos[currentIndex]">
              <img
                v-if="!imageError"
                :src="project.photos[currentIndex].url"
                :alt="project.photos[currentIndex].title || 'Screenshot'"
                class="main-screenshot"
                @error="handleImageError"
              />
              <div
                v-else
                class="image-fallback"
                :style="{ background: project.fallbackGradient }"
              >
                <div class="fallback-content">
                  <h4>{{ project.photos[currentIndex].title || project.title }}</h4>
                  <p>{{ project.photos[currentIndex].desc }}</p>
                </div>
              </div>
            </template>
          </div>

          <!-- Next Arrow -->
          <button
            v-if="project.photos && project.photos.length > 1"
            @click="nextPhoto"
            class="nav-arrow next"
            title="Próxima Foto (Seta Direita)"
          >
            &#10095;
          </button>
        </div>

        <!-- Screenshot Caption & Info Box -->
        <div v-if="project.photos && project.photos[currentIndex]" class="photo-info-bar">
          <div class="info-text">
            <span class="photo-counter">Foto {{ currentIndex + 1 }} de {{ project.photos.length }}</span>
            <h4 class="photo-title">{{ project.photos[currentIndex].title }}</h4>
            <p class="photo-desc">{{ project.photos[currentIndex].desc }}</p>
          </div>
        </div>

        <!-- Thumbnail Carousel Strip -->
        <div v-if="project.photos && project.photos.length > 1" class="thumbnail-strip">
          <div
            v-for="(photo, idx) in project.photos"
            :key="idx"
            class="thumb-item"
            :class="{ active: currentIndex === idx }"
            @click="setPhotoIndex(idx)"
          >
            <img :src="photo.url" :alt="photo.title" class="thumb-img" />
            <div class="thumb-number">{{ idx + 1 }}</div>
          </div>
        </div>

        <!-- Modal Footer Actions -->
        <div class="modal-footer">
          <div class="footer-tags">
            <span v-for="tag in project.tags" :key="tag" class="tag-pill">{{ tag }}</span>
          </div>
          <div class="footer-buttons">
            <a
              v-if="project.githubUrl"
              :href="project.githubUrl"
              target="_blank"
              rel="noopener"
              class="btn btn-secondary btn-sm"
            >
              <span>Ver Código GitHub</span>
            </a>
            <button @click="closeModal" class="btn btn-primary btn-sm">
              Concluído
            </button>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<style scoped>
.modal-backdrop {
  position: fixed;
  inset: 0;
  z-index: 999;
  background: rgba(4, 7, 13, 0.88);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1.5rem;
}

.modal-container {
  width: 100%;
  max-width: 950px;
  max-height: 92vh;
  display: flex;
  flex-direction: column;
  background: rgba(13, 18, 30, 0.95);
  border: 1px solid rgba(255, 255, 255, 0.15);
  box-shadow: 0 25px 60px rgba(0, 0, 0, 0.8);
  overflow: hidden;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.modal-container.zoomed {
  max-width: 1250px;
  height: 96vh;
}

/* Header */
.modal-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1.25rem 1.75rem;
  border-bottom: 1px solid rgba(255, 255, 255, 0.08);
  background: rgba(255, 255, 255, 0.02);
}

.modal-badge {
  font-size: 0.78rem;
  font-weight: 700;
  text-transform: uppercase;
  color: var(--secondary);
  letter-spacing: 1px;
}

.modal-project-title {
  font-size: 1.35rem;
  font-weight: 800;
  letter-spacing: -0.5px;
}

.modal-controls {
  display: flex;
  align-items: center;
  gap: 0.6rem;
}

.control-btn {
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  color: var(--text-main);
  width: 36px;
  height: 36px;
  border-radius: var(--radius-sm);
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: var(--transition-fast);
}

.control-btn:hover {
  background: rgba(255, 255, 255, 0.15);
}

.control-btn.close {
  font-size: 1.6rem;
  color: var(--text-muted);
}
.control-btn.close:hover {
  color: #ef4444;
  border-color: rgba(239, 68, 68, 0.4);
}

/* Main Display */
.modal-main-display {
  position: relative;
  flex-grow: 1;
  min-height: 340px;
  max-height: 520px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #07090e;
  overflow: hidden;
  padding: 1rem; /* Adiciona respiro nas bordas para nunca colar no topo/fundo */
}

.image-wrapper {
  position: relative;
  width: 100%;
  height: 100%;
  max-height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden; /* Corta qualquer overflow residual */
}

.main-screenshot {
  position: relative;
  z-index: 1;
  display: block;
  max-width: 100%;
  max-height: 100%;
  width: auto;
  height: auto;
  object-fit: contain; /* Garante que redimensiona para caber 100% visível */
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5);
  animation: fadeIn 0.3s ease;
}

.image-fallback {
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem;
  text-align: center;
  z-index: 0;
}

.fallback-content h4 {
  font-size: 1.5rem;
  font-weight: 800;
  margin-bottom: 0.5rem;
}
.fallback-content p {
  color: var(--text-muted);
  max-width: 500px;
}

/* Nav Arrows */
.nav-arrow {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  z-index: 10;
  background: rgba(17, 24, 39, 0.75);
  border: 1px solid rgba(255, 255, 255, 0.15);
  backdrop-filter: blur(8px);
  color: #fff;
  width: 44px;
  height: 44px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.2rem;
  cursor: pointer;
  transition: var(--transition-fast);
}

.nav-arrow.prev { left: 1.25rem; }
.nav-arrow.next { right: 1.25rem; }

.nav-arrow:hover {
  background: var(--primary);
  border-color: var(--primary-light);
  transform: translateY(-50%) scale(1.1);
}

/* Info Bar */
.photo-info-bar {
  padding: 1rem 1.75rem;
  background: rgba(255, 255, 255, 0.02);
  border-top: 1px solid rgba(255, 255, 255, 0.06);
}

.photo-counter {
  font-family: var(--font-code);
  font-size: 0.78rem;
  color: var(--primary-light);
  font-weight: 600;
  text-transform: uppercase;
}

.photo-title {
  font-size: 1.1rem;
  font-weight: 700;
  margin: 0.2rem 0;
}

.photo-desc {
  color: var(--text-muted);
  font-size: 0.88rem;
}

/* Thumbnail Strip */
.thumbnail-strip {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.85rem 1.75rem;
  background: rgba(7, 9, 14, 0.95);
  border-top: 1px solid rgba(255, 255, 255, 0.06);
  overflow-x: auto;
}

.thumb-item {
  position: relative;
  width: 90px;
  height: 56px;
  border-radius: var(--radius-sm);
  overflow: hidden;
  border: 2px solid transparent;
  cursor: pointer;
  opacity: 0.6;
  transition: var(--transition-fast);
  flex-shrink: 0;
}

.thumb-item:hover {
  opacity: 0.9;
}

.thumb-item.active {
  opacity: 1;
  border-color: var(--primary-light);
  box-shadow: 0 0 12px rgba(99, 102, 241, 0.5);
}

.thumb-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.thumb-number {
  position: absolute;
  bottom: 2px;
  right: 4px;
  font-family: var(--font-code);
  font-size: 0.68rem;
  background: rgba(0, 0, 0, 0.7);
  padding: 1px 4px;
  border-radius: 3px;
  color: #fff;
}

/* Modal Footer */
.modal-footer {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem 1.75rem;
  background: rgba(255, 255, 255, 0.02);
  border-top: 1px solid rgba(255, 255, 255, 0.08);
}

.footer-tags {
  display: flex;
  gap: 0.4rem;
}

.footer-buttons {
  display: flex;
  gap: 0.75rem;
}

@keyframes fadeIn {
  from { opacity: 0; transform: scale(0.98); }
  to { opacity: 1; transform: scale(1); }
}

@media (max-width: 600px) {
  .modal-backdrop {
    padding: 0.75rem;
  }
  .modal-container {
    max-height: 98vh;
  }
  .modal-header {
    padding: 0.85rem 1rem;
  }
  .modal-project-title {
    font-size: 1.1rem;
  }
  .nav-arrow {
    width: 36px;
    height: 36px;
    font-size: 1rem;
  }
  .photo-info-bar, .modal-footer {
    padding: 0.75rem 1rem;
  }
  .footer-tags {
    display: none;
  }
}
</style>