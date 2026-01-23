import { z } from "zod";

export const createProjectTagSchema = z.object({
  title: z.string().min(1, "Title is required"),
  slug: z.string().min(1, "Slug is required"),
});

export const updateProjectTagSchema = z.object({
  title: z.string().min(1, "Title is required").optional(),
  slug: z.string().min(1, "Slug is required").optional(),
});

export type CreateProjectTagInput = z.infer<typeof createProjectTagSchema>;
export type UpdateProjectTagInput = z.infer<typeof updateProjectTagSchema>;
