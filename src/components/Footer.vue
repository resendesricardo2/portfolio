<script setup>
import { developerInfo } from '../data/portfolioData';

const scrollToTop = () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
};
</script>

<template>
  <footer class="footer">
    <div class="container footer-container">
      <div class="footer-top">
        <!-- Logo & Bio -->
        <div class="footer-brand">
          <a href="#hero" class="logo">
            <span class="logo-box">RM</span>
            <span class="logo-text">Ricardo<span class="logo-dot">.dev</span></span>
          </a>
          <p class="footer-tagline">
            Construindo experiências web modernas e aplicações fullstack de alta qualidade com Vue 3 & Python.
          </p>
        </div>

        <!-- Quick Links -->
        <div class="footer-links-group">
          <h4 class="footer-heading">Navegação</h4>
          <a href="#hero">Início</a>
          <a href="#about">Sobre & Stacks</a>
          <a href="#projects">Projetos</a>
          <a href="#experience">Experiência</a>
          <a href="#contact">Contacto</a>
        </div>

        <!-- Social Links -->
        <div class="footer-links-group">
          <h4 class="footer-heading">Redes & Código</h4>
          <a :href="developerInfo.github" target="_blank" rel="noopener noreferrer">GitHub</a>
          <a :href="developerInfo.linkedin" target="_blank" rel="noopener noreferrer">LinkedIn</a>
        </div>
      </div>

      <div class="footer-bottom">
        <p class="copyright">
          © {{ new Date().getFullYear() }} {{ developerInfo.name }}. Todos os direitos reservados<span class="vue-heart">💚</span>.
        </p>

        <button @click="scrollToTop" class="back-to-top" title="Voltar ao Topo">
          <span>Voltar ao Topo</span>
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="19" x2="12" y2="5"></line><polyline points="5 12 12 5 19 12"></polyline></svg>
        </button>
      </div>
    </div>
  </footer>
</template>

<style scoped>
.footer {
  border-top: 1px solid var(--footer-border, rgba(255, 255, 255, 0.08));
  background: var(--footer-bg, rgba(4, 7, 13, 0.95));
  padding: 4rem 0 2rem 0;
  position: relative;
  transition: background 0.3s ease, border-color 0.3s ease;
}

:global(html.light-mode) .footer {
  --footer-bg: #f1f5f9;
  --footer-border: rgba(0, 0, 0, 0.08);
}

.footer-top {
  display: grid;
  grid-template-columns: 2fr 1fr 1fr;
  gap: 3.5rem;
  margin-bottom: 3.5rem;
}

.logo {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  text-decoration: none;
  color: var(--text-main, #f8fafc);
  font-weight: 700;
  margin-bottom: 1rem;
}

.logo-box {
  width: 36px;
  height: 36px;
  border-radius: 10px;
  background: linear-gradient(135deg, var(--primary, #6366f1) 0%, var(--secondary, #a855f7) 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.9rem;
  font-weight: 800;
  color: #fff;
}

.logo-text {
  font-size: 1.2rem;
  color: var(--text-main, #f8fafc);
}

.logo-dot {
  color: var(--primary-light, #818cf8);
}

.footer-tagline {
  color: var(--text-muted, #94a3b8);
  font-size: 0.92rem;
  line-height: 1.6;
  max-width: 400px;
}

.footer-heading {
  font-size: 1rem;
  font-weight: 700;
  color: var(--text-main, #ffffff);
  margin-bottom: 1.2rem;
}

.footer-links-group {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.footer-links-group a {
  color: var(--text-muted, #94a3b8);
  text-decoration: none;
  font-size: 0.9rem;
  transition: var(--transition-fast, all 0.2s ease);
}

.footer-links-group a:hover {
  color: var(--primary, #6366f1);
}

.footer-bottom {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-top: 2rem;
  border-top: 1px solid var(--footer-border, rgba(255, 255, 255, 0.05));
  flex-wrap: wrap;
  gap: 1rem;
}

.copyright {
  color: var(--text-muted, #64748b);
  font-size: 0.88rem;
}

.vue-heart {
  color: #42b883;
  font-weight: 600;
}

.back-to-top {
  background: var(--btn-top-bg, rgba(255, 255, 255, 0.04));
  border: 1px solid var(--footer-border, rgba(255, 255, 255, 0.1));
  color: var(--text-muted, #94a3b8);
  padding: 0.5rem 1rem;
  border-radius: var(--radius-full, 9999px);
  font-size: 0.85rem;
  font-weight: 600;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  transition: var(--transition-fast, all 0.2s ease);
}

:global(html.light-mode) .back-to-top {
  --btn-top-bg: rgba(0, 0, 0, 0.04);
}

.back-to-top:hover {
  background: rgba(99, 102, 241, 0.15);
  color: var(--primary, #6366f1);
  border-color: var(--primary, #6366f1);
  transform: translateY(-3px);
}

@media (max-width: 768px) {
  .footer-top {
    grid-template-columns: 1fr;
    gap: 2rem;
  }
}
</style>