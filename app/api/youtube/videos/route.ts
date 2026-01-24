import { NextResponse } from "next/server";
import { Client } from "youtubei";
import { youtubeChannelQuery } from "@/config/constants";

export const revalidate = 3600; // 1 hour

/** GET /api/youtube/videos – fetch latest videos from configured YouTube channel */
export async function GET() {
  try {
    const youtube = new Client();
    const channel = await youtube.findOne(youtubeChannelQuery, {
      type: "channel",
    });
    await channel?.videos.next();

    if (!channel?.videos?.items?.length) {
      return NextResponse.json({ videos: [] });
    }

    const videos = channel.videos.items.slice(0, 6).map((item) => ({
      id: item.id,
      title: item.title ?? "",
      viewCount: item.viewCount ?? null,
      duration: item.duration ?? null,
      uploadDate: item.uploadDate ?? null,
    }));

    return NextResponse.json({ videos });
  } catch (e) {
    console.error("[youtube/videos]", e);
    return NextResponse.json(
      { error: "Failed to fetch YouTube videos", videos: [] },
      { status: 500 }
    );
  }
}
