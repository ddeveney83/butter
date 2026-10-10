import { unzipSync } from "fflate";
import { XMLParser, XMLValidator } from "fast-xml-parser";
import { posix } from "node:path";

export const MAX_PACKAGE = 50 * 1024 * 1024;
export const CHUNK_SIZE = 1024 * 1024;
const reject = (message) => {
  throw Object.assign(new Error(message), { status: 400 });
};
const array = (value) =>
  value === undefined ? [] : Array.isArray(value) ? value : [value];
export function safePath(path) {
  const name = path.replaceAll("\\", "/");
  if (
    !name ||
    name.length > 500 ||
    /[\x00-\x1f]/.test(name) ||
    name.startsWith("/") ||
    /^[a-z]:/i.test(name) ||
    name.split("/").includes("..")
  )
    reject("The package contains an unsafe file path.");
  return name.replace(/^\.\//, "");
}

export function inspectPackage(bytes, filename) {
  if (bytes.length > MAX_PACKAGE)
    reject("Choose a package smaller than 50 MB.");
  let files = {};
  if (/\.html?$/i.test(filename)) {
    if (bytes.length > 18 * 1024 * 1024)
      reject("Individual course files must be smaller than 18 MB.");
    files[safePath(filename)] = bytes;
  } else if (/\.zip$/i.test(filename)) {
    let expanded = 0,
      count = 0;
    const seen = new Set();
    try {
      files = unzipSync(bytes, {
        filter(file) {
          const path = safePath(file.name);
          if (
            file.name.endsWith("/") ||
            /(^|\/)(__MACOSX|\.DS_Store)(\/|$)/.test(path)
          )
            return false;
          if (seen.has(path))
            reject("The package contains duplicate file paths.");
          seen.add(path);
          expanded += file.originalSize;
          count++;
          if (
            count > 1500 ||
            expanded > 150 * 1024 * 1024 ||
            file.originalSize > 18 * 1024 * 1024
          )
            reject(
              "The package is too large when expanded. Limit it to 1,500 files, 150 MB total and 18 MB per file.",
            );
          return true;
        },
      });
    } catch (error) {
      if (error.status) throw error;
      reject(
        "That ZIP could not be opened. Export a standard, unencrypted course package.",
      );
    }
    files = Object.fromEntries(
      Object.entries(files).map(([name, value]) => [safePath(name), value]),
    );
  } else reject("Upload an HTML file or an HTML/SCORM ZIP package.");

  const names = Object.keys(files);
  const manifestPath = names.find(
    (name) => posix.basename(name).toLowerCase() === "imsmanifest.xml",
  );
  if (!manifestPath) {
    const launch =
      names.find((name) => /(^|\/)(index|story|launch)\.html?$/i.test(name)) ||
      names.find((name) => /\.html?$/i.test(name));
    if (!launch) reject("There is no HTML launch file in this package.");
    return {
      files,
      format: "html",
      lessons: [{ id: "lesson-1", title: "Your course", path: launch }],
    };
  }
  const xml = new TextDecoder().decode(files[manifestPath]);
  if (
    xml.length > 1024 * 1024 ||
    /<!DOCTYPE|<!ENTITY/i.test(xml) ||
    XMLValidator.validate(xml) !== true
  )
    reject("The SCORM manifest is invalid. Re-export the course package.");
  const parsed = new XMLParser({
    ignoreAttributes: false,
    removeNSPrefix: true,
    parseTagValue: false,
  }).parse(xml).manifest;
  if (!parsed?.resources) reject("The SCORM manifest has no resources.");
  const format = /2004|1\.3/.test(String(parsed.metadata?.schemaversion || ""))
    ? "scorm2004"
    : "scorm12";
  const folder = posix.dirname(manifestPath);
  const resources = new Map(
    array(parsed.resources.resource).map((resource) => [
      resource["@_identifier"],
      resource,
    ]),
  );
  const organisations = array(parsed.organizations?.organization);
  const selected =
    organisations.find(
      (org) => org["@_identifier"] === parsed.organizations?.["@_default"],
    ) || organisations[0];
  const lessons = [];
  function walk(items) {
    for (const item of array(items)) {
      const resource = resources.get(item["@_identifierref"]);
      if (resource?.["@_href"]) {
        const href = String(resource["@_href"]);
        if (/^[a-z]+:|^\/\//i.test(href))
          reject("SCORM launch resources must be included in the package.");
        const [pathname] = href.split(/[?#]/);
        let decoded;
        try {
          decoded = decodeURIComponent(pathname);
        } catch {
          reject("The manifest contains an invalid launch path.");
        }
        const path = safePath(
          posix.join(folder === "." ? "" : folder, safePath(decoded)),
        );
        if (!files[path])
          reject(`The manifest launch file is missing: ${path}`);
        lessons.push({
          id: `lesson-${lessons.length + 1}`,
          title: String(
            item.title || resource["@_identifier"] || "Your course",
          ).slice(0, 180),
          path,
          query: href.slice(pathname.length),
        });
      }
      walk(item.item);
    }
  }
  walk(selected?.item);
  if (!lessons.length)
    reject("No launchable learning objects were found in the SCORM manifest.");
  if (lessons.length > 100)
    reject("This release supports up to 100 learning objects per course.");
  return {
    files,
    format,
    lessons,
    suggestedTitle: String(selected?.title || "").slice(0, 180),
  };
}

export function contentType(path) {
  const extension = posix.extname(path).toLowerCase();
  return (
    {
      ".html": "text/html; charset=utf-8",
      ".htm": "text/html; charset=utf-8",
      ".js": "text/javascript; charset=utf-8",
      ".mjs": "text/javascript; charset=utf-8",
      ".css": "text/css; charset=utf-8",
      ".json": "application/json",
      ".xml": "application/xml",
      ".svg": "image/svg+xml",
      ".png": "image/png",
      ".jpg": "image/jpeg",
      ".jpeg": "image/jpeg",
      ".gif": "image/gif",
      ".webp": "image/webp",
      ".avif": "image/avif",
      ".mp4": "video/mp4",
      ".webm": "video/webm",
      ".mp3": "audio/mpeg",
      ".ogg": "audio/ogg",
      ".wav": "audio/wav",
      ".pdf": "application/pdf",
      ".woff": "font/woff",
      ".woff2": "font/woff2",
      ".ttf": "font/ttf",
      ".wasm": "application/wasm",
      ".vtt": "text/vtt",
    }[extension] || "application/octet-stream"
  );
}
