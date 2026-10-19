// Final gate: run the same checks against the deployed production URL.
import { chromium } from "file:///C:/Users/aksha/AppData/Roaming/npm/node_modules/omniroute/node_modules/playwright/index.mjs";

const BASE = "https://imperial-development.vercel.app";
const browser = await chromium.launch();
const out = [];

for (const vp of [
  { width: 1440, height: 900, tag: "desktop" },
  { width: 390, height: 844, tag: "mobile" },
]) {
  const page = await browser.newPage({ viewport: vp });
  const errs = [];
  page.on("console", (m) => m.type() === "error" && errs.push(m.text()));
  page.on("pageerror", (e) => errs.push(String(e.message)));

  await page.goto(BASE, { waitUntil: "networkidle", timeout: 60000 });
  await page.addStyleTag({ content: "html{scroll-behavior:auto !important}" });
  await page.evaluate(async () => {
    const step = window.innerHeight * 0.6;
    for (let y = 0; y < document.body.scrollHeight; y += step) {
      window.scrollTo({ top: y, behavior: "instant" });
      await new Promise((r) => setTimeout(r, 70));
    }
    window.scrollTo({ top: document.body.scrollHeight, behavior: "instant" });
    await new Promise((r) => setTimeout(r, 1500));
  });

  const res = await page.evaluate(() => ({
    stuckHidden: document.querySelectorAll(".reveal:not(.is-visible)").length,
    overflow:
      document.documentElement.scrollWidth >
      document.documentElement.clientWidth + 1,
    themeSwitcherVisible: !!document.querySelector(
      'button[aria-label="Open theme picker"]',
    ),
    emailLinks: document.querySelectorAll('a[href^="mailto:"]').length,
    liveLinks: [...document.querySelectorAll('#work a[target="_blank"]')].length,
    displayFont: getComputedStyle(document.querySelector("h1")).fontFamily,
  }));

  // exercise the theme switcher on desktop
  let themeSwitch = null;
  if (vp.tag === "desktop") {
    const btn = page.locator('button[aria-label="Open theme picker"]');
    if (await btn.count()) {
      await btn.click();
      await page.waitForTimeout(400);
      const opts = await page.locator("button[aria-pressed]").count();
      // bone = index 2; note (title attr) is "Warm paper, imperial pine"
      await page
        .locator('button[aria-pressed][title*="pine"]')
        .click();
      await page.waitForTimeout(600);
      themeSwitch = {
        options: opts,
        applied: await page.evaluate(() =>
          document.documentElement.getAttribute("data-theme"),
        ),
        persisted: await page.evaluate(() =>
          localStorage.getItem("imperial-theme"),
        ),
      };
    }
  }

  out.push({ viewport: vp.tag, errors: errs, ...res, themeSwitch });
  await page.close();
}

await browser.close();
console.log(JSON.stringify(out, null, 2));
