import { useId } from "react";
const letters = ["p", "e", "a", "r", "2", "7", "9"];
const angles = [-5, 3, -2, 5, -4, 3, -3];
const edges = ["5,16 104,9 128,35 122,163 19,170 2,144", "12,7 118,16 125,146 103,169 4,159 1,35", "18,11 109,5 126,51 119,165 1,157 7,43"];
export function Brand({ className = "", compact = false, responsive = false }: { className?: string; compact?: boolean; responsive?: boolean }) {
  const id = useId().replace(/:/g, "");
  return <span className={`brand collage-brand ${className}`} role="img" aria-label="pear 279">
    {(responsive ? [false, true] : [false]).map((stacked) => <svg key={String(stacked)} className={stacked ? "brand-stacked" : "brand-wide"} viewBox={stacked ? "0 0 550 390" : "0 0 1030 210"} aria-hidden="true">
      <defs>
        <pattern id={`${id}-grid-${stacked}`} width="19" height="19" patternUnits="userSpaceOnUse"><path d="M19 0H0V19" fill="none" stroke="#888b83" strokeWidth=".65" opacity=".6"/></pattern>
        <pattern id={`${id}-dust-${stacked}`} width="61" height="53" patternUnits="userSpaceOnUse"><path d="m8 9 3-2 1 4-3 2zm24 25 6-3-2 5-5 2zm19-17 2 2-1 4-2-1zM15 45l7-2-3 2-5 2" fill="#e5e5dd"/><circle cx="39" cy="9" r="1.1" fill="#e5e5dd"/><circle cx="6" cy="31" r=".8" fill="#e5e5dd"/></pattern>
      </defs>
      {letters.map((letter,i) => <g className="brand-tile" key={i} transform={`translate(${stacked && i > 3 ? (i-4)*135+65 : i*135+(i>3?55:0)+15} ${stacked && i>3?205:20})`}><g transform={`rotate(${angles[i]} 65 85)`}>
        <polygon points={edges[i%3]} fill="#e5e5dd"/>
        <polygon points={edges[i%3]} fill={`url(#${id}-grid-${stacked})`}/>
        <text x="63" y="137" textAnchor="middle" fill="#171916" stroke="#171916" strokeWidth={compact?1:2} fontFamily="Georgia, 'Times New Roman', serif" fontWeight="900" fontSize="151">{letter}</text>
        <text x="63" y="137" textAnchor="middle" fill={`url(#${id}-dust-${stacked})`} fontFamily="Georgia, 'Times New Roman', serif" fontWeight="900" fontSize="151">{letter}</text>
      </g></g>)}
    </svg>)}
  </span>;
}
