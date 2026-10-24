import { useQuery } from "@tanstack/react-query";
import {
  getBlogCategories,
  getBlogCategoryById,
} from "@/lib/data/static-content";

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

export function useBlogCategories() {
  return useQuery<BlogCategoriesResponse>({
    queryKey: ["blog-categories"],
    queryFn: async () => getBlogCategories(),
  });
}

export function useBlogCategory(id: string) {
  return useQuery<BlogCategory>({
    queryKey: ["blog-category", id],
    queryFn: async () => {
      const category = getBlogCategoryById(id);
      if (!category) {
        throw new Error("Failed to fetch blog category");
      }
      return category;
    },
    enabled: !!id,
  });
}
