# Persona – Personal CRM (v2)

Persona is a privacy-first, offline personal CRM built with Expo and React Native. All contact and reminder data lives on the device inside SQLite so you can nurture relationships without relying on a cloud backend.

## Getting started

```bash
npm install
npm run start
```

Launch the Expo developer tools and run the project on iOS, Android, or the web. TypeScript keeps the project strictly typed via `npm run typecheck`.

## Architecture overview

The codebase is organised around a small set of clearly-defined layers:

- `src/core` – cross-cutting providers, theming, and shared hooks.
- `src/data` – the SQLite setup, schema helpers, and seed data.
- `src/features` – domain-specific hooks and types for contacts, reminders, and onboarding state.
- `src/screens` – UI screens that compose primitives and feature hooks into product experiences.
- `src/components` – reusable layout containers and typography-aware primitives.
- `src/navigation` – stack + tab navigation that gates onboarding before the main app.

Seed data is inserted automatically on the first launch so that the UI has meaningful content straight away.

## Current functionality

- Onboarding flow that introduces Persona’s local-first approach.
- SQLite-backed contact list with search across name, company, and email.
- Contact detail view showing the latest context stored on device.
- Reminder list with upcoming nudges ordered by due date.
- Dashboard summarising relationship counts and the next reminder.
- Settings screen for theme preferences (system/light/dark) and resetting the onboarding tour.

## Next steps

- Add CRUD experiences for contacts, reminders, and interactions.
- Persist secure, encrypted exports for optional backups.
- Schedule local notifications for reminders and follow-ups.
- Extend the dashboard with richer analytics and segmentation.

---

Built for people who want powerful relationship tooling without giving up their privacy.
