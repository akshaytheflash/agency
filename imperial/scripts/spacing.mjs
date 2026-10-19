// Inner-section spacing report: measures real gaps between text blocks inside
// each section, so "huge empty space" is a number, not an impression.
import { chromium } from "file:///C:/Users/aksha/AppData/Roaming/npm/node_modules/omniroute/node_modules/playwright/index.mjs";

const BASE = "http://localhost:3111";
const browser = await chromium.launch();

for (const width of [1440, 390]) {
  const page = await browser.newPage({ viewport: { width, height: 900 } });
  await page.goto(BASE, { waitUntil: "networkidle", timeout: 60000 });
  await page.addStyleTag({ content: "html{scroll-behavior:auto !important}" });
  await page.evaluate(async () => {
    const step = window.innerHeight * 0.6;
    for (let y = 0; y < document.body.scrollHeight; y += step) {
      window.scrollTo({ top: y, behavior: "instant" });
      await new Promise((r) => setTimeout(r, 60));
    }
    window.scrollTo({ top: 0, behavior: "instant" });
    await new Promise((r) => setTimeout(r, 500));
  });

  const report = await page.evaluate(() => {
    const q = (sel) => document.querySelector(sel);
    const box = (sel) => {
      const el = q(sel);
      return el ? el.getBoundingClientRect() : null;
    };
    const gap = (a, b) => {
      const A = box(a),
        B = box(b);
      if (!A || !B) return null;
      return Math.round(B.top - A.bottom);
    };
    return {
      workIntroToFirstRow: gap("#work h2", "#work ul li:first-child"),
      workIntroBlockToEnd: gap("#work p.mt-5", "#work ul"),
      servicesHeadingToFirst: gap("#services h2", "#services .lg\\:col-span-8 > div:first-child"),
      processHeadingToFirst: gap("#process h2", "#process ol li:first-child"),
      heroCtaToMeta: gap("#contact", "footer"),
      quoteMarkToText: gap("section blockquote", "section blockquote p"),
      contactHeadlineToEmail: gap("#contact h2", "#contact a[href^='mailto:']"),
    };
  });

  console.log(JSON.stringify({ width, report }));
  // also shoot mobile + desktop full renders
  await page.screenshot({ path: `qa/after-${width}.png`, fullPage: true });
  await page.close();
}
await browser.close();
