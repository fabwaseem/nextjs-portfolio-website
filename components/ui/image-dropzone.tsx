"use client";

import { useState, useRef, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Upload, X, Loader2, ImageIcon, CheckCircle2 } from "lucide-react";
import { cn } from "@/lib/utils";
import Image from "next/image";

interface ImageDropzoneProps {
  value?: string;
  onChange: (url: string) => void;
  onUpload?: (file: File) => Promise<string>;
  label?: string;
  description?: string;
  className?: string;
  aspectRatio?: "square" | "video" | "wide";
  size?: "default" | "compact";
  maxSize?: number; // in MB
  disabled?: boolean;
}

export function ImageDropzone({
  value,
  onChange,
  onUpload,
  label,
  description,
  className,
  aspectRatio = "square",
  size = "default",
  maxSize = 5,
  disabled = false,
}: ImageDropzoneProps) {
  const [uploading, setUploading] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const aspectRatioClass = {
    square: "aspect-square",
    video: "aspect-video",
    wide: "aspect-[2/1]",
  }[aspectRatio];

  const validateFile = (file: File): string | null => {
    if (!file.type.startsWith("image/")) {
      return "Please select an image file";
    }
    if (file.size > maxSize * 1024 * 1024) {
      return `Image size must be less than ${maxSize}MB`;
    }
    return null;
  };

  const handleUpload = useCallback(
    async (file: File) => {
      const validationError = validateFile(file);
      if (validationError) {
        setError(validationError);
        return;
      }

      setError(null);
      setUploading(true);
      setUploadProgress(0);

      try {
        // Simulate progress
        const progressInterval = setInterval(() => {
          setUploadProgress((prev) => Math.min(prev + 10, 90));
        }, 100);

        let url: string;

        if (onUpload) {
          url = await onUpload(file);
        } else {
          // Default upload behavior - create object URL for preview
          url = URL.createObjectURL(file);
        }

        clearInterval(progressInterval);
        setUploadProgress(100);

        setTimeout(() => {
          onChange(url);
          setUploading(false);
          setUploadProgress(0);
        }, 300);
      } catch (err) {
        setError("Failed to upload image. Please try again.");
        setUploading(false);
        setUploadProgress(0);
      }
    },
    [onUpload, onChange, maxSize],
  );

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      handleUpload(file);
    }
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleDragOver = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      e.stopPropagation();
      if (!disabled && !uploading) {
        setIsDragging(true);
      }
    },
    [disabled, uploading],
  );

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  }, []);

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      e.stopPropagation();
      setIsDragging(false);

      if (disabled || uploading) return;

      const file = e.dataTransfer.files?.[0];
      if (file) {
        handleUpload(file);
      }
    },
    [disabled, uploading, handleUpload],
  );

  const handleRemove = () => {
    onChange("");
    setError(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  return (
    <div
      className={cn("space-y-2", size === "compact" && "max-w-md", className)}
    >
      {label && (
        <label className="text-sm font-medium text-foreground">{label}</label>
      )}

      <div
        className={cn(
          "relative rounded-xl border-2 border-dashed transition-all duration-200 overflow-hidden",
          "bg-muted/30 backdrop-blur-sm",
          isDragging && "border-primary bg-primary/5 scale-[1.02]",
          !isDragging &&
            !value &&
            "border-border/50 hover:border-primary/50 hover:bg-muted/50",
          value && "border-transparent",
          error && "border-destructive/50 bg-destructive/5",
          disabled && "opacity-50 cursor-not-allowed",
          aspectRatioClass,
        )}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={handleFileSelect}
          disabled={disabled || uploading}
          className="hidden"
        />

        {value ? (
          // Image Preview
          <div className="absolute inset-0 group">
            <Image src={value} alt="Preview" fill className="object-cover" />
            {/* Overlay on hover */}
            <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center gap-2">
              <Button
                type="button"
                variant="secondary"
                size="sm"
                onClick={() => fileInputRef.current?.click()}
                disabled={disabled || uploading}
                className="backdrop-blur-sm"
              >
                <Upload className="h-4 w-4 mr-2" />
                Change
              </Button>
              <Button
                type="button"
                variant="destructive"
                size="sm"
                onClick={handleRemove}
                disabled={disabled || uploading}
              >
                <X className="h-4 w-4 mr-2" />
                Remove
              </Button>
            </div>
          </div>
        ) : uploading ? (
          // Upload Progress
          <div className="absolute inset-0 flex flex-col items-center justify-center p-4">
            <div className="relative">
              <Loader2 className="h-10 w-10 text-primary animate-spin" />
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-xs font-medium">{uploadProgress}%</span>
              </div>
            </div>
            <p className="text-sm text-muted-foreground mt-3">Uploading...</p>
            <div className="w-full max-w-32 h-1.5 bg-muted rounded-full mt-2 overflow-hidden">
              <div
                className="h-full bg-primary rounded-full transition-all duration-200"
                style={{ width: `${uploadProgress}%` }}
              />
            </div>
          </div>
        ) : (
          // Drop Zone
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            disabled={disabled}
            className="absolute inset-0 flex flex-col items-center justify-center p-4 cursor-pointer"
          >
            <div
              className={cn(
                "flex h-14 w-14 items-center justify-center rounded-2xl transition-all duration-200",
                isDragging
                  ? "bg-primary/20 text-primary scale-110"
                  : "bg-muted/50 text-muted-foreground",
              )}
            >
              {isDragging ? (
                <CheckCircle2 className="h-7 w-7" />
              ) : (
                <ImageIcon className="h-7 w-7" />
              )}
            </div>
            <p className="text-sm font-medium mt-3">
              {isDragging ? "Drop image here" : "Drop image or click to upload"}
            </p>
            <p className="text-xs text-muted-foreground mt-1">
              {description || `PNG, JPG, GIF up to ${maxSize}MB`}
            </p>
          </button>
        )}
      </div>

      {error && (
        <p className="text-sm text-destructive flex items-center gap-1.5">
          <X className="h-3.5 w-3.5" />
          {error}
        </p>
      )}
    </div>
  );
}
