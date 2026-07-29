document.addEventListener("DOMContentLoaded", function () {
  var config = window.SITE_CONFIG && window.SITE_CONFIG.emailJs;
  var form = document.getElementById("my-form");
  var status = document.getElementById("form-status");
  if (!form) return;
  if (!config || !config.publicKey || typeof window.emailjs === "undefined") {
    form.addEventListener("submit", function (event) {
      event.preventDefault();
      status.className = "form-status is-error";
      status.textContent = "O formulário está indisponível agora. Fale com a JB DEV pelo WhatsApp.";
    });
    return;
  }

  window.emailjs.init(config.publicKey);
  form.addEventListener("submit", function (event) {
    event.preventDefault();
    var button = form.querySelector('button[type="submit"]');
    button.disabled = true;
    button.textContent = "Enviando...";
    status.className = "form-status";
    status.textContent = "Enviando sua mensagem.";

    window.emailjs.sendForm(config.serviceId, config.templateId, form).then(
      function () {
        status.className = "form-status is-success";
        status.textContent = "Mensagem enviada com sucesso. A JB DEV retornará em breve.";
        form.reset();
      },
      function () {
        status.className = "form-status is-error";
        status.textContent = "Não foi possível enviar agora. Tente novamente ou fale pelo WhatsApp.";
      }
    ).finally(function () {
      button.disabled = false;
      button.textContent = "Enviar mensagem";
    });
  });
});
