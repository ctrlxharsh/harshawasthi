import { S3Client } from '@aws-sdk/client-s3';
export const bucket = () => process.env.S3_BUCKET || 'uploads';
export function storage() {
  return new S3Client({ region: process.env.AWS_REGION, endpoint: process.env.AWS_ENDPOINT_URL_S3, forcePathStyle: true,
    credentials: { accessKeyId: process.env.AWS_ACCESS_KEY_ID!, secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY! } });
}
export const uploadTypes: Record<string, number> = { 'image/jpeg': 10_000_000, 'image/png': 10_000_000, 'image/webp': 10_000_000, 'image/gif': 10_000_000, 'application/pdf': 25_000_000, 'video/mp4': 100_000_000, 'video/webm': 100_000_000, 'application/vnd.openxmlformats-officedocument.presentationml.presentation': 25_000_000, 'application/vnd.ms-powerpoint': 25_000_000 };
export const validKey = (key: string) => /^portfolio\/[a-zA-Z0-9._/-]+$/.test(key) && !key.includes('..');
