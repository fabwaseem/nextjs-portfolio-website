"use client";

import { useState } from "react";
import { ProtectedRoute } from "@/components/admin/protected-route";
import { AdminLayoutWrapper } from "@/components/admin/admin-layout-wrapper";
import { useBlogs, useDeleteBlog, type Blog } from "@/hooks/use-blogs";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import {
  Plus,
  Pencil,
  Trash2,
  Search,
  FileText,
  Filter,
  Star,
  ChevronLeft,
  ChevronRight,
  Clock,
  Eye,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent } from "@/components/ui/card";
import Link from "next/link";

export default function AdminBlogPage() {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [featuredFilter, setFeaturedFilter] = useState<string>("all");
  const [page, setPage] = useState(1);
  const [deletingBlog, setDeletingBlog] = useState<Blog | null>(null);

  const { data, isLoading, error } = useBlogs({
    search: search || undefined,
    status: statusFilter !== "all" ? statusFilter : undefined,
    featured: featuredFilter !== "all" ? featuredFilter : undefined,
    page,
    limit: 10,
  });

  const deleteBlog = useDeleteBlog();

  const handleDelete = (blog: Blog) => {
    setDeletingBlog(blog);
  };

  const confirmDelete = () => {
    if (deletingBlog) {
      deleteBlog.mutate(deletingBlog.id, {
        onSuccess: () => {
          setDeletingBlog(null);
        },
      });
    }
  };

  const getStatusBadgeVariant = (status: string) => {
    switch (status) {
      case "PUBLISHED":
        return "default";
      case "DRAFT":
        return "secondary";
      case "ARCHIVED":
        return "outline";
      default:
        return "secondary";
    }
  };

  return (
    <ProtectedRoute>
      <AdminLayoutWrapper
        breadcrumbs={[
          { label: "Dashboard", href: "/admin/dashboard" },
          { label: "Blog Posts" },
        ]}
      >
        <div className="space-y-6">
          {/* Header */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <h1 className="text-3xl font-bold tracking-tight">Blog Posts</h1>
              <p className="text-muted-foreground">Manage your blog content</p>
            </div>
            <Button asChild className="shadow-lg shadow-primary/25">
              <Link href="/admin/blog/new">
                <Plus className="h-4 w-4 mr-2" />
                New Post
              </Link>
            </Button>
          </div>

          {/* Filters Card */}
          <Card className="border-border/50">
            <CardContent className="p-4">
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="flex-1 relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search posts..."
                    value={search}
                    onChange={(e) => {
                      setSearch(e.target.value);
                      setPage(1);
                    }}
                    className="w-full pl-10"
                  />
                </div>
                <div className="flex gap-3">
                  <Select value={statusFilter} onValueChange={setStatusFilter}>
                    <SelectTrigger className="w-full sm:w-40">
                      <Filter className="h-4 w-4 mr-2" />
                      <SelectValue placeholder="Status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Status</SelectItem>
                      <SelectItem value="DRAFT">Draft</SelectItem>
                      <SelectItem value="PUBLISHED">Published</SelectItem>
                      <SelectItem value="ARCHIVED">Archived</SelectItem>
                    </SelectContent>
                  </Select>
                  <Select
                    value={featuredFilter}
                    onValueChange={setFeaturedFilter}
                  >
                    <SelectTrigger className="w-full sm:w-40">
                      <Star className="h-4 w-4 mr-2" />
                      <SelectValue placeholder="Featured" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Posts</SelectItem>
                      <SelectItem value="true">Featured</SelectItem>
                      <SelectItem value="false">Not Featured</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>

          {isLoading ? (
            <Card className="border-border/50">
              <CardContent className="p-6 space-y-4">
                {[...Array(5)].map((_, i) => (
                  <Skeleton key={i} className="h-16 w-full" />
                ))}
              </CardContent>
            </Card>
          ) : error ? (
            <Card className="border-destructive/50 bg-destructive/5">
              <CardContent className="p-6 text-center text-destructive">
                Error loading blog posts. Please try again.
              </CardContent>
            </Card>
          ) : !data?.blogs.length ? (
            <Card className="border-border/50">
              <CardContent className="flex flex-col items-center justify-center py-16 text-center">
                <div className="h-16 w-16 rounded-2xl bg-muted/50 flex items-center justify-center mb-4">
                  <FileText className="h-8 w-8 text-muted-foreground/50" />
                </div>
                <h3 className="text-lg font-semibold mb-1">
                  No blog posts found
                </h3>
                <p className="text-sm text-muted-foreground mb-6 max-w-sm">
                  {search || statusFilter !== "all" || featuredFilter !== "all"
                    ? "Try adjusting your filters or search query"
                    : "Get started by creating your first blog post"}
                </p>
                {!search &&
                  statusFilter === "all" &&
                  featuredFilter === "all" && (
                    <Button asChild>
                      <Link href="/admin/blog/new">
                        <Plus className="h-4 w-4 mr-2" />
                        Create Post
                      </Link>
                    </Button>
                  )}
              </CardContent>
            </Card>
          ) : (
            <>
              {/* Table Card */}
              <Card className="border-border/50 overflow-hidden">
                <Table>
                  <TableHeader>
                    <TableRow className="bg-muted/30 hover:bg-muted/30">
                      <TableHead className="font-semibold">Title</TableHead>
                      <TableHead className="font-semibold">Status</TableHead>
                      <TableHead className="font-semibold">Featured</TableHead>
                      <TableHead className="font-semibold">Reading</TableHead>
                      <TableHead className="font-semibold">Views</TableHead>
                      <TableHead className="font-semibold">Created</TableHead>
                      <TableHead className="text-right font-semibold">
                        Actions
                      </TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {data.blogs.map((blog) => (
                      <TableRow key={blog.id} className="group">
                        <TableCell className="font-medium">
                          <div className="flex flex-col">
                            <span className="group-hover:text-primary transition-colors">
                              {blog.title}
                            </span>
                            <span className="text-xs text-muted-foreground">
                              /{blog.slug}
                            </span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge variant={getStatusBadgeVariant(blog.status)}>
                            {blog.status.toLowerCase()}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          {blog.featured ? (
                            <Badge
                              variant="default"
                              className="bg-amber-500/10 text-amber-600 border-amber-500/20"
                            >
                              <Star className="h-3 w-3 mr-1 fill-current" />
                              Featured
                            </Badge>
                          ) : (
                            <span className="text-muted-foreground text-sm">
                              —
                            </span>
                          )}
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-1 text-muted-foreground">
                            <Clock className="h-3 w-3" />
                            <span className="text-sm">
                              {blog.readingTime || 0} min
                            </span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-1 text-muted-foreground tabular-nums">
                            <Eye className="h-3 w-3" />
                            <span className="text-sm">
                              {blog.views?.toLocaleString() || 0}
                            </span>
                          </div>
                        </TableCell>
                        <TableCell className="text-muted-foreground">
                          {new Date(blog.createdAt).toLocaleDateString(
                            "en-US",
                            {
                              month: "short",
                              day: "numeric",
                              year: "numeric",
                            },
                          )}
                        </TableCell>
                        <TableCell>
                          <div className="flex justify-end gap-1">
                            <Button
                              variant="ghost"
                              size="icon"
                              asChild
                              className="h-8 w-8"
                            >
                              <Link href={`/admin/blog/${blog.id}`}>
                                <Pencil className="h-4 w-4" />
                              </Link>
                            </Button>
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => handleDelete(blog)}
                              className="h-8 w-8 text-destructive hover:text-destructive hover:bg-destructive/10"
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </Card>

              {/* Pagination */}
              {data.pagination.totalPages > 1 && (
                <div className="flex items-center justify-between">
                  <p className="text-sm text-muted-foreground">
                    Showing{" "}
                    <span className="font-medium text-foreground">
                      {(page - 1) * 10 + 1}
                    </span>{" "}
                    to{" "}
                    <span className="font-medium text-foreground">
                      {Math.min(page * 10, data.pagination.total)}
                    </span>{" "}
                    of{" "}
                    <span className="font-medium text-foreground">
                      {data.pagination.total}
                    </span>{" "}
                    posts
                  </p>
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setPage((p) => Math.max(1, p - 1))}
                      disabled={page === 1}
                      className="gap-1"
                    >
                      <ChevronLeft className="h-4 w-4" />
                      Previous
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() =>
                        setPage((p) =>
                          Math.min(data.pagination.totalPages, p + 1),
                        )
                      }
                      disabled={page === data.pagination.totalPages}
                      className="gap-1"
                    >
                      Next
                      <ChevronRight className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              )}
            </>
          )}

          <AlertDialog
            open={!!deletingBlog}
            onOpenChange={() => setDeletingBlog(null)}
          >
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                <AlertDialogDescription>
                  This will delete the blog post "{deletingBlog?.title}". This
                  action cannot be undone.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction
                  onClick={confirmDelete}
                  className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                >
                  Delete
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </AdminLayoutWrapper>
    </ProtectedRoute>
  );
}
