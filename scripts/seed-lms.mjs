import { getStore } from "@netlify/blobs";
import { seedStarterCourses } from "../server/starters.mjs";
const siteID = process.env.NETLIFY_SITE_ID;
const token = process.env.NETLIFY_AUTH_TOKEN;
const owner = process.env.BUTTERLEARN_SEED_OWNER_ID;
if (!siteID || !token || !owner)
  throw Error(
    "Set NETLIFY_SITE_ID, NETLIFY_AUTH_TOKEN and BUTTERLEARN_SEED_OWNER_ID for the target workspace.",
  );
const options = { siteID, token, consistency: "strong" };
try {
  const added = await seedStarterCourses(
    getStore({ ...options, name: "butterlearn-data-v1" }),
    getStore({ ...options, name: "butterlearn-files-v1" }),
    owner,
  );
  console.log(
    `Added ${added} starter courses. Existing courses and progress were preserved.`,
  );
} catch (error) {
  console.error("The seed could not be completed:", error.name);
  process.exitCode = 1;
}
