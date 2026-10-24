import { expect, test } from "@playwright/test";
import { caseStudies } from "../src/data/projectCaseStudies";
import { projects } from "../src/data/projects";

test("every project uses the shared visual case-study structure and ends in an image-only gallery", async ({
  page,
}) => {
  test.setTimeout(90000);
  await page.emulateMedia({ reducedMotion: "reduce" });
  for (const project of projects) {
    await page.goto(`/work/${project.id}`);
    await expect(
      page.locator(".case-study-hero .portfolio-card-art"),
    ).toHaveCount(1);
    await expect(page.locator(".case-study-section")).toHaveCount(3);
    for (const section of project.caseStudy.sections) {
      await expect(
        page.getByRole("heading", { name: section.heading, exact: true }),
      ).toBeVisible();
    }
    await expect(page.locator(".project-gallery + .next-project")).toHaveCount(
      1,
    );
    const gallery = page.getByRole("region", { name: "Project image gallery" });
    await expect(gallery.locator(".project-image-open")).toHaveCount(
      project.gallery.length,
    );
    await expect(gallery.locator("h2, p, figcaption")).toHaveCount(0);
    await expect(gallery.locator(".project-gallery-grid")).toHaveText("");
    if (project.mediaKind === "original") {
      await expect(page.locator(".case-study-sections")).not.toContainText(
        "Image placeholder",
      );
      await expect(page.locator(".project-sample")).toHaveCount(1);
    }
    const first = page.locator(".case-study-section").first();
    const even = page.locator(".case-study-section").nth(1);
    const positions = await page.evaluate(() => ({ width: innerWidth }));
    if (positions.width > 760) {
      expect(
        (await first.locator(".case-study-copy").boundingBox())!.x,
      ).toBeLessThan(
        (await first.locator(".case-study-visual").boundingBox())!.x,
      );
      expect(
        (await even.locator(".case-study-copy").boundingBox())!.x,
      ).toBeGreaterThan(
        (await even.locator(".case-study-visual").boundingBox())!.x,
      );
    }
    expect(
      await page.evaluate(
        () => document.documentElement.scrollWidth <= innerWidth,
      ),
      project.id,
    ).toBe(true);
  }
});

test("new case studies have complete stories, labelled media, contextual enquiries and next navigation", async ({
  page,
}) => {
  test.setTimeout(90000);
  const errors: string[] = [];
  page.on("pageerror", (error) => errors.push(error.message));
  for (const project of caseStudies) {
    await page.goto(`/work/${project.id}`);
    await expect(page.getByRole("heading", { level: 1 })).toHaveText(
      project.title,
    );
    await expect(page.locator(".case-study-section")).toHaveCount(3);
    await expect(page.locator(".case-study-hero figcaption")).toContainText(
      "Image placeholder",
    );
    await expect(page.locator(".case-study-visual figcaption")).toHaveCount(3);
    for (const section of project.caseStudy!.sections) {
      await expect(
        page.getByRole("heading", { name: section.heading, exact: true }),
      ).toBeVisible();
      await expect(
        page.getByText(section.visualBrief, { exact: true }),
      ).toBeVisible();
    }
    for (const image of await page
      .locator(".project-original-media img, .case-study-visual img")
      .all()) {
      await image.scrollIntoViewIfNeeded();
      await expect
        .poll(() => image.evaluate((img: HTMLImageElement) => img.naturalWidth))
        .toBeGreaterThan(0);
      await expect(image).toHaveAttribute("alt", /image placeholder$/);
    }
    // The new pages are case studies, with no invented working course/player.
    await expect(
      page.locator(".project-sample, .project-demo, iframe"),
    ).toHaveCount(0);
    expect(
      JSON.parse((await page.locator("#page-structured-data").textContent())!)[
        "@type"
      ],
    ).toBe("CreativeWork");
    const enquiry = page
      .locator(".contact-section a")
      .filter({ hasText: "Talk about your project" });
    await expect(enquiry).toHaveAttribute(
      "href",
      `/contact?service=${encodeURIComponent(project.caseStudy!.service)}`,
    );
    await enquiry.click();
    await expect(
      page.getByRole("button", {
        name: project.caseStudy!.service,
        exact: true,
      }),
    ).toHaveAttribute("aria-pressed", "true");
    await page.goBack();
    await expect(page.getByRole("heading", { level: 1 })).toBeFocused();
    await page.locator(".next-project a").click();
    await expect(page.getByRole("heading", { level: 1 })).not.toHaveText(
      project.title,
    );
    await expect(page.getByRole("heading", { level: 1 })).toBeFocused();
  }
  expect(errors).toEqual([]);
});

test("leaving an open gallery restores scrolling on the destination page", async ({
  page,
}) => {
  await page.goto("/work");
  await page
    .getByRole("link", { name: "Explore Allergen Awareness", exact: true })
    .click();
  await expect(page.getByRole("heading", { level: 1 })).toBeFocused();
  await page
    .getByRole("region", { name: "Project image gallery" })
    .getByRole("button")
    .first()
    .click();
  await expect(page.getByRole("dialog")).toBeVisible();
  expect(
    await page.evaluate(() => getComputedStyle(document.body).overflow),
  ).toBe("hidden");
  await page.goBack();
  await expect(page).toHaveURL("/work");
  await expect(page.getByRole("heading", { level: 1 })).toBeFocused();
  await expect(page.getByRole("dialog")).toHaveCount(0);
  expect(
    await page.evaluate(() => getComputedStyle(document.body).overflow),
  ).toBe("visible");
});

test("all work disciplines are discoverable through reloadable filters", async ({
  page,
}) => {
  await page.goto("/work");
  for (const [filter, count] of [
    ["Strategy & capability", 2],
    ["Video", 3],
    ["LMS", 3],
  ] as const) {
    await page.getByRole("button", { name: filter, exact: true }).click();
    await page.reload();
    await expect(
      page.getByRole("button", { name: filter, exact: true }),
    ).toHaveAttribute("aria-pressed", "true");
    await expect(page.locator(".work-gallery .project")).toHaveCount(count);
  }
  await page.getByRole("button", { name: "All work", exact: true }).click();
  await expect(page.locator(".work-gallery .project")).toHaveCount(14);
  await expect(page.locator(".work-gallery")).not.toContainText(
    /granite|glitch/i,
  );
});
