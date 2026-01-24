import { useQuery } from "@tanstack/react-query";

export interface YouTubeVideo {
  id: string;
  title: string;
  viewCount: number | null;
  duration: number | null;
  uploadDate: string | null;
}

export interface YouTubeVideosResponse {
  videos: YouTubeVideo[];
}

export function useYouTubeVideos() {
  return useQuery<YouTubeVideosResponse>({
    queryKey: ["youtube-videos"],
    queryFn: async () => {
      const res = await fetch("/api/youtube/videos");
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error ?? "Failed to fetch YouTube videos");
      }
      return data;
    },
    staleTime: 1000 * 60 * 60, // 1 hour
  });
}
