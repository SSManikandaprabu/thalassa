"use client";

import React, { useEffect, useRef, useState } from "react";
import * as THREE from "three";

interface OceanBackgroundProps {
  scrollProgress: number; // 0 (dawn) -> 0.25 (noon) -> 0.75 (golden hour) -> 1.0 (midnight)
}

export function OceanBackground({ scrollProgress }: OceanBackgroundProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [isMobileOrReduced, setIsMobileOrReduced] = useState(false);

  useEffect(() => {
    // Check mobile or reduced motion
    const isMobile = window.innerWidth < 768 || window.matchMedia("(pointer: coarse)").matches;
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (isMobile || prefersReducedMotion) {
      setIsMobileOrReduced(true);
      return;
    }

    const container = containerRef.current;
    if (!container) return;

    // Setup Three.js scene
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      55,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.position.set(0, 8, 18);
    camera.lookAt(0, 0, 0);

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: "high-performance",
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
    container.appendChild(renderer.domElement);

    // Dynamic Ocean Shader
    const oceanVertexShader = `
      uniform float uTime;
      uniform vec2 uMouse;
      varying vec2 vUv;
      varying float vElevation;
      varying vec3 vWorldPos;

      // Simple 2D noise
      float hash(vec2 p) {
        return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453123);
      }
      float noise(vec2 p) {
        vec2 i = floor(p);
        vec2 f = fract(p);
        f = f * f * (3.0 - 2.0 * f);
        float a = hash(i);
        float b = hash(i + vec2(1.0, 0.0));
        float c = hash(i + vec2(0.0, 1.0));
        float d = hash(i + vec2(1.0, 1.0));
        return mix(mix(a, b, f.x), mix(c, d, f.x), f.y);
      }

      void main() {
        vUv = uv;
        vec3 pos = position;

        // Wave harmonics
        float wave1 = sin(pos.x * 0.4 + uTime * 1.2) * cos(pos.y * 0.3 + uTime * 0.9) * 0.6;
        float wave2 = sin(pos.x * 0.8 - uTime * 1.5) * cos(pos.y * 0.6 + uTime * 1.1) * 0.25;
        float fine = noise(pos.xy * 1.5 + uTime * 0.5) * 0.2;

        // Cursor wake ripple
        float distToMouse = distance(pos.xy, uMouse * vec2(25.0, 15.0));
        float wake = exp(-distToMouse * 0.8) * sin(distToMouse * 4.0 - uTime * 6.0) * 0.45;

        pos.z += wave1 + wave2 + fine + wake;
        vElevation = pos.z;
        vWorldPos = (modelMatrix * vec4(pos, 1.0)).xyz;

        gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
      }
    `;

    const oceanFragmentShader = `
      uniform float uTime;
      uniform float uProgress;
      uniform vec3 uDawnColor;
      uniform vec3 uNoonColor;
      uniform vec3 uGoldenColor;
      uniform vec3 uMidnightColor;
      varying vec2 vUv;
      varying float vElevation;
      varying vec3 vWorldPos;

      void main() {
        // Interpolate ocean color palette based on scroll time
        vec3 waterBase;
        vec3 waterCrest;

        if (uProgress < 0.33) {
          // Dawn to Noon
          float t = uProgress / 0.33;
          waterBase = mix(uDawnColor, uNoonColor, t);
          waterCrest = mix(vec3(0.9, 0.75, 0.65), vec3(0.85, 0.95, 1.0), t);
        } else if (uProgress < 0.66) {
          // Noon to Golden Hour
          float t = (uProgress - 0.33) / 0.33;
          waterBase = mix(uNoonColor, uGoldenColor, t);
          waterCrest = mix(vec3(0.85, 0.95, 1.0), vec3(0.98, 0.85, 0.5), t);
        } else {
          // Golden Hour to Midnight
          float t = (uProgress - 0.66) / 0.34;
          waterBase = mix(uGoldenColor, uMidnightColor, t);
          waterCrest = mix(vec3(0.98, 0.85, 0.5), vec3(0.1, 0.65, 0.8), t); // Bioluminescent / underwater glow
        }

        // Foam crests on wave peaks
        float foam = smoothstep(0.35, 0.75, vElevation);
        vec3 finalColor = mix(waterBase, waterCrest, foam * 0.5);

        // Specular glint
        vec3 lightDir = normalize(vec3(cos(uProgress * 3.14), 1.0, sin(uProgress * 3.14)));
        vec3 normal = normalize(vec3(0.0, 0.0, 1.0) + vec3(-dFdx(vElevation), -dFdy(vElevation), 0.0) * 1.5);
        float spec = pow(max(dot(reflect(-lightDir, normal), vec3(0.0, 0.0, 1.0)), 0.0), 32.0);
        
        finalColor += vec3(0.8, 0.7, 0.5) * spec * (1.0 - uProgress * 0.4);

        // Midnight underwater LED glow
        if (uProgress > 0.7) {
          float glowT = (uProgress - 0.7) / 0.3;
          finalColor += vec3(0.02, 0.15, 0.25) * glowT * (1.0 + sin(uTime * 2.0) * 0.2);
        }

        gl_FragColor = vec4(finalColor, 0.82);
      }
    `;

    const geometry = new THREE.PlaneGeometry(60, 40, 128, 128);
    const uniforms = {
      uTime: { value: 0 },
      uProgress: { value: scrollProgress },
      uMouse: { value: new THREE.Vector2(0, 0) },
      uDawnColor: { value: new THREE.Color("#0c2340") },
      uNoonColor: { value: new THREE.Color("#0a2b5e") },
      uGoldenColor: { value: new THREE.Color("#2a2015") },
      uMidnightColor: { value: new THREE.Color("#020712") },
    };

    const material = new THREE.ShaderMaterial({
      vertexShader: oceanVertexShader,
      fragmentShader: oceanFragmentShader,
      uniforms,
      transparent: true,
      wireframe: false,
    });

    const mesh = new THREE.Mesh(geometry, material);
    mesh.rotation.x = -Math.PI / 2.3;
    mesh.position.y = -2;
    scene.add(mesh);

    // Mouse wake interaction
    const targetMouse = new THREE.Vector2(0, 0);
    const onMouseMove = (e: MouseEvent) => {
      targetMouse.x = (e.clientX / window.innerWidth) * 2 - 1;
      targetMouse.y = -(e.clientY / window.innerHeight) * 2 + 1;
    };
    window.addEventListener("mousemove", onMouseMove);

    // Resize handler
    const onResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener("resize", onResize);

    // Animation loop
    let animId: number;
    const clock = new THREE.Clock();

    const animate = () => {
      const delta = clock.getDelta();
      uniforms.uTime.value += delta;
      
      // Smooth mouse follow
      uniforms.uMouse.value.lerp(targetMouse, 0.08);

      renderer.render(scene, camera);
      animId = requestAnimationFrame(animate);
    };
    animate();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("resize", onResize);
      geometry.dispose();
      material.dispose();
      renderer.dispose();
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, [scrollProgress]);

  // Update progress uniform when prop changes
  useEffect(() => {
    // handled inside component state
  }, [scrollProgress]);

  if (isMobileOrReduced) {
    return (
      <div className="fixed inset-0 pointer-events-none z-[1] bg-gradient-to-b from-[#040914] via-[#081226] to-[#030712] opacity-80" />
    );
  }

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 pointer-events-none z-[2] opacity-70 mix-blend-screen transition-opacity duration-1000"
      style={{
        filter: "contrast(115%) saturate(120%)",
      }}
    />
  );
}
