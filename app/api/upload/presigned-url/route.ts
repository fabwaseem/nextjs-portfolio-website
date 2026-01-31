import { NextRequest, NextResponse } from "next/server";
import { headers } from "next/headers";
import { auth } from "@/lib/auth";
import { generatePresignedUploadUrl, getS3Key } from "@/lib/s3";
import { z } from "zod";

const presignedUrlSchema = z.object({
  filename: z.string().min(1, "Filename is required"),
  type: z.enum(["thumbnail", "cover"]),
  contentType: z.string().default("image/jpeg"),
});

export async function POST(request: NextRequest) {
  try {
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const validatedData = presignedUrlSchema.parse(body);

    const key = getS3Key(validatedData.filename, validatedData.type);

    const presignedUrl = await generatePresignedUploadUrl(
      key,
      validatedData.contentType,
      3600
    );

    return NextResponse.json({
      presignedUrl,
      key,
      url: `https://${process.env.AWS_S3_BUCKET_NAME}.s3.${
        process.env.AWS_REGION || "us-east-1"
      }.amazonaws.com/${key}`,
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: "Validation error", details: error.issues },
        { status: 400 }
      );
    }

    console.error("Error generating presigned URL:", error);
    return NextResponse.json(
      { error: "Failed to generate presigned URL" },
      { status: 500 }
    );
  }
}
