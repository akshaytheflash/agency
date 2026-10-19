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

/* ---------- 10. Ghost numeral vs section eyebrow: do they collide? ----------
   The oversized faint numeral is a watermark, but it is real type: at 10rem
   its ink ran 3px into the "01 / Selected work" eyebrow. Layout boxes do not
   show this — the glyphs sit lower inside their leading-none line box than
   the box suggests — so this measures the painted pixels directly.

   Each element is rendered alone (everything else in the section is hidden,
   the grain overlay is off) and the ink is found by thresholding against the
   background. The gap must be positive. */
{
  const sharp = (await import("sharp")).default;
  const NUM_ISOLATE = `.grain{display:none!important}
    #work *{visibility:hidden!important}
    #work .font-display[aria-hidden='true']{visibility:visible!important}`;
  const LABEL_ISOLATE = `.grain{display:none!important}
    #work *{visibility:hidden!important}
    #work p.text-accent{visibility:visible!important}`;

  const inkBox = async (page, css, sel, pad) => {
    const tag = await page.addStyleTag({ content: css });
    await page.waitForTimeout(150);
    const r = await page.evaluate(
      ({ s, p }) => {
        const b = document.querySelector(s).getBoundingClientRect();
        return {
          x: Math.floor(b.left) - 4,
          y: Math.floor(b.top) - p,
          width: Math.ceil(b.width) + 8,
          height: Math.ceil(b.height) + p * 2,
        };
      },
      { s: sel, p: pad },
    );
    const cy = Math.max(0, r.y);
    const buf = await page.screenshot({
      clip: { x: Math.max(0, r.x), y: cy, width: r.width, height: r.height },
    });
    const { data, info } = await sharp(buf)
      .raw()
      .toBuffer({ resolveWithObject: true });
    const { width, height, channels } = info;
    let top = null;
    let bot = null;
    for (let y = 0; y < height; y++) {
      let n = 0;
      for (let x = 0; x < width; x++) {
        const i = (y * width + x) * channels;
        // background is #0e0e0c (14) in the dark themes; the 5% ghost ink
        // lands around 25. The label is full-strength accent.
        if (Math.max(data[i], data[i + 1], data[i + 2]) > 20) n++;
      }
      if (n >= 2) {
        if (top === null) top = y;
        bot = y;
      }
    }
    await page.evaluate((t) => t.remove(), tag);
    return { top: top === null ? null : top + cy, bot: bot === null ? null : bot + cy };
  };

  const numeralCollisions = [];
  for (const width of [1440, 1280, 1024, 820, 390]) {
    const page = await browser.newPage({ viewport: { width, height: 900 } });
    await page.goto(BASE, { waitUntil: "networkidle" });
    await page.addStyleTag({
      content: "html{scroll-behavior:auto !important}",
    });
    await page.evaluate(() => {
      const el = document.querySelector("#work");
      window.scrollTo({
        top: el.getBoundingClientRect().top + window.scrollY,
        behavior: "instant",
      });
    });
    await page.waitForTimeout(600);

    const num = await inkBox(
      page,
      NUM_ISOLATE,
      "#work .font-display[aria-hidden='true']",
      80,
    );
    const label = await inkBox(page, LABEL_ISOLATE, "#work p.text-accent", 30);
    const geo = await page.evaluate(() => {
      const n = document
        .querySelector("#work .font-display[aria-hidden='true']")
        .getBoundingClientRect();
      const l = document.querySelector("#work p.text-accent").getBoundingClientRect();
      const s = document.querySelector("#work").getBoundingClientRect();
      return {
        numeralLeft: Math.round(n.left),
        labelLeft: Math.round(l.left),
        sectionTop: Math.round(s.top),
      };
    });

    const gap = label.top - num.bot;
    numeralCollisions.push({
      width,
      gapPx: gap,
      collides: gap < 0,
      tooTight: gap >= 0 && gap < 24,
      leftAligned: geo.numeralLeft === geo.labelLeft,
      numeralInk: [num.top, num.bot],
      labelInkTop: label.top,
      inkTopBelowSectionTop: num.top - geo.sectionTop,
      bleedsAboveSection: num.top < geo.sectionTop,
    });
    await page.close();
  }
  report.ghostNumeral = numeralCollisions;
}

/* ---------- 11. Work rows: does the text sit inside the hover band? ----------
   The hover tint is a full-bleed band. If the row has no horizontal padding
   the title and the blurb sit flush against the band's edge, which reads as
   a mis-registered box rather than a highlight. The text must have margin on
   both sides, the band must stay clear of the preview column, and the band
   and the hairline rule must share the same edges. */
{
  const rows = [];
  for (const width of [1440, 1280, 1024, 820, 390]) {
    const page = await browser.newPage({ viewport: { width, height: 900 } });
    await page.goto(BASE, { waitUntil: "networkidle" });
    await page.addStyleTag({ content: "html{scroll-behavior:auto !important}" });
    await page.evaluate(() => {
      const el = document.querySelector("#work");
      window.scrollTo({
        top: el.getBoundingClientRect().top + window.scrollY,
        behavior: "instant",
      });
    });
    await page.waitForTimeout(500);
    const row = await page.evaluate(() => {
      const a = document.querySelector("#work .work-row");
      const li = a.closest("li");
      const h3 = a.querySelector("h3");
      const blurb = a.querySelector("p");
      const year = a.querySelector(".tabular-nums");
      const preview = document.querySelector(".work-preview");
      const tick = document.querySelector(".work-tick");
      const R = (el) => el.getBoundingClientRect();
      const ar = R(a);
      const lr = R(li);
      // the preview column and the tick only exist at lg and up
      const previewShown = preview.offsetParent !== null;
      const tickShown = tick.offsetParent !== null;
      return {
        bandLeft: Math.round(ar.left),
        bandRight: Math.round(ar.right),
        ruleLeft: Math.round(lr.left),
        ruleRight: Math.round(lr.right),
        textLeft: Math.round(R(h3).left),
        blurbLeft: Math.round(R(blurb).left),
        yearRight: Math.round(R(year).right),
        previewLeft: previewShown ? Math.round(R(preview).left) : null,
        tickLeft: tickShown ? Math.round(R(tick).left) : null,
      };
    });
    rows.push({
      width,
      textMarginLeft: row.textLeft - row.bandLeft,
      blurbMarginLeft: row.blurbLeft - row.bandLeft,
      yearMarginRight: row.bandRight - row.yearRight,
      bandMatchesRule:
        row.bandLeft === row.ruleLeft && row.bandRight === row.ruleRight,
      gutterToPreview:
        row.previewLeft === null ? null : row.previewLeft - row.bandRight,
      tickToText: row.tickLeft === null ? null : row.textLeft - row.tickLeft,
      flushLeft: row.textLeft - row.bandLeft < 12,
      flushRight: row.bandRight - row.yearRight < 12,
      ruleMismatch:
        row.bandLeft !== row.ruleLeft || row.bandRight !== row.ruleRight,
      crowdsPreview:
        row.previewLeft !== null && row.previewLeft - row.bandRight < 24,
    });
    await page.close();
  }
  report.workRowBand = rows;
}

await browser.close();
console.log(JSON.stringify(report, null, 2));
