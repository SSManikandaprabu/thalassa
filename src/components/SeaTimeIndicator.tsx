"use client";

import React, { useMemo } from "react";

interface SeaTimeIndicatorProps {
  scrollProgress: number; // 0 to 1
  onJumpToChapter?: (index: number) => void;
}

export function SeaTimeIndicator({ scrollProgress, onJumpToChapter }: SeaTimeIndicatorProps) {
  // Map 0 -> 1 to 05:42 AM -> 12:00 AM (midnight = 24:00 or 00:00)
  const timeString = useMemo(() => {
    const startMinutes = 5 * 60 + 42; // 342 min (05:42 AM)
    const endMinutes = 24 * 60; // 1440 min (12:00 AM)
    const currentTotalMin = Math.round(startMinutes + scrollProgress * (endMinutes - startMinutes));
    
    const hours24 = Math.floor(currentTotalMin / 60) % 24;
    const minutes = currentTotalMin % 60;
    const period = hours24 >= 12 && hours24 < 24 ? "PM" : "AM";
    const displayHours = hours24 === 0 ? 12 : hours24 > 12 ? hours24 - 12 : hours24;
    
    return `${displayHours.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")} ${period}`;
  }, [scrollProgress]);

  const chapters = [
    { label: "I", name: "Dawn", progress: 0 },
    { label: "II", name: "Departure", progress: 0.25 },
    { label: "III", name: "Open Sea", progress: 0.5 },
    { label: "IV", name: "Golden Hour", progress: 0.75 },
    { label: "V", name: "Midnight", progress: 1.0 },
  ];

  return (
    <aside
      className="fixed right-4 sm:right-8 top-1/2 -translate-y-1/2 z-[8000] flex items-center select-none"
      aria-label="Voyage Timeline"
    >
      {/* Sleek Vertical Glass Container */}
      <div className="flex flex-col items-center gap-4 py-4 px-2.5 rounded-full bg-[#040914]/80 backdrop-blur-xl border border-[#C5A880]/25 shadow-[0_10px_30px_rgba(3,7,18,0.8)]">
        {/* Dynamic Sea Time Display */}
        <div className="flex flex-col items-center text-center">
          <span className="text-[#A39D93] text-[8px] font-mono tracking-widest uppercase block">Sea Time</span>
          <span className="font-mono font-semibold text-[10px] tracking-wider text-[#E5C483]">{timeString}</span>
        </div>

        {/* Vertical Gold Timeline Line */}
        <div className="relative w-[2px] h-48 sm:h-64 bg-white/10 rounded-full overflow-hidden flex flex-col justify-between items-center py-1">
          {/* Active scrubbed fill */}
          <div
            className="absolute top-0 left-0 w-full bg-gradient-to-b from-[#C5A880] via-[#E5C483] to-[#8E7043] rounded-full transition-all duration-150 shadow-[0_0_8px_rgba(229,196,131,0.6)]"
            style={{ height: `${Math.min(100, Math.max(0, scrollProgress * 100))}%` }}
          />

          {/* Chapter Markers */}
          {chapters.map((ch, idx) => (
            <button
              key={ch.label}
              onClick={() => onJumpToChapter?.(idx)}
              className="relative z-10 group flex items-center justify-center p-1 cursor-pointer"
              title={`${ch.name} (${ch.label})`}
              aria-label={`Jump to ${ch.name}`}
            >
              <span
                className={`w-2 h-2 rounded-full border transition-all duration-300 ${
                  scrollProgress >= ch.progress - 0.05
                    ? "bg-[#E5C483] border-[#FAF7F2] scale-125 shadow-[0_0_6px_#E5C483]"
                    : "bg-[#040914] border-[#C5A880]/50 group-hover:border-[#E5C483]"
                }`}
              />

              {/* Tooltip on hover */}
              <span className="absolute right-8 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none text-[10px] tracking-widest uppercase font-serif text-[#FAF7F2] bg-[#070E1B]/95 px-2.5 py-1 rounded border border-[#C5A880]/40 whitespace-nowrap shadow-lg">
                {ch.label} — {ch.name}
              </span>
            </button>
          ))}
        </div>

        {/* Bearing Coordinate */}
        <div className="text-[8px] tracking-[0.25em] font-mono text-[#C5A880]/60">
          43°N
        </div>
      </div>
    </aside>
  );
}
