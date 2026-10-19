export function isDraining(): boolean;
export function markDraining(): void;
export function shutdownDrainMs(): number;
export function healthPayload(): {
  statusCode: 200 | 503;
  body: { status: "ok" | "draining" };
};
export function closeDbPools(): Promise<void>;
