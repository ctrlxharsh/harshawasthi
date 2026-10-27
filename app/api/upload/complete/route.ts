import { GetObjectCommand, HeadObjectCommand } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import { ownerSession, sameOrigin } from '@/lib/auth';
import { bucket, storage, uploadTypes, validKey } from '@/lib/storage';

export async function POST(request: Request) {
  if (!sameOrigin(request) || !await ownerSession()) return Response.json({ error: 'Not authorized' }, { status: 403 });
  try {
    const { key } = await request.json();
    if (typeof key !== 'string' || !validKey(key) || !/^portfolio\/uploads\/[a-f0-9-]+\/\d+\/[^/]+$/.test(key)) return Response.json({ error: 'Invalid file' }, { status: 400 });
    const object = await storage().send(new HeadObjectCommand({ Bucket: bucket(), Key: key }));
    const expectedSize = Number(key.split('/')[3]);
    if (!object.ContentType || !uploadTypes[object.ContentType] || object.ContentLength !== expectedSize || expectedSize > uploadTypes[object.ContentType]) return Response.json({ error: 'Upload did not match the expected file.' }, { status: 400 });
    const preview = await getSignedUrl(storage(), new GetObjectCommand({ Bucket: bucket(), Key: key }), { expiresIn: 300 });
    return Response.json({ key, preview });
  } catch { return Response.json({ error: 'Upload could not be verified.' }, { status: 400 }); }
}
