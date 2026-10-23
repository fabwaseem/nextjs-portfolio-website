import { useQuery } from "@tanstack/react-query";
import { queryTestimonials } from "@/lib/data/static-content";

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  company: string;
  companyUrl: string | null;
  avatar: string | null;
  content: string;
  rating: number | null;
  featured: boolean;
  order: number;
  createdAt: string;
  updatedAt: string;
}

interface TestimonialsResponse {
  testimonials: Testimonial[];
}

export function useTestimonials(params?: { featured?: boolean; limit?: number }) {
  return useQuery<TestimonialsResponse>({
    queryKey: ["testimonials", params],
    queryFn: async () => queryTestimonials(params),
  });
}

export function useFeaturedTestimonials(limit = 6) {
  return useTestimonials({ featured: true, limit });
}
