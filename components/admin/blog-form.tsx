"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import {
  useBlogCategories,
  useCreateBlogCategory,
} from "@/hooks/use-blog-categories";
import { useBlogTags, useCreateBlogTag } from "@/hooks/use-blog-tags";
import { useCreateBlog, useUpdateBlog, type Blog } from "@/hooks/use-blogs";
import { useGenerateBlog } from "@/hooks/use-generate-blog";
import { cn } from "@/lib/utils";
import { blogFormSchema, type BlogFormInput } from "@/lib/validations";
import { generateSlug } from "@/utils/slug";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Check,
  ChevronsUpDown,
  Sparkles,
  X,
  Plus,
  Wand2,
  Loader2,
  Copy,
  ImageIcon,
} from "lucide-react";
import dynamic from "next/dynamic";
import { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { ImageUpload } from "./image-upload";

const MDEditor = dynamic(
  () => import("@uiw/react-md-editor").then((mod) => mod.default),
  { ssr: false }
);

type BlogFormData = BlogFormInput;

interface BlogFormProps {
  blog?: Blog;
  onSuccess?: () => void;
}

export function BlogForm({ blog, onSuccess }: BlogFormProps) {
  const createBlog = useCreateBlog();
  const updateBlog = useUpdateBlog();
  const { data: categoriesData } = useBlogCategories();
  const { data: tagsData } = useBlogTags();
  const createCategory = useCreateBlogCategory();
  const createTag = useCreateBlogTag();
  const generateBlog = useGenerateBlog();

  const getBodyContent = () => {
    if (!blog?.body) return "";
    if (typeof blog.body === "string") return blog.body;
    if (typeof blog.body === "object" && blog.body !== null) {
      if ("html" in blog.body) {
        return (blog.body as { html: string }).html;
      }
    }
    return "";
  };

  const form = useForm<BlogFormData>({
    resolver: zodResolver(blogFormSchema),
    defaultValues: {
      title: blog?.title || "",
      slug: blog?.slug || "",
      excerpt: blog?.excerpt || "",
      metaTitle: blog?.metaTitle || "",
      metaDescription: blog?.metaDescription || "",
      featuredImage: blog?.featuredImage || "",
      featuredImageAlt: blog?.featuredImageAlt || "",
      body: getBodyContent(),
      featured: blog?.featured || false,
      status: blog?.status || "DRAFT",
      publishedAt: blog?.publishedAt || null,
      order: blog?.order || 0,
      seoKeywords: blog?.seoKeywords?.join(", ") || "",
      categoryIds: blog?.categories?.map((c) => c.id) || [],
      tagIds: blog?.tags?.map((t) => t.id) || [],
    },
    mode: "onChange",
  });

  const [categoriesOpen, setCategoriesOpen] = useState(false);
  const [tagsOpen, setTagsOpen] = useState(false);
  const [categoryInput, setCategoryInput] = useState("");
  const [tagInput, setTagInput] = useState("");
  const [generatedImagePrompt, setGeneratedImagePrompt] = useState("");
  const selectedCategoryIds = form.watch("categoryIds");
  const selectedTagIds = form.watch("tagIds");

  const onSubmit = async (data: BlogFormData) => {
    const submitData = {
      ...data,
      body: data.body || null,
      seoKeywords: data.seoKeywords
        ? data.seoKeywords
            .split(",")
            .map((k) => k.trim())
            .filter(Boolean)
        : [],
    };

    if (blog) {
      await updateBlog.mutateAsync({
        id: blog.id,
        data: submitData,
      });
    } else {
      await createBlog.mutateAsync(submitData);
    }

    onSuccess?.();
  };

  const handleAddCategory = async (title: string) => {
    if (title.trim()) {
      try {
        const newCategory = await createCategory.mutateAsync({
          title: title.trim(),
          slug: generateSlug(title.trim()),
        });
        const current = form.getValues("categoryIds");
        if (!current.includes(newCategory.id)) {
          form.setValue("categoryIds", [...current, newCategory.id]);
        }
        setCategoryInput("");
      } catch (error) {
        console.error("Failed to create category:", error);
      }
    }
  };

  const handleAddTag = async (title: string) => {
    if (title.trim()) {
      try {
        const newTag = await createTag.mutateAsync({
          title: title.trim(),
          slug: generateSlug(title.trim()),
        });
        const current = form.getValues("tagIds");
        if (!current.includes(newTag.id)) {
          form.setValue("tagIds", [...current, newTag.id]);
        }
        setTagInput("");
      } catch (error) {
        console.error("Failed to create tag:", error);
      }
    }
  };

  const selectedCategories =
    categoriesData?.categories.filter((cat) =>
      selectedCategoryIds.includes(cat.id)
    ) || [];

  const selectedTags =
    tagsData?.tags.filter((tag) => selectedTagIds.includes(tag.id)) || [];

  // Handle AI blog generation
  const handleGenerateWithAI = async () => {
    const currentTitle = form.getValues("title");

    try {
      const generated = await generateBlog.mutateAsync({
        title: currentTitle || undefined,
      });

      // Create new categories and tags if needed
      const allCategoryIds = [...generated.categoryIds];
      const allTagIds = [...generated.tagIds];

      // Create new categories
      for (const categoryName of generated.newCategories) {
        try {
          const newCat = await createCategory.mutateAsync({
            title: categoryName,
            slug: generateSlug(categoryName),
          });
          allCategoryIds.push(newCat.id);
        } catch (error) {
          console.error(`Failed to create category: ${categoryName}`, error);
        }
      }

      // Create new tags
      for (const tagName of generated.newTags) {
        try {
          const newTag = await createTag.mutateAsync({
            title: tagName,
            slug: generateSlug(tagName),
          });
          allTagIds.push(newTag.id);
        } catch (error) {
          console.error(`Failed to create tag: ${tagName}`, error);
        }
      }

      // Fill the form with generated data
      form.setValue("title", generated.title);
      form.setValue("slug", generated.slug);
      form.setValue("excerpt", generated.excerpt);
      form.setValue("body", generated.body);
      form.setValue("metaTitle", generated.metaTitle);
      form.setValue("metaDescription", generated.metaDescription);
      form.setValue("seoKeywords", generated.seoKeywords.join(", "));
      form.setValue("featuredImageAlt", generated.featuredImageAlt);
      form.setValue("categoryIds", allCategoryIds);
      form.setValue("tagIds", allTagIds);

      // Store the generated image prompt
      if (generated.featuredImagePrompt) {
        setGeneratedImagePrompt(generated.featuredImagePrompt);
      }
    } catch (error) {
      console.error("Failed to generate blog:", error);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        {/* AI Generation Button - Only show for new blogs */}
        {!blog && (
          <div className="flex flex-col sm:flex-row gap-4 p-4 rounded-xl border border-primary/20 bg-primary/5">
            <div className="flex-1 space-y-1">
              <h3 className="font-semibold flex items-center gap-2">
                <Wand2 className="h-5 w-5 text-primary" />
                Generate with AI
              </h3>
              <p className="text-sm text-muted-foreground">
                {form.watch("title")
                  ? "Generate a blog post based on your title"
                  : "Enter a title above or let AI create a unique blog post"}
              </p>
            </div>
            <Button
              type="button"
              variant="default"
              onClick={handleGenerateWithAI}
              disabled={generateBlog.isPending}
              className="shrink-0 shadow-lg shadow-primary/25"
            >
              {generateBlog.isPending ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Generating...
                </>
              ) : (
                <>
                  <Wand2 className="mr-2 h-4 w-4" />
                  Generate Blog
                </>
              )}
            </Button>
          </div>
        )}

        {/* Title and Slug */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Title</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    placeholder="Enter blog title (optional for AI)"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="slug"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Slug</FormLabel>
                <FormControl>
                  <div className="flex gap-2">
                    <Input
                      {...field}
                      placeholder="my-blog-post"
                      className="flex-1"
                    />
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => {
                        const title = form.getValues("title");
                        if (title) {
                          field.onChange(generateSlug(title));
                        }
                      }}
                      className="shrink-0"
                    >
                      <Sparkles className="h-4 w-4" />
                    </Button>
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        {/* Excerpt */}
        <FormField
          control={form.control}
          name="excerpt"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Excerpt</FormLabel>
              <FormControl>
                <Textarea
                  {...field}
                  rows={3}
                  placeholder="Brief summary of your blog post"
                />
              </FormControl>
              <FormDescription>
                A short description shown in blog listings
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="body"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Content (Markdown)</FormLabel>
              <FormControl>
                <div className="min-h-[400px]" data-color-mode="light">
                  {typeof window !== "undefined" && (
                    <MDEditor
                      value={field.value || ""}
                      onChange={(v) => field.onChange(v ?? "")}
                      height={400}
                      preview="live"
                      visibleDragbar={false}
                      textareaProps={{
                        placeholder: "Write your blog in Markdown. Use ```language for code blocks.",
                      }}
                    />
                  )}
                </div>
              </FormControl>
              <FormDescription>
                Markdown with code blocks: use ```javascript, ```typescript, etc.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Featured Image */}
        <FormField
          control={form.control}
          name="featuredImage"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <ImageUpload
                  value={field.value}
                  onChange={field.onChange}
                  type="cover"
                  projectId={blog?.id}
                  label="Featured Image"
                  size="compact"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="featuredImageAlt"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Featured Image Alt Text</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  placeholder="Describe the image for accessibility"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* AI Generated Image Prompt */}
        {generatedImagePrompt && (
          <div className="rounded-xl border border-primary/20 bg-primary/5 p-4 space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <ImageIcon className="h-5 w-5 text-primary" />
                <h4 className="font-semibold text-sm">AI Image Prompt</h4>
              </div>
              <Button
                type="button"
                variant="outline"
                size="sm"
                className="gap-2"
                onClick={() => {
                  navigator.clipboard.writeText(generatedImagePrompt);
                  toast.success("Image prompt copied to clipboard!");
                }}
              >
                <Copy className="h-3.5 w-3.5" />
                Copy
              </Button>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed">
              {generatedImagePrompt}
            </p>
            <p className="text-xs text-muted-foreground/70">
              Use this prompt with DALL-E, Midjourney, or other AI image
              generators to create a featured image.
            </p>
          </div>
        )}

        {/* Categories */}
        <FormField
          control={form.control}
          name="categoryIds"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Categories</FormLabel>
              <div className="space-y-2">
                {selectedCategories.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {selectedCategories.map((category) => (
                      <Badge
                        key={category.id}
                        variant="secondary"
                        className="gap-1"
                      >
                        {category.icon} {category.title}
                        <button
                          type="button"
                          onClick={() => {
                            field.onChange(
                              field.value.filter((id) => id !== category.id)
                            );
                          }}
                          className="ml-1 hover:text-destructive"
                        >
                          <X className="h-3 w-3" />
                        </button>
                      </Badge>
                    ))}
                  </div>
                )}
                <Popover open={categoriesOpen} onOpenChange={setCategoriesOpen}>
                  <PopoverTrigger asChild>
                    <Button
                      type="button"
                      variant="outline"
                      role="combobox"
                      className="w-full justify-between"
                    >
                      Select categories...
                      <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-full p-0" align="start">
                    <Command>
                      <CommandInput
                        placeholder="Search or create category..."
                        value={categoryInput}
                        onValueChange={setCategoryInput}
                      />
                      <CommandList>
                        <CommandEmpty>
                          <Button
                            type="button"
                            variant="ghost"
                            className="w-full justify-start"
                            onClick={() => handleAddCategory(categoryInput)}
                          >
                            <Plus className="mr-2 h-4 w-4" />
                            Create "{categoryInput}"
                          </Button>
                        </CommandEmpty>
                        <CommandGroup>
                          {categoriesData?.categories.map((category) => (
                            <CommandItem
                              key={category.id}
                              value={category.title}
                              onSelect={() => {
                                const current = field.value;
                                if (current.includes(category.id)) {
                                  field.onChange(
                                    current.filter((id) => id !== category.id)
                                  );
                                } else {
                                  field.onChange([...current, category.id]);
                                }
                              }}
                            >
                              <Check
                                className={cn(
                                  "mr-2 h-4 w-4",
                                  field.value.includes(category.id)
                                    ? "opacity-100"
                                    : "opacity-0"
                                )}
                              />
                              {category.icon} {category.title}
                            </CommandItem>
                          ))}
                        </CommandGroup>
                      </CommandList>
                    </Command>
                  </PopoverContent>
                </Popover>
              </div>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Tags */}
        <FormField
          control={form.control}
          name="tagIds"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Tags</FormLabel>
              <div className="space-y-2">
                {selectedTags.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {selectedTags.map((tag) => (
                      <Badge key={tag.id} variant="outline" className="gap-1">
                        {tag.title}
                        <button
                          type="button"
                          onClick={() => {
                            field.onChange(
                              field.value.filter((id) => id !== tag.id)
                            );
                          }}
                          className="ml-1 hover:text-destructive"
                        >
                          <X className="h-3 w-3" />
                        </button>
                      </Badge>
                    ))}
                  </div>
                )}
                <Popover open={tagsOpen} onOpenChange={setTagsOpen}>
                  <PopoverTrigger asChild>
                    <Button
                      type="button"
                      variant="outline"
                      role="combobox"
                      className="w-full justify-between"
                    >
                      Select tags...
                      <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-full p-0" align="start">
                    <Command>
                      <CommandInput
                        placeholder="Search or create tag..."
                        value={tagInput}
                        onValueChange={setTagInput}
                      />
                      <CommandList>
                        <CommandEmpty>
                          <Button
                            type="button"
                            variant="ghost"
                            className="w-full justify-start"
                            onClick={() => handleAddTag(tagInput)}
                          >
                            <Plus className="mr-2 h-4 w-4" />
                            Create "{tagInput}"
                          </Button>
                        </CommandEmpty>
                        <CommandGroup>
                          {tagsData?.tags.map((tag) => (
                            <CommandItem
                              key={tag.id}
                              value={tag.title}
                              onSelect={() => {
                                const current = field.value;
                                if (current.includes(tag.id)) {
                                  field.onChange(
                                    current.filter((id) => id !== tag.id)
                                  );
                                } else {
                                  field.onChange([...current, tag.id]);
                                }
                              }}
                            >
                              <Check
                                className={cn(
                                  "mr-2 h-4 w-4",
                                  field.value.includes(tag.id)
                                    ? "opacity-100"
                                    : "opacity-0"
                                )}
                              />
                              {tag.title}
                            </CommandItem>
                          ))}
                        </CommandGroup>
                      </CommandList>
                    </Command>
                  </PopoverContent>
                </Popover>
              </div>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* SEO Section */}
        <div className="space-y-4 rounded-xl border border-border/50 p-4 bg-muted/30">
          <h3 className="font-semibold">SEO Settings</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="metaTitle"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Meta Title</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="SEO title" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="seoKeywords"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>SEO Keywords</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="keyword1, keyword2, keyword3"
                    />
                  </FormControl>
                  <FormDescription>Comma-separated keywords</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <FormField
            control={form.control}
            name="metaDescription"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Meta Description</FormLabel>
                <FormControl>
                  <Textarea {...field} rows={2} placeholder="SEO description" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        {/* Publishing Options */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <FormField
            control={form.control}
            name="status"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Status</FormLabel>
                <Select value={field.value} onValueChange={field.onChange}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select status" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="DRAFT">Draft</SelectItem>
                    <SelectItem value="PUBLISHED">Published</SelectItem>
                    <SelectItem value="ARCHIVED">Archived</SelectItem>
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
                <FormLabel>Order</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    {...field}
                    onChange={(e) =>
                      field.onChange(parseInt(e.target.value) || 0)
                    }
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="featured"
            render={({ field }) => (
              <FormItem className="flex flex-row items-center justify-between rounded-lg border border-border/50 p-4">
                <div className="space-y-0.5">
                  <FormLabel className="text-base">Featured</FormLabel>
                  <FormDescription>Show in featured section</FormDescription>
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
        </div>

        {/* Submit Buttons */}
        <div className="flex justify-end gap-4 pt-4 border-t border-border/50">
          <Button
            type="button"
            variant="outline"
            onClick={() => window.history.back()}
          >
            Cancel
          </Button>
          <Button
            type="submit"
            disabled={createBlog.isPending || updateBlog.isPending}
            className="shadow-lg shadow-primary/25"
          >
            {createBlog.isPending || updateBlog.isPending
              ? "Saving..."
              : blog
              ? "Update Blog"
              : "Create Blog"}
          </Button>
        </div>
      </form>
    </Form>
  );
}
