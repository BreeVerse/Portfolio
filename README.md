<div align="center">

# ✦ Portfolio : Brenda Pollagba ✦

**Développeuse Web Full-Stack**

[![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=flat-square&logo=html5&logoColor=white)](https://developer.mozilla.org/fr/docs/Web/HTML)
[![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=flat-square&logo=css3&logoColor=white)](https://developer.mozilla.org/fr/docs/Web/CSS)
[![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=flat-square&logo=javascript&logoColor=black)](https://developer.mozilla.org/fr/docs/Web/JavaScript)

🌸 **[brendapollagba.dev](https://brendapollagba.dev)**

</div>

---

## ✦ À propos

Portfolio personnel conçu et développé from scratch en HTML5, CSS3 et JavaScript vanilla — sans framework, sans dépendances.

---

## ✦ Fonctionnalités

- Thème clair / sombre avec persistance via `localStorage`
- Switch de langue FR / EN avec persistance via `localStorage`
- Sections chargées dynamiquement (About, Projets, Footer injectés dans `Home.html`)
- Carousel de certifications et carousel de screenshots projets
- Modale projets avec liens GitHub et déploiement
- Téléchargement du CV
- Design responsive (mobile → desktop)
- Accessibilité : structure sémantique, `aria-label`, `aria-hidden`, navigation clavier

---

## ✦ Stack

![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=flat-square&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=flat-square&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=flat-square&logo=javascript&logoColor=black)

---

## ✦ Structure du projet

```
Portfolio/
├── Pages/
│   ├── Home.html          # Page principale (point d'entrée)
│   ├── About_me.html      # Section À propos
│   ├── Project.html       # Section Projets
│   └── Footer.html        # Footer
├── Style/
│   └── Style.css          # Styles globaux + dark theme + responsive
├── Script/
│   └── Srcript.js         # Script principal
└── Media/
    ├── PageLayout/        # Logo, backgrounds
    ├── Technologies/      # Icônes technologies (Black/ White/)
    ├── Projects/          # Screenshots des projets
    ├── Certifications/    # Images des certifications
    └── Curriculum/        # CV
```

---

## ✦ Architecture

`Home.html` est la seule page chargée par le navigateur. Au chargement, le script récupère `About_me.html`, `Project.html` et `Footer.html` via `fetch()` et injecte leur contenu dans les placeholders correspondants.

Cela permet de modifier chaque section indépendamment sans toucher à la page principale.

> ⚠️ Les `fetch()` nécessitent un serveur local (ex. [Live Server](https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer)) — ouvrir `Home.html` directement depuis l'explorateur de fichiers ne fonctionnera pas.

---

## ✦ Lancer le projet

```bash
git clone https://github.com/BreeVerse/Portfolio.git
cd Portfolio
# Ouvrir Pages/Home.html avec Live Server
```

---

<div align="center">

Fait avec 🩷 par **Brenda Pollagba** · [brendapollagba.dev](https://brendapollagba.dev) · [LinkedIn](https://www.linkedin.com/in/brenda-pollagba) · [GitHub](https://github.com/BreeVerse)

</div>
