(function () {
  "use strict";

  var translations = Object.freeze({
    pt: {
      skip: "Pular para o conteúdo", role: "Desenvolvedor Web & Fundador da JB DEV", tagline: "Transformo ideias em sites e sistemas profissionais.", whatsapp: "Falar no WhatsApp", save: "Salvar contato", portfolio: "Ver portfólio", services: "Serviços", professionalSites: "Sites Profissionais", customSystems: "Sistemas Personalizados", automations: "Automações", featured: "Projetos em destaque", scheduleTitle: "Sistema de Agendamento", scheduleText: "Plataforma completa para agendamentos online com gestão de clientes, serviços e horários.", unavailable: "Link indisponível", financeText: "Gestão financeira inteligente com receitas, despesas, orçamentos, indicadores e análise de dados.", crmTitle: "CRM SaaS & Automação de Vendas", crmText: "Gestão de leads, pipeline comercial, integrações e automações em uma plataforma escalável.", aiTitle: "Plataforma de Atendimento com IA", aiText: "Atendimento inteligente, base de conhecimento, análise de conversas e integração multicanal.", development: "Em desenvolvimento", projectCta: "Conversar sobre este projeto", technologies: "Tecnologias", emailAction: "Enviar e-mail", footerMessage: "Tecnologia sob medida para transformar ideias em <strong>resultados.</strong>", copyright: "© 2026 JB DEV. Todos os direitos reservados."
    },
    en: {
      skip: "Skip to content", role: "Web Developer & Founder of JB DEV", tagline: "I turn ideas into professional websites and systems.", whatsapp: "Chat on WhatsApp", save: "Save contact", portfolio: "View portfolio", services: "Services", professionalSites: "Professional Websites", customSystems: "Custom Systems", automations: "Automations", featured: "Featured projects", scheduleTitle: "Scheduling System", scheduleText: "Complete online scheduling platform with customer, service and time-slot management.", unavailable: "Link unavailable", financeText: "Smart financial management for income, expenses, budgets, indicators and data analysis.", crmTitle: "CRM SaaS & Sales Automation", crmText: "Lead management, sales pipeline, integrations and automations in a scalable platform.", aiTitle: "AI Customer Service Platform", aiText: "Intelligent support, knowledge base, conversation analysis and multichannel integration.", development: "In development", projectCta: "Discuss this project", technologies: "Technologies", emailAction: "Send email", footerMessage: "Tailored technology to turn ideas into <strong>results.</strong>", copyright: "© 2026 JB DEV. All rights reserved."
    }
  });

  var projectMessages = Object.freeze({
    pt: {
      schedule: "Olá, Jonathan! Vi o Sistema de Agendamento no cartão digital da JB DEV e gostaria de conversar sobre um projeto parecido.",
      finance: "Olá, Jonathan! Vi o projeto Finance.AI no cartão digital da JB DEV e gostaria de conversar sobre uma solução financeira.",
      crm: "Olá, Jonathan! Vi a solução de CRM e Automação de Vendas no cartão digital da JB DEV e gostaria de conversar sobre esse tipo de sistema.",
      ai: "Olá, Jonathan! Vi a Plataforma de Atendimento com IA no cartão digital da JB DEV e gostaria de conversar sobre essa solução."
    },
    en: {
      schedule: "Hello, Jonathan! I saw the Scheduling System on the JB DEV digital card and would like to discuss a similar project.",
      finance: "Hello, Jonathan! I saw the Finance.AI project on the JB DEV digital card and would like to discuss a financial solution.",
      crm: "Hello, Jonathan! I saw the CRM and Sales Automation solution on the JB DEV digital card and would like to discuss this type of system.",
      ai: "Hello, Jonathan! I saw the AI Customer Service Platform on the JB DEV digital card and would like to discuss this solution."
    }
  });
  var projectAria = Object.freeze({ pt: { schedule: "Conversar pelo WhatsApp sobre o Sistema de Agendamento", finance: "Conversar pelo WhatsApp sobre o Finance.AI", crm: "Conversar pelo WhatsApp sobre CRM SaaS e Automação de Vendas", ai: "Conversar pelo WhatsApp sobre a Plataforma de Atendimento com IA" }, en: { schedule: "Discuss the Scheduling System on WhatsApp", finance: "Discuss Finance.AI on WhatsApp", crm: "Discuss CRM SaaS and Sales Automation on WhatsApp", ai: "Discuss the AI Customer Service Platform on WhatsApp" } });
  var projectAlts = Object.freeze({ pt: { schedule: "Painel do sistema de agendamento com agenda, horários, clientes e serviços", finance: "Dashboard do Finance.AI com gráficos, receitas, despesas e indicadores", crm: "Interface de CRM com pipeline Kanban, leads, indicadores e automações", ai: "Interface de atendimento com caixa de entrada, chat, assistente de IA e métricas" }, en: { schedule: "Scheduling system dashboard with calendar, time slots, customers, and services", finance: "Finance.AI dashboard with charts, income, expenses, and indicators", crm: "CRM interface with Kanban pipeline, leads, indicators, and automations", ai: "Customer service interface with inbox, chat, AI assistant, and metrics" } });

  var buttons = document.querySelectorAll("[data-lang]");

  function setLanguage(language) {
    var lang = translations[language] ? language : "pt";
    document.documentElement.lang = lang === "pt" ? "pt-BR" : "en";
    document.querySelectorAll("[data-i18n]").forEach(function (element) {
      element.textContent = translations[lang][element.dataset.i18n];
    });
    document.querySelectorAll("[data-i18n-html]").forEach(function (element) {
      element.innerHTML = translations[lang][element.dataset.i18nHtml];
    });
    document.querySelectorAll("[data-i18n-aria]").forEach(function (element) {
      element.setAttribute("aria-label", translations[lang][element.dataset.i18nAria]);
    });
    document.querySelectorAll("[data-i18n-title]").forEach(function (element) {
      element.title = translations[lang][element.dataset.i18nTitle];
    });
    document.querySelectorAll("[data-project-whatsapp]").forEach(function (card) {
      var project = card.dataset.projectWhatsapp;
      card.href = "https://wa.me/5519997495985?text=" + encodeURIComponent(projectMessages[lang][project]);
      card.setAttribute("aria-label", projectAria[lang][project]);
      var image = card.querySelector("[data-project-alt]");
      if (image) image.alt = projectAlts[lang][project];
    });
    buttons.forEach(function (button) {
      button.setAttribute("aria-pressed", String(button.dataset.lang === lang));
    });
    try { localStorage.setItem("jbdev-card-language", lang); } catch (error) { /* Storage may be unavailable. */ }
  }

  var initialLanguage = "pt";
  try {
    var savedLanguage = localStorage.getItem("jbdev-card-language");
    initialLanguage = savedLanguage || (navigator.language.toLowerCase().startsWith("en") ? "en" : "pt");
  } catch (error) { initialLanguage = "pt"; }

  buttons.forEach(function (button) {
    button.addEventListener("click", function () { setLanguage(button.dataset.lang); });
  });
  setLanguage(initialLanguage);
}());
