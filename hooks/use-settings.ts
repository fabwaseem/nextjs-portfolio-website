import { useQuery } from "@tanstack/react-query";
import { staticSettings } from "@/lib/data/static-content";

export type AllSettings = typeof staticSettings;

export function useSettings() {
  return useQuery<AllSettings>({
    queryKey: ["settings"],
    queryFn: async () => staticSettings,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
}
