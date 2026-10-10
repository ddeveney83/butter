import { getStore } from "@netlify/blobs";
import { createContentHandler } from "../../server/content.mjs";
export default (request) =>
  createContentHandler({
    store: getStore({ name: "butterlearn-data-v1", consistency: "strong" }),
    files: getStore({ name: "butterlearn-files-v1", consistency: "strong" }),
  })(request);
export const config = { path: "/learn-content/*" };
