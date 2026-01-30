import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { extractAndDeleteS3Images, extractImagesFromContent } from "@/lib/s3";
import { updateBlogSchema } from "@/lib/validations";
import { headers } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import removeMd from "remove-markdown";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id } = await params;

    const blog = await prisma.blog.findUnique({
      where: { id },
      include: {
        categories: true,
        tags: true,
      },
    });

    if (!blog) {
      return NextResponse.json({ error: "Blog not found" }, { status: 404 });
    }

    return NextResponse.json(blog);
  } catch (error) {
    console.error("Error fetching blog:", error);
    return NextResponse.json(
      { error: "Failed to fetch blog" },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id } = await params;
    const requestBody = await request.json();
    const validatedData = updateBlogSchema.parse(requestBody);

    const existingBlog = await prisma.blog.findUnique({
      where: { id },
    });

    if (!existingBlog) {
      return NextResponse.json({ error: "Blog not found" }, { status: 404 });
    }

    if (validatedData.slug && validatedData.slug !== existingBlog.slug) {
      const slugExists = await prisma.blog.findUnique({
        where: { slug: validatedData.slug },
      });

      if (slugExists) {
        return NextResponse.json(
          { error: "Blog with this slug already exists" },
          { status: 400 }
        );
      }
    }

    const {
      categoryIds,
      tagIds,
      publishedAt,
      body: bodyContent,
      featuredImage,
      ...updateData
    } = validatedData;

    const imagesToDelete: string[] = [];

    // Check if featured image changed
    if (featuredImage && existingBlog.featuredImage !== featuredImage) {
      imagesToDelete.push(existingBlog.featuredImage);
    }

    if (bodyContent) {
      const oldBody = existingBlog.body;
      if (oldBody && typeof oldBody === "string") {
        const oldImages = extractImagesFromContent(String(oldBody));
        const newImages = extractImagesFromContent(bodyContent);
        const removedImages = oldImages.filter(
          (img) => !newImages.includes(img)
        );
        imagesToDelete.push(...removedImages);
      }
    }

    let readingTime = existingBlog.readingTime;
    let wordCount: number | null = existingBlog.wordCount;
    if (bodyContent) {
      const text = removeMd(bodyContent, {
        stripListLeaders: true,
        gfm: true,
        useImgAltText: true,
      });
      wordCount = text.split(/\s+/).filter(Boolean).length || null;
      readingTime = Math.ceil(wordCount || 0 / 200);
    }

    const updatePayload: any = {
      ...updateData,
      readingTime,
      wordCount,
    };

    if (featuredImage !== undefined) {
      updatePayload.featuredImage = featuredImage;
    }

    if (bodyContent !== undefined) {
      updatePayload.body = bodyContent;
    }

    if (publishedAt !== undefined) {
      updatePayload.publishedAt = publishedAt ? new Date(publishedAt) : null;
    }

    if (categoryIds !== undefined) {
      updatePayload.categories = {
        set: categoryIds.map((id) => ({ id })),
      };
    }

    if (tagIds !== undefined) {
      updatePayload.tags = {
        set: tagIds.map((id) => ({ id })),
      };
    }

    const blog = await prisma.blog.update({
      where: { id },
      data: updatePayload,
      include: {
        categories: true,
        tags: true,
      },
    });

    // Delete old images from S3 after successful update
    if (imagesToDelete.length > 0) {
      await extractAndDeleteS3Images(imagesToDelete);
    }

    return NextResponse.json(blog);
  } catch (error) {
    console.error("Error updating blog:", error);
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: "Validation error", details: error.issues },
        { status: 400 }
      );
    }
    return NextResponse.json(
      { error: "Failed to update blog" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id } = await params;

    const existingBlog = await prisma.blog.findUnique({
      where: { id },
    });

    if (!existingBlog) {
      return NextResponse.json({ error: "Blog not found" }, { status: 404 });
    }

    // Soft delete
    await prisma.blog.update({
      where: { id },
      data: { deletedAt: new Date() },
    });

    return NextResponse.json({ message: "Blog deleted successfully" });
  } catch (error) {
    console.error("Error deleting blog:", error);
    return NextResponse.json(
      { error: "Failed to delete blog" },
      { status: 500 }
    );
  }
}
