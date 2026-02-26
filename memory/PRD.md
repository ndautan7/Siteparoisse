# PRD - Site Paroisse Notre Dame d'Autan

## Enonce du probleme original
Creation et amelioration iterative d'un site web pour la paroisse Notre Dame d'Autan, comprenant la gestion de l'equipe pastorale, les pages des 16 eglises (clochers), et les informations de contact.

## Architecture technique
- **Frontend**: React (Vite), TailwindCSS, Shadcn/UI
- **Backend**: FastAPI
- **Base de donnees**: MongoDB (contact_messages, news, mass_times, funerals, admins)
- **Cartographie**: Leaflet/OpenStreetMap (carte multi-marqueurs), Google Maps iframe (pages details)

## Fonctionnalites implementees

### Equipe pastorale
- Carousel avec photos, modales de details

### Mot du cure (Welcome Message)
- Composant sur la page d'accueil

### Section "Nos Clochers" (16 eglises)
- Fichier de donnees, pages de detail dynamiques, carte Leaflet, Google Maps iframe

### Page Secretariat
- Presentation Corinne, deux centres paroissiaux, adresses cliquables
- Formulaire de contact fonctionnel (POST /api/contact) avec validation et message de confirmation

### Pages de contenu (ContentPage.js)
- Configuration centralisee dans des fichiers *Config.js
- Modales detaillees pour chaque activite/groupe
- Espacement standardise (flexbox + gap)

### Corrections mobile (Fev 2026)
- Vignettes responsives (vertical mobile, horizontal desktop)
- Vie Economique: 1 carte/ligne mobile, derniere vignette impaire centree
- Modales: slide-up depuis le bas, padding adapte, boutons fermeture visibles
- Menu hamburger ameliore: cibles tactiles agrandies, lien contact, overscroll-contain

### Taches haute priorite (Fev 2026) - TERMINEES
- Formulaire de contact fonctionnel
- Modales mobile verificees et corrigees
- Navigation mobile verificee et amelioree

### Fonctionnalites ajoutees (Fev 2026)
- **Lire la suite**: Modal pour articles longs dans la section Actualites (image, titre, date, contenu complet, boutons fermeture)
- **Recherche complete**: 100+ entrees indexees incluant toutes les vignettes et modales de chaque section (Entraide, Groupes, Meditation, Ressources, etc.)

### Ameliorations visuelles et SEO (Fev 2026) - TERMINEES
- **Hauteur hero mobile**: Reduite a 40vh sur sous-pages (55vh desktop), 60vh sur accueil (80vh desktop)
- **Animations fade-in**: Sections de contenu apparaissent en fondu au scroll (IntersectionObserver + CSS transitions)
- **SEO francais**: lang="fr", balises title dynamiques par page, meta descriptions en francais, attributs alt descriptifs en francais, meta OG avec locale fr_FR

## Fichiers cles
- `frontend/src/pages/ContentPage.js` - Page de contenu principale (vignettes, modales)
- `frontend/src/components/NewsSection.js` - Section actualites avec modal "Lire la suite"
- `frontend/src/components/Header.js` - Header + navigation mobile + recherche complete
- `frontend/src/components/ResourceModal.js` - Modal responsive des ressources
- `frontend/src/pages/Secretariat.js` - Page secretariat + formulaire contact
- `frontend/src/components/SEO.js` - Composant SEO (title, meta description, OG tags)
- `frontend/src/components/FadeIn.js` - Composant animation fade-in au scroll
- `frontend/src/hooks/useFadeIn.js` - Hook IntersectionObserver pour le fade-in
- `backend/server.py` - API FastAPI (contact, news, mass-times, funerals)

## Patterns techniques importants
- **Espacement**: NE PAS utiliser `space-y-*` de Tailwind. Utiliser flexbox + gap
- **Vignettes mobile**: flex flex-col items-center text-center sm:flex-row sm:items-start sm:text-left
- **Modales mobile**: items-end sm:items-center pour slide-up depuis le bas
- **Hero responsive**: h-[40vh] sm:h-[55vh] pour sous-pages, min-h-[60vh] sm:min-h-[80vh] pour accueil
- **Fade-in**: Classe CSS `fade-in-section` + `is-visible` via IntersectionObserver

## API Endpoints
- POST /api/contact - Envoyer un message de contact (public)
- GET /api/contact - Lister les messages (admin auth requise)
- POST /api/auth/login - Connexion admin
- CRUD /api/news, /api/mass-times, /api/funerals

## Backlog priorise

### P0 - Termine
- [x] Formulaire de contact fonctionnel
- [x] Modales mobile
- [x] Menu navigation mobile
- [x] "Lire la suite" pour les actualites
- [x] Recherche complete (toutes vignettes et modales indexees)
- [x] Numeros de telephone cliquables (click-to-call)

### P1 - Termine
- [x] Reduire hauteur images hero sur mobile (40vh sous-pages, 60vh accueil)
- [x] Animations fade-in au scroll
- [x] SEO: lang="fr", balises title et meta par page, alt images en francais

### P2 - Priorite basse
- [ ] Page Agenda centralisee pour les evenements
- [ ] Composant ContentWrapper reutilisable
- [ ] Refactoring ContentPage.js en sous-composants
- [ ] Newsletter fonctionnelle

## Etat actuel
- **Fonctionnel**: Navigation, pages clochers, equipe pastorale, secretariat, formulaire contact, toutes les pages de contenu, version mobile, modales mobile, menu mobile, "Lire la suite", recherche complete, SEO, animations
- **Non fonctionnel**: Newsletter
- **Placeholder**: Horaires de messe

## Langue preferee de l'utilisateur
Francais
