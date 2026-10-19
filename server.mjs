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
const CLOSE_ALL_AFTER_MS = 5_000;
// Stay above typical proxy idle timeouts so the proxy closes idle sockets first.
const KEEP_ALIVE_TIMEOUT_MS = 65_000;
const HEADERS_TIMEOUT_MS = 66_000;

process.env.HOSTNAME = hostname;
process.env.PORT = String(port);

const app = next({ dev, hostname, port });
const handle = app.getRequestHandler();

let httpServer;
let shuttingDown = false;
let exited = false;
let inFlight = 0;
let forceTimer;
let drainTimer;
let closeAllTimer;

const inFlightTracked = Symbol("inFlightTracked");
const connectionCloseArmed = Symbol("connectionCloseArmed");

function flushStream(stream) {
  return new Promise((resolve) => {
    if (!stream || stream.destroyed || stream.writableEnded || !stream.writable) {
      resolve();
      return;
    }
    let settled = false;
    const done = () => {
      if (settled) return;
      settled = true;
      resolve();
    };
    const timer = setTimeout(done, 200);
    timer.unref?.();
    try {
      stream.write("", () => {
        clearTimeout(timer);
        done();
      });
    } catch {
      clearTimeout(timer);
      done();
    }
  });
}

async function flushStdio() {
  await flushStream(process.stdout);
  await flushStream(process.stderr);
}

function clearShutdownTimers() {
  if (forceTimer) clearTimeout(forceTimer);
  if (drainTimer) clearTimeout(drainTimer);
  if (closeAllTimer) clearTimeout(closeAllTimer);
  forceTimer = undefined;
  drainTimer = undefined;
  closeAllTimer = undefined;
}

// Prefer exitCode so the final log lines are not dropped. Hard-exit only if
// something still has the event loop alive after stdio has flushed.
async function exitClean(code) {
  if (exited) return;
  exited = true;
  clearShutdownTimers();
  process.exitCode = code;
  console.log(`[shutdown] exiting ${code}`);
  await flushStdio();
  const safety = setTimeout(() => {
    process.exit(code);
  }, 500);
  safety.unref?.();
}

function withConnectionClose(headers) {
  if (Array.isArray(headers)) {
    const next = [];
    for (let i = 0; i < headers.length; i += 2) {
      if (String(headers[i]).toLowerCase() === "connection") continue;
      next.push(headers[i], headers[i + 1]);
    }
    next.push("Connection", "close");
    return next;
  }
  if (!headers || typeof headers !== "object") return headers;
  const next = { ...headers };
  for (const key of Object.keys(next)) {
    if (key.toLowerCase() === "connection") delete next[key];
  }
  next.Connection = "close";
  return next;
}

function armConnectionClose(res) {
  if (!res || res.headersSent) return;
  res.shouldKeepAlive = false;
  try {
    res.setHeader("Connection", "close");
  } catch {
    return;
  }
  if (res[connectionCloseArmed]) return;
  res[connectionCloseArmed] = true;

  const origWriteHead = res.writeHead;
  res.writeHead = function writeHead(statusCode, reason, headers) {
    this.shouldKeepAlive = false;
    if (typeof reason === "string") {
      headers = withConnectionClose(headers);
    } else {
      reason = withConnectionClose(reason);
    }
    try {
      this.setHeader("Connection", "close");
    } catch {
      // headers may already be flushing
    }
    return origWriteHead.call(this, statusCode, reason, headers);
  };

  const origEnd = res.end;
  res.end = function end(...args) {
    this.shouldKeepAlive = false;
    if (!this.headersSent) {
      try {
        this.setHeader("Connection", "close");
      } catch {
        // headers may already be flushing
      }
    }
    return origEnd.apply(this, args);
  };
}

function trackInFlight(res) {
  if (!res || res[inFlightTracked]) return;
  res[inFlightTracked] = true;
  inFlight += 1;
  let settled = false;
  const done = () => {
    if (settled) return;
    settled = true;
    inFlight -= 1;
  };
  res.once("finish", done);
  res.once("close", done);
}

// Wrap whatever request listener is installed so keep-alive clients (Traefik)
// are told to drop the socket on every response while draining.
function wrapRequestListeners(server) {
  const listeners = server.listeners("request").slice();
  server.removeAllListeners("request");
  server.on("request", function onRequest(req, res) {
    trackInFlight(res);
    if (shuttingDown) armConnectionClose(res);
    for (const listener of listeners) {
      listener.call(this, req, res);
    }
  });
}

function shutdown(signal) {
  if (shuttingDown) return;
  shuttingDown = true;
  markDraining();

  const drainMs = shutdownDrainMs();
  console.log(`[shutdown] ${signal} received, draining for ${drainMs}ms`);

  forceTimer = setTimeout(() => {
    console.error("[shutdown] forcing exit after 25s");
    if (httpServer && typeof httpServer.closeAllConnections === "function") {
      try {
        httpServer.closeAllConnections();
      } catch (error) {
        console.error("[shutdown] closeAllConnections failed", error);
      }
    }
    void exitClean(0);
  }, FORCE_EXIT_MS);

  drainTimer = setTimeout(() => {
    const afterServerClosed = () => {
      console.log(`[shutdown] closed, in-flight=${inFlight}`);
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
        .finally(() => {
          closeDbPools().finally(() => {
            void exitClean(0);
          });
        });
    };

    console.log("[shutdown] closing server");

    if (!httpServer) {
      afterServerClosed();
      return;
    }

    if (typeof httpServer.closeIdleConnections === "function") {
      httpServer.closeIdleConnections();
    }

    closeAllTimer = setTimeout(() => {
      if (inFlight <= 0) return;
      if (typeof httpServer.closeAllConnections !== "function") return;
      console.error(
        `[shutdown] in-flight=${inFlight} after 5s, closing all connections`,
      );
      try {
        httpServer.closeAllConnections();
      } catch (error) {
        console.error("[shutdown] closeAllConnections failed", error);
      }
    }, CLOSE_ALL_AFTER_MS);

    httpServer.close((error) => {
      if (closeAllTimer) clearTimeout(closeAllTimer);
      closeAllTimer = undefined;
      if (error) console.error("[shutdown] server close failed", error);
      afterServerClosed();
    });
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

    httpServer.keepAliveTimeout = KEEP_ALIVE_TIMEOUT_MS;
    httpServer.headersTimeout = HEADERS_TIMEOUT_MS;
    wrapRequestListeners(httpServer);

    httpServer.listen(port, hostname, () => {
      console.log(`> Ready on http://${hostname}:${port}`);
    });
  })
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
