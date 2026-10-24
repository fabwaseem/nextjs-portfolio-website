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

/**
 * Kept for server.mjs shutdown flow. Content is fully static now, so
 * there are no database pools to close.
 */
export async function closeDbPools() {}
