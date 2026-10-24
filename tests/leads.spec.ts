import { test, expect } from "@playwright/test";
const offerPaths = [
  "bespoke-elearning",
  "staff-onboarding",
  "compliance-training",
  "course-refresh",
];
test("commercial pages are discoverable, indexed and fit narrow layouts", async ({
  page,
}) => {
  await page.goto("/");
  await expect(page.locator(".hero-copy")).toContainText(
    "Bespoke eLearning, onboarding and training content for businesses.",
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
  await page.goto("/elearning-devon");
  await expect(page.locator("body")).not.toContainText(
    /Devon.based|our Devon office|testimonial/i,
  );
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
