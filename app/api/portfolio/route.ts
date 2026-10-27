import { neon } from '@neondatabase/serverless';
import { contentSchema, validRevision } from '@/lib/content';
import { getPortfolio } from '@/lib/db';
import { ownerSession, sameOrigin } from '@/lib/auth';

export async function GET() {
  try { return Response.json(await getPortfolio(), { headers: { 'Cache-Control': 'no-store' } }); }
  catch { return Response.json({ error: 'Portfolio unavailable. Please try again.' }, { status: 503 }); }
}
export async function PUT(request: Request) {
  if (!sameOrigin(request) || !await ownerSession()) return Response.json({ error: 'Not authorized' }, { status: 403 });
  try {
    const raw = await request.text();
    if (raw.length > 1_000_000) return Response.json({ error: 'Content is too large' }, { status: 413 });
    const body = JSON.parse(raw);
    if (!validRevision(body.revision)) return Response.json({ error: 'Invalid revision' }, { status: 400 });
    const parsed = contentSchema.safeParse(body.content);
    if (!parsed.success) return Response.json({ error: parsed.error.issues[0]?.message || 'Invalid content' }, { status: 400 });
    const sql = neon(process.env.DATABASE_URL!);
    const content = JSON.stringify(parsed.data);
    const rows = await sql`UPDATE portfolio_content SET content = ${content}::jsonb, revision = revision + 1, updated_at = now() WHERE id = 'main' AND revision = ${body.revision} RETURNING revision`;
    if (!rows.length) return Response.json({ error: 'This portfolio changed in another tab. Copy your edits, then reload and try again.' }, { status: 409 });
    return Response.json({ revision: Number(rows[0].revision) });
  } catch (error) {
    console.error('Portfolio save failed:', error);
    return Response.json({ error: 'Could not save. Your edits are still here; please try again.' }, { status: 500 });
  }
}
