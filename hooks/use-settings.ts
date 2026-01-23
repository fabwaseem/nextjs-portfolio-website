import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import type {
  PersonalDetailsInput,
  SiteDetailsInput,
  SocialLinksInput,
  PortfolioSettingsInput,
  BlogSettingsInput,
  ResumeSettingsInput,
  ContactSettingsInput,
  SeoSettingsInput,
} from "@/lib/validations/settings";

export interface AllSettings {
  personal: PersonalDetailsInput & {
    id: string;
    createdAt: string;
    updatedAt: string;
  };
  site: SiteDetailsInput & { id: string; createdAt: string; updatedAt: string };
  social: SocialLinksInput & {
    id: string;
    createdAt: string;
    updatedAt: string;
  };
  portfolio: PortfolioSettingsInput & {
    id: string;
    createdAt: string;
    updatedAt: string;
  };
  blog: BlogSettingsInput & {
    id: string;
    createdAt: string;
    updatedAt: string;
  };
  resume: ResumeSettingsInput & {
    id: string;
    createdAt: string;
    updatedAt: string;
  };
  contact: ContactSettingsInput & {
    id: string;
    createdAt: string;
    updatedAt: string;
  };
  seo: SeoSettingsInput & { id: string; createdAt: string; updatedAt: string };
}

type SettingsType =
  | "personal"
  | "site"
  | "social"
  | "portfolio"
  | "blog"
  | "resume"
  | "contact"
  | "seo";

async function fetchSettings(): Promise<AllSettings> {
  const response = await fetch("/api/settings");
  if (!response.ok) {
    throw new Error("Failed to fetch settings");
  }
  return response.json();
}

async function updateSettings<T>(type: SettingsType, data: T): Promise<T> {
  const response = await fetch("/api/settings", {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ type, data }),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || "Failed to update settings");
  }

  return response.json();
}

export function useSettings() {
  return useQuery({
    queryKey: ["settings"],
    queryFn: fetchSettings,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
}

export function useUpdateSettings<T>(type: SettingsType) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: T) => updateSettings(type, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["settings"] });
      toast.success(
        `${type.charAt(0).toUpperCase() + type.slice(1)} settings saved!`,
      );
    },
    onError: (error: Error) => {
      toast.error(error.message || "Failed to save settings");
    },
  });
}

// Convenience hooks for each settings type
export function useUpdatePersonalDetails() {
  return useUpdateSettings<PersonalDetailsInput>("personal");
}

export function useUpdateSiteDetails() {
  return useUpdateSettings<SiteDetailsInput>("site");
}

export function useUpdateSocialLinks() {
  return useUpdateSettings<SocialLinksInput>("social");
}

export function useUpdatePortfolioSettings() {
  return useUpdateSettings<PortfolioSettingsInput>("portfolio");
}

export function useUpdateBlogSettings() {
  return useUpdateSettings<BlogSettingsInput>("blog");
}

export function useUpdateResumeSettings() {
  return useUpdateSettings<ResumeSettingsInput>("resume");
}

export function useUpdateContactSettings() {
  return useUpdateSettings<ContactSettingsInput>("contact");
}

export function useUpdateSeoSettings() {
  return useUpdateSettings<SeoSettingsInput>("seo");
}
