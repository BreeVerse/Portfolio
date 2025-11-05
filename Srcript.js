/* =================== TRADUCTIONS =================== */

/* Données de traduction en anglais */
const translations = {
  en: {
    "home-title": "Welcome to my Portfolio",
    "about-title": "About Me",
    "about-greeting": "Hello, I'm Brenda,",
    "about-text":
      "A junior web developer who is passionate about projects that make people smile and who wants to specialise in cybersecurity. I recently discovered my passion for development and I am fascinated by creating websites and solving technical problems. Outside of development, I enjoy a variety of hobbies, including pro wrestling, Japanese culture and sometimes video games.",
    "parcours-title": "My Background",
    "about-skills":
      'I am a passionate web developer, currently seeking an apprenticeship in cybersecurity. Trained at <a href="https://www.holbertonschool.fr/" target="_blank" rel="noopener noreferrer" class="holberton-link" aria-label="Holberton School website (opens in new tab)">Holberton School</a>, I have gained solid full-stack development skills including technologies such as JavaScript, Python, C, React and Django. My goal is to combine my development skills with expertise in cybersecurity.',
    "objective-title": "My Objective",
    "about-objective":
      "Today, my goal is to find an internship or apprenticeship that will allow me to continue improving and applying my skills by contributing to concrete cybersecurity projects. The aim is to specialise in cybersecurity and become a forensics analyst.",
    "cv-download": "Download my resume",
    "tech-title": "Languages & Technologies",
    "projects-title": "My Projects",
    "project-portfolio-title": "Personal Portfolio",
    "project-portfolio":
      "Solo project of 6 weeks aimed at creating a personal portfolio to showcase my skills and projects in web development.<br>Development of an interactive and responsive website serving as a showcase to present my projects and skills. Built with HTML5, CSS3 and JavaScript, it includes a theme system (light/dark mode), a language switch (FR/EN) with localStorage persistence, and a structured layout with dedicated sections. Projects are displayed as interactive cards with hover effects, and links to project github repositories, as well as a button to download my resume in PDF format.",
    "project-athlia-title": "Athlia",
    "project-athlia":
      "End-of-year group project of 3 people over 1.5 months to create a fitness application with 3D interactive interface.<br>The front-end is developed with React.js, CSS for the interface and Three.js for 3D modeling of exercises and courses. The back-end relies on Django with a three-layer architecture (Presentation, Business Logic, Persistence) and the use of the Facade Pattern to simplify interactions. The database is managed with PostgreSQL, ensuring user profile management and performance tracking (sessions, progress). The application integrates real-time dynamic data via WebSockets, and detailed technical documentation including mockups, user stories, REST API and UML diagrams.",
    "project-hbnb-title": "HBnB (Airbnb Clone)",
    "project-hbnb":
      "Group project of 3 people over 6 weeks to create an Airbnb clone with web interface and RESTful API.<br>The back-end is developed in Python with the Flask framework, using SQLAlchemy for relational database management (MySQL). The RESTful API allows management of users, accommodations, reservations and reviews. The front-end is developed with HTML5 and CSS3 for the front-end and JavaScript for dynamic interactions. The project follows a modular architecture, uses DOM manipulation for real-time updates, and integrates advanced features like interactive forms and detail modals.",
    "project-compliments-title": "Compliment Generator",
    "project-compliments":
      "Solo project of 1 week to create a simple and interactive web application.<br>Developed with HTML5 and CSS3 for structure and styling, and JavaScript for the random generation logic of compliments, stored directly in a few lines of code. The interface includes an animated background and background music to enhance the user experience. The project is interactive, with a button to generate new compliments and dynamic display on the page.",
    "project-shell-title": "C Shell",
    "project-shell":
      "Duo project of 2 weeks to create a mini-shell in C.<br>Development of an interactive command-line interpreter (mini-shell) in C language capable of executing system commands interactively. Handles internal commands (cd, exit) and external commands, redirections (&gt;, &lt;) and pipes (|). Creates child processes with fork() and executes commands using execve(). Signal handling (Ctrl+C) and memory optimization.",
    "portfolio-desc":
      "Development of an interactive and responsive website serving as a showcase to present my projects and skills. Built with HTML5, CSS3, and JavaScript, it includes a theme switch (light/dark mode) with dynamic toggle, a language switch (FR/EN) with persistence using localStorage, and a structured layout with dedicated sections (Home, About, Projects, Contact). Projects are displayed as interactive cards with hover effects, and a button allows downloading my CV in PDF format.",
  },
};

/* Stockage du contenu français original */
let originalContent = {};

/* =================== FONCTIONS DE TRADUCTION =================== */

/* Fonction pour sauvegarder le contenu français original */
function saveOriginalContent() {
  document.querySelectorAll("[data-lang]").forEach((el) => {
    const key = el.getAttribute("data-lang");
    if (!key) {
      console.error("Élément sans attribut data-lang trouvé");
      return;
    }
    // Utiliser innerHTML au lieu de textContent pour sauvegarder le HTML
    originalContent[key] = el.innerHTML;
  });
}

/* Fonction pour traduire la page */
function translatePage(lang) {
  if (!lang) {
    console.error("Langue non spécifiée pour la traduction");
    return;
  }

  if (lang === "en") {
    /* Traduire en anglais */
    if (!translations.en) {
      console.error("Traductions anglaises non disponibles");
      return;
    }

    document.querySelectorAll("[data-lang]").forEach((el) => {
      const key = el.getAttribute("data-lang");
      if (!key) {
        console.error("Élément sans clé data-lang trouvé");
        return;
      }
      if (translations.en && translations.en[key]) {
        // Utiliser innerHTML au lieu de textContent pour préserver le HTML
        el.innerHTML = translations.en[key];
      } else {
        console.error(`Traduction manquante pour la clé: ${key}`);
      }
    });
  } else {
    /* Revenir au français original */
    if (Object.keys(originalContent).length === 0) {
      console.error("Contenu français original non sauvegardé");
      return;
    }

    document.querySelectorAll("[data-lang]").forEach((el) => {
      const key = el.getAttribute("data-lang");
      if (!key) {
        console.error("Élément sans clé data-lang trouvé");
        return;
      }
      if (originalContent[key]) {
        // Utiliser innerHTML au lieu de textContent pour préserver le HTML
        el.innerHTML = originalContent[key];
      } else {
        console.error(`Contenu original manquant pour la clé: ${key}`);
      }
    });
  }
}

/* =================== FONCTIONS D'ACCESSIBILITÉ =================== */

/* Fonction pour annoncer aux lecteurs d'écran */
function announceToScreenReader(message) {
  if (!message) {
    console.error("Message d'annonce vide");
    return;
  }

  const announcement = document.createElement("div");
  announcement.setAttribute("aria-live", "polite");
  announcement.setAttribute("aria-atomic", "true");
  announcement.className = "sr-only";
  announcement.textContent = message;

  document.body.appendChild(announcement);

  setTimeout(() => {
    if (document.body.contains(announcement)) {
      document.body.removeChild(announcement);
    }
  }, 1000);
}

/* Fonction pour mettre à jour l'attribut lang du HTML */
function updateLanguageAttribute(lang) {
  const htmlElement = document.documentElement; // Plus fiable que getElementById
  if (htmlElement) {
    htmlElement.setAttribute("lang", lang);
  }
}

/* =================== MISE À JOUR DE LA FONCTION DE TRADUCTION =================== */

/* Fonction pour changer de langue (mise à jour avec accessibilité) */
function switchLanguage() {
  const checkbox = document.getElementById("LanguageSwitch");
  if (!checkbox) {
    console.error("Checkbox LanguageSwitch non trouvé");
    return;
  }

  const lang = checkbox.checked ? "en" : "fr";

  // Sauvegarder la préférence
  localStorage.setItem("selectedLang", lang);

  // Appliquer la traduction
  translatePage(lang);

  // Mettre à jour l'attribut lang pour l'accessibilité
  updateLanguageAttribute(lang);

  // Annoncer le changement aux lecteurs d'écran
  const announcement =
    lang === "en"
      ? "Language changed to English"
      : "Langue changée en français";
  announceToScreenReader(announcement);

  console.log(`Langue changée vers: ${lang.toUpperCase()}`);
}

/* =================== FONCTIONS D'INITIALISATION =================== */

/* Fonction pour initialiser le switch de thème */
function initThemeSwitch() {
  const toggle = document.getElementById("ThemeSwitch");

  if (!toggle) {
    console.error("Element avec ID 'ThemeSwitch' non trouvé");
    return;
  }

  /* Vérifier le thème sauvegardé */
  const savedTheme = localStorage.getItem("theme");
  if (savedTheme === "dark-theme") {
    document.body.classList.add("dark-theme");
    toggle.checked = true;
  }

  /* Event listener pour le changement de thème */
  toggle.addEventListener("change", () => {
    const isDark = toggle.checked;

    if (isDark) {
      document.body.classList.add("dark-theme");
      localStorage.setItem("theme", "dark-theme");
    } else {
      document.body.classList.remove("dark-theme");
      localStorage.setItem("theme", "light");
    }

    // Annoncer le changement de thème aux lecteurs d'écran
    const currentLang = localStorage.getItem("selectedLang") || "fr";
    const announcement = isDark
      ? currentLang === "en"
        ? "Dark theme activated"
        : "Thème sombre activé"
      : currentLang === "en"
      ? "Light theme activated"
      : "Thème clair activé";

    announceToScreenReader(announcement);
  });
}

/* Fonction pour initialiser le switch de langue (mise à jour) */
function initLanguageSwitch() {
  const checkbox = document.getElementById("LanguageSwitch");

  if (!checkbox) {
    console.error("Element avec ID 'LanguageSwitch' non trouvé");
    return;
  }

  /* Sauvegarder le contenu français original avant toute modification */
  saveOriginalContent();

  /* Charger la langue sauvegardée */
  const savedLang = localStorage.getItem("selectedLang") || "fr";

  /* Mettre à jour l'état du checkbox */
  checkbox.checked = savedLang === "en";

  /* Mettre à jour l'attribut lang initial */
  updateLanguageAttribute(savedLang);

  /* Appliquer la traduction si la langue sauvée est l'anglais */
  if (savedLang === "en") {
    translatePage("en");
  }

  /* Event listener pour le changement de langue */
  checkbox.addEventListener("change", switchLanguage);
}

/* Fonction pour initialiser le bouton de téléchargement CV */
function initCVDownload() {
  const cvButton = document.querySelector(".cv-button");

  if (!cvButton) {
    console.error("Bouton CV non trouvé");
    return;
  }

  /* Event listener pour le téléchargement du CV */
  cvButton.addEventListener("click", (e) => {
    e.preventDefault();
    downloadCV();
  });
}

/* =================== INITIALISATION =================== */

/* Initialiser tout quand la page est chargée */
document.addEventListener("DOMContentLoaded", () => {
  initThemeSwitch();
  initLanguageSwitch();
  initCVDownload();
});
