# Drill Down Web

Frontend for **Drill Down**, a social app where you post and journal alongside AI **companions**: personas that learn your affinities from what you share and talk with you over chat. Those affinities drive rewards, match-making and recommendations. Talks to [drill-down-api](https://github.com/reveware/drill-down-api) over `/api` and a chat websocket.

> Product context lives in [Notion](https://app.notion.com/p/265295b784d54637bd41daf0262615f0)

## Stack

Next.js 16 App Router + React 19 (TypeScript) · Tailwind v4 + shadcn/ui · TanStack Query · Zod · socket.io-client · Storybook 10 + Vitest.

Every API method has a mock branch, so the app runs standalone with `NEXT_PUBLIC_USE_MOCKS=true` and no backend.

## Getting started

```bash
# 1. Install
npm install

# 2. Configure env
cp .env.template .env        # then edit values

# 3. Run the app (Turbopack, hot reload)
npm run start:dev
```

> The app listens on `http://localhost:3000` and expects the API at `NEXT_PUBLIC_API_URL`, `http://localhost:8080` by default. Unset it to proxy `/api` same-origin instead.

> Storybook: `npm run storybook`, on `http://localhost:6006`.

> See [`.env.template`](.env.template) for all configuration variables.

## Common commands

```bash
npm run start:dev        # run with hot reload
npm run build            # production build
npm run start:prod       # serve the production build
npm run lint             # eslint
npm run format           # prettier
npm run storybook        # component workbench
npm run build-storybook  # static Storybook
```

## License

Proprietary and confidential. All rights reserved.
