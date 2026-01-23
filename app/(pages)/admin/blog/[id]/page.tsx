"use client";

import { ProtectedRoute } from "@/components/admin/protected-route";
import { AdminLayoutWrapper } from "@/components/admin/admin-layout-wrapper";
import { BlogForm } from "@/components/admin/blog-form";
import { useBlog } from "@/hooks/use-blogs";
import { useRouter } from "next/navigation";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowLeft, Pencil, AlertCircle } from "lucide-react";
import { use } from "react";

export default function EditBlogPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const router = useRouter();
  const { id } = use(params);
  const { data: blog, isLoading, error } = useBlog(id);

  const handleSuccess = () => {
    router.push("/admin/blog");
  };

  if (isLoading) {
    return (
      <ProtectedRoute>
        <AdminLayoutWrapper
          breadcrumbs={[
            { label: "Dashboard", href: "/admin/dashboard" },
            { label: "Blog Posts", href: "/admin/blog" },
            { label: "Edit Post" },
          ]}
        >
          <div className="space-y-6">
            <div className="flex items-start gap-4">
              <Skeleton className="h-12 w-12 rounded-xl" />
              <div className="space-y-2">
                <Skeleton className="h-8 w-48" />
                <Skeleton className="h-4 w-32" />
              </div>
            </div>
            <Card className="border-border/50">
              <CardContent className="p-6 space-y-4">
                <Skeleton className="h-10 w-full" />
                <Skeleton className="h-10 w-full" />
                <Skeleton className="h-32 w-full" />
                <Skeleton className="h-10 w-1/3" />
              </CardContent>
            </Card>
          </div>
        </AdminLayoutWrapper>
      </ProtectedRoute>
    );
  }

  if (error || !blog) {
    return (
      <ProtectedRoute>
        <AdminLayoutWrapper
          breadcrumbs={[
            { label: "Dashboard", href: "/admin/dashboard" },
            { label: "Blog Posts", href: "/admin/blog" },
            { label: "Edit Post" },
          ]}
        >
          <Card className="border-destructive/50 bg-destructive/5">
            <CardContent className="p-8 flex flex-col items-center text-center">
              <div className="h-12 w-12 rounded-xl bg-destructive/10 flex items-center justify-center mb-4">
                <AlertCircle className="h-6 w-6 text-destructive" />
              </div>
              <h3 className="text-lg font-semibold text-destructive mb-2">
                Error loading blog post
              </h3>
              <p className="text-sm text-muted-foreground mb-6">
                The blog post could not be found or loaded.
              </p>
              <Button
                variant="outline"
                onClick={() => router.push("/admin/blog")}
                className="gap-2"
              >
                <ArrowLeft className="h-4 w-4" />
                Back to Blog Posts
              </Button>
            </CardContent>
          </Card>
        </AdminLayoutWrapper>
      </ProtectedRoute>
    );
  }

  return (
    <ProtectedRoute>
      <AdminLayoutWrapper
        breadcrumbs={[
          { label: "Dashboard", href: "/admin/dashboard" },
          { label: "Blog Posts", href: "/admin/blog" },
          { label: blog.title },
        ]}
      >
        <div className="space-y-6">
          {/* Header */}
          <div className="flex items-start gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-linear-to-br from-primary/20 to-primary/10 text-primary ring-1 ring-inset ring-primary/20">
              <Pencil className="h-6 w-6" />
            </div>
            <div>
              <h1 className="text-3xl font-bold tracking-tight">
                Edit Blog Post
              </h1>
              <p className="text-muted-foreground">Update "{blog.title}"</p>
            </div>
          </div>

          {/* Form Card */}
          <Card className="border-border/50">
            <CardContent className="p-6">
              <BlogForm blog={blog} onSuccess={handleSuccess} />
            </CardContent>
          </Card>
        </div>
      </AdminLayoutWrapper>
    </ProtectedRoute>
  );
}
