import { useQuery } from "@tanstack/react-query";
import { queryBlogs, getBlogById } from "@/lib/data/static-content";

export interface BlogCategory {
  id: string;
  title: string;
  slug: string;
  description?: string | null;
  color?: string | null;
  icon?: string | null;
  order: number;
}

export interface BlogTag {
  id: string;
  title: string;
  slug: string;
}

export interface Blog {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  metaTitle?: string | null;
  metaDescription?: string | null;
  featuredImage: string;
  featuredImageAlt?: string | null;
  publishedAt?: string | null;
  body?: string | null;
  readingTime?: number | null;
  wordCount?: number | null;
  views: number;
  featured: boolean;
  status: "DRAFT" | "PUBLISHED" | "ARCHIVED";
  seoKeywords: string[];
  order: number;
  createdAt: string;
  updatedAt: string;
  deletedAt?: string | null;
  categories: BlogCategory[];
  tags: BlogTag[];
}

export interface BlogsResponse {
  blogs: Blog[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

interface BlogsParams {
  status?: string;
  featured?: string;
  search?: string;
  categoryId?: string;
  page?: number;
  limit?: number;
}

export function useBlogs(params?: BlogsParams) {
  return useQuery<BlogsResponse>({
    queryKey: ["blogs", params],
    queryFn: async () => queryBlogs(params),
  });
}

export function useBlog(id: string) {
  return useQuery<Blog>({
    queryKey: ["blog", id],
    queryFn: async () => {
      const blog = getBlogById(id);
      if (!blog) {
        throw new Error("Failed to fetch blog");
      }
      return blog;
    },
    enabled: !!id,
  });
}
