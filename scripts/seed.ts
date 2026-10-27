import nextEnv from '@next/env';
import { readFile } from 'node:fs/promises';
import { neon } from '@neondatabase/serverless';
import { PutObjectCommand } from '@aws-sdk/client-s3';
import { initialContent } from '../data/seed';
import { contentSchema } from '../lib/content';
import { storage, bucket } from '../lib/storage';
nextEnv.loadEnvConfig(process.cwd());

async function main() {
  if (!process.env.DATABASE_URL) throw new Error('DATABASE_URL is missing');
  const sql = neon(process.env.DATABASE_URL);
  await sql`CREATE TABLE IF NOT EXISTS portfolio_content (id text PRIMARY KEY, content jsonb NOT NULL, revision integer NOT NULL DEFAULT 0, updated_at timestamptz NOT NULL DEFAULT now())`;
  const existing = await sql`SELECT id FROM portfolio_content WHERE id = 'main'`;
  if (existing.length) { console.log('Portfolio already exists; no content was overwritten.'); return; }
  const files = [
    ['public/projects/agendaai.webp','portfolio/imports/agendaai.webp','image/webp'],
    ['public/projects/pm.webp','portfolio/imports/pm.webp','image/webp'],
    ['public/projects/newssure.webp','portfolio/imports/newssure.webp','image/webp'],
    ['public/projects/sea5.webp','portfolio/imports/sea5.webp','image/webp'],
    ['public/me/me.webp','portfolio/imports/me.webp','image/webp'],
    ['data/assets/resume.pdf','portfolio/imports/resume.pdf','application/pdf'],
    ...['waving','peeking','hanging','seated'].map(name => [`public/pets/${name}.webp`, `portfolio/pets/${name}.webp`, 'image/webp']),
  ];
  for (const [path, key, type] of files) {
    await storage().send(new PutObjectCommand({Bucket: bucket(), Key: key, Body: await readFile(path), ContentType: type}));
    console.log(`Imported ${key}`);
  }
  const json = JSON.stringify(contentSchema.parse(initialContent));
  await sql`INSERT INTO portfolio_content (id, content) VALUES ('main', ${json}::jsonb) ON CONFLICT (id) DO NOTHING`;
  console.log('Portfolio initialized.');
}
main().catch(error => { console.error(error); process.exitCode = 1; });
