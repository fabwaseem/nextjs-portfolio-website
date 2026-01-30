"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Blog } from "@/hooks/use-blogs";
import { cn } from "@/lib/utils";
import { formatDistanceToNow } from "date-fns";
import { motion, useInView } from "framer-motion";
import {
  ArrowLeft,
  BookOpen,
  Calendar,
  Clock,
  Eye,
  Share2,
  Tag,
} from "lucide-react";
import { useTheme } from "next-themes";
import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import ReactMarkdown from "react-markdown";
import rehypeHighlight from "rehype-highlight";
import { CodeBlockWithActions } from "@/components/ui/code-block-with-actions";

interface BlogContentProps {
  blog: Blog & {
    relatedTo?: Blog[];
  };
}

function RelatedPostCard({ blog, index }: { blog: Blog; index: number }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(cardRef, { once: true, margin: "-50px" });

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.1 }}
    >
      <Link href={`/blog/${blog.slug}`}>
        <div className="group relative overflow-hidden rounded-xl border border-border bg-card/50 backdrop-blur-sm transition-all duration-500 hover:border-primary/30">
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
                <BookOpen className="w-12 h-12 text-primary/30" />
              </div>
            )}
          </div>
          <div className="p-4">
            <h3 className="text-lg font-semibold mb-2 group-hover:text-primary transition-colors line-clamp-2">
              {blog.title}
            </h3>
            <p className="text-sm text-muted-foreground line-clamp-2 mb-3">
              {blog.excerpt}
            </p>
            <div className="flex items-center gap-3 text-xs text-muted-foreground">
              {blog.readingTime && (
                <span className="flex items-center gap-1">
                  <Clock className="w-3 h-3" />
                  {blog.readingTime} min
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
      </Link>
    </motion.div>
  );
}

function getBodyString(body: Blog["body"]): string {
  if (!body) return "";
  if (typeof body === "string") return body;
  if (typeof body === "object" && body !== null && "html" in body) {
    return (body as { html: string }).html;
  }
  return "";
}

export function BlogContent({ blog }: BlogContentProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });
  const { resolvedTheme } = useTheme();
  const hljsHref =
    resolvedTheme === "light" ? "/hljs-light.css" : "/hljs-dark.css";

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: blog.title,
          text: blog.excerpt,
          url: window.location.href,
        });
      } catch (error) {
        console.error("Error sharing:", error);
      }
    } else {
      navigator.clipboard.writeText(window.location.href);
    }
  };

  return (
    <section
      ref={sectionRef}
      className="relative py-24 md:py-32 overflow-hidden min-h-screen"
    >
      <link rel="stylesheet" href={hljsHref} data-hljs-theme={resolvedTheme} />
      <div className="absolute inset-0 bg-code-dots" />
      <div className="absolute inset-0 bg-mesh opacity-60" />

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-8"
        >
          <Button asChild variant="ghost" className="mb-6 group">
            <Link href="/blog">
              <ArrowLeft className="w-4 h-4 mr-2 transition-transform group-hover:-translate-x-1" />
              Back to Blog
            </Link>
          </Button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="max-w-4xl mx-auto min-w-0 w-full"
        >
          <article className="min-w-0">
            <div className="mb-8">
              <div className="flex flex-wrap items-center gap-2 mb-4">
                {blog.categories.map((category) => (
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
                {blog.featured && (
                  <Badge variant="default" className="text-xs">
                    Featured
                  </Badge>
                )}
              </div>

              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
                {blog.title}
              </h1>

              <p className="text-xl text-muted-foreground mb-6">
                {blog.excerpt}
              </p>

              <div className="flex flex-wrap items-center gap-6 text-sm text-muted-foreground mb-6">
                {blog.publishedAt && (
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    <span>
                      {formatDistanceToNow(new Date(blog.publishedAt), {
                        addSuffix: true,
                      })}
                    </span>
                  </div>
                )}
                {blog.readingTime && (
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4" />
                    <span>{blog.readingTime} min read</span>
                  </div>
                )}
                {blog.views > 0 && (
                  <div className="flex items-center gap-2">
                    <Eye className="w-4 h-4" />
                    <span>{blog.views.toLocaleString()} views</span>
                  </div>
                )}
                {blog.wordCount && (
                  <span>{blog.wordCount.toLocaleString()} words</span>
                )}
              </div>

              <div className="flex items-center gap-4 mb-8">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleShare}
                  className="gap-2"
                >
                  <Share2 className="w-4 h-4" />
                  Share
                </Button>
              </div>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative aspect-video rounded-xl overflow-hidden bg-muted mb-12 group"
            >
              {blog.featuredImage ? (
                <Image
                  src={blog.featuredImage}
                  alt={blog.featuredImageAlt || blog.title}
                  fill
                  className="object-cover"
                  priority
                />
              ) : (
                <div className="absolute inset-0 flex items-center justify-center bg-linear-to-br from-primary/20 to-primary/5">
                  <BookOpen className="w-24 h-24 text-primary/30" />
                </div>
              )}
            </motion.div>

            {blog.body?.trim() && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="mb-12 min-w-0 overflow-x-auto"
              >
                <div
                  className={cn(
                    "prose prose-invert prose-lg max-w-none min-w-0 wrap-break-word",
                    "prose-headings:font-bold prose-headings:text-foreground",
                    "prose-p:text-muted-foreground prose-p:leading-relaxed prose-p:wrap-break-word",
                    "prose-a:text-primary prose-a:no-underline hover:prose-a:underline prose-a:wrap-break-word",
                    "prose-strong:text-foreground",
                    "prose-code:text-primary prose-code:bg-muted prose-code:px-1 prose-code:py-0.5 prose-code:rounded prose-code:break-all prose-code:before:content-none prose-code:after:content-none",
                    "prose-pre:bg-muted prose-pre:border prose-pre:border-border prose-pre:overflow-x-auto prose-pre:max-w-full prose-pre:rounded-lg [&>pre]:p-4",
                    "prose-blockquote:border-l-primary prose-blockquote:bg-muted/50 prose-blockquote:wrap-break-word",
                    "prose-img:rounded-lg prose-img:border prose-img:border-border prose-img:max-w-full prose-img:h-auto",
                    "prose-ul:list-disc prose-ol:list-decimal",
                    "prose-li:text-muted-foreground prose-li:wrap-break-word"
                  )}
                  style={{
                    overflowWrap: "break-word",
                    wordBreak: "break-word",
                  }}
                >
                  <ReactMarkdown
                    rehypePlugins={[rehypeHighlight]}
                    components={{
                      pre: (props) => <CodeBlockWithActions {...props} />,
                    }}
                  >
                    {blog.body?.trim() || ""}
                  </ReactMarkdown>
                </div>
              </motion.div>
            )}

            {blog.tags && blog.tags.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="mb-12 pt-8 border-t border-border"
              >
                <div className="flex items-center gap-2 mb-4">
                  <Tag className="w-4 h-4 text-muted-foreground" />
                  <span className="text-sm font-medium text-muted-foreground">
                    Tags:
                  </span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {blog.tags.map((tag) => (
                    <Badge key={tag.id} variant="outline" className="text-sm">
                      {tag.title}
                    </Badge>
                  ))}
                </div>
              </motion.div>
            )}

            {blog.relatedTo && blog.relatedTo.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.5 }}
                className="mt-16 pt-12 border-t border-border"
              >
                <h2 className="text-2xl font-semibold mb-6">Related Posts</h2>
                <div className="grid md:grid-cols-3 gap-6">
                  {blog.relatedTo.map((relatedBlog, idx) => (
                    <RelatedPostCard
                      key={relatedBlog.id}
                      blog={relatedBlog}
                      index={idx}
                    />
                  ))}
                </div>
              </motion.div>
            )}
          </article>
        </motion.div>
      </div>
    </section>
  );
}
