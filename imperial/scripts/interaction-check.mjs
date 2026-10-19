// Interaction test: the theme switcher, the skip link, keyboard focus and
// the reduced-motion path. These are the parts a screenshot cannot check.
import { chromium } from "file:///C:/Users/aksha/AppData/Roaming/npm/node_modules/omniroute/node_modules/playwright/index.mjs";

const BASE = process.env.BASE || "http://localhost:3111";
const browser = await chromium.launch();
const out = {};

/* --- theme switcher behaviour --- */
{
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  const errors = [];
  page.on("pageerror", (e) => errors.push(String(e.message)));
  page.on("console", (m) => m.type() === "error" && errors.push(m.text()));
  await page.goto(BASE, { waitUntil: "networkidle" });

  // stable selector: the aria-label flips between Open/Close, aria-controls
  // does not.
  const btn = page.locator('button[aria-controls="theme-picker"]');
  const before = await page.evaluate(() =>
    document.documentElement.getAttribute("data-theme"),
  );

  await btn.click();
  await page.waitForTimeout(300);
  const opened = await page.locator("#theme-picker").isVisible();
  const expanded = await btn.getAttribute("aria-expanded");

  // pick "bone" (warm paper, imperial pine)
  await page.locator('button[aria-pressed][title*="pine"]').click();
  await page.waitForTimeout(400);
  const applied = await page.evaluate(() =>
    document.documentElement.getAttribute("data-theme"),
  );
  const persisted = await page.evaluate(() =>
    localStorage.getItem("imperial-theme"),
  );
  const bodyBg = await page.evaluate(
    () => getComputedStyle(document.body).backgroundColor,
  );

  // Escape closes
  await page.keyboard.press("Escape");
  await page.waitForTimeout(250);
  const closedByEscape = !(await page.locator("#theme-picker").isVisible());

  // outside click closes
  await btn.click();
  await page.waitForTimeout(250);
  const reopened = await page.locator("#theme-picker").isVisible();
  await page.mouse.click(1100, 300);
  await page.waitForTimeout(250);
  const closedByOutside = !(await page.locator("#theme-picker").isVisible());

  // the active option carries a non-colour cue
  const activeTick = await page.evaluate(() => {
    const b = document.querySelector('button[aria-pressed="true"]');
    return b ? b.textContent.trim() : null;
  });

  out.themeSwitcher = {
    before,
    opened,
    expanded,
    applied,
    persisted,
    bodyBg,
    closedByEscape,
    reopened,
    closedByOutside,
    activeOptionText: activeTick,
    errors,
  };
  await page.close();
}

/* --- skip link --- */
{
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  await page.goto(BASE, { waitUntil: "networkidle" });
  await page.keyboard.press("Tab");
  const first = await page.evaluate(() => {
    const a = document.activeElement;
    const r = a.getBoundingClientRect();
    return {
      text: a.textContent.trim(),
      visibleBox: { w: Math.round(r.width), h: Math.round(r.height) },
      href: a.getAttribute("href"),
    };
  });
  await page.keyboard.press("Enter");
  await page.waitForTimeout(600);
  const jumped = await page.evaluate(() => ({
    hash: location.hash,
    mainExists: !!document.querySelector("main#content"),
    scrollY: Math.round(window.scrollY),
  }));
  out.skipLink = { first, jumped };
  await page.close();
}

/* --- reduced motion: everything visible, no animation --- */
{
  const ctx = await browser.newContext({
    viewport: { width: 1440, height: 900 },
    reducedMotion: "reduce",
  });
  const page = await ctx.newPage();
  await page.goto(BASE, { waitUntil: "networkidle" });
  await page.waitForTimeout(1200);
  out.reducedMotion = await page.evaluate(() => {
    const hidden = [...document.querySelectorAll(".reveal")].filter(
      (el) => getComputedStyle(el).opacity === "0",
    ).length;
    const marquee = getComputedStyle(
      document.querySelector(".marquee-track"),
    ).animationName;
    const preview = getComputedStyle(
      document.querySelector(".work-preview"),
    ).transitionDuration;
    return {
      hiddenReveals: hidden,
      totalReveals: document.querySelectorAll(".reveal").length,
      marqueeAnimation: marquee,
      previewTransition: preview,
    };
  });
  await page.close();
  await ctx.close();
}

/* --- keyboard: tab to the work rows, the preview must follow focus --- */
{
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  await page.goto(BASE, { waitUntil: "networkidle" });
  await page.locator("#work").scrollIntoViewIfNeeded();
  await page.waitForTimeout(500);
  const rows = page.locator(".work-row");
  await rows.nth(2).focus();
  await page.waitForTimeout(800);
  out.keyboardPreview = await page.evaluate(() => {
    const pv = document.querySelector(".work-preview");
    const pr = pv.getBoundingClientRect();
    const rows = [...document.querySelectorAll(".work-row")].map((r) => {
      const rr = r.getBoundingClientRect();
      return { t: r.querySelector("h3").textContent, mid: (rr.top + rr.bottom) / 2 };
    });
    return {
      previewMid: Math.round((pr.top + pr.bottom) / 2),
      nearest: rows.reduce((a, b) =>
        Math.abs(b.mid - (pr.top + pr.bottom) / 2) <
        Math.abs(a.mid - (pr.top + pr.bottom) / 2)
          ? b
          : a,
      ).t,
      caption: document
        .querySelector(".work-preview p")
        .textContent.trim(),
    };
  });
  await page.close();
}

await browser.close();
console.log(JSON.stringify(out, null, 2));
