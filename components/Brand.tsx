import { useId } from "react";
import { asset } from "@/data/projects";
const letters = ["p", "e", "a", "r", "2", "7", "9"];
// Trace the original paper edges; exclude neighboring pink paper fragments.
const masks: Record<number, { width: number; height: number; points: string }> = {
  1: { width: 317, height: 416, points: "0,0 317,0 317,200 285,267 276,333 251,399 251,416 0,416" },
  3: { width: 339, height: 427, points: "0,0 339,0 339,427 20,427 12,354 34,331 34,132 0,117" },
};
export function Brand({ className = "", compact = false, responsive = false }: { className?: string; compact?: boolean; responsive?: boolean }) {
  const id = useId().replace(/:/g, "");
  return <span className={`brand cutout-brand ${responsive ? "cutout-responsive" : ""} ${compact ? "cutout-compact" : ""} ${className}`} role="img" aria-label="pear 279">
    {letters.map((letter, i) => {
      const mask = masks[i];
      return <span className={`brand-tile cutout-tile glyph-${i}`} key={letter}>
        {mask ? <svg className="cutout-clean-glyph" viewBox={`0 0 ${mask.width} ${mask.height}`} aria-hidden="true">
          <defs><clipPath id={`${id}-edge-${i}`}><polygon points={mask.points} /></clipPath></defs>
          <image href={asset(`/media/brand-color-${i}.webp`)} width={mask.width} height={mask.height} clipPath={`url(#${id}-edge-${i})`} />
        </svg> : <img src={asset(`/media/brand-color-${i}.webp`)} alt="" aria-hidden="true" />}
      </span>;
    })}
  </span>;
}
