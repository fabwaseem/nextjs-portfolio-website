import { extractAndDeleteS3Images } from "./s3";

export async function cleanupOrphanedImages(
  projectId: string,
  currentThumbnail: string | null | undefined,
  currentCover: string | null | undefined,
  currentBody: string | null | undefined,
  newThumbnail?: string,
  newCover?: string,
  newBody?: string
): Promise<void> {
  const imagesToDelete: string[] = [];

  if (newThumbnail && currentThumbnail && currentThumbnail !== newThumbnail) {
    imagesToDelete.push(currentThumbnail);
  }

  if (newCover && currentCover && currentCover !== newCover) {
    imagesToDelete.push(currentCover);
  }

  if (newBody && currentBody) {
    const { extractImagesFromContent } = await import("./s3");
    const oldImages = extractImagesFromContent(
      typeof currentBody === "string" ? currentBody : ""
    );
    const newImages = extractImagesFromContent(newBody);
    const removedImages = oldImages.filter((img) => !newImages.includes(img));
    imagesToDelete.push(...removedImages);
  }

  if (imagesToDelete.length > 0) {
    await extractAndDeleteS3Images(imagesToDelete);
  }
}
