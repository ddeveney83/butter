import {
  test,
  expect,
  type APIRequestContext,
  type Page,
} from "@playwright/test";
import { randomUUID } from "node:crypto";
import { zipSync, strToU8 } from "fflate";

// Only the Vite development adapter is used. These accounts never send email.
const password = "Butter-test-only-2026";
const owner = "ddeveney83@gmail.com";
const origin = "http://127.0.0.1:5173";
async function admin(request: APIRequestContext) {
  let response = await request.post("/api/lms/auth/login", {
    headers: { Origin: origin },
    data: { email: owner, password },
  });
  if (!response.ok()) {
    await request.post("/api/lms/auth/signup", {
      headers: { Origin: origin },
      data: { email: owner, password, name: "Daniel" },
    });
    response = await request.post("/api/lms/auth/login", {
      headers: { Origin: origin },
      data: { email: owner, password },
    });
  }
  expect(response.ok()).toBeTruthy();
}
async function login(page: Page, email = owner) {
  await page.goto("/butterlearn/login");
  await page.getByLabel("Email address").fill(email);
  await page.getByLabel("Password", { exact: true }).fill(password);
  await page.getByRole("button", { name: "Sign in", exact: true }).click();
  await expect(page.getByRole("heading", { name: /^Hello,/ })).toBeVisible();
}
async function fits(page: Page) {
  expect(
    await page.evaluate(
      () => document.documentElement.scrollWidth <= innerWidth,
    ),
  ).toBe(true);
}

for (const format of ["scorm12", "scorm2004", "html"] as const) {
  test(`${format}: upload, publish, play and retain progress after signing back in`, async ({
    page,
    request,
  }) => {
    test.setTimeout(60000);
    await admin(request);
    await login(page);
    await page
      .getByRole("link", { name: "Manage courses", exact: true })
      .click();
    const title = `${format} ${randomUUID().slice(0, 8)}`;
    const is2004 = format === "scorm2004";
    const api = is2004 ? "API_1484_11" : "API";
    const init = is2004 ? "Initialize" : "LMSInitialize";
    const get = is2004 ? "GetValue" : "LMSGetValue";
    const set = is2004 ? "SetValue" : "LMSSetValue";
    const commit = is2004 ? "Commit" : "LMSCommit";
    const location = is2004 ? "cmi.location" : "cmi.core.lesson_location";
    const status = is2004 ? "cmi.completion_status" : "cmi.core.lesson_status";
    const score = is2004 ? "cmi.score.raw" : "cmi.core.score.raw";
    const time = is2004 ? "cmi.session_time" : "cmi.core.session_time";
    const html = `<!doctype html><html><head><link rel="stylesheet" href="style.css"></head><body>
      <h1>A useful little course.</h1><p id="isolation"></p><p id="resume"></p><p id="asset"></p>
      <button id="checkpoint">Save checkpoint</button><button id="complete">Finish course</button>
      <script>
      try { parent.document.title; isolation.textContent='Account exposed'; }
      catch { isolation.textContent='Course is isolated'; }
      fetch('data.json').then(r=>r.json()).then(d=>asset.textContent=d.message);
      const api=window.${api}; api.${init}('');
      resume.textContent='Resume: '+api.${get}('${location}')+' / '+api.${get}('cmi.suspend_data');
      checkpoint.onclick=()=>{api.${set}('${location}','screen-2');api.${set}('cmi.suspend_data','checkpoint-saved');api.${set}('${status}','incomplete');api.${commit}('');};
      complete.onclick=()=>{api.${set}('${status}','completed');api.${set}('${score}','85');api.${set}('${time}','${is2004 ? "PT1M30S" : "00:01:30"}');api.${commit}('');};
      </script></body></html>`;
    const manifest = `<manifest xmlns:adlcp="http://www.adlnet.org/xsd/adlcp_rootv1p2"><metadata><schemaversion>${is2004 ? "2004 4th Edition" : "1.2"}</schemaversion></metadata><organizations default="org"><organization identifier="org"><title>Course</title><item identifier="item" identifierref="sco"><title>A useful little course</title></item></organization></organizations><resources><resource identifier="sco" adlcp:scormtype="sco" href="index.html"/></resources></manifest>`;
    const buffer = Buffer.from(
      zipSync({
        "index.html": strToU8(
          is2004
            ? '<!doctype html><html><head></head><body><iframe title="Learning object" src="lesson.html" style="width:100%;height:500px;border:0"></iframe></body></html>'
            : html,
        ),
        ...(is2004 ? { "lesson.html": strToU8(html) } : {}),
        "style.css": strToU8(
          "body{font:18px sans-serif;padding:20px;background:#ffe999}button{padding:12px;margin:8px}",
        ),
        "data.json": strToU8(
          JSON.stringify({ message: "Linked assets loaded" }),
        ),
        ...(format === "html" ? {} : { "imsmanifest.xml": strToU8(manifest) }),
      }),
    );
    await page.getByLabel("Course title", { exact: true }).fill(title);
    await page
      .getByLabel("A little about the course")
      .fill("A browser-tested course with linked assets.");
    await page.getByLabel("Course package").setInputFiles({
      name: title + ".zip",
      mimeType: "application/zip",
      buffer,
    });
    await page
      .getByRole("button", { name: "Upload course", exact: true })
      .click();
    const row = page.getByRole("row").filter({
      has: page.getByRole("rowheader", { name: new RegExp(title) }),
    });
    await expect(row).toContainText("Draft", { timeout: 15000 });
    await row.getByRole("button", { name: "Publish", exact: true }).click();
    await expect(row).toContainText("Published");
    await fits(page);
    await page.getByRole("button", { name: "Sign out", exact: true }).click();
    const email = `${randomUUID()}@butter.test`;
    await page
      .getByRole("button", { name: "Create an account", exact: true })
      .click();
    await page.getByLabel("Your name").fill("Sam Learner");
    await page.getByLabel("Email address").fill(email);
    await page.getByLabel("Password", { exact: true }).fill(password);
    await page
      .getByRole("button", { name: "Create account", exact: true })
      .click();
    await expect(
      page.getByRole("heading", { name: "Hello, Sam." }),
    ).toBeVisible();
    await expect(
      page.getByRole("link", { name: "Manage courses", exact: true }),
    ).toHaveCount(0);
    await page
      .getByRole("link", { name: "Course library", exact: true })
      .click();
    const card = page
      .locator(".lms-course-card")
      .filter({ has: page.getByRole("heading", { name: title, exact: true }) });
    await card.getByRole("link", { name: "Join course", exact: true }).click();
    await page
      .getByRole("button", { name: "Start learning", exact: false })
      .click();
    const outer = page.frameLocator(".lms-player-stage > iframe");
    const course = is2004 ? outer.frameLocator("iframe") : outer;
    await expect(
      course.getByText("Course is isolated", { exact: true }),
    ).toBeVisible();
    await expect(
      course.getByText("Linked assets loaded", { exact: true }),
    ).toBeVisible();
    if (format !== "html") {
      await course.getByRole("button", { name: "Save checkpoint" }).click();
      await expect(
        page.getByText("Progress saved.", { exact: true }),
      ).toBeVisible();
      await page
        .getByRole("link", { name: "Back to my learning", exact: false })
        .click();
      await page
        .getByRole("link", { name: "Continue learning", exact: false })
        .click();
      await page
        .getByRole("button", { name: "Continue learning", exact: false })
        .click();
      await expect(
        course.getByText("Resume: screen-2 / checkpoint-saved", {
          exact: true,
        }),
      ).toBeVisible();
      await course.getByRole("button", { name: "Finish course" }).click();
      await expect(
        page.getByText("Progress saved.", { exact: true }),
      ).toBeVisible();
    } else {
      await page
        .getByRole("button", { name: "Mark complete", exact: true })
        .click();
      await expect(
        page.getByRole("button", { name: "Completed ✓", exact: true }),
      ).toBeDisabled();
    }
    await fits(page);
    await page.getByRole("button", { name: "Sign out", exact: true }).click();
    await login(page, email);
    await expect(
      page.locator(".lms-course-card").filter({ hasText: title }),
    ).toContainText("100%");
    await expect(
      page.locator(".lms-course-card").filter({ hasText: title }),
    ).toContainText("Completed");
    await page.reload();
    await expect(
      page.locator(".lms-course-card").filter({ hasText: title }),
    ).toContainText("100%");
    const report = await request.get("/api/lms/admin/report");
    const data = await report.json();
    const learner = data.people.find(
      (person: { email: string }) => person.email === email,
    );
    const record = data.enrolments.find(
      (record: { userId: string }) => record.userId === learner.id,
    );
    expect(record.status).toBe("completed");
    if (format !== "html") {
      expect(record.score).toBe(85);
      expect(record.seconds).toBe(90);
    }
    const denied = await page.request.post("/api/lms/uploads", {
      headers: { Origin: origin },
      data: {},
    });
    expect(denied.status()).toBe(403);
  });
}

test("protected routes, assignment due dates and manager permissions", async ({
  page,
  request,
}) => {
  await page.goto("/butterlearn/app/manage");
  await expect(page).toHaveURL(/\/butterlearn\/login\?next=/);
  await admin(request);
  await request.post("/api/lms/admin/starters", {
    headers: { Origin: origin },
    data: {},
  });
  await login(page);
  await page.getByRole("button", { name: "Sign out", exact: true }).click();
  const email = `${randomUUID()}@butter.test`,
    name = "Alex " + randomUUID().slice(0, 8);
  await page
    .getByRole("button", { name: "Create an account", exact: true })
    .click();
  await page.getByLabel("Your name").fill(name);
  await page.getByLabel("Email address").fill(email);
  await page.getByLabel("Password", { exact: true }).fill(password);
  await page
    .getByRole("button", { name: "Create account", exact: true })
    .click();
  await expect(
    page.getByRole("heading", { name: /^Hello, Alex/ }),
  ).toBeVisible();
  await page.getByRole("button", { name: "Sign out", exact: true }).click();
  await login(page);
  await page.getByRole("link", { name: "People", exact: true }).click();
  await page
    .getByRole("checkbox", { name: "Select " + name, exact: true })
    .check();
  await page.getByLabel("Course to assign").selectOption("butter-welcome");
  await page.getByLabel("Due date (optional)").fill("2026-12-20");
  await page
    .getByRole("button", { name: "Assign to 1 person", exact: true })
    .click();
  await expect(
    page.getByText("Course assigned to 1 person.", { exact: true }),
  ).toBeVisible();
  const row = page
    .getByRole("row")
    .filter({ has: page.getByRole("rowheader", { name: new RegExp(name) }) });
  await row.getByLabel("Group for " + name, { exact: true }).fill("Studio");
  await row
    .getByLabel("Role for " + name, { exact: true })
    .selectOption("manager");
  await row.getByRole("button", { name: "Save", exact: true }).click();
  await expect(
    page.getByText("Account permissions updated.", { exact: true }),
  ).toBeVisible();
  await fits(page);
  await page.getByRole("button", { name: "Sign out", exact: true }).click();
  await login(page, email);
  await expect(
    page
      .locator(".lms-course-card")
      .filter({ hasText: "A good place to begin." }),
  ).toContainText("20 Dec 2026");
  await page.getByRole("link", { name: "Team progress", exact: true }).click();
  await expect(page.getByRole("table")).toBeVisible();
  await fits(page);
  expect((await page.request.get("/api/lms/admin/report")).status()).toBe(200);
  expect(
    (
      await page.request.post("/api/lms/admin/assign", {
        headers: { Origin: origin },
        data: {},
      })
    ).status(),
  ).toBe(403);
  await page.goto("/butterlearn/app/manage");
  await expect(page.getByRole("alert")).toContainText(
    "Course management is available to admins.",
  );
});

test("admins switch learner, manager and admin views without signing out", async ({
  page,
  request,
}) => {
  await admin(request);
  await request.post("/api/lms/admin/starters", {
    headers: { Origin: origin },
    data: {},
  });
  await login(page);
  const before = (await (await page.request.get("/api/lms/session")).json())
    .user;
  const view = page.getByLabel("View as", { exact: true });
  await expect(view).toHaveValue("admin");
  await view.selectOption("learner");
  await expect(
    page.getByRole("heading", { name: "Hello, Daniel." }),
  ).toBeVisible();
  await expect(
    page.getByRole("link", { name: "Manage courses", exact: true }),
  ).toHaveCount(0);
  await expect(
    page.getByRole("link", { name: "Team progress", exact: true }),
  ).toHaveCount(0);
  await expect(page.locator(".lms-view-note")).toContainText("Learner view.");
  expect((await page.request.get("/api/lms/admin/report")).status()).toBe(403);
  await page.reload();
  await expect(view).toHaveValue("learner");
  await page.getByRole("link", { name: "Course library", exact: true }).click();
  const card = page
    .locator(".lms-course-card")
    .filter({
      has: page.getByRole("heading", { name: "Room to grow.", exact: true }),
    });
  await card
    .getByRole("link", {
      name: /Join course|Start learning|Continue learning|Revisit course/,
    })
    .click();
  await page
    .getByRole("button", {
      name: /Start learning|Continue learning|Revisit course/,
    })
    .click();
  await expect(
    page
      .frameLocator(".lms-player-stage iframe")
      .getByRole("heading", { name: "Room to grow.", exact: true }),
  ).toBeVisible();
  const complete = page.getByRole("button", {
    name: "Mark complete",
    exact: true,
  });
  if (await complete.count()) await complete.click();
  await view.selectOption("manager");
  await expect(
    page.getByRole("heading", { name: "Progress with perspective." }),
  ).toBeVisible();
  await expect(
    page.getByRole("link", { name: "Team progress", exact: true }),
  ).toBeVisible();
  await expect(
    page.getByRole("link", { name: "People", exact: true }),
  ).toHaveCount(0);
  expect(
    (
      await page.request.post("/api/lms/admin/assign", {
        headers: { Origin: origin },
        data: {},
      })
    ).status(),
  ).toBe(403);
  await fits(page);
  await page
    .getByRole("button", { name: "Return to admin", exact: false })
    .click();
  await expect(view).toHaveValue("admin");
  await expect(
    page.getByRole("heading", { name: "Make room for learning." }),
  ).toBeVisible();
  await expect(
    page.getByRole("link", { name: "People", exact: true }),
  ).toBeVisible();
  expect((await page.request.get("/api/lms/admin/report")).status()).toBe(200);
  const after = (await (await page.request.get("/api/lms/session")).json())
    .user;
  expect(after.id).toBe(before.id);
  expect(after.role).toBe("admin");
  await fits(page);
  await view.selectOption("learner");
  await page.getByRole("button", { name: "Sign out", exact: true }).click();
  await login(page);
  await expect(view).toHaveValue("admin");
});

test("learner accounts cannot switch views or forge an admin view cookie", async ({
  page,
  context,
}) => {
  const email = randomUUID() + "@butter.test";
  await page.goto("/butterlearn/login");
  await page
    .getByRole("button", { name: "Create an account", exact: true })
    .click();
  await page.getByLabel("Your name").fill("Jo Learner");
  await page.getByLabel("Email address").fill(email);
  await page.getByLabel("Password", { exact: true }).fill(password);
  await page
    .getByRole("button", { name: "Create account", exact: true })
    .click();
  await expect(page.getByRole("heading", { name: "Hello, Jo." })).toBeVisible();
  await expect(page.getByLabel("View as", { exact: true })).toHaveCount(0);
  expect(
    (
      await page.request.post("/api/lms/session/view", {
        headers: { Origin: origin },
        data: { role: "admin" },
      })
    ).status(),
  ).toBe(403);
  await context.addCookies([
    { name: "butterlearn_view", value: "admin", url: origin },
  ]);
  await page.reload();
  await expect(
    page.getByRole("link", { name: "Manage courses", exact: true }),
  ).toHaveCount(0);
  expect((await page.request.get("/api/lms/admin/report")).status()).toBe(403);
});
