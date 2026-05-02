# Workspace

## Overview

pnpm workspace monorepo using TypeScript. Contains a shared API server and a React Native (Expo) mobile app called Stardust & Periwinkle.

## Apps

### Stardust & Periwinkle (Mobile — Expo)
- **Directory**: `artifacts/stardust-periwinkle/`
- **Preview**: `/` (root)
- **Purpose**: Parent-facing app to help with stressful parenting moments for children aged 1–8
- **Storage**: 100% local — AsyncStorage only. No backend required.

#### Features
1. **Home Screen** — Active child selector, 5 feature buttons, CTA banner
2. **Calm This Moment** — Template-based guidance by scenario + age range
3. **What Now?** — Activity suggestions by time/energy/context
4. **Last Story Tonight** — Dark-mode bedtime stories by theme/energy
5. **Let's Get Through This** — Step-by-step routines (Morning, Bedtime, Hangry Time)
6. **Take a Breath** — Animated breathing guide + validation/grounding cards
7. **Favorites** — Save any output locally with expand/delete
8. **Profile** — Manage up to 3 child profiles (name, age range, themes, struggles)
9. **Privacy Notice** — Static compliance screen

#### Compliance
- Parent-facing ONLY — no child data collection
- No backend, no tracking, no analytics, no ads
- All data stored locally via AsyncStorage

#### Tech Stack
- React Native + Expo (SDK 54)
- TypeScript
- AsyncStorage (`@react-native-async-storage/async-storage`)
- Expo Router (file-based routing)
- React Context (ChildContext, FavoritesContext)
- expo-linear-gradient, expo-image, expo-haptics, expo-web-browser

#### Color Palette
- Primary: `#B83A6B` (rose from the logo's "Periwinkle" text)
- Accent: `#7B8ECC` (periwinkle blue)
- Background: `#FFF8F5` (warm cream)
- Story screen: `#1A0D1F` (dark purple)

#### Key Files
- `contexts/ChildContext.tsx` — child profiles state (AsyncStorage-backed)
- `contexts/FavoritesContext.tsx` — favorites state (AsyncStorage-backed)
- `utils/content.ts` — all template-based content generators
- `components/ChildSelector.tsx` — active child picker modal
- `constants/colors.ts` — brand color tokens

---

### API Server (Express)
- **Directory**: `artifacts/api-server/`
- **Preview**: `/api`
- **Purpose**: Shared backend (health check only — Expo app uses AsyncStorage, no backend needed)

## Stack

- **Monorepo tool**: pnpm workspaces
- **Node.js version**: 24
- **Package manager**: pnpm
- **TypeScript version**: 5.9
- **API framework**: Express 5
- **Database**: PostgreSQL + Drizzle ORM (not used by Expo app)
- **Validation**: Zod (`zod/v4`), `drizzle-zod`
- **API codegen**: Orval (from OpenAPI spec)
- **Build**: esbuild (CJS bundle)

## Key Commands

- `pnpm run typecheck` — full typecheck across all packages
- `pnpm run build` — typecheck + build all packages
- `pnpm --filter @workspace/api-spec run codegen` — regenerate API hooks and Zod schemas from OpenAPI spec
- `pnpm --filter @workspace/db run push` — push DB schema changes (dev only)
- `pnpm --filter @workspace/api-server run dev` — run API server locally

See the `pnpm-workspace` skill for workspace structure, TypeScript setup, and package details.
