import { cpSync, mkdirSync } from "node:fs";
const source = "node_modules/pdfjs-dist";
const destination = "public/pdfjs/4.10.38";
mkdirSync(destination, { recursive: true });
cpSync(`${source}/legacy/build/pdf.worker.min.mjs`, `${destination}/pdf.worker.min.mjs`);
for (const directory of ["cmaps", "standard_fonts"]) {
  cpSync(`${source}/${directory}`, `${destination}/${directory}`, { recursive: true });
}
