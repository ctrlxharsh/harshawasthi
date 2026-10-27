import { PutObjectCommand } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import { ownerSession, sameOrigin } from '@/lib/auth';
import { bucket, storage, uploadTypes } from '@/lib/storage';

export async function POST(request: Request) {
  if (!sameOrigin(request) || !await ownerSession()) return Response.json({ error: 'Not authorized' }, { status: 403 });
  try {
    const { name, type, size } = await request.json();
    if (typeof name !== 'string' || typeof type !== 'string' || !uploadTypes[type] || !Number.isSafeInteger(size) || size < 1 || size > uploadTypes[type]) return Response.json({ error: 'Unsupported file type or file is too large.' }, { status: 400 });
    const safeName = name.replace(/[^a-zA-Z0-9._-]/g, '-').slice(-100) || 'file';
    const key = `portfolio/uploads/${crypto.randomUUID()}/${size}/${safeName}`;
    const url = await getSignedUrl(storage(), new PutObjectCommand({ Bucket: bucket(), Key: key, ContentType: type }), { expiresIn: 300 });
    return Response.json({ key, url });
  } catch (error) { console.error('Upload preparation failed:', error); return Response.json({ error: 'Could not prepare upload.' }, { status: 500 }); }
}
