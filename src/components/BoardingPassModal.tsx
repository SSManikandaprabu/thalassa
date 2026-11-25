"use client";

import React, { useState } from "react";
import { X, Check, ShieldCheck, Printer, Anchor, Sparkles } from "lucide-react";

interface BoardingPassModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function BoardingPassModal({ isOpen, onClose }: BoardingPassModalProps) {
  const [port, setPort] = useState("Monaco (Port Hercule)");
  const [guests, setGuests] = useState("8 Guests");
  const [duration, setDuration] = useState("7 Nights");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [conciergeServices, setConciergeServices] = useState<string[]>([
    "Helicopter Transfer",
  ]);
  const [isSubmitted, setIsSubmitted] = useState(false);

  if (!isOpen) return null;

  const toggleService = (srv: string) => {
    setConciergeServices((prev) =>
      prev.includes(srv) ? prev.filter((s) => s !== srv) : [...prev, srv]
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
  };

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-[#030712]/90 backdrop-blur-2xl p-4 sm:p-6 overflow-y-auto animate-[fadeIn_0.3s_ease-out]">
      <div className="relative w-full max-w-4xl my-auto rounded-3xl border border-[#C5A880]/50 bg-[#040914] shadow-[0_0_100px_rgba(197,168,128,0.25)] overflow-hidden">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-6 right-6 z-20 p-2.5 rounded-full border border-[#C5A880]/40 text-[#E5C483] hover:text-white hover:border-white transition-colors bg-[#040914]/80 backdrop-blur-sm"
          aria-label="Close Boarding Pass"
        >
          <X size={20} />
        </button>

        {!isSubmitted ? (
          <div>
            {/* Boarding Pass Header Strip */}
            <div className="relative px-8 py-6 bg-gradient-to-r from-[#070E1B] via-[#0E1A33] to-[#070E1B] border-b border-[#C5A880]/30 flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full border border-[#C5A880] flex items-center justify-center text-[#E5C483]">
                  <Anchor size={18} />
                </div>
                <div>
                  <span className="font-display text-2xl tracking-[0.3em] text-[#FAF7F2] font-light">
                    THALASSA
                  </span>
                  <span className="text-[9px] font-mono tracking-[0.3em] text-[#C5A880] uppercase block">
                    VIP CHARTER BOARDING PASS
                  </span>
                </div>
              </div>

              <div className="text-right">
                <span className="text-[10px] uppercase font-mono tracking-widest text-[#A39D93] block">
                  Serial No.
                </span>
                <span className="font-mono text-sm tracking-wider text-[#E5C483]">
                  THL-62M-8894-VIP
                </span>
              </div>
            </div>

            {/* Boarding Pass Form */}
            <form onSubmit={handleSubmit} className="p-8 sm:p-10 space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Port Selection */}
                <div>
                  <label className="block text-[10px] uppercase font-mono tracking-widest text-[#C5A880] mb-2">
                    Port of Embarkation
                  </label>
                  <select
                    value={port}
                    onChange={(e) => setPort(e.target.value)}
                    className="w-full bg-[#070E1B] border border-[#C5A880]/30 rounded-xl px-4 py-3 text-sm text-[#FAF7F2] focus:outline-none focus:border-[#E5C483] transition-colors"
                  >
                    <option value="Monaco (Port Hercule)">Monaco (Port Hercule)</option>
                    <option value="Saint-Tropez (Vieux Port)">Saint-Tropez (Vieux Port)</option>
                    <option value="Portofino (Marina di Portofino)">Portofino (Italian Riviera)</option>
                    <option value="Amalfi & Capri (Marina Grande)">Amalfi & Capri</option>
                    <option value="Mykonos (Nammos Bay)">Mykonos & Cyclades</option>
                  </select>
                </div>

                {/* Duration */}
                <div>
                  <label className="block text-[10px] uppercase font-mono tracking-widest text-[#C5A880] mb-2">
                    Voyage Duration
                  </label>
                  <select
                    value={duration}
                    onChange={(e) => setDuration(e.target.value)}
                    className="w-full bg-[#070E1B] border border-[#C5A880]/30 rounded-xl px-4 py-3 text-sm text-[#FAF7F2] focus:outline-none focus:border-[#E5C483] transition-colors"
                  >
                    <option value="4 Nights (Riviera Escape)">4 Nights (Riviera Escape)</option>
                    <option value="7 Nights (Grand Expedition)">7 Nights (Grand Expedition)</option>
                    <option value="14 Nights (Mediterranean Odyssey)">14 Nights (Mediterranean Odyssey)</option>
                    <option value="Custom Duration">Custom Bespoke Itinerary</option>
                  </select>
                </div>

                {/* Guest Count */}
                <div>
                  <label className="block text-[10px] uppercase font-mono tracking-widest text-[#C5A880] mb-2">
                    Stateroom Capacity
                  </label>
                  <select
                    value={guests}
                    onChange={(e) => setGuests(e.target.value)}
                    className="w-full bg-[#070E1B] border border-[#C5A880]/30 rounded-xl px-4 py-3 text-sm text-[#FAF7F2] focus:outline-none focus:border-[#E5C483] transition-colors"
                  >
                    <option value="2 Guests (Private Master Suite)">2 Guests (Private Master)</option>
                    <option value="4 Guests (2 Staterooms)">4 Guests (2 Staterooms)</option>
                    <option value="8 Guests (4 Staterooms)">8 Guests (4 Staterooms)</option>
                    <option value="12 Guests (Full Yacht Charter)">12 Guests (Full 6 Staterooms)</option>
                  </select>
                </div>
              </div>

              {/* Bespoke Amenities */}
              <div>
                <label className="block text-[10px] uppercase font-mono tracking-widest text-[#C5A880] mb-3">
                  Concierge Requisitions
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                  {[
                    "Helicopter Transfer",
                    "Master Sommelier & Cellar",
                    "Deep-sea Submersible",
                    "Private Michelin Chef",
                  ].map((service) => {
                    const active = conciergeServices.includes(service);
                    return (
                      <button
                        type="button"
                        key={service}
                        onClick={() => toggleService(service)}
                        className={`flex items-center gap-2 p-3 rounded-xl border text-left transition-all duration-300 text-xs ${
                          active
                            ? "bg-[#C5A880]/20 border-[#E5C483] text-[#FAF7F2]"
                            : "bg-[#070E1B]/60 border-[#C5A880]/20 text-[#A39D93] hover:border-[#C5A880]/50"
                        }`}
                      >
                        <span
                          className={`w-4 h-4 rounded-full flex items-center justify-center text-[10px] border ${
                            active
                              ? "bg-[#E5C483] text-[#040914] border-[#E5C483]"
                              : "border-[#C5A880]/40"
                          }`}
                        >
                          {active && <Check size={10} strokeWidth={3} />}
                        </span>
                        <span>{service}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Guest Information */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-2">
                <div>
                  <label className="block text-[10px] uppercase font-mono tracking-widest text-[#C5A880] mb-2">
                    Primary Guest Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Lord Alexander Thorne"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full bg-[#070E1B] border border-[#C5A880]/30 rounded-xl px-4 py-3 text-sm text-[#FAF7F2] placeholder-[#A39D93]/40 focus:outline-none focus:border-[#E5C483]"
                  />
                </div>

                <div>
                  <label className="block text-[10px] uppercase font-mono tracking-widest text-[#C5A880] mb-2">
                    Private Office / Email *
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="concierge@thorne-family.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-[#070E1B] border border-[#C5A880]/30 rounded-xl px-4 py-3 text-sm text-[#FAF7F2] placeholder-[#A39D93]/40 focus:outline-none focus:border-[#E5C483]"
                  />
                </div>

                <div>
                  <label className="block text-[10px] uppercase font-mono tracking-widest text-[#C5A880] mb-2">
                    Direct Contact / Telephone
                  </label>
                  <input
                    type="tel"
                    placeholder="+377 98 06 20 00"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full bg-[#070E1B] border border-[#C5A880]/30 rounded-xl px-4 py-3 text-sm text-[#FAF7F2] placeholder-[#A39D93]/40 focus:outline-none focus:border-[#E5C483]"
                  />
                </div>
              </div>

              {/* Barcode & Submit Button */}
              <div className="pt-6 border-t border-[#C5A880]/20 flex flex-wrap items-center justify-between gap-6">
                {/* Visual Boarding Pass Barcode */}
                <div className="flex items-center gap-4">
                  <div className="h-10 flex items-center gap-[2px] opacity-70">
                    {[3, 1, 4, 1, 2, 4, 1, 3, 2, 1, 4, 2, 1, 3, 4, 2, 1, 3, 2, 4, 1, 3].map(
                      (w, i) => (
                        <span
                          key={i}
                          className="bg-[#C5A880] h-full"
                          style={{ width: `${w}px` }}
                        />
                      )
                    )}
                  </div>
                  <span className="text-[10px] font-mono tracking-widest text-[#C5A880]/60 hidden sm:inline">
                    ELECTRONIC PASS VALIDATION
                  </span>
                </div>

                <button
                  type="submit"
                  data-cursor="Submit Pass"
                  className="px-8 py-3.5 rounded-full bg-gradient-to-r from-[#C5A880] to-[#E5C483] text-[#040914] text-xs font-sans font-semibold tracking-[0.25em] uppercase hover:shadow-[0_0_30px_rgba(229,196,131,0.6)] hover:scale-[1.02] active:scale-95 transition-all duration-300"
                >
                  Issue Boarding Pass
                </button>
              </div>
            </form>
          </div>
        ) : (
          /* Confirmation Screen / Issued Pass */
          <div className="p-8 sm:p-12 text-center">
            <div className="w-16 h-16 rounded-full bg-[#C5A880]/20 border border-[#E5C483] flex items-center justify-center text-[#E5C483] mx-auto mb-6 shadow-[0_0_30px_rgba(229,196,131,0.4)]">
              <Sparkles size={28} />
            </div>

            <span className="text-[10px] font-mono uppercase tracking-[0.4em] text-[#C5A880]">
              Pass Issued & Confirmed
            </span>
            <h3 className="font-display text-3xl sm:text-4xl text-[#FAF7F2] tracking-wider mt-2">
              WELCOME ABOARD THALASSA
            </h3>
            <p className="text-sm text-[#A39D93] max-w-lg mx-auto mt-3 font-body">
              Your confidential charter requisition has been delivered to the Captain and Head of Concierge. A bespoke voyage dossier will be dispatched to {email || "your office"}.
            </p>

            {/* Rendered Boarding Pass Stub */}
            <div className="my-8 max-w-md mx-auto p-6 rounded-2xl border border-[#C5A880]/40 bg-[#070E1B] text-left">
              <div className="flex justify-between items-center pb-4 border-b border-[#C5A880]/20">
                <span className="text-xs font-mono text-[#E5C483] tracking-widest">
                  PASS: THL-62M-8894
                </span>
                <span className="text-[10px] font-mono text-[#C5A880] uppercase">
                  FIRST CLASS / VIP
                </span>
              </div>
              <div className="py-4 space-y-2 text-xs">
                <div className="flex justify-between">
                  <span className="text-[#A39D93]">Guest of Honor:</span>
                  <span className="text-[#FAF7F2] font-medium">{name || "Distinguished Guest"}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#A39D93]">Port of Embarkation:</span>
                  <span className="text-[#FAF7F2] font-medium">{port}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#A39D93]">Party:</span>
                  <span className="text-[#FAF7F2] font-medium">{guests} • {duration}</span>
                </div>
              </div>
              <div className="pt-3 border-t border-[#C5A880]/20 flex items-center justify-between text-[10px] text-[#C5A880]">
                <span className="flex items-center gap-1">
                  <ShieldCheck size={14} /> Verified by Monaco Port Authority
                </span>
                <span className="font-mono">STATUS: CONFIRMED</span>
              </div>
            </div>

            <div className="flex items-center justify-center gap-4">
              <button
                onClick={() => window.print()}
                className="flex items-center gap-2 px-6 py-2.5 rounded-full border border-[#C5A880]/40 text-xs uppercase tracking-widest text-[#FAF7F2] hover:border-[#E5C483] transition-colors"
              >
                <Printer size={14} /> Print Pass
              </button>
              <button
                onClick={onClose}
                className="px-6 py-2.5 rounded-full bg-[#E5C483] text-[#040914] text-xs font-semibold uppercase tracking-widest hover:bg-white transition-colors"
              >
                Return to Voyage
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
