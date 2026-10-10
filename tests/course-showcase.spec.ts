import { test, expect } from "@playwright/test";
import { projects } from "../src/data/projects";

test("all six course previews support screen navigation, hotspots, reveal cards and device views", async ({
  page,
}, testInfo) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  const errors: string[] = [];
  page.on("pageerror", (error) => errors.push(error.message));
  for (const project of projects) {
    await page.goto(`/work/${project.id}`);
    const preview = page.locator(".course-showcase");
    const active = preview.locator('.course-screen[aria-hidden="false"]');
    await expect(
      preview.getByRole("tab", { name: "Welcome", exact: true }),
    ).toHaveAttribute("aria-selected", "true");
    await preview
      .getByRole("button", { name: "Start exploring", exact: true })
      .click();
    await expect(
      preview.getByRole("tab", { name: "Explore", exact: true }),
    ).toBeFocused();
    const details = active.locator(".course-hotspot-details > div").first();
    const first = await details.textContent();
    const spots = preview
      .getByRole("group", { name: "Explore course hotspots" })
      .getByRole("button");
    await expect(spots).toHaveCount(3);
    await spots.last().click();
    await expect(spots.last()).toHaveAttribute("aria-pressed", "true");
    expect(await details.textContent()).not.toBe(first);
    const width = (await preview.locator(".course-player").boundingBox())!
      .width;
    await preview.getByRole("button", { name: "Mobile", exact: true }).click();
    const mobileWidth = (await preview.locator(".course-player").boundingBox())!
      .width;
    expect(mobileWidth).toBeLessThanOrEqual(420);
    expect(mobileWidth).toBeLessThanOrEqual(width);
    await expect(spots.last()).toHaveAttribute("aria-pressed", "true");
    await preview.getByRole("button", { name: "Desktop", exact: true }).click();
    if (testInfo.project.name === "desktop")
      expect(
        (await preview.locator(".course-player").boundingBox())!.width,
      ).toBeGreaterThan(mobileWidth);
    const lastTab = preview.getByRole("tab", {
      name: "Take away",
      exact: true,
    });
    await lastTab.click();
    const card = active.locator(".course-flip-card").first();
    await expect(card).toHaveAttribute("aria-pressed", "false");
    await card.click();
    await expect(card).toHaveAttribute("aria-pressed", "true");
    await expect(card.locator(".course-card-back")).toHaveAttribute(
      "aria-hidden",
      "false",
    );
    await expect(card.locator(".course-card-back")).toContainText(/\w{5}/);
    await card.click();
    await expect(card).toHaveAttribute("aria-pressed", "false");
    await lastTab.focus();
    await page.keyboard.press("ArrowRight");
    await expect(
      preview.getByRole("tab", { name: "Welcome", exact: true }),
    ).toBeFocused();
    await page.keyboard.press("End");
    await expect(lastTab).toHaveAttribute("aria-selected", "true");
    await page.keyboard.press("Home");
    await preview
      .getByRole("button", { name: "Previous course screen" })
      .click();
    await expect(lastTab).toHaveAttribute("aria-selected", "true");
    await preview.getByRole("button", { name: "Next course screen" }).click();
    await expect(
      preview.getByRole("tab", { name: "Welcome", exact: true }),
    ).toHaveAttribute("aria-selected", "true");
  }
  expect(errors).toEqual([]);
});

test("all project image galleries expand, navigate, trap focus and restore it on close", async ({
  page,
}) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  for (const project of projects) {
    await page.goto(`/work/${project.id}`);
    const gallery = page.getByRole("region", { name: "Course image gallery" });
    const images = gallery.locator(".course-gallery-grid .course-image-open");
    await expect(images).toHaveCount(3);
    await expect(gallery.locator(".course-gallery-note")).toContainText(
      "placeholders",
    );
    await images.first().click();
    const dialog = page.getByRole("dialog", {
      name: "Course image preview",
      exact: true,
    });
    await expect(dialog).toBeVisible();
    await expect(dialog.getByRole("img")).toHaveAccessibleName(
      /Welcome course image placeholder/,
    );
    expect(
      await page.evaluate(() => getComputedStyle(document.body).overflow),
    ).toBe("hidden");
    await dialog.getByRole("button", { name: "Next course image" }).click();
    await expect(dialog.locator("figcaption > span")).toHaveText(
      "Explore — 2 of 3",
    );
    await page.keyboard.press("ArrowRight");
    await expect(dialog.locator("figcaption > span")).toHaveText(
      "Take away — 3 of 3",
    );
    await page.keyboard.press("ArrowRight");
    await expect(dialog.locator("figcaption > span")).toHaveText(
      "Welcome — 1 of 3",
    );
    await dialog.getByRole("button", { name: "Previous course image" }).click();
    await expect(dialog.locator("figcaption > span")).toHaveText(
      "Take away — 3 of 3",
    );
    for (let i = 0; i < 4; i++) {
      await page.keyboard.press("Tab");
      expect(
        await dialog.evaluate((node) => node.contains(document.activeElement)),
      ).toBe(true);
    }
    await page.keyboard.press("Escape");
    await expect(dialog).not.toBeVisible();
    await expect(images.first()).toBeFocused();
    expect(
      await page.evaluate(() => getComputedStyle(document.body).overflow),
    ).toBe("visible");
    await images.last().click();
    await expect(dialog.locator("figcaption > span")).toHaveText(
      "Take away — 3 of 3",
    );
    await dialog
      .getByRole("button", { name: "Close course image preview" })
      .click();
    await expect(images.last()).toBeFocused();
  }
});

test("course screens, hotspots and cards hold their layout at narrow and wide sizes", async ({
  page,
}) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  for (const width of [320, 1440]) {
    await page.setViewportSize({ width, height: 1000 });
    for (const project of projects) {
      await page.goto(`/work/${project.id}`);
      await page.evaluate(() => document.fonts.ready);
      const preview = page.locator(".course-showcase");
      const frame = preview.locator(".course-player");
      const original = (await frame.boundingBox())!.height;
      for (const tab of await preview.getByRole("tab").all()) {
        await tab.click();
        expect(
          Math.abs((await frame.boundingBox())!.height - original),
        ).toBeLessThan(1);
      }
      for (const card of await preview.locator(".course-flip-card").all()) {
        await card.click();
        expect(
          Math.abs((await frame.boundingBox())!.height - original),
        ).toBeLessThan(1);
      }
      await preview.getByRole("tab", { name: "Explore", exact: true }).click();
      for (const spot of await preview
        .getByRole("group", { name: "Explore course hotspots" })
        .getByRole("button")
        .all()) {
        await spot.click();
        expect(
          Math.abs((await frame.boundingBox())!.height - original),
        ).toBeLessThan(1);
      }
      expect(
        await page.evaluate(
          () => document.documentElement.scrollWidth <= innerWidth,
        ),
        `overflow on ${project.id} at ${width}px`,
      ).toBe(true);
    }
  }
});

test("new course interactions animate and obey Butter's saved motion setting", async ({
  page,
}) => {
  await page.goto("/work/sustainability?motion=full");
  const preview = page.locator(".course-showcase");
  await preview.getByRole("tab", { name: "Take away", exact: true }).click();
  const card = preview.locator(".course-flip-card").first();
  await expect(card.locator(".course-flip-inner")).toHaveCSS(
    "transition-duration",
    "0.48s",
  );
  await card.click();
  await expect(card).toHaveAttribute("aria-pressed", "true");
  await page
    .getByRole("combobox", { name: "Motion preference" })
    .selectOption("reduced");
  await expect(card.locator(".course-flip-inner")).toHaveCSS(
    "transition-duration",
    "0s",
  );
  await card.click();
  await expect(card).toHaveAttribute("aria-pressed", "false");
  await page
    .getByRole("combobox", { name: "Motion preference" })
    .selectOption("full");
  await expect(card.locator(".course-flip-inner")).toHaveCSS(
    "transition-duration",
    "0.48s",
  );
});
