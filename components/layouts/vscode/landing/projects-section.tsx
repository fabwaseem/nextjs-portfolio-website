"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowUpRight,
  ExternalLink,
  FolderGit2,
  Github,
  Star,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { useFeaturedProjects, Project } from "@/hooks/use-projects";
import { ProjectCardSkeleton } from "../common/card-skeletons";
import { useReducedMotion } from "@/hooks/use-reduced-motion";

function ProjectCard({ project, index }: { project: Project; index: number }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(cardRef, { once: true, margin: "-50px" });
  const prefersReducedMotion = useReducedMotion();

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={
        prefersReducedMotion
          ? { duration: 0 }
          : { duration: 0.6, delay: index * 0.1 }
      }
      className="group relative"
    >
      <Link href={`/projects/${project.slug}`}>
        <div className="relative overflow-hidden rounded-xl border border-border bg-card/50 backdrop-blur-sm transition-all duration-500 hover:border-primary/30 card-hover-lift">
          <div className="relative aspect-video overflow-hidden bg-muted">
            {project.thumbnail ? (
              <Image
                src={project.thumbnail}
                alt={
                  project.excerpt || project.description
                    ? `${project.title} - ${
                        project.excerpt || project.description
                      }`
                    : project.title
                }
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
                loading={index < 3 ? "eager" : "lazy"}
              />
            ) : (
              <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-primary/20 to-primary/5">
                <FolderGit2
                  className="w-16 h-16 text-primary/30"
                  aria-hidden="true"
                />
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
                  className="p-3 rounded-full bg-background/90 text-foreground hover:bg-primary hover:text-primary-foreground transition-colors focus-visible:ring-2 focus-visible:ring-primary/50"
                  aria-label={`View ${project.title} source code on GitHub`}
                >
                  <Github className="w-5 h-5" aria-hidden="true" />
                </Link>
              )}
              {project.demoLink && (
                <Link
                  href={project.demoLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => e.stopPropagation()}
                  className="p-3 rounded-full bg-background/90 text-foreground hover:bg-primary hover:text-primary-foreground transition-colors focus-visible:ring-2 focus-visible:ring-primary/50"
                  aria-label={`View ${project.title} live demo`}
                >
                  <ExternalLink className="w-5 h-5" aria-hidden="true" />
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

export function ProjectsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });
  const prefersReducedMotion = useReducedMotion();
  const { data, isLoading } = useFeaturedProjects(6);
  const featuredProjects = data?.projects ?? [];

  return (
    <section
      ref={sectionRef}
      id="projects"
      className="relative py-24 md:py-32 overflow-hidden"
    >
      <div className="absolute inset-0 bg-code-dots" aria-hidden="true" />
      <div className="absolute inset-0 bg-mesh opacity-60" aria-hidden="true" />

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={
            prefersReducedMotion ? { duration: 0 } : { duration: 0.6 }
          }
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-4">
            <FolderGit2 className="w-4 h-4 text-primary" aria-hidden="true" />
            <span className="text-sm font-mono text-primary">
              ~/projects --featured
            </span>
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
            Featured{" "}
            <span className="bg-linear-to-r from-primary to-primary/60 bg-clip-text text-transparent">
              Projects
            </span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            A selection of my recent work. Each project represents a unique
            challenge and solution.
          </p>
        </motion.div>

        {isLoading ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {Array.from({ length: 6 }).map((_, i) => (
              <ProjectCardSkeleton key={i} />
            ))}
          </div>
        ) : featuredProjects.length === 0 ? (
          <div className="text-center py-20">
            <FolderGit2 className="w-16 h-16 text-muted-foreground/50 mx-auto mb-4" />
            <p className="text-muted-foreground text-lg">
              No featured projects yet. Check back soon!
            </p>
          </div>
        ) : (
          <>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
              {featuredProjects.map((project, idx) => (
                <ProjectCard key={project.id} project={project} index={idx} />
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={
                prefersReducedMotion
                  ? { duration: 0 }
                  : { duration: 0.6, delay: 0.4 }
              }
              className="text-center mt-12"
            >
              <Button asChild variant="outline" size="lg" className="gap-2">
                <Link href="/projects">
                  View All Projects
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
