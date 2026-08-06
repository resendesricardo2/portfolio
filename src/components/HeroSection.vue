<script setup>
import { ref, onMounted, onUnmounted } from 'vue';
import { developerInfo } from '../data/portfolioData';
import avatarImage from '../assets/styles/images/1772056228371.png';

const roles = [
  "Junior Fullstack Developer",
  "Especialista Vue 3 & Python",
  "Apaixonado por UI/UX Moderno"
];

const currentRole = ref(roles[0]);
const roleIndex = ref(0);
const copiedEmail = ref(false);
const imageFailed = ref(false);

let intervalId = null;

onMounted(() => {
  intervalId = setInterval(() => {
    roleIndex.value = (roleIndex.value + 1) % roles.length;
    currentRole.value = roles[roleIndex.value];
  }, 3000);
});

onUnmounted(() => {
  if (intervalId) clearInterval(intervalId);
});

const copyEmailToClipboard = () => {
  if (navigator && navigator.clipboard) {
    navigator.clipboard.writeText(developerInfo.email);
    copiedEmail.value = true;
    setTimeout(() => {
      copiedEmail.value = false;
    }, 2500);
  }
};

const handleImageError = () => {
  imageFailed.value = true;
};
</script>

<template>
  <section id="hero" class="hero-section">
    <div class="container hero-container">
      <!-- Left Column: Profile Avatar & Content -->
      <div class="hero-content">
        <!-- Availability Pill -->
        <div class="availability-pill">
          <span class="status-dot online"></span>
          <span>{{ developerInfo.availability }}</span>
        </div>

        <!-- Profile Avatar Header -->
        <div class="profile-avatar-header">
          <div class="avatar-frame-glow">
            <!-- 2. Utilizar a variável avatarImage importada em vez de developerInfo.avatar -->
            <img
              v-if="!imageFailed"
              :src="avatarImage"
              :alt="developerInfo.name"
              class="avatar-photo"
              @error="handleImageError"
            />
            <!-- Fallback Avatar Badge with Initials if photo is missing -->
            <div v-else class="avatar-fallback">
              <span class="avatar-initials">RM</span>
            </div>
            <span class="avatar-status-badge" title="Disponível para contratação"></span>
          </div>

          <div class="profile-header-text">
            <span class="developer-tag">&lt;Developer /&gt;</span>
            <h2 class="profile-name-sub">{{ developerInfo.name }}</h2>
          </div>
        </div>

        <h1 class="hero-title">
          Olá, sou o <br />
          <span class="gradient-text">{{ developerInfo.name }}</span>
        </h1>

        <div class="role-wrapper">
          <span class="role-label">&lt;</span>
          <span class="role-text">{{ currentRole }}</span>
          <span class="role-label">/&gt;</span>
        </div>

        <p class="hero-description">
          {{ developerInfo.about }}
        </p>

        <!-- CTA Buttons -->
        <div class="hero-cta">
          <a href="#projects" class="btn btn-primary">
            <span>Ver Projetos</span>
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
          </a>
          <button @click="copyEmailToClipboard" class="btn btn-secondary" aria-label="Copiar Email">
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg>
            <span>{{ copiedEmail ? 'Copiado! ✓' : 'Copiar Email' }}</span>
          </button>
        </div>

        <!-- Social Quick Links -->
        <div class="hero-socials">
          <a :href="developerInfo.github" target="_blank" rel="noopener noreferrer" class="social-icon-btn" title="GitHub">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path></svg>
          </a>
          <a :href="developerInfo.linkedin" target="_blank" rel="noopener noreferrer" class="social-icon-btn" title="LinkedIn">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg>
          </a>
          <span class="email-text">{{ developerInfo.email }}</span>
        </div>
      </div>

      <!-- Right Column: Interactive Visual Card -->
      <div class="hero-visual">
        <div class="visual-card-wrapper glass-card">
          <div class="card-header">
            <div class="window-dots">
              <span class="dot red"></span>
              <span class="dot yellow"></span>
              <span class="dot green"></span>
            </div>
            <div class="card-title">developer.config.js</div>
          </div>

          <div class="code-body">
            <pre><code><span class="code-keyword">const</span> <span class="code-var">developer</span> = {
  <span class="code-prop">name</span>: <span class="code-string">'{{ developerInfo.name }}'</span>,
  <span class="code-prop">role</span>: <span class="code-string">'Fullstack Developer'</span>,
  <span class="code-prop">frontend</span>: [<span class="code-string">'Vue 3'</span>],
  <span class="code-prop">backend</span>: [<span class="code-string">'Python'</span>, <span class="code-string">'PostgreSQL'</span>],
  <span class="code-prop">status</span>: <span class="code-string">'Ready to Code 🚀'</span>
};</code></pre>
          </div>

          <div class="floating-tech-badge badge-top-left">
            <span class="tech-icon vue">💚</span>
            <span>Vue 3 SPA</span>
          </div>
          <div class="floating-tech-badge badge-bottom-right">
            <span class="tech-icon node">⚡</span>
            <span>Node & Express</span>
          </div>
        </div>
      </div>
    </div>

    <!-- Stats Bar Bottom -->
    <div class="container hero-stats-container">
      <div class="stats-bar glass-card">
        <div v-for="(stat, idx) in developerInfo.stats" :key="idx" class="stat-item">
          <span class="stat-value gradient-text-cyan">{{ stat.value }}</span>
          <span class="stat-label">{{ stat.label }}</span>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
/* O teu CSS original mantém-se exatamente igual */
.hero-section {
  padding-top: 8.5rem;
  padding-bottom: 4rem;
  position: relative;
  overflow: hidden;
}

.hero-container {
  display: grid;
  grid-template-columns: 1.1fr 0.9fr;
  gap: 3.5rem;
  align-items: center;
}

.availability-pill {
  display: inline-flex;
  align-items: center;
  gap: 0.6rem;
  padding: 0.4rem 1.1rem;
  border-radius: var(--radius-full);
  background: rgba(16, 185, 129, 0.08);
  border: 1px solid rgba(16, 185, 129, 0.25);
  color: var(--emerald);
  font-size: 0.85rem;
  font-weight: 600;
  margin-bottom: 1.25rem;
}

.profile-avatar-header {
  display: flex;
  align-items: center;
  gap: 1.25rem;
  margin-bottom: 1.25rem;
}

.avatar-frame-glow {
  position: relative;
  width: 76px;
  height: 76px;
  border-radius: 50%;
  padding: 3px;
  background: linear-gradient(135deg, var(--primary) 0%, var(--secondary) 50%, var(--cyan) 100%);
  box-shadow: 0 0 25px rgba(99, 102, 241, 0.4);
  flex-shrink: 0;
}

.avatar-photo {
  width: 100%;
  height: 100%;
  border-radius: 50%;
  object-fit: cover;
  background: #0f172a;
}

.avatar-fallback {
  width: 100%;
  height: 100%;
  border-radius: 50%;
  background: linear-gradient(135deg, #1e1b4b 0%, #312e81 100%);
  display: flex;
  align-items: center;
  justify-content: center;
}

.avatar-initials {
  font-size: 1.6rem;
  font-weight: 800;
  color: #ffffff;
  letter-spacing: 1px;
}

.avatar-status-badge {
  position: absolute;
  bottom: 2px;
  right: 2px;
  width: 14px;
  height: 14px;
  border-radius: 50%;
  background-color: var(--emerald);
  border: 2.5px solid var(--bg-dark);
  box-shadow: 0 0 10px var(--emerald);
}

.profile-header-text {
  display: flex;
  flex-direction: column;
}

.developer-tag {
  font-family: var(--font-code);
  font-size: 0.8rem;
  color: var(--primary-light);
  font-weight: 600;
}

.profile-name-sub {
  font-size: 1.25rem;
  font-weight: 800;
  color: var(--text-main);
  letter-spacing: -0.3px;
}

.hero-title {
  font-size: 3.5rem;
  font-weight: 900;
  line-height: 1.1;
  letter-spacing: -1.5px;
  margin-bottom: 1rem;
}

.role-wrapper {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  font-family: var(--font-code);
  font-size: 1.25rem;
  font-weight: 600;
  color: var(--primary-light);
  background: rgba(99, 102, 241, 0.08);
  padding: 0.4rem 1rem;
  border-radius: var(--radius-sm);
  border: 1px dashed rgba(99, 102, 241, 0.3);
  margin-bottom: 1.5rem;
}

.role-text {
  color: var(--text-main);
  animation: fadeIn 0.4s ease-in-out;
}

.hero-description {
  color: var(--text-muted);
  font-size: 1.15rem;
  line-height: 1.7;
  margin-bottom: 2.2rem;
  max-width: 580px;
  word-wrap: break-word;
}

.hero-cta {
  display: flex;
  align-items: center;
  gap: 1.25rem;
  margin-bottom: 2.5rem;
  flex-wrap: wrap;
}

.hero-socials {
  display: flex;
  align-items: center;
  gap: 1rem;
  flex-wrap: wrap;
}

.social-icon-btn {
  width: 42px;
  height: 42px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.04);
  border: 1px solid rgba(255, 255, 255, 0.1);
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--text-muted);
  text-decoration: none;
  transition: var(--transition-fast);
}

.social-icon-btn:hover {
  background: rgba(99, 102, 241, 0.2);
  color: #fff;
  border-color: var(--primary);
  transform: translateY(-2px);
}

.email-text {
  color: var(--text-dim);
  font-size: 0.88rem;
  font-family: var(--font-code);
  margin-left: 0.5rem;
  word-break: break-all;
}

.visual-card-wrapper {
  position: relative;
  padding: 0;
  overflow: hidden;
  background: rgba(13, 18, 30, 0.85);
  border: 1px solid rgba(255, 255, 255, 0.1);
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.7);
  max-width: 100%;
}

.card-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.85rem 1.25rem;
  background: rgba(255, 255, 255, 0.03);
  border-bottom: 1px solid rgba(255, 255, 255, 0.06);
}

.window-dots {
  display: flex;
  gap: 8px;
}

.dot {
  width: 11px;
  height: 11px;
  border-radius: 50%;
}
.dot.red { background: #ef4444; }
.dot.yellow { background: #f59e0b; }
.dot.green { background: #10b981; }

.card-title {
  font-family: var(--font-code);
  font-size: 0.82rem;
  color: var(--text-dim);
}

.code-body {
  padding: 1.5rem;
  font-family: var(--font-code);
  font-size: 0.92rem;
  line-height: 1.7;
  overflow-x: auto;
}

.code-keyword { color: #c084fc; }
.code-var { color: #38bdf8; }
.code-prop { color: #818cf8; }
.code-string { color: #34d399; }

.floating-tech-badge {
  position: absolute;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  background: rgba(17, 24, 39, 0.9);
  border: 1px solid rgba(255, 255, 255, 0.15);
  border-radius: var(--radius-full);
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.5);
  font-size: 0.85rem;
  font-weight: 600;
  backdrop-filter: blur(10px);
}

.badge-top-left {
  top: -15px;
  left: -20px;
  animation: floatAnim 4s ease-in-out infinite alternate;
}

.badge-bottom-right {
  bottom: -15px;
  right: -20px;
  animation: floatAnim 4s ease-in-out infinite alternate-reverse;
}

@keyframes floatAnim {
  0% { transform: translateY(0px); }
  100% { transform: translateY(-10px); }
}

.hero-stats-container {
  margin-top: 4rem;
}

.stats-bar {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1.5rem;
  padding: 1.75rem 2rem;
  text-align: center;
}

.stat-value {
  display: block;
  font-size: 2.2rem;
  font-weight: 800;
  letter-spacing: -1px;
}

.stat-label {
  color: var(--text-muted);
  font-size: 0.88rem;
  font-weight: 500;
}

@media (max-width: 992px) {
  .hero-container {
    grid-template-columns: 1fr;
    gap: 2.5rem;
  }
  .hero-title {
    font-size: 2.75rem;
  }
  .hero-stats-container {
    margin-top: 2.5rem;
  }
  .stats-bar {
    grid-template-columns: repeat(2, 1fr);
    gap: 1.25rem;
  }
}

@media (max-width: 600px) {
  .hero-section {
    padding-top: 7rem;
  }
  .hero-title {
    font-size: 2.1rem;
  }
  .role-wrapper {
    font-size: 1rem;
    padding: 0.35rem 0.75rem;
  }
  .hero-cta {
    flex-direction: column;
    align-items: stretch;
  }
  .badge-top-left, .badge-bottom-right {
    display: none;
  }
  .stats-bar {
    grid-template-columns: repeat(2, 1fr);
    padding: 1.25rem;
  }
  .email-text {
    width: 100%;
    margin-left: 0;
    margin-top: 0.5rem;
  }
}
</style>