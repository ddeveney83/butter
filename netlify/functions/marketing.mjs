import { getStore } from "@netlify/blobs";
import { marketingHandler } from "../../server/marketing.mjs";
export default async function (request) {
  return marketingHandler(
    getStore({ name: "butter-marketing-v1", consistency: "strong" }),
  )(request);
}
export const config = { path: "/api/marketing/events" };
