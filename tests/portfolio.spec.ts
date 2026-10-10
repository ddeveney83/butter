import { test, expect } from "@playwright/test";
import { projects } from "../src/data/projects";

test("original images and project video players are mapped to the source and load on demand", async ({
  page,
}) => {
  const videoRequests: string[] = [];
  await page.route("https://www.youtube-nocookie.com/**", async (route) => {
    videoRequests.push(route.request().url());
    await route.fulfill({
      contentType: "text/html",
      body: "<title>Project video player</title>",
    });
  });
  for (const project of projects) {
    await page.goto(`/work/${project.id}`);
    const media = page.locator(".project-original-media");
    await expect
      .poll(() =>
        media
          .locator("img")
          .evaluate((image: HTMLImageElement) => image.naturalWidth),
      )
      .toBeGreaterThan(0);
    await expect(
      page.getByRole("link", { name: "Read the original case study" }),
    ).toHaveAttribute("href", project.source);
    await expect(page.locator(".project-intention")).toContainText(
      project.metric.value,
    );
    const play = media.getByRole("button");
    if (project.videoIds.length && project.id !== "your-learning-platform") {
      const before = videoRequests.length;
      await expect(media.locator("iframe")).toHaveCount(0);
      await play.focus();
      await play.press("Enter");
      await expect(media.locator("iframe")).toHaveAttribute(
        "src",
        `https://www.youtube-nocookie.com/embed/${project.videoIds[0]}?autoplay=1&controls=1&rel=0`,
      );
      await expect.poll(() => videoRequests.length).toBe(before + 1);
      await expect(media.locator("iframe")).toHaveAccessibleName(
        `${project.title} — original project video`,
      );
      await expect(media.locator("iframe")).toBeFocused();
      if (project.filter === "eLearning") {
        const response = page
          .getByRole("group", { name: "Choose a response", exact: true })
          .getByRole("button")
          .first();
        await response.click();
        await expect(response).toBeFocused();
      }
    } else {
      await expect(play).toHaveCount(0);
      await expect(media.locator("iframe")).toHaveCount(0);
    }
  }
});

test("enterprise library search, filters, saved resources and empty results work", async ({
  page,
}) => {
  await page.goto("/work/your-learning-platform");
  const preview = page.getByRole("region", {
    name: "Interactive platform preview",
  });
  const resources = preview.locator(".platform-resources article");
  await expect(resources).toHaveCount(4);
  await preview
    .getByRole("button", { name: "Save Safer working, together", exact: true })
    .click();
  await expect(preview.getByRole("status")).toHaveText("4 resources · 1 saved");
  await preview
    .getByRole("button", { name: "Mandatory learning", exact: true })
    .click();
  await expect(resources).toHaveCount(1);
  await expect(
    preview.getByRole("button", {
      name: "Unsave Safer working, together",
      exact: true,
    }),
  ).toHaveAttribute("aria-pressed", "true");
  const search = preview.getByRole("searchbox", {
    name: "Find something useful",
  });
  await search.fill("unmatched search");
  await expect(resources).toHaveCount(0);
  await expect(preview.locator(".platform-empty")).toContainText(
    "No matches yet",
  );
  await preview
    .getByRole("button", { name: "All learning", exact: true })
    .click();
  await search.fill("volunteering");
  await expect(resources).toHaveCount(1);
  await search.fill("");
  await preview
    .getByRole("button", {
      name: "Unsave Safer working, together",
      exact: true,
    })
    .click();
  await expect(preview.getByRole("status")).toHaveText("4 resources · 0 saved");
});

test("academy pathways support keyboard navigation and retain module completion", async ({
  page,
}) => {
  await page.goto("/work/nansen-learning-academy");
  const preview = page.getByRole("region", {
    name: "Interactive platform preview",
  });
  const complete = preview.getByRole("button", {
    name: "Mark sample complete",
  });
  await expect(complete).toBeDisabled();
  const foundations = preview.getByRole("tab", {
    name: "Foundations",
    exact: true,
  });
  await foundations.focus();
  await foundations.press("ArrowRight");
  await expect(
    preview.getByRole("tab", { name: "Intermediate", exact: true }),
  ).toBeFocused();
  const module = preview.getByRole("button", { name: /Following smart money/ });
  await module.click();
  await expect(preview.locator(".platform-module-detail h4")).toHaveText(
    "Following smart money",
  );
  await complete.click();
  await expect(module).toContainText("Complete ✓");
  await expect(
    preview.getByRole("button", { name: "Completed ✓", exact: true }),
  ).toBeDisabled();
  await foundations.click();
  await foundations.press("End");
  await expect(
    preview.getByRole("tab", { name: "Advanced", exact: true }),
  ).toBeFocused();
  await preview.getByRole("tab", { name: "Intermediate", exact: true }).click();
  await expect(module).toContainText("Complete ✓");
});

test("all project media and platform previews fit narrow screens", async ({
  page,
}) => {
  await page.setViewportSize({ width: 320, height: 1000 });
  for (const project of projects) {
    await page.goto(`/work/${project.id}`);
    if (project.filter === "LMS") {
      const preview = page.getByRole("region", {
        name: "Interactive platform preview",
      });
      if (project.id === "nansen-learning-academy") {
        await preview
          .getByRole("tab", { name: "Advanced", exact: true })
          .click();
        await preview
          .getByRole("tabpanel")
          .locator(".platform-modules button")
          .first()
          .click();
        await preview
          .getByRole("button", { name: "Mark sample complete" })
          .click();
      } else {
        await preview
          .getByRole("searchbox")
          .fill("a very long search query with no matching resources");
      }
    }
    expect(
      await page.evaluate(
        () => document.documentElement.scrollWidth <= innerWidth,
      ),
      project.id,
    ).toBe(true);
  }
});
