# Portfolio

A premium dark-themed developer portfolio.

**Stack:** React 19 + Vite + Tailwind CSS v4 + Framer Motion (client) · Elysia on Bun (server)

## Quick start

```sh
bun install          # root (installs concurrently)
bun run dev          # starts API (:3001) + web (:5173) together
```

Or run them separately:

```sh
bun run dev:server   # Elysia API on http://localhost:3001
bun run dev:client   # Vite dev server on http://localhost:5173
```

## Make it yours

1. **Content** — edit `client/src/data/content.ts`. Every section (hero, projects,
   skills, timeline, socials, stats) reads from this single file.
2. **Resume** — drop your PDF at `client/public/resume.pdf`.
3. **Accent colors / fonts** — tweak the design tokens in `client/src/index.css`
   (`@theme` block) and the font links in `client/index.html`.

## Contact form

`POST /api/contact` validates submissions (Elysia typebox schema) and appends them
to `server/data/messages.json`. To forward messages to your inbox, plug an email
provider (e.g. Resend) into the handler in `server/src/index.ts` where indicated.

## Production

```sh
bun run build        # builds client to client/dist
bun run start        # runs the API server
```

Deploy the static `client/dist` anywhere (Vercel, Netlify, Cloudflare Pages) and the
Bun server to a Bun-friendly host (Railway, Render, Fly.io). Point the frontend's
`/api` requests at the deployed server URL (or serve `client/dist` from Elysia with
`@elysiajs/static`).
