import { useQuery } from "@tanstack/react-query";
import { getProjectTags } from "@/lib/data/static-content";

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
    queryFn: async () => getProjectTags(),
  });
}
