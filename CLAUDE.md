# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

@AGENTS.md

## Commands

```bash
npm run dev          # start dev server (Turbopack)
npm run build        # production build
npm run lint         # ESLint check
npm run lint:fix     # ESLint auto-fix
npm run type-check   # TypeScript check without emitting
npm run format       # Prettier on src/**
```

There are no tests configured yet.

## Architecture

**Next.js 16 App Router** with two route groups:
- `src/app/(auth)/` — public pages (login, register); layout wraps content in a gradient card centered on screen
- `src/app/(dashboard)/` — protected pages; layout renders `<Header>` + `<main>`

**Route protection** lives in `src/proxy.ts` (NOT `middleware.ts` — Next.js 16 renamed it). It reads the auth cookie `@agend-me-web:token` and redirects unauthenticated requests to `/login`.

**Auth state** is managed by Zustand with `persist` in `src/store/auth.store.ts`. On `login()`, the token is also written to a browser cookie so `proxy.ts` can read it server-side. On `logout()`, the cookie is cleared. The store key and cookie name are both `STORAGE_KEYS.AUTH_TOKEN` (`@agend-me-web:token`).

**Service layer** (`src/services/`) returns domain types directly — there is no API envelope wrapper. The API sends data directly in `response.data`. Services map form field names to API field names (e.g. form `password` → API `senha`).

**API client** is a configured Axios instance in `src/lib/api/axios.ts`. It attaches the Bearer token via a request interceptor by reading from localStorage (parsing the Zustand persist JSON). On 401, it clears storage and redirects to `/login`.

**Components** split into:
- `src/components/ui/` — primitives: `Button`, `Card`, `Input`, `Dialog`
- `src/components/layout/` — `Header`, `Drawer`, `Sidebar`

**Dialog** (`src/components/ui/Dialog.tsx`) renders as a bottom sheet on mobile and a centered modal on desktop (`sm:` breakpoint).

## Key conventions

- Brand color: `#268596` (teal), gradient: `from-[#268596] to-[#1f6377]`
- API base URL comes from `NEXT_PUBLIC_API_URL` env var; defaults to `http://localhost:8082`
- `src/constants/index.ts` is the single source for `ROUTES`, `STORAGE_KEYS`, `APP_NAME`, and API config
- `src/types/index.ts` defines `User` and `UserRole` (`'PRESTADOR' | 'ADMIN' | 'CLIENTE'`)
- Validations use Zod schemas in `src/lib/validations/index.ts`, consumed via `@hookform/resolvers/zod`
- Path alias `@/` maps to `src/`
