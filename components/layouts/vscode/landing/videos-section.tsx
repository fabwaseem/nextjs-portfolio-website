"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Youtube, ArrowUpRight, Play } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useYouTubeVideos, YouTubeVideo } from "@/hooks/use-youtube-videos";
import { socialLinks } from "@/config/constants";
import { VideoCardSkeleton } from "../common/card-skeletons";

const YOUTUBE_CHANNEL_URL =
  socialLinks.find((l) => l.name === "Youtube")?.url ?? "https://youtube.com";

function formatDuration(seconds: number | null): string {
  if (seconds == null || seconds < 0) return "";
  const m = Math.floor(seconds / 60);
  const s = Math.floor(seconds % 60);
  return `${m}:${s.toString().padStart(2, "0")}`;
}

function VideoCard({ video, index }: { video: YouTubeVideo; index: number }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(cardRef, { once: true, margin: "-50px" });
  const thumbUrl = `https://img.youtube.com/vi/${video.id}/hqdefault.jpg`;
  const watchUrl = `https://www.youtube.com/watch?v=${video.id}`;

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className="group relative"
    >
      <Link href={watchUrl} target="_blank" rel="noopener noreferrer">
        <div className="relative overflow-hidden rounded-xl border border-border bg-card/50 backdrop-blur-sm transition-all duration-500 hover:border-primary/30 card-hover-lift">
          <div className="relative aspect-video overflow-hidden bg-muted">
            <Image
              src={thumbUrl}
              alt={video.title}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <div className="rounded-full bg-primary/90 p-4 text-primary-foreground shadow-lg">
                <Play className="w-8 h-8 fill-current" />
              </div>
            </div>
            {(video.viewCount != null || video.duration != null) && (
              <div className="absolute bottom-2 right-2 flex items-center gap-2">
                {video.duration != null && (
                  <span className="rounded bg-background/90 px-2 py-0.5 text-xs font-mono backdrop-blur-sm">
                    {formatDuration(video.duration)}
                  </span>
                )}
                {video.viewCount != null && video.viewCount > 0 && (
                  <span className="rounded bg-background/90 px-2 py-0.5 text-xs backdrop-blur-sm">
                    {video.viewCount.toLocaleString()} views
                  </span>
                )}
              </div>
            )}
          </div>
          <div className="p-6">
            <h3 className="text-xl font-semibold mb-2 group-hover:text-primary transition-colors line-clamp-2">
              {video.title}
            </h3>
            <div className="flex items-center gap-2 text-sm font-medium text-primary">
              Watch on YouTube
              <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}

export function VideosSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });
  const { data, isLoading, isError } = useYouTubeVideos();
  const videos = data?.videos ?? [];

  return (
    <section
      ref={sectionRef}
      id="videos"
      className={cn("relative py-24 md:py-32 overflow-hidden", "scroll-mt-20")}
    >
      <div className="absolute inset-0 bg-code-dots" aria-hidden />
      <div className="absolute inset-0 bg-mesh opacity-60" aria-hidden />

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-4">
            <Youtube className="w-4 h-4 text-primary" />
            <span className="text-sm font-mono text-primary">
              ~/youtube --latest
            </span>
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
            Latest{" "}
            <span className="bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
              Videos
            </span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Development tutorials, walkthroughs, and resources. Subscribe for
            new videos on full‑stack, Web3, and UI.
          </p>
        </motion.div>

        {isLoading ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {Array.from({ length: 6 }).map((_, i) => (
              <VideoCardSkeleton key={i} />
            ))}
          </div>
        ) : isError || videos.length === 0 ? (
          <div className="text-center py-20">
            <Youtube className="w-16 h-16 text-muted-foreground/50 mx-auto mb-4" />
            <p className="text-muted-foreground text-lg">
              No videos available right now. Check the channel for updates.
            </p>
            <Button asChild variant="outline" size="lg" className="mt-6 gap-2">
              <Link
                href={YOUTUBE_CHANNEL_URL}
                target="_blank"
                rel="noopener noreferrer"
              >
                Open YouTube Channel
                <ArrowUpRight className="w-4 h-4" />
              </Link>
            </Button>
          </div>
        ) : (
          <>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
              {videos.map((video, idx) => (
                <VideoCard key={video.id} video={video} index={idx} />
              ))}
            </div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="text-center mt-12"
            >
              <Button asChild variant="outline" size="lg" className="gap-2">
                <Link
                  href={YOUTUBE_CHANNEL_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  View All Videos
                  <ArrowUpRight className="w-4 h-4" />
                </Link>
              </Button>
            </motion.div>
          </>
        )}
      </div>
    </section>
  );
}
