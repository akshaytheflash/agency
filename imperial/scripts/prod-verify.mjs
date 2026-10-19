// Final production verification: a live viewport shot of the work index with
// the third row hovered, so the deployed behaviour is confirmed, not assumed.
import { chromium } from "file:///C:/Users/aksha/AppData/Roaming/npm/node_modules/omniroute/node_modules/playwright/index.mjs";

const BASE = process.env.BASE || "https://imperial-development.vercel.app";
const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });

const errs = [];
page.on("console", (m) => m.type() === "error" && errs.push(m.text()));
page.on("pageerror", (e) => errs.push(String(e.message)));
page.on("response", (r) => {
  if (r.status() >= 400) errs.push(`HTTP ${r.status()} ${r.url()}`);
});

await page.goto(BASE, { waitUntil: "networkidle", timeout: 60000 });
// the live site uses scroll-behavior:smooth — an instant scroll keeps the
// pointer over the row we are about to hover.
await page.addStyleTag({ content: "html{scroll-behavior:auto !important}" });
await page.evaluate(() => {
  const el = document.querySelector("#work");
  window.scrollTo({
    top: el.getBoundingClientRect().top + window.scrollY - 40,
    behavior: "instant",
  });
});
await page.waitForTimeout(900);
await page.locator(".work-row").nth(2).hover();
await page.waitForTimeout(1000);
await page.screenshot({ path: "qa/prod-work-terra.png" });

const state = await page.evaluate(() => {
  const pv = document.querySelector(".work-preview");
  const pr = pv.getBoundingClientRect();
  const rows = [...document.querySelectorAll(".work-row")].map((r) => {
    const rr = r.getBoundingClientRect();
    return { t: r.querySelector("h3").textContent, mid: (rr.top + rr.bottom) / 2 };
  });
  return {
    nearestRow: rows.reduce((a, b) =>
      Math.abs(b.mid - (pr.top + pr.bottom) / 2) <
      Math.abs(a.mid - (pr.top + pr.bottom) / 2)
        ? b
        : a,
    ).t,
    caption: document.querySelector(".work-preview p").textContent.trim(),
    tickOn: !!document.querySelector(".work-tick.is-on"),
    tickLeft: Math.round(document.querySelector(".work-tick").getBoundingClientRect().left),
    titleLeft: Math.round(document.querySelector("#work li h3").getBoundingClientRect().left),
    mainLandmark: !!document.querySelector("main#content"),
    ogImage: document.querySelector('meta[property="og:image"]')?.content,
  };
});

await browser.close();
console.log(JSON.stringify({ state, errs }, null, 2));
