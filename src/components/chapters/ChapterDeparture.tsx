"use client";

import React, { useEffect, useState, useRef } from "react";

interface ChapterProps {
  scrollProgress: number;
}

export function ChapterDeparture({ scrollProgress }: ChapterProps) {
  const [inView, setInView] = useState(false);
  const sectionRef = useRef<HTMLDivElement | null>(null);

  // Counter values
  const [lengthVal, setLengthVal] = useState(0);
  const [guestsVal, setGuestsVal] = useState(0);
  const [speedVal, setSpeedVal] = useState(0);
  const [rangeVal, setRangeVal] = useState(0);
  const [crewVal, setCrewVal] = useState(0);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
        }
      },
      { threshold: 0.25 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!inView) return;

    const duration = 1600;
    const startTime = performance.now();

    const update = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(1, elapsed / duration);
      const ease = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);

      setLengthVal(Math.round(ease * 62));
      setGuestsVal(Math.round(ease * 12));
      setSpeedVal(Math.round(ease * 18));
      setRangeVal(Math.round(ease * 4500));
      setCrewVal(Math.round(ease * 16));

      if (progress < 1) {
        requestAnimationFrame(update);
      }
    };

    requestAnimationFrame(update);
  }, [inView]);

  return (
    <section
      ref={sectionRef}
      id="chapter-1"
      className="relative w-full min-h-screen pt-32 sm:pt-36 pb-20 flex flex-col justify-between overflow-hidden bg-[#040914] select-none"
    >
      {/* Subtle thin serif word behind video */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-0 overflow-hidden">
        <span className="font-display font-light text-[12vw] tracking-[0.15em] text-[#C5A880] opacity-[0.035] leading-none whitespace-nowrap">
          DEPARTURE
        </span>
      </div>

      {/* Waterline Video Background with slow cinematic zoom */}
      <div className="absolute inset-0 z-[1] overflow-hidden">
        <video
          src="/videos/departure.mp4"
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]"
          style={{
            filter: "contrast(110%) brightness(82%)",
            transform: `scale(${1.02 + Math.min(0.06, scrollProgress * 0.1)})`,
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#040914] via-[#040914]/40 to-[#040914]/50" />
        <div className="absolute inset-0 bg-[#081226]/30 mix-blend-color" />
      </div>

      {/* Eyebrow */}
      <div className="relative z-10 text-center max-w-xl mx-auto px-6">
        <span className="text-[10px] sm:text-xs font-sans uppercase tracking-[0.45em] text-[#E5C483] block">
          Uncompromised Naval Engineering
        </span>
      </div>

      {/* Main Chapter Content & Luxury Specs Bar */}
      <div className="relative z-10 max-w-6xl mx-auto px-6 w-full text-center flex flex-col items-center my-auto">
        <div className="overflow-hidden max-w-3xl">
          <h2 className="font-display text-4xl sm:text-6xl font-light tracking-[0.12em] text-[#FAF7F2] leading-tight">
            POWER MEETS SERENITY
          </h2>
        </div>

        <p className="text-xs sm:text-sm text-[#E5E0D6] max-w-2xl mx-auto mt-4 font-body leading-relaxed">
          Twin MTU 16V 4000 M73L marine diesels engage in silent harmony. The steel displacement hull cuts effortlessly through the French Riviera swell, leaving a gleaming white wake behind.
        </p>

        {/* Minimalist Haute-Horlogerie Specs Ribbon (No chunky boxes!) */}
        <div className="mt-14 w-full max-w-5xl py-8 px-6 sm:px-10 rounded-2xl bg-[#040914]/70 backdrop-blur-xl border border-[#C5A880]/30 shadow-[0_20px_50px_rgba(3,7,18,0.7)] grid grid-cols-2 md:grid-cols-5 gap-6 sm:gap-4 items-center">
          {/* Spec 1 */}
          <div className="flex flex-col items-center text-center">
            <span className="font-display text-4xl sm:text-5xl text-[#FAF7F2] font-light">
              {lengthVal}<span className="text-xl text-[#E5C483] font-serif ml-0.5">m</span>
            </span>
            <span className="text-[9px] uppercase font-sans tracking-[0.25em] text-[#C5A880] mt-1.5">
              Length Overall
            </span>
            <span className="text-[9px] font-mono text-[#A39D93]">203.4 ft</span>
          </div>

          <div className="hidden md:block w-[1px] h-12 bg-[#C5A880]/20 mx-auto" />

          {/* Spec 2 */}
          <div className="flex flex-col items-center text-center">
            <span className="font-display text-4xl sm:text-5xl text-[#FAF7F2] font-light">
              {guestsVal}
            </span>
            <span className="text-[9px] uppercase font-sans tracking-[0.25em] text-[#C5A880] mt-1.5">
              VIP Guests
            </span>
            <span className="text-[9px] font-mono text-[#A39D93]">6 Grand Suites</span>
          </div>

          <div className="hidden md:block w-[1px] h-12 bg-[#C5A880]/20 mx-auto" />

          {/* Spec 3 */}
          <div className="flex flex-col items-center text-center">
            <span className="font-display text-4xl sm:text-5xl text-[#FAF7F2] font-light">
              {speedVal}<span className="text-lg text-[#E5C483] font-serif ml-0.5">kts</span>
            </span>
            <span className="text-[9px] uppercase font-sans tracking-[0.25em] text-[#C5A880] mt-1.5">
              Max Velocity
            </span>
            <span className="text-[9px] font-mono text-[#A39D93]">14.5 kts Cruise</span>
          </div>

          <div className="hidden md:block w-[1px] h-12 bg-[#C5A880]/20 mx-auto" />

          {/* Spec 4 */}
          <div className="flex flex-col items-center text-center">
            <span className="font-display text-4xl sm:text-5xl text-[#FAF7F2] font-light">
              {rangeVal.toLocaleString()}
            </span>
            <span className="text-[9px] uppercase font-sans tracking-[0.25em] text-[#C5A880] mt-1.5">
              Nautical Miles
            </span>
            <span className="text-[9px] font-mono text-[#A39D93]">Transatlantic Range</span>
          </div>

          <div className="hidden md:block w-[1px] h-12 bg-[#C5A880]/20 mx-auto" />

          {/* Spec 5 */}
          <div className="flex flex-col items-center text-center col-span-2 md:col-span-1">
            <span className="font-display text-4xl sm:text-5xl text-[#FAF7F2] font-light">
              {crewVal}
            </span>
            <span className="text-[9px] uppercase font-sans tracking-[0.25em] text-[#C5A880] mt-1.5">
              Dedicated Crew
            </span>
            <span className="text-[9px] font-mono text-[#A39D93]">1:1 Guest Ratio</span>
          </div>
        </div>
      </div>

      {/* Gold Chapter Label in footer flow */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-8 sm:px-14 flex items-center justify-between text-xs">
        <div className="flex items-center gap-3">
          <span className="w-6 h-[1px] bg-[#E5C483]" />
          <span className="text-[11px] font-mono tracking-[0.3em] uppercase text-[#E5C483]">
            II / DEPARTURE
          </span>
        </div>
        <span className="text-[9px] font-mono text-[#A39D93] tracking-widest">
          09:15 AM • CLEARING THE WATERLINE
        </span>
      </div>
    </section>
  );
}
