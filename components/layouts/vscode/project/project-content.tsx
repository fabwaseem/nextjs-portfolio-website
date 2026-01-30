"use client";

import { useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useTheme } from "next-themes";
import { formatDistanceToNow } from "date-fns";
import {
  ArrowLeft,
  ExternalLink,
  Github,
  Calendar,
  Eye,
  FolderGit2,
  Play,
} from "lucide-react";
import ReactMarkdown from "react-markdown";
import rehypeHighlight from "rehype-highlight";
import { CodeBlockWithActions } from "@/components/ui/code-block-with-actions";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { Project } from "@/hooks/use-projects";

interface ProjectContentProps {
  project: Project;
}

export function ProjectContent({ project }: ProjectContentProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });
  const { resolvedTheme } = useTheme();
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);

  const hljsHref =
    resolvedTheme === "light" ? "/hljs-light.css" : "/hljs-dark.css";

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
            <Link href="/projects">
              <ArrowLeft className="w-4 h-4 mr-2 transition-transform group-hover:-translate-x-1" />
              Back to Projects
            </Link>
          </Button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="max-w-4xl mx-auto"
        >
          <div className="mb-8">
            <div className="flex flex-wrap items-center gap-2 mb-4">
              {project.tags.map((tag) => (
                <Badge
                  key={tag.id}
                  variant="secondary"
                  className="text-xs font-mono"
                >
                  {tag.title}
                </Badge>
              ))}
              {project.featured && (
                <Badge variant="default" className="text-xs">
                  Featured
                </Badge>
              )}
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
              {project.title}
            </h1>

            {project.excerpt && (
              <p className="text-xl text-muted-foreground mb-6">
                {project.excerpt}
              </p>
            )}

            <div className="flex flex-wrap items-center gap-6 text-sm text-muted-foreground mb-8">
              {project.publishedAt && (
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  <span>
                    {formatDistanceToNow(new Date(project.publishedAt), {
                      addSuffix: true,
                    })}
                  </span>
                </div>
              )}
              {project.views > 0 && (
                <div className="flex items-center gap-2">
                  <Eye className="w-4 h-4" />
                  <span>{project.views.toLocaleString()} views</span>
                </div>
              )}
            </div>

            <div className="flex flex-wrap gap-4 mb-8">
              {project.demoLink && (
                <Button asChild size="lg" className="gap-2">
                  <Link
                    href={project.demoLink}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <ExternalLink className="w-4 h-4" />
                    View Live Demo
                  </Link>
                </Button>
              )}
              {project.githubLink && (
                <Button asChild variant="outline" size="lg" className="gap-2">
                  <Link
                    href={project.githubLink}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Github className="w-4 h-4" />
                    View on GitHub
                  </Link>
                </Button>
              )}
              {project.videoUrl && (
                <Button
                  variant="outline"
                  size="lg"
                  className="gap-2"
                  onClick={() => setIsVideoModalOpen(true)}
                >
                  <Play className="w-4 h-4" />
                  Watch Video
                </Button>
              )}
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative aspect-video rounded-xl overflow-hidden bg-muted mb-12 group"
          >
            {project.cover ? (
              <Image
                src={project.cover}
                alt={project.title}
                fill
                className="object-cover"
                priority
              />
            ) : project.thumbnail ? (
              <Image
                src={project.thumbnail}
                alt={project.title}
                fill
                className="object-cover"
                priority
              />
            ) : (
              <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-primary/20 to-primary/5">
                <FolderGit2 className="w-24 h-24 text-primary/30" />
              </div>
            )}
          </motion.div>

          {project.description && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="mb-12"
            >
              <h2 className="text-2xl font-semibold mb-4">
                About This Project
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed">
                {project.description}
              </p>
            </motion.div>
          )}

          {project.techStack && project.techStack.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="mb-12"
            >
              <h2 className="text-2xl font-semibold mb-4">Tech Stack</h2>
              <div className="flex flex-wrap gap-2">
                {project.techStack.map((tech) => (
                  <Badge
                    key={tech}
                    variant="secondary"
                    className="text-sm font-mono px-3 py-1"
                  >
                    {tech}
                  </Badge>
                ))}
              </div>
            </motion.div>
          )}

          {project.body?.trim() && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.5 }}
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
                  {project.body?.trim() || ""}
                </ReactMarkdown>
              </div>
            </motion.div>
          )}
        </motion.div>
      </div>

      {isVideoModalOpen && project.videoUrl && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm"
          onClick={() => setIsVideoModalOpen(false)}
        >
          <div
            className="relative w-full max-w-4xl mx-4 aspect-video"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setIsVideoModalOpen(false)}
              className="absolute -top-12 right-0 text-white hover:text-primary transition-colors"
            >
              <span className="text-sm">Close</span>
            </button>
            {project.youtubeId ? (
              <iframe
                src={`https://www.youtube.com/embed/${project.youtubeId}?autoplay=1`}
                className="w-full h-full rounded-lg"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            ) : (
              <video
                src={project.videoUrl}
                controls
                autoPlay
                className="w-full h-full rounded-lg"
              />
            )}
          </div>
        </div>
      )}
    </section>
  );
}
