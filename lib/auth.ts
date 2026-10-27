import { createNeonAuth } from '@neondatabase/auth/next/server';
import { isOwner } from './content';

// Workers populate process.env in request context, so initialize auth lazily.
export function getAuth() {
  return createNeonAuth({ baseUrl: process.env.NEON_AUTH_BASE_URL!, cookies: { secret: process.env.NEON_AUTH_COOKIE_SECRET! } });
}
export async function ownerSession() {
  const { data } = await getAuth().getSession();
  return isOwner(data?.user?.id, process.env.ADMIN_USER_ID);
}
export function sameOrigin(request: Request) {
  const origin = request.headers.get('origin');
  return !!origin && origin === new URL(request.url).origin;
}
