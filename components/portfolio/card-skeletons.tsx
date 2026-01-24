"use client";

import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";

const cardBase =
  "rounded-xl border border-border bg-card/50 backdrop-blur-sm overflow-hidden";

function ProjectCardSkeleton({ className }: { className?: string }) {
  return (
    <div className={cn("relative", className)}>
      <div className={cardBase}>
        <Skeleton className="aspect-video w-full rounded-none" />
        <div className="p-6">
          <Skeleton className="mb-2 h-6 w-4/5" />
          <Skeleton className="mb-4 h-4 w-full" />
          <Skeleton className="mb-4 h-4 w-3/4" />
          <div className="flex flex-wrap gap-2 mb-4">
            <Skeleton className="h-5 w-16 rounded-full" />
            <Skeleton className="h-5 w-20 rounded-full" />
            <Skeleton className="h-5 w-14 rounded-full" />
            <Skeleton className="h-5 w-20 rounded-full" />
          </div>
          <div className="flex items-center gap-2">
            <Skeleton className="h-4 w-24" />
            <Skeleton className="h-4 w-4 rounded" />
          </div>
        </div>
      </div>
    </div>
  );
}

function BlogCardSkeleton({ className }: { className?: string }) {
  return (
    <div className={cn("relative", className)}>
      <div className={cardBase}>
        <Skeleton className="aspect-video w-full rounded-none" />
        <div className="p-6">
          <div className="flex flex-wrap gap-2 mb-3">
            <Skeleton className="h-5 w-20 rounded-full" />
            <Skeleton className="h-5 w-16 rounded-full" />
          </div>
          <Skeleton className="mb-2 h-6 w-full" />
          <Skeleton className="mb-4 h-4 w-5/6" />
          <Skeleton className="mb-4 h-4 w-4/5" />
          <div className="flex items-center justify-between">
            <Skeleton className="h-4 w-24" />
            <div className="flex items-center gap-2">
              <Skeleton className="h-4 w-16" />
              <Skeleton className="h-4 w-4 rounded" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function VideoCardSkeleton({ className }: { className?: string }) {
  return (
    <div className={cn("relative", className)}>
      <div className={cardBase}>
        <div className="relative aspect-video">
          <Skeleton className="absolute inset-0 rounded-none" />
          <div className="absolute bottom-2 right-2 flex items-center gap-2">
            <Skeleton className="h-5 w-10 rounded" />
            <Skeleton className="h-5 w-14 rounded" />
          </div>
        </div>
        <div className="p-6">
          <Skeleton className="mb-2 h-6 w-full" />
          <Skeleton className="mb-1 h-4 w-3/4" />
          <div className="flex items-center gap-2 mt-2">
            <Skeleton className="h-4 w-28" />
            <Skeleton className="h-4 w-4 rounded" />
          </div>
        </div>
      </div>
    </div>
  );
}

export { ProjectCardSkeleton, BlogCardSkeleton, VideoCardSkeleton };
