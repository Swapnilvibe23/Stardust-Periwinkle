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
1. **Home Screen** — Mood check-in, daily streak, time-based suggestion, 5 feature buttons, CTA banner
2. **Calm This Moment** — Template-based guidance by scenario + age range; Favorites Boost; daily soft limit (5/day)
3. **What Now?** — Activity suggestions by time/energy/context; recent dedup; Favorites Boost; daily soft limit
4. **Last Story Tonight** — Dark-mode bedtime stories by theme/energy
5. **Let's Get Through This** — Step-by-step routines (Morning, Bedtime, Hangry Time); bundle CTA at bottom
6. **Take a Breath** — Animated breathing guide + validation/grounding cards
7. **Favorites** — Save any output locally; type filter pills; "used before" badges; time-nudge; bundle CTA
8. **Shop** — 5 placeholder in-app purchase product cards; RevenueCat purchase + restore flow
9. **Profile** — Manage up to 3 child profiles (name, age range, themes, struggles)
10. **Privacy Notice** — Static compliance screen

#### Retention & Engagement
- **Push notifications**: 2/day max (8am + 7pm), parent-focused, skips on web (`hooks/useNotifications.ts`)
- **Time-based suggestion**: Morning → Routine, Afternoon → Activities, Evening → Calm, Night → Story (`hooks/useTimeContext.ts`)
- **Mood check-in**: Once/day 3-tap selector (Calm/Stressed/Exhausted), persists to AsyncStorage, routes to relevant feature
- **Daily streak**: Consecutive-day counter, 7-dot visual, milestone messages at 3/7/14/21/30 days (`hooks/useStreak.ts`)
- **Favorites Boost**: "From your saves" compact section in Calm + What Now? when relevant saves exist

#### Monetization
- **External CTA**: Systeme.io link (`constants/monetization.ts` → `SYSTEME_IO_URL`) — update with real URL
- **Daily soft limits**: 5 free uses/day for Calm + What Now?, dismissible upgrade banner, no hard blocks
- **In-app purchases (RevenueCat)**: Shop tab with 5 placeholder products — NOT YET ACTIVE
  - `react-native-purchases` installed in `artifacts/stardust-periwinkle`
  - `@replit/revenuecat-sdk` installed at workspace root
  - `lib/revenuecat.tsx` — SubscriptionProvider + useSubscription hook
  - `scripts/src/seedRevenueCat.ts` — run with `pnpm --filter @workspace/scripts run seedRevenueCat`
  - `scripts/src/revenueCatClient.ts` — authenticated server-side client
  - **PENDING**: RevenueCat connector not yet authorized. User dismissed the integration flow.
    To activate: connect RevenueCat at app.revenuecat.com → get Secret key → store as `REVENUECAT_SECRET_KEY` secret → re-run seed script → set the 7 env vars it outputs.

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
