// Viewport-accurate shots (not full-page), so fixed overlays are where they
// really sit on screen.
import { chromium } from "file:///C:/Users/aksha/AppData/Roaming/npm/node_modules/omniroute/node_modules/playwright/index.mjs";

const BASE = process.env.BASE || "http://localhost:3111";
const browser = await chromium.launch();

async function shot(name, width, height, scrollTo, theme = "lime", hover) {
  const page = await browser.newPage({ viewport: { width, height } });
  await page.goto(BASE, { waitUntil: "networkidle" });
  await page.evaluate((t) => localStorage.setItem("imperial-theme", t), theme);
  await page.reload({ waitUntil: "networkidle" });
  await page.addStyleTag({ content: "html{scroll-behavior:auto !important}" });
  await page.evaluate(async (target) => {
    const step = window.innerHeight * 0.6;
    for (let y = 0; y < document.body.scrollHeight; y += step) {
      window.scrollTo({ top: y, behavior: "instant" });
      await new Promise((r) => setTimeout(r, 70));
    }
    window.scrollTo({ top: 0, behavior: "instant" });
    await new Promise((r) => setTimeout(r, 300));
    if (target) {
      const el = document.querySelector(target);
      if (el) {
        const y = el.getBoundingClientRect().top + window.scrollY - 40;
        window.scrollTo({ top: y, behavior: "instant" });
        await new Promise((r) => setTimeout(r, 900));
      }
    }
  }, scrollTo);
  if (hover !== undefined) {
    await page.locator(".work-row").nth(hover).hover();
    await page.waitForTimeout(900);
  }
  await page.screenshot({ path: `qa/vp-${name}.png` });
  await page.close();
  console.log("shot", name);
}

await shot("hero-1440", 1440, 900, null);
await shot("work-1440", 1440, 900, "#work");
await shot("work-hover-noir", 1440, 900, "#work", "lime", 1);
await shot("work-hover-terra", 1440, 900, "#work", "lime", 2);
await shot("hero-390", 390, 844, null);
await shot("bone-work", 1440, 900, "#work", "bone");
await shot("ice-hero", 1440, 900, null, "ice");

await browser.close();
