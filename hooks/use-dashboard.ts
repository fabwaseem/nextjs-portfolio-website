import { useQuery } from "@tanstack/react-query";

export interface DashboardStats {
  projects: {
    total: number;
    published: number;
    draft: number;
    featured: number;
  };
  blogs: {
    total: number;
    published: number;
    draft: number;
    featured: number;
  };
  categories: number;
  tags: {
    project: number;
    blog: number;
  };
  views: {
    projects: number;
    blogs: number;
    total: number;
  };
}

export interface RecentActivity {
  id: string;
  title: string;
  slug: string;
  type: "project" | "blog";
  status: "DRAFT" | "PUBLISHED" | "ARCHIVED";
  action: "created" | "updated";
  timestamp: string;
}

export interface DashboardData {
  stats: DashboardStats;
  recentActivities: RecentActivity[];
}

async function fetchDashboardData(): Promise<DashboardData> {
  const response = await fetch("/api/dashboard");
  if (!response.ok) {
    throw new Error("Failed to fetch dashboard data");
  }
  return response.json();
}

export function useDashboard() {
  return useQuery({
    queryKey: ["dashboard"],
    queryFn: fetchDashboardData,
    staleTime: 30 * 1000, // 30 seconds
    refetchInterval: 60 * 1000, // Refetch every minute
  });
}
