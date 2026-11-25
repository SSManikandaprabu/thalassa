"use client";

import React, { useRef, useMemo, useEffect } from "react";
import { useFrame } from "@react-three/fiber";
import { useGLTF, Html } from "@react-three/drei";
import * as THREE from "three";

export interface RoomHotspot {
  id: string;
  name: string;
  deck: string;
  description: string;
  position: [number, number, number];
  videoSrc: string;
  specs: { label: string; value: string }[];
}

export const YACHT_ROOMS: RoomHotspot[] = [
  {
    id: "sundeck",
    name: "Sun Deck Jacuzzi & Helipad",
    deck: "Sun Deck (Deck 4)",
    description: "Elevated panoramic relaxation with heated glass-fronted spa pool, certified touch-and-go helipad, and 360° horizon views.",
    position: [0, 3.8, -1.0],
    videoSrc: "/videos/sundeck.mp4",
    specs: [
      { label: "Capacity", value: "14 Guests" },
      { label: "Features", value: "Spa Pool, Wet Bar, BBQ" },
      { label: "Aviation", value: "EC135 Touch & Go" },
    ],
  },
  {
    id: "owners_suite",
    name: "Owner's Panoramic Suite",
    deck: "Upper Deck (Deck 3)",
    description: "Full-beam 120m² master sanctuary featuring 180° forward ocean vistas, private foredeck terrace, his & hers marble en-suites.",
    position: [0, 2.2, 2.8],
    videoSrc: "/videos/owners_suite.mp4",
    specs: [
      { label: "Area", value: "120 sq meters" },
      { label: "Balcony", value: "Private Foredeck Terrace" },
      { label: "Bedding", value: "Custom Emperor Bed" },
    ],
  },
  {
    id: "sky_lounge",
    name: "Sky Lounge & Dining",
    deck: "Upper Deck (Deck 3 Aft)",
    description: "Informal luxury salon opening to an expansive exterior al fresco dining table sheltered by the sundeck overhang.",
    position: [0, 2.0, -3.5],
    videoSrc: "/videos/sky_lounge.mp4",
    specs: [
      { label: "Dining", value: "12 Guests Al Fresco" },
      { label: "Cellar", value: "120-bottle Climate Vault" },
      { label: "Cinema", value: "98-inch 4K Roll-down" },
    ],
  },
  {
    id: "bridge",
    name: "Wheelhouse & Navigation",
    deck: "Wheelhouse (Deck 3 Fwd)",
    description: "State-of-the-art integrated glass bridge with Kongsberg ECDIS, dynamic positioning, and forward observation settee.",
    position: [0, 2.3, 4.8],
    videoSrc: "/videos/bridge.mp4",
    specs: [
      { label: "Avionics", value: "Dual Radar & Sonar" },
      { label: "Positioning", value: "Simrad DP0 Dynamic" },
      { label: "Class", value: "Lloyd's ✠ 100A1 SSC" },
    ],
  },
  {
    id: "beach_club",
    name: "Transom Beach Club & Spa",
    deck: "Lower Deck Aft (Deck 1)",
    description: "Hydraulic fold-down sea terrace providing direct sea access, hammam steam room, wellness gym, and tender launch dock.",
    position: [0, 0.4, -6.5],
    videoSrc: "/videos/beach_club.mp4",
    specs: [
      { label: "Platform", value: "Electro-hydraulic 28m²" },
      { label: "Tenders", value: "2x 7.5m Castoldi Jet" },
      { label: "Wellness", value: "Finnish Sauna & Gym" },
    ],
  },
];

interface ProceduralYachtProps {
  scrollProgress: number;
  isCutaway: boolean;
  onSelectRoom: (room: RoomHotspot) => void;
}

export function ProceduralYacht({
  scrollProgress,
  isCutaway,
  onSelectRoom,
}: ProceduralYachtProps) {
  const rootGroupRef = useRef<THREE.Group | null>(null);
  const deckNodesRef = useRef<{ [key: string]: THREE.Object3D }>({});

  // Load the authentic 3D Yacht model
  const gltf = useGLTF("/models/thalassa.glb");

  // Clone and normalize the 3D model
  const modelScene = useMemo(() => {
    if (!gltf || !gltf.scene) return null;
    const cloned = gltf.scene.clone(true);

    // Compute bounding box and center
    const box = new THREE.Box3().setFromObject(cloned);
    const size = box.getSize(new THREE.Vector3());
    const center = box.getCenter(new THREE.Vector3());

    // Scale so total length is comfortably framed at ~12.5 units
    const maxDim = Math.max(size.x, size.z);
    const targetScale = maxDim > 0 ? 12.5 / maxDim : 1;

    cloned.position.set(-center.x * targetScale, -center.y * targetScale, -center.z * targetScale);
    cloned.scale.set(targetScale, targetScale, targetScale);

    // Enhance materials for luxury PBR finish
    cloned.traverse((child) => {
      if ((child as THREE.Mesh).isMesh) {
        const mesh = child as THREE.Mesh;
        mesh.castShadow = true;
        mesh.receiveShadow = true;

        if (mesh.material) {
          const mat = mesh.material as THREE.MeshStandardMaterial;
          mat.roughness = Math.min(mat.roughness, 0.35);
          mat.metalness = Math.max(mat.metalness, 0.15);
          mat.envMapIntensity = 1.6;
        }
      }
    });

    return cloned;
  }, [gltf]);

  // Index separable deck layers for cutaway mode
  useEffect(() => {
    if (!modelScene) return;
    const found: { [key: string]: THREE.Object3D } = {};

    modelScene.traverse((child) => {
      if (child.name.includes("Object001")) found["deck1"] = child;
      if (child.name.includes("Object002")) found["deck2"] = child;
      if (child.name.includes("Object003")) found["deck3"] = child;
      if (child.name.includes("Object004")) found["deck4"] = child;
    });

    deckNodesRef.current = found;
  }, [modelScene]);

  // Continuous scroll rotation & gentle ocean heave animation
  useFrame((state, delta) => {
    if (!rootGroupRef.current) return;

    // Rotate 360 degrees smoothly with scroll
    const targetRotY = scrollProgress * Math.PI * 2 + 0.6;
    rootGroupRef.current.rotation.y = THREE.MathUtils.lerp(
      rootGroupRef.current.rotation.y,
      targetRotY,
      0.06
    );

    // Gentle natural water heave & roll
    const time = state.clock.getElapsedTime();
    rootGroupRef.current.rotation.z = Math.sin(time * 0.9) * 0.012;
    rootGroupRef.current.position.y = Math.sin(time * 1.3) * 0.06;

    // Cutaway deck translations
    const d4 = deckNodesRef.current["deck4"];
    const d3 = deckNodesRef.current["deck3"];
    const d2 = deckNodesRef.current["deck2"];

    const cutTargetD4 = isCutaway ? 2.5 : 0;
    const cutTargetD3 = isCutaway ? 1.4 : 0;
    const cutTargetD2 = isCutaway ? 0.6 : 0;

    if (d4) d4.position.y = THREE.MathUtils.lerp(d4.position.y, cutTargetD4, delta * 3.5);
    if (d3) d3.position.y = THREE.MathUtils.lerp(d3.position.y, cutTargetD3, delta * 3.5);
    if (d2) d2.position.y = THREE.MathUtils.lerp(d2.position.y, cutTargetD2, delta * 3.5);
  });

  return (
    <group ref={rootGroupRef} position={[0, -0.2, 0]}>
      {/* Authentic 3D Yacht Model */}
      {modelScene && <primitive object={modelScene} />}

      {/* Underwater Cyan LED Illumination */}
      <pointLight position={[0, -1.0, -5]} color="#00e5ff" intensity={3.5} distance={7} />
      <pointLight position={[3, -1.0, 0]} color="#00e5ff" intensity={2.5} distance={6} />
      <pointLight position={[-3, -1.0, 0]} color="#00e5ff" intensity={2.5} distance={6} />

      {/* Gold Waterline Accent Light */}
      <pointLight position={[0, 0.5, 6]} color="#E5C483" intensity={1.8} distance={8} />

      {/* Cutaway Leader Lines & Interactive Hotspots */}
      {isCutaway && (
        <group>
          {YACHT_ROOMS.map((room) => {
            let adjustedY = room.position[1];
            if (room.id === "sundeck") adjustedY += 1.8;
            else if (room.id === "owners_suite" || room.id === "sky_lounge" || room.id === "bridge") adjustedY += 0.9;

            const pos: [number, number, number] = [room.position[0], adjustedY, room.position[2]];

            return (
              <group key={room.id} position={pos}>
                {/* 3D Gold Sphere Pin */}
                <mesh>
                  <sphereGeometry args={[0.16, 16, 16]} />
                  <meshBasicMaterial color="#E5C483" />
                </mesh>

                {/* Vertical Gold Leader Stalk */}
                <line>
                  <bufferGeometry
                    attach="geometry"
                    onUpdate={(self) => {
                      const points = [new THREE.Vector3(0, 0, 0), new THREE.Vector3(0, 0.9, 0)];
                      self.setFromPoints(points);
                    }}
                  />
                  <lineBasicMaterial color="#E5C483" linewidth={2} />
                </line>

                {/* Interactive Hotspot Card */}
                <Html position={[0, 1.2, 0]} center distanceFactor={14}>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onSelectRoom(room);
                    }}
                    data-cursor="Play Reel"
                    className="group relative flex items-center gap-2 px-3 py-1.5 rounded-full border border-[#E5C483] bg-[#040914]/90 backdrop-blur-md text-white whitespace-nowrap shadow-[0_0_20px_rgba(229,196,131,0.5)] hover:bg-[#E5C483] hover:text-[#040914] transition-all duration-300"
                  >
                    <span className="w-2 h-2 rounded-full bg-[#E5C483] group-hover:bg-[#040914] animate-ping" />
                    <span className="text-[10px] font-sans font-semibold tracking-wider uppercase">
                      {room.name}
                    </span>
                    <span className="text-[9px] opacity-75 font-mono">▶</span>
                  </button>
                </Html>
              </group>
            );
          })}
        </group>
      )}
    </group>
  );
}

// Preload the authentic GLTF model
useGLTF.preload("/models/thalassa.glb");
