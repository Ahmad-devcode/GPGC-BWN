// src/lib/r2.ts
// Cloudflare R2 helpers (S3-compatible). SERVER ONLY — this module reads
// the R2 secret access key and must never be imported by client components.
// (The `server-only` npm package is not a dependency of this project, so we
// guard at runtime instead: importing this in the browser throws.)
import { S3Client, PutObjectCommand, DeleteObjectCommand } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';

if (typeof window !== 'undefined') {
  throw new Error('src/lib/r2.ts must only be used on the server.');
}

/** Folders uploads are allowed into — mirrors the R2 folder convention. */
export const R2_FOLDERS = [
  'images/faculty',
  'images/news',
  'images/campus',
  'images/hero',
  'images/leadership',
  'images/programs',
  'images/site',
  'pdfs/merit-lists',
  'pdfs/challans',
  'pdfs/forms',
  'pdfs/fees',
  'pdfs/curriculum',
  'pdfs/general',
] as const;

export type R2Folder = (typeof R2_FOLDERS)[number];

export function isR2ServerConfigured(): boolean {
  return Boolean(
    process.env.R2_ACCOUNT_ID &&
      process.env.R2_ACCESS_KEY_ID &&
      process.env.R2_SECRET_ACCESS_KEY &&
      process.env.R2_BUCKET_NAME,
  );
}

let cachedClient: S3Client | null = null;

function getS3Client(): S3Client {
  if (!isR2ServerConfigured()) {
    throw new Error(
      'R2 is not configured. Set R2_ACCOUNT_ID, R2_ACCESS_KEY_ID, R2_SECRET_ACCESS_KEY and R2_BUCKET_NAME.',
    );
  }
  if (!cachedClient) {
    cachedClient = new S3Client({
      region: 'auto',
      endpoint: `https://${process.env.R2_ACCOUNT_ID}.r2.cloudflarestorage.com`,
      credentials: {
        accessKeyId: process.env.R2_ACCESS_KEY_ID!,
        secretAccessKey: process.env.R2_SECRET_ACCESS_KEY!,
      },
    });
  }
  return cachedClient;
}

function bucket(): string {
  return process.env.R2_BUCKET_NAME!;
}

/** Public URL for an object key, using NEXT_PUBLIC_R2_PUBLIC_URL. */
export function getPublicUrl(key: string): string {
  const base = process.env.NEXT_PUBLIC_R2_PUBLIC_URL;
  if (!base) return key;
  return `${base.replace(/\/+$/, '')}/${key.replace(/^\/+/, '')}`;
}

/**
 * Build a safe, collision-resistant object key:
 *   buildKey('images/faculty', 'My Photo.JPG') -> 'images/faculty/1699999999999-my-photo.jpg'
 */
export function buildKey(folder: string, filename: string): string {
  const safeFolder = folder.replace(/^\/+|\/+$/g, '');
  const base = filename.split('/').pop() ?? 'file';
  const dot = base.lastIndexOf('.');
  const namePart = dot > 0 ? base.slice(0, dot) : base;
  const extPart = dot > 0 ? base.slice(dot).toLowerCase() : '';
  const safeName =
    namePart
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '')
      .slice(0, 80) || 'file';
  return `${safeFolder}/${Date.now()}-${safeName}${extPart}`;
}

/** Create a presigned PUT URL the browser can upload to directly (15 min). */
export async function getPresignedUploadUrl(
  key: string,
  contentType: string,
): Promise<string> {
  const client = getS3Client();
  const command = new PutObjectCommand({
    Bucket: bucket(),
    Key: key,
    ContentType: contentType,
  });
  return getSignedUrl(client, command, { expiresIn: 900 });
}

/** Delete an object from R2 (used by future admin clean-up actions). */
export async function deleteObject(key: string): Promise<void> {
  const client = getS3Client();
  await client.send(new DeleteObjectCommand({ Bucket: bucket(), Key: key }));
}
