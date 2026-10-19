// One-off visual QA: shoot the agency site at several widths and themes.
import { chromium } from "file:///C:/Users/aksha/AppData/Roaming/npm/node_modules/omniroute/node_modules/playwright/index.mjs";

const BASE = "http://localhost:3111";
const out = "qa";

const viewports = [
  { w: 1440, h: 900, tag: "desk" },
  { w: 820, h: 1180, tag: "tab" },
  { w: 390, h: 844, tag: "mob" },
];

const themes = ["lime", "amber", "bone", "ice"];

const browser = await chromium.launch();

const errors = [];

// Theme + desktop full-page sweep
for (const theme of themes) {
  const page = await browser.newPage({
    viewport: { width: 1440, height: 900 },
  });
  page.on("console", (m) => {
    if (m.type() === "error") errors.push(`[${theme}] console: ${m.text()}`);
  });
  page.on("pageerror", (e) => errors.push(`[${theme}] pageerror: ${e.message}`));
  await page.goto(BASE, { waitUntil: "networkidle" });
  await page.evaluate((t) => localStorage.setItem("imperial-theme", t), theme);
  await page.reload({ waitUntil: "networkidle" });
  // trigger every reveal before shooting. Smooth scrolling would make each
  // scrollTo animate and get retargeted before landing, so force instant.
  await page.addStyleTag({ content: "html{scroll-behavior:auto !important}" });
  await page.evaluate(async () => {
    const step = window.innerHeight * 0.6;
    for (let y = 0; y < document.body.scrollHeight; y += step) {
      window.scrollTo({ top: y, behavior: "instant" });
      await new Promise((r) => setTimeout(r, 120));
    }
    window.scrollTo({ top: document.body.scrollHeight, behavior: "instant" });
    await new Promise((r) => setTimeout(r, 400));
    window.scrollTo({ top: 0, behavior: "instant" });
    await new Promise((r) => setTimeout(r, 500));
  });
  await page.waitForTimeout(1200);
  await page.screenshot({ path: `${out}/${theme}-full.png`, fullPage: true });
  await page.close();
}

// Viewport widths on the default theme
for (const v of viewports) {
  const page = await browser.newPage({ viewport: { width: v.w, height: v.h } });
  page.on("pageerror", (e) => errors.push(`[${v.tag}] pageerror: ${e.message}`));
  await page.goto(BASE, { waitUntil: "networkidle" });
  await page.evaluate(() => localStorage.removeItem("imperial-theme"));
  await page.reload({ waitUntil: "networkidle" });
  await page.addStyleTag({ content: "html{scroll-behavior:auto !important}" });
  await page.evaluate(async () => {
    const step = window.innerHeight * 0.6;
    for (let y = 0; y < document.body.scrollHeight; y += step) {
      window.scrollTo({ top: y, behavior: "instant" });
      await new Promise((r) => setTimeout(r, 110));
    }
    window.scrollTo({ top: document.body.scrollHeight, behavior: "instant" });
    await new Promise((r) => setTimeout(r, 400));
    window.scrollTo({ top: 0, behavior: "instant" });
    await new Promise((r) => setTimeout(r, 400));
  });
  await page.waitForTimeout(1000);
  await page.screenshot({ path: `${out}/${v.tag}-full.png`, fullPage: true });
  await page.close();
}

// Hover state on the work index (desktop)
{
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  await page.goto(BASE, { waitUntil: "networkidle" });
  await page.locator("#work").scrollIntoViewIfNeeded();
  await page.waitForTimeout(700);
  const row = page.locator(".work-row").nth(1);
  await row.hover();
  await page.waitForTimeout(900);
  await page.screenshot({ path: `${out}/work-hover.png` });
  await page.close();
}

// Horizontal overflow check at every width
const overflow = [];
for (const w of [390, 480, 768, 820, 1024, 1280, 1440, 1920]) {
  const page = await browser.newPage({ viewport: { width: w, height: 900 } });
  await page.goto(BASE, { waitUntil: "networkidle" });
  await page.addStyleTag({ content: "html{scroll-behavior:auto !important}" });
  await page.evaluate(async () => {
    const step = window.innerHeight * 0.6;
    for (let y = 0; y < document.body.scrollHeight; y += step) {
      window.scrollTo({ top: y, behavior: "instant" });
      await new Promise((r) => setTimeout(r, 80));
    }
    window.scrollTo({ top: document.body.scrollHeight, behavior: "instant" });
    await new Promise((r) => setTimeout(r, 300));
  });
  const res = await page.evaluate(() => ({
    scrollW: document.documentElement.scrollWidth,
    clientW: document.documentElement.clientWidth,
    offenders: [...document.querySelectorAll("*")]
      .filter((el) => el.getBoundingClientRect().right > document.documentElement.clientWidth + 1)
      .slice(0, 5)
      .map((el) => `${el.tagName}.${(el.className || "").toString().slice(0, 40)}`),
  }));
  if (res.scrollW > res.clientW + 1) {
    overflow.push({ w, ...res });
  }
  await page.close();
}

// Structural checks — scroll through first so reveals have fired, then assert
// nothing the reader should see is still sitting at opacity 0.
const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
await page.goto(BASE, { waitUntil: "networkidle" });
await page.addStyleTag({ content: "html{scroll-behavior:auto !important}" });
await page.evaluate(async () => {
  const step = window.innerHeight * 0.6;
  for (let y = 0; y < document.body.scrollHeight; y += step) {
    window.scrollTo({ top: y, behavior: "instant" });
    await new Promise((r) => setTimeout(r, 90));
  }
  window.scrollTo({ top: document.body.scrollHeight, behavior: "instant" });
  await new Promise((r) => setTimeout(r, 1600));
});
const audit = await page.evaluate(() => {
  const headings = [...document.querySelectorAll("h1,h2,h3")].map((h) => h.tagName);
  const imgs = [...document.querySelectorAll("img")];
  // any reveal that never fired = content stuck invisible to the reader
  const stuck = [...document.querySelectorAll(".reveal:not(.is-visible)")].length;
  return {
    h1Count: document.querySelectorAll("h1").length,
    headings,
    // null = genuinely missing; "" is valid and marks a decorative image
    imgsMissingAlt: imgs.filter((i) => i.getAttribute("alt") === null).length,
    decorativeImgs: imgs.filter((i) => i.getAttribute("alt") === "").length,
    linksWithoutHref: [...document.querySelectorAll("a")].filter((a) => !a.getAttribute("href")).length,
    title: document.title,
    lang: document.documentElement.lang,
    emailLinks: document.querySelectorAll('a[href^="mailto:"]').length,
    stuckHidden: stuck,
    theme: document.documentElement.getAttribute("data-theme"),
    jsClass: document.documentElement.classList.contains("js"),
  };
});
await page.close();

// JS-off: content must still render (reveals are gated on .js)
const noJs = await browser.newContext({ javaScriptEnabled: false });
const p2 = await noJs.newPage();
await p2.goto(BASE, { waitUntil: "load" });
const noJsAudit = await p2.evaluate(() => ({
  hiddenCount: [...document.querySelectorAll(".reveal")].filter(
    (el) => getComputedStyle(el).opacity === "0",
  ).length,
  totalReveals: document.querySelectorAll(".reveal").length,
  servicesText: document.querySelector("#services")?.textContent?.slice(0, 60),
}));
await p2.close();
await noJs.close();

await browser.close();

console.log(JSON.stringify({ errors, overflow, audit, noJsAudit }, null, 2));
