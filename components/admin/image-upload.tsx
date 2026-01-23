"use client";

import { useCallback } from "react";
import { ImageDropzone } from "@/components/ui/image-dropzone";
import { cn } from "@/lib/utils";

interface ImageUploadProps {
  value?: string;
  onChange: (url: string) => void;
  type: "thumbnail" | "cover";
  projectId?: string;
  label?: string;
  className?: string;
  size?: "default" | "compact";
}

export function ImageUpload({
  value,
  onChange,
  type,
  projectId,
  label,
  className,
  size = "default",
}: ImageUploadProps) {
  const handleUpload = useCallback(
    async (file: File): Promise<string> => {
      const response = await fetch("/api/upload/presigned-url", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          projectId: projectId || "temp",
          filename: file.name,
          type,
          contentType: file.type,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to get presigned URL");
      }

      const { presignedUrl, url } = await response.json();

      const uploadResponse = await fetch(presignedUrl, {
        method: "PUT",
        body: file,
        headers: {
          "Content-Type": file.type,
        },
      });

      if (!uploadResponse.ok) {
        throw new Error("Failed to upload image");
      }

      return url;
    },
    [projectId, type],
  );

  return (
    <ImageDropzone
      value={value}
      onChange={onChange}
      onUpload={handleUpload}
      label={label}
      aspectRatio={type === "cover" ? "video" : "square"}
      size={size}
      className={cn(className)}
      maxSize={5}
    />
  );
}
