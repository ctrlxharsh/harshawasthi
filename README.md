# Harsh Awasthi — portfolio

A single-page portfolio built with Next.js, React and TypeScript. Content is stored in Neon Postgres and can be edited on the page by the owner using Neon Auth. Media is stored in the existing S3-compatible `uploads` bucket.

## Local development

Use Node.js 24.22 or later in the Node 24 line, then:

```sh
npm ci
cp .env.example .env.local
npm run dev
```

Fill in `.env.local` with the Neon database and Auth settings, owner ID and email, and S3-compatible storage credentials. `NEON_AUTH_COOKIE_SECRET` must be a long random secret. Never commit credentials. Open http://localhost:3000, select Login, and use the owner's password. The owner email is supplied by the server; editing and uploads require the matching verified owner ID.

The existing database is already initialized. For a **new** database and bucket, run `npm run seed` with the environment configured; seeding creates the content table, uploads the bundled assets, and inserts initial content only if no portfolio exists. `npm run storage:cors` adds the portfolio upload rule while preserving other bucket rules. Add any additional preview origins to that rule if needed. Removing media in the editor detaches it; it does not delete the object.

Entries with a cover image, links, tags, extra text or gallery images can open a detailed popup. Use **Detailed view** in an entry's editor to turn it on or off. The short description is shared with the card. Gallery images can be uploaded or linked and given individual captions. Entries without additional content remain non-clickable.

## Checks

```sh
npm run lint
npx tsc --noEmit
npm run build
npm run check
npm run build:vinext
```

`npm run check` needs a configured Neon database and checks validation, authorization, and stale-write protection using a temporary record. For a local Workers preview, copy the environment values to an ignored `.dev.vars` file and run `npm run start:vinext -- --port 3001` after building. Both `.env.local` and `.dev.vars` contain secrets and must remain private.

## Deployment

The Workers build uses vinext and `cloudflare.config.ts`. Configure its declared secret bindings in the target Cloudflare environment, set the bucket and region for that environment, and add the deployed origin to Neon Auth's trusted origins. Configure the custom domain `harshawasthi.in` in Cloudflare before cutover. Then use `npm run deploy:vinext` with an authenticated Cloudflare account. The deployment needs access to the Neon database, Auth service, and bucket; a static host alone cannot run the editor or API.

The original GitHub Pages site remains on the original branch until deployment is deliberately switched. The old static Pages workflow was removed from this branch because this version requires server endpoints. The canonical URL and sitemap target `https://harshawasthi.in`; legacy section routes redirect to their single-page anchors.
