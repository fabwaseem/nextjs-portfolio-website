import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";

export async function GET() {
  try {
    const session = await auth.api.getSession({ headers: await headers() });
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Fetch counts in parallel
    const [
      totalProjects,
      publishedProjects,
      draftProjects,
      featuredProjects,
      totalBlogs,
      publishedBlogs,
      draftBlogs,
      featuredBlogs,
      totalCategories,
      totalProjectTags,
      totalBlogTags,
      totalViews,
    ] = await Promise.all([
      // Projects
      prisma.project.count({ where: { deletedAt: null } }),
      prisma.project.count({ where: { deletedAt: null, status: "PUBLISHED" } }),
      prisma.project.count({ where: { deletedAt: null, status: "DRAFT" } }),
      prisma.project.count({ where: { deletedAt: null, featured: true } }),
      // Blogs
      prisma.blog.count({ where: { deletedAt: null } }),
      prisma.blog.count({ where: { deletedAt: null, status: "PUBLISHED" } }),
      prisma.blog.count({ where: { deletedAt: null, status: "DRAFT" } }),
      prisma.blog.count({ where: { deletedAt: null, featured: true } }),
      // Categories & Tags
      prisma.blogCategory.count(),
      prisma.projectTags.count(),
      prisma.blogTags.count(),
      // Total views (projects + blogs)
      prisma.project
        .aggregate({
          where: { deletedAt: null },
          _sum: { views: true },
        })
        .then((r) => r._sum.views || 0),
    ]);

    // Fetch total blog views separately
    const blogViews = await prisma.blog.aggregate({
      where: { deletedAt: null },
      _sum: { views: true },
    });

    // Fetch recent activities (latest 5 items from projects and blogs)
    const [recentProjects, recentBlogs] = await Promise.all([
      prisma.project.findMany({
        where: { deletedAt: null },
        orderBy: { updatedAt: "desc" },
        take: 5,
        select: {
          id: true,
          title: true,
          slug: true,
          status: true,
          createdAt: true,
          updatedAt: true,
        },
      }),
      prisma.blog.findMany({
        where: { deletedAt: null },
        orderBy: { updatedAt: "desc" },
        take: 5,
        select: {
          id: true,
          title: true,
          slug: true,
          status: true,
          createdAt: true,
          updatedAt: true,
        },
      }),
    ]);

    // Combine and sort activities
    const recentActivities = [
      ...recentProjects.map((p) => ({
        id: p.id,
        title: p.title,
        slug: p.slug,
        type: "project" as const,
        status: p.status,
        action:
          p.createdAt.getTime() === p.updatedAt.getTime()
            ? "created"
            : "updated",
        timestamp: p.updatedAt,
      })),
      ...recentBlogs.map((b) => ({
        id: b.id,
        title: b.title,
        slug: b.slug,
        type: "blog" as const,
        status: b.status,
        action:
          b.createdAt.getTime() === b.updatedAt.getTime()
            ? "created"
            : "updated",
        timestamp: b.updatedAt,
      })),
    ]
      .sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime())
      .slice(0, 5);

    return NextResponse.json({
      stats: {
        projects: {
          total: totalProjects,
          published: publishedProjects,
          draft: draftProjects,
          featured: featuredProjects,
        },
        blogs: {
          total: totalBlogs,
          published: publishedBlogs,
          draft: draftBlogs,
          featured: featuredBlogs,
        },
        categories: totalCategories,
        tags: {
          project: totalProjectTags,
          blog: totalBlogTags,
        },
        views: {
          projects: totalViews,
          blogs: blogViews._sum.views || 0,
          total: (totalViews as number) + (blogViews._sum.views || 0),
        },
      },
      recentActivities,
    });
  } catch (error) {
    console.error("Dashboard API error:", error);
    return NextResponse.json(
      { error: "Failed to fetch dashboard data" },
      { status: 500 },
    );
  }
}
