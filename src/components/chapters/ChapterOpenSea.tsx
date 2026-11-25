"use client";

import React from "react";
import { YachtCanvas } from "../yacht3d/YachtCanvas";

interface ChapterProps {
  scrollProgress: number;
}

export function ChapterOpenSea({ scrollProgress }: ChapterProps) {
  return (
    <section
      id="chapter-2"
      className="relative w-full min-h-screen pt-32 sm:pt-36 pb-20 flex flex-col justify-between overflow-hidden bg-[#040914] select-none"
    >
      {/* Subtle thin serif word behind video */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-0 overflow-hidden">
        <span className="font-display font-light text-[12vw] tracking-[0.15em] text-[#C5A880] opacity-[0.035] leading-none whitespace-nowrap">
          EXPEDITION
        </span>
      </div>

      {/* Background Drone Video Layer with Rich Deep Ocean Tone */}
      <div className="absolute inset-0 z-[1] overflow-hidden opacity-60">
        <video
          src="/videos/opensea.mp4"
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover"
          style={{
            filter: "contrast(115%) brightness(80%)",
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#040914] via-[#040914]/60 to-[#040914]/80" />
        <div className="absolute inset-0 bg-[#081226]/40 mix-blend-color" />
      </div>

      {/* Header and Eyebrow */}
      <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
        <span className="text-[10px] sm:text-xs font-sans uppercase tracking-[0.45em] text-[#E5C483] block mb-2">
          Interactive Naval Architecture
        </span>
        <h2 className="font-display text-4xl sm:text-6xl font-light tracking-[0.12em] text-[#FAF7F2]">
          THE VESSEL UNVEILED
        </h2>
        <p className="text-xs sm:text-sm text-[#E5E0D6] max-w-xl mx-auto mt-3 font-body">
          Rotate 360° through the Mediterranean sea. Inspect cutaway mode to separate the four master decks and reveal the interior staterooms.
        </p>
      </div>

      {/* 3D Yacht Interactive Canvas */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 my-2">
        <YachtCanvas scrollProgress={scrollProgress} />
      </div>

      {/* Gold Chapter Label in footer flow */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-8 sm:px-14 flex items-center justify-between text-xs">
        <div className="flex items-center gap-3">
          <span className="w-6 h-[1px] bg-[#E5C483]" />
          <span className="text-[11px] font-mono tracking-[0.3em] uppercase text-[#E5C483]">
            III / OPEN SEA
          </span>
        </div>
        <span className="text-[9px] font-mono text-[#A39D93] tracking-widest">
          02:20 PM • BLUE HORIZON EXPEDITION
        </span>
      </div>
    </section>
  );
}
