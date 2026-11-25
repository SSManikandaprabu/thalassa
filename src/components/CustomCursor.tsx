"use client";

import React, { useEffect, useRef, useState } from "react";

export function CustomCursor() {
  const dotRef = useRef<HTMLDivElement | null>(null);
  const ringRef = useRef<HTMLDivElement | null>(null);
  const textRef = useRef<HTMLSpanElement | null>(null);

  const [cursorText, setCursorText] = useState<string>("");
  const [isHovered, setIsHovered] = useState<boolean>(false);
  const [isPointer, setIsPointer] = useState<boolean>(false);
  const [isVisible, setIsVisible] = useState<boolean>(false);

  useEffect(() => {
    // Only enable custom cursor on non-touch screens
    if (window.matchMedia("(pointer: coarse)").matches) {
      return;
    }

    let mouseX = -100;
    let mouseY = -100;
    let ringX = -100;
    let ringY = -100;
    let animId: number;

    const onMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      if (!isVisible) setIsVisible(true);

      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0)`;
      }

      // Check hovered element custom cursor data attributes
      const target = e.target as HTMLElement | null;
      if (target) {
        const interactive = target.closest("[data-cursor]") as HTMLElement | null;
        if (interactive) {
          const type = interactive.getAttribute("data-cursor") || "Explore";
          setCursorText(type);
          setIsHovered(true);
        } else {
          setCursorText("");
          setIsHovered(false);
        }

        const isClickable = target.closest("button, a, input, select, textarea, [role='button']");
        setIsPointer(!!isClickable);
      }
    };

    const onMouseLeave = () => {
      setIsVisible(false);
    };

    // Smooth lagging ring loop
    const loop = () => {
      ringX += (mouseX - ringX) * 0.15;
      ringY += (mouseY - ringY) * 0.15;

      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${ringX}px, ${ringY}px, 0)`;
      }

      animId = requestAnimationFrame(loop);
    };

    window.addEventListener("mousemove", onMouseMove);
    document.addEventListener("mouseleave", onMouseLeave);
    animId = requestAnimationFrame(loop);

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseleave", onMouseLeave);
      cancelAnimationFrame(animId);
    };
  }, [isVisible]);

  if (!isVisible) return null;

  return (
    <div className="pointer-events-none fixed inset-0 z-[99999] overflow-hidden select-none">
      {/* Precision Gold Dot */}
      <div
        ref={dotRef}
        className={`fixed top-0 left-0 w-2 h-2 -ml-1 -mt-1 rounded-full bg-[#E5C483] transition-opacity duration-300 ${
          isHovered ? "opacity-0" : "opacity-100"
        }`}
        style={{ willChange: "transform" }}
      />

      {/* Lagging Ring / Morphing Badge */}
      <div
        ref={ringRef}
        className={`fixed top-0 left-0 -ml-5 -mt-5 flex items-center justify-center rounded-full transition-[width,height,background-color,border-color] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
          isHovered
            ? "w-20 h-20 -ml-10 -mt-10 bg-[#C5A880]/20 border border-[#E5C483] backdrop-blur-sm shadow-[0_0_20px_rgba(197,168,128,0.4)]"
            : isPointer
            ? "w-12 h-12 -ml-6 -mt-6 border border-[#C5A880]/80 bg-[#C5A880]/10"
            : "w-10 h-10 border border-[#C5A880]/40"
        }`}
        style={{ willChange: "transform" }}
      >
        {isHovered && cursorText && (
          <span
            ref={textRef}
            className="text-[9px] font-sans font-medium uppercase tracking-[0.2em] text-[#FAF7F2] text-center"
          >
            {cursorText}
          </span>
        )}
      </div>
    </div>
  );
}
