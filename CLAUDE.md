# drill-down-web

Next.js 15 App Router + React 19. Tailwind v4 + shadcn/ui. TanStack Query. Zod. TypeScript strict.

## Rules

- **Compose from shadcn/ui — never hand-roll primitives.** UI is built from `src/components/ui/*` + Tailwind utilities. A missing primitive is added via `npx shadcn@latest add <name>`, not authored by hand. Check `src/components/shared/*` before creating anything new.
- **The app must run standalone.** Every `src/api/endpoints/*.api.ts` method that does network I/O **must** have an `if (USE_MOCKS) return mock…()` branch. Mocks live in `src/mocks/`, return the exact Zod response shape, and `sleep()` (from `@/lib/utils`) to simulate latency. A feature that needs a live backend to demo is broken.
- **`app/` is structure; `features/` is logic.** Route files under `src/app/` are thin shells that compose feature components and define layout only. Real components/hooks/services live in `src/features/<feature>/` and are consumed through its `index.ts` barrel — never deep-import across features.
- **Data flow is strictly layered:** component → feature hook (TanStack Query) → `*.api.ts` → `apiClient`. Components never touch `apiClient` or React Query directly; only `*.api.ts` imports `apiClient`. Query keys are arrays (`['user', id]`); mutations `invalidateQueries` related keys and surface errors via `toast` from `@/lib/toast` (never import `sonner` directly).
- **Zod schema is the source of truth.** Define the schema in `src/types/`, derive the type with `z.infer`. Polymorphic models use `z.discriminatedUnion`. Forms use `react-hook-form` + `zodResolver` against the same schema.
- **Wire payloads are `snake_case` in both directions** (backend contract). Keep `snake_case` in types and mocks — do not camelCase the API surface.
- **Mobile-first.** Author base styles for mobile; layer desktop with `lg:`. Use `order-*` to reflow, not duplicated markup. No desktop-first layouts.
- **Code is self-documenting; comments are a last resort.** Express intent through names and structure, not narration. Delete comments that restate what the code already says. Keep a comment **only** when it carries what code cannot: a business rule, a protocol/wire contract, a non-obvious tradeoff, or a "why it's done this oddly" warning. A comment that can go stale and lie is worse than none.
- **Style with theme tokens only.** Merge classes with `cn()` and expose `className?` on reusable components. Use semantic tokens (`bg-primary`, `text-foreground`, `border-border`, `text-muted-foreground`) — never raw colors. Theme is CSS variables in `src/styles/theme.css`; dark mode via `next-themes` (`class`). Icons: `lucide-react` only.
