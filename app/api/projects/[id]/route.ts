import { NextRequest, NextResponse } from "next/server";
import { headers } from "next/headers";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { z } from "zod";
import { updateProjectSchema } from "@/lib/validations";
import {
  extractAndDeleteS3Images,
  extractImagesFromHtml,
} from "@/lib/s3";

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

    const project = await prisma.project.findUnique({
      where: { id },
      include: {
        tags: true,
      },
    });

    if (!project) {
      return NextResponse.json({ error: "Project not found" }, { status: 404 });
    }

    return NextResponse.json(project);
  } catch (error) {
    console.error("Error fetching project:", error);
    return NextResponse.json(
      { error: "Failed to fetch project" },
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
    const validatedData = updateProjectSchema.parse(requestBody);

    const existingProject = await prisma.project.findUnique({
      where: { id },
    });

    if (!existingProject) {
      return NextResponse.json({ error: "Project not found" }, { status: 404 });
    }

    if (validatedData.slug && validatedData.slug !== existingProject.slug) {
      const slugExists = await prisma.project.findUnique({
        where: { slug: validatedData.slug },
      });

      if (slugExists) {
        return NextResponse.json(
          { error: "Project with this slug already exists" },
          { status: 400 }
        );
      }
    }

    const { tagIds, publishedAt, body: bodyContent, thumbnail, cover, ...updateData } = validatedData;

    const imagesToDelete: string[] = [];

    if (thumbnail && existingProject.thumbnail !== thumbnail) {
      imagesToDelete.push(existingProject.thumbnail);
    }

    if (cover && existingProject.cover !== cover) {
      imagesToDelete.push(existingProject.cover);
    }

    if (bodyContent && typeof bodyContent === "string") {
      const oldBody = existingProject.body;
      if (oldBody && typeof oldBody === "string") {
        const oldImages = extractImagesFromHtml(oldBody);
        const newImages = extractImagesFromHtml(bodyContent);
        const removedImages = oldImages.filter((img) => !newImages.includes(img));
        imagesToDelete.push(...removedImages);
      }
    }

    if (imagesToDelete.length > 0) {
      await extractAndDeleteS3Images(imagesToDelete);
    }

    const project = await prisma.project.update({
      where: { id },
      data: {
        ...updateData,
        thumbnail: thumbnail !== undefined ? thumbnail : undefined,
        cover: cover !== undefined ? cover : undefined,
        body: bodyContent !== undefined ? bodyContent : undefined,
        publishedAt: publishedAt !== undefined
          ? publishedAt
            ? new Date(publishedAt)
            : null
          : undefined,
        tags: tagIds
          ? {
            set: tagIds.map((tagId) => ({ id: tagId })),
          }
          : undefined,
      },
      include: {
        tags: true,
      },
    });

    return NextResponse.json(project);
  } catch (error) {
    if (error instanceof z.ZodError) {
      const zodError = error as z.ZodError;
      return NextResponse.json(
        { error: "Validation error", details: zodError.issues },
        { status: 400 }
      );
    }

    console.error("Error updating project:", error);
    return NextResponse.json(
      { error: "Failed to update project" },
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

    const project = await prisma.project.findUnique({
      where: { id },
    });

    if (!project) {
      return NextResponse.json({ error: "Project not found" }, { status: 404 });
    }

    const imagesToDelete: string[] = [];

    if (project.thumbnail) {
      imagesToDelete.push(project.thumbnail);
    }

    if (project.cover) {
      imagesToDelete.push(project.cover);
    }

    if (project.body) {
      let bodyHtml = "";
      if (typeof project.body === "string") {
        bodyHtml = project.body;
      } else if (typeof project.body === "object" && project.body !== null && "html" in project.body) {
        bodyHtml = (project.body as { html: string }).html;
      }

      if (bodyHtml) {
        const bodyImages = extractImagesFromHtml(bodyHtml);
        imagesToDelete.push(...bodyImages);
      }
    }

    if (imagesToDelete.length > 0) {
      await extractAndDeleteS3Images(imagesToDelete);
    }

    await prisma.project.update({
      where: { id },
      data: {
        deletedAt: new Date(),
      },
    });

    return NextResponse.json({ message: "Project deleted successfully" });
  } catch (error) {
    console.error("Error deleting project:", error);
    return NextResponse.json(
      { error: "Failed to delete project" },
      { status: 500 }
    );
  }
}
