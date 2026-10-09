const glyphs = [
  [
    "M15 45 C9 26 25 20 44 21 L78 19 C105 17 123 36 119 63 C115 91 84 99 53 95 L57 131 C58 143 45 148 29 144 C14 143 7 139 10 122 Z M47 44 C43 49 45 65 49 68 C66 72 89 69 89 54 C88 40 62 36 47 44 Z",
    -4,
  ],
  [
    "M10 72 C7 38 27 18 63 20 C97 22 115 43 110 64 C109 78 97 79 81 78 L43 73 C42 87 57 96 76 91 C91 86 105 89 107 101 C111 114 80 123 57 119 C25 118 12 100 10 72 Z M44 52 L79 55 C82 43 69 37 58 39 C50 40 45 43 44 52 Z",
    3,
  ],
  [
    "M19 33 C43 13 85 18 102 33 C117 46 108 81 114 106 C119 123 94 124 79 113 C59 126 34 124 18 113 C0 101 6 78 20 67 C35 55 59 56 79 53 C82 38 60 36 42 48 C26 60 6 48 19 33 Z M76 78 C58 69 34 80 41 94 C49 108 72 99 76 78 Z",
    -3,
  ],
  [
    "M12 36 C13 22 30 20 43 27 L52 37 C71 19 97 19 107 32 C116 43 107 63 94 64 C81 56 57 56 52 80 L55 105 C59 124 21 127 13 111 C8 87 18 59 12 36 Z",
    4,
  ],
  [
    "M13 40 C20 13 71 13 94 24 C122 36 112 68 91 83 L53 108 C72 107 91 104 108 109 C126 115 116 136 98 135 L23 140 C8 143 5 125 13 112 C27 91 53 80 72 62 C88 45 62 37 44 58 C30 75 5 60 13 40 Z",
    -3,
  ],
  [
    "M12 23 C43 25 70 18 101 21 C120 23 113 39 103 55 C82 83 67 109 64 129 C62 150 24 140 24 125 C31 99 48 79 66 53 C47 56 29 58 14 54 C1 51 6 30 12 23 Z",
    5,
  ],
  [
    "M15 51 C13 18 68 8 92 25 C118 44 115 90 100 114 C86 140 55 146 31 133 C16 125 21 110 33 109 C49 115 71 119 81 92 C49 103 11 86 15 51 Z M49 44 C37 59 43 76 61 75 C81 75 87 57 73 45 C66 38 55 39 49 44 Z",
    -3,
  ],
] as const;
export function Brand({
  className = "",
  compact = false,
  responsive = false,
}: {
  className?: string;
  compact?: boolean;
  responsive?: boolean;
}) {
  return (
    <span className={`brand ${className}`} role="img" aria-label="pear 279">
      {(responsive ? [false, true] : [false]).map((stacked) => (
        <svg
          key={String(stacked)}
          className={stacked ? "brand-stacked" : "brand-wide"}
          viewBox={stacked ? "0 0 550 370" : "0 0 1000 190"}
          fill="none"
          aria-hidden="true"
        >
          {glyphs.map(([d, angle], i) => (
            <g
              key={i}
              transform={`translate(${stacked && i > 3 ? (i - 4) * 132 + 83 : i * 132 + (i > 3 ? 45 : 0) + 15} ${stacked && i > 3 ? 200 : 16})`}
            >
              <g transform={`rotate(${angle} 60 75)`}>
                <path
                  className="brand-letter"
                  d={d}
                  stroke="currentColor"
                  strokeWidth={compact ? 5 : 2.4}
                  strokeLinejoin="round"
                  strokeLinecap="round"
                />
              </g>
            </g>
          ))}
        </svg>
      ))}
    </span>
  );
}
