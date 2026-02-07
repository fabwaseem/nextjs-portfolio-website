"use client";

import { useState } from "react";
import { ProtectedRoute } from "@/components/admin/protected-route";
import { AdminLayoutWrapper } from "@/components/admin/admin-layout-wrapper";
import {
  useTestimonials,
  useCreateTestimonial,
  useUpdateTestimonial,
  useDeleteTestimonial,
  type Testimonial,
} from "@/hooks/use-testimonials";
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
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Plus, Pencil, Trash2, MessageCircle, Star } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent } from "@/components/ui/card";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { createTestimonialSchema } from "@/lib/validations";
import { ImageUpload } from "@/components/admin/image-upload";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

type TestimonialFormData = {
  name: string;
  role: string;
  company: string;
  companyUrl?: string;
  avatar?: string | null;
  content: string;
  rating?: number | null;
  featured?: boolean;
  order?: number;
};

export default function AdminTestimonialsPage() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingTestimonial, setEditingTestimonial] = useState<Testimonial | null>(null);
  const [deletingTestimonial, setDeletingTestimonial] = useState<Testimonial | null>(null);

  const { data, isLoading } = useTestimonials({ limit: 100 });
  const testimonials = data?.testimonials ?? [];
  const createTestimonial = useCreateTestimonial();
  const updateTestimonial = useUpdateTestimonial();
  const deleteTestimonial = useDeleteTestimonial();

  const form = useForm<TestimonialFormData>({
    resolver: zodResolver(createTestimonialSchema),
    defaultValues: {
      name: "",
      role: "",
      company: "",
      companyUrl: "",
      avatar: null,
      content: "",
      rating: 5,
      featured: false,
      order: 0,
    },
  });

  const openCreateDialog = () => {
    form.reset({
      name: "",
      role: "",
      company: "",
      companyUrl: "",
      avatar: null,
      content: "",
      rating: 5,
      featured: false,
      order: testimonials.length,
    });
    setEditingTestimonial(null);
    setIsDialogOpen(true);
  };

  const openEditDialog = (testimonial: Testimonial) => {
    form.reset({
      name: testimonial.name,
      role: testimonial.role,
      company: testimonial.company,
      companyUrl: testimonial.companyUrl || "",
      avatar: testimonial.avatar,
      content: testimonial.content,
      rating: testimonial.rating ?? 5,
      featured: testimonial.featured,
      order: testimonial.order,
    });
    setEditingTestimonial(testimonial);
    setIsDialogOpen(true);
  };

  const onSubmit = form.handleSubmit((data) => {
    const payload = {
      ...data,
      companyUrl: data.companyUrl?.trim() || undefined,
      avatar: data.avatar || null,
      rating: data.rating ?? null,
    };

    if (editingTestimonial) {
      updateTestimonial.mutate(
        { id: editingTestimonial.id, data: payload },
        { onSuccess: () => setIsDialogOpen(false) }
      );
    } else {
      createTestimonial.mutate(payload, { onSuccess: () => setIsDialogOpen(false) });
    }
  });

  const confirmDelete = () => {
    if (deletingTestimonial) {
      deleteTestimonial.mutate(deletingTestimonial.id, {
        onSuccess: () => setDeletingTestimonial(null),
      });
    }
  };

  return (
    <ProtectedRoute>
      <AdminLayoutWrapper
        breadcrumbs={[
          { label: "Dashboard", href: "/admin/dashboard" },
          { label: "Testimonials" },
        ]}
      >
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <h1 className="text-3xl font-bold tracking-tight">Testimonials</h1>
              <p className="text-muted-foreground">
                Manage client and colleague testimonials for your portfolio
              </p>
            </div>
            <Button onClick={openCreateDialog} className="shadow-lg shadow-primary/25">
              <Plus className="h-4 w-4 mr-2" />
              Add Testimonial
            </Button>
          </div>

          <Card className="border-border/50">
            <CardContent className="p-0">
              {isLoading ? (
                <div className="p-6 space-y-4">
                  {[1, 2, 3].map((i) => (
                    <Skeleton key={i} className="h-20 w-full" />
                  ))}
                </div>
              ) : testimonials.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-16 px-8">
                  <MessageCircle className="w-16 h-16 text-muted-foreground/50 mb-4" />
                  <p className="text-muted-foreground text-center mb-4">
                    No testimonials yet. Add your first one to showcase on your portfolio.
                  </p>
                  <Button onClick={openCreateDialog}>
                    <Plus className="h-4 w-4 mr-2" />
                    Add Testimonial
                  </Button>
                </div>
              ) : (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-14">Avatar</TableHead>
                      <TableHead>Name</TableHead>
                      <TableHead>Role / Company</TableHead>
                      <TableHead>Content</TableHead>
                      <TableHead className="w-20">Rating</TableHead>
                      <TableHead className="w-24">Featured</TableHead>
                      <TableHead className="w-24">Order</TableHead>
                      <TableHead className="w-28 text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {testimonials.map((t) => (
                      <TableRow key={t.id}>
                        <TableCell>
                          <Avatar className="h-10 w-10">
                            {t.avatar ? (
                              <AvatarImage src={t.avatar} alt={t.name} />
                            ) : null}
                            <AvatarFallback className="text-xs">
                              {t.name
                                .split(" ")
                                .map((n) => n[0])
                                .join("")
                                .toUpperCase()
                                .slice(0, 2)}
                            </AvatarFallback>
                          </Avatar>
                        </TableCell>
                        <TableCell className="font-medium">{t.name}</TableCell>
                        <TableCell className="text-muted-foreground text-sm">
                          {t.role} @ {t.company}
                        </TableCell>
                        <TableCell className="max-w-xs truncate text-sm text-muted-foreground">
                          {t.content}
                        </TableCell>
                        <TableCell>
                          {t.rating ? (
                            <span className="flex items-center gap-0.5 text-primary">
                              <Star className="h-4 w-4 fill-primary" />
                              {t.rating}
                            </span>
                          ) : (
                            <span className="text-muted-foreground">—</span>
                          )}
                        </TableCell>
                        <TableCell>
                          {t.featured ? (
                            <Badge variant="default">Featured</Badge>
                          ) : (
                            <span className="text-muted-foreground">—</span>
                          )}
                        </TableCell>
                        <TableCell>{t.order}</TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end gap-2">
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => openEditDialog(t)}
                              aria-label={`Edit ${t.name}`}
                            >
                              <Pencil className="h-4 w-4" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => setDeletingTestimonial(t)}
                              aria-label={`Delete ${t.name}`}
                              className="text-destructive hover:text-destructive"
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              )}
            </CardContent>
          </Card>
        </div>

        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>
                {editingTestimonial ? "Edit Testimonial" : "Add Testimonial"}
              </DialogTitle>
              <DialogDescription>
                Add or update a testimonial from a client or colleague
              </DialogDescription>
            </DialogHeader>
            <Form {...form}>
              <form onSubmit={onSubmit} className="space-y-6">
                <div className="grid gap-4 sm:grid-cols-2">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Name</FormLabel>
                        <FormControl>
                          <Input placeholder="John Doe" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="role"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Role / Title</FormLabel>
                        <FormControl>
                          <Input placeholder="CEO" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="company"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Company</FormLabel>
                        <FormControl>
                          <Input placeholder="Acme Inc" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="companyUrl"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Company URL</FormLabel>
                        <FormControl>
                          <Input placeholder="https://acme.com" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={form.control}
                  name="avatar"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Avatar</FormLabel>
                      <FormControl>
                        <ImageUpload
                          value={field.value || undefined}
                          onChange={(url) => field.onChange(url)}
                          type="thumbnail"
                          label="Upload avatar"
                          size="compact"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="content"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Testimonial</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Their kind words about working with you..."
                          rows={4}
                          className="resize-none"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="grid gap-4 sm:grid-cols-2">
                  <FormField
                    control={form.control}
                    name="rating"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Rating (1-5)</FormLabel>
                        <Select
                          value={field.value?.toString() ?? "5"}
                          onValueChange={(v) => field.onChange(parseInt(v))}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {[1, 2, 3, 4, 5].map((n) => (
                              <SelectItem key={n} value={n.toString()}>
                                {n} stars
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="order"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Display Order</FormLabel>
                        <FormControl>
                          <Input
                            type="number"
                            min={0}
                            {...field}
                            onChange={(e) => field.onChange(parseInt(e.target.value) || 0)}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={form.control}
                  name="featured"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                      <div>
                        <FormLabel>Featured</FormLabel>
                        <p className="text-sm text-muted-foreground">
                          Show on homepage testimonials section
                        </p>
                      </div>
                      <FormControl>
                        <Switch
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />

                <DialogFooter>
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setIsDialogOpen(false)}
                  >
                    Cancel
                  </Button>
                  <Button
                    type="submit"
                    disabled={
                      createTestimonial.isPending || updateTestimonial.isPending
                    }
                  >
                    {editingTestimonial ? "Update" : "Add"} Testimonial
                  </Button>
                </DialogFooter>
              </form>
            </Form>
          </DialogContent>
        </Dialog>

        <AlertDialog
          open={!!deletingTestimonial}
          onOpenChange={(open) => !open && setDeletingTestimonial(null)}
        >
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Delete Testimonial</AlertDialogTitle>
              <AlertDialogDescription>
                Are you sure you want to delete the testimonial from{" "}
                {deletingTestimonial?.name}? This cannot be undone.
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
      </AdminLayoutWrapper>
    </ProtectedRoute>
  );
}
