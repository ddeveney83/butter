import {
  test,
  expect,
  type APIRequestContext,
  type Page,
} from "@playwright/test";
import { randomUUID } from "node:crypto";
test.use({ actionTimeout: 10000 });
const origin = "http://127.0.0.1:5173",
  password = "butter-test-only-2026",
  owner = "ddeveney83@gmail.com";
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
async function login(page: Page) {
  await page.goto("/butterlearn/login");
  await page.getByLabel("Email address").fill(owner);
  await page.getByLabel("Password", { exact: true }).fill(password);
  await page.getByRole("button", { name: "Sign in", exact: true }).click();
  await expect(
    page.getByRole("heading", { name: "Hello, Daniel." }),
  ).toBeVisible();
}
async function fits(page: Page) {
  expect(
    await page.evaluate(
      () => document.documentElement.scrollWidth <= innerWidth + 1,
    ),
  ).toBe(true);
}

test("creators build rich layouts and every interaction, preview, save and publish through admin", async ({
  page,
  request,
}) => {
  test.setTimeout(90000);
  await admin(request);
  await login(page);
  await page.getByLabel("View as", { exact: true }).selectOption("creator");
  await expect(
    page.getByRole("heading", { name: "Make something useful." }),
  ).toBeVisible();
  const title = "A creator course " + randomUUID().slice(0, 8);
  await page.getByLabel("Course title", { exact: true }).fill(title);
  await page
    .getByLabel("Course description", { exact: true })
    .fill("A visual practice course made in butterlearn.");
  await page
    .getByLabel("Course format", { exact: true })
    .selectOption("scorm2004");
  await page
    .getByRole("button", { name: "Create course shell", exact: false })
    .click();
  await expect(
    page.getByRole("heading", { name: title, exact: true }),
  ).toBeVisible();
  const id = page.url().split("/").pop();
  await page
    .getByRole("button", { name: "Start with rich text", exact: false })
    .click();
  const editor = page.getByRole("textbox", {
    name: "Block content",
    exact: true,
  });
  await editor.fill("A practice-ready course.");
  await editor.press("ControlOrMeta+a");
  await page.getByRole("button", { name: "Heading 2", exact: true }).click();
  await expect(
    editor.getByRole("heading", {
      name: "A practice-ready course.",
      level: 2,
      exact: true,
    }),
  ).toBeVisible();
  await page.getByRole("button", { name: "+ Columns", exact: true }).click();
  await page.getByLabel("Number of columns", { exact: true }).selectOption("3");
  await expect(
    page.getByRole("textbox", { name: "Column 3 content", exact: true }),
  ).toBeVisible();
  await page
    .getByLabel("Column 3 video URL (optional)", { exact: true })
    .fill(
      "https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4",
    );
  await fits(page);
  await page.getByRole("button", { name: "+ Image", exact: true }).click();
  await expect(page.locator(".studio-image-preview")).toBeVisible();
  await page.getByRole("button", { name: "+ Video", exact: true }).click();
  await page
    .getByLabel("Video URL", { exact: true })
    .fill(
      "https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4",
    );
  await page
    .getByLabel("Video transcript", { exact: true })
    .fill("A short nature clip used as example course media.");
  for (const name of ["Flip cards", "Accordion", "Tabs", "Hotspots"]) {
    await page.getByRole("button", { name: "+ " + name, exact: true }).click();
    await fits(page);
  }
  await page
    .getByLabel("Point 1 horizontal position (%)", { exact: true })
    .fill("30");
  await page
    .getByRole("button", { name: "+ Knowledge check", exact: true })
    .click();
  await page.getByRole("button", { name: "Save draft", exact: false }).click();
  await expect(
    page
      .getByRole("status")
      .filter({ hasText: "Draft saved. Ready to preview" }),
  ).toBeVisible();
  await page.reload();
  await expect(page.locator(".studio-outline ol li")).toHaveCount(9);
  await page.getByRole("button", { name: "Preview", exact: true }).click();
  const dialog = page.getByRole("dialog", { name: "Learner preview" });
  await expect(dialog).toBeVisible();
  const frame = page.frameLocator('iframe[title="Course content preview"]');
  await expect(
    frame.getByRole("heading", { name: "A practice-ready course." }),
  ).toBeVisible();
  await expect(frame.locator(".columns-3>div")).toHaveCount(3);
  await expect(frame.locator(".columns-3 video")).toHaveCount(1);
  const flip = frame.locator(".flip-card").first();
  await flip.click();
  await expect(flip).toHaveAttribute("aria-expanded", "true");
  await flip.click();
  await expect(flip).toHaveAttribute("aria-expanded", "false");
  await frame.locator(".accordion summary").first().click();
  await expect(frame.locator(".accordion details").first()).toHaveAttribute(
    "open",
    "",
  );
  const tab = frame.getByRole("tab").first();
  await tab.focus();
  await tab.press("ArrowRight");
  await expect(frame.getByRole("tab").nth(1)).toHaveAttribute(
    "aria-selected",
    "true",
  );
  await frame.locator(".hotspot").first().click();
  await expect(frame.locator(".hotspot-panel").first()).toBeVisible();
  await frame
    .getByRole("radio", { name: "Do everything at once", exact: true })
    .check();
  await frame
    .getByRole("button", { name: "Check answer", exact: false })
    .click();
  await expect(frame.locator(".quiz-feedback")).toContainText("Not quite");
  await frame
    .getByRole("radio", { name: "Try one small thing", exact: true })
    .check();
  await frame
    .getByRole("button", { name: "Check answer", exact: false })
    .click();
  await expect(frame.locator(".quiz-feedback")).toContainText(
    "Small steps make a good start.",
  );
  await frame
    .getByRole("button", { name: "Finish course", exact: false })
    .click();
  await expect(frame.locator("#finish-status")).toContainText(
    "This is a preview",
  );
  await dialog.getByRole("button", { name: "Mobile", exact: true }).click();
  await expect(
    page.locator('iframe[title="Course content preview"]'),
  ).toHaveClass("mobile");
  await dialog
    .getByRole("button", { name: "Close preview", exact: true })
    .click();
  await expect(
    page.getByRole("button", { name: "Publish", exact: true }),
  ).toHaveCount(0);
  expect(
    (
      await page.request.patch("/api/lms/courses/" + id, {
        headers: { Origin: origin },
        data: { published: true },
      })
    ).status(),
  ).toBe(403);
  await page
    .getByRole("button", { name: "Return to admin", exact: false })
    .click();
  await page.goto("/butterlearn/app/create/" + id);
  await page.getByRole("button", { name: "Publish", exact: true }).click();
  await expect(
    page.getByRole("status").filter({ hasText: "Your course is published" }),
  ).toBeVisible();
  await page.getByLabel("View as", { exact: true }).selectOption("learner");
  await page.goto("/butterlearn/app/courses/" + id);
  await page.getByRole("button", { name: /Start learning/ }).click();
  const live = page.frameLocator(".lms-player-stage iframe");
  await live
    .getByRole("button", { name: "Finish course", exact: false })
    .click();
  await expect(live.locator("#finish-status")).toContainText(
    "Check each knowledge question",
  );
  await live
    .getByRole("radio", { name: "Try one small thing", exact: true })
    .check();
  await live
    .getByRole("button", { name: "Check answer", exact: false })
    .click();
  await expect
    .poll(async () => {
      const value = await (
        await page.request.get("/api/lms/courses/" + id)
      ).json();
      return (
        value.course.enrolment.lessons["lesson-1"]?.cmi?.["cmi.suspend_data"] ||
        ""
      );
    })
    .toContain('"0"');
  await page.reload();
  await page.getByRole("button", { name: /Continue learning/ }).click();
  const resumed = page.frameLocator(".lms-player-stage iframe");
  await expect(
    resumed.getByRole("radio", { name: "Try one small thing", exact: true }),
  ).toBeChecked();
  await resumed
    .getByRole("button", { name: "Finish course", exact: false })
    .click();
  await expect(
    resumed.getByRole("button", { name: "Completed ✓", exact: true }),
  ).toBeDisabled();
  await expect
    .poll(async () => {
      const response = await page.request.get("/api/lms/courses/" + id);
      return (await response.json()).course.enrolment.status;
    })
    .toBe("completed");
  const result = await (
    await page.request.get("/api/lms/courses/" + id)
  ).json();
  expect(result.course.enrolment.score).toBe(100);
  await fits(page);
});

test("placeholder library includes six distinct playable courses and authored HTML interactions", async ({
  page,
  request,
}) => {
  await admin(request);
  const seed = await request.post("/api/lms/admin/starters", {
    headers: { Origin: origin },
    data: {},
  });
  expect(seed.ok()).toBeTruthy();
  await login(page);
  await page.getByLabel("View as", { exact: true }).selectOption("learner");
  await page.goto("/butterlearn/app/library");
  for (const title of [
    "A good place to begin.",
    "Make a good call.",
    "Room to grow.",
    "A moment to notice.",
    "Feedback that lands.",
    "Spot the safer choice.",
  ])
    await expect(
      page.getByRole("heading", { name: title, exact: true, level: 3 }),
    ).toBeVisible();
  await page.goto("/butterlearn/app/courses/butter-feedback");
  await page
    .getByRole("button", {
      name: /Start learning|Continue learning|Revisit course/,
    })
    .click();
  const frame = page.frameLocator(".lms-player-stage iframe");
  await frame.getByRole("tab", { name: "Discuss", exact: true }).click();
  await expect(frame.getByRole("tabpanel")).toContainText(
    "Share your perspective",
  );
  const complete = page.getByRole("button", {
    name: "Mark complete",
    exact: true,
  });
  if (await complete.count()) await complete.click();
  await expect
    .poll(async () => {
      const response = await page.request.get(
        "/api/lms/courses/butter-feedback",
      );
      return (await response.json()).course.enrolment.status;
    })
    .toBe("completed");
  await fits(page);
});
