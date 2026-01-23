"use client";

import { ProtectedRoute } from "@/components/admin/protected-route";
import { AdminLayoutWrapper } from "@/components/admin/admin-layout-wrapper";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  FolderKanban,
  FileText,
  Tag,
  Settings,
  ArrowRight,
  TrendingUp,
  Clock,
  Sparkles,
  Eye,
  Star,
  Edit3,
  Plus,
  BarChart3,
  Activity,
  Layers,
} from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { useDashboard } from "@/hooks/use-dashboard";
import { formatDistanceToNow } from "date-fns";

export default function AdminDashboardPage() {
  const { data, isLoading } = useDashboard();

  const dashboardCards = [
    {
      title: "Projects",
      description: "Manage your portfolio projects",
      icon: FolderKanban,
      href: "/admin/projects",
      count: data?.stats.projects.total ?? 0,
      gradient: "from-blue-500/20 to-cyan-500/20",
      iconColor: "text-blue-500",
    },
    {
      title: "Blog Posts",
      description: "Create and manage blog articles",
      icon: FileText,
      href: "/admin/blog",
      count: data?.stats.blogs.total ?? 0,
      gradient: "from-violet-500/20 to-purple-500/20",
      iconColor: "text-violet-500",
    },
    {
      title: "Categories",
      description: "Organize blog categories",
      icon: Tag,
      href: "/admin/categories",
      count: data?.stats.categories ?? 0,
      gradient: "from-amber-500/20 to-orange-500/20",
      iconColor: "text-amber-500",
    },
    {
      title: "Settings",
      description: "Configure your portfolio",
      icon: Settings,
      href: "/admin/settings",
      gradient: "from-emerald-500/20 to-teal-500/20",
      iconColor: "text-emerald-500",
    },
  ];

  const quickStats = [
    {
      label: "Total Projects",
      value: data?.stats.projects.total ?? 0,
      color: "bg-blue-500",
      icon: FolderKanban,
    },
    {
      label: "Published Projects",
      value: data?.stats.projects.published ?? 0,
      color: "bg-emerald-500",
      icon: Star,
    },
    {
      label: "Total Blog Posts",
      value: data?.stats.blogs.total ?? 0,
      color: "bg-violet-500",
      icon: FileText,
    },
    {
      label: "Published Posts",
      value: data?.stats.blogs.published ?? 0,
      color: "bg-emerald-500",
      icon: Star,
    },
    {
      label: "Draft Posts",
      value: data?.stats.blogs.draft ?? 0,
      color: "bg-amber-500",
      icon: Edit3,
    },
    {
      label: "Total Views",
      value: data?.stats.views.total ?? 0,
      color: "bg-pink-500",
      icon: Eye,
    },
  ];

  const analyticsCards = [
    {
      title: "Total Views",
      value: data?.stats.views.total ?? 0,
      change: "+12%",
      positive: true,
      icon: Eye,
      gradient: "from-pink-500/20 to-rose-500/20",
      iconColor: "text-pink-500",
    },
    {
      title: "Project Views",
      value: data?.stats.views.projects ?? 0,
      change: "+8%",
      positive: true,
      icon: FolderKanban,
      gradient: "from-blue-500/20 to-cyan-500/20",
      iconColor: "text-blue-500",
    },
    {
      title: "Blog Views",
      value: data?.stats.views.blogs ?? 0,
      change: "+15%",
      positive: true,
      icon: FileText,
      gradient: "from-violet-500/20 to-purple-500/20",
      iconColor: "text-violet-500",
    },
    {
      title: "Featured Content",
      value:
        (data?.stats.projects.featured ?? 0) +
        (data?.stats.blogs.featured ?? 0),
      change: "Active",
      positive: true,
      icon: Star,
      gradient: "from-amber-500/20 to-orange-500/20",
      iconColor: "text-amber-500",
    },
  ];

  const getActivityIcon = (type: string, action: string) => {
    if (action === "created") return Plus;
    return Edit3;
  };

  const getActivityColor = (type: string) => {
    return type === "project"
      ? "text-blue-500 bg-blue-500/10"
      : "text-violet-500 bg-violet-500/10";
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "PUBLISHED":
        return (
          <Badge
            variant="default"
            className="bg-emerald-500/10 text-emerald-600 border-emerald-500/20"
          >
            Published
          </Badge>
        );
      case "DRAFT":
        return <Badge variant="secondary">Draft</Badge>;
      case "ARCHIVED":
        return <Badge variant="outline">Archived</Badge>;
      default:
        return null;
    }
  };

  return (
    <ProtectedRoute>
      <AdminLayoutWrapper breadcrumbs={[{ label: "Dashboard" }]}>
        <div className="space-y-8">
          {/* Hero Section */}
          <div className="relative overflow-hidden rounded-2xl bg-linear-to-br from-primary/10 via-primary/5 to-transparent border border-primary/10 p-8">
            <div className="absolute top-0 right-0 -mt-4 -mr-4 h-32 w-32 rounded-full bg-primary/10 blur-3xl" />
            <div className="absolute bottom-0 left-1/2 -mb-8 h-24 w-24 rounded-full bg-primary/5 blur-2xl" />
            <div className="relative">
              <div className="flex items-center gap-2 mb-2">
                <Sparkles className="h-5 w-5 text-primary" />
                <span className="text-sm font-medium text-primary">
                  Welcome back
                </span>
              </div>
              <h1 className="text-3xl font-bold tracking-tight mb-2">
                Dashboard
              </h1>
              <p className="text-muted-foreground max-w-lg">
                Manage your portfolio content, track your progress, and stay on
                top of your creative work.
              </p>
            </div>
          </div>

          {/* Analytics Overview */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <BarChart3 className="h-5 w-5 text-primary" />
              <h2 className="text-lg font-semibold">Analytics Overview</h2>
            </div>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              {analyticsCards.map((card, index) => {
                const Icon = card.icon;
                return (
                  <Card key={index} className="overflow-hidden">
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between">
                        <div>
                          <p className="text-sm text-muted-foreground mb-1">
                            {card.title}
                          </p>
                          {isLoading ? (
                            <Skeleton className="h-8 w-16" />
                          ) : (
                            <p className="text-3xl font-bold tabular-nums">
                              {card.value.toLocaleString()}
                            </p>
                          )}
                        </div>
                        <div
                          className={`flex h-10 w-10 items-center justify-center rounded-xl bg-linear-to-br ${card.gradient} ${card.iconColor}`}
                        >
                          <Icon className="h-5 w-5" />
                        </div>
                      </div>
                      <div className="mt-3 flex items-center gap-1">
                        <TrendingUp
                          className={`h-3 w-3 ${card.positive ? "text-emerald-500" : "text-red-500"}`}
                        />
                        <span
                          className={`text-xs font-medium ${card.positive ? "text-emerald-500" : "text-red-500"}`}
                        >
                          {card.change}
                        </span>
                        <span className="text-xs text-muted-foreground">
                          vs last month
                        </span>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>

          {/* Quick Access Cards */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Layers className="h-5 w-5 text-primary" />
              <h2 className="text-lg font-semibold">Quick Access</h2>
            </div>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              {dashboardCards.map((card) => {
                const Icon = card.icon;
                return (
                  <Link key={card.href} href={card.href} className="group">
                    <Card className="h-full transition-all duration-300 hover:shadow-xl hover:shadow-primary/5 hover:-translate-y-1 hover:border-primary/30">
                      <CardHeader className="pb-3">
                        <div className="flex items-center justify-between">
                          <div
                            className={`flex h-12 w-12 items-center justify-center rounded-xl bg-linear-to-br ${card.gradient} ${card.iconColor} ring-1 ring-inset ring-white/10`}
                          >
                            <Icon className="h-6 w-6" />
                          </div>
                          {card.count !== undefined &&
                            (isLoading ? (
                              <Skeleton className="h-8 w-8" />
                            ) : (
                              <span className="text-3xl font-bold tabular-nums">
                                {card.count}
                              </span>
                            ))}
                        </div>
                        <CardTitle className="mt-4 text-lg">
                          {card.title}
                        </CardTitle>
                        <CardDescription className="text-sm">
                          {card.description}
                        </CardDescription>
                      </CardHeader>
                      <CardContent className="pt-0">
                        <div className="flex items-center gap-2 text-sm text-muted-foreground group-hover:text-primary transition-colors">
                          <span>Manage</span>
                          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                        </div>
                      </CardContent>
                    </Card>
                  </Link>
                );
              })}
            </div>
          </div>

          {/* Stats and Activity */}
          <div className="grid gap-6 md:grid-cols-2">
            {/* Quick Stats */}
            <Card className="overflow-hidden">
              <CardHeader className="border-b border-border/50 bg-muted/30">
                <div className="flex items-center gap-2">
                  <TrendingUp className="h-5 w-5 text-primary" />
                  <CardTitle className="text-lg">Quick Stats</CardTitle>
                </div>
                <CardDescription>Overview of your content</CardDescription>
              </CardHeader>
              <CardContent className="p-0">
                <div className="divide-y divide-border/50">
                  {quickStats.map((stat, index) => {
                    const Icon = stat.icon;
                    return (
                      <div
                        key={index}
                        className="flex items-center justify-between p-4 hover:bg-muted/30 transition-colors"
                      >
                        <div className="flex items-center gap-3">
                          <div
                            className={`h-8 w-8 rounded-lg ${stat.color}/10 flex items-center justify-center`}
                          >
                            <Icon
                              className={`h-4 w-4 ${stat.color.replace("bg-", "text-")}`}
                            />
                          </div>
                          <span className="text-sm text-muted-foreground">
                            {stat.label}
                          </span>
                        </div>
                        {isLoading ? (
                          <Skeleton className="h-7 w-8" />
                        ) : (
                          <span className="text-2xl font-bold tabular-nums">
                            {stat.value.toLocaleString()}
                          </span>
                        )}
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>

            {/* Recent Activity */}
            <Card className="overflow-hidden">
              <CardHeader className="border-b border-border/50 bg-muted/30">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Activity className="h-5 w-5 text-primary" />
                    <CardTitle className="text-lg">Recent Activity</CardTitle>
                  </div>
                  <Badge variant="secondary" className="text-xs">
                    Last 5
                  </Badge>
                </div>
                <CardDescription>Your latest actions</CardDescription>
              </CardHeader>
              <CardContent className="p-0">
                {isLoading ? (
                  <div className="p-4 space-y-4">
                    {[...Array(5)].map((_, i) => (
                      <div key={i} className="flex items-center gap-3">
                        <Skeleton className="h-10 w-10 rounded-lg" />
                        <div className="flex-1 space-y-2">
                          <Skeleton className="h-4 w-3/4" />
                          <Skeleton className="h-3 w-1/2" />
                        </div>
                      </div>
                    ))}
                  </div>
                ) : data?.recentActivities &&
                  data.recentActivities.length > 0 ? (
                  <div className="divide-y divide-border/50">
                    {data.recentActivities.map((activity) => {
                      const Icon = getActivityIcon(
                        activity.type,
                        activity.action,
                      );
                      const colorClass = getActivityColor(activity.type);
                      return (
                        <Link
                          key={`${activity.type}-${activity.id}`}
                          href={
                            activity.type === "project"
                              ? `/admin/projects/${activity.id}`
                              : `/admin/blog/${activity.id}`
                          }
                          className="flex items-start gap-3 p-4 hover:bg-muted/30 transition-colors group"
                        >
                          <div
                            className={`h-10 w-10 rounded-lg flex items-center justify-center ${colorClass}`}
                          >
                            <Icon className="h-4 w-4" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 mb-1">
                              <span className="text-sm font-medium truncate group-hover:text-primary transition-colors">
                                {activity.title}
                              </span>
                              {getStatusBadge(activity.status)}
                            </div>
                            <div className="flex items-center gap-2 text-xs text-muted-foreground">
                              <span className="capitalize">
                                {activity.type}
                              </span>
                              <span>•</span>
                              <span className="capitalize">
                                {activity.action}
                              </span>
                              <span>•</span>
                              <span>
                                {formatDistanceToNow(
                                  new Date(activity.timestamp),
                                  { addSuffix: true },
                                )}
                              </span>
                            </div>
                          </div>
                          <ArrowRight className="h-4 w-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
                        </Link>
                      );
                    })}
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center py-12 text-center">
                    <div className="h-12 w-12 rounded-full bg-muted/50 flex items-center justify-center mb-4">
                      <Clock className="h-6 w-6 text-muted-foreground/50" />
                    </div>
                    <p className="text-sm text-muted-foreground mb-1">
                      No recent activity
                    </p>
                    <p className="text-xs text-muted-foreground/70 mb-4">
                      Start by creating your first project or blog post
                    </p>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm" asChild>
                        <Link href="/admin/projects/new">
                          <Plus className="h-4 w-4 mr-1" />
                          New Project
                        </Link>
                      </Button>
                      <Button variant="outline" size="sm" asChild>
                        <Link href="/admin/blog/new">
                          <Plus className="h-4 w-4 mr-1" />
                          New Post
                        </Link>
                      </Button>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Content Breakdown */}
          <Card className="overflow-hidden">
            <CardHeader className="border-b border-border/50 bg-muted/30">
              <div className="flex items-center gap-2">
                <Layers className="h-5 w-5 text-primary" />
                <CardTitle className="text-lg">Content Breakdown</CardTitle>
              </div>
              <CardDescription>
                Status distribution of your content
              </CardDescription>
            </CardHeader>
            <CardContent className="p-6">
              <div className="grid gap-6 md:grid-cols-2">
                {/* Projects Breakdown */}
                <div className="space-y-4">
                  <h4 className="text-sm font-medium flex items-center gap-2">
                    <FolderKanban className="h-4 w-4 text-blue-500" />
                    Projects
                  </h4>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">
                        Published
                      </span>
                      <div className="flex items-center gap-2">
                        {isLoading ? (
                          <Skeleton className="h-5 w-8" />
                        ) : (
                          <span className="font-medium">
                            {data?.stats.projects.published ?? 0}
                          </span>
                        )}
                        <div className="h-2 w-24 bg-muted rounded-full overflow-hidden">
                          <div
                            className="h-full bg-emerald-500 rounded-full transition-all"
                            style={{
                              width: `${data?.stats.projects.total ? (data.stats.projects.published / data.stats.projects.total) * 100 : 0}%`,
                            }}
                          />
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">
                        Draft
                      </span>
                      <div className="flex items-center gap-2">
                        {isLoading ? (
                          <Skeleton className="h-5 w-8" />
                        ) : (
                          <span className="font-medium">
                            {data?.stats.projects.draft ?? 0}
                          </span>
                        )}
                        <div className="h-2 w-24 bg-muted rounded-full overflow-hidden">
                          <div
                            className="h-full bg-amber-500 rounded-full transition-all"
                            style={{
                              width: `${data?.stats.projects.total ? (data.stats.projects.draft / data.stats.projects.total) * 100 : 0}%`,
                            }}
                          />
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">
                        Featured
                      </span>
                      <div className="flex items-center gap-2">
                        {isLoading ? (
                          <Skeleton className="h-5 w-8" />
                        ) : (
                          <span className="font-medium">
                            {data?.stats.projects.featured ?? 0}
                          </span>
                        )}
                        <div className="h-2 w-24 bg-muted rounded-full overflow-hidden">
                          <div
                            className="h-full bg-blue-500 rounded-full transition-all"
                            style={{
                              width: `${data?.stats.projects.total ? (data.stats.projects.featured / data.stats.projects.total) * 100 : 0}%`,
                            }}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Blogs Breakdown */}
                <div className="space-y-4">
                  <h4 className="text-sm font-medium flex items-center gap-2">
                    <FileText className="h-4 w-4 text-violet-500" />
                    Blog Posts
                  </h4>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">
                        Published
                      </span>
                      <div className="flex items-center gap-2">
                        {isLoading ? (
                          <Skeleton className="h-5 w-8" />
                        ) : (
                          <span className="font-medium">
                            {data?.stats.blogs.published ?? 0}
                          </span>
                        )}
                        <div className="h-2 w-24 bg-muted rounded-full overflow-hidden">
                          <div
                            className="h-full bg-emerald-500 rounded-full transition-all"
                            style={{
                              width: `${data?.stats.blogs.total ? (data.stats.blogs.published / data.stats.blogs.total) * 100 : 0}%`,
                            }}
                          />
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">
                        Draft
                      </span>
                      <div className="flex items-center gap-2">
                        {isLoading ? (
                          <Skeleton className="h-5 w-8" />
                        ) : (
                          <span className="font-medium">
                            {data?.stats.blogs.draft ?? 0}
                          </span>
                        )}
                        <div className="h-2 w-24 bg-muted rounded-full overflow-hidden">
                          <div
                            className="h-full bg-amber-500 rounded-full transition-all"
                            style={{
                              width: `${data?.stats.blogs.total ? (data.stats.blogs.draft / data.stats.blogs.total) * 100 : 0}%`,
                            }}
                          />
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">
                        Featured
                      </span>
                      <div className="flex items-center gap-2">
                        {isLoading ? (
                          <Skeleton className="h-5 w-8" />
                        ) : (
                          <span className="font-medium">
                            {data?.stats.blogs.featured ?? 0}
                          </span>
                        )}
                        <div className="h-2 w-24 bg-muted rounded-full overflow-hidden">
                          <div
                            className="h-full bg-violet-500 rounded-full transition-all"
                            style={{
                              width: `${data?.stats.blogs.total ? (data.stats.blogs.featured / data.stats.blogs.total) * 100 : 0}%`,
                            }}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </AdminLayoutWrapper>
    </ProtectedRoute>
  );
}
