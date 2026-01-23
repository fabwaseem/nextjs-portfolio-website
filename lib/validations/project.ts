import { z } from "zod";

export const projectStatusEnum = z.enum(["DRAFT", "PUBLISHED", "ARCHIVED"]);

const baseProjectSchema = {
  title: z.string().min(1, "Title is required"),
  slug: z.string().min(1, "Slug is required"),
  description: z.string().optional(),
  excerpt: z.string().optional(),
  demoLink: z.string().url().optional().or(z.literal("")),
  githubLink: z.string().url().optional().or(z.literal("")),
  videoUrl: z.string().url().optional().or(z.literal("")),
  thumbnail: z.string().min(1, "Thumbnail is required"),
  cover: z.string().min(1, "Cover is required"),
  youtubeId: z.string().optional(),
  body: z.any().optional(),
  techStack: z.array(z.string()),
  featured: z.boolean(),
  status: projectStatusEnum,
  publishedAt: z.string().datetime().optional().nullable(),
  order: z.number().int(),
  metaTitle: z.string().optional(),
  metaDescription: z.string().optional(),
  seoKeywords: z.array(z.string()),
  tagIds: z.array(z.string()),
};

export const createProjectSchema = z.object({
  ...baseProjectSchema,
  techStack: z.array(z.string()).default([]),
  featured: z.boolean().default(false),
  status: projectStatusEnum.default("DRAFT"),
  order: z.number().int().default(0),
  seoKeywords: z.array(z.string()).default([]),
  tagIds: z.array(z.string()).default([]),
});

export const updateProjectSchema = z.object({
  title: z.string().min(1, "Title is required").optional(),
  slug: z.string().min(1, "Slug is required").optional(),
  description: z.string().optional(),
  excerpt: z.string().optional(),
  demoLink: z.string().url().optional().or(z.literal("")),
  githubLink: z.string().url().optional().or(z.literal("")),
  videoUrl: z.string().url().optional().or(z.literal("")),
  thumbnail: z.string().min(1, "Thumbnail is required").optional(),
  cover: z.string().min(1, "Cover is required").optional(),
  youtubeId: z.string().optional(),
  body: z.any().optional(),
  techStack: z.array(z.string()).optional(),
  featured: z.boolean().optional(),
  status: projectStatusEnum.optional(),
  publishedAt: z.string().datetime().optional().nullable(),
  order: z.number().int().optional(),
  metaTitle: z.string().optional(),
  metaDescription: z.string().optional(),
  seoKeywords: z.array(z.string()).optional(),
  tagIds: z.array(z.string()).optional(),
});

export const projectFormSchema = z.object({
  title: z.string().min(1, "Title is required"),
  slug: z.string().min(1, "Slug is required").regex(/^[a-z0-9-]+$/, "Slug must be lowercase with hyphens only"),
  description: z.string().optional(),
  excerpt: z.string().optional(),
  demoLink: z.string().url().optional().or(z.literal("")),
  githubLink: z.string().url().optional().or(z.literal("")),
  videoUrl: z.string().url().optional().or(z.literal("")),
  thumbnail: z.string().min(1, "Thumbnail URL is required"),
  cover: z.string().min(1, "Cover URL is required"),
  youtubeId: z.string().optional(),
  body: z.string().optional(),
  techStack: z.array(z.string()),
  featured: z.boolean(),
  status: projectStatusEnum,
  publishedAt: z.string().datetime().optional().nullable(),
  order: z.number().int(),
  metaTitle: z.string().optional(),
  metaDescription: z.string().optional(),
  seoKeywords: z.string().optional(),
  tagIds: z.array(z.string()),
});

export type CreateProjectInput = z.infer<typeof createProjectSchema>;
export type UpdateProjectInput = z.infer<typeof updateProjectSchema>;
export type ProjectFormInput = z.infer<typeof projectFormSchema>;
