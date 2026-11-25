"use client";

import React, { Suspense, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Environment, Float } from "@react-three/drei";
import { ProceduralYacht, YACHT_ROOMS, RoomHotspot } from "./ProceduralYacht";
import { X, Layers, Play, CheckCircle2 } from "lucide-react";

interface YachtCanvasProps {
  scrollProgress: number;
}

export function YachtCanvas({ scrollProgress }: YachtCanvasProps) {
  const [isCutaway, setIsCutaway] = useState(false);
  const [activeRoom, setActiveRoom] = useState<RoomHotspot | null>(null);

  return (
    <div className="relative w-full h-[520px] sm:h-[580px] lg:h-[640px] flex items-center justify-center rounded-3xl overflow-hidden border border-[#C5A880]/20 bg-[#040914]/60 backdrop-blur-md">
      {/* 3D Canvas */}
      <div className="w-full h-full cursor-grab active:cursor-grabbing">
        <Canvas
          shadows
          camera={{ position: [17, 7, 17], fov: 34 }}
          gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
        >
          <ambientLight intensity={1.1} />
          {/* Key Sun Directional Light */}
          <directionalLight
            position={[20, 25, 15]}
            intensity={2.4}
            castShadow
            shadow-mapSize-width={1024}
            shadow-mapSize-height={1024}
          />
          {/* Warm Golden Rim Sheen */}
          <directionalLight position={[-15, 12, -18]} intensity={1.6} color="#E5C483" />

          <Suspense fallback={null}>
            <Environment preset="sunset" />
            <Float speed={1.1} rotationIntensity={0.12} floatIntensity={0.18}>
              <ProceduralYacht
                scrollProgress={scrollProgress}
                isCutaway={isCutaway}
                onSelectRoom={(room) => setActiveRoom(room)}
              />
            </Float>
          </Suspense>

          <OrbitControls
            enablePan={false}
            enableZoom={true}
            minDistance={10}
            maxDistance={32}
            maxPolarAngle={Math.PI / 2 - 0.08}
            minPolarAngle={Math.PI / 6}
          />
        </Canvas>
      </div>

      {/* Floating Canvas UI Controls - Positioned cleanly in top-right corner of the canvas frame */}
      <div className="absolute top-5 right-5 z-20 flex flex-col items-end gap-2 pointer-events-auto">
        <button
          onClick={() => setIsCutaway(!isCutaway)}
          className={`flex items-center gap-2.5 px-4 py-2 rounded-full border transition-all duration-300 text-[11px] uppercase tracking-[0.2em] font-sans backdrop-blur-md cursor-pointer ${
            isCutaway
              ? "bg-[#E5C483] text-[#040914] border-[#FAF7F2] font-semibold shadow-[0_0_20px_rgba(229,196,131,0.6)]"
              : "bg-[#040914]/85 text-[#FAF7F2] border-[#C5A880]/40 hover:border-[#E5C483] hover:bg-[#070E1B]"
          }`}
        >
          <Layers size={14} />
          <span>{isCutaway ? "Cutaway Active" : "Inspect Cutaway"}</span>
        </button>

        <span className="text-[9px] text-[#A39D93] uppercase tracking-widest font-mono">
          Drag to orbit 360°
        </span>
      </div>

      {/* Room Selection Quick Bar in Cutaway Mode */}
      {isCutaway && (
        <div className="absolute bottom-5 left-4 right-4 z-20 flex items-center justify-center gap-2 flex-wrap pointer-events-auto">
          {YACHT_ROOMS.map((room) => (
            <button
              key={room.id}
              onClick={() => setActiveRoom(room)}
              className="px-3 py-1 rounded-full border border-[#C5A880]/40 bg-[#040914]/90 backdrop-blur-md text-[#FAF7F2] text-[10px] uppercase tracking-wider hover:border-[#E5C483] hover:text-[#E5C483] transition-all cursor-pointer"
            >
              {room.name}
            </button>
          ))}
        </div>
      )}

      {/* Cinematic Room Video Overlay Modal */}
      {activeRoom && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-[#030712]/95 backdrop-blur-2xl p-4 sm:p-8 animate-[fadeIn_0.3s_ease-out]">
          <div className="relative w-full max-w-5xl rounded-2xl border border-[#C5A880]/40 bg-[#040914] overflow-hidden shadow-[0_0_100px_rgba(3,7,18,0.95)]">
            {/* Modal Header */}
            <div className="flex items-center justify-between p-6 border-b border-[#C5A880]/20 bg-[#070E1B]">
              <div>
                <span className="text-[10px] font-mono tracking-[0.3em] uppercase text-[#E5C483]">
                  {activeRoom.deck}
                </span>
                <h3 className="font-display text-2xl sm:text-3xl text-[#FAF7F2] tracking-wider mt-1">
                  {activeRoom.name}
                </h3>
              </div>

              <button
                onClick={() => setActiveRoom(null)}
                className="p-2.5 rounded-full border border-[#C5A880]/40 text-[#E5C483] hover:text-white hover:border-white transition-colors cursor-pointer"
                aria-label="Close Room Preview"
              >
                <X size={20} />
              </button>
            </div>

            {/* Modal Body: Video + Specs */}
            <div className="grid grid-cols-1 lg:grid-cols-3">
              {/* High-res Cinematic Video Player */}
              <div className="lg:col-span-2 relative aspect-video bg-black flex items-center justify-center overflow-hidden">
                <video
                  src={activeRoom.videoSrc}
                  autoPlay
                  loop
                  muted
                  playsInline
                  className="w-full h-full object-cover"
                />
                <div className="absolute bottom-4 left-4 flex items-center gap-2 px-3 py-1 rounded-full bg-black/60 backdrop-blur-md border border-white/10 text-[10px] font-mono tracking-widest text-[#E5C483]">
                  <Play size={10} className="fill-current" /> 4K Ultra HD Drone Feed
                </div>
              </div>

              {/* Specs & Description */}
              <div className="p-6 sm:p-8 flex flex-col justify-between bg-[#081226]/60">
                <div>
                  <h4 className="text-[11px] uppercase tracking-[0.25em] text-[#C5A880] mb-3">
                    Architectural Details
                  </h4>
                  <p className="text-sm text-[#E5E0D6] font-body leading-relaxed">
                    {activeRoom.description}
                  </p>

                  <div className="mt-6 space-y-3">
                    {activeRoom.specs.map((spec) => (
                      <div
                        key={spec.label}
                        className="flex items-center justify-between py-2 border-b border-white/5 text-xs"
                      >
                        <span className="text-[#A39D93]">{spec.label}</span>
                        <span className="font-mono text-[#FAF7F2] font-medium">{spec.value}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mt-8 pt-4 border-t border-white/10 flex items-center gap-2 text-xs text-[#E5C483]">
                  <CheckCircle2 size={16} />
                  <span>Available on bespoke charter</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
