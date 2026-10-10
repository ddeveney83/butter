import { test, expect } from "@playwright/test";

test("brand guide is discoverable, loads directly and fits small screens", async ({
  page,
}) => {
  const errors: string[] = [];
  page.on("pageerror", (error) => errors.push(error.message));
  await page.goto("/");
  await page
    .getByRole("navigation", { name: "Footer navigation" })
    .getByRole("link", { name: "Brand guide" })
    .click();
  await expect(page).toHaveURL(/\/brand$/);
  await expect(page.getByRole("heading", { level: 1 })).toBeFocused();
  await expect(page).toHaveTitle("Butter — The Butter way.");
  await page.reload();
  await expect(page.getByRole("heading", { level: 1 })).toHaveText(
    "The Butterway.",
  );
  const sections = page.getByRole("navigation", {
    name: "Brand guide sections",
  });
  await expect(sections.getByRole("link")).toHaveCount(8);
  await sections.getByRole("link", { name: "Colours", exact: true }).click();
  await expect(page).toHaveURL(/#colours$/);
  await expect(
    page.getByRole("button", { name: "Copy Butter yellow" }),
  ).toBeInViewport();
  for (const width of [320, 390, 768, 1440]) {
    await page.setViewportSize({ width, height: 900 });
    await page.evaluate(() => document.fonts.ready);
    expect(
      await page.evaluate(
        () => document.documentElement.scrollWidth <= innerWidth,
      ),
      `overflow at ${width}`,
    ).toBe(true);
  }
  expect(errors).toEqual([]);
});

test("swatches copy actual shared colours and explain clipboard failures", async ({
  page,
}) => {
  await page.goto("/brand");
  await page.evaluate(() =>
    Object.defineProperty(navigator, "clipboard", {
      configurable: true,
      value: {
        writeText: async (value: string) => {
          document.documentElement.dataset.copiedHex = value;
        },
      },
    }),
  );
  for (const [name, token, hex] of [
    ["Butter yellow", "--butter", "#F8E477"],
    ["Ink", "--ink", "#20201D"],
    ["Paper", "--paper", "#FDFCF8"],
    ["Line", "--line", "#D9D9CF"],
  ]) {
    const swatch = page.getByRole("button", { name: `Copy ${name}` });
    await expect(swatch).toContainText(hex);
    expect(
      await page.evaluate(
        (token) =>
          getComputedStyle(document.documentElement)
            .getPropertyValue(token)
            .trim()
            .toUpperCase(),
        token,
      ),
    ).toBe(hex);
    await swatch.focus();
    await page.keyboard.press("Enter");
    await expect(page.locator("html")).toHaveAttribute("data-copied-hex", hex);
    await expect(page.locator(".brand-copy-status")).toHaveText(
      `${name} ${hex} copied.`,
    );
  }
  await page.evaluate(() =>
    Object.defineProperty(navigator, "clipboard", {
      configurable: true,
      value: {
        writeText: async () => {
          throw new Error("Clipboard unavailable");
        },
      },
    }),
  );
  await page.getByRole("button", { name: "Copy Butter yellow" }).click();
  await expect(page.locator(".brand-copy-status")).toHaveText(
    "Copy this value manually: #F8E477",
  );
});

test("typography playground keeps text and layout through keyboard tab changes", async ({
  page,
}) => {
  await page.goto("/brand");
  const type = page.locator("#type");
  await type.getByLabel("Try your words").fill("Make it memorable.");
  await expect(type.locator(".brand-type-heading")).toHaveText(
    "Make it memorable.",
  );
  await expect(type.locator(".brand-type-heading")).toHaveCSS(
    "font-weight",
    "800",
  );
  const before = (await type.locator(".tab-panels").boundingBox())!.height;
  await type.getByRole("tab", { name: "Heading", exact: true }).focus();
  await page.keyboard.press("ArrowRight");
  await expect(
    type.getByRole("tab", { name: "Body", exact: true }),
  ).toBeFocused();
  await expect(type.getByRole("tabpanel")).toContainText("Make it memorable.");
  await expect(type.locator(".brand-type-body").first()).toHaveCSS(
    "font-weight",
    "400",
  );
  await page.keyboard.press("End");
  await expect(
    type.getByRole("tab", { name: "Interface", exact: true }),
  ).toBeFocused();
  await expect(type.locator(".brand-type-interface")).toHaveText(
    "Make it memorable.",
  );
  expect(
    Math.abs(
      (await type.locator(".tab-panels").boundingBox())!.height - before,
    ),
  ).toBeLessThan(2);
  await page.keyboard.press("Home");
  await expect(
    type.getByRole("tab", { name: "Heading", exact: true }),
  ).toBeFocused();
  await type.getByLabel("Try your words").fill("B".repeat(72));
  await page.setViewportSize({ width: 320, height: 900 });
  expect(
    await page.evaluate(
      () => document.documentElement.scrollWidth <= innerWidth,
    ),
  ).toBe(true);
  await type.getByLabel("Try your words").fill("");
  await expect(type.locator(".brand-type-heading")).toHaveText(
    "Learning with feeling.",
  );
});

test("voice examples and component samples work with keyboard and touch", async ({
  page,
}) => {
  await page.goto("/brand");
  const voice = page.locator("#voice");
  await voice.getByRole("tab", { name: "Learning", exact: true }).click();
  await expect(voice.getByRole("tabpanel")).toContainText(
    "What would you do next?",
  );
  const height = (await voice.locator(".tab-panels").boundingBox())!.height;
  await page.keyboard.press("ArrowRight");
  await expect(
    voice.getByRole("tab", { name: "Email", exact: true }),
  ).toBeFocused();
  await expect(voice.getByRole("tabpanel")).toContainText(
    "Tell us what you’re working on",
  );
  expect(
    Math.abs(
      (await voice.locator(".tab-panels").boundingBox())!.height - height,
    ),
  ).toBeLessThan(2);
  const detail = page.getByRole("button", {
    name: "A little room for detail.",
    exact: true,
  });
  await detail.focus();
  await page.keyboard.press("Enter");
  await expect(detail).toHaveAttribute("aria-expanded", "true");
  await expect(
    page.getByRole("region", { name: "A little room for detail." }),
  ).toBeVisible();
  await page.keyboard.press("Enter");
  await expect(detail).toHaveAttribute("aria-expanded", "false");
  await page
    .getByLabel("Your email", { exact: true })
    .fill("hello@example.com");
  await expect(page.getByLabel("Your email", { exact: true })).toHaveValue(
    "hello@example.com",
  );
  await page.getByRole("link", { name: "Let’s talk", exact: true }).click();
  await expect(page).toHaveURL(/\/contact$/);
});

test("motion example renders an eased movement and respects reduced motion", async ({
  page,
}) => {
  await page.emulateMedia({ reducedMotion: "no-preference" });
  await page.goto("/brand");
  const button = page.getByRole("button", { name: "Play motion", exact: true });
  await button.scrollIntoViewIfNeeded();
  const frames = await button.evaluate(
    (button) =>
      new Promise<number[]>((resolve) => {
        const values: number[] = [];
        const start = performance.now();
        (button as HTMLButtonElement).click();
        function sample() {
          const ball =
            document.querySelector<HTMLElement>(".brand-motion-ball")!;
          const width = ball.parentElement!.clientWidth - 32;
          values.push(parseFloat(getComputedStyle(ball).left) / width);
          if (performance.now() - start < 800) requestAnimationFrame(sample);
          else resolve(values);
        }
        requestAnimationFrame(sample);
      }),
  );
  expect(frames.some((value) => value > 0.01 && value < 0.99)).toBe(true);
  expect(frames[frames.length - 1]).toBeCloseTo(1, 1);
  await page.emulateMedia({ reducedMotion: "reduce" });
  await expect(page.locator("html")).toHaveAttribute("data-motion", "reduced");
  await page.getByRole("button", { name: "Play again", exact: true }).click();
  await expect(page.locator(".brand-motion-ball")).toHaveCSS(
    "animation-name",
    "none",
  );
  await expect(page.locator(".brand-motion-demo [role=status]")).toContainText(
    "Reduced motion is active.",
  );
  const end = await page.locator(".brand-motion-ball").evaluate((ball) => ({
    x: parseFloat(getComputedStyle(ball).left),
    end: ball.parentElement!.clientWidth - 32,
  }));
  expect(end.x).toBeCloseTo(end.end, 0);
});
