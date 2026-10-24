import { getStore } from "@netlify/blobs";
import { FileStore } from "../server/store.mjs";
const local = process.argv.includes("--local");
const days = Number(
  process.argv.find((arg) => arg.startsWith("--days="))?.split("=")[1] || 30,
);
if (!Number.isInteger(days) || days < 1 || days > 90)
  throw new Error("Use --days=1 through --days=90.");
if (!local && (!process.env.NETLIFY_AUTH_TOKEN || !process.env.NETLIFY_SITE_ID))
  throw new Error(
    "Set NETLIFY_AUTH_TOKEN and NETLIFY_SITE_ID securely, or use --local for development counts.",
  );
const store = local
  ? new FileStore(
      process.env.BUTTER_MARKETING_LOCAL_DATA || "/tmp/butter-marketing",
    )
  : getStore({
      name: "butter-marketing-v1",
      siteID: process.env.NETLIFY_SITE_ID,
      token: process.env.NETLIFY_AUTH_TOKEN,
      consistency: "strong",
    });
const totals = new Map();
for (let i = 0; i < days; i++) {
  const day = new Date(Date.now() - i * 86400000).toISOString().slice(0, 10);
  const row = await store.get(`daily/${day}`, { type: "json" });
  for (const [key, count] of Object.entries(row?.counts || {}))
    totals.set(key, (totals.get(key) || 0) + count);
}
console.log("event,page,source_page,count");
for (const [key, count] of [...totals].sort(([a], [b]) => a.localeCompare(b)))
  console.log(`${key.replaceAll("|", ",")},${count}`);
