// Targeted checks: does `position: sticky` actually stick (body has
// overflow-x:hidden, which can turn body into a scroll container and break it),
// and does the fixed theme pill ever sit on top of real content?
import { chromium } from "file:///C:/Users/aksha/AppData/Roaming/npm/node_modules/omniroute/node_modules/playwright/index.mjs";

const BASE = process.env.BASE || "http://localhost:3111";
const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
await page.goto(BASE, { waitUntil: "networkidle" });

// --- sticky test: scroll through #services and record the label's viewport y ---
const sticky = await page.evaluate(async () => {
  const label = document.querySelector("#services .lg\\:sticky");
  if (!label) return { error: "no sticky element" };
  const sec = document.querySelector("#services");
  const secTop = sec.getBoundingClientRect().top + window.scrollY;
  const secH = sec.getBoundingClientRect().height;
  const samples = [];
  for (let y = secTop - 200; y < secTop + secH - 200; y += 120) {
    window.scrollTo({ top: y, behavior: "instant" });
    await new Promise((r) => setTimeout(r, 40));
    const r = label.getBoundingClientRect();
    samples.push({ scrollY: Math.round(window.scrollY), labelTop: Math.round(r.top) });
  }
  // a sticky element that works will pin to ~56px (top-14) and then hold
  const held = samples.filter((s) => s.labelTop <= 70);
  return {
    samples: samples.slice(0, 24),
    pinnedSamples: held.length,
    totalSamples: samples.length,
    stickyWorks: held.length > 2,
  };
});

// --- fixed pill collision sweep at many scroll positions ---
const collisions = await page.evaluate(async () => {
  const pill = document.querySelector('button[aria-label="Open theme picker"]');
  const wrap = pill?.parentElement;
  const out = [];
  const h = document.body.scrollHeight;
  for (let y = 0; y < h; y += 300) {
    window.scrollTo({ top: y, behavior: "instant" });
    await new Promise((r) => setTimeout(r, 30));
    const pr = wrap.getBoundingClientRect();
    const hits = [];
    for (const el of document.querySelectorAll("a, p, h1, h2, h3, li, span, button")) {
      if (wrap.contains(el) || el.contains(wrap)) continue;
      const r = el.getBoundingClientRect();
      if (r.width === 0 || r.height === 0) continue;
      if (r.left < pr.right && r.right > pr.left && r.top < pr.bottom && r.bottom > pr.top) {
        hits.push({ tag: el.tagName, text: (el.textContent || "").trim().slice(0, 40) });
      }
    }
    if (hits.length) {
      out.push({ scrollY: Math.round(window.scrollY), hits: hits.slice(0, 4), count: hits.length });
    }
  }
  return out;
});

// --- does body become a scroll container? (breaks sticky) ---
const overflowState = await page.evaluate(() => ({
  bodyOverflowX: getComputedStyle(document.body).overflowX,
  bodyOverflowY: getComputedStyle(document.body).overflowY,
  htmlOverflowX: getComputedStyle(document.documentElement).overflowX,
  htmlScrollHeight: document.documentElement.scrollHeight,
  bodyScrollHeight: document.body.scrollHeight,
  bodyClientHeight: document.body.clientHeight,
  bodyIsScrollContainer: document.body.scrollHeight > document.body.clientHeight + 1,
}));

await browser.close();
console.log(JSON.stringify({ sticky, overflowState, collisions }, null, 2));
