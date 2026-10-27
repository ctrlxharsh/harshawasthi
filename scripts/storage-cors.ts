import nextEnv from '@next/env';
import { GetBucketCorsCommand, PutBucketCorsCommand, type CORSRule } from '@aws-sdk/client-s3';
import { bucket, storage } from '../lib/storage';
nextEnv.loadEnvConfig(process.cwd());
async function main() {
  let existing: CORSRule[] = [];
  try { existing = (await storage().send(new GetBucketCorsCommand({ Bucket: bucket() }))).CORSRules ?? []; }
  catch (error) { if (!(error instanceof Error) || !['NoSuchCORSConfiguration','NotFound'].includes(error.name)) throw error; }
  const id = 'portfolio-upload';
  const rules = existing.filter(rule => rule.ID !== id);
  rules.push({ ID: id, AllowedOrigins: ['http://localhost:3000', 'http://localhost:3001', 'https://harshawasthi.in'], AllowedMethods: ['GET','HEAD','PUT'], AllowedHeaders: ['*'], ExposeHeaders: ['ETag'], MaxAgeSeconds: 300 });
  await storage().send(new PutBucketCorsCommand({ Bucket: bucket(), CORSConfiguration: { CORSRules: rules } }));
  console.log('Portfolio upload CORS rule configured; other rules preserved.');
}
main().catch(error => { console.error(error); process.exitCode = 1; });
