import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";

export interface ProjectTag {
  id: string;
  title: string;
  slug: string;
  createdAt: string;
  updatedAt: string;
}

interface ProjectTagsResponse {
  tags: ProjectTag[];
}

export function useProjectTags() {
  return useQuery<ProjectTagsResponse>({
    queryKey: ["project-tags"],
    queryFn: async () => {
      const response = await fetch("/api/project-tags");
      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || "Failed to fetch project tags");
      }
      return response.json();
    },
  });
}

export function useCreateProjectTag() {
  const queryClient = useQueryClient();

  return useMutation<ProjectTag, Error, { title: string; slug: string }>({
    mutationFn: async (data) => {
      const response = await fetch("/api/project-tags", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || "Failed to create tag");
      }

      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["project-tags"] });
    },
    onError: (error) => {
      toast.error(error.message || "Failed to create tag");
    },
  });
}
