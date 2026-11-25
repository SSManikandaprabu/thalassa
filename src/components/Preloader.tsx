"use client";

import React, { useEffect, useState } from "react";

interface PreloaderProps {
  onComplete: () => void;
}

export function Preloader({ onComplete }: PreloaderProps) {
  const [progress, setProgress] = useState(0);
  const [isDone, setIsDone] = useState(false);
  const [isExited, setIsExited] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          setIsDone(true);
          setTimeout(() => {
            setIsExited(true);
            onComplete();
          }, 800);
          return 100;
        }
        // Smooth luxury pacing
        const increment = Math.max(1, Math.floor((100 - prev) * 0.12));
        return Math.min(100, prev + increment);
      });
    }, 60);

    return () => clearInterval(timer);
  }, [onComplete]);

  if (isExited) return null;

  return (
    <div
      className={`fixed inset-0 z-[99999] bg-[#030712] flex flex-col items-center justify-center transition-all duration-1000 ease-[cubic-bezier(0.16,1,0.3,1)] ${
        isDone ? "-translate-y-full opacity-90 pointer-events-none" : "opacity-100"
      }`}
    >
      <div className="relative flex flex-col items-center max-w-sm px-6 text-center">
        {/* Maritime Rope Knot SVG Drawing Animation */}
        <div className="w-36 h-36 relative mb-8 flex items-center justify-center">
          <svg
            viewBox="0 0 200 200"
            className="w-full h-full drop-shadow-[0_0_15px_rgba(229,196,131,0.4)]"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* Background faint guide rope */}
            <path
              d="M 40,100 C 40,60 70,40 100,40 C 130,40 160,70 160,100 C 160,130 130,160 100,160 C 70,160 40,140 40,100 Z M 60,100 C 60,70 85,55 105,55 C 135,55 145,85 130,115 C 115,145 75,135 60,100 Z"
              stroke="#C5A880"
              strokeWidth="2"
              strokeOpacity="0.15"
              strokeLinecap="round"
            />

            {/* Dynamic Drawn Knot Path */}
            <path
              d="M 30,100 C 30,50 70,30 100,30 C 145,30 170,65 170,100 C 170,135 135,170 100,170 C 55,170 30,135 30,100 C 30,70 70,55 100,75 C 130,95 145,130 115,145 C 85,160 65,120 70,95 C 75,70 125,60 140,85 C 155,110 130,140 100,140"
              stroke="url(#goldGradient)"
              strokeWidth="3.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              style={{
                strokeDasharray: 900,
                strokeDashoffset: 900 - (progress / 100) * 900,
                transition: "stroke-dashoffset 0.15s linear",
              }}
            />

            {/* Inner Maritime Compass Ring */}
            <circle
              cx="100"
              cy="100"
              r="22"
              stroke="#E5C483"
              strokeWidth="1"
              strokeDasharray="4 4"
              className="animate-[spin_16s_linear_infinite]"
              opacity="0.4"
            />

            <defs>
              <linearGradient id="goldGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#C5A880" />
                <stop offset="50%" stopColor="#FAF7F2" />
                <stop offset="100%" stopColor="#E5C483" />
              </linearGradient>
            </defs>
          </svg>
        </div>

        {/* Brand & Loading Status */}
        <span className="font-display text-2xl tracking-[0.4em] text-[#FAF7F2] font-light">
          THALASSA
        </span>
        <span className="text-[10px] font-sans tracking-[0.35em] text-[#C5A880] uppercase mt-2">
          Preparing Sea Journey
        </span>

        {/* Progress Counter */}
        <div className="flex items-center gap-3 mt-6">
          <div className="w-28 h-[1px] bg-white/10 overflow-hidden rounded-full">
            <div
              className="h-full bg-gradient-to-r from-[#C5A880] to-[#E5C483] transition-all duration-150"
              style={{ width: `${progress}%` }}
            />
          </div>
          <span className="text-[11px] font-mono text-[#E5C483] tracking-widest min-w-[3ch]">
            {progress}%
          </span>
        </div>
      </div>
    </div>
  );
}
