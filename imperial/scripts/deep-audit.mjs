// Deep design + UX audit. Measures the things a screenshot cannot confirm:
// contrast per theme, tap targets, image weight, whether the work preview
// actually follows the hovered row, marquee seamlessness, focus order,
// and fixed-overlay collisions.
import { chromium } from "file:///C:/Users/aksha/AppData/Roaming/npm/node_modules/omniroute/node_modules/playwright/index.mjs";

const BASE = process.env.BASE || "http://localhost:3111";
const browser = await chromium.launch();
const report = {};

/* ---------- 1. Contrast, every token pair, every theme ---------- */
const contrast = await browser.newPage({ viewport: { width: 1440, height: 900 } });
await contrast.goto(BASE, { waitUntil: "networkidle" });
const contrastReport = {};
for (const theme of ["lime", "amber", "bone", "ice"]) {
  await contrast.evaluate((t) => localStorage.setItem("imperial-theme", t), theme);
  await contrast.reload({ waitUntil: "networkidle" });
  contrastReport[theme] = await contrast.evaluate(() => {
    const cs = getComputedStyle(document.documentElement);
    const v = (n) => cs.getPropertyValue(n).trim();
    const lum = (hex) => {
      const m = hex.replace("#", "");
      const full =
        m.length === 3
          ? m.split("").map((c) => c + c).join("")
          : m;
      const c = [0, 2, 4].map((i) => {
        const s = parseInt(full.slice(i, i + 2), 16) / 255;
        return s <= 0.03928 ? s / 12.92 : ((s + 0.055) / 1.055) ** 2.4;
      });
      return 0.2126 * c[0] + 0.7152 * c[1] + 0.0722 * c[2];
    };
    const ratio = (a, b) => {
      const l1 = lum(a);
      const l2 = lum(b);
      return Math.round(((Math.max(l1, l2) + 0.05) / (Math.min(l1, l2) + 0.05)) * 100) / 100;
    };
    const bg = v("--bg");
    const surface = v("--surface");
    const ink = v("--ink");
    const muted = v("--muted");
    const accent = v("--accent");
    const accentInk = v("--accent-ink");
    const line = v("--line");
    return {
      ink_on_bg: ratio(ink, bg),
      ink_on_surface: ratio(ink, surface),
      muted_on_bg: ratio(muted, bg),
      muted_on_surface: ratio(muted, surface),
      accent_on_bg: ratio(accent, bg),
      accent_on_surface: ratio(accent, surface),
      accentInk_on_accent: ratio(accentInk, accent),
      line_on_bg: ratio(line, bg),
    };
  });
}
report.contrast = contrastReport;
await contrast.close();

/* ---------- 2. Work preview: does it follow the hovered row? ---------- */
{
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  await page.goto(BASE, { waitUntil: "networkidle" });
  await page.locator("#work").scrollIntoViewIfNeeded();
  await page.waitForTimeout(600);
  const geo = async () =>
    page.evaluate(() => {
      const pv = document.querySelector(".work-preview");
      const pvr = pv.getBoundingClientRect();
      const rows = [...document.querySelectorAll(".work-row")].map((r) => {
        const rr = r.getBoundingClientRect();
        return { title: r.querySelector("h3")?.textContent, top: Math.round(rr.top), bottom: Math.round(rr.bottom), mid: Math.round((rr.top + rr.bottom) / 2) };
      });
      return {
        previewTop: Math.round(pvr.top),
        previewBottom: Math.round(pvr.bottom),
        previewMid: Math.round((pvr.top + pvr.bottom) / 2),
        rows,
        nearestRow: rows.reduce(
          (best, r) =>
            Math.abs(r.mid - Math.round((pvr.top + pvr.bottom) / 2)) <
            Math.abs(best.mid - Math.round((pvr.top + pvr.bottom) / 2))
              ? r
              : best,
          rows[0],
        )?.title,
      };
    });

  const rows = page.locator(".work-row");
  const first = await geo();
  await rows.nth(2).hover();
  await page.waitForTimeout(700);
  const afterHoverLast = await geo();
  report.workPreview = {
    initial: { previewMid: first.previewMid, rows: first.rows.map((r) => r.title), nearest: first.nearestRow },
    afterHoveringLast: { previewMid: afterHoverLast.previewMid, nearest: afterHoverLast.nearestRow },
    followsRow: afterHoverLast.previewMid !== first.previewMid,
  };
  await page.close();
}

/* ---------- 3. Oversized background numerals — clipped by their section? ---------- */
{
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  await page.goto(BASE, { waitUntil: "networkidle" });
  await page.evaluate(async () => {
    const step = window.innerHeight * 0.6;
    for (let y = 0; y < document.body.scrollHeight; y += step) {
      window.scrollTo({ top: y, behavior: "instant" });
      await new Promise((r) => setTimeout(r, 80));
    }
    window.scrollTo({ top: 0, behavior: "instant" });
    await new Promise((r) => setTimeout(r, 400));
  });
  report.numerals = await page.evaluate(() => {
    return [...document.querySelectorAll('[aria-hidden="true"].font-display')]
      .map((el) => {
        const r = el.getBoundingClientRect();
        const sec = el.closest("section, header, footer");
        const sr = sec.getBoundingClientRect();
        return {
          text: el.textContent.trim(),
          top: Math.round(r.top),
          bottom: Math.round(r.bottom),
          sectionTop: Math.round(sr.top),
          sectionBottom: Math.round(sr.bottom),
          overflowsTop: Math.round(sr.top - r.top),
          overflowsBottom: Math.round(r.bottom - sr.bottom),
          bleedsIntoPreviousSection: r.top < sr.top,
        };
      })
      .filter((n) => n.text && /^\d+$/.test(n.text));
  });
  await page.close();
}

/* ---------- 4. Tap targets + link semantics ---------- */
{
  const page = await browser.newPage({ viewport: { width: 390, height: 844 } });
  await page.goto(BASE, { waitUntil: "networkidle" });
  report.mobileTargets = await page.evaluate(() => {
    const els = [...document.querySelectorAll("a, button, input, select, textarea")];
    const small = [];
    for (const el of els) {
      const r = el.getBoundingClientRect();
      if (r.width === 0 && r.height === 0) continue; // hidden
      if (r.height < 24 || r.width < 24) {
        small.push({
          tag: el.tagName,
          text: (el.textContent || "").trim().slice(0, 30),
          w: Math.round(r.width),
          h: Math.round(r.height),
        });
      }
    }
    return { total: els.length, tooSmall: small };
  });
  await page.close();
}

/* ---------- 5. Images: bytes, dimensions, CLS risk ---------- */
{
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  const bytes = {};
  page.on("response", async (r) => {
    try {
      const u = r.url();
      if (/\.(png|jpe?g|webp|avif|svg)$/i.test(u)) {
        const len = Number(r.headers()["content-length"] || 0);
        bytes[u.split("/").pop()] = len;
      }
    } catch {}
  });
  await page.goto(BASE, { waitUntil: "networkidle" });
  report.images = await page.evaluate(() =>
    [...document.querySelectorAll("img")].map((i) => ({
      src: i.getAttribute("src"),
      alt: i.getAttribute("alt"),
      hasDims: i.getAttribute("width") && i.getAttribute("height"),
      loading: i.getAttribute("loading"),
      nw: i.naturalWidth,
      nh: i.naturalHeight,
      displayed: Math.round(i.getBoundingClientRect().width),
    })),
  );
  report.imageBytes = bytes;
  await page.close();
}

/* ---------- 6. Marquee seamlessness: is the track >= 2x viewport? ---------- */
{
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  await page.goto(BASE, { waitUntil: "networkidle" });
  report.marquee = await page.evaluate(() => {
    const track = document.querySelector(".marquee-track");
    const kids = [...track.children];
    return {
      viewport: window.innerWidth,
      trackWidth: Math.round(track.getBoundingClientRect().width),
      halves: kids.map((k) => Math.round(k.getBoundingClientRect().width)),
      halvesIdentical: kids.length === 2 && kids[0].innerHTML === kids[1].innerHTML,
      coversViewportTwice: track.getBoundingClientRect().width >= window.innerWidth * 2,
    };
  });
  await page.close();
}

/* ---------- 7. Fixed overlay collisions (theme switcher over content?) ---------- */
{
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  await page.goto(BASE, { waitUntil: "networkidle" });
  await page.evaluate(async () => {
    const step = window.innerHeight * 0.6;
    for (let y = 0; y < document.body.scrollHeight; y += step) {
      window.scrollTo({ top: y, behavior: "instant" });
      await new Promise((r) => setTimeout(r, 60));
    }
  });
  report.fixedCollisions = await page.evaluate(() => {
    const fixed = [...document.querySelectorAll("*")].filter((el) => {
      const p = getComputedStyle(el).position;
      return p === "fixed" && el.getBoundingClientRect().width > 0;
    });
    const out = [];
    for (const f of fixed) {
      const fr = f.getBoundingClientRect();
      const hits = [];
      for (const el of document.querySelectorAll("a, p, h1, h2, h3, li, span")) {
        if (f.contains(el) || el.contains(f)) continue;
        const r = el.getBoundingClientRect();
        if (r.width === 0 || r.height === 0) continue;
        const overlap =
          r.left < fr.right &&
          r.right > fr.left &&
          r.top < fr.bottom &&
          r.bottom > fr.top;
        if (overlap) {
          hits.push({
            tag: el.tagName,
            text: (el.textContent || "").trim().slice(0, 40),
          });
        }
      }
      if (hits.length) {
        out.push({
          fixed: f.className?.toString().slice(0, 60) || f.tagName,
          rect: { t: Math.round(fr.top), l: Math.round(fr.left), w: Math.round(fr.width), h: Math.round(fr.height) },
          overlappingCount: hits.length,
          examples: hits.slice(0, 5),
        });
      }
    }
    return out;
  });
  await page.close();
}

/* ---------- 8. Keyboard order + focus visibility ---------- */
{
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  await page.goto(BASE, { waitUntil: "networkidle" });
  const order = [];
  for (let i = 0; i < 14; i++) {
    await page.keyboard.press("Tab");
    const info = await page.evaluate(() => {
      const a = document.activeElement;
      const cs = getComputedStyle(a);
      return {
        tag: a.tagName,
        text: (a.textContent || a.getAttribute("aria-label") || "").trim().slice(0, 34),
        outline: cs.outlineWidth,
        outlineStyle: cs.outlineStyle,
      };
    });
    order.push(info);
  }
  report.focusOrder = order;
  await page.close();
}

/* ---------- 9. Heading outline + landmark sanity ---------- */
{
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  await page.goto(BASE, { waitUntil: "networkidle" });
  report.semantics = await page.evaluate(() => ({
    landmarks: [...document.querySelectorAll("header,nav,main,section,footer")]
      .map((e) => e.tagName.toLowerCase() + (e.id ? `#${e.id}` : ""))
      .filter((s) => !s.startsWith("section:not")),
    mainCount: document.querySelectorAll("main").length,
    h1: [...document.querySelectorAll("h1")].map((h) => h.textContent.trim().slice(0, 50)),
    h2: [...document.querySelectorAll("h2")].map((h) => h.textContent.trim().slice(0, 40)),
    sectionsWithH2: [...document.querySelectorAll("section[id]")].map((s) => ({
      id: s.id,
      hasH2: !!s.querySelector("h2"),
    })),
    externalLinksSafe: [...document.querySelectorAll('a[target="_blank"]')].every((a) =>
      /noopener/.test(a.rel || ""),
    ),
  }));
  await page.close();
}

await browser.close();
console.log(JSON.stringify(report, null, 2));
