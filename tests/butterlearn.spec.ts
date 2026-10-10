import { test, expect } from "@playwright/test";

const preview = (page: import("@playwright/test").Page) =>
  page.getByRole("region", { name: "Butterlearn product preview" });

test("Butterlearn is discoverable in navigation and login opens the learning platform", async ({
  page,
}, testInfo) => {
  await page.goto("/");
  if (testInfo.project.name === "mobile")
    await page.getByRole("button", { name: "Menu", exact: true }).click();
  await page
    .getByRole("navigation", { name: "Main navigation" })
    .getByRole("link", { name: "butterlearn", exact: true })
    .click();
  await expect(page).toHaveURL(/\/butterlearn$/);
  await expect(page).toHaveTitle("Butter — Meet Butterlearn.");
  await expect(page.locator(".butterlearn-development-note")).toContainText(
    "HTML and SCORM courses",
  );
  await page.getByRole("link", { name: "Log in", exact: true }).click();
  await expect(page).toHaveURL(/\/butterlearn\/login$/);
  await expect(page.getByLabel("Email address")).toBeVisible();
  await expect(page.getByLabel("Password", { exact: true })).toBeVisible();
  await expect(
    page.getByRole("button", { name: "Sign in", exact: true }),
  ).toBeVisible();
  await page
    .getByRole("link", { name: "Back to Butterlearn", exact: false })
    .click();
  await expect(page).toHaveURL(/\/butterlearn$/);
  await page
    .getByRole("link", { name: "Let’s talk Butterlearn", exact: true })
    .click();
  await expect(
    page.getByRole("button", { name: "Butterlearn", exact: true }),
  ).toHaveAttribute("aria-pressed", "true");
  await expect(page.getByLabel("A little about your project")).toHaveValue(
    /Butterlearn/,
  );
});

test("sample completion carries between learner and manager views and resets", async ({
  page,
}) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/butterlearn");
  const sample = preview(page);
  const complete = sample.getByRole("button", {
    name: "Mark sample complete",
    exact: true,
  });
  await complete.click();
  await expect(sample.getByRole("progressbar")).toHaveAttribute("value", "1");
  await expect(
    sample.getByRole("button", { name: "Sample completed ✓", exact: true }),
  ).toBeDisabled();
  for (const name of ["Make a good call.", "Safer working, together."]) {
    await sample
      .getByRole("button", { name: new RegExp(name.replaceAll(".", "\\.")) })
      .click();
    await complete.click();
  }
  await expect(sample.getByRole("progressbar")).toHaveAttribute("value", "3");
  const learner = sample.getByRole("tab", { name: "Learner", exact: true });
  await learner.focus();
  await learner.press("ArrowRight");
  await expect(
    sample.getByRole("tab", { name: "Manager", exact: true }),
  ).toBeFocused();
  const sam = sample
    .getByRole("row")
    .filter({ has: page.getByRole("cell", { name: "Sam", exact: true }) });
  await expect(sam).toContainText("3 of 3 steps");
  await sample.getByRole("button", { name: "Complete", exact: true }).click();
  await expect(sample.getByRole("row")).toHaveCount(3);
  await sample
    .getByRole("button", { name: "Needs a nudge", exact: true })
    .click();
  await expect(sample.getByRole("row")).toHaveCount(2);
  await learner.click();
  await sample
    .getByRole("button", { name: "Reset sample", exact: true })
    .click();
  await expect(sample.getByRole("progressbar")).toHaveAttribute("value", "0");
  await sample.getByRole("tab", { name: "Manager", exact: true }).click();
  await expect(sample.getByRole("row")).toHaveCount(3);
  await expect(sam).toContainText("Not started");
});

test("admin rules are interactive, keyboard accessible and preserve state across tabs", async ({
  page,
}) => {
  await page.goto("/butterlearn");
  const sample = preview(page);
  const learner = sample.getByRole("tab", { name: "Learner", exact: true });
  await learner.focus();
  await learner.press("End");
  const admin = sample.getByRole("tab", { name: "Admin", exact: true });
  await expect(admin).toBeFocused();
  const assignment = sample.getByRole("switch", {
    name: "Assign automatically",
  });
  await expect(assignment).toBeChecked();
  await sample.getByLabel("Who is it for?").selectOption("Managers");
  await expect(sample.locator(".butterlearn-rule [role=status]")).toContainText(
    "managers",
  );
  await assignment.focus();
  await assignment.press("Space");
  await expect(assignment).not.toBeChecked();
  await learner.click();
  await admin.click();
  await expect(assignment).not.toBeChecked();
  await expect(sample.getByLabel("Who is it for?")).toHaveValue("Managers");
  await expect(sample.locator(".butterlearn-rule [role=status]")).toContainText(
    "off in this sample",
  );
});

test("preview roles keep the frame stable and fit phone, tablet and desktop layouts", async ({
  page,
}) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  for (const width of [320, 390, 761, 850, 851, 1024, 1440]) {
    await page.setViewportSize({ width, height: 1000 });
    await page.goto("/butterlearn");
    await page.evaluate(() => document.fonts.ready);
    if (width > 760) {
      const logo = (await page.locator("header .wordmark").boundingBox())!;
      const navigation = (await page.locator("header nav").boundingBox())!;
      expect(
        navigation.x,
        `${width}px navigation clears the logo`,
      ).toBeGreaterThan(logo.x + logo.width + 16);
    }
    const sample = preview(page);
    const before = (await sample.locator(".butterlearn-preview").boundingBox())!
      .height;
    for (const tab of await sample.getByRole("tab").all()) {
      await tab.click();
      expect(
        Math.abs(
          (await sample.locator(".butterlearn-preview").boundingBox())!.height -
            before,
        ),
      ).toBeLessThan(1);
      expect(
        await page.evaluate(
          () => document.documentElement.scrollWidth <= innerWidth,
        ),
        `${width}px ${await tab.innerText()}`,
      ).toBe(true);
    }
    await page
      .getByRole("button", { name: "Can we use Butterlearn yet?", exact: true })
      .click();
    await expect(
      page.getByText(
        "The first release supports learner accounts, HTML course packages",
        { exact: false },
      ),
    ).toBeVisible();
  }
});
