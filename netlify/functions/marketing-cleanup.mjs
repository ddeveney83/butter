import { getStore } from "@netlify/blobs";
import { pruneMarketing } from "../../server/marketing.mjs";
export default async function () {
  await pruneMarketing(
    getStore({ name: "butter-marketing-v1", consistency: "strong" }),
  );
  return new Response(null, { status: 204 });
}
export const config = { schedule: "0 3 * * *" };
