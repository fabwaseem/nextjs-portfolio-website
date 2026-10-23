/**
 * Static content layer.
 *
 * All site content (blogs, projects, categories, tags, testimonials and
 * site settings) is baked in from the JSON files in this directory, which
 * were exported from the production database. This module replicates the
 * exact behaviour of the former database-backed API routes (filtering,
 * searching, ordering and pagination) so public pages work unchanged,
 * with no database, auth or server-side data fetching involved.
 */
import blogsJson from "./blogs.json";
import projectsJson from "./projects.json";
import blogCategoriesJson from "./blog-categories.json";
import blogTagsJson from "./blog-tags.json";
import projectTagsJson from "./project-tags.json";
import testimonialsJson from "./testimonials.json";
import relationsJson from "./relations.json";
import settingsJson from "./settings.json";
import type { Blog, BlogCategory, BlogTag, BlogsResponse } from "@/hooks/use-blogs";
import type { Project, ProjectsResponse } from "@/hooks/use-projects";
import type { Testimonial } from "@/hooks/use-testimonials";

// ---------------------------------------------------------------------------
// Raw row types (mirror the former database schema)
// ---------------------------------------------------------------------------

interface BlogRow {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  metaTitle: string | null;
  metaDescription: string | null;
  featuredImage: string;
  featuredImageAlt: string | null;
  publishedAt: string | null;
  body: string | null;
  readingTime: number | null;
  wordCount: number | null;
  views: number;
  featured: boolean;
  status: "DRAFT" | "PUBLISHED" | "ARCHIVED";
  seoKeywords: string[];
  order: number;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
}

interface ProjectRow {
  id: string;
  title: string;
  slug: string;
  description: string | null;
  excerpt: string | null;
  demoLink: string | null;
  githubLink: string | null;
  videoUrl: string | null;
  thumbnail: string;
  cover: string;
  youtubeId: string | null;
  body: string | null;
  techStack: string[];
  featured: boolean;
  status: "DRAFT" | "PUBLISHED" | "ARCHIVED";
  publishedAt: string | null;
  order: number;
  views: number;
  metaTitle: string | null;
  metaDescription: string | null;
  seoKeywords: string[];
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
}

interface BlogCategoryRow {
  id: string;
  title: string;
  slug: string;
  description: string | null;
  color: string | null;
  icon: string | null;
  order: number;
  createdAt: string;
  updatedAt: string;
}

interface BlogTagRow {
  id: string;
  title: string;
  slug: string;
  createdAt: string;
  updatedAt: string;
}

interface ProjectTagRow {
  id: string;
  title: string;
  slug: string;
  createdAt: string;
  updatedAt: string;
}

interface TestimonialRow {
  id: string;
  name: string;
  role: string;
  company: string;
  companyUrl: string | null;
  avatar: string | null;
  content: string;
  rating: number | null;
  featured: boolean;
  order: number;
  createdAt: string;
  updatedAt: string;
}

const blogRows = blogsJson as unknown as BlogRow[];
const projectRows = projectsJson as unknown as ProjectRow[];
const blogCategoryRows = blogCategoriesJson as unknown as BlogCategoryRow[];
const blogTagRows = blogTagsJson as unknown as BlogTagRow[];
const projectTagRows = projectTagsJson as unknown as ProjectTagRow[];
const testimonialRows = testimonialsJson as unknown as TestimonialRow[];

const relations = relationsJson as {
  blogCategories: Record<string, string[]>;
  blogTags: Record<string, string[]>;
  projectTags: Record<string, string[]>;
  relatedPosts: Record<string, string[]>;
};

// ---------------------------------------------------------------------------
// Joined (public) shapes
// ---------------------------------------------------------------------------

const categoryById = new Map(blogCategoryRows.map((c) => [c.id, c]));
const blogTagById = new Map(blogTagRows.map((t) => [t.id, t]));
const projectTagById = new Map(projectTagRows.map((t) => [t.id, t]));

function toPublicBlog(row: BlogRow): Blog {
  const { deletedAt, ...rest } = row;
  return {
    ...rest,
    deletedAt: deletedAt ?? null,
    categories: (relations.blogCategories[row.id] ?? [])
      .map((id) => categoryById.get(id))
      .filter((c): c is BlogCategoryRow => Boolean(c))
      .map((c) => ({
        id: c.id,
        title: c.title,
        slug: c.slug,
        description: c.description,
        color: c.color,
        icon: c.icon,
        order: c.order,
      })),
    tags: (relations.blogTags[row.id] ?? [])
      .map((id) => blogTagById.get(id))
      .filter((t): t is BlogTagRow => Boolean(t))
      .map((t) => ({ id: t.id, title: t.title, slug: t.slug })),
  };
}

function toPublicProject(row: ProjectRow): Project {
  const { deletedAt, ...rest } = row;
  return {
    ...rest,
    deletedAt: deletedAt ?? null,
    tags: (relations.projectTags[row.id] ?? [])
      .map((id) => projectTagById.get(id))
      .filter((t): t is ProjectTagRow => Boolean(t))
      .map((t) => ({ id: t.id, title: t.title, slug: t.slug })),
  };
}

const allBlogs: Blog[] = blogRows.map(toPublicBlog);
const allProjects: Project[] = projectRows.map(toPublicProject);
const blogRowBySlug = new Map(blogRows.map((r) => [r.slug, r]));
const projectRowBySlug = new Map(projectRows.map((r) => [r.slug, r]));

// ---------------------------------------------------------------------------
// Query helpers (replicate the former /api/blogs and /api/projects GET)
// ---------------------------------------------------------------------------

export interface BlogsQueryParams {
  status?: string;
  featured?: string;
  search?: string;
  categoryId?: string;
  tags?: string[];
  page?: number;
  limit?: number;
}

export interface ProjectsQueryParams {
  status?: string;
  featured?: string;
  search?: string;
  tags?: string[];
  page?: number;
  limit?: number;
}

function byOrderThenCreatedDesc<T extends { order: number; createdAt: string }>(
  a: T,
  b: T
) {
  if (a.order !== b.order) return a.order - b.order;
  return b.createdAt.localeCompare(a.createdAt);
}

function paginate<T>(
  items: T[],
  page: number,
  limit: number
): { items: T[]; pagination: BlogsResponse["pagination"] } {
  const total = items.length;
  const skip = (page - 1) * limit;
  return {
    items: items.slice(skip, skip + limit),
    pagination: {
      page,
      limit,
      total,
      totalPages: Math.ceil(total / limit),
    },
  };
}

export function queryBlogs(params: BlogsQueryParams = {}): BlogsResponse {
  const page = params.page ?? 1;
  const limit = params.limit ?? 10;

  let result = allBlogs.filter((blog) => blog.deletedAt === null);

  if (params.status) {
    result = result.filter((blog) => blog.status === params.status);
  } else {
    // Anonymous visitors only ever saw published posts
    result = result.filter((blog) => blog.status === "PUBLISHED");
  }

  if (params.featured !== undefined && params.featured !== null) {
    result = result.filter((blog) => blog.featured === (params.featured === "true"));
  }

  if (params.categoryId) {
    result = result.filter((blog) =>
      blog.categories.some((c) => c.id === params.categoryId)
    );
  }

  if (params.tags && params.tags.length > 0) {
    result = result.filter((blog) =>
      blog.tags.some((t) => params.tags!.includes(t.id))
    );
  }

  if (params.search) {
    const q = params.search.toLowerCase();
    result = result.filter(
      (blog) =>
        blog.title.toLowerCase().includes(q) ||
        blog.excerpt.toLowerCase().includes(q) ||
        blog.slug.toLowerCase().includes(q)
    );
  }

  result = [...result].sort(byOrderThenCreatedDesc);
  const { items, pagination } = paginate(result, page, limit);
  return { blogs: items, pagination };
}

export function queryProjects(params: ProjectsQueryParams = {}): ProjectsResponse {
  const page = params.page ?? 1;
  const limit = params.limit ?? 10;

  let result = allProjects.filter((project) => project.deletedAt === null);

  if (params.status) {
    result = result.filter((project) => project.status === params.status);
  } else {
    result = result.filter((project) => project.status === "PUBLISHED");
  }

  if (params.featured !== undefined && params.featured !== null) {
    result = result.filter(
      (project) => project.featured === (params.featured === "true")
    );
  }

  if (params.search) {
    const q = params.search.toLowerCase();
    result = result.filter(
      (project) =>
        project.title.toLowerCase().includes(q) ||
        (project.description ?? "").toLowerCase().includes(q) ||
        (project.excerpt ?? "").toLowerCase().includes(q) ||
        project.slug.toLowerCase().includes(q)
    );
  }

  if (params.tags && params.tags.length > 0) {
    result = result.filter((project) =>
      project.tags.some((t) => params.tags!.includes(t.id))
    );
  }

  result = [...result].sort(byOrderThenCreatedDesc);
  const { items, pagination } = paginate(result, page, limit);
  return { projects: items, pagination };
}

export function getBlogById(id: string): Blog | undefined {
  return allBlogs.find((blog) => blog.id === id && blog.deletedAt === null);
}

export function getProjectById(id: string): Project | undefined {
  return allProjects.find(
    (project) => project.id === id && project.deletedAt === null
  );
}

export function getAllPublishedBlogs(): Blog[] {
  return allBlogs
    .filter((blog) => blog.status === "PUBLISHED" && blog.deletedAt === null)
    .sort((a, b) => b.updatedAt.localeCompare(a.updatedAt));
}

export function getAllPublishedProjects(): Project[] {
  return allProjects
    .filter(
      (project) => project.status === "PUBLISHED" && project.deletedAt === null
    )
    .sort((a, b) => b.updatedAt.localeCompare(a.updatedAt));
}

// ---------------------------------------------------------------------------
// Categories & tags (replicate the former GET collection routes)
// ---------------------------------------------------------------------------

export interface BlogCategoryWithCount extends BlogCategory {
  createdAt: string;
  updatedAt: string;
  _count: { blogs: number };
}

export interface BlogTagWithCount extends BlogTag {
  createdAt: string;
  updatedAt: string;
  _count: { blogs: number };
}

export function getBlogCategories(): { categories: BlogCategoryWithCount[] } {
  const categories = [...blogCategoryRows]
    .sort((a, b) => a.order - b.order || a.title.localeCompare(b.title))
    .map((c) => ({
      id: c.id,
      title: c.title,
      slug: c.slug,
      description: c.description,
      color: c.color,
      icon: c.icon,
      order: c.order,
      createdAt: c.createdAt,
      updatedAt: c.updatedAt,
      _count: {
        blogs: Object.values(relations.blogCategories).filter((ids) =>
          ids.includes(c.id)
        ).length,
      },
    }));
  return { categories };
}

export function getBlogCategoryById(
  id: string
): BlogCategoryWithCount | undefined {
  return getBlogCategories().categories.find((c) => c.id === id);
}

export function getBlogTags(): { tags: BlogTagWithCount[] } {
  const tags = [...blogTagRows]
    .sort((a, b) => a.title.localeCompare(b.title))
    .map((t) => ({
      id: t.id,
      title: t.title,
      slug: t.slug,
      createdAt: t.createdAt,
      updatedAt: t.updatedAt,
      _count: {
        blogs: Object.values(relations.blogTags).filter((ids) =>
          ids.includes(t.id)
        ).length,
      },
    }));
  return { tags };
}

export function getProjectTags(): { tags: ProjectTagRow[] } {
  const tags = [...projectTagRows].sort((a, b) =>
    a.title.localeCompare(b.title)
  );
  return { tags };
}

// ---------------------------------------------------------------------------
// Testimonials (replicate the former /api/testimonials GET)
// ---------------------------------------------------------------------------

export function queryTestimonials(params: {
  featured?: boolean;
  limit?: number;
} = {}): { testimonials: Testimonial[] } {
  const limit = params.limit ?? 10;
  let result = testimonialRows.map((t) => ({ ...t }));
  if (params.featured) {
    result = result.filter((t) => t.featured);
  }
  result.sort(byOrderThenCreatedDesc);
  return { testimonials: result.slice(0, limit) };
}

// ---------------------------------------------------------------------------
// Settings (baked singleton rows)
// ---------------------------------------------------------------------------

export const staticSettings = settingsJson;

// ---------------------------------------------------------------------------
// Server-side accessors for detail pages (dates as Date objects, matching
// the shape the pages previously received from the database)
// ---------------------------------------------------------------------------

export interface ServerBlog
  extends Omit<Blog, "createdAt" | "updatedAt" | "publishedAt" | "deletedAt"> {
  createdAt: Date;
  updatedAt: Date;
  publishedAt: Date | null;
  deletedAt: Date | null;
  relatedTo: ServerBlog[];
}

export interface ServerProject
  extends Omit<
    Project,
    "createdAt" | "updatedAt" | "publishedAt" | "deletedAt"
  > {
  createdAt: Date;
  updatedAt: Date;
  publishedAt: Date | null;
  deletedAt: Date | null;
}

function toServerBlog(row: BlogRow): ServerBlog {
  const pub = toPublicBlog(row);
  return {
    ...pub,
    createdAt: new Date(row.createdAt),
    updatedAt: new Date(row.updatedAt),
    publishedAt: row.publishedAt ? new Date(row.publishedAt) : null,
    deletedAt: row.deletedAt ? new Date(row.deletedAt) : null,
    relatedTo: [],
  };
}

function toServerProject(row: ProjectRow): ServerProject {
  const pub = toPublicProject(row);
  return {
    ...pub,
    createdAt: new Date(row.createdAt),
    updatedAt: new Date(row.updatedAt),
    publishedAt: row.publishedAt ? new Date(row.publishedAt) : null,
    deletedAt: row.deletedAt ? new Date(row.deletedAt) : null,
  };
}

/** Full blog (with categories, tags and related posts) for /blog/[slug]. */
export function getBlogPostBySlug(slug: string) {
  const row = blogRowBySlug.get(slug);
  if (!row || row.status !== "PUBLISHED" || row.deletedAt !== null) {
    return null;
  }
  const blog = toServerBlog(row);
  const relatedIds = relations.relatedPosts[row.id] ?? [];
  blog.relatedTo = relatedIds
    .map((id) => blogRows.find((r) => r.id === id))
    .filter(
      (r): r is BlogRow =>
        Boolean(r) && r!.status === "PUBLISHED" && r!.deletedAt === null
    )
    .slice(0, 3)
    .map(toServerBlog);
  return blog;
}

/** Full project (with tags) for /projects/[slug]. */
export function getProjectBySlug(slug: string) {
  const row = projectRowBySlug.get(slug);
  if (!row || row.status !== "PUBLISHED" || row.deletedAt !== null) {
    return null;
  }
  return toServerProject(row);
}

/** Published slugs for generateStaticParams. */
export function getPublishedBlogSlugs(): string[] {
  return blogRows
    .filter((r) => r.status === "PUBLISHED" && r.deletedAt === null)
    .map((r) => r.slug);
}

export function getPublishedProjectSlugs(): string[] {
  return projectRows
    .filter((r) => r.status === "PUBLISHED" && r.deletedAt === null)
    .map((r) => r.slug);
}
