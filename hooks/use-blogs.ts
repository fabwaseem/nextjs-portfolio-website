import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";

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
  markdownContent?: string | null;
  body?: any;
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

interface CreateBlogData {
  title: string;
  slug: string;
  excerpt: string;
  metaTitle?: string;
  metaDescription?: string;
  featuredImage: string;
  featuredImageAlt?: string;
  publishedAt?: string | null;
  markdownContent?: string;
  body?: any;
  featured?: boolean;
  status?: "DRAFT" | "PUBLISHED" | "ARCHIVED";
  seoKeywords?: string[];
  order?: number;
  categoryIds?: string[];
  tagIds?: string[];
}

interface UpdateBlogData extends Partial<CreateBlogData> {}

export function useBlogs(params?: BlogsParams) {
  return useQuery<BlogsResponse>({
    queryKey: ["blogs", params],
    queryFn: async () => {
      const searchParams = new URLSearchParams();
      if (params?.status) searchParams.set("status", params.status);
      if (params?.featured !== undefined)
        searchParams.set("featured", params.featured.toString());
      if (params?.search) searchParams.set("search", params.search);
      if (params?.categoryId) searchParams.set("categoryId", params.categoryId);
      if (params?.page) searchParams.set("page", params.page.toString());
      if (params?.limit) searchParams.set("limit", params.limit.toString());

      const response = await fetch(`/api/blogs?${searchParams.toString()}`);
      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || "Failed to fetch blogs");
      }
      return response.json();
    },
  });
}

export function useBlog(id: string) {
  return useQuery<Blog>({
    queryKey: ["blog", id],
    queryFn: async () => {
      const response = await fetch(`/api/blogs/${id}`);
      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || "Failed to fetch blog");
      }
      return response.json();
    },
    enabled: !!id,
  });
}

export function useCreateBlog() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: CreateBlogData) => {
      const response = await fetch("/api/blogs", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || "Failed to create blog");
      }
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["blogs"] });
      toast.success("Blog post created successfully");
    },
    onError: (error: Error) => {
      toast.error(error.message);
    },
  });
}

export function useUpdateBlog() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, data }: { id: string; data: UpdateBlogData }) => {
      const response = await fetch(`/api/blogs/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || "Failed to update blog");
      }
      return response.json();
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ["blogs"] });
      queryClient.invalidateQueries({ queryKey: ["blog", variables.id] });
      toast.success("Blog post updated successfully");
    },
    onError: (error: Error) => {
      toast.error(error.message);
    },
  });
}

export function useDeleteBlog() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string) => {
      const response = await fetch(`/api/blogs/${id}`, {
        method: "DELETE",
      });
      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || "Failed to delete blog");
      }
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["blogs"] });
      toast.success("Blog post deleted successfully");
    },
    onError: (error: Error) => {
      toast.error(error.message);
    },
  });
}
