import { GetObjectCommand } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import { getPortfolio } from '@/lib/db';
import { bucket, storage, validKey } from '@/lib/storage';

export async function GET(_request: Request, { params }: { params: Promise<{ key: string[] }> }) {
  const key = (await params).key.join('/');
  if (!validKey(key)) return new Response('Not found', { status: 404 });
  try {
    const isPet = /^portfolio\/pets\/(waving|peeking|hanging|seated)\.webp$/.test(key);
    if (!isPet && !JSON.stringify((await getPortfolio()).content).includes(JSON.stringify(key))) return new Response('Not found', { status: 404 });
    const url = await getSignedUrl(storage(), new GetObjectCommand({ Bucket: bucket(), Key: key }), { expiresIn: 300 });
    return Response.redirect(url, 307);
  } catch { return new Response('Media unavailable', { status: 503 }); }
}
