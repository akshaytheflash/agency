// One-off: capture 1440x900 hero screenshots of the three live Aurelia demos
// for the agency work index. Run once, output lands in public/work/.
import { chromium } from "file:///C:/Users/aksha/AppData/Roaming/npm/node_modules/omniroute/node_modules/playwright/index.mjs";

const shots = [
  ["lumen", "https://aurelia-01-lumen.vercel.app"],
  ["noir", "https://aurelia-02-noir.vercel.app"],
  ["terra", "https://aurelia-03-terra.vercel.app"],
];

const browser = await chromium.launch();
for (const [name, url] of shots) {
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  await page.goto(url, { waitUntil: "networkidle", timeout: 60000 });
  // let lazy images + entry animations settle before we shoot
  await page.waitForTimeout(3500);
  await page.screenshot({ path: `public/work/${name}.png` });
  console.log("captured", name, url);
  await page.close();
}
await browser.close();
