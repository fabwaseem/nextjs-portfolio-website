import {
  S3Client,
  PutObjectCommand,
  DeleteObjectCommand,
  GetObjectCommand,
} from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

const s3Client = new S3Client({
  region: process.env.AWS_REGION || "us-east-1",
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
  },
});

const BUCKET_NAME = process.env.AWS_S3_BUCKET_NAME!;
const BUCKET_REGION = process.env.AWS_REGION || "us-east-1";

export function getS3Key(
  projectId: string,
  filename: string,
  type: "thumbnail" | "cover"
): string {
  const timestamp = Date.now();
  const extension = filename.split(".").pop()?.toLowerCase() || "jpg";
  return `projects/${projectId}/${type}-${timestamp}.${extension}`;
}

/**
 * Upload a buffer directly to S3. Used by import script.
 */
export async function uploadBufferToS3(
  buffer: Buffer,
  key: string,
  contentType: string
): Promise<string> {
  const command = new PutObjectCommand({
    Bucket: BUCKET_NAME,
    Key: key,
    Body: buffer,
    ContentType: contentType,
  });
  await s3Client.send(command);
  return getS3Url(key);
}

export function getS3Url(key: string): string {
  return `https://${BUCKET_NAME}.s3.${BUCKET_REGION}.amazonaws.com/${key}`;
}

export function extractS3Key(url: string): string | null {
  try {
    const urlObj = new URL(url);
    if (
      urlObj.hostname.includes("s3") ||
      urlObj.hostname.includes("amazonaws.com")
    ) {
      return urlObj.pathname.substring(1);
    }
    return null;
  } catch {
    return null;
  }
}

export async function generatePresignedUploadUrl(
  key: string,
  contentType: string,
  expiresIn: number = 3600
): Promise<string> {
  const command = new PutObjectCommand({
    Bucket: BUCKET_NAME,
    Key: key,
    ContentType: contentType,
  });

  return await getSignedUrl(s3Client, command, { expiresIn });
}

export async function deleteS3Object(key: string): Promise<void> {
  try {
    const command = new DeleteObjectCommand({
      Bucket: BUCKET_NAME,
      Key: key,
    });

    await s3Client.send(command);
  } catch (error) {
    console.error(`Error deleting S3 object ${key}:`, error);
    throw error;
  }
}

export async function deleteS3Objects(keys: string[]): Promise<void> {
  if (keys.length === 0) return;

  await Promise.allSettled(keys.map((key) => deleteS3Object(key)));
}

/**
 * Delete from S3 only URLs that are actually S3 objects (amazonaws.com).
 * Ignores placeholders, /imported/, or other non-S3 URLs. Dedupes keys.
 */
export async function extractAndDeleteS3Images(
  urls: (string | null | undefined)[]
): Promise<void> {
  const keys = [
    ...new Set(
      urls
        .filter((url): url is string => Boolean(url?.trim()))
        .map((url) => extractS3Key(url))
        .filter((key): key is string => Boolean(key))
    ),
  ];

  if (keys.length > 0) {
    await deleteS3Objects(keys);
  }
}

export function extractImagesFromHtml(html: string): string[] {
  const imageUrls: string[] = [];
  const imgRegex = /<img[^>]+src=["']([^"']+)["']/gi;
  let match;

  while ((match = imgRegex.exec(html)) !== null) {
    imageUrls.push(match[1]);
  }

  return imageUrls;
}
