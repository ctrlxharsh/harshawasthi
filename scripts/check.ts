import assert from 'node:assert/strict';
import nextEnv from '@next/env';
import { neon } from '@neondatabase/serverless';
import { initialContent } from '../data/seed';
import { contentSchema, entrySchema, hasDetails, isOwner, validRevision } from '../lib/content';
import { coverRadius, lensPath } from '../lib/lens';
nextEnv.loadEnvConfig(process.cwd());
assert.equal(contentSchema.safeParse(initialContent).success, true);
assert.equal(contentSchema.safeParse({...initialContent, profile:{...initialContent.profile, socials:[{label:'bad',url:'javascript:alert(1)'}]}}).success, false);
const example = initialContent.sections.projects[0];
assert.equal(hasDetails(example), true);
assert.equal(hasDetails({...example, image:'', links:[], tags:[], details:{enabled:true,description:'',images:[]}}), false);
assert.equal(hasDetails({...example, details:{enabled:false,description:'',images:[]}}), false);
assert.equal(hasDetails({...example, details:{enabled:true,description:'More detail',images:[]}}), true);
assert.equal(hasDetails({...example, details:{enabled:false,description:'More detail',images:[]}}), false);
assert.equal(entrySchema.safeParse({...example, details:{enabled:true,description:'',images:[{url:'javascript:alert(1)',caption:''}]}}).success, false);
assert.equal(isOwner('owner','owner'), true);
assert.equal(isOwner('other','owner'), false);
assert.equal(isOwner(undefined,undefined), false);
assert.equal(validRevision(-1), false);
assert.equal(validRevision(0), true);
assert.equal(lensPath(100, 50, 0, 50, 10, 20), 'M 100 60 A 10 10 0 0 0 100 40 L 80 40 A 10 10 0 0 0 80 60 Z');
assert.equal(lensPath(100, 50, 0, 50, 10, 0), 'M 100 60 A 10 10 0 0 0 100 40 L 100 40 A 10 10 0 0 0 100 60 Z');
assert.equal(coverRadius(0, 0, 3, 4), 5);
assert.equal(coverRadius(3, 4, 3, 4), 5);
if (!process.env.DATABASE_URL) throw new Error('DATABASE_URL is required for the stale-save check');
const sql = neon(process.env.DATABASE_URL);
const id = `check-${crypto.randomUUID()}`;
const data = JSON.stringify(initialContent);
const [inserted, first, stale, removed] = await sql.transaction([
  sql`INSERT INTO portfolio_content (id, content) VALUES (${id}, ${data}::jsonb) RETURNING revision`,
  sql`UPDATE portfolio_content SET revision = revision + 1 WHERE id = ${id} AND revision = 0 RETURNING revision`,
  sql`UPDATE portfolio_content SET revision = revision + 1 WHERE id = ${id} AND revision = 0 RETURNING revision`,
  sql`DELETE FROM portfolio_content WHERE id = ${id} RETURNING id`,
]);
assert.equal(inserted.length, 1); assert.equal(first[0].revision, 1); assert.equal(stale.length, 0); assert.equal(removed.length, 1);
console.log('Content validation, owner authorization and stale-save protection passed.');
