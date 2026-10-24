import { test, expect } from "@playwright/test";
import { toolSelectionArticles } from "../src/data/journal/tool-selection";

test("the new tool guides have distinct routes, complete metadata and usable mobile layouts", async ({
  page,
}) => {
  test.setTimeout(120000);
  expect(toolSelectionArticles).toHaveLength(10);
  const errors: string[] = [];
  page.on("pageerror", (error) => errors.push(error.message));
  for (const article of toolSelectionArticles) {
    await page.goto(`/journal/${article.slug}`);
    await expect(page.getByRole("heading", { level: 1 })).toHaveText(
      article.title,
    );
    await expect(page).toHaveTitle(`butter — ${article.title}`);
    await expect(page.locator('meta[name="description"]')).toHaveAttribute(
      "content",
      article.description,
    );
    await expect(page.locator(".journal-byline time")).toHaveText(
      "24 October 2026",
    );
    const schema = JSON.parse(
      (await page.locator("#page-structured-data").textContent())!,
    );
    expect(schema["@type"]).toBe("BlogPosting");
    expect(schema.wordCount).toBeGreaterThan(500);
    expect(schema.author.name).toBe("butter studio");
    await expect(
      page.locator(".editorial-related .editorial-card"),
    ).toHaveCount(2);
    for (const width of [320, 768, 1440]) {
      await page.setViewportSize({ width, height: 900 });
      await page.evaluate(() => document.fonts.ready);
      expect(
        await page.evaluate(
          () => document.documentElement.scrollWidth <= innerWidth,
        ),
        `${article.slug} at ${width}`,
      ).toBe(true);
    }
  }
  expect(errors).toEqual([]);
});

test("platform comparison is searchable and its table can be read with keyboard and narrow screens", async ({
  page,
}) => {
  await page.goto("/journal");
  await page
    .getByRole("searchbox", { name: "Find something useful" })
    .fill("LMS vs LXP vs LRS");
  await expect(page.getByRole("status")).toHaveText("1 article");
  await page.locator(".editorial-card").click();
  await expect(page).toHaveURL(/\/journal\/lms-vs-lxp-vs-lrs$/);
  await expect(page.getByRole("heading", { level: 1 })).toBeFocused();
  const table = page.getByRole("table", {
    name: "LMS, LXP and LRS: a practical comparison",
  });
  await expect(table.getByRole("columnheader")).toHaveCount(4);
  await expect(table.getByRole("rowheader")).toHaveText(["LMS", "LXP", "LRS"]);
  await page.setViewportSize({ width: 320, height: 900 });
  const region = page.getByRole("region", {
    name: "LMS, LXP and LRS: a practical comparison",
  });
  await region.focus();
  await expect(region).toBeFocused();
  await region.press("ArrowRight");
  await expect
    .poll(() => region.evaluate((element) => element.scrollLeft))
    .toBeGreaterThan(0);
  expect(
    await page.evaluate(
      () => document.documentElement.scrollWidth <= innerWidth,
    ),
  ).toBe(true);
  await page
    .locator(".contact-section")
    .getByRole("link", { name: "Talk about your project" })
    .click();
  await expect(
    page.getByRole("button", { name: "Learning strategy", exact: true }),
  ).toHaveAttribute("aria-pressed", "true");
});
