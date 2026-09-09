"use client";

import { useState } from "react";
import Image from "next/image";
import { useLocale, useTranslations } from "next-intl";

interface LogoProps {
  className?: string;
  size?: "sm" | "md" | "lg";
}

const latinLetters = [
  { char: "S", color: "#FF385C" },
  { char: "h", color: "#1BB7B5" },
  { char: "e", color: "#FFBA1B" },
  { char: "l", color: "#2974F2" },
  { char: "i", color: "#9564EB" },
  { char: "l", color: "#FF3D5E" },
];

const arabicLetters = [
  { char: "ش\u200D", color: "#FF385C" },
  { char: "\u200Dل\u200D", color: "#1BB7B5" },
  { char: "\u200Dي\u200D", color: "#FFBA1B" },
  { char: "\u200Dل", color: "#2974F2" },
];

export function Logo({ className = "", size = "md" }: LogoProps) {
  const [imageError, setImageError] = useState(false);
  const locale = useLocale();
  const t = useTranslations("logo");
  const isRtl = locale === "ar";

  const letters = isRtl ? arabicLetters : latinLetters;

  // Sizing dimensions for the PNG logo (aspect ratio: 759 / 512 = 1.48)
  const imageSizes = {
    sm: { width: 80, height: 54, className: "w-auto h-[44px] sm:h-[50px] max-h-[50px]" },
    md: { width: 100, height: 67, className: "w-auto h-[50px] sm:h-[58px] max-h-[58px]" },
    lg: { width: 130, height: 88, className: "w-auto h-[60px] sm:h-[72px] max-h-[72px]" },
  };

  const textSizes = {
    sm: "text-[2.2rem]",
    md: "text-[2.7rem] sm:text-[3.2rem]",
    lg: "text-[3.4rem]",
  };

  return (
    <div className={`group inline-flex flex-col select-none ${className}`}>
      {!imageError ? (
        <div className="relative transition-transform duration-200 group-hover:scale-[1.03] drop-shadow-[0_4px_6px_rgba(23,54,109,0.12)]">
          <Image
            src="/images/logo.png"
            alt="Shalel Logo"
            width={imageSizes[size].width}
            height={imageSizes[size].height}
            className={`object-contain ${imageSizes[size].className}`}
            priority
            onError={() => setImageError(true)}
          />
        </div>
      ) : (
        /* Fallback: Typed multicolor animated logo */
        <>
          <div
            className={`font-bold leading-[0.88] tracking-tight transition-transform duration-200 group-hover:scale-[1.02] ${
              textSizes[size]
            } ${isRtl ? "font-cairo" : "font-fredoka"}`}
            style={{ filter: "drop-shadow(0 2px 0 rgba(23, 54, 109, 0.08))" }}
          >
            {letters.map((item, index) => (
              <span key={index} style={{ color: item.color }}>
                {item.char}
              </span>
            ))}
          </div>
          <span className="font-nunito font-extrabold tracking-[0.06em] text-ink/90 text-[0.62rem] sm:text-[0.72rem] ps-1.5 -mt-0.5">
            {t("tagline")}
          </span>
        </>
      )}
    </div>
  );
}
