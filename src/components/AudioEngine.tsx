"use client";

import React, { useEffect, useRef, useState, useCallback } from "react";
import { Volume2, VolumeX } from "lucide-react";

interface AudioEngineProps {
  scrollProgress: number; // 0 (dawn) to 1 (midnight)
}

export function AudioEngine({ scrollProgress }: AudioEngineProps) {
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [isMuted, setIsMuted] = useState<boolean>(true);
  const [userInteracted, setUserInteracted] = useState<boolean>(false);
  
  const audioCtxRef = useRef<AudioContext | null>(null);
  const masterGainRef = useRef<GainNode | null>(null);
  const waveGainRef = useRef<GainNode | null>(null);
  const windGainRef = useRef<GainNode | null>(null);
  const engineGainRef = useRef<GainNode | null>(null);
  const filterRef = useRef<BiquadFilterNode | null>(null);

  // Initialize Web Audio graph
  const initAudio = useCallback(() => {
    if (audioCtxRef.current) {
      if (audioCtxRef.current.state === "suspended") {
        audioCtxRef.current.resume();
      }
      return;
    }

    try {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      const ctx = new AudioCtx();
      audioCtxRef.current = ctx;

      // Master Gain
      const masterGain = ctx.createGain();
      masterGain.gain.setValueAtTime(0, ctx.currentTime);
      masterGain.connect(ctx.destination);
      masterGainRef.current = masterGain;

      // --- 1. OCEAN WAVES NOISE SYNTH ---
      const bufferSize = ctx.sampleRate * 4;
      const noiseBuffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
      const output = noiseBuffer.getChannelData(0);
      let lastOut = 0.0;
      for (let i = 0; i < bufferSize; i++) {
        // Brown noise simulation
        const white = Math.random() * 2 - 1;
        output[i] = (lastOut + 0.02 * white) / 1.02;
        lastOut = output[i];
        output[i] *= 2.8;
      }

      const noiseSource = ctx.createBufferSource();
      noiseSource.buffer = noiseBuffer;
      noiseSource.loop = true;

      const waveFilter = ctx.createBiquadFilter();
      waveFilter.type = "lowpass";
      waveFilter.frequency.setValueAtTime(450, ctx.currentTime);
      waveFilter.Q.setValueAtTime(3.0, ctx.currentTime);
      filterRef.current = waveFilter;

      const waveGain = ctx.createGain();
      waveGain.gain.setValueAtTime(0.18, ctx.currentTime);
      waveGainRef.current = waveGain;

      // LFO for wave swells (period approx 6 seconds)
      const lfo = ctx.createOscillator();
      lfo.frequency.setValueAtTime(0.16, ctx.currentTime);
      const lfoGain = ctx.createGain();
      lfoGain.gain.setValueAtTime(180, ctx.currentTime);
      lfo.connect(lfoGain);
      lfoGain.connect(waveFilter.frequency);

      noiseSource.connect(waveFilter);
      waveFilter.connect(waveGain);
      waveGain.connect(masterGain);
      lfo.start();
      noiseSource.start();

      // --- 2. MARITIME WIND SYNTH ---
      const windFilter = ctx.createBiquadFilter();
      windFilter.type = "bandpass";
      windFilter.frequency.setValueAtTime(750, ctx.currentTime);
      windFilter.Q.setValueAtTime(1.5, ctx.currentTime);

      const windGain = ctx.createGain();
      windGain.gain.setValueAtTime(0.08, ctx.currentTime);
      windGainRef.current = windGain;

      const windSource = ctx.createBufferSource();
      windSource.buffer = noiseBuffer;
      windSource.loop = true;
      windSource.connect(windFilter);
      windFilter.connect(windGain);
      windGain.connect(masterGain);
      windSource.start();

      // --- 3. DIESEL ENGINE SUB-HUM (48Hz / 96Hz) ---
      const engineOsc1 = ctx.createOscillator();
      engineOsc1.type = "sine";
      engineOsc1.frequency.setValueAtTime(48, ctx.currentTime);

      const engineOsc2 = ctx.createOscillator();
      engineOsc2.type = "triangle";
      engineOsc2.frequency.setValueAtTime(96, ctx.currentTime);

      const engineSubGain = ctx.createGain();
      engineSubGain.gain.setValueAtTime(0.05, ctx.currentTime);
      engineGainRef.current = engineSubGain;

      const engineFilter = ctx.createBiquadFilter();
      engineFilter.type = "lowpass";
      engineFilter.frequency.setValueAtTime(120, ctx.currentTime);

      engineOsc1.connect(engineFilter);
      engineOsc2.connect(engineFilter);
      engineFilter.connect(engineSubGain);
      engineSubGain.connect(masterGain);

      engineOsc1.start();
      engineOsc2.start();

      setIsPlaying(true);
    } catch (e) {
      console.warn("Web Audio not supported or blocked", e);
    }
  }, []);

  const toggleSound = () => {
    setUserInteracted(true);
    let ctx = audioCtxRef.current;
    if (!ctx) {
      initAudio();
      ctx = audioCtxRef.current;
      setIsMuted(false);
      if (masterGainRef.current && ctx) {
        masterGainRef.current.gain.setTargetAtTime(0.65, ctx.currentTime, 0.4);
      }
    } else {
      const nextMuted = !isMuted;
      setIsMuted(nextMuted);
      if (masterGainRef.current) {
        masterGainRef.current.gain.setTargetAtTime(nextMuted ? 0 : 0.65, ctx.currentTime, 0.3);
      }
    }
  };

  // Dynamically adapt soundscape based on scroll progress (Dawn -> Noon -> Golden Hour -> Midnight)
  useEffect(() => {
    if (!audioCtxRef.current || isMuted || !masterGainRef.current) return;
    const ctx = audioCtxRef.current;
    const now = ctx.currentTime;

    // Progress: 0 to 1
    // Dawn (0 - 0.25): Calm waves, quiet wind, slight engine
    // Departure (0.25 - 0.5): Throaty engine, water wakes
    // Open Sea (0.5 - 0.75): Full cruising hum, breezy wind, energetic waves
    // Golden Hour (0.75 - 0.9): Warm soothing waves, lower engine
    // Midnight (0.9 - 1.0): Deep resonant calm, whisper breeze

    if (waveGainRef.current) {
      const waveTarget = 0.15 + Math.sin(scrollProgress * Math.PI) * 0.14;
      waveGainRef.current.gain.setTargetAtTime(waveTarget, now, 0.5);
    }

    if (windGainRef.current) {
      const windTarget = 0.05 + Math.sin(scrollProgress * Math.PI * 0.8) * 0.1;
      windGainRef.current.gain.setTargetAtTime(windTarget, now, 0.5);
    }

    if (engineGainRef.current) {
      // Cruising engine peak during Departure & Open Sea
      let engTarget = 0.04;
      if (scrollProgress > 0.2 && scrollProgress < 0.8) {
        engTarget = 0.12;
      } else if (scrollProgress >= 0.8) {
        engTarget = 0.03; // Midnight quiet harbor anchor
      }
      engineGainRef.current.gain.setTargetAtTime(engTarget, now, 0.5);
    }

    if (filterRef.current) {
      // Warmer lower cutoff at night
      const cutoff = scrollProgress > 0.85 ? 320 : 500;
      filterRef.current.frequency.setTargetAtTime(cutoff, now, 0.5);
    }
  }, [scrollProgress, isMuted]);

  return (
    <div className="fixed bottom-8 left-8 z-[9000] flex items-center space-x-3">
      <button
        onClick={toggleSound}
        className="group relative flex items-center gap-3 px-4 py-2.5 rounded-full border border-[#C5A880]/30 bg-[#040914]/80 backdrop-blur-md text-[#FAF7F2] text-xs uppercase tracking-[0.2em] transition-all duration-500 hover:border-[#C5A880] hover:bg-[#070E1B]"
        title={isMuted ? "Unmute Sea Ambience" : "Mute Soundscape"}
        aria-label="Toggle Sound"
      >
        <span className="relative flex items-center justify-center text-[#C5A880]">
          {isMuted ? <VolumeX size={15} /> : <Volume2 size={15} />}
        </span>

        <span className="hidden sm:inline font-sans text-[11px] text-[#E5E0D6] group-hover:text-white transition-colors">
          {isMuted ? "Sound Off" : "Ambience On"}
        </span>

        {/* Animated equalizer bars when active */}
        {!isMuted && (
          <div className="flex items-center gap-[3px] h-3 ml-1">
            <span className="w-[2px] h-2 bg-[#C5A880] animate-[pulse_0.8s_ease-in-out_infinite]" />
            <span className="w-[2px] h-3 bg-[#C5A880] animate-[pulse_1.2s_ease-in-out_infinite]" />
            <span className="w-[2px] h-1.5 bg-[#C5A880] animate-[pulse_0.6s_ease-in-out_infinite]" />
            <span className="w-[2px] h-2.5 bg-[#C5A880] animate-[pulse_1s_ease-in-out_infinite]" />
          </div>
        )}
      </button>

      {!userInteracted && isMuted && (
        <span className="hidden md:inline-block text-[10px] uppercase tracking-widest text-[#C5A880]/60 animate-pulse">
          Click for maritime audio
        </span>
      )}
    </div>
  );
}
