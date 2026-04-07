document.addEventListener("DOMContentLoaded", function () {
    var cfg = window.SITE_CONFIG && window.SITE_CONFIG.emailJs;
    if (!cfg || !cfg.publicKey) {
        console.error("SITE_CONFIG.emailJs não definido.");
        return;
    }

    emailjs.init(cfg.publicKey);

    var myForm = document.getElementById("my-form");
    if (!myForm) return;

    myForm.addEventListener("submit", function (event) {
        event.preventDefault();

        emailjs.sendForm(cfg.serviceId, cfg.templateId, this).then(
            function () {
                alert("Mensagem enviada com sucesso!");
                myForm.reset();
            },
            function (error) {
                var msg =
                    error && error.text
                        ? error.text
                        : error && error.message
                          ? String(error.message)
                          : "tente novamente mais tarde.";
                alert("Erro ao enviar a mensagem: " + msg);
            }
        );
    });
});
