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
  createdAt: string;
  updatedAt: string;
  _count?: {
    blogs: number;
  };
}

export interface BlogCategoriesResponse {
  categories: BlogCategory[];
}

interface CreateCategoryData {
  title: string;
  slug: string;
  description?: string;
  color?: string;
  icon?: string;
  order?: number;
}

interface UpdateCategoryData extends Partial<CreateCategoryData> {}

export function useBlogCategories() {
  return useQuery<BlogCategoriesResponse>({
    queryKey: ["blog-categories"],
    queryFn: async () => {
      const response = await fetch("/api/blog-categories");
      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || "Failed to fetch blog categories");
      }
      return response.json();
    },
  });
}

export function useBlogCategory(id: string) {
  return useQuery<BlogCategory>({
    queryKey: ["blog-category", id],
    queryFn: async () => {
      const response = await fetch(`/api/blog-categories/${id}`);
      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || "Failed to fetch blog category");
      }
      return response.json();
    },
    enabled: !!id,
  });
}

export function useCreateBlogCategory() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: CreateCategoryData) => {
      const response = await fetch("/api/blog-categories", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || "Failed to create blog category");
      }
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["blog-categories"] });
      toast.success("Category created successfully");
    },
    onError: (error: Error) => {
      toast.error(error.message);
    },
  });
}

export function useUpdateBlogCategory() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      id,
      data,
    }: {
      id: string;
      data: UpdateCategoryData;
    }) => {
      const response = await fetch(`/api/blog-categories/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || "Failed to update blog category");
      }
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["blog-categories"] });
      toast.success("Category updated successfully");
    },
    onError: (error: Error) => {
      toast.error(error.message);
    },
  });
}

export function useDeleteBlogCategory() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string) => {
      const response = await fetch(`/api/blog-categories/${id}`, {
        method: "DELETE",
      });
      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || "Failed to delete blog category");
      }
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["blog-categories"] });
      toast.success("Category deleted successfully");
    },
    onError: (error: Error) => {
      toast.error(error.message);
    },
  });
}
