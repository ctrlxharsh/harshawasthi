import { bindings, defineConfig, defineWorker } from 'cf/config';

export default defineConfig({
  worker: defineWorker({
    name: 'harsh-portfolio',
    entrypoint: 'vinext/server/fetch-handler',
    compatibilityDate: '2026-10-26',
    compatibilityFlags: ['nodejs_compat'],
    assets: { htmlHandling: 'none', notFoundHandling: 'none', runWorkerFirst: ['/*', '!/_next/static/*', '!/*/_next/static/*'] },
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
      AWS_REGION: bindings.text('us-east-2'),
      S3_BUCKET: bindings.text('uploads'),
    },
  }),
});
