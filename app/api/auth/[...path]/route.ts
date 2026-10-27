import { getAuth, sameOrigin } from '@/lib/auth';

type Handler = ReturnType<ReturnType<typeof getAuth>['handler']>;
export async function GET(...args: Parameters<Handler['GET']>) {
  if (!new URL(args[0].url).pathname.endsWith('/get-session')) return Response.json({ error: 'Not found' }, { status: 404 });
  return getAuth().handler().GET(...args);
}
export async function POST(...args: Parameters<Handler['POST']>) {
  const path = new URL(args[0].url).pathname;
  if (!sameOrigin(args[0])) return Response.json({ error: 'Invalid origin' }, { status: 403 });
  if (!path.endsWith('/sign-in/email') && !path.endsWith('/sign-out')) return Response.json({ error: 'Not found' }, { status: 404 });
  const body = await args[0].clone().text();
  if (body.length > 4096) return Response.json({ error: 'Request too large' }, { status: 413 });
  if (path.endsWith('/sign-in/email')) {
    try { const input = JSON.parse(body); if (input.email !== process.env.ADMIN_EMAIL || typeof input.password !== 'string' || input.password.length > 256) return Response.json({ error: 'Invalid credentials' }, { status: 400 }); }
    catch { return Response.json({ error: 'Invalid credentials' }, { status: 400 }); }
  }
  return getAuth().handler().POST(...args);
}
