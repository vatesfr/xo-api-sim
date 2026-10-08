import type express from "express";
import { v4 as uuid } from "uuid";

/**
 * Server-Sent Events endpoint consumed by the XO 6 web UI
 * (`@core/packages/remote-resource`).
 *
 * The web UI's collection subscriptions depend on this channel: before the
 * initial NDJSON fetch runs, `initializeWatcher` opens an EventSource on
 * `/rest/v0/events` and *waits* for an `init` event carrying the SSE id. Without
 * a working `init`, watched collections (vms, hosts, pools, srs, ...) never load
 * their initial data at all.
 *
 * Protocol:
 *
 * - `GET /events` — opens the SSE stream. Emits `event: init` with `{ id }`,
 *   then a periodic `event: ping` with `{ ping: <epoch ms> }` so the UI's
 *   liveness check stays green.
 * - `POST /events/:sseId/subscriptions` — body `{ collection, fields }`, returns
 *   `{ id }` (the subscription id).
 * - `DELETE /events/:sseId/subscriptions/:subscriptionId` — drops a subscription.
 *
 * The simulator serves static fixtures, so it never pushes `add`/`update`/
 * `remove` events; the initial data still arrives through the NDJSON list
 * endpoints. The stream only exists to unblock the subscription handshake and
 * report liveness.
 */

const PING_INTERVAL_MS = 10_000;

export function registerEventHandlers(app: express.Application) {
  app.get("/rest/v0/events", (req, res) => {
    res.status(200).set({
      "Content-Type": "text/event-stream",
      "Cache-Control": "no-cache, no-transform",
      Connection: "keep-alive",
      // Disable proxy buffering so events are delivered immediately.
      "X-Accel-Buffering": "no",
    });
    res.flushHeaders?.();

    const id = uuid();
    res.write(`event: init\ndata: ${JSON.stringify({ id })}\n\n`);

    const ping = setInterval(() => {
      if (res.writableEnded || res.destroyed) return;
      res.write(
        `event: ping\ndata: ${JSON.stringify({ ping: Date.now() })}\n\n`,
      );
    }, PING_INTERVAL_MS);

    let closed = false;
    const cleanup = () => {
      if (closed) return;
      closed = true;
      clearInterval(ping);
      if (!res.writableEnded) res.end();
    };
    req.on("close", cleanup);
    // Without a listener, a socket error on the stream would be thrown as an
    // uncaught exception and crash the server.
    res.on("error", (err) => {
      console.error("SSE stream error:", err);
      cleanup();
    });
  });

  // Register a subscription for a collection. Returns a subscription id that the
  // UI later uses to unsubscribe.
  app.post("/rest/v0/events/:sseId/subscriptions", (req, res) => {
    const { collection, fields } = (req.body ?? {}) as {
      collection?: string;
      fields?: string[];
    };
    res.status(201).json({ id: uuid(), collection, fields });
  });

  // Drop a subscription.
  app.delete(
    "/rest/v0/events/:sseId/subscriptions/:subscriptionId",
    (_req, res) => {
      res.status(200).json({ success: true });
    },
  );
}
