import { publicPaths } from "../src/data/publicPaths.ts";
import { update, FileStore } from "./store.mjs";
const paths = new Set(publicPaths);
const events = new Set([
  "page_view",
  "enquiry_click",
  "form_start",
  "calculator_start",
  "calculator_enquiry",
  "enquiry_success",
  "enquiry_error",
]);
const headers = { "Cache-Control": "no-store", "X-Robots-Tag": "noindex" };
export function marketingHandler(store) {
  return async (request) => {
    if (request.method !== "POST")
      return new Response(null, {
        status: 405,
        headers: { ...headers, Allow: "POST" },
      });
    if (request.headers.get("origin") !== new URL(request.url).origin)
      return new Response(null, { status: 403, headers });
    if (
      request.headers.get("dnt") === "1" ||
      request.headers.get("sec-gpc") === "1"
    )
      return new Response(null, { status: 204, headers });
    if (!request.headers.get("content-type")?.startsWith("application/json"))
      return new Response(null, { status: 415, headers });
    try {
      const reader = request.body?.getReader();
      if (!reader) return new Response(null, { status: 400, headers });
      const chunks = [];
      let length = 0;
      while (true) {
        const part = await reader.read();
        if (part.done) break;
        length += part.value.length;
        if (length > 800) {
          await reader.cancel();
          return new Response(null, { status: 413, headers });
        }
        chunks.push(part.value);
      }
      const data = JSON.parse(Buffer.concat(chunks).toString());
      if (
        !data ||
        Array.isArray(data) ||
        Object.keys(data).some(
          (key) => !["event", "path", "source"].includes(key),
        ) ||
        !events.has(data.event) ||
        !paths.has(data.path) ||
        (data.source !== "" && !paths.has(data.source))
      )
        return new Response(null, { status: 400, headers });
      const day = new Date().toISOString().slice(0, 10);
      const key = `${data.event}|${data.path}|${data.source}`;
      await update(store, `daily/${day}`, (existing) => {
        const counts = existing?.counts || {};
        if (!Object.hasOwn(counts, key) && Object.keys(counts).length >= 1024)
          return existing;
        return {
          day,
          counts: {
            ...counts,
            [key]: Math.min((counts[key] || 0) + 1, 100000),
          },
        };
      });
      return new Response(null, { status: 204, headers });
    } catch (error) {
      return new Response(null, {
        status: error instanceof SyntaxError ? 400 : 503,
        headers,
      });
    }
  };
}
export async function pruneMarketing(store, now = new Date()) {
  const cutoff = new Date(now.getTime() - 90 * 86400000)
    .toISOString()
    .slice(0, 10);
  let cursor;
  do {
    const page = await store.list({ prefix: "daily/", cursor });
    await Promise.all(
      page.blobs
        .filter(
          ({ key }) =>
            /^daily\/\d{4}-\d{2}-\d{2}$/.test(key) && key.slice(6) < cutoff,
        )
        .map(({ key }) => store.delete(key)),
    );
    cursor = page.cursor;
  } while (cursor);
}
export function marketingDevelopment() {
  return {
    name: "butter-marketing-development",
    configureServer(server) {
      const handle = marketingHandler(
        new FileStore(
          process.env.BUTTER_MARKETING_LOCAL_DATA || "/tmp/butter-marketing",
        ),
      );
      server.middlewares.use(async (incoming, response, next) => {
        if (incoming.url?.split("?")[0] !== "/api/marketing/events")
          return next();
        const chunks = [];
        let length = 0;
        for await (const chunk of incoming) {
          length += chunk.length;
          if (length > 800) {
            response.writeHead(413);
            response.end();
            return;
          }
          chunks.push(chunk);
        }
        const request = new Request(
          `http://${incoming.headers.host}${incoming.url}`,
          {
            method: incoming.method,
            headers: incoming.headers,
            ...(incoming.method === "POST"
              ? { body: Buffer.concat(chunks) }
              : {}),
          },
        );
        const result = await handle(request);
        response.writeHead(result.status, Object.fromEntries(result.headers));
        response.end();
      });
    },
  };
}
