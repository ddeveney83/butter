import { test, expect, type Locator } from "@playwright/test";
import { projects, type Project } from "../src/data/projects";
import { coursePreviews } from "../src/data/coursePreviews";

async function exerciseInteraction(preview: Locator, project: Project) {
  const config = coursePreviews[project.id];
  await expect(preview.locator(".course-interaction")).toHaveAttribute(
    "data-interaction",
    config.interaction,
  );
  switch (config.interaction) {
    case "journey": {
      const steps = preview
        .getByRole("group", { name: "Explore your journey" })
        .getByRole("button");
      await steps.last().click();
      await expect(
        preview.locator(".course-hotspot-details > div").first(),
      ).toContainText(config.hotspots[2].detail);
      return async () => {
        await expect(steps.last()).toHaveAttribute("aria-pressed", "true");
      };
    }
    case "conversation": {
      const choices = preview
        .getByRole("group", { name: "Choose a preview response" })
        .getByRole("button");
      await choices.nth(1).click();
      return async () => {
        await expect(
          preview.locator(".course-activity-feedback [role=status]"),
        ).toContainText(project.choices[1].feedback);
      };
    }
    case "reflection": {
      const range = preview.getByRole("slider", {
        name: "Choose a reflection",
      });
      await range.focus();
      await range.press("ArrowRight");
      await preview.getByLabel("Your small step").fill("Take a small pause.");
      await preview.getByRole("button", { name: "Show a suggestion" }).click();
      return async () => {
        await expect(range).toHaveAttribute(
          "aria-valuetext",
          config.hotspots[1].label,
        );
        await expect(preview.getByLabel("Your small step")).toHaveValue(
          "Take a small pause.",
        );
        await expect(
          preview.locator(".course-reflection-prompt [role=status]"),
        ).toHaveText(config.cards[1].answer);
      };
    }
    case "quiz": {
      const check = preview.getByRole("button", { name: "Check my answer" });
      await expect(check).toBeDisabled();
      await preview.getByRole("radio").nth(1).check();
      await check.click();
      return async () => {
        await expect(
          preview.locator(".course-activity-feedback [role=status]"),
        ).toContainText("A useful next step.");
      };
    }
    case "sequence": {
      await preview.getByRole("button", { name: "Check the order" }).click();
      await expect(preview.locator(".course-sequence-status")).toContainText(
        "Try another order.",
      );
      const move = preview.getByRole("button", {
        name: `Move ${config.hotspots[2].label} down`,
      });
      await move.click();
      await move.click();
      await expect(move).toBeDisabled();
      await preview.getByRole("button", { name: "Check the order" }).click();
      return async () => {
        await expect(preview.locator(".course-sequence-status")).toContainText(
          "That’s it.",
        );
      };
    }
    case "hotspots": {
      const spots = preview
        .getByRole("group", { name: "Explore course hotspots" })
        .getByRole("button");
      await expect(spots).toHaveCount(3);
      await spots.last().click();
      return async () => {
        await expect(spots.last()).toHaveAttribute("aria-pressed", "true");
        await expect(
          preview.locator(".course-hotspot-details > div").first(),
        ).toContainText(config.hotspots[2].detail);
      };
    }
  }
}

test("all six course previews support distinct interactions, screen navigation, reveal cards and device views", async ({
  page,
}, testInfo) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  const errors: string[] = [];
  page.on("pageerror", (error) => errors.push(error.message));
  for (const project of projects.filter(
    (item) => item.filter === "eLearning",
  )) {
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
    const checkInteraction = await exerciseInteraction(preview, project);
    await checkInteraction();
    const width = (await preview.locator(".course-player").boundingBox())!
      .width;
    await preview.getByRole("button", { name: "Mobile", exact: true }).click();
    const mobileWidth = (await preview.locator(".course-player").boundingBox())!
      .width;
    expect(mobileWidth).toBeLessThanOrEqual(420);
    expect(mobileWidth).toBeLessThanOrEqual(width);
    await checkInteraction();
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

test("all project image galleries contain no copy, expand, navigate, trap focus and restore it on close", async ({
  page,
}) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  test.setTimeout(90000);
  for (const project of projects) {
    await page.goto(`/work/${project.id}`);
    const gallery = page.getByRole("region", { name: "Project image gallery" });
    const images = gallery.locator(".project-gallery-grid .project-image-open");
    await expect(images).toHaveCount(3);
    await expect(gallery.locator("h2, p, figcaption")).toHaveCount(0);
    await expect(page.locator(".project-gallery + .next-project")).toHaveCount(
      1,
    );
    await images.first().click();
    const dialog = page.getByRole("dialog", {
      name: `${project.title} image gallery`,
      exact: true,
    });
    await expect(dialog).toBeVisible();
    await expect(dialog.getByRole("img")).toHaveAccessibleName(
      `${project.title} — ${project.gallery[0].alt}`,
    );
    await expect
      .poll(() =>
        dialog
          .getByRole("img")
          .evaluate((image: HTMLImageElement) => image.naturalWidth),
      )
      .toBeGreaterThan(0);
    expect(
      await page.evaluate(() => getComputedStyle(document.body).overflow),
    ).toBe("hidden");
    await dialog.getByRole("button", { name: "Next project image" }).click();
    await expect(dialog.getByRole("status")).toHaveText(
      `${project.gallery[1].alt} — 2 of 3`,
    );
    await page.keyboard.press("ArrowRight");
    await expect(dialog.getByRole("status")).toHaveText(
      `${project.gallery[2].alt} — 3 of 3`,
    );
    await page.keyboard.press("ArrowRight");
    await expect(dialog.getByRole("status")).toHaveText(
      `${project.gallery[0].alt} — 1 of 3`,
    );
    await dialog
      .getByRole("button", { name: "Previous project image" })
      .click();
    await expect(dialog.getByRole("status")).toHaveText(
      `${project.gallery[2].alt} — 3 of 3`,
    );
    for (let i = 0; i < 4; i++) {
      await page.keyboard.press("Tab");
      expect(
        await dialog.evaluate((node) => node.contains(document.activeElement)),
      ).toBe(true);
    }
    await page.keyboard.press("Home");
    await expect(dialog.getByRole("status")).toHaveText(
      `${project.gallery[0].alt} — 1 of 3`,
    );
    await page.keyboard.press("End");
    await expect(dialog.getByRole("status")).toHaveText(
      `${project.gallery[2].alt} — 3 of 3`,
    );
    await page.keyboard.press("Escape");
    await expect(dialog).not.toBeVisible();
    await expect(images.first()).toBeFocused();
    expect(
      await page.evaluate(() => getComputedStyle(document.body).overflow),
    ).toBe("visible");
    await images.last().click();
    await expect(dialog.getByRole("status")).toHaveText(
      `${project.gallery[2].alt} — 3 of 3`,
    );
    await dialog
      .getByRole("button", { name: "Close project image preview" })
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
    for (const project of projects.filter(
      (item) => item.filter === "eLearning",
    )) {
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
      const checkInteraction = await exerciseInteraction(preview, project);
      await checkInteraction();
      expect(
        Math.abs((await frame.boundingBox())!.height - original),
      ).toBeLessThan(1);
      expect(
        await page.evaluate(
          () => document.documentElement.scrollWidth <= innerWidth,
        ),
        `overflow on ${project.id} at ${width}px`,
      ).toBe(true);
    }
  }
});

test("new course interactions animate and obey butter's saved motion setting", async ({
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
