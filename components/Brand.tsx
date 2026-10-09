import { asset } from "@/data/projects";
const letters = ["p", "e", "a", "r", "2", "7", "9"];
export function Brand({ className = "", compact = false, responsive = false }: { className?: string; compact?: boolean; responsive?: boolean }) {
  return <span className={`brand cutout-brand ${responsive ? "cutout-responsive" : ""} ${compact ? "cutout-compact" : ""} ${className}`} role="img" aria-label="pear 279">
    {letters.map((letter, i) => <span className={`brand-tile cutout-tile glyph-${i}`} key={letter}><img src={asset(`/media/brand-color-${i}.webp`)} alt="" aria-hidden="true" /></span>)}
  </span>;
}
