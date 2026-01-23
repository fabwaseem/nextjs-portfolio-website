import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";

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

interface CreateTagData {
  title: string;
  slug: string;
}

export function useBlogTags() {
  return useQuery<BlogTagsResponse>({
    queryKey: ["blog-tags"],
    queryFn: async () => {
      const response = await fetch("/api/blog-tags");
      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || "Failed to fetch blog tags");
      }
      return response.json();
    },
  });
}

export function useCreateBlogTag() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: CreateTagData) => {
      const response = await fetch("/api/blog-tags", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || "Failed to create blog tag");
      }
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["blog-tags"] });
      toast.success("Tag created successfully");
    },
    onError: (error: Error) => {
      toast.error(error.message);
    },
  });
}
