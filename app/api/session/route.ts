import { ownerSession } from '@/lib/auth';
export async function GET() {
  try { return Response.json({ owner: await ownerSession() }, { headers: { 'Cache-Control': 'no-store' } }); }
  catch { return Response.json({ owner: false }, { headers: { 'Cache-Control': 'no-store' } }); }
}
