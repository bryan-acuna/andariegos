# Andariegos

Personal site for **Clever Acuña** — andinista desde 1986, ingeniero ecuatoriano radicado en Houston.

Photo gallery, interactive map of visited countries, and a small admin area for adding/editing entries.

## Stack

- **Vite + React 19 + TypeScript**
- **React Router v7** (data router with code-splitting)
- **TanStack Query** for server state
- **Supabase** for auth, Postgres, and image storage
- **Radix UI** primitives for dialogs, toasts, forms
- **react-simple-maps** for the country map

## Getting started

```bash
nvm use            # picks up .nvmrc (Node 20+)
cp .env.example .env.local
# fill in VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY

npm install
npm run dev        # http://localhost:5173
```

## Scripts

| Command | What it does |
| --- | --- |
| `npm run dev` | Start the Vite dev server |
| `npm run build` | Type-check and build for production |
| `npm run preview` | Serve the production build locally |
| `npm run lint` | Run ESLint |
| `npm run db:types` | Regenerate `src/types/database.types.ts` from the live Supabase schema (requires Supabase CLI auth and `SUPABASE_PROJECT_ID` env var) |

## Project layout

```
src/
  pages/           Route-level components (Home, About, Mapa, ...)
  components/      Shared UI primitives (Loader, Toast, ErrorBoundary)
  hooks/           Reusable hooks (useAuth, usePhotos, useDocumentTitle, ...)
  context/         React contexts (AuthProvider)
  lib/             Service clients and helpers (supabase, countries, uploadImage)
  types/           Shared types — `database.types.ts` is generated, others are hand-written
  assets/          Static images bundled with the app
public/            Static files served as-is (favicon, og-image)
```

## Database

Single Supabase project. The `Images` table stores adventure photos with metadata (`Name`, `country`, `description`, `image_url`). Files live in the `andariegos` storage bucket.

Type definitions in `src/types/database.types.ts` are scaffolded but should be regenerated against the live schema:

```bash
export SUPABASE_PROJECT_ID=<project-ref>
npm run db:types
```

## Deployment

Vercel — pushes to `main` deploy automatically. Required env vars must be set in the Vercel project settings:

- `VITE_SUPABASE_URL`
- `VITE_SUPABASE_ANON_KEY`

`vercel.json` provides the SPA fallback so client-side routes resolve.
