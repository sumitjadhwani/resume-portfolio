# AGENTS.md

Portfolio site for Sumit Jadhwani — Next.js 16 (App Router) + React 19 +
TypeScript (strict) + Tailwind v4. Deployed to Vercel. See `README.md` for the
full structure.

## Toolchain (read this first)

Node is installed via **nvm** and is NOT on the default PATH. Source it in every
non-interactive shell before running npm:

```bash
export NVM_DIR="$HOME/.nvm"; . "$NVM_DIR/nvm.sh"; nvm use --lts
```

Without this, `node`/`npm` are "command not found". There is no package manager
lock ambiguity — use **npm** (`package-lock.json`).

## Commands

| Task             | Command                                              |
| ---------------- | ---------------------------------------------------- |
| Dev server       | `npm run dev`                                        |
| Production build | `npm run build`                                      |
| Serve build      | `npm run start`                                      |
| Lint             | `npm run lint`                                       |
| Typecheck        | `npm run typecheck` (`tsc --noEmit`)                 |
| Format           | `npm run format` (Prettier + Tailwind class sorting) |

Verification order: `lint` → `typecheck` → `build`.

## Next.js 16 gotchas

- **Typed routes**: page/layout props use generated types, e.g.
  `PageProps<"/projects/[slug]">` and `LayoutProps<"/">`. `params` is a **Promise**
  (`const { slug } = await params`).
- `npm run typecheck` fails on a **new** dynamic route with
  `Type '"/x/[y]"' does not satisfy the constraint '"/"'` until route types are
  regenerated. Run `npm run build` (or `next dev` once) first. `.next/types` is
  gitignored; this is expected.
- Do not add `tailwind.config.*` — Tailwind v4 is configured **CSS-first** in
  `app/globals.css` via `@theme` (`--color-*`, `--font-*`) and `@utility`.

## Icon gotcha

`lucide-react` v1 **removed brand icons**: there is no `Github`/`Linkedin`, and
`Loader2` is now `LoaderCircle`. Brand icons live as inline SVGs in
`components/icons.tsx` (`GithubIcon`, `LinkedinIcon`).

## Content model

Never hardcode resume copy in components. Edit the typed content modules:

- `content/site.ts` — name, role, email, socials, nav, resume path
- `content/resume.ts` — summary, skills, experience, patents, education, achievements
- `content/projects.ts` — case studies (drives `/projects/[slug]`)
- `content/labs.ts` — prototype registry shown on `/labs`

## Adding a prototype (the core design goal)

Each demo is a self-contained route + server endpoint so LLM keys never reach the
browser. Pattern:

1. UI: `app/labs/<slug>/page.tsx` (+ a client component in `components/labs/`).
2. Backend: `app/api/<slug>/route.ts` (Node runtime, streamed `Response`).
3. Reuse `lib/rag` interfaces (`Retriever`, `LlmClient` in `lib/rag/types.ts`).
4. Register it in `content/labs.ts`.

Reference implementation: `app/labs/rag-chat` + `components/labs/chat-demo.tsx` +
`app/api/chat/route.ts`. `lib/rag/providers.ts` targets any OpenAI-compatible API
(`LLM_API_KEY` / `GROQ_API_KEY`); with no key it streams a local fallback.

## Conventions & constraints

- No git repository is initialized; do not `git init`/commit unless asked.
- `.env.local` is gitignored; `.env.example` is intentionally committed.
- `public/resume.pdf` is a binary asset (Prettier-ignored) — the "Download CV"
  target. Replace the file, don't edit it.
- Placeholders to confirm with the user before publishing: `socials.linkedin`,
  `socials.github` and `site.url` in `content/site.ts`.
