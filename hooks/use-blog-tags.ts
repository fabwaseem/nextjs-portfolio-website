import { useQuery } from "@tanstack/react-query";
import { getBlogTags } from "@/lib/data/static-content";

export interface BlogTag {
  id: string;
  title: string;
  slug: string;
  createdAt: string;
  updatedAt: string;
  _count?: {
    blogs: number;
  };
}

export interface BlogTagsResponse {
  tags: BlogTag[];
}

export function useBlogTags() {
  return useQuery<BlogTagsResponse>({
    queryKey: ["blog-tags"],
    queryFn: async () => getBlogTags(),
  });
}
