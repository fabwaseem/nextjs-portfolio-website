import { NextResponse } from "next/server";
import { Client } from "youtubei";
import { youtubeChannelQuery } from "@/config/constants";

export const revalidate = 3600; // 1 hour

// Bound the upstream scrape so a slow/unreachable YouTube can never hang
// the build (this route is prerendered for ISR) or a request.
const FETCH_TIMEOUT_MS = 15_000;

function withTimeout<T>(promise: Promise<T>, ms: number): Promise<T> {
  return Promise.race([
    promise,
    new Promise<never>((_, reject) =>
      setTimeout(() => reject(new Error("YouTube fetch timed out")), ms)
    ),
  ]);
}

/** GET /api/youtube/videos – fetch latest videos from configured YouTube channel */
export async function GET() {
  try {
    const videos = await withTimeout(fetchVideos(), FETCH_TIMEOUT_MS);
    return NextResponse.json({ videos });
  } catch (e) {
    console.error("[youtube/videos]", e);
    return NextResponse.json(
      { error: "Failed to fetch YouTube videos", videos: [] },
      { status: 500 }
    );
  }
}

async function fetchVideos() {
  const youtube = new Client();
  const channel = await youtube.findOne(youtubeChannelQuery, {
    type: "channel",
  });
  await channel?.videos.next();

  if (!channel?.videos?.items?.length) {
    return [];
  }

  return channel.videos.items.slice(0, 6).map((item) => ({
    id: item.id,
    title: item.title ?? "",
    viewCount: item.viewCount ?? null,
    duration: item.duration ?? null,
    uploadDate: item.uploadDate ?? null,
  }));
}
