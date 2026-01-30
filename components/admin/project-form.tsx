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
import { useCreateProjectTag, useProjectTags } from "@/hooks/use-project-tags";
import {
  useCreateProject,
  useUpdateProject,
  type Project,
} from "@/hooks/use-projects";
import { cn } from "@/lib/utils";
import { projectFormSchema, type ProjectFormInput } from "@/lib/validations";
import { generateSlug } from "@/utils/slug";
import { zodResolver } from "@hookform/resolvers/zod";
import { Check, ChevronsUpDown, Sparkles, X } from "lucide-react";
import dynamic from "next/dynamic";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { ImageUpload } from "./image-upload";

const MDEditor = dynamic(
  () => import("@uiw/react-md-editor").then((mod) => mod.default),
  { ssr: false }
);

type ProjectFormData = ProjectFormInput;

interface ProjectFormProps {
  project?: Project;
  onSuccess?: () => void;
}

export function ProjectForm({ project, onSuccess }: ProjectFormProps) {
  const createProject = useCreateProject();
  const updateProject = useUpdateProject();
  const { data: tagsData } = useProjectTags();
  const createTag = useCreateProjectTag();

  const form = useForm<ProjectFormData>({
    resolver: zodResolver(projectFormSchema),
    defaultValues: {
      title: project?.title || "",
      slug: project?.slug || "",
      description: project?.description || "",
      excerpt: project?.excerpt || "",
      demoLink: project?.demoLink || "",
      githubLink: project?.githubLink || "",
      videoUrl: project?.videoUrl || "",
      thumbnail: project?.thumbnail || "",
      cover: project?.cover || "",
      youtubeId: project?.youtubeId || "",
      body: project?.body || "",
      techStack: project?.techStack || [],
      featured: project?.featured || false,
      status: project?.status || "DRAFT",
      publishedAt: project?.publishedAt || null,
      order: project?.order || 0,
      metaTitle: project?.metaTitle || "",
      metaDescription: project?.metaDescription || "",
      seoKeywords: project?.seoKeywords?.join(", ") || "",
      tagIds: project?.tags?.map((t) => t.id) || [],
    },
    mode: "onChange",
  });

  const techStackValue = form.watch("techStack");
  const [techStackInput, setTechStackInput] = useState("");
  const [tagsOpen, setTagsOpen] = useState(false);
  const [tagInput, setTagInput] = useState("");
  const selectedTagIds = form.watch("tagIds");

  const onSubmit = async (data: ProjectFormData) => {
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

    if (project) {
      await updateProject.mutateAsync({
        id: project.id,
        data: submitData,
      });
    } else {
      await createProject.mutateAsync(submitData);
    }

    onSuccess?.();
  };

  const addTechStack = () => {
    handleAddTechStack(techStackInput);
  };

  const removeTechStack = (tech: string) => {
    const current = form.getValues("techStack");
    form.setValue(
      "techStack",
      current.filter((t) => t !== tech)
    );

    const techAsTag = tagsData?.tags.find(
      (tag) => tag.title.toLowerCase() === tech.toLowerCase()
    );
    if (techAsTag) {
      const currentTagIds = form.getValues("tagIds");
      form.setValue(
        "tagIds",
        currentTagIds.filter((id) => id !== techAsTag.id)
      );
    }
  };

  const handleAddTechStack = async (tech: string) => {
    if (tech.trim()) {
      const current = form.getValues("techStack");
      if (!current.includes(tech.trim())) {
        form.setValue("techStack", [...current, tech.trim()]);

        const techAsTag = tagsData?.tags.find(
          (tag) => tag.title.toLowerCase() === tech.trim().toLowerCase()
        );
        if (techAsTag) {
          const currentTagIds = form.getValues("tagIds");
          if (!currentTagIds.includes(techAsTag.id)) {
            form.setValue("tagIds", [...currentTagIds, techAsTag.id]);
          }
        } else {
          try {
            const newTag = await createTag.mutateAsync({
              title: tech.trim(),
              slug: generateSlug(tech.trim()),
            });
            const currentTagIds = form.getValues("tagIds");
            if (!currentTagIds.includes(newTag.id)) {
              form.setValue("tagIds", [...currentTagIds, newTag.id]);
            }
          } catch (error) {
            console.error("Failed to create tag:", error);
          }
        }

        setTechStackInput("");
      }
    }
  };

  const handleTagSelect = async (tagId: string) => {
    const current = form.getValues("tagIds");
    if (current.includes(tagId)) {
      form.setValue(
        "tagIds",
        current.filter((id) => id !== tagId)
      );
    } else {
      form.setValue("tagIds", [...current, tagId]);
    }
    setTagInput("");
  };

  const handleCreateTag = async (tagTitle: string) => {
    if (tagTitle.trim()) {
      try {
        const newTag = await createTag.mutateAsync({
          title: tagTitle.trim(),
          slug: generateSlug(tagTitle.trim()),
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

  const selectedTags =
    tagsData?.tags.filter((tag) => selectedTagIds.includes(tag.id)) || [];

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Title</FormLabel>
                <FormControl>
                  <Input {...field} />
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
                      placeholder="my-awesome-project"
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

        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea {...field} rows={3} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="excerpt"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Excerpt</FormLabel>
              <FormControl>
                <Textarea {...field} rows={2} />
              </FormControl>
              <FormDescription>Short summary for listings</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="body"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Body (Markdown)</FormLabel>
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
                        placeholder:
                          "Write your project in Markdown. Use ```language for code blocks.",
                      }}
                    />
                  )}
                </div>
              </FormControl>
              <FormDescription>
                Markdown with code blocks: use ```javascript, ```typescript,
                etc.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="thumbnail"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <ImageUpload
                    value={field.value}
                    onChange={field.onChange}
                    type="thumbnail"
                    projectId={project?.id}
                    label="Thumbnail"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="cover"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <ImageUpload
                    value={field.value}
                    onChange={field.onChange}
                    type="cover"
                    projectId={project?.id}
                    label="Cover Image"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <FormField
            control={form.control}
            name="demoLink"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Demo Link</FormLabel>
                <FormControl>
                  <Input {...field} type="url" placeholder="https://..." />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="githubLink"
            render={({ field }) => (
              <FormItem>
                <FormLabel>GitHub Link</FormLabel>
                <FormControl>
                  <Input {...field} type="url" placeholder="https://..." />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="videoUrl"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Video URL</FormLabel>
                <FormControl>
                  <Input {...field} type="url" placeholder="https://..." />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="youtubeId"
          render={({ field }) => (
            <FormItem>
              <FormLabel>YouTube ID</FormLabel>
              <FormControl>
                <Input {...field} placeholder="dQw4w9WgXcQ" />
              </FormControl>
              <FormDescription>YouTube video ID (optional)</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="techStack"
          render={() => (
            <FormItem>
              <FormLabel>Tech Stack</FormLabel>
              <div className="flex gap-2">
                <Input
                  value={techStackInput}
                  onChange={(e) => setTechStackInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault();
                      addTechStack();
                    }
                  }}
                  placeholder="Add technology..."
                />
                <Button type="button" onClick={addTechStack} variant="outline">
                  Add
                </Button>
              </div>
              {techStackValue.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-2">
                  {techStackValue.map((tech) => (
                    <Badge key={tech} variant="secondary" className="gap-2">
                      {tech}
                      <button
                        type="button"
                        onClick={() => removeTechStack(tech)}
                        className="ml-1 hover:text-destructive"
                      >
                        ×
                      </button>
                    </Badge>
                  ))}
                </div>
              )}
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="status"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Status</FormLabel>
                <Select onValueChange={field.onChange} value={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue />
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
                    {...field}
                    type="number"
                    onChange={(e) =>
                      field.onChange(parseInt(e.target.value) || 0)
                    }
                  />
                </FormControl>
                <FormDescription>Display order (lower = first)</FormDescription>
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
              <div className="space-y-0.5">
                <FormLabel>Featured</FormLabel>
                <FormDescription>Show this project prominently</FormDescription>
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

        <FormField
          control={form.control}
          name="tagIds"
          render={() => (
            <FormItem>
              <FormLabel>Tags</FormLabel>
              <Popover open={tagsOpen} onOpenChange={setTagsOpen}>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      type="button"
                      variant="outline"
                      role="combobox"
                      className={cn(
                        "w-full justify-between",
                        !selectedTagIds.length && "text-muted-foreground"
                      )}
                    >
                      {selectedTagIds.length > 0
                        ? `${selectedTagIds.length} tag${
                            selectedTagIds.length > 1 ? "s" : ""
                          } selected`
                        : "Select tags..."}
                      <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-[400px] p-0" align="start">
                  <Command shouldFilter={false}>
                    <CommandInput
                      placeholder="Search tags or create new..."
                      value={tagInput}
                      onValueChange={setTagInput}
                    />
                    <CommandList>
                      <CommandGroup>
                        {tagsData?.tags
                          .filter((tag) =>
                            tagInput.trim()
                              ? tag.title
                                  .toLowerCase()
                                  .includes(tagInput.toLowerCase())
                              : true
                          )
                          .map((tag) => {
                            const isSelected = selectedTagIds.includes(tag.id);
                            return (
                              <CommandItem
                                key={tag.id}
                                value={tag.id}
                                onSelect={() => handleTagSelect(tag.id)}
                              >
                                <Check
                                  className={cn(
                                    "mr-2 h-4 w-4",
                                    isSelected ? "opacity-100" : "opacity-0"
                                  )}
                                />
                                {tag.title}
                              </CommandItem>
                            );
                          })}
                        {tagInput.trim() &&
                          !tagsData?.tags.some(
                            (tag) =>
                              tag.title.toLowerCase() === tagInput.toLowerCase()
                          ) && (
                            <CommandItem
                              value={`create-${tagInput}`}
                              onSelect={() => handleCreateTag(tagInput)}
                              className="text-primary font-medium"
                            >
                              <span className="mr-2">+</span>
                              Create "{tagInput}"
                            </CommandItem>
                          )}
                      </CommandGroup>
                      {!tagInput.trim() && tagsData?.tags.length === 0 && (
                        <CommandEmpty>
                          No tags available. Type to create a new tag.
                        </CommandEmpty>
                      )}
                    </CommandList>
                  </Command>
                </PopoverContent>
              </Popover>
              {selectedTags.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-2">
                  {selectedTags.map((tag) => (
                    <Badge key={tag.id} variant="secondary" className="gap-2">
                      {tag.title}
                      <button
                        type="button"
                        onClick={() => handleTagSelect(tag.id)}
                        className="ml-1 hover:text-destructive"
                      >
                        <X className="h-3 w-3" />
                      </button>
                    </Badge>
                  ))}
                </div>
              )}
              <FormDescription>
                Select existing tags or create new ones. Tech stack items are
                automatically added as tags.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="metaTitle"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Meta Title</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormDescription>SEO meta title</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="metaDescription"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Meta Description</FormLabel>
                <FormControl>
                  <Textarea {...field} rows={2} />
                </FormControl>
                <FormDescription>SEO meta description</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="seoKeywords"
          render={({ field }) => (
            <FormItem>
              <FormLabel>SEO Keywords</FormLabel>
              <FormControl>
                <Input {...field} placeholder="keyword1, keyword2, keyword3" />
              </FormControl>
              <FormDescription>Comma-separated keywords</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex justify-end gap-4">
          <Button type="button" variant="outline" onClick={onSuccess}>
            Cancel
          </Button>
          <Button
            type="submit"
            disabled={createProject.isPending || updateProject.isPending}
          >
            {createProject.isPending || updateProject.isPending
              ? "Saving..."
              : project
              ? "Update Project"
              : "Create Project"}
          </Button>
        </div>
      </form>
    </Form>
  );
}
