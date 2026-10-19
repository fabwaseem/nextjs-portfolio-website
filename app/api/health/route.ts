import { NextResponse } from "next/server";
import { healthPayload } from "@/lib/shutdown.mjs";

export const dynamic = "force-dynamic";

export function GET() {
  const { statusCode, body } = healthPayload();
  return NextResponse.json(body, {
    status: statusCode,
    headers: {
      "Cache-Control": "no-store",
    },
  });
}
