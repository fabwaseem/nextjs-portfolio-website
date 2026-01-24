import { useMutation } from "@tanstack/react-query";
import { toast } from "react-hot-toast";

export interface GeneratedBlog {
  title: string;
  slug: string;
  excerpt: string;
  body: string;
  metaTitle: string;
  metaDescription: string;
  seoKeywords: string[];
  featuredImageAlt: string;
  categoryIds: string[];
  tagIds: string[];
  newCategories: string[];
  newTags: string[];
}

interface GenerateBlogInput {
  title?: string;
}

export function useGenerateBlog() {
  return useMutation({
    mutationFn: async (input: GenerateBlogInput): Promise<GeneratedBlog> => {
      const response = await fetch("/api/ai/generate-blog", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(input),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || "Failed to generate blog");
      }

      return response.json();
    },
    onSuccess: () => {
      toast.success("Blog content generated successfully!");
    },
    onError: (error: Error) => {
      toast.error(error.message);
    },
  });
}
