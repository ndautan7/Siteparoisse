# Notre Dame d'Autan - Parish Website PRD

## Original Problem Statement
Full-stack parish website for "Notre Dame d'Autan" (Castanet-Tolosan, Saint-Orens area). Features public site with news, agenda, mass schedules, and a private CMS for content management.

## Tech Stack
- **Frontend**: React, Tailwind CSS, Shadcn/UI, React-Quill, Leaflet.js
- **Backend**: FastAPI, MongoDB (Motor async driver)
- **Auth**: JWT-based admin authentication

## Core Requirements
1. Public website: Homepage, News, Agenda, Mass schedules, Parish info, Bell towers map
2. CMS Admin: CRUD for News, Events, Mass Times, Funerals, Letters
3. Location management with Google Maps links
4. Interactive bell towers map (Leaflet/OpenStreetMap)
5. Versioning system displayed in footer and CMS

## What's Been Implemented

### Public Site
- Homepage with hero, news section, upcoming events, welcome message
- Agenda page with event cards and detail modals
- Mass schedules page
- Bell towers page with detail pages
- Footer with interactive map, quick links, clickable addresses
- Multiple pillar/content pages (Notre Dame d'Autan, Familles, Vie Spirituelle, etc.)
- Contact form, Newsletter subscription
- Floating action buttons, SEO component

### CMS Admin (AdminDashboard)
- **Dashboard tab** (default) - Statistics overview with 8 clickable cards showing: news, upcoming events, mass times, funerals, letters, subscribers, messages, unread messages. Recent messages preview.
- **News tab** - Full CRUD with rich text editor, image upload, default category images, bulk delete
- **Mass Times tab** - CRUD with date picker, repeat/recurring functionality, duplicate, bulk operations
- **Funerals tab** - Full CRUD with location autocomplete
- **Events tab** - Full CRUD with rich text description, time range, category
- **Letters tab** - Full CRUD with PDF upload
- **Messages tab** - View contact messages, mark as read, delete. Unread badge on tab.
- **Subscribers tab** - View newsletter subscribers, CSV export, individual/bulk delete

### Bug Fixes Applied
- Word-breaking issues from React-Quill (&nbsp;) → replaced with regular spaces
- CMS card text overflow hiding edit/delete buttons
- News edit form not pre-filling title and category
- Modal z-index conflicts with header (React Portals solution)

## Pending / Future Tasks

### P0 (Ready when user provides keys)
- **SendGrid email integration** - Forward contact form messages to ndautan6@proton.me
  - Needs: SendGrid API key + verified sender email
  - Destination: ndautan6@proton.me

### P1 (User mentioned, deferred)
- **Google Analytics (GA4)** - Track site visits and engagement
  - Needs: GA4 Measurement ID (G-XXXXXXXXXX)

### P2 (Suggested improvements)
- Search/filter in CMS lists
- Responsive tabs for mobile (scrollable)
- Content preview before publishing
- Status indicators (past/upcoming events, published/draft)
- Extract modal logic into reusable EventModal component
- Centralize stripHtml utility function

## Key Credentials
- Admin login: test/test (test environment)
- Admin DB username: admin (original), test (created for testing)

## API Endpoints
- Auth: POST /api/auth/login
- News: GET/POST /api/news, PUT/DELETE /api/news/{id}, POST /api/news/bulk-delete
- Mass Times: GET/POST /api/mass-times, PUT/DELETE /api/mass-times/{id}, POST /api/mass-times/bulk, POST /api/mass-times/bulk-delete
- Funerals: GET/POST /api/funerals, PUT/DELETE /api/funerals/{id}, POST /api/funerals/bulk-delete
- Events: GET/POST /api/events, PUT/DELETE /api/events/{id}, POST /api/events/bulk-delete
- Letters: GET/POST /api/letters, PUT/DELETE /api/letters/{id}, POST /api/letters/bulk-delete
- Contact: POST /api/contact (public), GET /api/contact (admin), PUT /api/contact/{id}/read, DELETE /api/contact/{id}
- Subscribers: POST /api/subscribers (public), GET /api/subscribers (admin), DELETE /api/subscribers/{id}, POST /api/subscribers/bulk-delete
- Stats: GET /api/stats (admin)
- Upload: POST /api/upload
- Health: GET /api/health
