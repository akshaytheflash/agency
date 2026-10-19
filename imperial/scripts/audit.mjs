// Full-page renders at four widths from production, for a spacing audit.
import { chromium } from "file:///C:/Users/aksha/AppData/Roaming/npm/node_modules/omniroute/node_modules/playwright/index.mjs";

const BASE = "http://localhost:3111";
const browser = await chromium.launch();

for (const w of [1440, 1024, 820, 390]) {
  const page = await browser.newPage({ viewport: { width: w, height: 900 } });
  await page.goto(BASE, { waitUntil: "networkidle", timeout: 60000 });
  await page.addStyleTag({ content: "html{scroll-behavior:auto !important}" });
  await page.evaluate(async () => {
    const step = window.innerHeight * 0.6;
    for (let y = 0; y < document.body.scrollHeight; y += step) {
      window.scrollTo({ top: y, behavior: "instant" });
      await new Promise((r) => setTimeout(r, 70));
    }
    window.scrollTo({ top: document.body.scrollHeight, behavior: "instant" });
    await new Promise((r) => setTimeout(r, 400));
    window.scrollTo({ top: 0, behavior: "instant" });
    await new Promise((r) => setTimeout(r, 400));
  });
  await page.waitForTimeout(800);
  await page.screenshot({ path: `qa/audit-${w}.png`, fullPage: true });

  // objective whitespace report: vertical gaps between top-level blocks
  const gaps = await page.evaluate(() => {
    const blocks = [
      ...document.querySelectorAll(
        "body > header, body > main > section, body > footer",
      ),
    ];
    const out = [];
    for (let i = 1; i < blocks.length; i++) {
      const prev = blocks[i - 1].getBoundingClientRect();
      const cur = blocks[i].getBoundingClientRect();
      out.push({
        from: (blocks[i - 1].id || blocks[i - 1].tagName).toLowerCase().slice(0, 14),
        to: (blocks[i].id || blocks[i].tagName).toLowerCase().slice(0, 14),
        gap: Math.round(cur.top - prev.bottom),
      });
    }
    return {
      gaps: out,
      totalHeight: document.body.scrollHeight,
      ratio: Math.round((document.body.scrollHeight / window.innerWidth) * 100) / 100,
    };
  });
  console.log(JSON.stringify({ width: w, ...gaps }));
  await page.close();
}
await browser.close();
