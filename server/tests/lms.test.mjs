import test from "node:test";
import assert from "node:assert/strict";
import { mkdtemp, rm } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { zipSync, strToU8 } from "fflate";
import { inspectPackage } from "../packages.mjs";
import { FileStore, update } from "../store.mjs";
import {
  profile,
  OWNER_EMAIL,
  initialCmi,
  saveProgress,
  enrol,
  sessionSeconds,
} from "../domain.mjs";
import { createLocalServices } from "../local.mjs";
import { netlifyIdentity } from "../netlify-identity.mjs";

const manifest = (
  version = "1.2",
  items = '<item identifier="one" identifierref="r1"><title>First step</title></item>',
) =>
  `<?xml version="1.0"?><manifest xmlns="http://www.imsglobal.org/xsd/imscp_v1p1" xmlns:adlcp="http://www.adlnet.org/xsd/adlcp_rootv1p2"><metadata><schema>ADL SCORM</schema><schemaversion>${version}</schemaversion></metadata><organizations default="main"><organization identifier="main"><title>Useful learning</title>${items}</organization></organizations><resources><resource identifier="r1" adlcp:scormtype="sco" href="index.html"/><resource identifier="r2" adlcp:scormType="sco" href="second.html"/></resources></manifest>`;
const packageBytes = (xml = manifest()) =>
  zipSync({
    "imsmanifest.xml": strToU8(xml),
    "index.html": strToU8(
      "<!doctype html><head><title>A course</title></head><body>A useful step.</body>",
    ),
    "second.html": strToU8("<h1>Second step</h1>"),
    "images/example.svg": strToU8('<svg xmlns="http://www.w3.org/2000/svg"/>'),
  });

test("HTML packages and SCORM 1.2 / 2004 manifests discover launch files and multiple learning objects", () => {
  const html = inspectPackage(
    zipSync({
      "course/index.html": strToU8("<h1>Hello</h1>"),
      "course/style.css": strToU8("h1{color:black}"),
    }),
    "html.zip",
  );
  assert.equal(html.format, "html");
  assert.equal(html.lessons[0].path, "course/index.html");
  const single = inspectPackage(packageBytes(), "scorm.zip");
  assert.equal(single.format, "scorm12");
  assert.equal(single.lessons[0].title, "First step");
  const multiple = inspectPackage(
    packageBytes(
      manifest(
        "2004 4th Edition",
        '<item identifier="one" identifierref="r1"><title>First</title></item><item identifier="two" identifierref="r2"><title>Second</title></item>',
      ),
    ),
    "multi.zip",
  );
  assert.equal(multiple.format, "scorm2004");
  assert.equal(multiple.lessons.length, 2);
  assert.equal(multiple.lessons[1].path, "second.html");
  assert.equal(
    inspectPackage(strToU8("<h1>Standalone</h1>"), "lesson.html").format,
    "html",
  );
});
test("package import rejects traversal, external launch URLs, invalid manifests and decompression bombs", () => {
  assert.throws(
    () =>
      inspectPackage(zipSync({ "../index.html": strToU8("bad") }), "bad.zip"),
    /unsafe/,
  );
  assert.throws(
    () =>
      inspectPackage(
        packageBytes(
          manifest().replace(
            'href="index.html"',
            'href="https://elsewhere.test/course"',
          ),
        ),
        "bad.zip",
      ),
    /included/,
  );
  assert.throws(
    () =>
      inspectPackage(
        packageBytes(
          '<!DOCTYPE manifest [<!ENTITY x SYSTEM "file:///etc/passwd">]><manifest/>',
        ),
        "bad.zip",
      ),
    /manifest is invalid/,
  );
  assert.throws(
    () =>
      inspectPackage(
        zipSync({ "index.html": new Uint8Array(19 * 1024 * 1024) }),
        "bomb.zip",
      ),
    /too large/,
  );
  assert.throws(
    () =>
      inspectPackage(
        zipSync({ "readme.txt": strToU8("No course") }),
        "empty.zip",
      ),
    /no HTML/,
  );
});

test("optimistic writes preserve concurrent changes and cannot claim an existing key", async (t) => {
  const dir = await mkdtemp(join(tmpdir(), "butter-store-"));
  t.after(() => rm(dir, { recursive: true, force: true }));
  const store = new FileStore(dir);
  await store.setJSON("count", { value: 0 });
  await Promise.all(
    Array.from({ length: 5 }, () =>
      update(store, "count", (value) => ({ value: value.value + 1 })),
    ),
  );
  assert.equal((await store.get("count", { type: "json" })).value, 5);
  assert.equal(
    (await store.setJSON("count", { value: 0 }, { onlyIfNew: true })).modified,
    false,
  );
});
test("only a verified owner email becomes admin; user metadata cannot grant permissions", async (t) => {
  const dir = await mkdtemp(join(tmpdir(), "butter-roles-"));
  t.after(() => rm(dir, { recursive: true, force: true }));
  const store = new FileStore(dir);
  const unverified = await profile(store, {
    id: "unverified",
    email: OWNER_EMAIL,
    name: "Someone",
    userMetadata: { roles: ["admin"] },
  });
  assert.equal(unverified.role, "learner");
  const verified = await profile(store, {
    id: "verified",
    email: OWNER_EMAIL,
    confirmedAt: new Date().toISOString(),
  });
  assert.equal(verified.role, "admin");
  const attacker = await profile(store, {
    id: "other",
    email: "learner@example.test",
    confirmedAt: new Date().toISOString(),
    userMetadata: { role: "admin" },
  });
  assert.equal(attacker.role, "learner");
});

test("multi-part progress, score normalization, suspend data and session time survive reload without double counting", async (t) => {
  const dir = await mkdtemp(join(tmpdir(), "butter-progress-"));
  t.after(() => rm(dir, { recursive: true, force: true }));
  const store = new FileStore(dir);
  const user = { id: "learner", name: "Sam" };
  const course = {
    id: "course",
    format: "scorm12",
    lessons: [{ id: "lesson-1" }, { id: "lesson-2" }],
  };
  await enrol(store, user.id, course);
  const grant = {
    id: "launch-1",
    userId: user.id,
    courseId: course.id,
    lessonId: "lesson-1",
    expires: Date.now() + 60000,
  };
  const cmi = {
    "cmi.core.lesson_status": "passed",
    "cmi.core.score.raw": "8",
    "cmi.core.score.max": "10",
    "cmi.core.session_time": "0000:02:30",
    "cmi.suspend_data": '{"slide":4}',
    "cmi.core.lesson_location": "chapter-four",
  };
  const first = await saveProgress(store, user, course, grant, cmi);
  assert.equal(first.percent, 50);
  assert.equal(first.score, 80);
  assert.equal(first.seconds, 150);
  const duplicate = await saveProgress(store, user, course, grant, cmi);
  assert.equal(duplicate.seconds, 150);
  const resumed = initialCmi(course, user, duplicate, "lesson-1");
  assert.equal(resumed["cmi.suspend_data"], cmi["cmi.suspend_data"]);
  assert.equal(resumed["cmi.core.entry"], "resume");
  assert.equal(resumed["cmi.core.total_time"], "0000:02:30");
  const complete = await saveProgress(
    store,
    user,
    course,
    { ...grant, id: "launch-2", lessonId: "lesson-2" },
    {
      "cmi.core.lesson_status": "completed",
      "cmi.core.session_time": "0000:01:00",
    },
  );
  assert.equal(complete.status, "completed");
  assert.equal(complete.percent, 100);
  assert.equal(complete.seconds, 210);
  await assert.rejects(
    saveProgress(store, { id: "someone-else" }, course, grant, cmi),
    /expired/,
  );
  await assert.rejects(
    saveProgress(store, user, course, grant, cmi, true),
    /SCORM courses/,
  );
  assert.equal(sessionSeconds("PT1H2M3S"), 3723);
});

test("real local API enforces sessions and roles, imports a course, saves tracking and protects its assets", async (t) => {
  const dir = await mkdtemp(join(tmpdir(), "butter-api-"));
  t.after(() => rm(dir, { recursive: true, force: true }));
  const services = createLocalServices(dir);
  const origin = "http://localhost:5173";
  async function request(
    path,
    method = "GET",
    value,
    session = "",
    originHeader = origin,
  ) {
    const response = await services.handle(
      new Request(origin + "/api/lms/" + path, {
        method,
        headers: {
          Origin: originHeader,
          ...(session ? { Cookie: session } : {}),
          ...(value instanceof Uint8Array
            ? { "Content-Type": "application/octet-stream" }
            : { "Content-Type": "application/json" }),
        },
        body:
          method === "GET"
            ? undefined
            : value instanceof Uint8Array
              ? value
              : JSON.stringify(value || {}),
      }),
    );
    return { response, value: await response.json() };
  }
  assert.equal((await request("dashboard")).response.status, 401);
  const spaced = {email: 'spaced@example.test', name: 'Space', password: '  Butter-test-password-2026  '};
  assert.equal((await request('auth/signup', 'POST', spaced)).response.status, 200);
  assert.equal((await request('auth/login', 'POST', spaced)).response.status, 200);
  assert.equal(
    (
      await request(
        "auth/signup",
        "POST",
        {
          email: OWNER_EMAIL,
          name: "Owner",
          password: "Butter-test-password-2026",
        },
        "",
        "https://wrong.test",
      )
    ).response.status,
    403,
  );
  const owner = await request("auth/signup", "POST", {
    email: OWNER_EMAIL,
    name: "Owner",
    password: "Butter-test-password-2026",
  });
  const adminCookie = owner.response.headers.get("set-cookie").split(";")[0];
  assert.equal(owner.value.user.role, "admin");
  const learner = await request("auth/signup", "POST", {
    email: "sam@example.test",
    name: "Sam",
    password: "Butter-test-password-2026",
  });
  const cookie = learner.response.headers.get("set-cookie").split(";")[0];
  assert.equal(learner.value.user.role, "learner");
  assert.equal(
    (await request("admin/report", "GET", null, cookie)).response.status,
    403,
  );
  assert.equal(
    (
      await request(
        "uploads",
        "POST",
        { filename: "course.zip", size: 1, title: "A course" },
        cookie,
      )
    ).response.status,
    403,
  );
  const archive = packageBytes();
  const created = await request(
    "uploads",
    "POST",
    {
      filename: "course.zip",
      size: archive.length,
      title: "Useful learning",
      description: "A course",
      minutes: 5,
    },
    adminCookie,
  );
  assert.equal(created.response.status, 201);
  const uploadId = created.value.upload.id;
  assert.equal(
    (
      await request(
        "uploads/" + uploadId + "/chunks/0",
        "POST",
        archive,
        adminCookie,
      )
    ).response.status,
    200,
  );
  assert.equal(
    (
      await request(
        "uploads/" + uploadId + "/complete",
        "POST",
        {},
        adminCookie,
      )
    ).response.status,
    202,
  );
  let job;
  for (let i = 0; i < 100; i++) {
    job = (await request("uploads/" + uploadId, "GET", null, adminCookie)).value
      .upload;
    if (job.status === "ready") break;
    await new Promise((resolve) => setTimeout(resolve, 10));
  }
  assert.equal(job.status, "ready");
  const courseId = job.courseId;
  assert.equal(
    (await request("courses/" + courseId, "GET", null, cookie)).response.status,
    404,
  );
  assert.equal(
    (await request("courses/" + courseId, "PATCH", { published: true }, cookie))
      .response.status,
    404,
  );
  await request(
    "courses/" + courseId,
    "PATCH",
    { published: true },
    adminCookie,
  );
  assert.equal(
    (
      await request(
        "courses/" + courseId,
        "PATCH",
        { published: false },
        cookie,
      )
    ).response.status,
    403,
  );
  await request("courses/" + courseId + "/enrol", "POST", {}, cookie);
  const opened = await request(
    "courses/" + courseId + "/launch",
    "POST",
    { lessonId: "lesson-1" },
    cookie,
  );
  assert.equal(opened.response.status, 200);
  const launch = opened.value;
  const content = await services.handle(new Request(origin + launch.url));
  assert.equal(content.status, 200);
  assert.match(await content.text(), /installScormBridge/);
  assert.match(content.headers.get("content-security-policy"), /sandbox/);
  const traversal = await services.handle(
    new Request(
      origin + "/learn-content/" + launch.token + "/%2e%2e%2fother.html",
    ),
  );
  assert.equal(traversal.status, 400);
  const saved = await request(
    "launches/" + launch.token,
    "POST",
    {
      cmi: {
        "cmi.core.lesson_status": "passed",
        "cmi.core.score.raw": "100",
        "cmi.suspend_data": "resume-here",
      },
    },
    cookie,
  );
  assert.equal(saved.value.enrolment.status, "completed");
  assert.equal(
    (
      await request(
        "launches/" + launch.token,
        "POST",
        { cmi: {} },
        adminCookie,
      )
    ).response.status,
    403,
  );
  const resumed = await request(
    "courses/" + courseId + "/launch",
    "POST",
    { lessonId: "lesson-1" },
    cookie,
  );
  const html = await (
    await services.handle(new Request(origin + resumed.value.url))
  ).text();
  assert.match(html, /resume-here/);
  await request("auth/logout", "POST", {}, cookie);
  assert.equal(
    (await request("dashboard", "GET", null, cookie)).response.status,
    401,
  );
});

test("managed sign-in, confirmation and recovery use verified provider responses and HttpOnly cookies", async () => {
  const writes = [],
    calls = [];
  const verified = {
    id: "user-id",
    email: OWNER_EMAIL,
    confirmed_at: "2026-10-10T00:00:00Z",
    user_metadata: { full_name: "Owner" },
    app_metadata: { roles: [] },
  };
  const identity = netlifyIdentity(
    new Request("https://buttertest.netlify.app"),
    {
      cookies: {
        get: () => null,
        set: (value) => writes.push(value),
        delete: () => {},
      },
    },
    {
      endpoint: "https://identity.example.test",
      fetch: async (url, options) => {
        calls.push({ url, options });
        return Response.json(
          url.endsWith("/user")
            ? verified
            : {
                access_token: "signed-access-token",
                refresh_token: "refresh-token",
                expires_in: 3600,
              },
        );
      },
    },
  );
  assert.equal(
    (await identity.login(OWNER_EMAIL, "Long-password-for-test")).confirmedAt,
    verified.confirmed_at,
  );
  assert.equal(writes[0].httpOnly, true);
  assert.equal(writes[0].secure, true);
  await identity.confirmEmail("confirmation-token");
  assert.equal(
    JSON.parse(calls.find((call) => call.url.endsWith("/verify")).options.body)
      .type,
    "signup",
  );
  await identity.recoverPassword("recovery-token", "A-new-password-for-test");
  assert.ok(
    calls.some(
      (call) =>
        call.options.method === "PUT" &&
        JSON.parse(call.options.body).password === "A-new-password-for-test",
    ),
  );
});

test("an expired access cookie renews from the HttpOnly refresh cookie", async () => {
  const writes = [],
    calls = [];
  const identity = netlifyIdentity(
    new Request("https://buttertest.netlify.app"),
    {
      cookies: {
        get: (name) => (name === "nf_refresh" ? "valid-refresh-token" : null),
        set: (value) => writes.push(value),
        delete: () => {},
      },
    },
    {
      endpoint: "https://identity.example.test",
      fetch: async (url, options) => {
        calls.push({ url, options });
        return Response.json(
          url.endsWith("/user")
            ? {
                id: "learner",
                email: "sam@example.test",
                confirmed_at: "2026-10-10T00:00:00Z",
              }
            : {
                access_token: "new-access-token",
                refresh_token: "valid-refresh-token",
                expires_in: 3600,
              },
        );
      },
    },
  );
  assert.equal((await identity.getUser()).id, "learner");
  assert.equal(JSON.parse(calls[0].options.body).grant_type, "refresh_token");
  assert.equal(writes[0].name, "nf_jwt");
  assert.equal(writes[0].httpOnly, true);
});
