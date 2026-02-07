import { z } from "zod";

export const createTestimonialSchema = z.object({
  name: z.string().min(1, "Name is required"),
  role: z.string().min(1, "Role is required"),
  company: z.string().min(1, "Company is required"),
  companyUrl: z.union([z.string().url(), z.literal("")]).optional(),
  avatar: z.string().optional().nullable(),
  content: z.string().min(1, "Content is required"),
  rating: z.number().min(1).max(5).optional().nullable(),
  featured: z.boolean().optional().default(false),
  order: z.number().optional().default(0),
});

export const updateTestimonialSchema = createTestimonialSchema.partial();

export type CreateTestimonialInput = z.infer<typeof createTestimonialSchema>;
export type UpdateTestimonialInput = z.infer<typeof updateTestimonialSchema>;
