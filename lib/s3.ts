import { S3Client, PutObjectCommand, DeleteObjectCommand, GetObjectCommand } from "@aws-sdk/client-s3";
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

export function getS3Key(projectId: string, filename: string, type: "thumbnail" | "cover"): string {
  const timestamp = Date.now();
  const extension = filename.split(".").pop()?.toLowerCase() || "jpg";
  return `projects/${projectId}/${type}-${timestamp}.${extension}`;
}

export function getS3Url(key: string): string {
  return `https://${BUCKET_NAME}.s3.${BUCKET_REGION}.amazonaws.com/${key}`;
}

export function extractS3Key(url: string): string | null {
  try {
    const urlObj = new URL(url);
    if (urlObj.hostname.includes("s3") || urlObj.hostname.includes("amazonaws.com")) {
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

export async function extractAndDeleteS3Images(urls: (string | null | undefined)[]): Promise<void> {
  const keys = urls
    .filter((url): url is string => Boolean(url))
    .map((url) => {
      const key = extractS3Key(url);
      return key || url;
    })
    .filter((key): key is string => Boolean(key));

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
