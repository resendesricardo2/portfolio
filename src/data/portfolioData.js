import Fanhub1 from "../assets/styles/images/Fanhub1.png";
import Fanhub2 from "../assets/styles/images/Fanhub2.png";
import Fanhub3 from "../assets/styles/images/Fanhub3.png";
import metadaimage1 from "../assets/styles/images/metadaimage1.png";
import suporte1 from "../assets/styles/images/suporte1.png";
import suporte2 from "../assets/styles/images/suporte2.png";
import piteu1 from "../assets/styles/images/piteu1.png";

export const developerInfo = {
  name: "Ricardo Melo",
  role: "Fullstack Developer Junior",
  location: "Portugal / Remoto",
  availability: "Disponível para Trabalho & Projetos Freelance",
  email: "ricardoresendesmelo4567@gmail.com",
  avatar: "/images/1772056228371.png", // Coloque a sua foto em public/images/profile_avatar.jpg
  github: "https://github.com/resendesricardo2",
  linkedin: "https://www.linkedin.com/in/ricardomelo10",
  about: `Sou um Fullstack Developer Junior apaixonado por criar aplicações web modernas, rápidas e visualmente impactantes. Especializado em Vue.js para o frontend e Python/PostgreSQL no backend, foco-me em escrever código limpo, arquitetura escalável e interfaces de utilizador com experiência premium (UI/UX).`,
  bioDetails: [
    { title: "Formação", value: "Técnico Eletrónica Automação e Computadores" },
    { title: "Foco Atual", value: "Vue 3 (Composition API), PostgreSQL & Python" },
    { title: "Metodologia", value: "Clean Code & Vue Components" }
  ],
  stats: [
    { label: "Projetos Criados", value: "12+" },
    { label: "Tecnologias Dominadas", value: "6+" },
    { label: "Commits no GitHub", value: "450+" },
    { label: "Dedicação & Paixão", value: "100%" }
  ]
};


export const skillsData = [
  // Frontend
  { name: "Vue.js 3", category: "Frontend", level: 90, icon: "Code", color: "#42b883", description: "Composition API, Pinia, Vue Router, Vite" },
  { name: "JavaScript (ES6+)", category: "Frontend", level: 88, icon: "Code", color: "#f7df1e", description: "Async/Await, ES Modules, DOM, Modern Syntax" },
  { name: "HTML5 / CSS3", category: "Frontend", level: 92, icon: "Layout", color: "#e34f26", description: "Flexbox, CSS Grid, Glassmorphism, Animations" },
  
  // Backend
  { name: "Python / Flask", category: "Backend", level: 68, icon: "Terminal", color: "#3776ab", description: "Quick API endpoints, Automation, Data Processing" },
  
  // Database & DevOps
  { name: "PostgreSQL", category: "Database", level: 80, icon: "Database", color: "#4169e1", description: "Relational Queries, Joins, Indexes, Schema Design" },
  { name: "SQlite3", category: "Database", level: 78, icon: "Database", color: "#47a248", description: "NoSQL, Mongoose Schemas, Aggregations" }
];

export const projectsData = [
  {
    id: "Benfica-Fan-Hub",
    title: "🦅 SLB Fan Hub",
    subtitle: "Desenvolvi uma Single Page Application (SPA) para centralizar o ecossistema digital de um adepto, recorrendo a Vue.js no frontend e Flask no backend. O projeto inclui autenticação, gestão de utilizadores, classificação e calendário de jogos, geração dinâmica de cartões de sócio e integração com APIs externas, seguindo uma arquitetura modular e boas práticas de desenvolvimento.",
    category: "Fullstack",
    tags: ["Vue.js", "Flask", "Python", "SQLite3", "Vue Router", "Mailtrap", "SMTP"],
    isLive: false,
    liveUrl: null,
    githubUrl: "https://github.com/resendesricardo2/Benfica-Fan-Hub",
    thumbnail: Fanhub1,
    fallbackGradient: "linear-gradient(135deg, #1e1b4b 0%, #312e81 50%, #4338ca 100%)",
    features: [
      "Arquitetura SPA com Vue Router",
      "API REST desenvolvida em Flask",
      "Gestão de sócios e geração de cartão digital",
      "Classificação, calendário e plantel dinâmicos",
      "Sistema de contacto com envio de emails via SMTP (Mailtrap)"
    ],
    photos: [
      {
        url: Fanhub1,
        title: "Página Inicial",
        desc: "Homepage da aplicação com acesso rápido à classificação, calendário, plantel e restantes funcionalidades do ecossistema digital."
      },
      {
        url: Fanhub3,
        title: "Módulo do Cartão de Sócio Digital",
        desc: "Interface de gestão e adesão do adepto, permitindo a criação do cartão de sócio digital personalizado e acesso aos benefícios exclusivos do clube."
      },
      {
        url: Fanhub2,
        title: "Classificação Dinâmica em Tempo Real",
        desc: "Tabela interativa da Liga Portugal com atualização automática de dados (jogos, vitórias, golos e pontos), destacando a posição do clube e o estado mais recente da competição."
      }
    ]
  },
  {
    id: "Image-Metadata-Extractor",
    title: "Image Metadata Extractor",
    subtitle: "Ferramenta simples para upload de imagens e leitura automática de metadados EXIF, como data de criação, modelo da câmara, localização GPS e definições de captura.",
    category: "Fullstack",
    tags: ["HTML5", "CSS3", "Python", "Flask", "Pillow", "EXIF"],
    isLive: true, 
    liveUrl: "https://image-metadata-extractor-wudp.onrender.com/",
    githubUrl: "https://github.com/resendesricardo2/Image-Metadata-Extractor",
    thumbnail: metadaimage1,
    fallbackGradient: "linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #0f766e 100%)",
    features: [
      "Upload simples de imagens através de uma interface intuitiva",
      "Extração e organização automática de dados EXIF",
      "Suporte para múltiplos formatos de imagem (JPG, PNG)",
      "Leitura de coordenadas GPS, resolução e definições da câmara",
      "Backend leve e eficiente desenvolvido com Python e Flask"
    ],
    photos: []
  },
  {
    id: "support-ticket-system",
    title: "Sistema de Suporte de TI",
    subtitle: "Aplicação Full Stack desenvolvida para reportar problemas técnicos em lojas. O sistema processa os dados do formulário e envia notificações automáticas por email diretamente para a equipa de suporte.",
    category: "Fullstack",
    tags: ["Vue.js", "Python", "Flask", "Mailtrap", "SMTP"],
    isLive: false,
    liveUrl: null,
    githubUrl: "https://github.com/resendesricardo2/support-ticket-system",
    thumbnail: suporte1,
    fallbackGradient: "linear-gradient(135deg, #2e1065 0%, #3b0764 50%, #581c87 100%)",
    features: [
      "Interface reativa em Vue.js para submissão rápida de tickets",
      "Backend em Python/Flask para gestão do fluxo de comunicação",
      "Integração SMTP e envio automático de emails organizados",
      "Testado com Mailtrap para validação segura de mensagens",
      "Gestão segura de credenciais através de variáveis de ambiente (.env)"
    ],
    photos: [
      {
        url: suporte1,
        title: "Página Inicial",
        desc: "Homepage da aplicação com acesso rápido à classificação, calendário, plantel e restantes funcionalidades do ecossistema digital."
      },
      {
        url: suporte2,
        title: "Receção & Validação do Ticket via SMTP (Mailtrap)",
        desc: "Simulação do servidor de email no Mailtrap para validação da estrutura, formatação e dados recebidos do formulário de suporte."
      }
    ]
  },
  {
    id: "restaurante-piteu",
    title: "Restaurante Pitéu dos Açores",
    subtitle: "Website institucional e ementa digital para restaurante nos Açores",
    category: "Frontend",
    tags: ["HTML5", "CSS3", "JS"],
    isLive: true,
    liveUrl: "https://www.piteudosacores.pt/",
    thumbnail: piteu1,
    fallbackGradient: "linear-gradient(135deg, #18181b 0%, #27272a 50%, #3f3f46 100%)",
    features: [
      "Ementa digital interativa com os pratos e especialidades da casa",
      "Layout 100% responsivo, adaptado para leitura fácil em telemóveis",
      "Seção dedicada para localização e horário de funcionamento",
      "Design focado na identidade visual e gastronomia típica açoriana",
      "Website em produção e ativo num domínio próprio (.pt)"
    ],
    photos: []
  },
];

export const workExperience = [
  {
    period: "Setembro de 2024 - Presente",
    role: "Técnico de Informática",
    company: "Gold Evolution",
    description: [
    "Web Developer.",
    "Reparação e Manutenção de Hardware e Software.",
    "Manutenção e Gestão de Redes.",
    "Programação SQL e MySQL.",
    "Apoio ao Software PHC."
  ],
  location: "📍 Valados, São Miguel, Açores, Portugal",
    badges: ["SQL", "MySQL", "HTML", "CSS", "JS", "PHC"]
  },

  {
    period: "Janeiro de 2024 - Março de 2024",
    role: "(Estágio Currícular) Técnico de Automação Indústrial",
    company: "Prolacto",
    description: [
    "Programação de Autómatos.",
    "Ligação de Motores.",
    "Manutenção de Quadros Elétricos."
  ],
  location: "📍 Livramento, São Miguel, Açores, Portugal",
    badges: ["Simatic"]
  },

  {
    period: "Janeiro de 2023 - Março de 2023",
    role: "(Estágio Currícular) Técnico de Informática",
    company: "Escola Básica Integrada Capelas",
    description: [
    "Help Desk.",
    "Manutenção e Gestão de Redes.",
    "Instalação e Manutenção de Switch's.",
    "Administração de Sistemas."
  ],
    location: "📍 Capelas, São Miguel, Açores, Portugal",
    badges: ["Redes"]
  }
];

export const education = [
  {
    period: "2021 - 2024",
    role: "Técnico de Eletrónica, Automação e Computadores",
    company: "Escola Profissional Câmera do Comércio e Indústria de Ponta Delgada",
    description:
      "Curso profissional com formação em eletrónica, programação, automação industrial, redes e sistemas informáticos, complementado com projetos práticos.",
    badges: ["Programação", "Eletrónica", "Automação", "Redes"]
  },
  {
    period: "2025",
    role: "Estudo Autónomo em Desenvolvimento Fullstack",
    company: "Aprendizagem Contínua",
    description:
      "Especialização em Vue 3, Python, PostgreSQL e desenvolvimento de aplicações web modernas através de documentação oficial, cursos online e projetos pessoais.",
    badges: ["Vue 3", "Python", "REST APIs", "PostgreSQL"]
  }
];
