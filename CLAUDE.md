# drill-down-web

Next.js App Router + React 19. Tailwind v4 + shadcn/ui. TanStack Query. Zod. TypeScript strict.
Mobile-first client for the Drill Down API. The contract is `drill-down-api` itself: its
controllers and DTOs.

## Conventions

- **Compose from shadcn/ui, never hand-roll primitives.** UI is built from `src/components/ui/*`
  plus Tailwind utilities; a missing primitive is added with `npx shadcn@latest add <name>`. Check
  `src/components/shared/*` before creating anything new.
- **`app/` is structure; `features/` is logic.** Route files are thin shells that compose feature
  components and define layout. Components, hooks and services live in `src/features/<feature>/`
  and are consumed through its `index.ts` barrel; never deep-import across features.
- **Data flow is strictly layered:** component → feature hook (TanStack Query) → `*.api.ts` →
  `apiClient`. Only `*.api.ts` imports `apiClient`. Query keys are arrays (`['user', id]`);
  mutations `invalidateQueries` the related keys and surface errors via `toast` from
  `@/lib/toast`, never `sonner` directly.
- **A form owns its mutation.** Create and edit forms call their own hook and derive `isPending`
  internally. Props passed into modal content are captured when the modal opens and never update,
  so live state must come from inside the component.
- **The app must run standalone.** Every `src/api/endpoints/*.api.ts` method that does network I/O
  has an `if (USE_MOCKS) return mock…()` branch. Mocks live in `src/mocks/`, return the exact
  response shape, and `sleep()` to simulate latency.
- **Zod schema is the source of truth.** Define it in `src/types/`, derive the type with `z.infer`,
  and drive forms with `react-hook-form` + `zodResolver` against that same schema.
- **Wire payloads are `snake_case` in both directions.** Keep `snake_case` in types and mocks; do
  not camelCase the API surface.
- **Mirror director-web** for feature structure, data flow and form patterns.

## Style

- **Mobile-first.** Author base styles for mobile and layer desktop with `sm:` / `lg:`. Reflow with
  `order-*`, not duplicated markup. **No hover-only affordances**: anything reachable by hover must
  be reachable by touch.
- **Style with theme tokens only** (`bg-primary`, `text-foreground`, `text-muted-foreground`,
  `border-border`), never raw colors. Merge with `cn()` and expose `className?` on reusable
  components. Theme is CSS variables in `src/styles/theme.css` with light and dark via
  `next-themes`; icons come from `@/components/shared/Icons`.
- Empty, loading and error states are part of the feature, not a follow-up.

### Types

`as` only where the type was genuinely lost (a JSON column, a CLI string, an env var, a webhook
body) or where the library ships no types, checked in its `.d.ts`, not assumed. Never hand-write a
shape for a library's payload before reading its `.d.ts`.

Before handing over: `git diff -U0 | grep -E '^\+.*\bas [A-Z{]'` and justify every line.

### Comments

Default is zero. Write one only for:

- a rule enforced somewhere else that the code cannot show
- a decision taken against the obvious alternative
- a race or ordering the shape cannot express
- third-party behaviour that contradicts what the call looks like

Never:

- describe what a function does or returns. Rename it instead.
- justify a change. That goes in the PR body.
- restate an invariant that lives in the schema.

Before handing over: `git diff -U0 | grep -E '^\+\s*(//|\*|/\*|#)'` and delete every line not
on the first list.
