"use client";

import React, { useEffect, useRef } from "react";
import { Anchor, Sparkles } from "lucide-react";

interface ChapterProps {
  scrollProgress: number;
  onRequestCharter: () => void;
}

export function ChapterMidnight({ scrollProgress, onRequestCharter }: ChapterProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // Dynamic canvas starfield with twinkling stars
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const onResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener("resize", onResize);

    const numStars = 120;
    const stars = Array.from({ length: numStars }, () => ({
      x: Math.random() * width,
      y: Math.random() * (height * 0.75),
      radius: Math.random() * 1.2 + 0.3,
      alpha: Math.random() * 0.8 + 0.2,
      speed: Math.random() * 0.02 + 0.005,
    }));

    let animId: number;
    const render = () => {
      ctx.clearRect(0, 0, width, height);

      stars.forEach((star) => {
        star.alpha += star.speed;
        if (star.alpha > 1 || star.alpha < 0.2) {
          star.speed = -star.speed;
        }

        ctx.fillStyle = `rgba(247, 245, 240, ${Math.max(0, Math.min(1, star.alpha))})`;
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
        ctx.fill();
      });

      animId = requestAnimationFrame(render);
    };
    render();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  return (
    <section
      id="chapter-4"
      className="relative w-full min-h-screen pt-32 sm:pt-36 pb-20 flex flex-col justify-between overflow-hidden bg-[#030712] select-none"
    >
      {/* Subtle thin serif word behind video */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-0 overflow-hidden">
        <span className="font-display font-light text-[12vw] tracking-[0.15em] text-[#C5A880] opacity-[0.035] leading-none whitespace-nowrap">
          ETERNITY
        </span>
      </div>

      {/* Starfield Canvas Background */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 pointer-events-none z-[1] opacity-75"
      />

      {/* Night Superyacht Video with Underwater Glowing Lights */}
      <div className="absolute inset-0 z-[1] overflow-hidden opacity-60">
        <video
          src="/videos/night.mp4"
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover transition-transform duration-1000 ease-[cubic-bezier(0.16,1,0.3,1)]"
          style={{
            filter: "contrast(120%) brightness(75%)",
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#030712] via-[#030712]/70 to-[#030712]/90" />
      </div>

      {/* Eyebrow */}
      <div className="relative z-10 text-center max-w-xl mx-auto px-6">
        <span className="text-[10px] sm:text-xs font-sans uppercase tracking-[0.45em] text-[#E5C483] block">
          The Voyage Never Truly Ends
        </span>
      </div>

      {/* Main Climax Content */}
      <div className="relative z-10 max-w-4xl mx-auto px-6 text-center flex flex-col items-center my-auto">
        <div className="w-11 h-11 rounded-full border border-[#C5A880]/40 flex items-center justify-center text-[#E5C483] mb-6 shadow-[0_0_20px_rgba(229,196,131,0.25)]">
          <Anchor size={18} />
        </div>

        <div className="overflow-hidden">
          <h2 className="font-display text-5xl sm:text-7xl font-light tracking-[0.12em] text-[#FAF7F2] leading-tight">
            The sea is waiting.
          </h2>
        </div>

        <p className="text-xs sm:text-sm text-[#A39D93] max-w-lg mx-auto mt-4 font-body leading-relaxed">
          From the private bays of the Amalfi Coast to the deep midnight anchorages of Saint-Tropez, charter THALASSA for an unforgettable private expedition.
        </p>

        {/* "Request a charter" VIP boarding pass button */}
        <div className="mt-10 flex flex-col items-center gap-4">
          <button
            onClick={onRequestCharter}
            className="group relative px-10 py-4 rounded-full bg-gradient-to-r from-[#C5A880] via-[#E5C483] to-[#C5A880] text-[#040914] text-xs font-sans font-semibold tracking-[0.25em] uppercase transition-all duration-500 hover:shadow-[0_0_40px_rgba(229,196,131,0.7)] hover:scale-105 active:scale-95 cursor-pointer"
          >
            <span className="relative z-10 flex items-center gap-2">
              <Sparkles size={14} /> Request a Charter
            </span>
          </button>

          <span className="text-[10px] uppercase font-mono tracking-widest text-[#C5A880]/70">
            Confidential Concierge • Response within 2 Hours
          </span>
        </div>
      </div>

      {/* Gold Chapter Label in footer flow */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-8 sm:px-14 flex items-center justify-between text-xs">
        <div className="flex items-center gap-3">
          <span className="w-6 h-[1px] bg-[#E5C483]" />
          <span className="text-[11px] font-mono tracking-[0.3em] uppercase text-[#E5C483]">
            V / MIDNIGHT
          </span>
        </div>
        <span className="text-[9px] font-mono text-[#A39D93] tracking-widest">
          12:00 AM • AT ANCHOR BENEATH THE STARS
        </span>
      </div>
    </section>
  );
}
