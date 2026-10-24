import { test, expect } from "@playwright/test";
import { labs } from "../src/data/labs";
import { publicPaths } from "../src/data/publicPaths";

test("pricing is absent across public pages and retired URLs lead to useful destinations", async ({
  page,
}) => {
  test.setTimeout(120000);
  for (const path of publicPaths) {
    await page.goto(path);
    await expect(page.locator("body")).not.toContainText(
      /pricing|£|project budget|indicative budget|ballpark|project calculator|starting budget|subscription pricing/i,
    );
    await expect(
      page.locator(
        'a[href*="/pricing"],input[name="budget"],input[name="calculator_used"],input[name="estimate"],select[name="budget"]',
      ),
    ).toHaveCount(0);
  }
  await page.goto("/pricing");
  await expect(page).toHaveURL(/\/contact$/);
  await page.goto("/journal/what-does-elearning-cost");
  await expect(page).toHaveURL(/\/journal\/how-to-brief-elearning-project$/);
});

test("Labs shows the five sourced projects and filters their real build status", async ({
  page,
}) => {
  await page.goto("/labs");
  await expect(page.locator(".lab-project-card")).toHaveCount(5);
  await expect(page.getByRole("status")).toHaveText("5 projects");
  for (const project of labs) {
    const card = page.locator(
      `.lab-project-card[href="/labs/${project.slug}"]`,
    );
    await card.scrollIntoViewIfNeeded();
    await expect(card.getByRole("heading")).toHaveText(project.title);
    await expect(card.locator("img")).toHaveJSProperty(
      "naturalWidth",
      project.hero.width,
    );
  }
  await page.getByRole("button", { name: "Beta", exact: true }).click();
  await expect(page.locator(".lab-project-card")).toHaveCount(2);
  await page.getByRole("button", { name: "Alpha", exact: true }).click();
  await expect(page.locator(".lab-project-card")).toHaveCount(3);
  await expect(page.locator("body")).not.toContainText(
    /A little practice|One idea at a time|The better question|illustrative learning experiment/i,
  );
});

test("all Labs pages load real local imagery and support keyboard gallery navigation", async ({
  page,
}) => {
  const errors: string[] = [];
  page.on("pageerror", (error) => errors.push(error.message));
  for (const project of labs) {
    await page.goto(`/labs/${project.slug}`);
    await expect(page.getByRole("heading", { level: 1 })).toHaveText(
      project.title,
    );
    await expect(page.locator(".lab-project-hero img")).toHaveJSProperty(
      "naturalWidth",
      project.hero.width,
    );
    await expect(page.locator(".lab-gallery-grid button")).toHaveCount(
      project.gallery.length,
    );
    await expect(page.locator("body")).not.toContainText(
      /daniel|deveney|placeholder/i,
    );
    const schema = JSON.parse(
      (await page.locator("#page-structured-data").textContent())!,
    );
    expect(schema["@type"]).toBe("CreativeWork");
    expect(schema.creativeWorkStatus).toBe(project.status);
    const first = page.locator(".lab-gallery-grid button").first();
    await first.click();
    const dialog = page.getByRole("dialog");
    await expect(dialog).toBeVisible();
    await expect(dialog.locator("figure img")).toHaveAttribute(
      "src",
      project.gallery[0].path,
    );
    await dialog.press("ArrowLeft");
    await expect(dialog.locator("figure img")).toHaveAttribute(
      "src",
      project.gallery.at(-1)!.path,
    );
    await dialog.press("ArrowRight");
    await expect(dialog.locator("figure img")).toHaveAttribute(
      "src",
      project.gallery[0].path,
    );
    await dialog.press("End");
    await expect(dialog.locator("figure img")).toHaveAttribute(
      "src",
      project.gallery.at(-1)!.path,
    );
    await dialog.press("Escape");
    await expect(dialog).not.toBeVisible();
    await expect(first).toBeFocused();
    expect(await page.evaluate(() => document.body.style.overflow)).not.toBe(
      "hidden",
    );
    for (const width of [320, 768, 1440]) {
      await page.setViewportSize({ width, height: 900 });
      await page.evaluate(() => document.fonts.ready);
      expect(
        await page.evaluate(
          () => document.documentElement.scrollWidth <= innerWidth,
        ),
        `${project.slug} at ${width}`,
      ).toBe(true);
    }
  }
  expect(errors).toEqual([]);
});
