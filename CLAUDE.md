# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev          # Start dev server at localhost:8080
npm run build        # Production build
npm run build:dev    # Development build
npm run lint         # ESLint
npm test             # Run tests (Vitest)
npm run test:watch   # Vitest in watch mode
npm run preview      # Preview production build
```

## Architecture

**Nexierge** is a hotel operations analytics dashboard built with React 18 + TypeScript + Vite.

### Key Tech

- **UI**: shadcn/ui (Radix UI primitives) + Tailwind CSS with class-based dark mode
- **Routing**: React Router DOM v6
- **Server State**: TanStack React Query (QueryClient in `App.tsx`) — no actual API calls yet, all data is mocked
- **Global State**: React Context (`DateRangeContext`) for date range filter
- **Charts**: Recharts
- **Forms**: React Hook Form + Zod
- **Theme**: next-themes

### Module Structure

The app is organized into feature modules under `src/modules/`:

- `main-dashboard/` — Overview KPIs
- `communication-hub/` — Multi-tab: Summary, Inboxes, Contacts, Templates, Automations
- `tickets-requests/` — Multi-tab: Summary, GuestApp, Tickets
- `rooms-guests/` — Room management

Each module is a self-contained page component managing its own tab state.

### Data

All data is mocked — no backend/API integration exists. Key files:

- `src/data/mock/analytics.ts` — KPI metrics and chart data for Communication Hub
- `src/data/mock/tickets.ts` — Tickets, Guest App, and Universal Requests data
- `src/lib/scaleData.ts` — Scales mock values based on the selected date range (today/7d/30d/3m) with deterministic jitter for realistic demo variation

### Layout & Navigation

- `AppShell` (in `src/components/layout/`) wraps all pages and provides the `DateRangeContext` provider
- Navigation config is in `src/lib/config/`
- `ModuleSwitcher` in the layout handles top-level module navigation

### Path Aliases

`@/*` maps to `./src/*` (configured in `tsconfig.json` and `vite.config.ts`).

### TypeScript

Config is intentionally lenient: `noImplicitAny: false`, `strictNullChecks: false`, `noUnusedLocals: false`.
