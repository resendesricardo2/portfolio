<script setup>
import { ref } from 'vue';
import { developerInfo } from '../data/portfolioData';

// Carrega a Access Key a partir das variáveis de ambiente
const WEB3FORMS_ACCESS_KEY = import.meta.env.VITE_WEB3FORMS_ACCESS_KEY;

const form = ref({
  name: '',
  email: '',
  subject: '',
  message: '',
  botcheck: '' // Campo Honeypot para apanhar bots de spam
});

const isSubmitting = ref(false);
const isSuccess = ref(false);
const errorMessage = ref('');
const cooldown = ref(false);

const handleSubmit = async () => {
  // 1. Validação da Chave de API
  if (!WEB3FORMS_ACCESS_KEY) {
    errorMessage.value = 'Erro de configuração: Chave de API não encontrada no ficheiro .env.';
    return;
  }

  // 2. Verificação Anti-Spam (Honeypot)
  // Se o campo invisível for preenchido, é um bot. Simulamos sucesso silenciosamente.
  if (form.value.botcheck) {
    isSuccess.value = true;
    form.value = { name: '', email: '', subject: '', message: '', botcheck: '' };
    return;
  }

  // 3. Rate Limiting local (evita cliques seguidos)
  if (cooldown.value) {
    errorMessage.value = 'Por favor, aguarde alguns segundos antes de enviar outro formulário.';
    return;
  }

  const cleanName = form.value.name.trim();
  const cleanEmail = form.value.email.trim();
  const cleanSubject = form.value.subject.trim();
  const cleanMessage = form.value.message.trim();

  // Validação básica de campos obrigatórios
  if (!cleanName || !cleanEmail || !cleanMessage) {
    errorMessage.value = 'Por favor, preencha todos os campos obrigatórios com dados válidos.';
    return;
  }

  // Validação de formato de email
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(cleanEmail)) {
    errorMessage.value = 'Por favor, introduza um endereço de email válido (ex: exemplo@dominio.com).';
    return;
  }

  errorMessage.value = '';
  isSubmitting.value = true;

  try {
    const response = await fetch('https://api.web3forms.com/submit', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({
        access_key: WEB3FORMS_ACCESS_KEY,
        name: cleanName,
        email: cleanEmail,
        subject: cleanSubject || 'Nova Mensagem do Portfólio',
        message: cleanMessage,
        from_name: 'Portfólio Web'
      })
    });

    const result = await response.json();

    if (result.success) {
      isSuccess.value = true;
      form.value = { name: '', email: '', subject: '', message: '', botcheck: '' };

      // Ativa um tempo de espera de 30 segundos após envio com sucesso
      cooldown.value = true;
      setTimeout(() => {
        cooldown.value = false;
      }, 30000);

      setTimeout(() => {
        isSuccess.value = false;
      }, 5000);
    } else {
      errorMessage.value = result.message || 'Ocorreu um erro ao enviar a mensagem. Tente novamente.';
    }
  } catch (err) {
    errorMessage.value = 'Erro de rede. Verifique a sua ligação e tente novamente.';
  } finally {
    isSubmitting.value = false;
  }
};

const copiedEmail = ref(false);
const copyEmail = async () => {
  try {
    if (navigator && navigator.clipboard) {
      await navigator.clipboard.writeText(developerInfo.email);
      copiedEmail.value = true;
      setTimeout(() => (copiedEmail.value = false), 2500);
    }
  } catch (err) {
    console.error('Erro ao copiar email:', err);
  }
};
</script>

<template>
  <section id="contact" class="section-padding contact-section">
    <div class="container">
      <!-- Section Header -->
      <div class="section-header">
        <span class="section-badge">Contacto & Propostas</span>
        <h2 class="section-title">
          Vamos Trabalhar <span class="gradient-text">Juntos?</span>
        </h2>
        <p class="section-subtitle">
          Tem um projeto em mente, uma oportunidade de emprego ou quer apenas trocar ideias sobre tecnologia? Entre em contacto!
        </p>
      </div>

      <div class="contact-grid">
        <!-- Left Side: Direct Contact Cards -->
        <div class="contact-info-cards">
          <!-- Email Card -->
          <div class="info-card glass-card">
            <div class="info-icon email">✉️</div>
            <div class="info-content">
              <span class="info-label">Email Direto</span>
              <a :href="'mailto:' + developerInfo.email" class="info-value">
                {{ developerInfo.email }}
              </a>
            </div>
            <button
              @click="copyEmail"
              class="copy-btn"
              title="Copiar Email"
              aria-label="Copiar Email"
            >
              {{ copiedEmail ? '✓ Copiado' : 'Copiar' }}
            </button>
          </div>

          <!-- Location & Availability Card -->
          <div class="info-card glass-card">
            <div class="info-icon status">📍</div>
            <div class="info-content">
              <span class="info-label">Localização & Regime</span>
              <span class="info-value">{{ developerInfo.location }}</span>
            </div>
          </div>

          <!-- Social Direct Buttons -->
          <div class="social-cards-row">
            <a
              :href="developerInfo.github"
              target="_blank"
              rel="noopener noreferrer"
              class="social-tile glass-card"
            >
              <span class="tile-icon">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                >
                  <path
                    d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"
                  ></path>
                </svg>
              </span>
              <div>
                <strong>GitHub</strong>
                <p>Ver Projetos & Commits</p>
              </div>
            </a>
            <a
              :href="developerInfo.linkedin"
              target="_blank"
              rel="noopener noreferrer"
              class="social-tile glass-card"
            >
              <span class="tile-icon">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                >
                  <path
                    d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"
                  ></path>
                  <rect x="2" y="9" width="4" height="12"></rect>
                  <circle cx="4" cy="4" r="2"></circle>
                </svg>
              </span>
              <div>
                <strong>LinkedIn</strong>
                <p>Conectar no Perfil</p>
              </div>
            </a>
          </div>
        </div>

        <!-- Right Side: Interactive Contact Form -->
        <div class="contact-form-container glass-card">
          <h3 class="form-title">Enviar Mensagem Direta</h3>

          <form @submit.prevent="handleSubmit" class="contact-form" novalidate>
            <!-- Campo Honeypot Escondido (Anti-Spam) -->
            <input
              type="checkbox"
              v-model="form.botcheck"
              class="hidden-honeypot"
              tabindex="-1"
              autocomplete="off"
            />

            <!-- Error Banner -->
            <div v-if="errorMessage" class="alert alert-error" role="alert">
              {{ errorMessage }}
            </div>

            <!-- Success Banner -->
            <div v-if="isSuccess" class="alert alert-success" role="alert">
              🎉 Mensagem enviada com sucesso! Responderei com a máxima brevidade.
            </div>

            <div class="form-row">
              <div class="form-group">
                <label for="name">O Seu Nome *</label>
                <input
                  id="name"
                  v-model="form.name"
                  type="text"
                  placeholder="Ex: Maria Santos"
                  class="form-input"
                  required
                  maxlength="80"
                />
              </div>

              <div class="form-group">
                <label for="email">O Seu Email *</label>
                <input
                  id="email"
                  v-model="form.email"
                  type="email"
                  placeholder="exemplo@empresa.com"
                  class="form-input"
                  required
                  maxlength="100"
                />
              </div>
            </div>

            <div class="form-group">
              <label for="subject">Assunto (Opcional)</label>
              <input
                id="subject"
                v-model="form.subject"
                type="text"
                placeholder="Ex: Oportunidade de Trabalho / Projeto Freelance"
                class="form-input"
                maxlength="120"
              />
            </div>

            <div class="form-group">
              <label for="message">Mensagem *</label>
              <textarea
                id="message"
                v-model="form.message"
                rows="5"
                placeholder="Descreva a sua ideia ou proposta..."
                class="form-input textarea"
                required
                maxlength="1500"
              ></textarea>
            </div>

            <button
              type="submit"
              class="btn btn-primary w-full"
              :disabled="isSubmitting || cooldown"
            >
              <span v-if="!isSubmitting && !cooldown">Enviar Mensagem 🚀</span>
              <span v-else-if="isSubmitting">A enviar...</span>
              <span v-else>Aguarde um momento...</span>
            </button>
          </form>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.contact-section {
  position: relative;
}

.contact-grid {
  display: grid;
  grid-template-columns: 0.9fr 1.1fr;
  gap: 2.5rem;
  align-items: start;
}

.contact-info-cards {
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
}

.info-card {
  padding: 1.25rem 1.5rem;
  display: flex;
  align-items: center;
  gap: 1.25rem;
}

.info-icon {
  width: 48px;
  height: 48px;
  border-radius: 12px;
  background: rgba(99, 102, 241, 0.12);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.4rem;
  flex-shrink: 0;
}

.info-content {
  display: flex;
  flex-direction: column;
  flex-grow: 1;
}

.info-label {
  font-size: 0.8rem;
  color: var(--text-dim);
  text-transform: uppercase;
  letter-spacing: 0.5px;
  font-weight: 600;
}

.info-value {
  font-size: 1.05rem;
  font-weight: 700;
  color: var(--text-main);
  text-decoration: none;
  word-break: break-all;
}

a.info-value:hover {
  color: var(--primary-light);
}

.copy-btn {
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  color: var(--text-muted);
  font-size: 0.8rem;
  padding: 0.35rem 0.75rem;
  border-radius: var(--radius-sm);
  cursor: pointer;
  transition: var(--transition-fast);
}

.copy-btn:hover {
  background: rgba(99, 102, 241, 0.2);
  color: #fff;
}

.social-cards-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
}

.social-tile {
  padding: 1.25rem;
  display: flex;
  align-items: center;
  gap: 1rem;
  text-decoration: none;
  color: var(--text-main);
}

.tile-icon {
  font-size: 1.8rem;
}

.social-tile strong {
  display: block;
  font-size: 1rem;
}

.social-tile p {
  color: var(--text-muted);
  font-size: 0.8rem;
}

/* Contact Form */
.contact-form-container {
  padding: 2.25rem;
}

.form-title {
  font-size: 1.5rem;
  font-weight: 800;
  margin-bottom: 1.5rem;
}

.contact-form {
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
}

.form-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1.25rem;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
}

.form-group label {
  font-size: 0.85rem;
  font-weight: 600;
  color: var(--text-muted);
}

.form-input {
  width: 100%;
  padding: 0.85rem 1.1rem;
  background: rgba(255, 255, 255, 0.04);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: var(--radius-md);
  color: var(--text-main);
  font-family: var(--font-main);
  font-size: 0.95rem;
  outline: none;
  transition: var(--transition-fast);
}

.form-input:focus {
  border-color: var(--primary);
  background: rgba(255, 255, 255, 0.07);
  box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.25);
}

.textarea {
  resize: vertical;
  min-height: 120px;
}

/* Estilo do Honeypot invisível */
.hidden-honeypot {
  display: none !important;
  opacity: 0;
  position: absolute;
  top: 0;
  left: 0;
  height: 0;
  width: 0;
  z-index: -1;
}

.alert {
  padding: 0.85rem 1.1rem;
  border-radius: var(--radius-sm);
  font-size: 0.9rem;
  font-weight: 500;
}

.alert-error {
  background: rgba(239, 68, 68, 0.15);
  border: 1px solid rgba(239, 68, 68, 0.3);
  color: #fca5a5;
}

.alert-success {
  background: rgba(16, 185, 129, 0.15);
  border: 1px solid rgba(16, 185, 129, 0.3);
  color: #6ee7b7;
}

.w-full {
  width: 100%;
}

@media (max-width: 900px) {
  .contact-grid {
    grid-template-columns: 1fr;
  }
  .social-cards-row {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 600px) {
  .form-row {
    grid-template-columns: 1fr;
  }
  .contact-form-container {
    padding: 1.5rem;
  }
}
</style>