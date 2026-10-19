// One-off: high-res crops of specific sections so typography defects are
// actually visible instead of being guessed at from a downscaled full-page shot.
import { chromium } from "file:///C:/Users/aksha/AppData/Roaming/npm/node_modules/omniroute/node_modules/playwright/index.mjs";

const BASE = "http://localhost:3111";
const browser = await chromium.launch();

async function shoot(viewport, theme, selectors) {
  const page = await browser.newPage({ viewport });
  await page.goto(BASE, { waitUntil: "networkidle" });
  await page.evaluate((t) => localStorage.setItem("imperial-theme", t), theme);
  await page.reload({ waitUntil: "networkidle" });
  await page.addStyleTag({ content: "html{scroll-behavior:auto !important}" });
  await page.evaluate(async () => {
    const step = window.innerHeight * 0.6;
    for (let y = 0; y < document.body.scrollHeight; y += step) {
      window.scrollTo({ top: y, behavior: "instant" });
      await new Promise((r) => setTimeout(r, 100));
    }
    window.scrollTo({ top: 0, behavior: "instant" });
    await new Promise((r) => setTimeout(r, 600));
  });
  await page.waitForTimeout(900);

  for (const [name, sel] of selectors) {
    const el = page.locator(sel).first();
    try {
      await el.scrollIntoViewIfNeeded();
      await page.waitForTimeout(700);
      await el.screenshot({ path: `qa/crop-${name}.png` });
      console.log("shot", name);
    } catch (e) {
      console.log("FAIL", name, e.message.split("\n")[0]);
    }
  }

  // measure the contact headline's real box + line count
  const contact = await page.evaluate(() => {
    const h2 = document.querySelector("#contact h2");
    if (!h2) return null;
    const r = h2.getBoundingClientRect();
    const cs = getComputedStyle(h2);
    const lh = parseFloat(cs.lineHeight);
    return {
      width: Math.round(r.width),
      height: Math.round(r.height),
      fontSize: cs.fontSize,
      lines: lh ? Math.round(r.height / lh) : null,
      text: h2.textContent,
    };
  });
  console.log("CONTACT_H2", JSON.stringify(contact));

  await page.close();
}

await shoot({ width: 1440, height: 900 }, "lime", [
  ["contact", "#contact"],
  ["work", "#work"],
  ["services", "#services"],
  ["process", "#process"],
  ["hero", "header"],
  ["numbers", 'section[aria-label="By the numbers"]'],
]);

await shoot({ width: 390, height: 844 }, "lime", [
  ["mob-contact", "#contact"],
  ["mob-work", "#work"],
  ["mob-hero", "header"],
]);

await browser.close();
