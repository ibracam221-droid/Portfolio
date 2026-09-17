document.addEventListener("DOMContentLoaded", () => {
  // Année automatique du footer
  document.querySelectorAll(".year").forEach(el => {
    el.textContent = new Date().getFullYear();
  });

  // Menu mobile accessible
  const toggle = document.querySelector(".menu-toggle");
  const links = document.querySelector(".nav-links");

  if (toggle && links) {
    toggle.addEventListener("click", () => {
      const isOpen = links.classList.toggle("open");
      toggle.setAttribute("aria-expanded", String(isOpen));
      toggle.setAttribute("aria-label", isOpen ? "Fermer le menu" : "Ouvrir le menu");
      toggle.textContent = isOpen ? "×" : "☰";
    });

    links.querySelectorAll("a").forEach(link => {
      link.addEventListener("click", () => {
        links.classList.remove("open");
        toggle.setAttribute("aria-expanded", "false");
        toggle.setAttribute("aria-label", "Ouvrir le menu");
        toggle.textContent = "☰";
      });
    });
  }

  // Validation front-end du formulaire
  const form = document.querySelector("#contactForm");
  if (!form) return;

  const fields = {
    name: {
      input: document.querySelector("#name"),
      error: document.querySelector("#nameError"),
      message: "Veuillez renseigner votre nom."
    },
    email: {
      input: document.querySelector("#email"),
      error: document.querySelector("#emailError"),
      message: "Veuillez saisir une adresse email valide."
    },
    subject: {
      input: document.querySelector("#subject"),
      error: document.querySelector("#subjectError"),
      message: "Veuillez renseigner le sujet."
    },
    message: {
      input: document.querySelector("#message"),
      error: document.querySelector("#messageError"),
      message: "Veuillez écrire un message."
    }
  };

  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  function validateField(key) {
    const field = fields[key];
    const value = field.input.value.trim();
    let valid = value.length > 0;

    if (key === "email" && value) valid = emailPattern.test(value);

    field.input.classList.toggle("invalid", !valid);
    field.error.textContent = valid ? "" : field.message;
    return valid;
  }

  Object.keys(fields).forEach(key => {
    fields[key].input.addEventListener("blur", () => validateField(key));
    fields[key].input.addEventListener("input", () => {
      if (fields[key].input.classList.contains("invalid")) validateField(key);
    });
  });

  form.addEventListener("submit", event => {
    event.preventDefault();

    const valid = Object.keys(fields).map(validateField).every(Boolean);
    const feedback = document.querySelector("#formFeedback");

    if (!valid) {
      feedback.className = "form-feedback error-message";
      feedback.textContent = "Veuillez corriger les champs indiqués avant d'envoyer le formulaire.";
      return;
    }

    // Projet front-only : aucune donnée n'est envoyée à un serveur.
    feedback.className = "form-feedback success";
    feedback.textContent = "Merci ! Votre message a été validé côté navigateur. Dans une version finale, il pourra être relié à un service d'envoi.";
    form.reset();
    Object.values(fields).forEach(field => {
      field.input.classList.remove("invalid");
      field.error.textContent = "";
    });
  });
});
