import test from "node:test";
import assert from "node:assert/strict";
import { mkdtemp, rm } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { validateDocument, compileDocument } from "../authoring.mjs";
import { createLocalServices } from "../local.mjs";
import { OWNER_EMAIL, courseKey } from "../domain.mjs";
import { seedStarterCourses, starterCourses } from "../starters.mjs";

const document = (title = "A useful idea") => ({
  title,
  description: "A course with real content.",
  minutes: 5,
  icon: "idea",
  format: "html",
  blocks: [
    {
      id: "text-one",
      type: "text",
      html: "<h2>Start here.</h2><p>A small step.</p>",
    },
  ],
});
test("authored content sanitizes rich text and validates every interaction and media URL", () => {
  const input = document();
  input.blocks[0].html =
    '<h2 onclick="steal()">Hello</h2><script>steal()</script><a href="javascript:steal()">bad link</a><img src="https://example.com/image.jpg" onerror="steal()"><iframe src="https://example.com"></iframe>';
  const safe = validateDocument(input);
  const html = compileDocument(safe);
  assert.match(safe.blocks[0].html, /<h2>Hello<\/h2>/);
  assert.doesNotMatch(
    safe.blocks[0].html,
    /onclick|onerror|javascript:|<script|<iframe/,
  );
  assert.doesNotMatch(html, /steal\(/);
  assert.throws(
    () =>
      validateDocument({
        ...input,
        blocks: [{ id: "video", type: "video", url: "javascript:alert(1)" }],
      }),
    /HTTPS/,
  );
  assert.throws(
    () =>
      validateDocument({
        ...input,
        blocks: [{ id: "image", type: "image", url: "//evil.test/x" }],
      }),
    /HTTPS/,
  );
  assert.throws(
    () =>
      validateDocument({
        ...input,
        blocks: [
          {
            id: "quiz",
            type: "quiz",
            question: "Choose",
            options: ["One", "Two"],
            answer: 4,
          },
        ],
      }),
    /correct/,
  );
  assert.throws(
    () =>
      validateDocument({
        ...input,
        blocks: [{ id: "unknown", type: "script" }],
      }),
    /supported/,
  );
  assert.throws(
    () =>
      validateDocument({
        ...input,
        blocks: [input.blocks[0], input.blocks[0]],
      }),
    /unique/,
  );
  const sample = starterCourses().find(
    (sample) => sample.course.id === "butter-safety",
  );
  assert.ok(sample.html.includes('role="status"'));
  assert.ok(sample.html.includes("window.API_1484_11"));
});

function browser(services) {
  const cookies = new Map();
  return async (path, method = "GET", input) => {
    const response = await services.handle(
      new Request("http://localhost:5173/api/lms/" + path, {
        method,
        headers: {
          Origin: "http://localhost:5173",
          Cookie: [...cookies]
            .map(([key, value]) => `${key}=${value}`)
            .join("; "),
          "Content-Type": "application/json",
        },
        body: input === undefined ? undefined : JSON.stringify(input),
      }),
    );
    for (const cookie of response.headers.getSetCookie()) {
      const [key, value] = cookie.split(";")[0].split("=");
      if (cookie.includes("Max-Age=0")) cookies.delete(key);
      else cookies.set(key, value);
    }
    return { status: response.status, value: await response.json() };
  };
}
test("creators own their drafts, cannot publish or manage people, and published content stays stable until reviewed", async (t) => {
  const dir = await mkdtemp(join(tmpdir(), "butter-authoring-"));
  t.after(() => rm(dir, { recursive: true, force: true }));
  const services = createLocalServices(dir),
    admin = browser(services),
    creator = browser(services),
    other = browser(services),
    learner = browser(services);
  const password = "An-authoring-test-password";
  await admin("auth/signup", "POST", {
    email: OWNER_EMAIL,
    name: "Owner",
    password,
  });
  const a = await creator("auth/signup", "POST", {
    email: "creator@butter.test",
    name: "Creator",
    password,
  });
  const b = await other("auth/signup", "POST", {
    email: "other@butter.test",
    name: "Other",
    password,
  });
  await learner("auth/signup", "POST", {
    email: "learner@butter.test",
    name: "Learner",
    password,
  });
  for (const user of [a, b])
    assert.equal(
      (
        await admin("admin/people/" + user.value.user.id, "PATCH", {
          role: "creator",
        })
      ).status,
      200,
    );
  assert.equal((await creator("session")).value.user.role, "creator");
  assert.equal((await creator("admin/report")).status, 403);
  assert.equal(
    (
      await creator("admin/people/" + b.value.user.id, "PATCH", {
        role: "admin",
      })
    ).status,
    403,
  );
  assert.equal((await learner("authoring", "POST", document())).status, 403);
  const made = await creator("authoring", "POST", {
    ...document(),
    blocks: [],
  });
  assert.equal(made.status, 201);
  const id = made.value.course.id;
  assert.equal(
    (await creator("courses/" + id, "PATCH", { published: true })).status,
    403,
  );
  assert.equal(
    (await admin("courses/" + id, "PATCH", { published: true })).status,
    400,
  );
  assert.equal((await learner("courses/" + id)).status, 404);
  assert.equal((await other("authoring/" + id)).status, 404);
  assert.equal(
    (
      await creator("authoring/" + id + "/preview", "POST", {
        document: document(),
      })
    ).status,
    200,
  );
  const saved = await creator("authoring/" + id, "PUT", {
    revision: 1,
    document: document(),
  });
  assert.equal(saved.status, 200);
  assert.equal(saved.value.draft.revision, 2);
  assert.equal(
    (
      await creator("authoring/" + id, "PUT", {
        revision: 1,
        document: document("Stale changes"),
      })
    ).status,
    409,
  );
  assert.equal(
    (await admin("courses/" + id, "PATCH", { published: true })).status,
    200,
  );
  assert.equal((await learner("courses/" + id)).status, 200);
  assert.equal((await other("authoring/" + id)).status, 403);
  const live = await services.store.get(courseKey(id), { type: "json" });
  await learner("courses/" + id + "/enrol", "POST", {});
  const launch = await learner("courses/" + id + "/launch", "POST", {
    lessonId: "lesson-1",
  });
  const edited = await creator("authoring/" + id, "PUT", {
    revision: 2,
    document: document("A fresh perspective"),
  });
  assert.equal(edited.status, 200);
  const still = await services.store.get(courseKey(id), { type: "json" });
  assert.equal(still.title, live.title);
  assert.equal(still.assetPrefix, live.assetPrefix);
  assert.notEqual(still.draftRevision, still.publishedRevision);
  assert.equal(
    (await learner("courses/" + id)).value.course.title,
    "A useful idea",
  );
  assert.equal(
    (await admin("courses/" + id, "PATCH", { published: true })).status,
    200,
  );
  const published = await services.store.get(courseKey(id), { type: "json" });
  assert.equal(published.title, "A fresh perspective");
  assert.notEqual(published.assetPrefix, live.assetPrefix);
  const oldFile = await services.handle(
    new Request("http://localhost:5173" + launch.value.url),
  );
  assert.equal(oldFile.status, 200);
  assert.match(await oldFile.text(), /<title>A useful idea<\/title>/);
  const switched = await admin("session/view", "POST", { role: "creator" });
  assert.equal(switched.status, 200);
  assert.equal((await admin("admin/report")).status, 403);
  assert.equal((await admin("authoring/" + id)).status, 403);
});

test("starter courses seed six playable HTML and SCORM examples without overwriting courses", async (t) => {
  const dir = await mkdtemp(join(tmpdir(), "butter-starters-"));
  t.after(() => rm(dir, { recursive: true, force: true }));
  const services = createLocalServices(dir);
  assert.equal(
    await seedStarterCourses(services.store, services.files, "owner"),
    6,
  );
  assert.equal(
    await seedStarterCourses(services.store, services.files, "owner"),
    0,
  );
  const rows = starterCourses();
  assert.equal(
    rows.filter((sample) => sample.course.format === "html").length,
    3,
  );
  assert.equal(
    rows.filter((sample) => sample.course.format !== "html").length,
    3,
  );
  for (const sample of rows) {
    const course = await services.store.get(courseKey(sample.course.id), {
      type: "json",
    });
    assert.equal(course.published, true);
    assert.ok(await services.files.get(course.assetPrefix + "/index.html"));
    if (course.authored)
      assert.ok(
        await services.store.get("authoring/" + course.id, { type: "json" }),
      );
  }
});
