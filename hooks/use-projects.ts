import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";

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

interface CreateProjectData {
  title: string;
  slug: string;
  description?: string;
  excerpt?: string;
  demoLink?: string;
  githubLink?: string;
  videoUrl?: string;
  thumbnail: string;
  cover: string;
  youtubeId?: string;
  body?: any;
  techStack?: string[];
  featured?: boolean;
  status?: "DRAFT" | "PUBLISHED" | "ARCHIVED";
  publishedAt?: string | null;
  order?: number;
  metaTitle?: string;
  metaDescription?: string;
  seoKeywords?: string[];
  tagIds?: string[];
}

interface UpdateProjectData extends Partial<CreateProjectData> {}

export function useProjects(params?: ProjectsParams) {
  return useQuery<ProjectsResponse>({
    queryKey: ["projects", params],
    queryFn: async () => {
      const searchParams = new URLSearchParams();
      if (params?.status) searchParams.set("status", params.status);
      if (params?.featured !== undefined)
        searchParams.set("featured", params.featured.toString());
      if (params?.search) searchParams.set("search", params.search);
      if (params?.page) searchParams.set("page", params.page.toString());
      if (params?.limit) searchParams.set("limit", params.limit.toString());

      const response = await fetch(`/api/projects?${searchParams.toString()}`);
      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || "Failed to fetch projects");
      }
      return response.json();
    },
  });
}

export function useProject(id: string | null) {
  return useQuery<Project>({
    queryKey: ["project", id],
    queryFn: async () => {
      if (!id) throw new Error("Project ID is required");
      const response = await fetch(`/api/projects/${id}`);
      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || "Failed to fetch project");
      }
      return response.json();
    },
    enabled: !!id,
  });
}

export function useCreateProject() {
  const queryClient = useQueryClient();

  return useMutation<Project, Error, CreateProjectData>({
    mutationFn: async (data) => {
      const response = await fetch("/api/projects", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || "Failed to create project");
      }

      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["projects"] });
      toast.success("Project created successfully");
    },
    onError: (error) => {
      toast.error(error.message || "Failed to create project");
    },
  });
}

export function useUpdateProject() {
  const queryClient = useQueryClient();

  return useMutation<Project, Error, { id: string; data: UpdateProjectData }>({
    mutationFn: async ({ id, data }) => {
      const response = await fetch(`/api/projects/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || "Failed to update project");
      }

      return response.json();
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ["projects"] });
      queryClient.invalidateQueries({ queryKey: ["project", variables.id] });
      toast.success("Project updated successfully");
    },
    onError: (error) => {
      toast.error(error.message || "Failed to update project");
    },
  });
}

export function useDeleteProject() {
  const queryClient = useQueryClient();

  return useMutation<void, Error, string>({
    mutationFn: async (id) => {
      const response = await fetch(`/api/projects/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || "Failed to delete project");
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["projects"] });
      toast.success("Project deleted successfully");
    },
    onError: (error) => {
      toast.error(error.message || "Failed to delete project");
    },
  });
}
