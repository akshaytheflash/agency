// Renders the social share card (1200x630) used for Open Graph / Twitter.
//
// It is drawn in the real page — same fonts, same tokens — by loading the
// site, swapping the body for the card markup and screenshotting it. That
// way the card can never drift away from the site's design system.
//
//   node scripts/og.mjs
import { chromium } from "file:///C:/Users/aksha/AppData/Roaming/npm/node_modules/omniroute/node_modules/playwright/index.mjs";

const BASE = process.env.BASE || "http://localhost:3111";
const OUT = "public/og.png";

const browser = await chromium.launch();
const page = await browser.newPage({
  viewport: { width: 1200, height: 630 },
  deviceScaleFactor: 1,
});
await page.goto(BASE, { waitUntil: "networkidle" });
await page.evaluate(() => document.fonts.ready);

await page.evaluate(() => {
  document.documentElement.setAttribute("data-theme", "lime");
  document.body.className = "";
  document.body.style.cssText =
    "margin:0;background:#0e0e0c;color:#edeae2;width:1200px;height:630px;overflow:hidden;";

  document.body.innerHTML = `
    <div style="
      position:relative;width:1200px;height:630px;
      display:flex;flex-direction:column;justify-content:space-between;
      padding:64px 72px;
      background:#0e0e0c;
      font-family:var(--font-inter),system-ui,sans-serif;
    ">
      <div style="
        position:absolute;inset:0;
        background-image:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='180' height='180'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
        opacity:0.05;pointer-events:none;
      "></div>

      <div style="position:relative;display:flex;align-items:center;justify-content:space-between;border-bottom:1px solid #26261f;padding-bottom:26px;">
        <span style="font-size:15px;letter-spacing:0.24em;text-transform:uppercase;color:#edeae2;">Imperial Development Agency</span>
        <span style="font-size:15px;letter-spacing:0.2em;text-transform:uppercase;color:#8a877e;">New Delhi, India</span>
      </div>

      <div style="position:relative;">
        <div style="width:56px;height:3px;background:#c8ff3d;margin-bottom:34px;"></div>
        <h1 style="
          margin:0;
          font-family:var(--font-instrument),Georgia,serif;
          font-weight:400;letter-spacing:-0.028em;line-height:0.94;
          font-size:112px;color:#edeae2;max-width:1000px;
        ">Real websites,<br>live in three days.</h1>
      </div>

      <div style="position:relative;display:flex;align-items:center;justify-content:space-between;border-top:1px solid #26261f;padding-top:26px;">
        <span style="font-size:15px;letter-spacing:0.2em;text-transform:uppercase;color:#8a877e;">Est. 2026 &nbsp;·&nbsp; Frontend / Backend / AI / DevOps</span>
        <span style="font-size:15px;letter-spacing:0.2em;text-transform:uppercase;color:#c8ff3d;">50 projects shipped</span>
      </div>
    </div>`;
});

await page.waitForTimeout(400);
await page.locator("body > div").screenshot({ path: OUT });
await browser.close();
console.log("wrote", OUT);
