document.addEventListener("DOMContentLoaded", function () {
  var config = window.SITE_CONFIG && window.SITE_CONFIG.emailJs;
  var form = document.getElementById("my-form");
  var status = document.getElementById("form-status");
  var sdkPromise;
  if (!form) return;

  function loadEmailSdk() {
    if (sdkPromise) return sdkPromise;
    sdkPromise = new Promise(function (resolve, reject) {
      if (!config || !config.publicKey) return reject(new Error("Missing EmailJS configuration"));
      function ready() {
        window.emailjs.init(config.publicKey);
        resolve(window.emailjs);
      }
      if (window.emailjs) return ready();
      var script = document.createElement("script");
      script.src = "https://cdn.emailjs.com/sdk/2.3.2/email.min.js";
      script.async = true;
      script.onload = ready;
      script.onerror = reject;
      document.head.appendChild(script);
    }).catch(function (error) { sdkPromise = null; throw error; });
    return sdkPromise;
  }
  function preload() { loadEmailSdk().catch(function () { /* Retry on submit. */ }); }
  form.addEventListener("focusin", preload, { once: true });
  if ("IntersectionObserver" in window) {
    var observer = new IntersectionObserver(function (entries) {
      if (!entries[0].isIntersecting) return;
      observer.disconnect();
      preload();
    }, { rootMargin: "400px" });
    observer.observe(form);
  }

  form.addEventListener("submit", function (event) {
    event.preventDefault();
    var button = form.querySelector('button[type="submit"]');
    if (button.disabled) return;
    button.disabled = true;
    button.textContent = window.JBI18N ? window.JBI18N.t("sending") : "Enviando...";
    status.className = "form-status";
    status.textContent = window.JBI18N ? window.JBI18N.t("sendingStatus") : "Enviando sua mensagem.";
    loadEmailSdk().then(function (sdk) {
      return sdk.sendForm(config.serviceId, config.templateId, form);
    }).then(function () {
      status.className = "form-status is-success";
      status.textContent = window.JBI18N ? window.JBI18N.t("success") : "Mensagem enviada com sucesso. A JB DEV retornará em breve.";
      form.reset();
    }).catch(function () {
      status.className = "form-status is-error";
      var unavailable = !window.emailjs;
      status.textContent = window.JBI18N ? window.JBI18N.t(unavailable ? "unavailable" : "error") :
        (unavailable ? "O formulário está indisponível agora. Fale com a JB DEV pelo WhatsApp." : "Não foi possível enviar agora. Tente novamente ou fale pelo WhatsApp.");
    }).finally(function () {
      button.disabled = false;
      button.textContent = window.JBI18N ? window.JBI18N.t("submit") : "Enviar mensagem";
    });
  });
});
