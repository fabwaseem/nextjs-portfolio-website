const DEFAULT_DRAIN_MS = 9000;

export function isDraining() {
  return globalThis.__folioraDraining === true;
}

export function markDraining() {
  globalThis.__folioraDraining = true;
}

export function shutdownDrainMs() {
  const raw = process.env.SHUTDOWN_DRAIN_MS;
  if (raw == null || raw === "") return DEFAULT_DRAIN_MS;
  const value = Number(raw);
  if (!Number.isFinite(value) || value < 0) return DEFAULT_DRAIN_MS;
  return value;
}

export function healthPayload() {
  if (isDraining()) {
    return { statusCode: 503, body: { status: "draining" } };
  }
  return { statusCode: 200, body: { status: "ok" } };
}

export async function closeDbPools() {
  const g = globalThis;

  if (typeof g.prisma?.$disconnect === "function") {
    try {
      await g.prisma.$disconnect();
    } catch (error) {
      console.error("[shutdown] prisma disconnect failed", error);
    }
  }

  if (typeof g.pgPool?.end === "function") {
    try {
      await g.pgPool.end();
    } catch (error) {
      console.error("[shutdown] pg pool end failed", error);
    }
  }
}
