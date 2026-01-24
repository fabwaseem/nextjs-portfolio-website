import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params;

    const blog = await prisma.blog.findUnique({
      where: {
        slug,
        status: "PUBLISHED",
        deletedAt: null,
      },
      include: {
        categories: true,
        tags: true,
        relatedTo: {
          where: {
            status: "PUBLISHED",
            deletedAt: null,
          },
          include: {
            categories: true,
            tags: true,
          },
          take: 3,
        },
      },
    });

    if (!blog) {
      return NextResponse.json({ error: "Blog not found" }, { status: 404 });
    }

    await prisma.blog.update({
      where: { id: blog.id },
      data: { views: { increment: 1 } },
    });

    // Serialize dates to ISO strings for client compatibility
    const serializedBlog = {
      ...blog,
      createdAt: blog.createdAt.toISOString(),
      updatedAt: blog.updatedAt.toISOString(),
      publishedAt: blog.publishedAt?.toISOString() ?? null,
      deletedAt: blog.deletedAt?.toISOString() ?? null,
      relatedTo: blog.relatedTo.map((related) => ({
        ...related,
        createdAt: related.createdAt.toISOString(),
        updatedAt: related.updatedAt.toISOString(),
        publishedAt: related.publishedAt?.toISOString() ?? null,
        deletedAt: related.deletedAt?.toISOString() ?? null,
      })),
    };

    return NextResponse.json(serializedBlog);
  } catch (error) {
    console.error("Error fetching blog:", error);
    return NextResponse.json(
      { error: "Failed to fetch blog" },
      { status: 500 }
    );
  }
}
