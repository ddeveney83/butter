import { test, expect } from "@playwright/test";

import { projects as catalogue, projectAliases } from "../src/data/projects";
const projects = catalogue.map((project) => [project.id, project.title]);
const learningProjects = catalogue
  .filter((project) => project.filter === "eLearning")
  .map((project) => [project.id, project.title]);

async function openMenuIfMobile(
  page: import("@playwright/test").Page,
  project: string,
) {
  if (project === "mobile")
    await page.getByRole("button", { name: "Menu", exact: true }).click();
}

test("all pages and eight project routes load directly without errors or overflow", async ({
  page,
}) => {
  const errors: string[] = [];
  page.on("pageerror", (error) => errors.push(error.message));
  for (const path of [
    "/",
    "/about",
    "/services",
    "/work",
    "/pricing",
    "/contact",
    "/brand",
    ...projects.map(([slug]) => `/work/${slug}`),
  ]) {
    await page.goto(path);
    await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
    await expect(page).toHaveTitle(/^Butter — /);
    await page.evaluate(() => document.fonts.ready);
    expect(
      await page.evaluate(
        () => document.documentElement.scrollWidth <= window.innerWidth,
      ),
      `overflow at ${path}`,
    ).toBe(true);
  }
  expect(errors).toEqual([]);
});

test("navigation supports separate pages, active links, browser history and mobile Escape", async ({
  page,
}, testInfo) => {
  await page.goto("/");
  await openMenuIfMobile(page, testInfo.project.name);
  const nav = page.getByRole("navigation", { name: "Main navigation" });
  await nav.getByRole("link", { name: "Services", exact: true }).click();
  await expect(page).toHaveURL(/\/services$/);
  await expect(page.getByRole("heading", { level: 1 })).toBeFocused();
  await openMenuIfMobile(page, testInfo.project.name);
  await expect(
    nav.getByRole("link", { name: "Services", exact: true }),
  ).toHaveAttribute("aria-current", "page");
  await nav.getByRole("link", { name: "About", exact: true }).click();
  await expect(page).toHaveURL(/\/about$/);
  await page.goBack();
  await expect(page).toHaveURL(/\/services$/);
  await expect(page.getByRole("heading", { level: 1 })).toBeFocused();
  if (testInfo.project.name === "mobile") {
    await page.getByRole("button", { name: "Menu", exact: true }).click();
    await expect(
      page.getByRole("button", { name: "Close", exact: true }),
    ).toHaveAttribute("aria-expanded", "true");
    await page.keyboard.press("Escape");
    await expect(
      page.getByRole("button", { name: "Menu", exact: true }),
    ).toHaveAttribute("aria-expanded", "false");
    await expect(
      page.getByRole("button", { name: "Menu", exact: true }),
    ).toBeFocused();
  }
});

test("work has eight pieces and shareable filters that persist on reload and Back", async ({
  page,
}) => {
  await page.goto("/work");
  await expect(page.locator(".work-gallery .project")).toHaveCount(8);
  await expect(page.getByRole("status")).toHaveText("08 projects");
  await page.getByRole("button", { name: "LMS", exact: true }).click();
  await expect(page.locator(".work-gallery .project")).toHaveCount(2);
  await expect(page.getByRole("status")).toHaveText("02 projects");
  await page.reload();
  await expect(
    page.getByRole("button", { name: "LMS", exact: true }),
  ).toHaveAttribute("aria-pressed", "true");
  await page
    .getByRole("link", { name: "Explore Nansen Learning Academy" })
    .click();
  await expect(page).toHaveURL(/\/work\/nansen-learning-academy$/);
  await page.goBack();
  await expect(page.locator(".work-gallery .project")).toHaveCount(2);
  await page.getByRole("button", { name: "eLearning", exact: true }).click();
  await expect(page.locator(".work-gallery .project")).toHaveCount(6);
  await page.getByRole("button", { name: "All work", exact: true }).click();
  await expect(page.locator(".work-gallery .project")).toHaveCount(8);
});

test("every project has a working learning sample and next-project navigation", async ({
  page,
}) => {
  for (const [slug, title] of learningProjects) {
    await page.goto(`/work/${slug}`);
    await expect(page.getByRole("heading", { level: 1 })).toHaveText(title);
    const choice = page
      .getByRole("group", { name: "Choose a response" })
      .getByRole("button")
      .nth(1);
    await choice.click();
    await expect(choice).toHaveAttribute("aria-pressed", "true");
    await expect(page.getByRole("status")).not.toContainText(
      "There’s space to explore.",
    );
    await expect(page.getByRole("status")).toContainText(/\w{5}/);
    await page
      .getByRole("button", { name: "Try a different response" })
      .click();
    await expect(page.getByRole("status")).toContainText(
      "There’s space to explore.",
    );
  }
  await page.locator(".next-project a").click();
  await expect(page).toHaveURL(/\/work\/your-learning-platform$/);
  await expect(
    page.getByRole("button", { name: "Try a different response" }),
  ).toHaveCount(0);
});

test("values and process tabs work with pointer and keyboard; services expand", async ({
  page,
}) => {
  await page.goto("/about");
  await page.getByRole("tab", { name: "Keep it clear." }).click();
  await expect(page.getByRole("tabpanel")).toContainText(
    "Clarity is a creative act.",
  );
  await page.keyboard.press("ArrowRight");
  await expect(page.getByRole("tab", { name: "Make it human." })).toBeFocused();
  await expect(page.getByRole("tabpanel")).toContainText(
    "People before platforms.",
  );
  await page.goto("/services");
  await page
    .getByRole("button", { name: "Digital experiences", exact: true })
    .click();
  await expect(
    page.getByText("Mobile-first microlearning", { exact: true }),
  ).toBeVisible();
  await page.getByRole("tab", { name: "03 / Make" }).click();
  await expect(page.getByRole("tabpanel")).toContainText(
    "Make every detail count.",
  );
  await page.keyboard.press("Home");
  await expect(page.getByRole("tabpanel")).toContainText(
    "First, we get curious.",
  );
});

test("pricing model and calculator update real totals and carry the estimate into contact", async ({
  page,
}) => {
  await page.goto("/pricing");
  await expect(page.locator(".pricing-cards")).toContainText("£7,500");
  await page
    .getByRole("button", { name: "Ongoing support", exact: true })
    .click();
  await expect(page.locator(".pricing-cards")).toContainText("£3,500");
  await expect(page.locator(".pricing-cards")).toContainText("/ month");
  await page
    .getByRole("button", { name: "One-off project", exact: true })
    .click();
  await expect(page.locator(".pricing-cards")).toContainText("£7,500");
  await expect(
    page.getByLabel("Illustrative project budget", { exact: true }),
  ).toHaveText("£2,500");
  await page.getByLabel("What are we making?").selectOption("7500");
  const range = page.getByRole("slider");
  await range.focus();
  await page.keyboard.press("ArrowRight");
  await page.getByLabel("Branching scenarios").check();
  await page.getByLabel("Bespoke motion").check();
  await expect(
    page.getByLabel("Illustrative project budget", { exact: true }),
  ).toHaveText("£21,300");
  await page.getByRole("link", { name: "Discuss this estimate" }).click();
  await expect(page).toHaveURL(/\/contact\?brief=/);
  await expect(page.getByLabel("A little about your project")).toHaveValue(
    /£21,300/,
  );
  await expect(page.getByLabel("A little about your project")).toHaveValue(
    /2 pieces/,
  );
});

test("contact validates fields, creates a complete draft and clears it after an edit", async ({
  page,
}) => {
  await page.goto("/contact?service=Learning%20strategy");
  await expect(
    page.getByRole("button", { name: "Learning strategy", exact: true }),
  ).toHaveAttribute("aria-pressed", "true");
  await page.getByRole("button", { name: "Create an email draft" }).click();
  expect(
    await page
      .getByLabel("Your name")
      .evaluate((input: HTMLInputElement) => input.validity.valueMissing),
  ).toBe(true);
  await page.getByLabel("Your name").fill("Alex Example");
  await page.getByLabel("Your email").fill("invalid-email");
  expect(
    await page
      .getByLabel("Your email")
      .evaluate((input: HTMLInputElement) => input.validity.typeMismatch),
  ).toBe(true);
  await page.getByLabel("Your email").fill("alex@example.com");
  await page.getByLabel("Company").fill("Example Team");
  await page
    .getByLabel("A little about your project")
    .fill("An onboarding experience for our team.");
  await page
    .getByRole("combobox", { name: "Budget", exact: true })
    .selectOption("£7,500–£15,000");
  await page
    .getByRole("combobox", { name: "Timing", exact: true })
    .selectOption("In 1–3 months");
  await page.getByRole("button", { name: "Create an email draft" }).click();
  const draft = await page
    .getByRole("link", { name: "Open email draft" })
    .getAttribute("href");
  expect(decodeURIComponent(draft!.split("?")[0])).toBe(
    "mailto:ddeveney83@gmail.com",
  );
  const body = new URLSearchParams(draft!.split("?")[1]).get("body");
  for (const content of [
    "An onboarding experience",
    "Alex Example",
    "alex@example.com",
    "Example Team",
    "Learning strategy",
    "£7,500–£15,000",
    "In 1–3 months",
  ])
    expect(body).toContain(content);
  await expect(page.getByRole("status")).toContainText(
    "Nothing has been sent yet.",
  );
  await page.getByLabel("Your name").fill("Alex Updated");
  await expect(
    page.getByRole("link", { name: "Open email draft" }),
  ).toHaveCount(0);
  await expect(
    page.getByRole("button", { name: "Create an email draft" }),
  ).toBeVisible();
});

test("FAQ, reduced motion and unknown routes behave correctly", async ({
  page,
}) => {
  await page.goto("/pricing");
  await page
    .getByRole("button", { name: "Can we start small?", exact: true })
    .click();
  await expect(page.getByText(/Absolutely\. A focused workshop/)).toBeVisible();
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/");
  expect(
    await page
      .locator(".hero-character")
      .evaluate((node) => getComputedStyle(node).animationName),
  ).toBe("none");
  await page.goto("/work/not-a-project");
  await expect(page.getByRole("heading", { level: 1 })).toHaveText(
    "A littlelost?",
  );
  await page.getByRole("link", { name: "Back to Butter" }).click();
  await expect(page).toHaveURL(/\/$/);
});

test("tabs preserve layout across screen sizes and keep every panel correctly linked", async ({
  page,
}) => {
  for (const width of [320, 390, 768, 1440]) {
    await page.setViewportSize({ width, height: 900 });
    for (const path of ["/about", "/services"]) {
      await page.goto(path);
      await page.evaluate(() => document.fonts.ready);
      const tabs = page.getByRole("tab");
      const panels = page.locator(".tab-panels");
      const initial = (await panels.boundingBox())!;
      for (const tab of await tabs.all()) {
        await tab.click();
        const bounds = (await panels.boundingBox())!;
        expect(Math.abs(bounds.height - initial.height)).toBeLessThan(1);
        const controlledId = await tab.getAttribute("aria-controls");
        await expect(page.getByRole("tabpanel")).toHaveAttribute(
          "id",
          controlledId!,
        );
        await expect(page.getByRole("tabpanel")).toHaveAttribute(
          "aria-labelledby",
          (await tab.getAttribute("id"))!,
        );
        expect(
          await page
            .locator('.tab-panel[aria-hidden="true"]')
            .evaluateAll((nodes) =>
              nodes.every((node) => node.hasAttribute("inert")),
            ),
        ).toBe(true);
      }
      await page.keyboard.press("Home");
      await expect(tabs.first()).toBeFocused();
      await page.keyboard.press("ArrowLeft");
      await expect(tabs.last()).toBeFocused();
      await page.keyboard.press("ArrowRight");
      await expect(tabs.first()).toBeFocused();
      await page.keyboard.press("End");
      await expect(tabs.last()).toBeFocused();
      expect(
        await page.evaluate(
          () => document.documentElement.scrollWidth <= innerWidth,
        ),
      ).toBe(true);
    }
  }
});

test("accordions support keyboard activation, complete collapse and rapid toggling", async ({
  page,
}) => {
  for (const [path, title] of [
    ["/services", "Digital experiences"],
    ["/pricing", "Can we start small?"],
  ]) {
    await page.goto(path);
    const trigger = page.getByRole("button", { name: title, exact: true });
    const accordion = trigger.locator(
      'xpath=ancestor::div[contains(@class,"accordion")][1]',
    );
    const panel = accordion.locator(".accordion-panel");
    await trigger.focus();
    await page.keyboard.press("Enter");
    await expect(trigger).toHaveAttribute("aria-expanded", "true");
    await expect(panel).toHaveAttribute("aria-hidden", "false");
    await expect
      .poll(async () => (await panel.boundingBox())!.height)
      .toBeGreaterThan(50);
    await page.keyboard.press("Space");
    await expect(trigger).toHaveAttribute("aria-expanded", "false");
    await expect(panel).toHaveAttribute("inert", "");
    await expect
      .poll(async () => (await panel.boundingBox())!.height)
      .toBeLessThan(1);
    await trigger.evaluate((button: HTMLButtonElement) => {
      button.click();
      button.click();
      button.click();
    });
    await expect(trigger).toHaveAttribute("aria-expanded", "true");
    await expect
      .poll(async () => (await panel.boundingBox())!.height)
      .toBeGreaterThan(50);
    await trigger.evaluate((button: HTMLButtonElement) => {
      button.click();
      button.click();
    });
    await expect(trigger).toHaveAttribute("aria-expanded", "true");
    await page.emulateMedia({ reducedMotion: "reduce" });
    await trigger.click();
    expect(
      await panel.evaluate((node) =>
        getComputedStyle(node)
          .transitionDuration.split(",")
          .every((value) => parseFloat(value) <= 0.001),
      ),
    ).toBe(true);
    await expect(trigger).toBeFocused();
  }
});

test("expanded controls and maximum estimates fit on narrow screens without shifting sample feedback", async ({
  page,
}) => {
  await page.setViewportSize({ width: 320, height: 844 });
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/pricing");
  await page.getByLabel("What are we making?").selectOption("15000");
  await page.getByRole("slider").fill("6");
  await page.getByLabel("Branching scenarios").check();
  await page.getByLabel("Bespoke motion").check();
  await expect(
    page.getByLabel("Illustrative project budget", { exact: true }),
  ).toHaveText("£122,400");
  await page
    .getByRole("button", { name: "Ongoing support", exact: true })
    .click();
  for (const button of await page.locator(".faq-list .accordion-trigger").all())
    await button.click();
  expect(
    await page.evaluate(
      () => document.documentElement.scrollWidth <= innerWidth,
    ),
  ).toBe(true);
  await page.goto("/services");
  for (const button of await page
    .locator(".service-detail .accordion-trigger")
    .all()) {
    if ((await button.getAttribute("aria-expanded")) === "false")
      await button.click();
  }
  expect(
    await page.evaluate(
      () => document.documentElement.scrollWidth <= innerWidth,
    ),
  ).toBe(true);
  await page.goto(
    "/contact?service=" +
      encodeURIComponent(
        "An exceptionally long bespoke learning programme and ongoing production support",
      ),
  );
  expect(
    await page.evaluate(
      () => document.documentElement.scrollWidth <= innerWidth,
    ),
  ).toBe(true);
  for (const [slug] of learningProjects) {
    await page.goto(`/work/${slug}`);
    await page.evaluate(() => document.fonts.ready);
    const sample = page.locator(".scenario-card");
    const height = (await sample.boundingBox())!.height;
    for (const button of await page
      .getByRole("group", { name: "Choose a response" })
      .getByRole("button")
      .all()) {
      await button.click();
      expect(
        Math.abs((await sample.boundingBox())!.height - height),
      ).toBeLessThan(1);
      expect(
        await page.evaluate(
          () => document.documentElement.scrollWidth <= innerWidth,
        ),
      ).toBe(true);
    }
    await page
      .getByRole("button", { name: "Try a different response" })
      .click();
    expect(
      Math.abs((await sample.boundingBox())!.height - height),
    ).toBeLessThan(1);
  }
});

test("page crossfades complete and interrupted navigation settles on the final page", async ({
  page,
}, testInfo) => {
  await page.addInitScript(() => {
    const start = document.startViewTransition.bind(document);
    const metrics = { started: 0, finished: 0, animation: "", duration: "" };
    (
      window as typeof window & { motionMetrics: typeof metrics }
    ).motionMetrics = metrics;
    document.startViewTransition = (...args) => {
      metrics.started++;
      const transition = start(...args);
      transition.ready
        .then(() => {
          const style = getComputedStyle(
            document.documentElement,
            "::view-transition-new(butter-page)",
          );
          metrics.animation = style.animationName;
          metrics.duration = style.animationDuration;
        })
        .catch(() => {});
      transition.finished
        .then(() => {
          metrics.finished++;
        })
        .catch(() => {});
      return transition;
    };
  });
  await page.goto("/");
  await openMenuIfMobile(page, testInfo.project.name);
  await page
    .getByRole("navigation", { name: "Main navigation" })
    .getByRole("link", { name: "Services", exact: true })
    .click();
  await expect(page).toHaveURL(/\/services$/);
  await expect
    .poll(() =>
      page.evaluate(
        () =>
          (window as typeof window & { motionMetrics: { finished: number } })
            .motionMetrics.finished,
      ),
    )
    .toBe(1);
  expect(
    await page.evaluate(
      () =>
        (
          window as typeof window & {
            motionMetrics: { animation: string; duration: string };
          }
        ).motionMetrics,
    ),
  ).toMatchObject({ animation: "page-arrive", duration: "0.42s" });
  await expect(page.getByRole("heading", { level: 1 })).toBeFocused();
  await page.locator(".footer-nav a").evaluateAll((links) => {
    (links[2] as HTMLAnchorElement).click();
    (links[3] as HTMLAnchorElement).click();
  });
  await expect(page).toHaveURL(/\/pricing$/);
  await expect
    .poll(() =>
      page.evaluate(() =>
        document.documentElement.matches(":active-view-transition"),
      ),
    )
    .toBe(false);
  await expect(page.getByRole("heading", { level: 1 })).toBeFocused();
  await expect(page.locator("main")).toHaveCSS("opacity", "1");
  await expect(page.locator("main")).toHaveCSS("animation-name", "none");
  await page.goBack();
  await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
});

test("motion preferences update live and browsers without view transitions retain navigation", async ({
  page,
}, testInfo) => {
  await page.goto("/work");
  await page.emulateMedia({ reducedMotion: "reduce" });
  await expect(page.locator(".work-gallery .reveal").last()).toHaveCSS(
    "opacity",
    "1",
  );
  await expect(page.locator(".work-gallery .reveal").last()).toHaveCSS(
    "translate",
    "none",
  );
  await expect(page.locator("main")).toHaveCSS("animation-name", "none");
  await page.evaluate(() => {
    document.startViewTransition = () => {
      throw new Error("Reduced motion must bypass page transitions");
    };
  });
  const errors: string[] = [];
  page.on("pageerror", (error) => errors.push(error.message));
  await openMenuIfMobile(page, testInfo.project.name);
  await page
    .getByRole("navigation", { name: "Main navigation" })
    .getByRole("link", { name: "About", exact: true })
    .click();
  await expect(page).toHaveURL(/\/about$/);
  await expect(page.getByRole("heading", { level: 1 })).toBeFocused();
  expect(errors).toEqual([]);
  await page.evaluate(() =>
    Object.defineProperty(document, "startViewTransition", {
      value: undefined,
      configurable: true,
    }),
  );
  await page.emulateMedia({ reducedMotion: "no-preference" });
  await openMenuIfMobile(page, testInfo.project.name);
  await page
    .getByRole("navigation", { name: "Main navigation" })
    .getByRole("link", { name: "Services", exact: true })
    .click();
  await expect(page).toHaveURL(/\/services$/);
  await expect(page.getByRole("heading", { level: 1 })).toBeFocused();
  await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
  expect(errors).toEqual([]);
});

test("visible sections establish a hidden frame and then actually fade into view", async ({
  page,
}) => {
  await page.setViewportSize({ width: 1440, height: 1200 });
  await page.addInitScript(() => {
    const NativeObserver = window.IntersectionObserver;
    const samples: { start: number; during: number; duration: number }[] = [];
    (window as typeof window & { revealFrames: typeof samples }).revealFrames =
      samples;
    window.IntersectionObserver = class extends NativeObserver {
      constructor(
        callback: IntersectionObserverCallback,
        options?: IntersectionObserverInit,
      ) {
        super((entries, observer) => {
          const visibleCards = entries.filter(
            (entry) =>
              entry.isIntersecting &&
              entry.target.classList.contains("pricing-card"),
          );
          const starts = visibleCards.map((entry) =>
            Number(getComputedStyle(entry.target).opacity),
          );
          callback(entries, observer);
          requestAnimationFrame(() => {
            visibleCards.forEach((entry, index) => {
              const during = Number(getComputedStyle(entry.target).opacity);
              const fade = entry.target
                .getAnimations()
                .find(
                  (animation) =>
                    (animation as CSSTransition).transitionProperty ===
                    "opacity",
                );
              samples.push({
                start: starts[index],
                during,
                duration: Number(fade?.effect?.getTiming().duration || 0),
              });
            });
          });
        }, options);
      }
    };
  });
  await page.goto("/pricing");
  await expect
    .poll(() =>
      page.evaluate(
        () =>
          (window as typeof window & { revealFrames: unknown[] }).revealFrames
            .length,
      ),
    )
    .toBeGreaterThan(0);
  const frames = await page.evaluate(
    () =>
      (
        window as typeof window & {
          revealFrames: { start: number; during: number; duration: number }[];
        }
      ).revealFrames,
  );
  for (const frame of frames) {
    expect(frame.start).toBe(0);
    expect(frame.during).toBeLessThan(1);
    expect(frame.duration).toBe(520);
  }
  await expect(page.locator(".pricing-card").first()).toHaveCSS("opacity", "1");
});

test("previous portfolio URLs resolve to the matching sourced work", async ({
  page,
}) => {
  for (const [oldSlug, slug] of Object.entries(projectAliases)) {
    await page.goto(`/work/${oldSlug}?view=sample`);
    await expect(page).toHaveURL(new RegExp(`/work/${slug}\\?view=sample$`));
    await expect(page.getByRole("heading", { level: 1 })).toHaveText(
      catalogue.find((project) => project.id === slug)!.title,
    );
  }
});
