import { neon } from '@neondatabase/serverless';
import { contentSchema, type Portfolio } from './content';

export async function getPortfolio(): Promise<{ content: Portfolio; revision: number }> {
  if (!process.env.DATABASE_URL) throw new Error('DATABASE_URL is not configured');
  const sql = neon(process.env.DATABASE_URL);
  const rows = await sql`SELECT content, revision FROM portfolio_content WHERE id = 'main'`;
  if (!rows[0]) throw new Error('Portfolio has not been initialized. Run npm run seed.');
  return { content: contentSchema.parse(rows[0].content), revision: Number(rows[0].revision) };
}
