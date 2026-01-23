import { z } from "zod";

export const blogStatusEnum = z.enum(["DRAFT", "PUBLISHED", "ARCHIVED"]);

const baseBlogSchema = {
  title: z.string().min(1, "Title is required"),
  slug: z.string().min(1, "Slug is required"),
  excerpt: z.string().min(1, "Excerpt is required"),
  metaTitle: z.string().optional(),
  metaDescription: z.string().optional(),
  featuredImage: z.string().min(1, "Featured image is required"),
  featuredImageAlt: z.string().optional(),
  publishedAt: z.string().datetime().optional().nullable(),
  markdownContent: z.string().optional(),
  body: z.any().optional(),
  readingTime: z.number().int().optional(),
  wordCount: z.number().int().optional(),
  featured: z.boolean(),
  status: blogStatusEnum,
  seoKeywords: z.array(z.string()),
  order: z.number().int(),
  categoryIds: z.array(z.string()),
  tagIds: z.array(z.string()),
};

export const createBlogSchema = z.object({
  ...baseBlogSchema,
  featured: z.boolean().default(false),
  status: blogStatusEnum.default("DRAFT"),
  order: z.number().int().default(0),
  seoKeywords: z.array(z.string()).default([]),
  categoryIds: z.array(z.string()).default([]),
  tagIds: z.array(z.string()).default([]),
});

export const updateBlogSchema = z.object({
  title: z.string().min(1, "Title is required").optional(),
  slug: z.string().min(1, "Slug is required").optional(),
  excerpt: z.string().min(1, "Excerpt is required").optional(),
  metaTitle: z.string().optional(),
  metaDescription: z.string().optional(),
  featuredImage: z.string().min(1, "Featured image is required").optional(),
  featuredImageAlt: z.string().optional(),
  publishedAt: z.string().datetime().optional().nullable(),
  markdownContent: z.string().optional(),
  body: z.any().optional(),
  readingTime: z.number().int().optional(),
  wordCount: z.number().int().optional(),
  featured: z.boolean().optional(),
  status: blogStatusEnum.optional(),
  seoKeywords: z.array(z.string()).optional(),
  order: z.number().int().optional(),
  categoryIds: z.array(z.string()).optional(),
  tagIds: z.array(z.string()).optional(),
});

export const blogFormSchema = z.object({
  title: z.string().min(1, "Title is required"),
  slug: z
    .string()
    .min(1, "Slug is required")
    .regex(/^[a-z0-9-]+$/, "Slug must be lowercase with hyphens only"),
  excerpt: z.string().min(1, "Excerpt is required"),
  metaTitle: z.string().optional(),
  metaDescription: z.string().optional(),
  featuredImage: z.string().min(1, "Featured image is required"),
  featuredImageAlt: z.string().optional(),
  publishedAt: z.string().datetime().optional().nullable(),
  body: z.string().optional(),
  featured: z.boolean(),
  status: blogStatusEnum,
  seoKeywords: z.string().optional(), // Comma-separated string for form
  categoryIds: z.array(z.string()),
  tagIds: z.array(z.string()),
  order: z.number().int(),
});

export type CreateBlogInput = z.infer<typeof createBlogSchema>;
export type UpdateBlogInput = z.infer<typeof updateBlogSchema>;
export type BlogFormInput = z.infer<typeof blogFormSchema>;
