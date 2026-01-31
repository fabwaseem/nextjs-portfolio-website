"use client";

import { useCallback } from "react";
import axios from "axios";
import { ImageDropzone } from "@/components/ui/image-dropzone";
import { cn } from "@/lib/utils";
import { optimizeImageBeforeUpload } from "@/lib/image-optimize";

interface ImageUploadProps {
  value?: string;
  onChange: (url: string) => void;
  type: "thumbnail" | "cover";
  label?: string;
  className?: string;
  size?: "default" | "compact";
}

export function ImageUpload({
  value,
  onChange,
  type,
  label,
  className,
  size = "default",
}: ImageUploadProps) {
  const handleUpload = useCallback(
    async (file: File): Promise<string> => {
      const optimizedFile = await optimizeImageBeforeUpload(file, type);
      try {
        const response = await axios.post("/api/upload/presigned-url", {
          filename: optimizedFile.name,
          type,
          contentType: optimizedFile.type,
        });

        const { presignedUrl, url } = response.data;

        try {
          await axios.put(presignedUrl, optimizedFile, {
            headers: {
              "Content-Type": optimizedFile.type,
            },
            maxContentLength: Infinity,
            maxBodyLength: Infinity,
          });

          return url;
        } catch (uploadError) {
          console.error("S3 upload error:", {
            error: uploadError,
            message: axios.isAxiosError(uploadError)
              ? uploadError.message
              : "Unknown error",
            response: axios.isAxiosError(uploadError)
              ? {
                  status: uploadError.response?.status,
                  statusText: uploadError.response?.statusText,
                  data: uploadError.response?.data,
                }
              : null,
            presignedUrl,
            fileName: file.name,
            fileType: file.type,
            fileSize: file.size,
          });
          throw new Error(
            `Failed to upload image to S3: ${
              axios.isAxiosError(uploadError)
                ? uploadError.response?.statusText || uploadError.message
                : "Unknown error"
            }`
          );
        }
      } catch (error) {
        console.error("Presigned URL generation error:", {
          error,
          message: axios.isAxiosError(error) ? error.message : "Unknown error",
          response: axios.isAxiosError(error)
            ? {
                status: error.response?.status,
                statusText: error.response?.statusText,
                data: error.response?.data,
              }
            : null,
          fileName: file.name,
          fileType: file.type,
          fileSize: file.size,
          type,
        });
        throw new Error(
          `Failed to get presigned URL: ${
            axios.isAxiosError(error)
              ? error.response?.data?.error || error.message
              : "Unknown error"
          }`
        );
      }
    },
    [ type],
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
