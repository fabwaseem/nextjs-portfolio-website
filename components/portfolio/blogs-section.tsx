"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { formatDistanceToNow } from "date-fns";
import {
  ArrowUpRight,
  BookOpen,
  Clock,
  Eye,
  Calendar,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useBlogs, Blog } from "@/hooks/use-blogs";
import { BlogCardSkeleton } from "./card-skeletons";
import { useReducedMotion } from "@/hooks/use-reduced-motion";

function BlogCard({ blog, index }: { blog: Blog; index: number }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(cardRef, { once: true, margin: "-50px" });
  const prefersReducedMotion = useReducedMotion();

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={prefersReducedMotion ? { duration: 0 } : { duration: 0.6, delay: index * 0.1 }}
      className="group relative"
    >
      <Link href={`/blog/${blog.slug}`}>
        <div className="relative overflow-hidden rounded-xl border border-border bg-card/50 backdrop-blur-sm transition-all duration-500 hover:border-primary/30 card-hover-lift">
          <div className="relative aspect-video overflow-hidden bg-muted">
            {blog.featuredImage ? (
              <Image
                src={blog.featuredImage}
                alt={blog.featuredImageAlt || (blog.excerpt ? `${blog.title} - ${blog.excerpt}` : blog.title)}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
                loading={index < 3 ? "eager" : "lazy"}
              />
            ) : (
              <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-primary/20 to-primary/5">
                <BookOpen className="w-16 h-16 text-primary/30" aria-hidden="true" />
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
                    <Clock className="w-3 h-3" aria-hidden="true" />
                    {blog.readingTime} min
                  </span>
                )}
                {blog.views > 0 && (
                  <span className="flex items-center gap-1 px-2 py-1 rounded-full bg-background/80 backdrop-blur-sm">
                    <Eye className="w-3 h-3" aria-hidden="true" />
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
                  {category.icon && <span className="mr-1">{category.icon}</span>}
                  {category.title}
                </Badge>
              ))}
              {blog.categories.length > 2 && (
                <Badge variant="outline" className="text-xs">
                  +{blog.categories.length - 2}
                </Badge>
              )}
            </div>

            <h3 className="text-xl font-semibold mb-2 group-hover:text-primary transition-colors line-clamp-2">
              {blog.title}
            </h3>
            <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
              {blog.excerpt}
            </p>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4 text-xs text-muted-foreground">
                {blog.publishedAt && (
                  <span className="flex items-center gap-1">
                    <Calendar className="w-3 h-3" aria-hidden="true" />
                    {formatDistanceToNow(new Date(blog.publishedAt), {
                      addSuffix: true,
                    })}
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

export function BlogsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });
  const prefersReducedMotion = useReducedMotion();
  const { data, isLoading } = useBlogs({
    status: "PUBLISHED",
    featured: "true",
    limit: 3,
  });

  const featuredBlogs = data?.blogs || [];

  return (
    <section
      ref={sectionRef}
      id="blog"
      className="relative py-24 md:py-32 overflow-hidden"
    >
      <div className="absolute inset-0 bg-code-dots" aria-hidden="true" />
      <div className="absolute inset-0 bg-mesh opacity-60" aria-hidden="true" />

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={prefersReducedMotion ? { duration: 0 } : { duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-4">
            <BookOpen className="w-4 h-4 text-primary" aria-hidden="true" />
            <span className="text-sm font-mono text-primary">
              ~/blog --featured
            </span>
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
            Featured{" "}
            <span className="bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
              Blog Posts
            </span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Thoughts, tutorials, and insights on Web3 development, full-stack
            engineering, and more.
          </p>
        </motion.div>

        {isLoading ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {Array.from({ length: 3 }).map((_, i) => (
              <BlogCardSkeleton key={i} />
            ))}
          </div>
        ) : featuredBlogs.length === 0 ? (
          <div className="text-center py-20">
            <BookOpen className="w-16 h-16 text-muted-foreground/50 mx-auto mb-4" />
            <p className="text-muted-foreground text-lg">
              No featured blog posts yet. Check back soon!
            </p>
          </div>
        ) : (
          <>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
              {featuredBlogs.map((blog, idx) => (
                <BlogCard key={blog.id} blog={blog} index={idx} />
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={prefersReducedMotion ? { duration: 0 } : { duration: 0.6, delay: 0.4 }}
              className="text-center mt-12"
            >
              <Button asChild variant="outline" size="lg" className="gap-2">
                <Link href="/blog">
                  View All Blog Posts
                  <ArrowUpRight className="w-4 h-4" />
                </Link>
              </Button>
            </motion.div>
          </>
        )}
      </div>
    </section>
  );
}
