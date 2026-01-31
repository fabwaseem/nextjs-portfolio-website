"use client";

import imageCompression from "browser-image-compression";

const JPEG_TYPES = ["image/jpeg", "image/jpg"];
const PNG_TYPES = ["image/png"];
const WEBP_TYPES = ["image/webp"];
const OPTIMIZABLE_TYPES = [...JPEG_TYPES, ...PNG_TYPES, ...WEBP_TYPES];

function getOutputConfig(
  type: "thumbnail" | "cover",
  mimeType: string
): { maxWidthOrHeight: number; maxSizeMB: number; fileType?: string } {
  const maxWidthOrHeight = type === "thumbnail" ? 800 : 1920;
  const maxSizeMB = type === "thumbnail" ? 0.5 : 1.5;
  const outputWebP =
    JPEG_TYPES.includes(mimeType) || PNG_TYPES.includes(mimeType);
  return {
    maxWidthOrHeight,
    maxSizeMB,
    ...(outputWebP && { fileType: "image/webp" }),
  };
}

function getOutputFilename(originalName: string, mimeType: string): string {
  const base = originalName.replace(/\.[^.]+$/, "");
  return mimeType === "image/webp" ? `${base}.webp` : originalName;
}

export async function optimizeImageBeforeUpload(
  file: File,
  type: "thumbnail" | "cover"
): Promise<File> {
  const mimeType = file.type?.toLowerCase() || "";
  if (!OPTIMIZABLE_TYPES.includes(mimeType)) {
    return file;
  }

  const config = getOutputConfig(type, mimeType);
  const compressed = await imageCompression(file, {
    maxSizeMB: config.maxSizeMB,
    maxWidthOrHeight: config.maxWidthOrHeight,
    initialQuality: 0.92,
    useWebWorker: true,
    ...(config.fileType && { fileType: config.fileType }),
  });

  const outputFilename = getOutputFilename(
    file.name,
    config.fileType || mimeType
  );
  return new File([compressed], outputFilename, {
    type: config.fileType || file.type,
    lastModified: Date.now(),
  });
}
