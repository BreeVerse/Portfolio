// ============================================================
//  PORTFOLIO - SCRIPT PRINCIPAL
//  Ce fichier gère toutes les fonctionnalités du portfolio :
//  - Animations au scroll
//  - Thème clair / sombre
//  - Switch de langue FR / EN
//  - Téléchargement du CV
//  - Carousel certifications
//  - Modale projets avec carousel
// ============================================================

// ============================================================
//  THÈME CLAIR / SOMBRE
//  On ajoute/retire la classe dark-theme sur <body>.
//  Le thème choisi est sauvegardé dans localStorage.
// ============================================================

function setupThemeSwitch() {
  const checkbox = document.getElementById("ThemeSwitch");
  if (!checkbox) return;

  // Appliquer le thème sauvegardé au démarrage
  const isDark = localStorage.getItem("theme") === "dark-theme";
  if (isDark) {
    checkbox.checked = true;
    document.body.classList.add("dark-theme");
  }
  switchTechImages(isDark);

  // Changer le thème quand l'utilisateur bascule le switch
  checkbox.addEventListener("change", function () {
    const dark = this.checked;
    document.body.classList.toggle("dark-theme", dark);
    localStorage.setItem("theme", dark ? "dark-theme" : "light");
    switchTechImages(dark);
    applyProjectBackgrounds();
  });
}

// ============================================================
//  SWITCH DE LANGUE FR / EN
//  Le HTML contient le français par défaut.
//  On sauvegarde ce texte au démarrage, puis on le remplace
//  par l'anglais si besoin.
// ============================================================

// Toutes les traductions anglaises
const translations = {
  "hero-label": "Full-Stack Web Developer",
  "about-title": "About Me",
  "about-text":
    "Hello, I'm Brenda, a web developer who believes interfaces should make people smile. I think the web should be as beautiful as it is functional, and that conviction drives every project I build. Outside of code, I'm a big fan of pro wrestling, anime and Japanese culture.",
  "parcours-title": "My Background",
  "about-skills":
    'Trained at <a href="https://www.holbertonschool.fr/" target="_blank" rel="noopener noreferrer" class="holberton-link" aria-label="Holberton School website (opens in new tab)">Holberton School</a>, I built solid fullstack skills : React, Node.js, Express, PostgreSQL, and I\'m currently building Irokami, an intelligent note-taking app with AI-powered quiz and flashcard generation.',
  "objective-title": "My Objective",
  "about-objective":
    "I'm looking for an internship or apprenticeship in web development to keep growing on real-world projects. Long term, my ambition is to move into cybersecurity and specialize in application security.",
  "availability-location": "Toulouse · Tours · Montauban",
  "availability-date": "Available now",
  "availability-rhythm":
    "Apprenticeship from September: 3 weeks in company / 1 week at school",
  "certif-btn": "View my certifications",
  "certif-title": "Certifications",
  "certif-agile": "Agile Methodology",
  "certif-cyber": "Cybersecurity",
  "certif-pm": "Project Management",
  "cv-download": "My resume",
  "tech-title": "Languages & Technologies",
  "projects-title": "My Projects",
  "open-project-modal": "Open ↗",
  "modal-github-label": "Open repository",
  "modal-deploy-label": "Open site",
  "modal-docs-label": "View documentation",
  "project-irokami":
    "Solo project to build an intelligent fullstack note-taking app. Allows users to create rich notes and automatically generate quizzes, flashcards and summaries using the Gemini API. Frontend built with React, TailwindCSS, TipTap, Zustand, TanStack Query and Framer Motion. Backend built with Node.js/Express, PostgreSQL via Prisma and JWT authentication. Deployed in production on Railway and Vercel.",
  "project-portfolio-title": "Personal Portfolio",
  "project-portfolio":
    "Solo project of 6 weeks aimed at creating a personal portfolio to showcase my skills and projects in web development. Built with HTML5, CSS3 and JavaScript, it includes a theme system (light/dark mode), a language switch (FR/EN) with localStorage persistence, and a structured layout with dedicated sections.",
  "project-athlia":
    "End-of-year group project of 3 people over 1.5 months to create a fitness application with 3D interactive interface. Frontend with React.js and Three.js, backend with Django and PostgreSQL, real-time data via WebSockets.",
  "project-hbnb-title": "HBnB (Airbnb Clone)",
  "project-hbnb":
    "Group project of 3 people over 6 weeks to create an Airbnb clone with web interface and RESTful API. Backend in Python with Flask and SQLAlchemy (MySQL), frontend with HTML5, CSS3 and JavaScript.",
  "project-compliments-title": "Compliment Generator",
  "project-compliments":
    "Solo project of 1 week to create a simple and interactive web application. Developed with HTML5, CSS3 and JavaScript. The interface includes an animated background and background music.",
  "project-shell-title": "C Shell",
  "project-shell":
    "Duo project of 2 weeks to create a mini-shell in C. Handles internal and external commands, redirections and pipes. Uses fork() and execve(), signal handling (Ctrl+C) and memory optimization.",
  "footer-realisation":
    "Website created by <strong>Brenda Pollagba</strong> &copy; 2026",
  "footer-credits": "Icons: icons8.fr • Background: Canva/Brenda",
};

// Stocke le texte français original pour pouvoir y revenir
let frenchContent = {};

function setupLanguageSwitch() {
  const checkbox = document.getElementById("LanguageSwitch");
  if (!checkbox) return;

  // Sauvegarder tous les textes français au démarrage
  document.querySelectorAll("[data-lang]").forEach((el) => {
    frenchContent[el.getAttribute("data-lang")] = el.innerHTML;
  });

  // Appliquer la langue sauvegardée
  const savedLang = localStorage.getItem("selectedLang") || "fr";
  if (savedLang === "en") {
    checkbox.checked = true;
    changeLanguage("en");
  }

  // Changer la langue quand l'utilisateur bascule le switch
  checkbox.addEventListener("change", function () {
    const lang = this.checked ? "en" : "fr";
    localStorage.setItem("selectedLang", lang);
    changeLanguage(lang);
  });
}

// Remplace le texte de tous les éléments [data-lang] par la langue choisie
function changeLanguage(lang) {
  document.querySelectorAll("[data-lang]").forEach((el) => {
    const key = el.getAttribute("data-lang");
    if (lang === "en" && translations[key]) {
      el.innerHTML = translations[key];
    } else if (lang === "fr" && frenchContent[key]) {
      el.innerHTML = frenchContent[key];
    }
  });
  document.documentElement.lang = lang;
}

// ============================================================
//  ANIMATIONS AU SCROLL
//  Les éléments partent invisibles (opacity:0 dans le CSS).
//  Quand ils entrent dans l'écran → on ajoute la classe .visible.
//  Quand ils ressortent par le bas → on retire .visible.
// ============================================================

function setupScrollAnimations() {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
        } else if (entry.boundingClientRect.top > 0) {
          // Sorti par le bas = pas encore vu → on réinitialise
          entry.target.classList.remove("visible");
        }
        // Sorti par le haut = déjà vu → on garde .visible
      });
    },
    { threshold: 0.1, rootMargin: "0px 0px 100px 0px" },
  );

  document
    .querySelectorAll(
      ".about-card, .Languages, .tech-card, #projects h2:not(.modal-title), .project-square",
    )
    .forEach((el) => observer.observe(el));
}

function setupScrollCue() {
  const scrollCue = document.querySelector(".scroll-down");
  if (!scrollCue) return;

  function toggleScrollCue() {
    scrollCue.classList.toggle("hidden", window.scrollY > 80);
  }

  scrollCue.addEventListener("click", () => {
    scrollCue.classList.add("hidden");
  });

  window.addEventListener("scroll", toggleScrollCue, { passive: true });
  toggleScrollCue();
}

// ============================================================
//  IMAGES TECHNOLOGIES (clair / sombre)
//  Chaque <img> a un data-dark-src.
//  On garde l'image claire d'origine, puis on change la src selon le thème.
// ============================================================

function switchTechImages(isDark) {
  // Précharger toutes les images avant de les afficher
  const imgs = document.querySelectorAll("img[data-dark-src]");
  const srcs = Array.from(imgs).map((img) => {
    if (isDark) {
      if (!img.dataset.lightSrc) img.dataset.lightSrc = img.src;
      return img.getAttribute("data-dark-src");
    } else {
      return img.dataset.lightSrc || null;
    }
  });

  // Attendre que toutes les images soient chargées puis tout switcher d'un coup
  const loads = srcs.map(
    (src) =>
      new Promise((resolve) => {
        if (!src) return resolve();
        const preload = new Image();
        preload.onload = preload.onerror = resolve;
        preload.src = src;
      }),
  );

  Promise.all(loads).then(() => {
    imgs.forEach((img, i) => {
      if (srcs[i]) img.src = srcs[i];
    });
  });
}

// ============================================================
//  TÉLÉCHARGEMENT DU CV
//  Le CV existe en français et en anglais.
//  On télécharge la bonne version selon la langue actuelle.
// ============================================================

function setupCVDownload() {
  document.querySelectorAll(".cv-button, #hero-cv-button").forEach((btn) => {
    btn.addEventListener("click", (e) => {
      e.preventDefault();
      const lang = localStorage.getItem("selectedLang") || "fr";
      const file =
        lang === "en"
          ? "Curriculum_Vitae_EN_2026.pdf"
          : "Curriculum_Vitae_FR_2026.pdf";
      const link = document.createElement("a");
      link.href = `Media/Curriculum/${file}`;
      link.download = "CV_Brenda_Pollagba.pdf";
      link.click();
    });
  });
}

// ============================================================
//  CAROUSEL (fonction réutilisable)
//  Utilisée à la fois pour les certifications et les projets.
//  Gère la navigation entre les slides et les points indicateurs.
// ============================================================

function createCarousel(track, dotsContainer, total) {
  if (!track || !dotsContainer || !Number.isInteger(total) || total <= 0) {
    return { goTo: () => {}, getCurrent: () => 0 };
  }

  let current = 0;

  function goTo(index) {
    current = (index + total) % total;
    track.style.transform = `translateX(-${current * 100}%)`;
    dotsContainer.querySelectorAll(".modal-dot").forEach((dot, i) => {
      dot.classList.toggle("active", i === current);
    });
  }

  return { goTo, getCurrent: () => current };
}

// ============================================================
//  MODALE (fonction réutilisable)
//  Ouvre et ferme une modale.
//  Utilisée pour les certifications et les projets.
// ============================================================

function openModal(modal) {
  modal.classList.remove("hidden-modal");
  document.body.style.overflow = "hidden";
}

function closeModal(modal) {
  modal.classList.add("hidden-modal");
  document.body.style.overflow = "";
}

// ============================================================
//  CAROUSEL CERTIFICATIONS
//  S'ouvre depuis le bouton "Voir mes certifications"
//  dans la carte Parcours.
// ============================================================

function setupCertifModal() {
  const modal = document.getElementById("certif-modal");
  if (!modal) return;

  const track = modal.querySelector(".certif-carousel-track");
  const slides = modal.querySelectorAll(".certif-slide");
  const dotsContainer = modal.querySelector(".certif-dots");
  const openBtn = document.getElementById("open-certif-modal");
  const closeBtn = modal.querySelector(".modal-close");

  if (!track || !dotsContainer || slides.length === 0) return;

  // Créer les points indicateurs
  slides.forEach((_, i) => {
    const dot = document.createElement("span");
    dot.className = "modal-dot" + (i === 0 ? " active" : "");
    dot.addEventListener("click", () => carousel.goTo(i));
    dotsContainer.appendChild(dot);
  });

  // Initialiser le carousel
  const carousel = createCarousel(track, dotsContainer, slides.length);

  // Navigation par flèches
  modal
    .querySelector(".certif-prev")
    ?.addEventListener("click", () => carousel.goTo(carousel.getCurrent() - 1));
  modal
    .querySelector(".certif-next")
    ?.addEventListener("click", () => carousel.goTo(carousel.getCurrent() + 1));

  // Clic sur l'image → slide suivante
  slides.forEach((slide) => {
    slide
      .querySelector("img")
      ?.addEventListener("click", () =>
        carousel.goTo(carousel.getCurrent() + 1),
      );
  });

  // Ouverture et fermeture
  openBtn?.addEventListener("click", () => {
    openModal(modal);
    carousel.goTo(0);
  });
  closeBtn?.addEventListener("click", () => closeModal(modal));
  modal.addEventListener("click", (e) => {
    if (e.target === modal) closeModal(modal);
  });
}

// ============================================================
//  MODALE PROJETS AVEC CAROUSEL
//  Quand on clique sur une carte projet, une modale s'ouvre
//  avec un carousel d'images, le titre, les tags, la description
//  et les liens GitHub / site déployé.
// ============================================================

function applyProjectBackgrounds() {
  const isDark = document.body.classList.contains("dark-theme");

  document.querySelectorAll(".project-square").forEach((sq) => {
    const images = (sq.dataset.images || "").split(",").filter(Boolean);

    if (images.length > 0) {
      sq.style.backgroundColor = isDark ? "rgba(0,0,0,0.075)" : "#ffcff59d";
      sq.style.backgroundImage = `url('${images[0]}')`;
      sq.style.backgroundSize = "contain";
      sq.style.backgroundRepeat = "no-repeat";
      sq.style.backgroundPosition = "center";
    } else {
      sq.style.background = sq.dataset.gradient || "#ccc";
    }
  });
}

function setupProjectModal() {
  const modal = document.getElementById("project-modal");
  if (!modal) return;

  const track = modal.querySelector(".modal-carousel-track");
  const dots = modal.querySelector(".modal-carousel-dots");
  const prevBtn = modal.querySelector(".modal-prev");
  const nextBtn = modal.querySelector(".modal-next");
  const titleEl = modal.querySelector(".modal-title");
  const tagsEl = modal.querySelector(".modal-tags");
  const descEl = modal.querySelector(".modal-desc");
  const githubEl = modal.querySelector(".modal-github");
  const deployEl = modal.querySelector(".modal-deploy");
  const docsEl = modal.querySelector(".modal-docs");
  const closeBtn = modal.querySelector(".modal-close");

  if (
    !track ||
    !dots ||
    !prevBtn ||
    !nextBtn ||
    !titleEl ||
    !tagsEl ||
    !descEl ||
    !githubEl ||
    !deployEl ||
    !docsEl ||
    !closeBtn
  )
    return;

  let carousel = null;

  function fillModal(square) {
    const images = (square.dataset.images || "").split(",").filter(Boolean);
    const tags = (square.dataset.tags || "")
      .split(",")
      .map((t) => t.trim())
      .filter(Boolean);

    // Titre selon la langue (lu depuis le label déjà traduit)
    titleEl.textContent =
      square.querySelector(".project-square-label")?.textContent.trim() ||
      "Projet";

    // Description (texte caché dans .sr-only)
    const descKey = square.dataset.descKey;
    const descSpan = descKey
      ? document.querySelector(`[data-lang="${descKey}"]`)
      : null;
    descEl.textContent = descSpan ? descSpan.textContent.trim() : "";

    // Tags
    tagsEl.innerHTML = "";
    tags.forEach((tag) => {
      const span = document.createElement("span");
      span.className = "modal-tag";
      span.textContent = tag;
      tagsEl.appendChild(span);
    });

    // Liens GitHub, déploiement, documentation
    githubEl.href = square.dataset.github || "#";
    const deploy = square.dataset.deploy || "";
    deployEl?.setAttribute("href", deploy);
    if (deployEl) deployEl.style.display = deploy ? "" : "none";
    const docs = square.dataset.docs || "";
    docsEl?.setAttribute("href", docs);
    if (docsEl) docsEl.style.display = docs ? "" : "none";

    // Construire le carousel
    track.innerHTML = "";
    dots.innerHTML = "";

    if (images.length > 0) {
      images.forEach((src, i) => {
        const slide = document.createElement("div");
        slide.className = "modal-carousel-slide";
        const img = document.createElement("img");
        img.src = src;
        img.alt = `Screenshot ${i + 1}`;
        img.onerror = () => {
          img.alt = `Image ${i + 1} non disponible`;
        };
        // Clic sur l'image -> slide suivante
        img.addEventListener("click", () => {
          if (carousel) carousel.goTo(carousel.getCurrent() + 1);
        });
        slide.appendChild(img);
        track.appendChild(slide);

        const dot = document.createElement("span");
        dot.className = "modal-dot" + (i === 0 ? " active" : "");
        dot.addEventListener("click", () => carousel.goTo(i));
        dots.appendChild(dot);
      });

      carousel = createCarousel(track, dots, images.length);
    } else {
      const slide = document.createElement("div");
      slide.className = "modal-carousel-slide";
      const placeholder = document.createElement("div");
      placeholder.className = "modal-carousel-placeholder";
      placeholder.style.background = square.dataset.gradient || "#ccc";
      placeholder.textContent = titleEl.textContent;
      slide.appendChild(placeholder);
      track.appendChild(slide);

      carousel = createCarousel(track, dots, 1);
    }

    track.style.transform = "translateX(0)";

    const showNav = images.length > 1;
    prevBtn.style.display = showNav ? "" : "none";
    nextBtn.style.display = showNav ? "" : "none";
  }

  // Ouvrir la modale quand on clique sur une carte
  document.addEventListener("click", (e) => {
    const sq = e.target.closest(".project-square");
    if (sq) {
      fillModal(sq);
      openModal(modal);
      closeBtn.focus({ preventScroll: true });
    }
  });

  // Navigation clavier
  document.addEventListener("keydown", (e) => {
    const sq = e.target.closest(".project-square");
    if (sq && (e.key === "Enter" || e.key === " ")) {
      e.preventDefault();
      fillModal(sq);
      openModal(modal);
      return;
    }
    if (!modal.classList.contains("hidden-modal") && carousel) {
      if (e.key === "Escape") closeModal(modal);
      if (e.key === "ArrowLeft") carousel.goTo(carousel.getCurrent() - 1);
      if (e.key === "ArrowRight") carousel.goTo(carousel.getCurrent() + 1);
    }
  });

  // Fermeture
  closeBtn.addEventListener("click", () => closeModal(modal));
  modal.addEventListener("click", (e) => {
    if (e.target === modal) closeModal(modal);
  });

  // Navigation par flèches
  prevBtn.addEventListener("click", () =>
    carousel?.goTo(carousel.getCurrent() - 1),
  );
  nextBtn.addEventListener("click", () =>
    carousel?.goTo(carousel.getCurrent() + 1),
  );
}

// ============================================================
//  DÉMARRAGE
//  On attend que le DOM soit prêt, puis on charge les sections
//  et on initialise toutes les fonctionnalités.
// ============================================================

document.addEventListener("DOMContentLoaded", () => {
  setupThemeSwitch();
  setupLanguageSwitch();
  setupScrollCue();
  setupCVDownload();
  applyProjectBackgrounds();
  setupProjectModal();
  setupCertifModal();
  // Laisser le navigateur finir le rendu avant d'observer les éléments
  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      setupScrollAnimations();
    });
  });
});
