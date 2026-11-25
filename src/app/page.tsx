"use client";

import React, { useEffect, useState, useRef } from "react";
import Lenis from "lenis";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import { Preloader } from "@/components/Preloader";
import { NauticalCompass } from "@/components/NauticalCompass";
import { OceanBackground } from "@/components/OceanBackground";
import { BoardingPassModal } from "@/components/BoardingPassModal";

import { ChapterDawn } from "@/components/chapters/ChapterDawn";
import { ChapterDeparture } from "@/components/chapters/ChapterDeparture";
import { ChapterOpenSea } from "@/components/chapters/ChapterOpenSea";
import { ChapterGoldenHour } from "@/components/chapters/ChapterGoldenHour";
import { ChapterMidnight } from "@/components/chapters/ChapterMidnight";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function ThalassaExperience() {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isPreloaded, setIsPreloaded] = useState(false);
  const [isBoardingPassOpen, setIsBoardingPassOpen] = useState(false);
  const lenisRef = useRef<Lenis | null>(null);

  // Initialize Lenis + GSAP ScrollTrigger
  useEffect(() => {
    // Lenis lerp 0.07 for heavy, silky inertia
    const lenis = new Lenis({
      lerp: 0.07,
      duration: 1.6,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });
    lenisRef.current = lenis;

    lenis.on("scroll", (e) => {
      ScrollTrigger.update();
      // Calculate overall progress from 0 to 1
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      const progress = maxScroll > 0 ? Math.min(1, Math.max(0, e.scroll / maxScroll)) : 0;
      setScrollProgress(progress);
    });

    // Wire Lenis with GSAP ticker
    const tickerCallback = (time: number) => {
      lenis.raf(time * 1000);
    };
    gsap.ticker.add(tickerCallback);
    gsap.ticker.lagSmoothing(0);

    // Card tilt constraint (max 4 degrees)
    const handleMouseMoveTilt = (e: MouseEvent) => {
      const cards = document.querySelectorAll(".tilt-card");
      cards.forEach((card) => {
        const rect = (card as HTMLElement).getBoundingClientRect();
        if (
          e.clientX >= rect.left - 50 &&
          e.clientX <= rect.right + 50 &&
          e.clientY >= rect.top - 50 &&
          e.clientY <= rect.bottom + 50
        ) {
          const centerX = rect.left + rect.width / 2;
          const centerY = rect.top + rect.height / 2;
          const tiltX = -((e.clientY - centerY) / (rect.height / 2)) * 4;
          const tiltY = ((e.clientX - centerX) / (rect.width / 2)) * 4;
          (card as HTMLElement).style.transform = `perspective(1000px) rotateX(${tiltX}deg) rotateY(${tiltY}deg)`;
        } else {
          (card as HTMLElement).style.transform = "perspective(1000px) rotateX(0deg) rotateY(0deg)";
        }
      });
    };
    window.addEventListener("mousemove", handleMouseMoveTilt);

    return () => {
      gsap.ticker.remove(tickerCallback);
      window.removeEventListener("mousemove", handleMouseMoveTilt);
      lenis.destroy();
    };
  }, []);

  // Jump to specific chapter smoothly
  const jumpToChapter = (chapterIndex: number) => {
    const targetElement = document.getElementById(`chapter-${chapterIndex}`);
    if (targetElement && lenisRef.current) {
      lenisRef.current.scrollTo(targetElement, {
        offset: 0,
        duration: 1.8,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      });
    }
  };

  // Dynamic vignette opacity: deepens from 0.35 at dawn to 0.88 toward night
  const vignetteOpacity = 0.35 + scrollProgress * 0.53;

  return (
    <main className="relative bg-[#040914] text-[#FAF7F2] min-h-screen selection:bg-[#C5A880]/30 selection:text-[#FAF7F2]">
      {/* 1. Preloader with Rope Knot Animation */}
      <Preloader onComplete={() => setIsPreloaded(true)} />

      {/* 2. Film Grain Overlay (3% opacity) */}
      <div className="film-grain" />

      {/* 4. Cinematic Vignette (Deepens toward midnight) */}
      <div
        className="cinematic-vignette"
        style={{
          opacity: vignetteOpacity,
        }}
      />

      {/* 5. WebGL Ocean Water Shader Background with Cursor Wake */}
      <OceanBackground scrollProgress={scrollProgress} />

      {/* 4. Nautical Compass Navigation & Brand Header */}
      <NauticalCompass
        scrollProgress={scrollProgress}
        onNavigateChapter={jumpToChapter}
        onRequestCharter={() => setIsBoardingPassOpen(true)}
      />

      {/* 5. VIP Charter Boarding Pass Modal */}
      <BoardingPassModal
        isOpen={isBoardingPassOpen}
        onClose={() => setIsBoardingPassOpen(false)}
      />

      {/* 10. The 5 Continuous Cinematic Chapters */}
      <div className="relative z-10 w-full">
        {/* Chapter 1: Dawn (05:42 AM) */}
        <ChapterDawn
          scrollProgress={scrollProgress}
          onExplore={() => jumpToChapter(1)}
        />

        {/* Chapter 2: Departure (09:15 AM) */}
        <ChapterDeparture scrollProgress={scrollProgress} />

        {/* Chapter 3: Open Sea & 3D Yacht Cutaway (02:20 PM) */}
        <ChapterOpenSea scrollProgress={scrollProgress} />

        {/* Chapter 4: Golden Hour Pinned Gallery (06:45 PM) */}
        <ChapterGoldenHour scrollProgress={scrollProgress} />

        {/* Chapter 5: Midnight & "The sea is waiting." (12:00 AM) */}
        <ChapterMidnight
          scrollProgress={scrollProgress}
          onRequestCharter={() => setIsBoardingPassOpen(true)}
        />
      </div>

      {/* Footer / Naval Colophon */}
      <footer className="relative z-20 py-12 px-8 border-t border-[#C5A880]/20 bg-[#030712] text-center text-[#A39D93] text-xs font-sans">
        <div className="max-w-4xl mx-auto flex flex-col items-center gap-4">
          <div className="flex items-center gap-6 text-[10px] uppercase font-mono tracking-[0.25em] text-[#C5A880]">
            <span>62M Bespoke Build</span>
            <span>•</span>
            <span>Monaco Flag</span>
            <span>•</span>
            <span>IMO 9845120</span>
          </div>
          <p className="max-w-md text-[11px] leading-relaxed text-[#A39D93]">
            THALASSA Superyacht Voyage. Designed as one continuous visual & sonic journey from dawn to midnight.
          </p>
          <span className="text-[10px] text-[#A39D93]/50">
            © 2026 THALASSA Naval Expeditions. All rights reserved.
          </span>
        </div>
      </footer>
    </main>
  );
}
