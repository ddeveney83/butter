import { test, expect } from "@playwright/test";

test("butter cursor gives accurate hover hints without blocking interaction", async ({
  page,
}, testInfo) => {
  await page.goto("/work");
  const hint = page.locator(".butter-cursor-hint");
  if (testInfo.project.name === "mobile") {
    await expect(hint).toHaveCount(0);
    await expect(page.locator("html")).not.toHaveClass(/butter-cursor-enabled/);
    await page.getByRole("button", { name: "Storytelling", exact: true }).tap();
    await expect(page.locator(".work-gallery .project")).toHaveCount(2);
    return;
  }
  await expect(page.locator("html")).toHaveClass(/butter-cursor-enabled/);
  const project = page.locator(".work-gallery .project").first();
  await project.hover();
  await expect(project).toHaveCSS("cursor", /butter-cursor\.svg/);
  await expect(hint).toHaveText("Explore");
  await expect(hint).toHaveCSS("opacity", "1");
  await expect(hint).toHaveCSS("pointer-events", "none");
  await expect(hint).toHaveAttribute("aria-hidden", "true");
  await project.click();
  await expect(page).toHaveURL(/\/work\/onboarding$/);
  await page.goto("/services");
  const accordion = page.getByRole("button", {
    name: "Digital experiences",
    exact: true,
  });
  await accordion.hover();
  await expect(hint).toHaveText("Open");
  await accordion.click();
  await expect(hint).toHaveText("Close");
  await expect(accordion).toHaveAttribute("aria-expanded", "true");
  await accordion.click();
  await expect(hint).toHaveText("Open");
  const tab = page.getByRole("tab", { name: "03 / Make" });
  await tab.hover();
  await expect(hint).toHaveText("View tab");
  await tab.click();
  await expect(hint).toHaveText("Current tab");
  await page.keyboard.press("Tab");
  await expect(hint).toHaveCSS("opacity", "0");
});

test("native form cursors, touch and reduced motion remain usable", async ({
  page,
}, testInfo) => {
  await page.goto("/contact");
  const hint = page.locator(".butter-cursor-hint");
  if (testInfo.project.name === "mobile") {
    await page.getByLabel("Your name").fill("Sam");
    await expect(page.getByLabel("Your name")).toHaveValue("Sam");
    await expect(hint).toHaveCount(0);
    return;
  }
  await page.getByRole("link", { name: "ddeveney83@gmail.com" }).hover();
  await expect(hint).toHaveText("Email us");
  await page.getByLabel("Your name").hover();
  await expect(page.getByLabel("Your name")).toHaveCSS("cursor", "text");
  await expect(hint).toHaveCSS("opacity", "0");
  await page.getByLabel("Your name").fill("Sam");
  await page.getByLabel("Your name").evaluate((input: HTMLInputElement) => {
    input.disabled = true;
  });
  await page.getByLabel("Your name").hover();
  await expect(page.getByLabel("Your name")).toHaveCSS("cursor", "not-allowed");
  await expect(hint).toHaveCSS("opacity", "0");
  await page.getByLabel("Your name").evaluate((input: HTMLInputElement) => {
    input.disabled = false;
  });
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page
    .getByRole("button", { name: "Digital learning", exact: true })
    .hover();
  await expect(hint).toHaveText("Choose");
  await expect(hint).toHaveCSS("transition-duration", "0s");
  await page
    .getByRole("button", { name: "Digital learning", exact: true })
    .click();
  await expect(hint).toHaveText("Selected");
  await page.goto("/pricing");
  const checkbox = page.getByLabel("Branching scenarios");
  await checkbox.hover();
  await expect(checkbox).toHaveCSS("cursor", /butter-cursor\.svg/);
  await expect(hint).toHaveText("Select");
  await checkbox.click();
  await expect(hint).toHaveText("Selected");
  const range = page.getByRole("slider");
  await range.hover();
  await expect(hint).toHaveText("Adjust");
  await page.mouse.down();
  await expect(hint).toHaveCSS("opacity", "0");
  await page.mouse.up();
});

test("hover hints fit within screen edges and clear on pointer exit", async ({
  page,
}, testInfo) => {
  await page.goto("/");
  if (testInfo.project.name === "mobile") {
    await expect(page.locator(".butter-cursor-hint")).toHaveCount(0);
    expect(
      await page.evaluate(
        () => document.documentElement.scrollWidth <= innerWidth,
      ),
    ).toBe(true);
    return;
  }
  await page.evaluate(() => {
    const edge = document.createElement("button");
    edge.textContent = "Edge interaction";
    edge.dataset.cursorLabel = "Explore";
    edge.style.cssText =
      "position:fixed;bottom:0;right:0;width:100px;height:44px;z-index:999";
    document.body.append(edge);
  });
  const hint = page.locator(".butter-cursor-hint");
  await page
    .getByRole("button", { name: "Edge interaction" })
    .hover({ position: { x: 95, y: 39 } });
  await expect(hint).toHaveText("Explore");
  await expect(hint).toHaveCSS("opacity", "1");
  const bounds = (await hint.boundingBox())!;
  const viewport = page.viewportSize()!;
  expect(bounds.x).toBeGreaterThanOrEqual(0);
  expect(bounds.y).toBeGreaterThanOrEqual(0);
  expect(bounds.x + bounds.width).toBeLessThanOrEqual(viewport.width);
  expect(bounds.y + bounds.height).toBeLessThanOrEqual(viewport.height);
  await page.mouse.move(-10, -10);
  await expect(hint).toHaveCSS("opacity", "0");
});
