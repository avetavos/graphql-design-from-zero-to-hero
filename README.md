# GraphQL Design — From Zero to Hero

A bilingual (EN/TH), standalone, beginner→advanced course on **designing GraphQL APIs**, taught with **TypeScript**. From the type system & SDL through schema design, resolvers, mutations & subscriptions, Relay cursor pagination, the N+1 problem & DataLoader, errors, security & performance, and tooling/federation + a working GraphQL Yoga implementation. **GraphQL runs in the browser** (the reference `graphql` package executes queries against in-memory schemas), with full Yoga servers in StackBlitz. Diagrams are **Mermaid**, and there's a **read-mode** toggle.

All content is original.

## Tech Stack

| Layer | Technology |
| ----- | ---------- |
| Site framework | [Astro 6](https://astro.build) + [Starlight 0.40](https://starlight.astro.build) |
| UI islands | [Preact](https://preactjs.com) (via `@astrojs/preact`) |
| Hands-on | **`<NodeRunner>`** runs JS in a sandboxed iframe with console capture; GraphQL executes for real via a dynamic `import('https://esm.sh/graphql@16')` (async IIFE). `node` mode opens a runnable **GraphQL Yoga** TS server in StackBlitz (`node-runner.ts` builds the project; lesson `code` is `schema.ts` exporting `typeDefs` + `resolvers`). |
| Diagrams | Client-side, theme-aware **Mermaid** (`<Mermaid>` + `public/enhance.js`) |
| Reading | **Read-mode** toggle (hides sidebar/TOC, widens content) via `public/enhance.js` |
| Unit tests | [Vitest](https://vitest.dev) + `@testing-library/preact` |
| i18n | Starlight built-in, `defaultLocale: 'en'`, locales: `en` + `th` |

## Commands

```bash
npm install        # Install dependencies
npm run dev        # Start dev server at http://localhost:4321
npm run build      # Build production site to ./dist/
npm run preview    # Preview the production build locally
npm test           # Run Vitest unit tests
```

## Content Structure

```
src/content/docs/
  en/                              # English — served at /en/...
    graphql-foundations/           # what GraphQL is, the type system, request lifecycle
    schema-design/                 # types, scalars, enums, interfaces, unions, inputs, nullability
    queries-and-resolvers/         # queries, resolver chain, arguments/variables, fragments
    mutations-and-subscriptions/   # mutation design, input/payload, subscriptions
    pagination-and-relationships/  # relationships, offset & Relay connections, N+1/DataLoader
    errors-and-validation/         # errors array, partial results, extensions, validation
    security-and-performance/      # auth context, authorization, depth/complexity, caching
    tooling-federation-building/   # schema-first vs code-first, codegen, testing, federation, Yoga
    index.mdx                      # EN landing (splash)
  th/                              # Thai — served at /th/...
    (same module directories)
    index.mdx
```

## Components & Lesson Template

- **`NodeRunner.tsx`** `{ code, node? }` — sandboxed-iframe JS runner with console capture; in-browser GraphQL runs via the esm.sh dynamic import. `node` mode → a runnable GraphQL Yoga StackBlitz project (`node-runner.ts`). Runnable demos are a hoisted `export const ...Code` + `<NodeRunner code={...} />` (add `node` for a Yoga server, where `code` exports `typeDefs` + `resolvers`).
- **`Mermaid.astro`** `{ code, title }`, **`Callout.astro`** `{ title }`, **`Quiz.tsx`** `{ id, questions }` (0-based `answer`, field `q`), **`ProgressTracker.tsx`** `{ id }`.

Per-lesson order: frontmatter → imports → concept intro → prose (fenced `graphql`/`ts`/`json` + `<Mermaid>`) → `export const ...Code` + `<NodeRunner>` → `<Callout>` → `<Quiz>` → `<ProgressTracker>` (last). IDs follow `<module>/<slug>`.

> **⚠️ Authoring notes:**
> - **In `export const` snippets:** escape `${`→`\${` and nested backticks as `` \` `` — the SDL inside `buildSchema(\`...\`)` and multi-line queries use backticks; double-escape `\\n`. Fenced blocks are literal. SDL/queries go in fenced ` ```graphql `.
> - **In-browser GraphQL pattern:** `(async () => { const { graphql, buildSchema } = await import('https://esm.sh/graphql@16'); ... console.log(JSON.stringify(result, null, 2)); })();`
> - **Never a bare `{...}`/`${...}` in prose** — GraphQL selection sets `{ field }`, SDL, and JS objects live in code spans / fenced blocks / `export const`. **Diagrams are Mermaid, not ASCII.**
> - **Internal links include the base path and matching locale** (`/graphql-design-from-zero-to-hero/en/...` on EN, `/th/...` on TH).
> - Use **current GraphQL** (SDL, Relay cursor connections, DataLoader, `GraphQLError` extensions, depth/complexity limiting, federation, GraphQL Yoga, GraphQL Code Generator).

## Deployment

Fully static → `dist/`. Base path in `astro.config.mjs`: `site: 'https://avetavos.github.io'`, `base: '/graphql-design-from-zero-to-hero'`.

Deployed to GitHub Pages via **branch-source** (`gh-pages`): build `dist/`, add `.nojekyll`, push to `gh-pages`, set **Settings → Pages → Source: Deploy from a branch → `gh-pages` / `/`**, then **request a Pages build** (`gh api -X POST repos/<owner>/<repo>/pages/builds`) — flipping the source alone does not trigger one. If you change `base`, update the base-prefixed links in `src/content/docs/{en,th}/index.mdx`.
