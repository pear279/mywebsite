import fs from "node:fs";
import path from "node:path";
const root = path.resolve("out");
const base = process.env.NEXT_PUBLIC_BASE_PATH || "";
const walk = (p) =>
  fs
    .readdirSync(p, { withFileTypes: true })
    .flatMap((e) =>
      e.isDirectory() ? walk(path.join(p, e.name)) : [path.join(p, e.name)],
    );
const files = walk(root),
  pages = files.filter((f) => f.endsWith(".html"));
const errors = [];
let refs = 0;
for (const file of pages) {
  const html = fs.readFileSync(file, "utf8");
  const ids = new Set([...html.matchAll(/\bid="([^"]+)"/g)].map((m) => m[1]));
  for (const m of html.matchAll(/\b(?:src|href|data)="([^"]+)"/g)) {
    let ref = m[1].replaceAll("&amp;", "&");
    if (/^(?:https?:|mailto:|tel:|data:)/.test(ref)) continue;
    if (ref.startsWith("#")) {
      if (ref.length > 1 && !ids.has(ref.slice(1)))
        errors.push(`${file}: missing anchor ${ref}`);
      continue;
    }
    if (!ref.startsWith("/")) continue;
    refs++;
    const clean = decodeURIComponent(ref.split(/[?#]/)[0]);
    if (base && !clean.startsWith(base + "/") && clean !== base)
      errors.push(`${file}: wrong base ${clean}`);
    const relative = base ? clean.slice(base.length) : clean;
    const target = path.join(root, relative);
    if (
      !fs.existsSync(target) &&
      !fs.existsSync(path.join(target, "index.html"))
    )
      errors.push(`${file}: missing ${ref}`);
  }
}
if (errors.length) {
  console.error(errors.join("\n"));
  process.exit(1);
}
console.log(
  `Verified ${pages.length} exported pages and ${refs} local asset/link references.`,
);
