import { test, expect } from "@playwright/test";
import { offers } from "../src/data/offers";
const offerPaths = offers.map((offer) => offer.slug);
test("commercial pages are discoverable, indexed and fit narrow layouts", async ({
  page,
}) => {
  test.setTimeout(60000);
  await page.goto("/");
  await expect(page.locator(".hero-copy")).toContainText(
    "Bespoke eLearning, LMS development and training content for businesses.",
  );
  await expect(page.locator(".hero-copy .pill-button")).toHaveAttribute(
    "href",
    "/contact",
  );
  await expect(
    page
      .getByRole("region", { name: "Reported project outcomes" })
      .getByRole("link"),
  ).toHaveCount(3);
  const links = page.locator(".lead-services");
  await expect(links.locator(".service-cards > a")).toHaveCount(8);
  if (page.viewportSize()!.width >= 1200) {
    const rows = await links
      .locator(".service-cards > a")
      .evaluateAll((cards) =>
        cards.map((card) => Math.round(card.getBoundingClientRect().top)),
      );
    expect(new Set(rows.slice(0, 4)).size).toBe(1);
    expect(new Set(rows.slice(4)).size).toBe(1);
    expect(rows[4]).toBeGreaterThan(rows[0]);
  }
  for (const slug of offerPaths)
    await expect(links.locator(`a[href="/services/${slug}"]`)).toBeVisible();
  for (const path of [
    ...offerPaths.map((slug) => "/services/" + slug),
    "/elearning-devon",
    "/privacy",
  ]) {
    await page.goto(path);
    await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
    const schema = JSON.parse(
      (await page.locator("#page-structured-data").textContent())!,
    );
    if (path !== "/privacy") expect(schema["@type"]).toBe("Service");
    await expect(page.locator('link[rel="canonical"]')).toHaveAttribute(
      "href",
      "https://buttertest.netlify.app" + path,
    );
    for (const width of [320, 768, 1440]) {
      await page.setViewportSize({ width, height: 900 });
      await page.evaluate(() => document.fonts.ready);
      expect(
        await page.evaluate(
          () => document.documentElement.scrollWidth <= innerWidth,
        ),
        `${path} at ${width}`,
      ).toBe(true);
    }
  }
  await page.goto("/services/bespoke-elearning");
  await page.getByRole("link", { name: "See a related project" }).click();
  await expect(page.locator("#offer-work")).toBeInViewport();
  await page.goto("/services/staff-onboarding");
  await expect(page).toHaveURL("/services");
  await expect(page.locator(".lead-service-links > a")).toHaveCount(8);
  await expect(
    page.getByRole("link", { name: "Staff onboarding", exact: true }),
  ).toHaveCount(0);
  await page.goto("/elearning-devon");
  await expect(page.locator("body")).not.toContainText(
    /Devon.based|our Devon office|testimonial/i,
  );
});

test("specialist services connect evidence, reading and contextual enquiries", async ({
  page,
}) => {
  test.setTimeout(90000);
  for (const [slug, title, project, article] of [
    [
      "learning-strategy",
      "Learning strategy",
      "strategic-skills-mapping",
      "learning-needs-analysis",
    ],
    [
      "ld-team-development",
      "L&D team development",
      "ld-digital-upskilling",
      "worked-examples",
    ],
    [
      "learning-animation",
      "Learning animation",
      "ai-enabled-scenario-learning",
      "elearning-storyboarding",
    ],
    [
      "lms-development",
      "LMS architecture & development",
      "humankind-educatorhub",
      "lms-vs-lxp-vs-lrs",
    ],
    [
      "lms-project-management",
      "LMS project management",
      "your-learning-platform",
      "choosing-lms",
    ],
  ]) {
    await page.goto("/services");
    await page
      .locator(".lead-service-links")
      .getByRole("link", { name: title, exact: true })
      .click();
    await expect(page).toHaveURL(`/services/${slug}`);
    await expect(page.getByRole("heading", { level: 1 })).toContainText(title);
    const projects = page.locator(".offer-work, .offer-related-work");
    await expect(projects.locator(".project")).toHaveCount(
      [
        "learning-animation",
        "lms-development",
        "lms-project-management",
      ].includes(slug)
        ? 3
        : 1,
    );
    await projects.locator(`a[href="/work/${project}"]`).click();
    await page
      .locator(".project-story")
      .getByRole("link", { name: `Explore ${title}`, exact: true })
      .click();
    await expect(page).toHaveURL(`/services/${slug}`);
    await page
      .locator(".editorial-related")
      .locator(`a[href="/journal/${article}"]`)
      .click();
    const services = page.getByRole("navigation", {
      name: "Services related to this article",
    });
    await services
      .getByRole("link", { name: `Explore ${title}`, exact: true })
      .click();
    await expect(page).toHaveURL(`/services/${slug}`);
    const question = page.locator(".offer-questions .accordion").first();
    await question.getByRole("button").click();
    await expect(question.locator(".accordion-panel")).toHaveAttribute(
      "aria-hidden",
      "false",
    );
    await question.getByRole("button").press("Space");
    await expect(question.locator(".accordion-panel")).toHaveAttribute(
      "aria-hidden",
      "true",
    );
    await page
      .locator(".page-hero")
      .getByRole("link", { name: "Talk about your project" })
      .click();
    await expect(
      page.getByRole("button", { name: title, exact: true }),
    ).toHaveAttribute("aria-pressed", "true");
  }
});

test("service enquiry carries origin context and records success only after capture", async ({
  page,
}) => {
  const events: Record<string, string>[] = [];
  let body = new URLSearchParams();
  await page.route("**/api/marketing/events", async (route) => {
    events.push(route.request().postDataJSON());
    await route.fulfill({ status: 204 });
  });
  await page.route("http://127.0.0.1:5173/", async (route) => {
    if (route.request().method() !== "POST") return route.continue();
    body = new URLSearchParams(route.request().postData() || "");
    await route.fulfill({ status: 200, body: "captured" });
  });
  await page.goto(
    "/services/course-refresh?email=not-for-analytics@example.com",
  );
  await page
    .locator(".page-hero")
    .getByRole("link", { name: "Talk about your project" })
    .click();
  await expect(
    page.getByRole("button", { name: "Course refresh", exact: true }),
  ).toHaveAttribute("aria-pressed", "true");
  await page.getByLabel("Your name").fill("Example contact");
  await page.getByLabel("Your email").fill("private@example.com");
  await page
    .getByLabel("A little about your project")
    .fill("Private project notes.");
  expect(
    events.filter((item) => item.event === "enquiry_success"),
  ).toHaveLength(0);
  await page
    .getByRole("button", { name: "Send your enquiry", exact: false })
    .click();
  await expect(page.getByRole("status")).toContainText(
    "Your enquiry is with butter",
  );
  await expect
    .poll(
      () => events.filter((item) => item.event === "enquiry_success").length,
    )
    .toBe(1);
  expect(body.get("entry_page")).toBe("/services/course-refresh");
  expect(body.get("enquiry_origin")).toBe("/services/course-refresh");
  expect(body.has("budget")).toBe(false);
  expect(body.has("calculator_used")).toBe(false);
  expect(body.has("estimate")).toBe(false);
  expect(events.filter((item) => item.event === "form_start")).toHaveLength(1);
  expect(JSON.stringify(events)).not.toMatch(
    /example.com|Private project|email=|Example contact/,
  );
});

test("privacy signals suppress measurement without blocking enquiries", async ({
  page,
}) => {
  await page.addInitScript(() =>
    Object.defineProperty(navigator, "globalPrivacyControl", {
      value: true,
      configurable: true,
    }),
  );
  const events: string[] = [];
  await page.route("**/api/marketing/events", async (route) => {
    events.push(route.request().postData() || "");
    await route.fulfill({ status: 204 });
  });
  await page.goto("/");
  await page
    .locator(".hero-copy")
    .getByRole("link", { name: "Talk about your project" })
    .click();
  await page.getByLabel("Your name").fill("Example contact");
  await expect(
    page.getByRole("button", { name: "Send your enquiry", exact: false }),
  ).toBeEnabled();
  expect(events).toHaveLength(0);
});

test("journal enquiries retain the relevant service and article context", async ({
  page,
}) => {
  await page.goto("/journal/elearning-storyboarding");
  await page
    .locator(".contact-section")
    .getByRole("link", { name: "Talk about your project" })
    .click();
  await expect(
    page.getByRole("button", { name: "Bespoke eLearning", exact: true }),
  ).toHaveAttribute("aria-pressed", "true");
  await expect(page.getByLabel("Your name")).toBeVisible();
});
