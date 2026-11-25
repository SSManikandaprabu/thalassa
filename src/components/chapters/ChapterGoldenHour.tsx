"use client";

import React, { useRef, useState } from "react";
import { ChevronLeft, ChevronRight, Sparkles } from "lucide-react";

interface ChapterProps {
  scrollProgress: number;
}

interface GalleryItem {
  id: string;
  title: string;
  tagline: string;
  specs: string;
  videoSrc: string;
  badge: string;
}

const GALLERY_ITEMS: GalleryItem[] = [
  {
    id: "sundeck",
    title: "SUNDECK CHAMPAGNE & SPA",
    tagline: "Heated infinity whirlpool under the azure Mediterranean sky",
    specs: "CAPACITY: 14 GUESTS • DOM PÉRIGNON CELLAR",
    videoSrc: "/videos/sundeck.mp4",
    badge: "DECK 4 • ELEVATION",
  },
  {
    id: "master",
    title: "OWNER'S PRIVATE BALCONY",
    tagline: "180-degree unobstructed horizon sanctuary and marble lounge",
    specs: "AREA: 120 SQM • FULL BEAM SANCTUARY",
    videoSrc: "/videos/owners_suite.mp4",
    badge: "DECK 3 • MASTER SUITE",
  },
  {
    id: "beachclub",
    title: "HYDRAULIC SEA TERRACE",
    tagline: "Direct sea-level teak platform with tender garage & hammam",
    specs: "TEAK PLATFORM: 28 SQM • CASTOLDI JET TENDERS",
    videoSrc: "/videos/beach_club.mp4",
    badge: "DECK 1 • WATERLINE",
  },
  {
    id: "skylounge",
    title: "AL FRESCO DUSK SALON",
    tagline: "Sunset aperitifs served by dedicated sommelier & private chef",
    specs: "DINING: 12 SEATS • CLIMATE-CONTROLLED WINE VAULT",
    videoSrc: "/videos/sky_lounge.mp4",
    badge: "DECK 3 • SALON",
  },
  {
    id: "golden",
    title: "CRUISING INTO THE GOLDEN HOUR",
    tagline: "Glide past the dramatic cliffs of the French Riviera at 15 knots",
    specs: "BEARING: 215° SW • SMOOTH ZERO-SPEED STABILIZERS",
    videoSrc: "/videos/golden.mp4",
    badge: "COASTAL HORIZON",
  },
];

export function ChapterGoldenHour({ scrollProgress }: ChapterProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const scrollToIndex = (index: number) => {
    const clamped = Math.max(0, Math.min(GALLERY_ITEMS.length - 1, index));
    setActiveIndex(clamped);
    if (containerRef.current) {
      const children = containerRef.current.children;
      if (children[clamped]) {
        (children[clamped] as HTMLElement).scrollIntoView({
          behavior: "smooth",
          inline: "center",
          block: "nearest",
        });
      }
    }
  };

  return (
    <section
      id="chapter-3"
      className="relative w-full min-h-screen pt-32 sm:pt-36 pb-20 flex flex-col justify-between overflow-hidden bg-[#040914] select-none"
    >
      {/* Subtle thin serif word behind video */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-0 overflow-hidden">
        <span className="font-display font-light text-[12vw] tracking-[0.15em] text-[#C5A880] opacity-[0.035] leading-none whitespace-nowrap">
          SERENITY
        </span>
      </div>

      {/* Warm Golden Hour Ambient Hue */}
      <div className="absolute inset-0 pointer-events-none bg-gradient-to-b from-[#040914] via-[#24170a]/30 to-[#040914] z-[1]" />

      {/* Header and Eyebrow */}
      <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
        <span className="text-[10px] sm:text-xs font-sans uppercase tracking-[0.45em] text-[#E5C483] block mb-2">
          Moments Suspended in Amber
        </span>
        <h2 className="font-display text-4xl sm:text-6xl font-light tracking-[0.12em] text-[#FAF7F2]">
          THE GOLDEN PASSAGE
        </h2>
        <p className="text-xs sm:text-sm text-[#E5E0D6] max-w-xl mx-auto mt-3 font-body">
          As daylight softens into liquid honey across the teak decks, life aboard shifts into an effortless rhythm of bespoke indulgence.
        </p>
      </div>

      {/* Pinned Horizontal Gallery Carousel with proper gutter away from SeaTimeIndicator */}
      <div className="relative z-10 w-full overflow-hidden my-6">
        <div
          ref={containerRef}
          className="flex items-center gap-6 sm:gap-8 overflow-x-auto pl-6 sm:pl-16 pr-20 sm:pr-28 pb-6 scrollbar-none snap-x snap-mandatory"
          style={{ scrollBehavior: "smooth" }}
        >
          {GALLERY_ITEMS.map((item, index) => {
            const isCenter = activeIndex === index;
            return (
              <div
                key={item.id}
                onClick={() => scrollToIndex(index)}
                className={`flex-none w-[78vw] sm:w-[65vw] lg:w-[50vw] max-w-3xl snap-center transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] cursor-pointer ${
                  isCenter ? "scale-100 opacity-100" : "scale-95 opacity-60 hover:opacity-85"
                }`}
              >
                <div className="relative aspect-[16/9] sm:aspect-[21/11] rounded-2xl overflow-hidden border border-[#C5A880]/35 shadow-[0_20px_60px_rgba(3,7,18,0.85)] group">
                  <video
                    src={item.videoSrc}
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000 ease-[cubic-bezier(0.16,1,0.3,1)]"
                    style={{
                      filter: "contrast(110%) brightness(88%)",
                    }}
                  />

                  {/* Gradient shadow overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#040914] via-[#040914]/20 to-transparent" />

                  {/* Badge */}
                  <div className="absolute top-5 left-5 flex items-center gap-2">
                    <span className="px-3 py-1 rounded-full bg-[#040914]/85 backdrop-blur-md border border-[#C5A880]/40 text-[9px] font-mono tracking-[0.25em] text-[#E5C483] uppercase">
                      {item.badge}
                    </span>
                  </div>

                  {/* Bottom Captions */}
                  <div className="absolute bottom-5 left-5 right-5 flex flex-col sm:flex-row sm:items-end justify-between gap-2">
                    <div>
                      <span className="text-[10px] font-mono tracking-[0.3em] uppercase text-[#E5C483] block mb-1">
                        {item.specs}
                      </span>
                      <h3 className="font-display text-xl sm:text-2xl font-light text-[#FAF7F2] tracking-wider">
                        {item.title}
                      </h3>
                      <p className="text-xs text-[#E5E0D6] mt-0.5 max-w-md font-body">
                        {item.tagline}
                      </p>
                    </div>

                    <div className="hidden sm:flex items-center gap-1 text-[9px] uppercase font-mono tracking-widest text-[#C5A880]">
                      <Sparkles size={12} /> Curated View
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Gallery Navigation Controls */}
        <div className="flex items-center justify-center gap-4 mt-2">
          <button
            onClick={() => scrollToIndex(activeIndex - 1)}
            disabled={activeIndex === 0}
            className="p-2.5 rounded-full border border-[#C5A880]/30 text-[#E5C483] hover:border-[#E5C483] disabled:opacity-30 disabled:pointer-events-none transition-all cursor-pointer"
            aria-label="Previous Gallery Slide"
          >
            <ChevronLeft size={16} />
          </button>

          <span className="text-xs font-mono text-[#C5A880] tracking-widest">
            0{activeIndex + 1} / 0{GALLERY_ITEMS.length}
          </span>

          <button
            onClick={() => scrollToIndex(activeIndex + 1)}
            disabled={activeIndex === GALLERY_ITEMS.length - 1}
            className="p-2.5 rounded-full border border-[#C5A880]/30 text-[#E5C483] hover:border-[#E5C483] disabled:opacity-30 disabled:pointer-events-none transition-all cursor-pointer"
            aria-label="Next Gallery Slide"
          >
            <ChevronRight size={16} />
          </button>
        </div>
      </div>

      {/* Gold Chapter Label in footer flow */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-8 sm:px-14 flex items-center justify-between text-xs">
        <div className="flex items-center gap-3">
          <span className="w-6 h-[1px] bg-[#E5C483]" />
          <span className="text-[11px] font-mono tracking-[0.3em] uppercase text-[#E5C483]">
            IV / GOLDEN HOUR
          </span>
        </div>
        <span className="text-[9px] font-mono text-[#A39D93] tracking-widest">
          06:45 PM • AMBER LIGHT HORIZON
        </span>
      </div>
    </section>
  );
}
