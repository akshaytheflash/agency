// Re-encode the three work screenshots. The source PNGs are 97KB / 1.5MB /
// 340KB; the Noir one alone is heavier than the whole rest of the page.
// Sharp does the work: read PNG, write optimised WebP at 1200px wide.
import sharp from "sharp";
import { readdir, stat } from "node:fs/promises";
import path from "node:path";

const dir = "public/work";
const files = (await readdir(dir)).filter((f) => f.endsWith(".png"));

for (const f of files) {
  const src = path.join(dir, f);
  const before = (await stat(src)).size;
  const img = sharp(src);
  const meta = await img.metadata();

  const out = path.join(dir, f.replace(/\.png$/, ".webp"));
  await sharp(src)
    .resize({ width: 1200, withoutEnlargement: true })
    .webp({ quality: 84, effort: 6 })
    .toFile(out);

  const after = (await stat(out)).size;
  console.log(
    `${f}  ${meta.width}x${meta.height}  ${(before / 1024).toFixed(0)}KB -> ${(after / 1024).toFixed(0)}KB webp`,
  );
}
