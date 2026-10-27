import { bindings, defineConfig, defineWorker } from 'cf/config';

export default defineConfig({
  worker: defineWorker({
    name: 'portfolio',
    entrypoint: 'vinext/server/fetch-handler',
    compatibilityDate: '2026-10-27',
    compatibilityFlags: ['nodejs_compat'],
    assets: { htmlHandling: 'none', notFoundHandling: 'none', runWorkerFirst: ['/*', '!/_next/static/*', '!/*/_next/static/*'] },
    observability: {
      enabled: false,
      logs: { enabled: true },
      traces: { enabled: true },
      issues: { enabled: true },
    },
    env: {
      ASSETS: bindings.assets(),
      DATABASE_URL: bindings.secret(),
      NEON_AUTH_BASE_URL: bindings.secret(),
      NEON_AUTH_COOKIE_SECRET: bindings.secret(),
      ADMIN_USER_ID: bindings.secret(),
      ADMIN_EMAIL: bindings.secret(),
      AWS_ENDPOINT_URL_S3: bindings.secret(),
      AWS_ACCESS_KEY_ID: bindings.secret(),
      AWS_SECRET_ACCESS_KEY: bindings.secret(),
      AWS_REGION: bindings.secret(),
      S3_BUCKET: bindings.secret(),
      NEXT_PUBLIC_SITE_URL: bindings.secret(),
    },
  }),
});
