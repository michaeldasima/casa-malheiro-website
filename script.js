const header = document.querySelector("[data-header]");
const nav = document.querySelector("[data-nav]");
const navToggle = document.querySelector("[data-nav-toggle]");
const heroVideo = document.querySelector("[data-hero-video]");
const contactForm = document.querySelector("[data-contact-form]");
const formStatus = document.querySelector("[data-form-status]");
const houseCards = document.querySelectorAll("[data-house-card]");
const contactEmail = "jmalheiro@hotmail.ch";
const text = {
  more: document.body.dataset.moreLabel || "Mehr erfahren",
  less: document.body.dataset.lessLabel || "Weniger anzeigen",
  houseRequired: document.body.dataset.houseRequired || "Bitte wählen Sie mindestens ein Haus aus.",
  mailIntro: document.body.dataset.mailIntro || "Neue Anfrage über die Casa-Malheiro-Webseite",
  house: document.body.dataset.mailHouse || "Gewünschtes Haus",
  name: document.body.dataset.mailName || "Name",
  email: document.body.dataset.mailEmail || "E-Mail",
  phone: document.body.dataset.mailPhone || "Telefon",
  language: document.body.dataset.mailLanguage || "Sprache",
  arrival: document.body.dataset.mailArrival || "Anreise",
  departure: document.body.dataset.mailDeparture || "Abreise",
  adults: document.body.dataset.mailAdults || "Erwachsene",
  children: document.body.dataset.mailChildren || "Kinder",
  message: document.body.dataset.mailMessage || "Nachricht",
  subject: document.body.dataset.mailSubject || "Casa Malheiro Anfrage",
  prepared: document.body.dataset.mailPrepared || "Ihre E-Mail-Anfrage wurde vorbereitet. Bitte senden Sie die E-Mail im nächsten Schritt ab."
};

const updateHeader = () => {
  header?.classList.toggle("is-scrolled", window.scrollY > 24);
};

updateHeader();
window.addEventListener("scroll", updateHeader, { passive: true });

navToggle?.addEventListener("click", () => {
  const isOpen = nav?.classList.toggle("is-open");
  document.body.classList.toggle("nav-open", Boolean(isOpen));
  navToggle.setAttribute("aria-expanded", String(Boolean(isOpen)));
});

nav?.addEventListener("click", (event) => {
  if (event.target instanceof HTMLAnchorElement) {
    nav.classList.remove("is-open");
    document.body.classList.remove("nav-open");
    navToggle?.setAttribute("aria-expanded", "false");
  }
});

if (heroVideo) {
  const hideVideo = () => heroVideo.classList.add("is-hidden");

  heroVideo.addEventListener("error", hideVideo);

  heroVideo.play().catch(() => {
    hideVideo();
  });
}

houseCards.forEach((card) => {
  const toggle = card.querySelector("[data-house-toggle]");
  const panel = card.querySelector("[data-house-panel]");

  toggle?.addEventListener("click", () => {
    const shouldOpen = !card.classList.contains("is-expanded");

    houseCards.forEach((otherCard) => {
      const otherToggle = otherCard.querySelector("[data-house-toggle]");
      const otherPanel = otherCard.querySelector("[data-house-panel]");
      otherCard.classList.remove("is-expanded");
      otherToggle?.setAttribute("aria-expanded", "false");
      if (otherToggle) {
        otherToggle.textContent = text.more;
      }
      if (otherPanel) {
        otherPanel.hidden = true;
      }
    });

    if (shouldOpen) {
      card.classList.add("is-expanded");
      toggle.setAttribute("aria-expanded", "true");
      toggle.textContent = text.less;
      if (panel) {
        panel.hidden = false;
      }
    }
  });
});

contactForm?.addEventListener("submit", (event) => {
  event.preventDefault();

  const data = new FormData(contactForm);
  const houses = data.getAll("house");

  if (!houses.length) {
    formStatus.textContent = text.houseRequired;
    return;
  }

  const value = (name) => String(data.get(name) || "").trim();
  const lines = [
    text.mailIntro,
    "",
    `${text.house}: ${houses.join(", ")}`,
    `${text.name}: ${value("name")}`,
    `${text.email}: ${value("email")}`,
    `${text.phone}: ${value("phone") || "-"}`,
    `${text.language}: ${value("language") || "-"}`,
    `${text.arrival}: ${value("arrival") || "-"}`,
    `${text.departure}: ${value("departure") || "-"}`,
    `${text.adults}: ${value("adults") || "-"}`,
    `${text.children}: ${value("children") || "0"}`,
    "",
    `${text.message}:`,
    value("message") || "-"
  ];

  const subject = `${text.subject}: ${houses.join(", ")}`;
  const mailto = `mailto:${contactEmail}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(lines.join("\n"))}`;

  formStatus.textContent = text.prepared;
  window.location.href = mailto;
});


const lightbox = document.querySelector("[data-lightbox]");
const lightboxImage = document.querySelector("[data-lightbox-image]");
const lightboxClose = document.querySelector("[data-lightbox-close]");

document.addEventListener("click", (event) => {
  const image = event.target instanceof HTMLImageElement ? event.target : null;

  if (!image?.closest(".expanded-gallery") || !lightbox || !lightboxImage) {
    return;
  }

  lightboxImage.src = image.currentSrc || image.src;
  lightboxImage.alt = image.alt;
  lightbox.hidden = false;
  document.body.classList.add("lightbox-open");
});

const closeLightbox = () => {
  if (!lightbox || !lightboxImage) {
    return;
  }

  lightbox.hidden = true;
  lightboxImage.src = "";
  document.body.classList.remove("lightbox-open");
};

lightboxClose?.addEventListener("click", closeLightbox);
lightbox?.addEventListener("click", (event) => {
  if (event.target === lightbox) {
    closeLightbox();
  }
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && !lightbox?.hidden) {
    closeLightbox();
  }
});
