# Harsh Awasthi — research portfolio

A single-page research and engineering portfolio built with Next.js, Motion, shadcn/ui and Sanity. Research and project details open as accessible, shareable dialogs. The generated abstract hero is illustrative artwork.

## Development

Use Node.js 22.12 or newer. Run:

```sh
npm ci
npm run dev
```

The site reads Sanity project `mke2ofjc` and dataset `production` by default. `.env.example` documents optional overrides. When the dataset has not been imported, the site displays the bundled, sourced initial content.

## Sanity

Sign in with `npx sanity login`, then use `npm run import-content` once to create the initial documents. The command uses the authenticated CLI session, creates documents only when their IDs do not already exist, and leaves existing edits intact. Alternatively, set `SANITY_WRITE_TOKEN` locally for a token with write permissions. Do not place tokens in client code or commit them.

At Sanity Manage, add the local origin and any Vercel preview and production origins under API CORS origins, allowing credentials for Studio login. Open `/studio` to edit content. Publish edits in Studio to update the site through Sanity Live. Only published content is queried. If the dataset is private, provide a server-side `SANITY_API_READ_TOKEN` with viewer access.

The project and publication schemas support rich text, image galleries, video URLs, technology tags and multiple evidence links. Featured projects are controlled by their featured flag and order.

## Checks

```sh
npm run typecheck
npm run lint
npm run check
npm run build
```

## Deployment

The existing Cloudflare Worker is named `portfolio`. Build its OpenNext artifact with `npm run build:cloudflare` and use `npm run preview:cloudflare` for local Workers verification. Upload a version for review before directing production traffic to it. Configure the preview URL as a Sanity CORS origin and verify content updates in the actual Worker environment. The public content query reads fresh Sanity data on each request, avoiding a shared cache dependency for this small portfolio. The previous section paths redirect to single-page anchors, and the previous service-worker endpoint is retained as a no-cache worker.
