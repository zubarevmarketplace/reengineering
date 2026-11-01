import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";
import { mkdir } from "node:fs/promises";

test.beforeEach(async ({ page }) => { await page.goto(process.env.TEST_BASE_URL || "/"); await page.evaluate(() => document.fonts.ready); });

for (const width of [320, 390, 768, 1024, 1440, 1920]) {
  test(`responsive layout and accessibility at ${width}px`, async ({ page }) => {
    const errors: string[] = [];
    page.on("pageerror", e => errors.push(e.message));
    await page.setViewportSize({ width, height: width < 680 ? 844 : 1000 });
    await expect(page.getByRole("heading", { level: 1 })).toContainText("Инженер-");
    const overflow = await page.evaluate(() => [...document.querySelectorAll("body *")].filter(el => el.getBoundingClientRect().right > innerWidth + 1 && getComputedStyle(el).display !== "none").map(el => ({ tag: el.tagName, class: el.className, right: el.getBoundingClientRect().right })).slice(0, 20));
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth), JSON.stringify(overflow)).toBe(true);
    expect(await page.locator(".portrait").evaluate((el: HTMLImageElement) => el.complete && el.naturalWidth > 0)).toBe(true);
    await mkdir(".qa", { recursive: true });
    await page.screenshot({ path: `.qa/site-${width}.png`, fullPage: true });
    const scan = await new AxeBuilder({ page }).withTags(["wcag2a", "wcag2aa", "wcag21aa"]).analyze();
    expect(scan.violations.map(v => ({ id: v.id, impact: v.impact, nodes: v.nodes.map(n => n.target) }))).toEqual([]);
    expect(errors).toEqual([]);
  });
}

test("career, process, keyboard and navigation", async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 1000 });
  await page.getByRole("tab", { name: "Техник по испытаниям Проверка оборудования" }).click();
  await expect(page.locator("#panel-testing")).toBeVisible();
  await page.keyboard.press("ArrowDown");
  await expect(page.locator("#tab-service-lead")).toBeFocused();
  await expect(page.locator("#panel-service-lead")).toContainText("3–5 специалистов");
  for (let index = 0; index < 4; index++) {
    await page.locator(`#process-tab-${index}`).click();
    await expect(page.locator(`#process-panel-${index}`)).toBeVisible();
  }
  await page.getByRole("navigation").getByRole("link", { name: "Компетенции" }).click();
  await expect(page).toHaveURL(/#skills$/);
  await expect(page.getByRole("navigation").getByRole("link", { name: "Компетенции" })).toHaveAttribute("aria-current", "location");
  await page.locator(".hero-actions").getByRole("link", { name: "Связаться" }).click();
  await expect(page).toHaveURL(/#contact$/);
});

test("mobile menu, escape and career accordion", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.getByRole("button", { name: "Открыть меню" }).click();
  await expect(page.getByRole("navigation")).toBeVisible();
  await page.keyboard.press("Escape");
  await expect(page.getByRole("navigation")).not.toBeVisible();
  await expect(page.locator("#menu-button")).toBeFocused();
  await page.getByRole("button", { name: "Открыть меню" }).click();
  await page.getByRole("navigation").getByRole("link", { name: "Опыт", exact: true }).click();
  await expect(page.getByRole("navigation")).not.toBeVisible();
  const item = page.locator(".career-mobile details").nth(3);
  await item.locator("summary").click();
  await expect(item).toHaveAttribute("open", "");
  await expect(item.locator(".mobile-role-content")).toBeVisible();
  await expect(page.locator(".career-mobile details[open]")).toHaveCount(1);
});

test("real PDF download, contact links, clipboard and assets", async ({ page, request }) => {
  const errors: string[] = [];
  page.on("pageerror", e => errors.push(e.message));
  await page.reload();
  const downloadPromise = page.waitForEvent("download");
  await page.locator(".hero-actions").getByRole("link", { name: "Скачать резюме" }).click();
  const download = await downloadPromise;
  expect(download.suggestedFilename()).toContain("Эхтибаров.pdf");
  expect(await download.failure()).toBeNull();
  await page.getByRole("button", { name: "Скопировать адрес почты" }).click();
  await expect(page.getByRole("status")).toHaveText("Адрес скопирован");
  expect(await page.evaluate(() => navigator.clipboard.readText())).toBe("ekhtry@vk.com");
  await expect(page.getByRole("link", { name: "Написать на почту" })).toHaveAttribute("href", "mailto:ekhtry@vk.com");
  await expect(page.getByRole("link", { name: "+7 (904) 519-88-76", exact: true })).toHaveAttribute("href", "tel:+79045198876");
  const paths = await page.locator('img, link[rel="icon"], a[download]').evaluateAll(elements => elements.map(el => el.getAttribute("src") || el.getAttribute("href")).filter(Boolean));
  for (const path of new Set(paths)) { expect((await request.get(path!)).ok(), path!).toBe(true); }
  expect(errors).toEqual([]);
});

test("missing PDF has a useful recovery action", async ({ page }) => {
  await page.route("**/resume/ruslan-ekhtibarov.pdf", route => route.fulfill({ status: 404, body: "Not found" }));
  await page.locator(".hero-actions").getByRole("link", { name: "Скачать резюме" }).click();
  await expect(page.locator(".hero-actions").getByRole("status")).toContainText("Не удалось загрузить PDF");
  await expect(page.getByRole("link", { name: "Запросить по почте" })).toHaveAttribute("href", "mailto:ekhtry@vk.com");
});

test("metadata, no invented dates, reduced motion and print", async ({ page }) => {
  await expect(page).toHaveTitle(/Руслан Эхтибаров/);
  expect(await page.locator('html').getAttribute('lang')).toBe('ru');
  await expect(page.locator("body")).not.toContainText(/\b\d{2}\.\d{2}\.\d{4}\b/);
  const data = JSON.parse(await page.locator('script[type="application/ld+json"]').innerText());
  expect(data["@type"]).toBe("Person");
  expect(data.birthDate).toBeUndefined();
  expect(await page.evaluate(() => getComputedStyle(document.documentElement).scrollBehavior)).toBe("auto");
  await page.emulateMedia({ media: "print" });
  await expect(page.locator(".role-panel")).toHaveCount(5);
  for (const panel of await page.locator(".role-panel").all()) {
    const display = await panel.evaluate(el => ({ display: getComputedStyle(el).display, visibility: getComputedStyle(el).visibility, contentVisibility: getComputedStyle(el).contentVisibility }));
    await expect(panel, JSON.stringify(display)).toBeVisible();
  }
  await page.pdf({ path: ".qa/print-preview.pdf", format: "A4", printBackground: true });
});
