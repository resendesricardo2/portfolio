<script setup>
import { ref, onMounted, onUnmounted } from 'vue';

const isScrolled = ref(false);
const isMobileMenuOpen = ref(false);
const activeSection = ref('hero');
const isDarkMode = ref(true);

const navLinks = [
  { name: 'Início', href: '#hero' },
  { name: 'Sobre & Stacks', href: '#about' },
  { name: 'Projetos', href: '#projects' },
  { name: 'Experiência', href: '#experience' },
  { name: 'Contacto', href: '#contact' }
];

const toggleTheme = () => {
  isDarkMode.value = !isDarkMode.value;
  
  if (isDarkMode.value) {
    document.documentElement.classList.remove('light-mode');
  } else {
    document.documentElement.classList.add('light-mode');
  }
};

const handleScroll = () => {
  isScrolled.value = window.scrollY > 20;

  const sections = ['hero', 'about', 'projects', 'experience', 'contact'];
  const scrollPosition = window.scrollY + 200;

  for (const sectionId of sections) {
    const el = document.getElementById(sectionId);
    if (el) {
      const top = el.offsetTop;
      const height = el.offsetHeight;
      if (scrollPosition >= top && scrollPosition < top + height) {
        activeSection.value = sectionId;
        break;
      }
    }
  }
};

const toggleMobileMenu = () => {
  isMobileMenuOpen.value = !isMobileMenuOpen.value;
  if (isMobileMenuOpen.value) {
    document.body.style.overflow = 'hidden';
  } else {
    document.body.style.overflow = '';
  }
};

const closeMobileMenu = () => {
  isMobileMenuOpen.value = false;
  document.body.style.overflow = '';
};

onMounted(() => {
  window.addEventListener('scroll', handleScroll);
});

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll);
});
</script>

<template>
  <header
    class="navbar"
    :class="{ 'navbar-scrolled': isScrolled }"
  >
    <div class="container navbar-container">
      <!-- Logo -->
      <a href="#hero" class="logo" @click="closeMobileMenu">
        <span class="logo-box">RM</span>
        <span class="logo-text">Ricardo<span class="logo-dot">.dev</span></span>
      </a>

      <!-- Desktop Links -->
      <nav class="nav-links desktop-only">
        <a
          v-for="link in navLinks"
          :key="link.href"
          :href="link.href"
          class="nav-link"
          :class="{ active: activeSection === link.href.substring(1) }"
        >
          {{ link.name }}
        </a>
      </nav>

      <!-- Status Badge, Theme Toggle & CTA -->
      <div class="nav-actions desktop-only">
        <!-- Theme Toggle Button -->
        <button class="theme-toggle-btn" @click="toggleTheme" :title="isDarkMode ? 'Mudar para Light Mode' : 'Mudar para Dark Mode'">
          <svg v-if="isDarkMode" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="5"></circle><line x1="12" y1="1" x2="12" y2="3"></line><line x1="12" y1="21" x2="12" y2="23"></line><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line><line x1="1" y1="12" x2="3" y2="12"></line><line x1="21" y1="12" x2="23" y2="12"></line><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line></svg>
          <svg v-else xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path></svg>
        </button>

        <div class="status-badge" title="Disponível para contratação">
          <span class="status-dot online"></span>
          <span>Junior Fullstack</span>
        </div>
        <a href="#contact" class="btn btn-primary btn-sm">
          Falar Comigo
        </a>
      </div>

      <!-- Mobile Menu Toggle Button -->
      <button
        class="mobile-toggle mobile-only"
        @click="toggleMobileMenu"
        :aria-label="isMobileMenuOpen ? 'Fechar Menu' : 'Abrir Menu'"
      >
        <span class="hamburger-line" :class="{ open: isMobileMenuOpen }"></span>
        <span class="hamburger-line" :class="{ open: isMobileMenuOpen }"></span>
        <span class="hamburger-line" :class="{ open: isMobileMenuOpen }"></span>
      </button>
    </div>

    <!-- Mobile Navigation Drawer Overlay -->
    <transition name="fade">
      <div v-if="isMobileMenuOpen" class="mobile-drawer" @click.self="closeMobileMenu">
        <div class="mobile-drawer-content">
          <div class="mobile-drawer-header">
            <span class="logo-box">RM</span>
            <div class="flex items-center gap-2">
              <button class="theme-toggle-btn" @click="toggleTheme">
                <svg v-if="isDarkMode" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="5"></circle><line x1="12" y1="1" x2="12" y2="3"></line><line x1="12" y1="21" x2="12" y2="23"></line><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line><line x1="1" y1="12" x2="3" y2="12"></line><line x1="21" y1="12" x2="23" y2="12"></line><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line></svg>
                <svg v-else xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path></svg>
              </button>
              <button class="close-btn" @click="closeMobileMenu">&times;</button>
            </div>
          </div>
          
          <nav class="mobile-links">
            <a
              v-for="link in navLinks"
              :key="link.href"
              :href="link.href"
              class="mobile-link"
              :class="{ active: activeSection === link.href.substring(1) }"
              @click="closeMobileMenu"
            >
              {{ link.name }}
            </a>
          </nav>

          <div class="mobile-drawer-footer">
            <div class="status-badge mb-3">
              <span class="status-dot online"></span>
              <span>Disponível para Oportunidades</span>
            </div>
            <a href="#contact" class="btn btn-primary w-full" @click="closeMobileMenu">
              Falar Comigo
            </a>
          </div>
        </div>
      </div>
    </transition>
  </header>
</template>

<style scoped>
.navbar {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 100;
  padding: 1.25rem 0;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  background: transparent;
}

/* Navbar Scrolled adaptada para Light e Dark Mode */
.navbar-scrolled {
  padding: 0.85rem 0;
  background: var(--nav-bg-scrolled, rgba(7, 9, 14, 0.85));
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
  border-bottom: 1px solid var(--nav-border, rgba(255, 255, 255, 0.08));
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.15);
}

:global(html.light-mode) .navbar-scrolled {
  --nav-bg-scrolled: rgba(255, 255, 255, 0.88);
  --nav-border: rgba(0, 0, 0, 0.08);
}

.navbar-container {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

/* Botão de Troca de Tema */
.theme-toggle-btn {
  background: var(--btn-bg, rgba(255, 255, 255, 0.05));
  border: 1px solid var(--btn-border, rgba(255, 255, 255, 0.1));
  color: var(--text-muted);
  width: 38px;
  height: 38px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: var(--transition-fast, all 0.2s ease);
}

:global(html.light-mode) .theme-toggle-btn {
  --btn-bg: rgba(0, 0, 0, 0.05);
  --btn-border: rgba(0, 0, 0, 0.1);
}

.theme-toggle-btn:hover {
  background: rgba(99, 102, 241, 0.15);
  color: var(--primary, #6366f1);
  border-color: var(--primary-light, #818cf8);
}

.logo {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  text-decoration: none;
  color: var(--text-main, #0f172a);
  font-weight: 700;
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
  box-shadow: 0 4px 15px rgba(99, 102, 241, 0.4);
}

.logo-text {
  font-size: 1.2rem;
  letter-spacing: -0.5px;
  color: var(--text-main, #0f172a);
}

.logo-dot {
  color: var(--primary-light, #6366f1);
}

/* Menu de links (Pill central) */
.nav-links {
  display: flex;
  align-items: center;
  gap: 2rem;
  background: var(--pill-bg, rgba(255, 255, 255, 0.03));
  border: 1px solid var(--pill-border, rgba(255, 255, 255, 0.06));
  padding: 0.4rem 1.2rem;
  border-radius: var(--radius-full, 9999px);
  backdrop-filter: blur(8px);
}

:global(html.light-mode) .nav-links {
  --pill-bg: rgba(0, 0, 0, 0.04);
  --pill-border: rgba(0, 0, 0, 0.08);
}

.nav-link {
  color: var(--text-muted, #64748b);
  text-decoration: none;
  font-size: 0.9rem;
  font-weight: 500;
  transition: var(--transition-fast, all 0.2s ease);
  position: relative;
}

.nav-link:hover, .nav-link.active {
  color: var(--text-main, #0f172a);
}

.nav-link.active::after {
  content: '';
  position: absolute;
  bottom: -4px;
  left: 0;
  right: 0;
  height: 2px;
  background: linear-gradient(90deg, var(--primary, #6366f1), var(--secondary, #a855f7));
  border-radius: 2px;
}

.nav-actions {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.status-badge {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.35rem 0.85rem;
  border-radius: var(--radius-full, 9999px);
  background: rgba(16, 185, 129, 0.1);
  border: 1px solid rgba(16, 185, 129, 0.25);
  font-size: 0.8rem;
  color: #10b981;
  font-weight: 600;
}

.mobile-toggle {
  background: none;
  border: none;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  gap: 5px;
  padding: 8px;
}

.hamburger-line {
  width: 24px;
  height: 2px;
  background-color: var(--text-main, #0f172a);
  border-radius: 2px;
  transition: all 0.3s ease;
}

.hamburger-line.open:nth-child(1) {
  transform: translateY(7px) rotate(45deg);
}
.hamburger-line.open:nth-child(2) {
  opacity: 0;
}
.hamburger-line.open:nth-child(3) {
  transform: translateY(-7px) rotate(-45deg);
}

/* ==========================================
   MOBILE DRAWER (CORRIGIDO)
   ========================================== */
.mobile-drawer {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.6);
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
  z-index: 9999; /* Garante que fica acima de qualquer elemento da página */
  display: flex;
  justify-content: flex-end;
}

.mobile-drawer-content {
  width: 85%;
  max-width: 340px;
  height: 100vh;
  border-radius: 0;
  /* Fundo 100% opaco para impedir transparência indesejada */
  background: var(--drawer-bg, #0b0f19) !important;
  border-left: 1px solid var(--nav-border, rgba(255, 255, 255, 0.1));
  padding: 2rem 1.5rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  box-shadow: -10px 0 30px rgba(0, 0, 0, 0.5);
  overflow-y: auto;
}

:global(html.light-mode) .mobile-drawer-content {
  --drawer-bg: #ffffff;
  --nav-border: rgba(0, 0, 0, 0.1);
}

.mobile-drawer-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.close-btn {
  background: none;
  border: none;
  font-size: 2rem;
  color: var(--text-muted, #64748b);
  cursor: pointer;
}

.mobile-links {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  margin-top: 3rem;
}

.mobile-link {
  color: var(--text-muted, #64748b);
  text-decoration: none;
  font-size: 1.2rem;
  font-weight: 600;
  transition: var(--transition-fast, all 0.2s ease);
}

.mobile-link.active, .mobile-link:hover {
  color: var(--primary, #6366f1);
  transform: translateX(5px);
}

.w-full {
  width: 100%;
}
.mb-3 {
  margin-bottom: 0.75rem;
}

@media (min-width: 900px) {
  .mobile-only {
    display: none !important;
  }
}

@media (max-width: 899px) {
  .desktop-only {
    display: none !important;
  }
}
</style>