"use client";

import React, { useRef } from "react";

interface ChapterProps {
  scrollProgress: number;
  onExplore: () => void;
}

export function ChapterDawn({ scrollProgress, onExplore }: ChapterProps) {
  const videoRef = useRef<HTMLVideoElement | null>(null);

  // Parallax zoom from 1.0 to 1.08
  const zoom = 1.0 + Math.min(0.08, scrollProgress * 0.32);
  const titleLetters = "THALASSA".split("");

  return (
    <section
      id="chapter-0"
      className="relative w-full min-h-screen pt-32 sm:pt-36 pb-20 flex flex-col items-center justify-between overflow-hidden bg-[#040914] select-none"
    >
      {/* Subtle thin serif word behind video (14vw, 3% opacity) */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-0 overflow-hidden">
        <span className="font-display font-light text-[12vw] tracking-[0.15em] text-[#C5A880] opacity-[0.035] leading-none whitespace-nowrap">
          AURORA
        </span>
      </div>

      {/* Full-screen Background Video with slow cinematic 1.0 to 1.08 zoom */}
      <div className="absolute inset-0 z-[1] overflow-hidden">
        <video
          ref={videoRef}
          src="/videos/dawn.mp4"
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]"
          style={{
            transform: `scale(${zoom})`,
            filter: "contrast(108%) brightness(85%)",
          }}
        />
        {/* Cool Dawn Blue & Horizon Tint Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#040914] via-[#040914]/30 to-[#0c1c38]/50 mix-blend-multiply" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#040914]/60 via-transparent to-[#040914]/60" />
      </div>

      {/* Top Tagline */}
      <div className="relative z-10 text-center max-w-xl mx-auto px-6">
        <span className="text-[10px] sm:text-xs font-sans uppercase tracking-[0.45em] text-[#E5C483] block">
          A Continuous Sea Journey Through Light & Time
        </span>
      </div>

      {/* Main Chapter Content */}
      <div className="relative z-10 max-w-5xl mx-auto px-6 text-center flex flex-col items-center my-auto">
        {/* THALASSA Title revealing letter by letter with gold shimmer */}
        <h1 className="font-display text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-light tracking-[0.3em] text-[#FAF7F2] my-2 flex items-center justify-center">
          {titleLetters.map((char, index) => (
            <span
              key={index}
              className="inline-block transition-all duration-700 hover:text-[#E5C483] hover:scale-105"
              style={{
                animation: `fadeInUp 0.9s cubic-bezier(0.16, 1, 0.3, 1) ${0.1 * index}s both`,
              }}
            >
              {char}
            </span>
          ))}
        </h1>

        {/* Line-by-line masked overflow headline */}
        <div className="overflow-hidden mt-2 max-w-2xl">
          <h2 className="font-display italic text-xl sm:text-2xl text-[#E5E0D6] tracking-[0.06em] font-light leading-relaxed">
            Where the horizon surrenders to absolute stillness
          </h2>
        </div>

        {/* Body text with blur fade */}
        <p className="text-xs sm:text-sm text-[#A39D93] max-w-xl mx-auto mt-4 font-body leading-relaxed">
          Awaken in Port Hercule as the first rays of dawn caress 62 meters of bespoke naval perfection. The Mediterranean sleeps. The journey begins.
        </p>

        {/* "Scroll to sail" cue */}
        <button
          onClick={onExplore}
          className="group mt-8 flex flex-col items-center gap-3 cursor-pointer"
          aria-label="Scroll to sail"
        >
          <span className="text-[10px] font-sans uppercase tracking-[0.4em] text-[#C5A880] group-hover:text-[#E5C483] transition-colors">
            Scroll to Sail
          </span>
          <div className="w-7 h-11 rounded-full border border-[#C5A880]/50 flex items-start justify-center p-1.5 group-hover:border-[#E5C483] transition-colors">
            <span className="w-1.5 h-2 rounded-full bg-[#E5C483] animate-bounce" />
          </div>
        </button>
      </div>

      {/* Gold Chapter Label in footer flow */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-8 sm:px-14 flex items-center justify-between text-xs">
        <div className="flex items-center gap-3">
          <span className="w-6 h-[1px] bg-[#E5C483]" />
          <span className="text-[11px] font-mono tracking-[0.3em] uppercase text-[#E5C483]">
            I / DAWN
          </span>
        </div>
        <span className="text-[9px] font-mono text-[#A39D93] tracking-widest">
          05:42 AM • MONACO HARBOR
        </span>
      </div>

      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(25px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </section>
  );
}
