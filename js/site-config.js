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
  var contextMessages = {
    header: "Olá, JB DEV! Quero entender como vocês podem ajudar meu negócio.",
    hero: "Olá, JB DEV! Quero solicitar uma proposta para um projeto digital.",
    services: "Olá, JB DEV! Quero ajuda para identificar a melhor solução para o meu negócio.",
    projects: "Olá, JB DEV! Vi os projetos e quero planejar uma solução para o meu negócio.",
    faq: "Olá, JB DEV! Tenho uma dúvida sobre os serviços e projetos.",
    final: "Olá, JB DEV! Quero começar a conversar sobre meu próximo projeto.",
    contact: "Olá, JB DEV! Quero falar sobre uma necessidade do meu negócio.",
    footer: "Olá, JB DEV! Encontrei o site e quero conversar.",
    floating: config.contact.whatsappMessage
  };

  document.querySelectorAll("[data-whatsapp]").forEach(function (link) {
    var context = link.getAttribute("data-whatsapp-context");
    var message = contextMessages[context] || config.contact.whatsappMessage;
    link.href =
      "https://wa.me/" +
      config.contact.whatsappE164 +
      "?text=" +
      encodeURIComponent(message);
    link.target = "_blank";
    link.rel = "noopener noreferrer";
  });

  document.querySelectorAll("[data-contact-phone]").forEach(function (element) {
    element.textContent = config.contact.phoneDisplay;
  });

  document.querySelectorAll("[data-contact-email]").forEach(function (element) {
    element.textContent = config.contact.email;
  });

  document.querySelectorAll("[data-contact-email-link]").forEach(function (link) {
    link.href = "mailto:" + config.contact.email;
  });
});
