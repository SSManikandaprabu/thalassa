"use client";

import React, { useState, useEffect } from "react";
import { Compass, X, Anchor } from "lucide-react";

interface NauticalCompassProps {
  scrollProgress: number;
  onNavigateChapter: (index: number) => void;
  onRequestCharter: () => void;
}

export function NauticalCompass({
  scrollProgress,
  onNavigateChapter,
  onRequestCharter,
}: NauticalCompassProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [bearing, setBearing] = useState(32);

  // Bearing subtly changes as yacht sails through the day
  useEffect(() => {
    const currentHeading = Math.round(32 + scrollProgress * 180);
    setBearing(currentHeading);
  }, [scrollProgress]);

  const chapters = [
    { index: 0, roman: "I", name: "Dawn", sub: "Monaco Port Hercule", coord: "43°44'09\"N 7°25'24\"E", deg: "032°" },
    { index: 1, roman: "II", name: "Departure", sub: "Waterline & Engineering Specs", coord: "43°34'12\"N 7°07'45\"E", deg: "088°" },
    { index: 2, roman: "III", name: "Open Sea", sub: "3D Superyacht & Cutaway Decks", coord: "43°15'00\"N 7°45'30\"E", deg: "142°" },
    { index: 3, roman: "IV", name: "Golden Hour", sub: "Panoramic Sundeck & Suites", coord: "43°31'20\"N 7°03'10\"E", deg: "215°" },
    { index: 4, roman: "V", name: "Midnight", sub: "Starfield & VIP Boarding Pass", coord: "43°16'18\"N 6°38'22\"E", deg: "290°" },
  ];

  return (
    <>
      {/* Top Fixed Luxury Nav Header with Backdrop Blur and Shield */}
      <header className="fixed top-0 left-0 right-0 z-[9000] h-20 sm:h-24 px-6 sm:px-12 flex items-center justify-between bg-[#040914]/80 backdrop-blur-xl border-b border-[#C5A880]/15 transition-all">
        {/* Brand / Logo */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => onNavigateChapter(0)}
            className="text-left group flex items-center gap-3 cursor-pointer"
          >
            <div className="w-9 h-9 rounded-full border border-[#C5A880]/50 flex items-center justify-center text-[#E5C483] group-hover:border-[#E5C483] group-hover:bg-[#C5A880]/10 transition-all">
              <Anchor size={15} />
            </div>
            <div>
              <span className="font-display text-xl sm:text-2xl tracking-[0.35em] text-[#FAF7F2] font-light block leading-none">
                THALASSA
              </span>
              <span className="text-[9px] font-sans tracking-[0.3em] text-[#C5A880] uppercase block mt-1">
                62M Custom • Monaco
              </span>
            </div>
          </button>
        </div>

        {/* Center / Right controls */}
        <div className="flex items-center gap-3 sm:gap-6">
          {/* Nautical Compass Navigation Trigger */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="group relative flex items-center gap-3 px-4 py-2 rounded-full border border-[#C5A880]/40 bg-[#070E1B]/90 text-[#FAF7F2] hover:border-[#E5C483] hover:bg-[#0E1A33] transition-all duration-300 cursor-pointer"
            aria-label="Open Nautical Compass Navigation"
          >
            <div className="relative w-5 h-5 flex items-center justify-center">
              <Compass size={18} className="text-[#E5C483] group-hover:rotate-45 transition-transform duration-700" />
            </div>

            <div className="hidden md:flex flex-col text-left">
              <span className="text-[9px] uppercase tracking-[0.25em] text-[#C5A880]">Heading</span>
              <span className="text-[11px] font-mono tracking-wider text-[#FAF7F2]">{bearing.toString().padStart(3, "0")}° NNE</span>
            </div>
          </button>

          {/* Magnetic Charter Action Button */}
          <button
            onClick={onRequestCharter}
            className="relative px-5 sm:px-6 py-2.5 rounded-full bg-gradient-to-r from-[#C5A880] to-[#E5C483] text-[#040914] text-[11px] font-sans font-semibold tracking-[0.2em] uppercase transition-all duration-300 hover:shadow-[0_0_25px_rgba(229,196,131,0.5)] hover:scale-[1.03] active:scale-95 cursor-pointer"
          >
            Request Charter
          </button>
        </div>
      </header>

      {/* Luxury Nautical Compass Overlay Drawer */}
      {isOpen && (
        <div className="fixed inset-0 z-[9500] flex items-center justify-center bg-[#030712]/92 backdrop-blur-2xl p-4 sm:p-6 animate-[fadeIn_0.3s_ease-out]">
          <div className="relative w-full max-w-4xl p-8 sm:p-12 border border-[#C5A880]/40 rounded-2xl bg-[#040914] shadow-[0_0_80px_rgba(3,7,18,0.95)]">
            {/* Close Button */}
            <button
              onClick={() => setIsOpen(false)}
              className="absolute top-6 right-6 p-2 rounded-full border border-[#C5A880]/40 text-[#E5C483] hover:text-white hover:border-[#FAF7F2] transition-colors cursor-pointer"
              aria-label="Close compass"
            >
              <X size={20} />
            </button>

            {/* Header */}
            <div className="text-center mb-10">
              <span className="text-[10px] tracking-[0.4em] uppercase text-[#C5A880] font-sans block mb-2">
                Nautical Course & Chapter Bearings
              </span>
              <h2 className="font-display text-3xl sm:text-4xl text-[#FAF7F2] tracking-[0.15em] font-light">
                SELECT VOYAGE WAYPOINT
              </h2>
              <div className="w-16 h-[1px] bg-gradient-to-r from-transparent via-[#C5A880] to-transparent mx-auto mt-3" />
            </div>

            {/* Chapters Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {chapters.map((ch) => (
                <button
                  key={ch.roman}
                  onClick={() => {
                    onNavigateChapter(ch.index);
                    setIsOpen(false);
                  }}
                  className="group relative text-left p-5 rounded-xl border border-[#C5A880]/20 bg-[#070E1B]/80 hover:border-[#E5C483] hover:bg-[#0E1A33] transition-all duration-300 cursor-pointer"
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-mono text-[#C5A880] tracking-widest">{ch.roman}</span>
                    <span className="text-[10px] font-mono text-[#E5C483]/90 bg-[#C5A880]/10 px-2 py-0.5 rounded border border-[#C5A880]/30">
                      {ch.deg}
                    </span>
                  </div>

                  <h3 className="font-display text-xl text-[#FAF7F2] group-hover:text-[#E5C483] transition-colors">
                    {ch.name}
                  </h3>
                  <p className="text-xs text-[#A39D93] mt-1 font-body">{ch.sub}</p>
                  <p className="text-[10px] text-[#C5A880]/60 font-mono mt-3">{ch.coord}</p>
                </button>
              ))}

              {/* VIP Charter Card */}
              <button
                onClick={() => {
                  onRequestCharter();
                  setIsOpen(false);
                }}
                className="group relative text-left p-5 rounded-xl border border-[#C5A880]/60 bg-gradient-to-br from-[#081226] to-[#122442] hover:border-[#E5C483] transition-all duration-300 flex flex-col justify-between cursor-pointer"
              >
                <div>
                  <span className="text-[10px] uppercase font-mono tracking-widest text-[#E5C483]">VIP Access</span>
                  <h3 className="font-display text-xl text-[#FAF7F2] group-hover:text-[#E5C483] transition-colors mt-2">
                    Boarding Pass
                  </h3>
                  <p className="text-xs text-[#E5E0D6] mt-1">Instant charter inquiry & concierge requisition.</p>
                </div>
                <span className="text-xs uppercase font-sans tracking-widest text-[#C5A880] mt-4 flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                  Open Pass →
                </span>
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
