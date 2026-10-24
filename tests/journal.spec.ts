import { test, expect } from "@playwright/test";

test("journal view choice persists and keeps search and topics when switching", async ({ page }) => {
  await page.goto("/journal");
  const views = page.getByRole("group", { name: "Article view" });
  const cards = views.getByRole("button", { name: "Cards", exact: true });
  const list = views.getByRole("button", { name: "List", exact: true });
  await expect(cards).toHaveAttribute("aria-pressed", "true");
  await list.focus();
  await list.press("Enter");
  await expect(list).toBeFocused();
  await expect(list).toHaveAttribute("aria-pressed", "true");
  await expect(page.locator(".journal-rows > li")).toHaveCount(33);
  await expect(page.locator(".editorial-card")).toHaveCount(0);
  await page.getByRole("button", { name: "Education in practice", exact: true }).click();
  const search = page.getByRole("searchbox", { name: "Find something useful" });
  await search.fill("retrieval practice");
  const title = "Retrieval practice: make remembering part of learning.";
  await expect(page.locator(".journal-row h2")).toHaveText(title);
  await cards.click();
  await expect(page.locator(".editorial-card h2")).toHaveText(title);
  await list.click();
  await expect(search).toHaveValue("retrieval practice");
  await expect(page.getByRole("status")).toHaveText("1 article");
  await search.fill("no matching article here");
  await expect(page.getByRole("heading", { name: "No articles found." })).toBeVisible();
  await page.getByRole("button", { name: "Show all articles", exact: false }).click();
  await expect(page.locator(".journal-rows > li")).toHaveCount(33);
  await page.locator(".journal-rows").getByRole("link", { name: title, exact: false }).click();
  await expect(page.getByRole("heading", { level: 1 })).toBeFocused();
  await page.goBack();
  await expect(list).toHaveAttribute("aria-pressed", "true");
  await page.reload();
  await expect(page.locator(".journal-rows > li")).toHaveCount(33);
  await expect(list).toHaveAttribute("aria-pressed", "true");
  await cards.click();
  await page.reload();
  await expect(cards).toHaveAttribute("aria-pressed", "true");
  await expect(page.locator(".editorial-card")).toHaveCount(33);
});

test("journal search combines with topics and recovers from empty results", async ({
  page,
}) => {
  await page.goto("/journal");
  const search = page.getByRole("searchbox", { name: "Find something useful" });
  await expect(page.getByRole("status")).toHaveText("33 articles");
  await page
    .getByRole("button", { name: "Education in practice", exact: true })
    .click();
  await expect(page.getByRole("status")).toHaveText("6 articles");
  await search.fill("retrieval practice");
  await expect(page.getByRole("status")).toHaveText("1 article");
  await expect(page.locator(".editorial-card h2")).toHaveText(
    "Retrieval practice: make remembering part of learning.",
  );
  await page
    .getByRole("button", { name: "Learning tech", exact: true })
    .click();
  await expect(page.getByRole("status")).toHaveText("0 articles");
  await expect(
    page.getByRole("heading", { name: "No articles found." }),
  ).toBeVisible();
  await page
    .getByRole("button", { name: "Show all articles", exact: false })
    .click();
  await expect(search).toHaveValue("");
  await expect(page.getByRole("status")).toHaveText("33 articles");
  await search.fill("  ACCESSIBLE ELEARNING: A PRACTICAL WCAG  ");
  await expect(page.locator(".editorial-card")).toHaveCount(1);
  await page.locator(".editorial-card").click();
  await expect(page).toHaveURL(/\/journal\/accessible-elearning-wcag$/);
});

test("articles show real dates, references, contents links and two relevant next reads", async ({
  page,
}) => {
  await page.goto("/journal/retrieval-practice");
  await expect(page.locator(".journal-byline time")).toHaveText(
    "23 October 2026",
  );
  await expect(page.locator(".journal-byline time")).toHaveAttribute(
    "datetime",
    "2026-10-23",
  );
  await expect(page.locator(".journal-resources a")).toHaveAttribute(
    "href",
    "https://ies.ed.gov/ncee/WWC/PracticeGuide/1",
  );
  const related = page.locator(".editorial-related .editorial-card");
  await expect(related).toHaveCount(2);
  await expect(related.nth(0)).toHaveAttribute(
    "href",
    "/journal/spaced-practice",
  );
  await expect(related.nth(1)).toHaveAttribute(
    "href",
    "/journal/formative-assessment",
  );
  await page
    .getByRole("navigation", { name: "In this article" })
    .getByRole("link", { name: "Close the loop with feedback." })
    .click();
  await expect(page).toHaveURL(/#section-4$/);
  await expect(page.locator("#section-4")).toBeInViewport();
  await page.goto("/journal/how-to-brief-elearning-project");
  await expect(page.locator(".journal-byline time")).toHaveText(
    "12 October 2026",
  );
  await page.setViewportSize({ width: 320, height: 900 });
  expect(
    await page.evaluate(
      () => document.documentElement.scrollWidth <= innerWidth,
    ),
  ).toBe(true);
});
