# 🎬 CineFave – Full‑Stack React Movie Explorer with Real‑Time Analytics

A production‑grade movie discovery app built with **React 18**, **Zustand**, and **Supabase**.  
It demonstrates async data fetching, global state management, serverless analytics, and client‑side routing – all deployed on GitHub Pages.

[![React](https://img.shields.io/badge/React-18-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://react.dev)
[![Vite](https://img.shields.io/badge/Vite-5-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev)
[![Zustand](https://img.shields.io/badge/Zustand-4-543DE0?style=for-the-badge&logo=zustand&logoColor=white)](https://zustand-demo.pmnd.rs)
[![Supabase](https://img.shields.io/badge/Supabase-2-3ECF8E?style=for-the-badge&logo=supabase&logoColor=white)](https://supabase.com)
[![React Router](https://img.shields.io/badge/React_Router-6-CA4245?style=for-the-badge&logo=reactrouter&logoColor=white)](https://reactrouter.com)
[![TMDB API](https://img.shields.io/badge/TMDB_API-v3-01B4E4?style=for-the-badge&logo=themoviedatabase&logoColor=white)](https://developer.themoviedb.org)

---

### 🔗 Live Demo & Source
- **Live Demo:** [https://alexandredark-glitch.github.io/First-React-Project/](https://alexandredark-glitch.github.io/First-React-Project/)
- **Source Code:** [https://github.com/Alexandredark-glitch/First-React-Project](https://github.com/Alexandredark-glitch/First-React-Project)

---

## ✨ Core Features

| Feature | Technical Implementation |
|---------|--------------------------|
| 🔍 **Form‑Based Search** | Controlled input and submit handler trigger a TMDB API call, handling loading, empty‑result, and network‑error states. |
| ❤️ **Persistent Favorites** | Zustand’s `persist` middleware automatically saves favorites to `localStorage`. The UI toggles an `active` class instantly without extra re‑renders. |
| 📊 **Search Analytics** | Every new search term is upserted into a Supabase `metrics` table with a counter. The home page displays the top 6 trending searches by count. |
| 🎯 **Popular Movies Feed** | On initial load, the app fetches TMDB’s `/movie/popular` endpoint and renders results in a responsive grid. |
| 🧩 **Component Design** | `Home` manages its own data fetching and state; `Favorite` reads from the global store; `MovieCard` is a presentational component that connects directly to the store. |
| 🌀 **Animated Favicon** | A vanilla JS canvas script outside React’s render cycle rotates an SVG icon at ~25 fps, blending imperative and declarative code. |

---

## 🧰 Tech Stack & Why These Choices

- **React 18 + Vite** – Fast development environment, modern hooks (`useState`, `useEffect`) for state and side effects.
- **Zustand** – Minimalist state management with built‑in `persist` middleware; no boilerplate, automatic `localStorage` sync.
- **Supabase** – Serverless PostgreSQL database used as an analytics backend. Performs upserts on search terms and serves top searches with an ordered, limited query.
- **React Router v6** – Client‑side routing with nested routes and a `basename` for easy GitHub Pages deployment.
- **TMDB API** – External data source for movie metadata (popular, search).
- **CSS (custom)** – Responsive grid and flexbox layouts with media queries; no CSS framework dependency.

---

## ⚙️ How It Works

**Data flow:**

1. On mount, `Home` fetches popular movies from TMDB and trending searches from Supabase simultaneously.
2. When the user searches, a controlled form submission calls TMDB’s search endpoint. If results exist, the search term and first result are sent to Supabase for analytics (upsert).
3. Any component can read/write favorites via the Zustand store. Changes are immediately reflected in the UI and persisted to `localStorage`.
4. The `Favorite` route simply reads the favorites array from the store and renders the same `MovieCard` components.

**Error & loading handling:**

- `Home` uses three states: `loading`, `error`, and `movies`. The UI shows a spinner, an error message, or the movie grid accordingly.
- Network failures are caught and displayed without breaking the app.

**Code organisation:**

- `services/api.js` – TMDB API calls.
- `services/supabase.js` – Analytics upsert and trending query.
- `store/store.js` – Global favorites state.
- `pages/` – Route‑level components.
- `components/` – Reusable UI pieces.

---

## 📈 Analytics with Supabase

A `metrics` table stores:

- `searchterm` (text, unique)
- `count` (integer)
- `movie_id` (reference to the first TMDB result)
- `url` (poster thumbnail)

The upsert logic:
- If the term already exists → increment `count`.
- Otherwise → insert a new row with `count = 1`.

