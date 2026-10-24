import { expect, test } from "@playwright/test";
import { caseStudies } from "../src/data/projectCaseStudies";

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
    await page.locator(".next-project a").click();
    await expect(page.getByRole("heading", { level: 1 })).not.toHaveText(
      project.title,
    );
  }
  expect(errors).toEqual([]);
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
