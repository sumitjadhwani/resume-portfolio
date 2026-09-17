# Sumit Jadhwani — Portfolio

Personal portfolio and interactive AI prototype playground, built with Next.js
(App Router), TypeScript and Tailwind CSS. Deployed on Vercel.

## Stack

- Next.js 16 (App Router, Turbopack) + React 19
- TypeScript (strict)
- Tailwind CSS v4 (CSS-first theme in `app/globals.css`)
- `geist` for self-hosted fonts, `lucide-react` for icons
- ESLint + Prettier

## Getting started

```bash
npm install
cp .env.example .env.local   # optional, for live LLM answers
npm run dev                  # http://localhost:3000
```

## Scripts

| Command                | Description                                     |
| ---------------------- | ----------------------------------------------- |
| `npm run dev`          | Start the dev server                            |
| `npm run build`        | Production build (also regenerates route types) |
| `npm run start`        | Serve the production build                      |
| `npm run lint`         | ESLint                                          |
| `npm run typecheck`    | `tsc --noEmit`                                  |
| `npm run format`       | Prettier write                                  |
| `npm run format:check` | Prettier check                                  |

## Project structure

```
app/
  page.tsx                 # single-page portfolio (all sections)
  projects/                # project listing + [slug] case studies
  labs/                    # interactive prototypes (index + one route each)
  api/chat/route.ts        # streaming RAG endpoint
  sitemap.ts / robots.ts   # SEO routes
components/
  sections/                # one component per home section
  labs/                    # prototype UIs
content/                   # typed resume, projects, labs, site config
lib/rag/                   # retriever + LLM client interfaces
public/resume.pdf          # downloadable CV
```

## Editing content

All content lives in `content/` and is typed:

- `content/site.ts` — name, role, email, socials, nav, resume path.
- `content/resume.ts` — summary, skills, experience, patents, education, achievements.
- `content/projects.ts` — project case studies (drives `/projects/[slug]`).
- `content/labs.ts` — prototype registry shown on `/labs`.

## Adding an interactive prototype

The repo is set up so a new demo is a self-contained route plus a server
endpoint — API keys stay server-side.

1. Add the UI at `app/labs/<slug>/page.tsx` (use a client component under
   `components/labs/` if it needs state).
2. Add the backend at `app/api/<slug>/route.ts`. Reuse `lib/rag` or add your own
   retriever/client implementing the interfaces in `lib/rag/types.ts`.
3. Register it in `content/labs.ts` so it appears on `/labs`.

The reference implementation is the RAG chat demo: `app/labs/rag-chat`,
`components/labs/chat-demo.tsx` and `app/api/chat/route.ts`.

## RAG / LLM configuration

`lib/rag/providers.ts` talks to any OpenAI-compatible API. Set one of the
following in `.env.local` (see `.env.example`):

- `LLM_API_KEY` (or `OPENAI_API_KEY`, or `GROQ_API_KEY`)
- `LLM_BASE_URL` — defaults to OpenAI, or Groq when `GROQ_API_KEY` is set
- `LLM_MODEL` — defaults to `gpt-4o-mini`

With no key configured, the chat demo streams a local fallback answer so the
site works out of the box.

## Deployment

The repo is Vercel-ready with zero extra config. Import it, set the environment
variables above (production), and deploy. Update `NEXT_PUBLIC_SITE_URL` to the
final domain so canonical URLs and the sitemap are correct.
