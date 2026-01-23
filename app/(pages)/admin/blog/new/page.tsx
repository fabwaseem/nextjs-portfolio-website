"use client";

import { ProtectedRoute } from "@/components/admin/protected-route";
import { AdminLayoutWrapper } from "@/components/admin/admin-layout-wrapper";
import { BlogForm } from "@/components/admin/blog-form";
import { Card, CardContent } from "@/components/ui/card";
import { useRouter } from "next/navigation";
import { FilePlus } from "lucide-react";

export default function NewBlogPage() {
  const router = useRouter();

  const handleSuccess = () => {
    router.push("/admin/blog");
  };

  return (
    <ProtectedRoute>
      <AdminLayoutWrapper
        breadcrumbs={[
          { label: "Dashboard", href: "/admin/dashboard" },
          { label: "Blog Posts", href: "/admin/blog" },
          { label: "New Post" },
        ]}
      >
        <div className="space-y-6">
          {/* Header */}
          <div className="flex items-start gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-linear-to-br from-primary/20 to-primary/10 text-primary ring-1 ring-inset ring-primary/20">
              <FilePlus className="h-6 w-6" />
            </div>
            <div>
              <h1 className="text-3xl font-bold tracking-tight">
                Create New Post
              </h1>
              <p className="text-muted-foreground">Write a new blog post</p>
            </div>
          </div>

          {/* Form Card */}
          <Card className="border-border/50">
            <CardContent className="p-6">
              <BlogForm onSuccess={handleSuccess} />
            </CardContent>
          </Card>
        </div>
      </AdminLayoutWrapper>
    </ProtectedRoute>
  );
}
