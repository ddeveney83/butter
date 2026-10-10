import { test, expect, type Page } from "@playwright/test";

async function hasSmear(page: Page) {
  return page
    .locator(".butter-cursor-trail")
    .evaluate((canvas: HTMLCanvasElement) => {
      const pixels = canvas
        .getContext("2d")!
        .getImageData(0, 0, canvas.width, canvas.height).data;
      for (let i = 3; i < pixels.length; i += 4) if (pixels[i]) return true;
      return false;
    });
}

test("full motion restores actual transitions and smear with device animations disabled", async ({
  page,
}, testInfo) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.addInitScript(() => {
    const native = document.startViewTransition.bind(document);
    const samples: number[] = [];
    (window as typeof window & { pageFadeSamples: number[] }).pageFadeSamples =
      samples;
    document.startViewTransition = (...args) => {
      const transition = native(...args);
      transition.ready
        .then(() => {
          let finished = false;
          transition.finished.then(() => {
            finished = true;
          });
          function sample() {
            samples.push(
              Number(
                getComputedStyle(
                  document.documentElement,
                  "::view-transition-new(butter-page)",
                ).opacity,
              ),
            );
            if (!finished) requestAnimationFrame(sample);
          }
          requestAnimationFrame(sample);
        })
        .catch(() => {});
      return transition;
    };
  });
  await page.goto("/");
  const setting = page.getByRole("combobox", { name: "Motion preference" });
  await expect(page.locator("html")).toHaveAttribute("data-motion", "reduced");
  await expect(page.locator(".hero-character")).toHaveCSS(
    "animation-name",
    "none",
  );
  await expect(page.locator(".butter-cursor-trail")).toHaveCount(0);
  await expect(setting).toHaveValue("system");
  await setting.selectOption("full");
  await expect(page.locator("html")).toHaveAttribute("data-motion", "full");
  expect(
    await page.evaluate(
      () => matchMedia("(prefers-reduced-motion: reduce)").matches,
    ),
  ).toBe(true);
  await expect(page.locator(".hero-character")).toHaveCSS(
    "animation-name",
    "float",
  );
  await page
    .locator(".footer-nav")
    .getByRole("link", { name: "Services", exact: true })
    .click();
  await expect(page).toHaveURL(/\/services$/);
  await expect
    .poll(() =>
      page.evaluate(() =>
        (
          window as typeof window & { pageFadeSamples: number[] }
        ).pageFadeSamples.some((opacity) => opacity > 0 && opacity < 1),
      ),
    )
    .toBe(true);
  await expect
    .poll(() =>
      page.evaluate(() =>
        document.documentElement.matches(":active-view-transition"),
      ),
    )
    .toBe(false);
  await expect(page.locator(".accordion-panel").first()).toHaveCSS(
    "transition-duration",
    "0.32s, 0.22s, 0s",
  );
  await page.getByRole("tab", { name: "03 / Make" }).click();
  expect(
    await page
      .locator('.tab-panel[aria-hidden="false"]')
      .evaluate((node) =>
        node
          .getAnimations()
          .map((animation) => animation.effect?.getTiming().duration),
      ),
  ).toContain(320);
  if (testInfo.project.name === "desktop") {
    await page.mouse.move(200, 300);
    await page.mouse.move(650, 350, { steps: 30 });
    await expect.poll(() => hasSmear(page)).toBe(true);
  } else await expect(page.locator(".butter-cursor-trail")).toHaveCount(0);
  await page.reload();
  await expect(setting).toHaveValue("full");
  await expect(page.locator("html")).toHaveAttribute("data-motion", "full");
  await setting.selectOption("system");
  await expect(page.locator("html")).toHaveAttribute("data-motion", "reduced");
  await expect(page.locator(".accordion-panel").first()).toHaveCSS(
    "transition-duration",
    "0s",
  );
  await expect(page.locator(".butter-cursor-trail")).toHaveCount(0);
  await expect(page.locator(".reveal").first()).toHaveCSS("opacity", "1");
  await page.emulateMedia({ reducedMotion: "no-preference" });
  await expect(page.locator("html")).toHaveAttribute("data-motion", "full");
  await setting.selectOption("reduced");
  await page.reload();
  await expect(setting).toHaveValue("reduced");
  await expect(page.locator("html")).toHaveAttribute("data-motion", "reduced");
});

test("explicit motion link works with blocked storage and keeps the setting during navigation", async ({
  page,
}, testInfo) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.addInitScript(() => {
    for (const method of ["getItem", "setItem"])
      Object.defineProperty(Storage.prototype, method, {
        value: () => {
          throw new DOMException("Storage blocked", "SecurityError");
        },
        configurable: true,
      });
  });
  const errors: string[] = [];
  page.on("pageerror", (error) => errors.push(error.message));
  await page.goto("/?motion=full#main");
  await expect(page).toHaveURL(/\/#main$/);
  await expect(
    page.getByRole("combobox", { name: "Motion preference" }),
  ).toHaveValue("full");
  await expect(page.locator(".hero-character")).toHaveCSS(
    "animation-name",
    "float",
  );
  if (testInfo.project.name === "desktop")
    await expect(page.locator(".butter-cursor-trail")).toHaveCount(1);
  await page
    .locator(".footer-nav")
    .getByRole("link", { name: "Work", exact: true })
    .click();
  await expect(page).toHaveURL(/\/work$/);
  await expect(page.locator("html")).toHaveAttribute("data-motion", "full");
  await expect(
    page.getByRole("combobox", { name: "Motion preference" }),
  ).toHaveValue("full");
  await page.reload();
  await expect(page.locator("html")).toHaveAttribute("data-motion", "reduced");
  expect(errors).toEqual([]);
});

test("a motion link is consumed so a later user choice survives reload", async ({
  page,
}) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/?motion=full");
  await expect(page).toHaveURL(/\/$/);
  const setting = page.getByRole("combobox", { name: "Motion preference" });
  await expect(setting).toHaveValue("full");
  await setting.selectOption("reduced");
  await page.reload();
  await expect(setting).toHaveValue("reduced");
  await expect(page.locator("html")).toHaveAttribute("data-motion", "reduced");
});
