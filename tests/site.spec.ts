import { test, expect } from "@playwright/test";

test("renders the portfolio without page errors or horizontal overflow", async ({
  page,
}) => {
  const errors: string[] = [];
  page.on("pageerror", (error) => errors.push(error.message));
  await page.goto("/");
  await expect(page.getByRole("heading", { level: 1 })).toHaveText(
    "Learningwith feeling.",
  );
  await expect(
    page.getByRole("button", { name: "View A fresh start. concept project" }),
  ).toBeVisible();
  await expect(
    page.getByRole("button", {
      name: "View People, not processes. concept project",
    }),
  ).toBeVisible();
  await expect(
    page.getByRole("img", { name: /smiling butter character/ }).first(),
  ).toBeVisible();
  expect(
    await page.evaluate(
      () => document.documentElement.scrollWidth <= window.innerWidth,
    ),
  ).toBe(true);
  expect(errors).toEqual([]);
});

test("project details open, trap focus, and return focus on Escape", async ({
  page,
}) => {
  await page.goto("/");
  const project = page.getByRole("button", {
    name: "View A fresh start. concept project",
  });
  await project.click();
  const dialog = page.getByRole("dialog", { name: "A fresh start." });
  await expect(dialog).toBeVisible();
  await expect(
    dialog.getByText("Concept project — an example of our approach"),
  ).toBeVisible();
  await expect(
    dialog.getByText("Learning strategy", { exact: true }),
  ).toBeVisible();
  for (let i = 0; i < 5; i++) {
    await page.keyboard.press("Tab");
    expect(
      await page.evaluate(() =>
        Boolean(document.activeElement?.closest("dialog")),
      ),
    ).toBe(true);
  }
  await page.keyboard.press("Escape");
  await expect(dialog).not.toBeVisible();
  await expect(project).toBeFocused();
});

test("a case study leads to an email draft with validated fields", async ({
  page,
}) => {
  await page.goto("/");
  await page
    .getByRole("button", {
      name: "View People, not processes. concept project",
    })
    .click();
  await expect(
    page
      .getByRole("dialog", { name: "People, not processes." })
      .getByRole("heading", { name: "People, not processes." }),
  ).toBeVisible();
  await page.getByRole("button", { name: "Make something like this" }).click();
  const dialog = page.getByRole("dialog", {
    name: "Start a conversation with Butter",
  });
  await expect(dialog).toBeVisible();
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
  await page
    .getByLabel("A little about your project")
    .fill("An onboarding experience for our team.");
  await page.getByRole("button", { name: "Create an email draft" }).click();
  await expect(page.getByRole("status")).toContainText(
    "Nothing has been sent yet.",
  );
  const draft = await page
    .getByRole("link", { name: "Open email draft" })
    .getAttribute("href");
  expect(draft).toMatch(/^mailto:/);
  expect(decodeURIComponent(draft!.split('?')[0])).toBe('mailto:ddeveney83@gmail.com');
  const draftParams = new URLSearchParams(draft!.split("?")[1]);
  expect(draftParams.get("subject")).toBe(
    "A little Butter for our next project",
  );
  expect(draftParams.get("body")).toContain(
    "An onboarding experience for our team.",
  );
  expect(draftParams.get("body")).toContain("alex@example.com");
  await page.getByRole("button", { name: "Close dialog" }).click();
  await expect(dialog).not.toBeVisible();
});

test("navigation moves to work and about, including the mobile menu", async ({
  page,
}, testInfo) => {
  await page.goto("/");
  if (testInfo.project.name === "mobile") {
    await page.getByRole("button", { name: "Menu" }).click();
    await expect(
      page.getByRole("button", { name: "Close", exact: true }),
    ).toHaveAttribute("aria-expanded", "true");
  }
  await page.getByRole("link", { name: "Our work", exact: true }).click();
  await expect(page).toHaveURL(/#work$/);
  if (testInfo.project.name === "mobile") {
    await expect(page.getByRole("button", { name: "Menu" })).toHaveAttribute(
      "aria-expanded",
      "false",
    );
    await page.getByRole("button", { name: "Menu" }).click();
  }
  await page.getByRole("link", { name: "About us", exact: true }).click();
  await expect(page).toHaveURL(/#about$/);
  await expect(
    page.getByRole("heading", { name: "Complex things. Made simple." }),
  ).toBeVisible();
});
