/**
 * Configuração pública do site (fonte única de verdade).
 * Padrão similar a cookbooks: dados estruturados separados da UI.
 */
window.SITE_CONFIG = Object.freeze({
  siteUrl: "https://jonathanbalieiro.dev/",
  brand: {
    name: "JB DEV",
    description: "Sites, sistemas e soluções digitais",
  },
  person: {
    name: "Jonathan Vinicius Balieiro de Oliveira",
    jobTitle: "Desenvolvedor Web Full Stack",
    image: "https://jonathanbalieiro.dev/assents/img/1716911104056.jpeg",
  },
  contact: {
    phoneDisplay: "(19) 99749-5985",
    whatsappE164: "5519997495985",
    email: "jonathantotini@gmail.com",
    addressLocality: "Indaiatuba",
    addressRegion: "SP",
    addressCountry: "BR",
    whatsappMessage:
      "Olá, JB DEV! Quero conversar sobre um projeto digital para o meu negócio.",
  },
  emailJs: {
    publicKey: "VX_4NleGiqCWjgyH8",
    serviceId: "service_wk97sla",
    templateId: "template_8eunazl",
  },
});

document.addEventListener("DOMContentLoaded", function () {
  var config = window.SITE_CONFIG;
  // Each CTA carries the intent of its own section into the conversation.
  var contextMessagesPt = {
    header: "Olá, JB DEV! Gostaria de pedir um orçamento para um projeto digital.",
    hero: "Olá, JB DEV! Quero tirar meu projeto do papel e gostaria de receber uma proposta.",
    services: "Olá, JB DEV! Não sei qual solução faz mais sentido e gostaria de ajuda para escolher.",
    "service-site": "Olá, JB DEV! Gostaria de um orçamento para criação de site profissional.",
    "service-landing": "Olá, JB DEV! Gostaria de conversar sobre uma landing page para o meu negócio.",
    "service-system": "Olá, JB DEV! Tenho uma ideia de sistema e gostaria de entender como podemos desenvolver.",
    "service-ecommerce": "Olá, JB DEV! Quero criar uma loja virtual e gostaria de conversar sobre o projeto.",
    "service-optimization": "Olá, JB DEV! Já tenho um site e gostaria de melhorar desempenho, visual ou resultados.",
    "service-support": "Olá, JB DEV! Preciso de suporte e acompanhamento técnico para um projeto que já está no ar.",
    process: "Olá, JB DEV! Quero começar um projeto e gostaria de iniciar pela etapa de descoberta.",
    projects: "Olá, JB DEV! Vi os projetos do site e quero um projeto nesse nível para o meu negócio.",
    about: "Olá, JB DEV! Tenho uma ideia em mente e gostaria de conversar antes de definir a solução.",
    faq: "Olá, JB DEV! Ficou uma dúvida depois de ler o site e gostaria de falar direto por aqui.",
    final: "Olá, JB DEV! Quero conversar sobre meu projeto e receber uma proposta personalizada.",
    contact: "Olá, JB DEV! Quero falar sobre uma necessidade do meu negócio.",
    footer: "Olá! Conheci a JB DEV pelo site e gostaria de conversar sobre um projeto.",
    floating: config.contact.whatsappMessage
  };
  var contextMessagesEn = {
    header: "Hello, Jonathan! I would like to request a quote for a digital project.",
    hero: "Hello, Jonathan! I want to get my project off the ground and would like to receive a proposal.",
    services: "Hello, Jonathan! I am not sure which solution fits best and would like help choosing.",
    "service-site": "Hello, Jonathan! I would like a quote for a professional website.",
    "service-landing": "Hello, Jonathan! I would like to discuss a landing page for my business.",
    "service-system": "Hello, Jonathan! I have an idea for a web system and would like to understand how we could build it.",
    "service-ecommerce": "Hello, Jonathan! I want to launch an online store and would like to discuss the project.",
    "service-optimization": "Hello, Jonathan! I already have a website and would like to improve its performance, design or results.",
    "service-support": "Hello, Jonathan! I need ongoing technical support for a project that is already live.",
    process: "Hello, Jonathan! I want to start a project and would like to begin with the discovery stage.",
    projects: "Hello, Jonathan! I saw your projects and would like something at that level for my business.",
    about: "Hello, Jonathan! I have an idea in mind and would like to talk it through before defining the solution.",
    faq: "Hello, Jonathan! I still have a question after reading your website and would like to ask it here.",
    final: "Hello, Jonathan! I would like to discuss my project and receive a tailored proposal.",
    contact: "Hello, Jonathan! I would like to discuss a business need.",
    footer: "Hello, Jonathan! I found JB DEV through your website and would like to discuss a project.",
    floating: "Hello, Jonathan! I found JB DEV through your website and would like to discuss a project."
  };

  window.JBApplyWhatsAppLinks = function () {
    var isEnglish = window.JBI18N && window.JBI18N.getLanguage() === "en";
    var contextMessages = isEnglish ? contextMessagesEn : contextMessagesPt;
    document.querySelectorAll("[data-whatsapp]").forEach(function (link) {
      var context = link.getAttribute("data-whatsapp-context");
      var message = contextMessages[context] || (isEnglish ? contextMessagesEn.floating : config.contact.whatsappMessage);
      link.href = "https://wa.me/" + config.contact.whatsappE164 + "?text=" + encodeURIComponent(message);
      link.target = "_blank";
      link.rel = "noopener noreferrer";
    });
  };
  window.JBApplyWhatsAppLinks();

  document.querySelectorAll("[data-contact-phone]").forEach(function (element) {
    element.textContent = config.contact.phoneDisplay;
  });

  document.querySelectorAll("[data-contact-email]").forEach(function (element) {
    element.textContent = config.contact.email;
  });

  document.querySelectorAll("[data-contact-email-link]").forEach(function (link) {
    link.href = "mailto:" + config.contact.email;
  });

  // Local SEO. Mirrors the service areas and specialties listed in the footer,
  // built from the config above so contact data is never duplicated by hand.
  var schema = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "@id": config.siteUrl + "#business",
    name: config.brand.name,
    description: config.brand.description,
    url: config.siteUrl,
    image: config.person.image,
    telephone: "+" + config.contact.whatsappE164,
    email: config.contact.email,
    address: {
      "@type": "PostalAddress",
      addressLocality: config.contact.addressLocality,
      addressRegion: config.contact.addressRegion,
      addressCountry: config.contact.addressCountry
    },
    areaServed: ["Indaiatuba", "Campinas", "Itu", "Salto", "Sorocaba", "São Paulo", "Brasil"].map(function (place) {
      return { "@type": "Place", name: place };
    }),
    knowsAbout: [
      "Criação de sites", "Landing pages", "Sistemas web", "Loja virtual",
      "CRM personalizado", "Sistema de agendamento", "Otimização de sites", "SEO local"
    ],
    founder: {
      "@type": "Person",
      name: config.person.name,
      jobTitle: config.person.jobTitle,
      image: config.person.image
    },
    sameAs: [
      "https://www.instagram.com/jonathan_desenvolvedor/",
      "https://www.linkedin.com/in/jonathan-balieiro-b83230298/",
      "https://github.com/Jonathanfullstack"
    ]
  };
  var schemaTag = document.createElement("script");
  schemaTag.type = "application/ld+json";
  schemaTag.textContent = JSON.stringify(schema);
  document.head.appendChild(schemaTag);
});
