<script setup>
import { ref } from 'vue';
import Navbar from './components/Navbar.vue';
import HeroSection from './components/HeroSection.vue';
import AboutSection from './components/AboutSection.vue';
import ProjectsSection from './components/ProjectsSection.vue';
import ImageModal from './components/ImageModal.vue';
import ExperienceSection from './components/ExperienceSection.vue';
import ContactSection from './components/ContactSection.vue';
import Footer from './components/Footer.vue';

const selectedProjectForModal = ref(null);
const isModalOpen = ref(false);

const handleOpenModal = (project) => {
  selectedProjectForModal.value = project;
  isModalOpen.value = true;
};

const handleCloseModal = () => {
  isModalOpen.value = false;
  selectedProjectForModal.value = null;
};
</script>

<template>
  <div class="app-layout">
    <!-- Sticky Glass Navbar -->
    <Navbar />

    <main>
      <!-- Hero Section -->
      <HeroSection />

      <!-- About & Skills Section -->
      <AboutSection />

      <!-- Projects Section with Stack Filters -->
      <ProjectsSection @open-modal="handleOpenModal" />

      <!-- Experience & Education Section -->
      <ExperienceSection />

      <!-- Contact Section -->
      <ContactSection />
    </main>

    <!-- Footer -->
    <Footer />

    <!-- Image / Screenshots Gallery Modal for Offline Projects -->
    <ImageModal
      :is-open="isModalOpen"
      :project="selectedProjectForModal"
      @close="handleCloseModal"
    />
  </div>
</template>

<style scoped>
.app-layout {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

main {
  flex-grow: 1;
}
</style>
