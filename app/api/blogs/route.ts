import { NextRequest, NextResponse } from "next/server";
import { headers } from "next/headers";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { createBlogSchema } from "@/lib/validations";
import { z } from "zod";
import removeMd from "remove-markdown";

export async function GET(request: NextRequest) {
  try {
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    const searchParams = request.nextUrl.searchParams;
    const status = searchParams.get("status");
    const featured = searchParams.get("featured");
    const search = searchParams.get("search");
    const categoryId = searchParams.get("categoryId");
    const tags = searchParams.getAll("tags");
    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "10");
    const skip = (page - 1) * limit;

    const where: any = {
      deletedAt: null,
    };

    if (status) {
      where.status = status;
    } else if (!session) {
      where.status = "PUBLISHED";
    }

    if (featured !== null && featured !== undefined) {
      where.featured = featured === "true";
    }

    if (categoryId) {
      where.categories = {
        some: { id: categoryId },
      };
    }

    if (tags.length > 0) {
      where.tags = {
        some: {
          id: {
            in: tags,
          },
        },
      };
    }

    if (search) {
      where.OR = [
        { title: { contains: search, mode: "insensitive" } },
        { excerpt: { contains: search, mode: "insensitive" } },
        { slug: { contains: search, mode: "insensitive" } },
      ];
    }

    const [blogs, total] = await Promise.all([
      prisma.blog.findMany({
        where,
        include: {
          categories: true,
          tags: true,
        },
        orderBy: [{ order: "asc" }, { createdAt: "desc" }],
        skip,
        take: limit,
      }),
      prisma.blog.count({ where }),
    ]);

    return NextResponse.json({
      blogs,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    console.error("Error fetching blogs:", error);
    return NextResponse.json(
      { error: "Failed to fetch blogs" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const validatedData = createBlogSchema.parse(body);

    const existingBlog = await prisma.blog.findUnique({
      where: { slug: validatedData.slug },
    });

    if (existingBlog) {
      return NextResponse.json(
        { error: "Blog with this slug already exists" },
        { status: 400 }
      );
    }

    const {
      categoryIds,
      tagIds,
      publishedAt,
      body: bodyContent,
      ...blogData
    } = validatedData;

    let readingTime = 0;
    let wordCount = 0;
    if (bodyContent && typeof bodyContent === "string") {
      const text = removeMd(bodyContent, {
        stripListLeaders: true,
        gfm: true,
        useImgAltText: true,
      });
      wordCount = text.split(/\s+/).filter(Boolean).length; 
      readingTime = Math.ceil(wordCount / 200);
    }

    const blog = await prisma.blog.create({
      data: {
        ...blogData,
        body: bodyContent || null,
        readingTime,
        wordCount,
        publishedAt: publishedAt ? new Date(publishedAt) : null,
        categories: {
          connect: categoryIds.map((id) => ({ id })),
        },
        tags: {
          connect: tagIds.map((id) => ({ id })),
        },
      },
      include: {
        categories: true,
        tags: true,
      },
    });

    return NextResponse.json(blog, { status: 201 });
  } catch (error) {
    console.error("Error creating blog:", error);
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: "Validation error", details: error.issues },
        { status: 400 }
      );
    }
    return NextResponse.json(
      { error: "Failed to create blog" },
      { status: 500 }
    );
  }
}
