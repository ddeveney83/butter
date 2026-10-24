import { hash, problem } from "./domain.mjs";
import { safePath, contentType } from "./packages.mjs";
import { bridgeScript } from "./scorm-runtime.mjs";

export function createContentHandler({ store, files }) {
  return async (request) => {
    try {
      const segments = new URL(request.url).pathname
        .replace(/^\/learn-content\//, "")
        .split("/");
      const secret = segments.shift();
      if (!/^[\w-]{43}$/.test(secret || ""))
        throw problem(404, "Course session not found.");
      const grant = await store.get(`launches/${hash(secret)}`, {
        type: "json",
      });
      if (!grant || grant.expires < Date.now())
        throw problem(
          403,
          "Your course session has expired. Reopen it from butterlearn.",
        );
      const path = safePath(segments.map(decodeURIComponent).join("/"));
      const entry = await files.getWithMetadata(
        `${grant.assetPrefix}/${path}`,
        { type: "arrayBuffer" },
      );
      if (!entry) throw problem(404, "This course file is not available.");
      const type = entry.metadata?.type || contentType(path);
      const headers = {
        "Content-Type": type,
        "Cache-Control": "private, no-store",
        "Access-Control-Allow-Origin": "*",
        "X-Content-Type-Options": "nosniff",
        "Referrer-Policy": "no-referrer",
        "Cross-Origin-Resource-Policy": "cross-origin",
        "Content-Security-Policy":
          "sandbox allow-scripts allow-forms allow-popups allow-downloads; base-uri 'self'" +
          // Nested course documents inherit an opaque sandbox origin. Checking
          // frame ancestors there would block authoring-tool wrapper frames.
          (path === grant.launchPath ? "; frame-ancestors 'self'" : ""),
      };
      if (request.method === "OPTIONS")
        return new Response(null, {
          status: 204,
          headers: {
            ...headers,
            "Access-Control-Allow-Methods": "GET, HEAD, OPTIONS",
            "Access-Control-Allow-Headers": "Range",
          },
        });
      let data = new Uint8Array(entry.data);
      if (type.startsWith("text/html")) {
        let html = new TextDecoder().decode(data);
        const script = bridgeScript({
          token: secret,
          cmi: grant.cmi,
          format: grant.format,
          parentOrigin: grant.parentOrigin,
        });
        html = /<head(?:\s[^>]*)?>/i.test(html)
          ? html.replace(/<head(?:\s[^>]*)?>/i, (match) => match + script)
          : script + html;
        return new Response(html, { headers });
      }
      headers["Accept-Ranges"] = "bytes";
      const range = /^bytes=(\d*)-(\d*)$/.exec(
        request.headers.get("range") || "",
      );
      if (range) {
        let start = range[1]
          ? Number(range[1])
          : Math.max(0, data.length - Number(range[2]));
        let end = range[1]
          ? range[2]
            ? Number(range[2])
            : Math.min(data.length - 1, start + 4 * 1024 * 1024 - 1)
          : data.length - 1;
        end = Math.min(end, data.length - 1);
        if (
          !Number.isSafeInteger(start) ||
          start < 0 ||
          start > end ||
          start >= data.length
        )
          return new Response(null, {
            status: 416,
            headers: { ...headers, "Content-Range": `bytes */${data.length}` },
          });
        headers["Content-Range"] = `bytes ${start}-${end}/${data.length}`;
        headers["Content-Length"] = String(end - start + 1);
        return new Response(data.slice(start, end + 1), {
          status: 206,
          headers,
        });
      }
      headers["Content-Length"] = String(data.length);
      // A stream avoids the buffered function response limit for larger course assets.
      return new Response(new Blob([data]).stream(), { headers });
    } catch (error) {
      return new Response(
        error.status ? error.message : "This course file could not be loaded.",
        {
          status: error.status || 500,
          headers: {
            "Cache-Control": "no-store",
            "Content-Type": "text/plain",
            "X-Content-Type-Options": "nosniff",
          },
        },
      );
    }
  };
}
