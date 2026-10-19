process.env.HOSTNAME = "0.0.0.0";
if (!process.env.PORT) process.env.PORT = "3000";

const { createServer } = await import("node:http");
const { parse } = await import("node:url");
const { default: next } = await import("next");
const { markDraining, shutdownDrainMs, healthPayload, closeDbPools } =
  await import("./lib/shutdown.mjs");

const hostname = "0.0.0.0";
const port = Number.parseInt(process.env.PORT, 10) || 3000;
const dev = process.env.NODE_ENV !== "production";
const FORCE_EXIT_MS = 25_000;

process.env.HOSTNAME = hostname;
process.env.PORT = String(port);

const app = next({ dev, hostname, port });
const handle = app.getRequestHandler();

let httpServer;
let shuttingDown = false;
let exited = false;

function exitNow(code) {
  if (exited) return;
  exited = true;
  process.exit(code);
}

function shutdown(signal) {
  if (shuttingDown) return;
  shuttingDown = true;
  markDraining();

  const drainMs = shutdownDrainMs();
  console.log(`[shutdown] ${signal} received, draining for ${drainMs}ms`);

  const forceTimer = setTimeout(() => {
    console.error("[shutdown] forcing exit after 25s");
    exitNow(0);
  }, FORCE_EXIT_MS);

  setTimeout(() => {
    const closeAndExit = () => {
      closeDbPools().finally(() => {
        clearTimeout(forceTimer);
        exitNow(0);
      });
    };

    if (!httpServer) {
      closeAndExit();
      return;
    }

    httpServer.keepAliveTimeout = 1000;
    httpServer.close((error) => {
      if (error) console.error("[shutdown] server close failed", error);
      let closing;
      try {
        closing = typeof app.close === "function" ? app.close() : undefined;
      } catch (closeError) {
        console.error("[shutdown] next close failed", closeError);
      }
      Promise.resolve(closing)
        .catch((closeError) => {
          console.error("[shutdown] next close failed", closeError);
        })
        .finally(closeAndExit);
    });

    if (typeof httpServer.closeIdleConnections === "function") {
      httpServer.closeIdleConnections();
    }
  }, drainMs);
}

function sendHealth(res) {
  const { statusCode, body } = healthPayload();
  const payload = JSON.stringify(body);
  res.writeHead(statusCode, {
    "Content-Type": "application/json; charset=utf-8",
    "Cache-Control": "no-store",
    "Content-Length": Buffer.byteLength(payload),
  });
  res.end(payload);
}

function isHealthRequest(req) {
  if (req.method !== "GET") return false;
  const pathname = (req.url || "/").split("?")[0];
  return pathname === "/api/health" || pathname === "/api/health/";
}

function installSignalHandlers() {
  for (const signal of ["SIGTERM", "SIGINT"]) {
    process.removeAllListeners(signal);
    process.on(signal, () => shutdown(signal));
  }
}

installSignalHandlers();

app
  .prepare()
  .then(() => {
    installSignalHandlers();

    httpServer = createServer((req, res) => {
      if (shuttingDown) res.setHeader("Connection", "close");
      if (isHealthRequest(req)) {
        sendHealth(res);
        return;
      }

      const parsedUrl = parse(req.url || "/", true);
      handle(req, res, parsedUrl).catch((error) => {
        console.error("Error occurred handling", req.url, error);
        if (!res.headersSent) {
          res.statusCode = 500;
          res.end("internal server error");
        } else {
          res.end();
        }
      });
    });

    httpServer.listen(port, hostname, () => {
      console.log(`> Ready on http://${hostname}:${port}`);
    });
  })
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
