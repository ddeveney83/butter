import test from "node:test";
import assert from "node:assert/strict";
import { mkdtemp, rm } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { FileStore } from "../store.mjs";
import { marketingHandler, pruneMarketing } from "../marketing.mjs";
const day = () => new Date().toISOString().slice(0, 10);
async function setup(t) {
  const directory = await mkdtemp(join(tmpdir(), "butter-marketing-test-"));
  t.after(() => rm(directory, { recursive: true, force: true }));
  const store = new FileStore(directory);
  return { store, handle: marketingHandler(store) };
}
function request(
  data = {
    event: "enquiry_success",
    path: "/contact",
    source: "/services/bespoke-elearning",
  },
  headers = {},
) {
  return new Request("https://butter.example/api/marketing/events", {
    method: "POST",
    headers: {
      Origin: "https://butter.example",
      "Content-Type": "application/json",
      ...headers,
    },
    body: JSON.stringify(data),
  });
}
test("marketing stores anonymous daily counters and no request metadata", async (t) => {
  const { store, handle } = await setup(t);
  for (let i = 0; i < 2; i++)
    assert.equal(
      (
        await handle(
          request(undefined, {
            "X-Forwarded-For": "192.0.2.8",
            Cookie: "private=value",
            "User-Agent": "Example",
          }),
        )
      ).status,
      204,
    );
  assert.deepEqual(await store.get(`daily/${day()}`, { type: "json" }), {
    day: day(),
    counts: { "enquiry_success|/contact|/services/bespoke-elearning": 2 },
  });
});
test("marketing rejects private paths, query strings, unknown fields and invalid events", async (t) => {
  const { store, handle } = await setup(t);
  for (const data of [
    { event: "page_view", path: "/butterlearn/app", source: "" },
    {
      event: "page_view",
      path: "/contact?email=person@example.com",
      source: "",
    },
    {
      event: "enquiry_success",
      path: "/contact",
      source: "",
      email: "person@example.com",
    },
    { event: "unknown", path: "/", source: "" },
    { event: "page_view", path: "/", source: "https://outside.example" },
  ])
    assert.equal((await handle(request(data))).status, 400);
  assert.equal(await store.get(`daily/${day()}`, { type: "json" }), null);
});
test("marketing enforces origin, method, payload size and content type", async (t) => {
  const { handle } = await setup(t);
  assert.equal(
    (await handle(request(undefined, { Origin: "https://outside.example" })))
      .status,
    403,
  );
  assert.equal(
    (await handle(new Request("https://butter.example/api/marketing/events")))
      .status,
    405,
  );
  assert.equal(
    (await handle(request(undefined, { "Content-Type": "text/plain" }))).status,
    415,
  );
  assert.equal(
    (await handle(request({ value: "x".repeat(1000) }))).status,
    413,
  );
  assert.equal(
    (
      await handle(
        new Request("https://butter.example/api/marketing/events", {
          method: "POST",
          headers: {
            Origin: "https://butter.example",
            "Content-Type": "application/json",
          },
          body: "not-json",
        }),
      )
    ).status,
    400,
  );
});
test("marketing respects Do Not Track and Global Privacy Control", async (t) => {
  const { store, handle } = await setup(t);
  for (const header of [{ DNT: "1" }, { "Sec-GPC": "1" }])
    assert.equal((await handle(request(undefined, header))).status, 204);
  assert.equal(await store.get(`daily/${day()}`, { type: "json" }), null);
});
test("marketing concurrent increments do not overwrite each other", async (t) => {
  const { store, handle } = await setup(t);
  const responses = await Promise.all(
    Array.from({ length: 4 }, () => handle(request())),
  );
  assert.ok(responses.every((response) => response.status === 204));
  assert.equal(
    (await store.get(`daily/${day()}`, { type: "json" })).counts[
      "enquiry_success|/contact|/services/bespoke-elearning"
    ],
    4,
  );
});
test("marketing maintenance removes expired counters while keeping current and unrelated data", async (t) => {
  const { store } = await setup(t);
  await store.setJSON("daily/2026-01-01", { day: "2026-01-01", counts: {} });
  await store.setJSON("daily/2026-10-23", { day: "2026-10-23", counts: {} });
  await store.setJSON("settings", { value: "keep" });
  await pruneMarketing(store, new Date("2026-10-23T12:00:00Z"));
  assert.equal(await store.get("daily/2026-01-01"), null);
  assert.ok(await store.get("daily/2026-10-23"));
  assert.ok(await store.get("settings"));
});
