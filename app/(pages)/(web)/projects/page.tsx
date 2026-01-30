"use client";

import { useState, useMemo, useCallback, useEffect } from "react";
import { useRef } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useInfiniteQuery } from "@tanstack/react-query";
import {
  ArrowUpRight,
  ExternalLink,
  FolderGit2,
  Github,
  Star,
  Search,
  Filter,
  X,
  Grid3x3,
  List,
  Loader2,
  Tag,
  ChevronDown,
} from "lucide-react";
import { ProjectCardSkeleton } from "@/components/layouts/vscode/common/card-skeletons";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { useProjects, Project } from "@/hooks/use-projects";
import { useProjectTags } from "@/hooks/use-project-tags";

function ProjectCard({
  project,
  index,
  viewMode,
}: {
  project: Project;
  index: number;
  viewMode: "grid" | "list";
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(cardRef, { once: true, margin: "-50px" });

  if (viewMode === "list") {
    return (
      <motion.div
        ref={cardRef}
        initial={{ opacity: 0, x: -30 }}
        animate={isInView ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 0.6, delay: index * 0.05 }}
        className="group"
      >
        <Link href={`/projects/${project.slug}`}>
          <div className="relative overflow-hidden rounded-xl border border-border bg-card/50 backdrop-blur-sm transition-all duration-500 hover:border-primary/30 p-6 flex gap-6 items-center">
            <div className="relative w-32 h-20 sm:w-40 sm:h-24 rounded-lg overflow-hidden bg-muted shrink-0">
              {project.thumbnail ? (
                <Image
                  src={project.thumbnail}
                  alt={project.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
              ) : (
                <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-primary/20 to-primary/5">
                  <FolderGit2 className="w-8 h-8 text-primary/30" />
                </div>
              )}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between gap-4 mb-2">
                <h3 className="text-lg font-semibold group-hover:text-primary transition-colors">
                  {project.title}
                </h3>
                {project.featured && (
                  <Badge variant="default" className="shrink-0">
                    Featured
                  </Badge>
                )}
              </div>
              <p className="text-muted-foreground text-sm mb-3 line-clamp-2">
                {project.excerpt || project.description}
              </p>
              <div className="flex items-center gap-4 flex-wrap">
                <div className="flex flex-wrap gap-2">
                  {project.tags.slice(0, 3).map((tag) => (
                    <Badge
                      key={tag.id}
                      variant="secondary"
                      className="text-xs font-mono"
                    >
                      {tag.title}
                    </Badge>
                  ))}
                  {project.tags.length > 3 && (
                    <Badge variant="outline" className="text-xs">
                      +{project.tags.length - 3}
                    </Badge>
                  )}
                </div>
                <div className="flex items-center gap-4 ml-auto text-xs text-muted-foreground">
                  {project.views > 0 && (
                    <span>{project.views.toLocaleString()} views</span>
                  )}
                  {project.demoLink && (
                    <Link
                      href={project.demoLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      className="hover:text-primary transition-colors"
                    >
                      <ExternalLink className="w-4 h-4" />
                    </Link>
                  )}
                  {project.githubLink && (
                    <Link
                      href={project.githubLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      className="hover:text-primary transition-colors"
                    >
                      <Github className="w-4 h-4" />
                    </Link>
                  )}
                </div>
              </div>
            </div>
          </div>
        </Link>
      </motion.div>
    );
  }

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className="group relative"
    >
      <Link href={`/projects/${project.slug}`}>
        <div className="relative overflow-hidden rounded-xl border border-border bg-card/50 backdrop-blur-sm transition-all duration-500 hover:border-primary/30 card-hover-lift">
          <div className="relative aspect-video overflow-hidden bg-muted">
            {project.thumbnail ? (
              <Image
                src={project.thumbnail}
                alt={project.title}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
            ) : (
              <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-primary/20 to-primary/5">
                <FolderGit2 className="w-16 h-16 text-primary/30" />
              </div>
            )}

            <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

            <div className="absolute inset-0 flex items-center justify-center gap-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              {project.githubLink && (
                <Link
                  href={project.githubLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => e.stopPropagation()}
                  className="p-3 rounded-full bg-background/90 text-foreground hover:bg-primary hover:text-primary-foreground transition-colors"
                >
                  <Github className="w-5 h-5" />
                </Link>
              )}
              {project.demoLink && (
                <Link
                  href={project.demoLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => e.stopPropagation()}
                  className="p-3 rounded-full bg-background/90 text-foreground hover:bg-primary hover:text-primary-foreground transition-colors"
                >
                  <ExternalLink className="w-5 h-5" />
                </Link>
              )}
            </div>

            {project.featured && (
              <div className="absolute top-3 left-3">
                <Badge variant="default">Featured</Badge>
              </div>
            )}

            {project.views > 0 && (
              <div className="absolute top-3 right-3 flex items-center gap-2">
                <span className="flex items-center gap-1 px-2 py-1 rounded-full bg-background/80 backdrop-blur-sm text-xs font-medium">
                  <Star className="w-3 h-3 text-yellow-500" />
                  {project.views.toLocaleString()}
                </span>
              </div>
            )}
          </div>

          <div className="p-6">
            <h3 className="text-xl font-semibold mb-2 group-hover:text-primary transition-colors">
              {project.title}
            </h3>
            <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
              {project.excerpt || project.description}
            </p>

            <div className="flex flex-wrap gap-2 mb-4">
              {project.tags.slice(0, 4).map((tag) => (
                <Badge
                  key={tag.id}
                  variant="secondary"
                  className="text-xs font-mono"
                >
                  {tag.title}
                </Badge>
              ))}
              {project.tags.length > 4 && (
                <Badge variant="outline" className="text-xs">
                  +{project.tags.length - 4}
                </Badge>
              )}
            </div>

            <div className="flex items-center gap-2 text-sm font-medium text-primary">
              View Project
              <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}

export default function ProjectsPage() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });
  const loadMoreRef = useRef<HTMLDivElement>(null);

  const [searchQuery, setSearchQuery] = useState("");
  const [debouncedSearchQuery, setDebouncedSearchQuery] = useState("");
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [tagSearchQuery, setTagSearchQuery] = useState("");
  const [showFeaturedOnly, setShowFeaturedOnly] = useState(false);
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  const { data: tagsData } = useProjectTags();
  const tags = tagsData?.tags || [];

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearchQuery(searchQuery);
    }, 300);

    return () => clearTimeout(timer);
  }, [searchQuery]);

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    isError,
  } = useInfiniteQuery({
    queryKey: [
      "projects",
      {
        status: "PUBLISHED",
        search: debouncedSearchQuery || undefined,
        featured: showFeaturedOnly ? "true" : undefined,
        tags: selectedTags.length > 0 ? selectedTags : undefined,
      },
    ],
    queryFn: async ({ pageParam = 1 }) => {
      const searchParams = new URLSearchParams({
        status: "PUBLISHED",
        page: pageParam.toString(),
        limit: "12",
      });

      if (debouncedSearchQuery)
        searchParams.set("search", debouncedSearchQuery);
      if (showFeaturedOnly) searchParams.set("featured", "true");
      if (selectedTags.length > 0) {
        selectedTags.forEach((tag) => searchParams.append("tags", tag));
      }

      const response = await fetch(`/api/projects?${searchParams.toString()}`);
      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || "Failed to fetch projects");
      }
      return response.json();
    },
    getNextPageParam: (lastPage) => {
      const { pagination } = lastPage;
      if (pagination.page < pagination.totalPages) {
        return pagination.page + 1;
      }
      return undefined;
    },
    initialPageParam: 1,
  });

  const projects = useMemo(() => {
    return data?.pages.flatMap((page) => page.projects) || [];
  }, [data]);

  const toggleTag = useCallback((tagId: string) => {
    setSelectedTags((prev) =>
      prev.includes(tagId)
        ? prev.filter((id) => id !== tagId)
        : [...prev, tagId]
    );
  }, []);

  const clearFilters = useCallback(() => {
    setSearchQuery("");
    setSelectedTags([]);
    setShowFeaturedOnly(false);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasNextPage && !isFetchingNextPage) {
          fetchNextPage();
        }
      },
      { threshold: 0.1 }
    );

    if (loadMoreRef.current) {
      observer.observe(loadMoreRef.current);
    }

    return () => {
      if (loadMoreRef.current) {
        observer.unobserve(loadMoreRef.current);
      }
    };
  }, [hasNextPage, isFetchingNextPage, fetchNextPage]);

  const hasActiveFilters =
    debouncedSearchQuery || selectedTags.length > 0 || showFeaturedOnly;

  const filteredTagsForPopover = useMemo(() => {
    if (!tagSearchQuery.trim()) return tags;
    const q = tagSearchQuery.trim().toLowerCase();
    return tags.filter((t) => t.title.toLowerCase().includes(q));
  }, [tags, tagSearchQuery]);

  return (
    <section
      ref={sectionRef}
      className="relative py-24 md:py-32 overflow-hidden min-h-screen"
    >
      <div className="absolute inset-0 bg-code-dots" />
      <div className="absolute inset-0 bg-mesh opacity-60" />

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-4">
            <FolderGit2 className="w-4 h-4 text-primary" />
            <span className="text-sm font-mono text-primary">
              ~/projects --all
            </span>
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
            All{" "}
            <span className="bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
              Projects
            </span>
          </h1>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Explore my complete portfolio of projects, from Web3 DApps to
            full-stack applications
          </p>
        </motion.div>

        {/* Search + filters – modern minimal */}
        <div className="mb-10 rounded-2xl border border-border/60 bg-card/30 backdrop-blur-sm p-4 md:p-5">
          <div className="flex flex-col gap-3">
            <div className="flex flex-wrap gap-3 sm:items-center sm:justify-between">
              <div className="relative flex-1 max-w-xl min-w-60">
                <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none z-10" />
                <Input
                  placeholder="Search projects..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="h-10 pl-10 rounded-xl border-border/80 bg-background/50 text-sm placeholder:text-muted-foreground focus-visible:ring-primary/20 focus-visible:border-primary/40 transition-colors"
                />
              </div>
              <div className="flex items-center gap-1 shrink-0">
                <button
                  type="button"
                  onClick={() => setViewMode("grid")}
                  className={cn(
                    "flex h-9 w-9 items-center justify-center rounded-lg border text-muted-foreground transition-colors hover:text-foreground hover:border-border",
                    viewMode === "grid"
                      ? "border-primary/50 bg-primary/10 text-primary"
                      : "border-border/80 bg-transparent"
                  )}
                  aria-label="Grid view"
                >
                  <Grid3x3 className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  onClick={() => setViewMode("list")}
                  className={cn(
                    "flex h-9 w-9 items-center justify-center rounded-lg border text-muted-foreground transition-colors hover:text-foreground hover:border-border",
                    viewMode === "list"
                      ? "border-primary/50 bg-primary/10 text-primary"
                      : "border-border/80 bg-transparent"
                  )}
                  aria-label="List view"
                >
                  <List className="w-4 h-4" />
                </button>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-2 pt-3 border-t border-border/40">
              <span className="flex items-center gap-1.5 text-xs font-medium text-muted-foreground uppercase tracking-wider mr-1">
                <Filter className="w-3.5 h-3.5" />
                Filters
              </span>
              <button
                type="button"
                onClick={() => setShowFeaturedOnly(!showFeaturedOnly)}
                className={cn(
                  "rounded-full px-3 py-1.5 text-xs font-medium transition-colors border",
                  showFeaturedOnly
                    ? "border-primary/50 bg-primary/10 text-primary"
                    : "border-border/80 bg-transparent text-muted-foreground hover:text-foreground hover:border-border"
                )}
              >
                Featured
              </button>
              <Popover onOpenChange={(open) => !open && setTagSearchQuery("")}>
                <PopoverTrigger asChild>
                  <button
                    type="button"
                    className={cn(
                      "rounded-full px-3 py-1.5 text-xs font-medium transition-colors border inline-flex items-center gap-1.5",
                      selectedTags.length > 0
                        ? "border-primary/50 bg-primary/10 text-primary"
                        : "border-border/80 bg-transparent text-muted-foreground hover:text-foreground hover:border-border"
                    )}
                  >
                    <Tag className="w-3.5 h-3.5" />
                    Tags
                    {selectedTags.length > 0 && (
                      <span className="flex h-4 min-w-4 items-center justify-center rounded-full bg-primary/20 px-1 text-[10px] font-semibold">
                        {selectedTags.length}
                      </span>
                    )}
                    <ChevronDown className="w-3.5 h-3.5 opacity-60" />
                  </button>
                </PopoverTrigger>
                <PopoverContent
                  align="start"
                  className="w-72 p-0"
                  sideOffset={8}
                >
                  <div className="p-2 border-b border-border/50">
                    <div className="relative">
                      <Search className="absolute left-2.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-muted-foreground pointer-events-none" />
                      <Input
                        placeholder="Search tags..."
                        value={tagSearchQuery}
                        onChange={(e) => setTagSearchQuery(e.target.value)}
                        className="h-8 pl-8 text-xs border-0 bg-muted/50 focus-visible:ring-1"
                      />
                    </div>
                  </div>
                  <div className="max-h-60 overflow-y-auto p-1">
                    {filteredTagsForPopover.length === 0 ? (
                      <p className="py-4 text-center text-xs text-muted-foreground">
                        No tags match
                      </p>
                    ) : (
                      filteredTagsForPopover.map((tag) => (
                        <button
                          key={tag.id}
                          type="button"
                          onClick={() => toggleTag(tag.id)}
                          className={cn(
                            "flex w-full items-center gap-2 rounded-lg px-2 py-2 text-left text-xs transition-colors hover:bg-muted/60",
                            selectedTags.includes(tag.id)
                              ? "bg-primary/10 text-primary font-medium"
                              : "text-foreground"
                          )}
                        >
                          <span
                            className={cn(
                              "flex h-4 w-4 shrink-0 items-center justify-center rounded border",
                              selectedTags.includes(tag.id)
                                ? "border-primary bg-primary text-primary-foreground"
                                : "border-border"
                            )}
                          >
                            {selectedTags.includes(tag.id) ? (
                              <span className="text-[10px] leading-none">
                                ✓
                              </span>
                            ) : null}
                          </span>
                          {tag.title}
                        </button>
                      ))
                    )}
                  </div>
                  {selectedTags.length > 0 && (
                    <div className="border-t border-border/50 p-2">
                      <button
                        type="button"
                        onClick={() => setSelectedTags([])}
                        className="w-full rounded-lg py-1.5 text-xs font-medium text-muted-foreground hover:text-foreground transition-colors"
                      >
                        Clear tag selection
                      </button>
                    </div>
                  )}
                </PopoverContent>
              </Popover>
              {hasActiveFilters && (
                <button
                  type="button"
                  onClick={clearFilters}
                  className="ml-auto rounded-full px-3 py-1.5 text-xs font-medium text-muted-foreground hover:text-foreground transition-colors flex items-center gap-1.5"
                >
                  <X className="w-3.5 h-3.5" />
                  Clear
                </button>
              )}
            </div>
          </div>
        </div>

        {isLoading ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 mb-8">
            {Array.from({ length: 6 }).map((_, i) => (
              <ProjectCardSkeleton key={i} />
            ))}
          </div>
        ) : isError ? (
          <div className="text-center py-20">
            <p className="text-muted-foreground">
              Failed to load projects. Please try again later.
            </p>
          </div>
        ) : projects.length === 0 ? (
          <div className="text-center py-20">
            <FolderGit2 className="w-16 h-16 text-muted-foreground/50 mx-auto mb-4" />
            <p className="text-muted-foreground text-lg">
              No projects found. Try adjusting your filters.
            </p>
          </div>
        ) : (
          <>
            <div
              className={cn(
                "mb-8",
                viewMode === "grid"
                  ? "grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8"
                  : "space-y-4"
              )}
            >
              <AnimatePresence>
                {projects.map((project, idx) => (
                  <ProjectCard
                    key={project.id}
                    project={project}
                    index={idx}
                    viewMode={viewMode}
                  />
                ))}
              </AnimatePresence>
            </div>

            <div ref={loadMoreRef} className="py-8">
              {isFetchingNextPage && (
                <div className="flex items-center justify-center">
                  <Loader2 className="w-6 h-6 animate-spin text-primary" />
                </div>
              )}
              {!hasNextPage && projects.length > 0 && (
                <div className="text-center text-muted-foreground">
                  <p>You&apos;ve reached the end! 🎉</p>
                </div>
              )}
            </div>
          </>
        )}
      </div>
    </section>
  );
}
