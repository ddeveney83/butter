import { test, expect } from "@playwright/test";

const projects = [
  ["onboarding", "A fresh start."],
  ["leadership", "People, not processes."],
  ["wellbeing", "Room to breathe."],
  ["compliance", "Do the right thing."],
  ["sustainability", "Little by little."],
  ["product-skills", "Know it. Show it."],
];

async function openMenuIfMobile(
  page: import("@playwright/test").Page,
  project: string,
) {
  if (project === "mobile")
    await page.getByRole("button", { name: "Menu", exact: true }).click();
}

test("all pages and six project routes load directly without errors or overflow", async ({
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

test("work has six pieces and shareable filters that persist on reload and Back", async ({
  page,
}) => {
  await page.goto("/work");
  await expect(page.locator(".work-gallery .project")).toHaveCount(6);
  await expect(page.getByRole("status")).toHaveText("06 projects");
  await page.getByRole("button", { name: "Storytelling", exact: true }).click();
  await expect(page.locator(".work-gallery .project")).toHaveCount(2);
  await expect(page.getByRole("status")).toHaveText("02 projects");
  await page.reload();
  await expect(
    page.getByRole("button", { name: "Storytelling", exact: true }),
  ).toHaveAttribute("aria-pressed", "true");
  await page
    .getByRole("link", { name: "Explore People, not processes." })
    .click();
  await expect(page).toHaveURL(/\/work\/leadership$/);
  await page.goBack();
  await expect(page.locator(".work-gallery .project")).toHaveCount(2);
  for (const filter of ["Digital learning", "Microlearning"]) {
    await page.getByRole("button", { name: filter, exact: true }).click();
    await expect(page.locator(".work-gallery .project")).toHaveCount(2);
  }
  await page.getByRole("button", { name: "All work", exact: true }).click();
  await expect(page.locator(".work-gallery .project")).toHaveCount(6);
});

test("every project has a working learning sample and next-project navigation", async ({
  page,
}) => {
  for (const [slug, title] of projects) {
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
  await expect(page).toHaveURL(/\/work\/onboarding$/);
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
    .locator("summary")
    .filter({ hasText: "Digital experiences" })
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
    .locator("summary")
    .filter({ hasText: "Can we start small?" })
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
