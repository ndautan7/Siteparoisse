# PRD - Paroisse Notre Dame d'Autan

## Problème Original
Site web paroissial pour Notre Dame d'Autan (Castanet-Tolosan / Saint-Orens). Application full-stack React + FastAPI + MongoDB.

## Architecture
- **Frontend:** React, TailwindCSS, Shadcn/UI, Lucide icons
- **Backend:** FastAPI, MongoDB
- **Intégrations:** Resend (formulaire contact), Google Maps

## Ce qui est implémenté

### Fonctionnalités Core
- Site paroissial complet avec navigation multi-pages
- Formulaire de contact fonctionnel (Resend)
- Recherche site complète, responsive mobile

### Gestion Admin (CRUD) - 5 onglets
- Actualités, Horaires des messes, Funérailles, Événements, Lettres

### Page Agenda (Feb 2026)
- `/agenda` : filtres par catégorie, événements groupés par mois
- Section "Prochains événements" sur la page d'accueil

### Actualités (Feb 2026)
- Vignettes cliquables, page archives `/actualites`

### La Lettre du Père Daniel (Feb 2026)
- `/lettre-pere-daniel` : inscription newsletter + liste des lettres publiées
- Inscription stockée en base (POST /api/subscribers)
- CRUD admin pour publier/modifier/supprimer les lettres
- Accessible via menu "Notre Dame d'Autan"

### Page Servir (Feb 2026)
- `/servir` : 13 vignettes de services (Chorale, Lecteurs, Art Floral, Servants, Catéchisme, Aumônerie, Éveil à la Foi, Alpha, Écoute, Visite malades, Secours Catholique, Funérailles, Accueil)
- CTA "Nous contacter", accessible via menu "Je veux..."

### Footer (Feb 2026)
- Numéros Castanet + Saint-Orens
- Newsletter avec stockage backend des emails

### Améliorations Visuelles
- Hero 40vh mobile (sous-pages), 80vh accueil
- Animations fade-in au scroll
- Icônes sociales en haut à droite sur mobile
- Bouton téléphone flottant sur toutes les pages

### SEO
- Langue FR, titres/metas dynamiques, sitemap.xml, robots.txt

## API Endpoints
- GET/POST /api/letters, PUT/DELETE /api/letters/{id}
- POST /api/subscribers, GET /api/subscribers (auth)
- GET/POST /api/events, PUT/DELETE /api/events/{id}
- GET/POST /api/news, PUT/DELETE /api/news/{id}
- GET/POST /api/mass-times, PUT/DELETE /api/mass-times/{id}
- GET/POST /api/funerals, PUT/DELETE /api/funerals/{id}
- POST /api/auth/login, GET/POST /api/contact

## Notes Techniques
- Ne PAS utiliser react-helmet-async
- Admin: admin / admin123
