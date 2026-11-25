# THALASSA — 62M Luxury Superyacht Voyage

> **"The sea is waiting."**  
> A continuous cinematic journey from dawn to midnight designed to feel like an ultra-luxury film, not a website.

---

## Architecture & Concept

- **Continuous Scroll Timeline**: Scrolling moves time seamlessly from **05:42 AM** to **12:00 AM**.
- **Dynamic Sensory Morphing**: Sky color, light temperature, UI accents, and ambient procedural maritime audio (waves, sea breeze, 48Hz MTU twin diesel engine hum) shift continuously across five chapters.
- **Scroll Feel**: Lenis with `lerp: 0.07` for heavy, silky inertia and custom luxury bezier easing (`cubic-bezier(0.16, 1, 0.3, 1)`).
- **Interactive 3D Superyacht**: Three.js & React Three Fiber yacht that orbits 360° with scroll and dollies smoothly inward. Includes **Cutaway Mode**, which peels apart the four master decks along the vertical axis with gold leader lines and interactive room hotspots that launch 4K cinematic video reels.
- **WebGL Ocean Shader**: Multi-octave wave harmonics with foam crests, specular sun reflection, and dynamic mouse wake ripples.
- **Luxury Boarding Pass**: First-class charter enquiry form with port selection, concierge requisitions, barcode authentication, and printable boarding pass stub.

---

## The 5 Pinned Chapters

1. **Chapter I: Dawn (05:42 AM — Monaco Harbor)**  
   - Full-screen scrubbed video (`/videos/dawn.mp4`) with smooth 1.0 to 1.08 zoom.
   - Letter-by-letter gold reveal of the **THALASSA** title.
   - Background thin serif watermark (`AURORA`, 14vw, 8% opacity).
   - "Scroll to sail" animated gold compass indicator.

2. **Chapter II: Departure (09:15 AM — Waterline)**  
   - High-velocity waterline cruising clip (`/videos/departure.mp4`).
   - Animated naval specs counter triggered when centered:
     - **62m** Length Overall
     - **12** VIP Guests (6 Grand Suites)
     - **18 kts** Maximum Velocity
     - **4,500 nm** Transatlantic Range
     - **16** Dedicated Crew Members
   - Background thin serif watermark (`DEPARTURE`).

3. **Chapter III: Open Sea (02:20 PM — High Seas)**  
   - Aerial drone footage (`/videos/opensea.mp4`) blended with the interactive 3D superyacht canvas.
   - 360° scroll-controlled yaw rotation and camera dolly.
   - **Cutaway Mode**: Peels apart Sun Deck, Upper/Owner's Deck, Main Deck, and Hull.
   - Hotspots for Sun Deck Jacuzzi, Owner's Suite, Sky Lounge, Bridge, and Beach Club opening high-res video reels.
   - Background thin serif watermark (`EXPEDITION`).

4. **Chapter IV: Golden Hour (06:45 PM — Amber Coast)**  
   - Pinned horizontal gallery carousel with `80vw` cards.
   - Parallax inside masks, tiny gold uppercase captions, scale 0.9 to 1.0 at center.
   - Features sundeck champagne, master terrace, hydraulic beach club, and dusk salon.
   - Background thin serif watermark (`SERENITY`).

5. **Chapter V: Midnight (12:00 AM — Starlight Anchorage)**  
   - Starfield canvas with twinkling constellations.
   - Night anchorage footage (`/videos/night.mp4`) with cyan glowing underwater lights.
   - Vignette deepens to near-black.
   - The line *"The sea is waiting."* fades in above the **Request a Charter** action.
   - Interactive VIP Yacht Boarding Pass Requisition.
   - Background thin serif watermark (`ETERNITY`).

---

## Project Structure

```
thalassa/
├── public/
│   ├── videos/
│   │   ├── dawn.mp4            # Chapter 1: Dawn at marina
│   │   ├── departure.mp4       # Chapter 2: Leaving dock / waterline
│   │   ├── opensea.mp4         # Chapter 3: Drone open ocean orbit
│   │   ├── golden.mp4          # Chapter 4: Sunset coastal cruising
│   │   ├── night.mp4           # Chapter 5: Midnight anchor with underwater glow
│   │   ├── sundeck.mp4         # Room / Gallery: Champagne sundeck
│   │   ├── owners_suite.mp4    # Room / Gallery: Master stateroom suite
│   │   ├── beach_club.mp4      # Room / Gallery: Transom beach club
│   │   ├── sky_lounge.mp4      # Room / Gallery: Sky lounge & dining
│   │   └── bridge.mp4          # Room / Gallery: Wheelhouse navigation
│   └── models/
│       └── thalassa.glb        # Optional external 3D model (procedural fallback included)
├── src/
│   ├── app/
│   │   ├── globals.css         # Film grain, luxury vignette, custom easing, typography
│   │   ├── layout.tsx          # Cormorant Garamond & Inter Google Fonts, metadata
│   │   └── page.tsx            # Main page uniting Lenis, GSAP ScrollTrigger, and 5 chapters
│   └── components/
│       ├── AudioEngine.tsx     # Web Audio procedural soundscape (waves, wind, engine hum)
│       ├── BoardingPassModal.tsx # VIP luxury yacht boarding pass requisition form
│       ├── CustomCursor.tsx    # Gold dot & lagging ring with morphing cursor states
│       ├── NauticalCompass.tsx # Interactive compass navigation & heading dial
│       ├── OceanBackground.tsx # Three.js WebGL ocean water shader with cursor wake
│       ├── Preloader.tsx       # Rope-knot SVG drawing animation & asset progress
│       ├── SeaTimeIndicator.tsx # Vertical gold scroll progress line (05:42 AM to 12:00 AM)
│       ├── chapters/
│       │   ├── ChapterDawn.tsx
│       │   ├── ChapterDeparture.tsx
│       │   ├── ChapterOpenSea.tsx
│       │   ├── ChapterGoldenHour.tsx
│       │   └── ChapterMidnight.tsx
│       └── yacht3d/
│           ├── ProceduralYacht.tsx # 4-deck luxury yacht with PBR materials & cutaway
│           └── YachtCanvas.tsx     # React Three Fiber canvas, lights & room modals
└── package.json
```

---

## How to Swap in Your Own Videos

The project includes all footage extracted from your archive already mapped into `/public/videos/`.

To substitute with your own video files, simply replace the files in `public/videos/`:

1. **Chapter Videos**:
   - `public/videos/dawn.mp4`: 1080p or 4K H.264/MP4 dawn/harbor footage.
   - `public/videos/departure.mp4`: 1080p/4K waterline, bow wake, or departure footage.
   - `public/videos/opensea.mp4`: 1080p/4K ocean cruising or drone footage.
   - `public/videos/golden.mp4`: 1080p/4K warm sunset or golden hour coastal footage.
   - `public/videos/night.mp4`: 1080p/4K nocturnal superyacht footage with illuminated underwater lights.

2. **Room / Gallery Feature Videos**:
   - `public/videos/sundeck.mp4`: Sundeck, jacuzzi, or lifestyle reel.
   - `public/videos/owners_suite.mp4`: Master stateroom or interior salon.
   - `public/videos/beach_club.mp4`: Transom sea terrace or water toys.
   - `public/videos/sky_lounge.mp4`: Al fresco dining or lounge.
   - `public/videos/bridge.mp4`: Integrated navigation wheelhouse.

---

## How to Swap in Your Own 3D Model (`thalassa.glb`)

1. Export your 3D superyacht model as a binary GLTF (`.glb`) file.
2. Place the file at:
   ```
   public/models/thalassa.glb
   ```
3. For the **Cutaway Deck Separation**, name your mesh groups in Blender or Maya:
   - `Hull` (Bottom displacement hull and swim platform)
   - `MainDeck` (Main salon and aft deck)
   - `UpperDeck` (Owner's stateroom and bridge)
   - `SunDeck` (Top observation deck and arch)

> **Note**: Even without an external GLB, THALASSA features a built-in handcrafted procedural 62-meter superyacht built directly in Three.js with metallic hull paint, teak decking, tinted salon glass, chrome railings, and real-time vertical deck cutaway animation.

---

## Local Development & Production Build

```bash
# 1. Install dependencies
npm install --legacy-peer-deps

# 2. Run local development server
npm run dev

# 3. Build optimized production bundle
npm run build

# 4. Start production server
npm run start
```

---

## Deploy to Vercel

This repository is optimized for one-click deployment on [Vercel](https://vercel.com):

1. Push this repository to GitHub or GitLab.
2. In Vercel, click **Add New Project** and select the repository.
3. Keep default settings (Framework Preset: **Next.js**).
4. Click **Deploy**.
