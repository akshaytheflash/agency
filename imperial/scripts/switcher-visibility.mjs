// Verify the theme pill is actually hidden on small screens and doesn't
// overlap body copy where it is shown.
import { chromium } from "file:///C:/Users/aksha/AppData/Roaming/npm/node_modules/omniroute/node_modules/playwright/index.mjs";

const BASE = "https://imperial-development.vercel.app";
const browser = await chromium.launch();
const results = [];

for (const width of [390, 820, 1024, 1440]) {
  const page = await browser.newPage({ viewport: { width, height: 900 } });
  await page.goto(BASE, { waitUntil: "networkidle", timeout: 60000 });
  const r = await page.evaluate(() => {
    const btn = document.querySelector('button[aria-label="Open theme picker"]');
    if (!btn) return { present: false };
    // true visibility: element + every ancestor must not be display:none
    let el = btn,
      hidden = false;
    while (el && el !== document.documentElement) {
      const s = getComputedStyle(el);
      if (s.display === "none" || s.visibility === "hidden") hidden = true;
      el = el.parentElement;
    }
    const rect = btn.getBoundingClientRect();
    return {
      present: true,
      visible: !hidden && rect.width > 0,
      renderedWidth: Math.round(rect.width),
      left: Math.round(rect.left),
    };
  });
  results.push({ width, ...r });
  await page.close();
}
await browser.close();
console.log(JSON.stringify(results, null, 2));
