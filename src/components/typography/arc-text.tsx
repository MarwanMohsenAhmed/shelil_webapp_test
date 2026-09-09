import React, { useId } from "react";

interface ArcTextProps {
  text: string;
  className?: string;
  width?: number;
  height?: number;
  curve?: number;
  isRtl?: boolean;
}

export function ArcText({
  text,
  className = "",
  width = 280,
  height = 42,
  curve = 16,
  isRtl = false,
}: ArcTextProps) {
  const rawId = useId();
  // Sanitize ID for SVG path reference
  const pathId = `arc-${rawId.replace(/[^a-zA-Z0-9-_]/g, "")}`;

  // Start on the baseline, curve up to apex at midX, return to baseline
  const startX = 8;
  const startY = height - 8;
  const endX = width - 8;
  const endY = height - 8;
  const midX = width / 2;
  const midY = Math.max(2, height - 8 - curve);

  // In SVG textPath, for RTL Arabic text, path defined from left-to-right with startOffset 50%
  // places the center of the Arabic text precisely at the apex of the arc.
  const d = `M ${startX} ${startY} Q ${midX} ${midY} ${endX} ${endY}`;

  return (
    <svg
      viewBox={`0 0 ${width} ${height}`}
      className={`overflow-visible select-none pointer-events-none ${className}`}
      aria-label={text}
      role="img"
    >
      <defs>
        <path id={pathId} d={d} fill="none" />
      </defs>
      <text
        className={`fill-current text-[1.4rem] sm:text-[1.55rem] md:text-[1.65rem] ${
          isRtl ? "font-cairo font-bold tracking-normal" : "font-patrick font-normal tracking-wide"
        }`}
        textAnchor="middle"
      >
        <textPath href={`#${pathId}`} startOffset="50%">
          {text}
        </textPath>
      </text>
    </svg>
  );
}
