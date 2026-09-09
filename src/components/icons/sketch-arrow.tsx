interface SketchArrowProps {
  className?: string;
}

export function SketchArrow({ className = "" }: SketchArrowProps) {
  return (
    <svg
      className={className}
      viewBox="0 0 52 52"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      {/* Curved swooping spine */}
      <path
        d="M34 6C35 18 31 28 20 35C16 37.5 11 39 6 39.5"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* Arrowhead */}
      <path
        d="M13 33L5 40L14 45"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
