import { getStore } from "@netlify/blobs";
import {
  requireAdmin,
  verifyOrigin,
  body,
  hash,
  problem,
} from "../../server/domain.mjs";
import { importUpload } from "../../server/importer.mjs";
export default async (request) => {
  verifyOrigin(request);
  const store = getStore({
    name: "butterlearn-data-v1",
    consistency: "strong",
  });
  const input = await body(request);
  const job = await store.get(`uploads/${input.uploadId}`, { type: "json" });
  if (!job || !input.secret || job.importHash !== hash(input.secret))
    throw problem(403, "This import is not available.");
  const user = await store.get(`people/${job.userId}`, { type: "json" });
  if (!user) throw problem(403, "This account is not available.");
  requireAdmin(user);
  await importUpload(
    store,
    getStore({ name: "butterlearn-files-v1", consistency: "strong" }),
    user,
    input.uploadId,
  );
};
