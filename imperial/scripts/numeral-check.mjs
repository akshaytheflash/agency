// Pinpoint check: is the oversized section numeral clipped by its section,
// and where does the active-row tick actually sit relative to the title?
import { chromium } from "file:///C:/Users/aksha/AppData/Roaming/npm/node_modules/omniroute/node_modules/playwright/index.mjs";

const BASE = process.env.BASE || "http://localhost:3111";
const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
await page.goto(BASE, { waitUntil: "networkidle" });
await page.evaluate(async () => {
  const step = window.innerHeight * 0.6;
  for (let y = 0; y < document.body.scrollHeight; y += step) {
    window.scrollTo({ top: y, behavior: "instant" });
    await new Promise((r) => setTimeout(r, 60));
  }
  window.scrollTo({ top: 0, behavior: "instant" });
  await new Promise((r) => setTimeout(r, 300));
});

const info = await page.evaluate(() => {
  const out = {};

  // --- the "01" numeral vs its section ---
  const num = document.querySelector("#work .font-display");
  const sec = document.querySelector("#work");
  const nr = num.getBoundingClientRect();
  const sr = sec.getBoundingClientRect();
  // the visible ink of the glyph, not the line box
  const range = document.createRange();
  range.selectNodeContents(num);
  const ink = range.getBoundingClientRect();
  out.numeral = {
    text: num.textContent.trim(),
    lineBox: { top: Math.round(nr.top), bottom: Math.round(nr.bottom) },
    inkBox: { top: Math.round(ink.top), bottom: Math.round(ink.bottom) },
    section: { top: Math.round(sr.top), bottom: Math.round(sr.bottom) },
    inkAboveSectionBy: Math.round(sr.top - ink.top),
    clippedBySection: ink.top < sr.top,
  };

  // --- the active-row tick vs the row title ---
  const tick = document.querySelector(".work-tick");
  const h3 = document.querySelector("#work li h3");
  const tr = tick.getBoundingClientRect();
  const hr = h3.getBoundingClientRect();
  out.tick = {
    tick: { left: Math.round(tr.left), right: Math.round(tr.right), top: Math.round(tr.top), bottom: Math.round(tr.bottom) },
    title: { left: Math.round(hr.left), text: h3.textContent.trim() },
    overlapsTitle: tr.right > hr.left,
    gapPx: Math.round(hr.left - tr.right),
    // distance from the tick to the page's content gutter
    containerLeft: Math.round(document.querySelector("#work .max-w-7xl").getBoundingClientRect().left),
  };

  return out;
});

await browser.close();
console.log(JSON.stringify(info, null, 2));
