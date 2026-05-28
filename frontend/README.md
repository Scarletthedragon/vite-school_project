# Frontend (Vue 3 + Vite)

This folder contains the Dragons Den client application.

## Tech Stack

- Vue 3
- Vue Router 4
- Vite

## Scripts

- npm run dev: start local dev server
- npm run build: create production build
- npm run preview: preview production build locally

## Environment

- VITE_API_URL: backend base URL

If VITE_API_URL is not set, the app defaults to http://localhost:8000.

## Application Flow

- Entry file: src/main.js
- App shell: src/App.vue
- Router config: src/router/index.js

Protected routes use a simple route guard that checks the in-memory/localStorage user session.

## Routes

- /login
- /
- /games/:slug
- /profile
- /missions
- /contact

## Core Modules

- src/auth.js
	- login
	- register
	- continueAsVisitor
	- restoreSession
- src/scores.js
	- leaderboard fetch
	- add/remove/award points
	- admin delete user
	- self delete account
- src/messageBoard.js
	- fetch latest 30 messages
	- post new message
- src/i18n.js
	- Latvian and English translations

## Views

- src/views/Login.vue: login/register/visitor entry
- src/views/Home.vue: game cards, leaderboard, message board sidebar
- src/views/GameCategory.vue: category quizzes with score updates
- src/views/Profile.vue: account details and admin panel actions
- src/views/About.vue: missions/game library information
- src/views/Contact.vue: contact form and FAQ

## Local Run

1. npm install
2. Set VITE_API_URL (optional if backend is on localhost:8000)
3. npm run dev

## Build Output

- Vite build output is generated in frontend/dist.

## Deployment

- Vercel config is in vercel.json.
- The rewrite rule maps all paths to /index.html for SPA routing.
