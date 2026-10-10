import { getStore } from "@netlify/blobs";
import { netlifyIdentity } from "../../server/netlify-identity.mjs";
import { createHandler } from "../../server/app.mjs";
import { token, hash, problem } from "../../server/domain.mjs";
import { update } from "../../server/store.mjs";

export default async function (request, context) {
  const store = getStore({
    name: "butterlearn-data-v1",
    consistency: "strong",
  });
  return createHandler({
    store,
    files: getStore({ name: "butterlearn-files-v1", consistency: "strong" }),
    identity: netlifyIdentity(request, context),
    startImport: async (incoming, user, job) => {
      const secret = token();
      await update(store, `uploads/${job.id}`, (current) => {
        if (current.status !== "uploading")
          throw problem(409, "This upload has already been submitted.");
        return { ...current, status: "queued", importHash: hash(secret) };
      });
      const response = await fetch(
        new URL("/.netlify/functions/lms-import-background", incoming.url),
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Origin: new URL(incoming.url).origin,
          },
          body: JSON.stringify({ uploadId: job.id, secret }),
        },
      );
      if (!response.ok)
        throw Object.assign(
          new Error("The import could not be started. Please try again."),
          { status: 503 },
        );
    },
  })(request);
}
export const config = { path: "/api/lms/*" };
