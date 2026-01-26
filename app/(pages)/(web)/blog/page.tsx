"use client";

import { useState, useMemo, useCallback, useEffect } from "react";
import { useRef } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { formatDistanceToNow } from "date-fns";
import { useInfiniteQuery } from "@tanstack/react-query";
import {
  ArrowUpRight,
  BookOpen,
  Search,
  Filter,
  X,
  Grid3x3,
  List,
  Loader2,
  Clock,
  Eye,
  Calendar,
  Tag,
} from "lucide-react";
import { BlogCardSkeleton } from "@/components/portfolio/card-skeletons";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { useBlogs, Blog } from "@/hooks/use-blogs";
import { useBlogTags } from "@/hooks/use-blog-tags";
import { useBlogCategories } from "@/hooks/use-blog-categories";

function BlogCard({
  blog,
  index,
  viewMode,
}: {
  blog: Blog;
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
        <Link href={`/blog/${blog.slug}`}>
          <div className="relative overflow-hidden rounded-xl border border-border bg-card/50 backdrop-blur-sm transition-all duration-500 hover:border-primary/30 p-6 flex gap-6 items-center">
            <div className="relative w-32 h-20 sm:w-40 sm:h-24 rounded-lg overflow-hidden bg-muted shrink-0">
              {blog.featuredImage ? (
                <Image
                  src={blog.featuredImage}
                  alt={blog.featuredImageAlt || blog.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
              ) : (
                <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-primary/20 to-primary/5">
                  <BookOpen className="w-8 h-8 text-primary/30" />
                </div>
              )}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between gap-4 mb-2">
                <h3 className="text-lg font-semibold group-hover:text-primary transition-colors">
                  {blog.title}
                </h3>
                {blog.featured && (
                  <Badge variant="default" className="shrink-0">
                    Featured
                  </Badge>
                )}
              </div>
              <p className="text-muted-foreground text-sm mb-3 line-clamp-2">
                {blog.excerpt}
              </p>
              <div className="flex items-center gap-4 flex-wrap">
                <div className="flex flex-wrap gap-2">
                  {blog.categories.slice(0, 2).map((category) => (
                    <Badge
                      key={category.id}
                      variant="secondary"
                      className="text-xs"
                      style={
                        category.color
                          ? {
                              backgroundColor: `${category.color}20`,
                              borderColor: category.color,
                              color: category.color,
                            }
                          : undefined
                      }
                    >
                      {category.icon && (
                        <span className="mr-1">{category.icon}</span>
                      )}
                      {category.title}
                    </Badge>
                  ))}
                  {blog.categories.length > 2 && (
                    <Badge variant="outline" className="text-xs">
                      +{blog.categories.length - 2}
                    </Badge>
                  )}
                </div>
                <div className="flex items-center gap-4 ml-auto text-xs text-muted-foreground">
                  {blog.readingTime && (
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {blog.readingTime} min
                    </span>
                  )}
                  {blog.views > 0 && (
                    <span className="flex items-center gap-1">
                      <Eye className="w-3 h-3" />
                      {blog.views.toLocaleString()}
                    </span>
                  )}
                  {blog.publishedAt && (
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      {formatDistanceToNow(new Date(blog.publishedAt), {
                        addSuffix: true,
                      })}
                    </span>
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
      <Link href={`/blog/${blog.slug}`}>
        <div className="relative overflow-hidden rounded-xl border border-border bg-card/50 backdrop-blur-sm transition-all duration-500 hover:border-primary/30 card-hover-lift">
          <div className="relative aspect-video overflow-hidden bg-muted">
            {blog.featuredImage ? (
              <Image
                src={blog.featuredImage}
                alt={blog.featuredImageAlt || blog.title}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
            ) : (
              <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-primary/20 to-primary/5">
                <BookOpen className="w-16 h-16 text-primary/30" />
              </div>
            )}

            <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

            {blog.featured && (
              <div className="absolute top-3 left-3">
                <Badge variant="default">Featured</Badge>
              </div>
            )}

            <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-xs text-foreground/80">
              <div className="flex items-center gap-3">
                {blog.readingTime && (
                  <span className="flex items-center gap-1 px-2 py-1 rounded-full bg-background/80 backdrop-blur-sm">
                    <Clock className="w-3 h-3" />
                    {blog.readingTime} min
                  </span>
                )}
                {blog.views > 0 && (
                  <span className="flex items-center gap-1 px-2 py-1 rounded-full bg-background/80 backdrop-blur-sm">
                    <Eye className="w-3 h-3" />
                    {blog.views.toLocaleString()}
                  </span>
                )}
              </div>
            </div>
          </div>

          <div className="p-6">
            <div className="flex flex-wrap gap-2 mb-3">
              {blog.categories.slice(0, 2).map((category) => (
                <Badge
                  key={category.id}
                  variant="secondary"
                  className="text-xs"
                  style={
                    category.color
                      ? {
                          backgroundColor: `${category.color}20`,
                          borderColor: category.color,
                          color: category.color,
                        }
                      : undefined
                  }
                >
                  {category.icon && (
                    <span className="mr-1">{category.icon}</span>
                  )}
                  {category.title}
                </Badge>
              ))}
              {blog.categories.length > 2 && (
                <Badge variant="outline" className="text-xs">
                  +{blog.categories.length - 2}
                </Badge>
              )}
            </div>

            <h3 className="text-xl font-semibold mb-2 group-hover:text-primary transition-colors">
              {blog.title}
            </h3>
            <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
              {blog.excerpt}
            </p>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4 text-xs text-muted-foreground">
                {blog.publishedAt && (
                  <span className="flex items-center gap-1">
                    <Calendar className="w-3 h-3" />
                    {formatDistanceToNow(new Date(blog.publishedAt), {
                      addSuffix: true,
                    })}
                  </span>
                )}
                {blog.tags.length > 0 && (
                  <span className="flex items-center gap-1">
                    <Tag className="w-3 h-3" />
                    {blog.tags.length} tag{blog.tags.length !== 1 ? "s" : ""}
                  </span>
                )}
              </div>
              <div className="flex items-center gap-2 text-sm font-medium text-primary">
                Read More
                <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </div>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}

export default function BlogPage() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });
  const loadMoreRef = useRef<HTMLDivElement>(null);

  const [searchQuery, setSearchQuery] = useState("");
  const [debouncedSearchQuery, setDebouncedSearchQuery] = useState("");
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [showFeaturedOnly, setShowFeaturedOnly] = useState(false);
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  const { data: tagsData } = useBlogTags();
  const { data: categoriesData } = useBlogCategories();
  const tags = tagsData?.tags || [];
  const categories = categoriesData?.categories || [];

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
      "blogs",
      {
        status: "PUBLISHED",
        search: debouncedSearchQuery || undefined,
        featured: showFeaturedOnly ? "true" : undefined,
        categoryId: selectedCategory || undefined,
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
      if (selectedCategory) searchParams.set("categoryId", selectedCategory);
      if (selectedTags.length > 0) {
        selectedTags.forEach((tag) => searchParams.append("tags", tag));
      }

      const response = await fetch(`/api/blogs?${searchParams.toString()}`);
      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || "Failed to fetch blogs");
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

  const blogs = useMemo(() => {
    return data?.pages.flatMap((page) => page.blogs) || [];
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
    setSelectedCategory(null);
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
    debouncedSearchQuery ||
    selectedTags.length > 0 ||
    selectedCategory ||
    showFeaturedOnly;

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
            <BookOpen className="w-4 h-4 text-primary" />
            <span className="text-sm font-mono text-primary">~/blog --all</span>
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
            Blog{" "}
            <span className="bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
              Posts
            </span>
          </h1>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Thoughts, tutorials, and insights on Web3 development, full-stack
            engineering, and more
          </p>
        </motion.div>

        <div className="mb-8 space-y-4">
          <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Search blog posts..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>

            <div className="flex items-center gap-2">
              <Button
                variant={viewMode === "grid" ? "default" : "outline"}
                size="sm"
                onClick={() => setViewMode("grid")}
              >
                <Grid3x3 className="w-4 h-4" />
              </Button>
              <Button
                variant={viewMode === "list" ? "default" : "outline"}
                size="sm"
                onClick={() => setViewMode("list")}
              >
                <List className="w-4 h-4" />
              </Button>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-4">
            <div className="flex items-center gap-2">
              <Filter className="w-4 h-4 text-muted-foreground" />
              <span className="text-sm font-medium">Filters:</span>
            </div>

            <Button
              variant={showFeaturedOnly ? "default" : "outline"}
              size="sm"
              onClick={() => setShowFeaturedOnly(!showFeaturedOnly)}
            >
              Featured
            </Button>

            {categories.map((category) => (
              <Button
                key={category.id}
                variant={
                  selectedCategory === category.id ? "default" : "outline"
                }
                size="sm"
                onClick={() =>
                  setSelectedCategory(
                    selectedCategory === category.id ? null : category.id
                  )
                }
                style={
                  category.color && selectedCategory === category.id
                    ? {
                        backgroundColor: `${category.color}20`,
                        borderColor: category.color,
                        color: category.color,
                      }
                    : undefined
                }
              >
                {category.icon && <span className="mr-1">{category.icon}</span>}
                {category.title}
                {category._count && category._count.blogs > 0 && (
                  <Badge variant="secondary" className="ml-2 text-xs">
                    {category._count.blogs}
                  </Badge>
                )}
              </Button>
            ))}

            {tags.map((tag) => (
              <Button
                key={tag.id}
                variant={selectedTags.includes(tag.id) ? "default" : "outline"}
                size="sm"
                onClick={() => toggleTag(tag.id)}
              >
                {tag.title}
                {tag._count && tag._count.blogs > 0 && (
                  <Badge variant="secondary" className="ml-2 text-xs">
                    {tag._count.blogs}
                  </Badge>
                )}
              </Button>
            ))}

            {hasActiveFilters && (
              <Button
                variant="ghost"
                size="sm"
                onClick={clearFilters}
                className="ml-auto"
              >
                <X className="w-4 h-4 mr-1" />
                Clear Filters
              </Button>
            )}
          </div>
        </div>

        {isLoading ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 mb-8">
            {Array.from({ length: 6 }).map((_, i) => (
              <BlogCardSkeleton key={i} />
            ))}
          </div>
        ) : isError ? (
          <div className="text-center py-20">
            <p className="text-muted-foreground">
              Failed to load blog posts. Please try again later.
            </p>
          </div>
        ) : blogs.length === 0 ? (
          <div className="text-center py-20">
            <BookOpen className="w-16 h-16 text-muted-foreground/50 mx-auto mb-4" />
            <p className="text-muted-foreground text-lg">
              No blog posts found. Try adjusting your filters.
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
                {blogs.map((blog, idx) => (
                  <BlogCard
                    key={blog.id}
                    blog={blog}
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
              {!hasNextPage && blogs.length > 0 && (
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
