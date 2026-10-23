import { useQuery } from "@tanstack/react-query";
import { queryProjects, getProjectById } from "@/lib/data/static-content";

export interface Project {
  id: string;
  title: string;
  slug: string;
  description?: string | null;
  excerpt?: string | null;
  demoLink?: string | null;
  githubLink?: string | null;
  videoUrl?: string | null;
  thumbnail: string;
  cover: string;
  youtubeId?: string | null;
  body?: any;
  techStack: string[];
  featured: boolean;
  status: "DRAFT" | "PUBLISHED" | "ARCHIVED";
  publishedAt?: string | null;
  order: number;
  views: number;
  metaTitle?: string | null;
  metaDescription?: string | null;
  seoKeywords: string[];
  createdAt: string;
  updatedAt: string;
  deletedAt?: string | null;
  tags: Array<{
    id: string;
    title: string;
    slug: string;
  }>;
}

export interface ProjectsResponse {
  projects: Project[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

interface ProjectsParams {
  status?: string;
  featured?: string;
  search?: string;
  page?: number;
  limit?: number;
}

export function useProjects(params?: ProjectsParams) {
  return useQuery<ProjectsResponse>({
    queryKey: ["projects", params],
    queryFn: async () => queryProjects(params),
  });
}

/** Fetches only featured, published projects. Use for hero CodeEditor & projects section. */
export function useFeaturedProjects(limit = 6) {
  return useProjects({
    status: "PUBLISHED",
    featured: "true",
    limit,
  });
}

export function useProject(id: string | null) {
  return useQuery<Project>({
    queryKey: ["project", id],
    queryFn: async () => {
      if (!id) throw new Error("Project ID is required");
      const project = getProjectById(id);
      if (!project) {
        throw new Error("Failed to fetch project");
      }
      return project;
    },
    enabled: !!id,
  });
}
