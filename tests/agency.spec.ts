import { test, expect } from "@playwright/test";
import { articles, experiments } from "../src/data/editorial";
import { projects } from "../src/data/projects";
test("agency pages, journal and Labs load without personal credits, errors or overflow", async ({
  page,
}) => {
  test.setTimeout(120000);
  const errors: string[] = [];
  page.on("pageerror", (error) => errors.push(error.message));
  for (const path of [
    "/",
    "/about",
    "/services",
    "/work",
    "/contact",
    "/brand",
    "/butterlearn",
    "/journal",
    "/labs",
    ...articles.map((item) => "/journal/" + item.slug),
    ...experiments.map((item) => "/labs/" + item.slug),
    ...projects.map((item) => "/work/" + item.id),
  ]) {
    await page.goto(path);
    await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
    await expect(page.locator("body")).not.toContainText(
      /daniel|deveney|ddeveney/i,
    );
    await expect(page.locator("body")).not.toContainText(
      /\bButter(?:learn)?\b/,
    );
    expect(await page.title()).not.toMatch(/\bButter(?:learn)?\b/);
    expect(
      await page
        .locator('a[href*="daniel"],a[href*="deveney"],a[href^="mailto:"]')
        .count(),
    ).toBe(0);
    await page.evaluate(() => document.fonts.ready);
    expect(
      await page.evaluate(
        () => document.documentElement.scrollWidth <= innerWidth + 1,
      ),
      path,
    ).toBe(true);
    await expect(page.locator('link[rel="canonical"]')).toHaveAttribute(
      "href",
      "https://buttertest.netlify.app" + path,
    );
  }
  expect(errors).toEqual([]);
});
test("journal filters and article links provide readable content and article metadata", async ({
  page,
}) => {
  await page.goto("/journal");
  await expect(page.locator(".editorial-card")).toHaveCount(33);
  await page
    .getByRole("button", { name: "Learning tech", exact: true })
    .click();
  await expect(page.locator(".editorial-card")).toHaveCount(17);
  await expect(page.getByRole("status")).toHaveText("17 articles");
  await page.getByRole("link", { name: /SCORM or HTML/ }).click();
  await expect(page.getByRole("heading", { level: 1 })).toHaveText(
    "SCORM or HTML? Start with the learner.",
  );
  const schema = JSON.parse(
    (await page.locator("#page-structured-data").textContent())!,
  );
  expect(schema["@type"]).toBe("BlogPosting");
  expect(schema.author.name).toBe("butter studio");
  await expect(page.locator('meta[property="og:type"]')).toHaveAttribute(
    "content",
    "article",
  );
  await page
    .getByRole("navigation", { name: "In this article" })
    .getByRole("link", {
      name: "Ask what ‘complete’ actually means.",
      exact: true,
    })
    .click();
  await expect(page).toHaveURL(/#section-4$/);
  await page.goto("/journal/scorm-or-html-course/");
  await expect(page).toHaveTitle(
    "butter — SCORM or HTML? Start with the learner.",
  );
  await expect(page.locator('link[rel="canonical"]')).toHaveAttribute(
    "href",
    "https://buttertest.netlify.app/journal/scorm-or-html-course",
  );
});
test("contact keeps the destination private and retains the brief after a delivery error", async ({
  page,
}) => {
  const sent: string[] = [];
  let attempts = 0;
  await page.route("http://127.0.0.1:5173/", async (route) => {
    if (route.request().method() !== "POST") return route.continue();
    sent.push(route.request().postData() || "");
    attempts++;
    await route.fulfill({
      status: attempts === 1 ? 503 : 200,
      body: "captured",
    });
  });
  await page.goto("/contact");
  await page.getByLabel("Your name", { exact: true }).fill("Agency enquiry");
  await page
    .getByLabel("Your email", { exact: true })
    .fill("visitor@example.com");
  await page
    .getByLabel("A little about your project")
    .fill("A useful learning experience.");
  await page
    .getByRole("button", { name: "Send your enquiry", exact: false })
    .click();
  await expect(page.getByRole("alert")).toContainText("couldn’t send");
  await expect(page.getByLabel("A little about your project")).toHaveValue(
    "A useful learning experience.",
  );
  await page
    .getByRole("button", { name: "Send your enquiry", exact: false })
    .click();
  await expect(page.getByRole("status")).toContainText(
    "enquiry is with butter",
  );
  expect(new URLSearchParams(sent[1]).get("form-name")).toBe("butter-contact");
  expect(sent.join("")).not.toMatch(/ddeveney|daniel/);
  await expect(
    page.getByRole("button", { name: "Enquiry sent", exact: false }),
  ).toBeDisabled();
});
