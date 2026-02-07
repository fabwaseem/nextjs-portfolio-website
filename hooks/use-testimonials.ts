import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";

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

interface CreateTestimonialData {
  name: string;
  role: string;
  company: string;
  companyUrl?: string;
  avatar?: string | null;
  content: string;
  rating?: number | null;
  featured?: boolean;
  order?: number;
}

type UpdateTestimonialData = Partial<CreateTestimonialData>;

export function useTestimonials(params?: { featured?: boolean; limit?: number }) {
  return useQuery<TestimonialsResponse>({
    queryKey: ["testimonials", params],
    queryFn: async () => {
      const searchParams = new URLSearchParams();
      if (params?.featured) searchParams.set("featured", "true");
      if (params?.limit) searchParams.set("limit", params.limit.toString());

      const response = await fetch(`/api/testimonials?${searchParams.toString()}`);
      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || "Failed to fetch testimonials");
      }
      return response.json();
    },
  });
}

export function useFeaturedTestimonials(limit = 6) {
  return useTestimonials({ featured: true, limit });
}

export function useCreateTestimonial() {
  const queryClient = useQueryClient();

  return useMutation<Testimonial, Error, CreateTestimonialData>({
    mutationFn: async (data) => {
      const response = await fetch("/api/testimonials", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || "Failed to create testimonial");
      }
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["testimonials"] });
      toast.success("Testimonial added successfully");
    },
    onError: (error) => {
      toast.error(error.message || "Failed to create testimonial");
    },
  });
}

export function useUpdateTestimonial() {
  const queryClient = useQueryClient();

  return useMutation<
    Testimonial,
    Error,
    { id: string; data: UpdateTestimonialData }
  >({
    mutationFn: async ({ id, data }) => {
      const response = await fetch(`/api/testimonials/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || "Failed to update testimonial");
      }
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["testimonials"] });
      toast.success("Testimonial updated successfully");
    },
    onError: (error) => {
      toast.error(error.message || "Failed to update testimonial");
    },
  });
}

export function useDeleteTestimonial() {
  const queryClient = useQueryClient();

  return useMutation<void, Error, string>({
    mutationFn: async (id) => {
      const response = await fetch(`/api/testimonials/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || "Failed to delete testimonial");
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["testimonials"] });
      toast.success("Testimonial deleted successfully");
    },
    onError: (error) => {
      toast.error(error.message || "Failed to delete testimonial");
    },
  });
}
