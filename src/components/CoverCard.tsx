"use client";

import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { WashiTape, CoffeeStain, PressedFlower, DoodleHeartFilled, TinyStar } from "./Decorations";

if (typeof window !== "undefined") gsap.registerPlugin(ScrollTrigger);

const FLOWER_SRC = "https://lh3.googleusercontent.com/aida-public/AB6AXuC4tFMDvJHDNYM_PxHE72pvew7CSCOTga0PhonJpGedeFiOpXdNlwdKmlK-A1JEOZ4Kk4afA4eH7eVLQqicAsbU0Svp8oSFXW3ALAGeMSvwC8Ad16sdwE7E3lYsXqgHLMECHtVyjzmsjF-qtGWYPS5npiOeshho9Tic6aDh1cVugK2Yjyz5nNzaSiEMlor4YY4fGEkO_qtfzf7jLobd4wvtKSpDlWY0FPfq6rZZNyEFcXT3Sz-ad5wX";

export default function CoverCard() {
  const sectionRef  = useRef<HTMLDivElement>(null);
  const namesRef    = useRef<HTMLDivElement>(null);
  const frameRef    = useRef<HTMLDivElement>(null);
  const tape1Ref    = useRef<HTMLDivElement>(null);
  const flowerRef   = useRef<HTMLDivElement>(null);
  const coffeeRef   = useRef<HTMLDivElement>(null);
  const dateRef     = useRef<HTMLDivElement>(null);
  const dividerRef  = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Top gold divider draws in
      gsap.fromTo(dividerRef.current,
        { scaleX: 0, transformOrigin: "center" },
        {
          scaleX: 1,
          duration: 1.4,
          ease: "power2.out",
          scrollTrigger: { trigger: dividerRef.current, start: "top 88%", once: true },
        }
      );

      // Names sweep in
      gsap.fromTo(namesRef.current,
        { clipPath: "inset(0 100% 0 0)", y: 8 },
        {
          clipPath: "inset(0 0% 0 0)", y: 0,
          duration: 1.4,
          ease: "power3.out",
          scrollTrigger: { trigger: namesRef.current, start: "top 85%", once: true },
        }
      );

      // Ornamental frame drops + settles
      gsap.fromTo(frameRef.current,
        { y: -50, rotate: -2, opacity: 0 },
        {
          y: 0, rotate: -1.5, opacity: 1,
          duration: 1.2,
          ease: "bounce.out",
          scrollTrigger: { trigger: frameRef.current, start: "top 75%", once: true },
        }
      );

      // Tape unrolls
      gsap.fromTo(tape1Ref.current,
        { scaleX: 0, transformOrigin: "left center" },
        {
          scaleX: 1,
          duration: 0.5,
          ease: "power2.inOut",
          scrollTrigger: { trigger: frameRef.current, start: "top 75%", once: true },
        }
      );

      // Flower blooms
      gsap.fromTo(flowerRef.current,
        { scale: 0.3, rotate: 20 },
        {
          scale: 1, rotate: -5,
          duration: 1.2,
          ease: "elastic.out(1, 0.4)",
          scrollTrigger: { trigger: flowerRef.current, start: "top 80%", once: true },
        }
      );

      // Coffee stain seeps slowly
      gsap.fromTo(coffeeRef.current,
        { opacity: 0 },
        {
          opacity: 0.6,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 70%",
            end: "bottom -50%",
            scrub: 2,
          },
        }
      );

      // Date wipe
      gsap.fromTo(dateRef.current,
        { clipPath: "inset(0 100% 0 0)" },
        {
          clipPath: "inset(0 0% 0 0)",
          duration: 1.0,
          ease: "power2.out",
          scrollTrigger: { trigger: dateRef.current, start: "top 82%", once: true },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative w-full px-5 pt-6 pb-8 flex flex-col items-center"
      style={{ overflow: "clip" }}
    >
      {/* ── Coffee stain ── */}
      <div ref={coffeeRef} className="absolute top-8 -left-4 opacity-0 pointer-events-none">
        <CoffeeStain style={{ width: 120, height: 120 }} />
      </div>

      {/* ── Tiny handwritten note top-left personality ── */}
      <div className="absolute top-5 left-5 flex items-center gap-1 select-none pointer-events-none" style={{ transform: "rotate(-3deg)" }}>
        <span className="text-[14px] text-[#b63b3b]" style={{ fontFamily: "var(--font-caveat)" }}>
          finally
        </span>
        <DoodleHeartFilled style={{ width: 13, height: 13 }} />
      </div>

      {/* ── Top gold ornamental divider ── */}
      <div ref={dividerRef} className="w-full flex items-center gap-2 mb-5 mt-2" style={{ transform: "scaleX(0)" }}>
        <div style={{ flex: 1, height: 1, background: "linear-gradient(to right, transparent, rgba(184,152,91,0.5))" }} />
        <span style={{ fontFamily: "var(--font-allura)", fontSize: 20, color: "#b8985b", lineHeight: 1 }}>✦</span>
        <div style={{ flex: 1, height: 1, background: "linear-gradient(to left, transparent, rgba(184,152,91,0.5))" }} />
      </div>

      {/* ── Couple names — the emotional center ── */}
      <div ref={namesRef} className="text-center w-full mb-5">
        <p style={{
          fontFamily: "var(--font-inter)",
          fontSize: 8,
          letterSpacing: "0.3em",
          textTransform: "uppercase",
          color: "rgba(83,67,66,0.4)",
          marginBottom: 8,
        }}>
          Together with their families
        </p>

        <h1 style={{
          fontFamily: "var(--font-allura)",
          fontSize: "clamp(68px, 19vw, 88px)",
          lineHeight: 0.88,
          color: "#534342",
          letterSpacing: "0.01em",
        }}>
          Mary Nikhitha
        </h1>

        {/* Ornamental "and" separator */}
        <div className="flex items-center justify-center gap-3 my-3">
          <div style={{ height: 1, width: 36, background: "linear-gradient(to right, transparent, rgba(184,152,91,0.6))" }} />
          <span style={{
            fontFamily: "var(--font-cormorant)",
            fontSize: 15,
            fontWeight: 300,
            fontStyle: "italic",
            color: "rgba(83,67,66,0.45)",
            letterSpacing: "0.12em",
          }}>
            &amp;
          </span>
          <div style={{ height: 1, width: 36, background: "linear-gradient(to left, transparent, rgba(184,152,91,0.6))" }} />
        </div>

        <h1 style={{
          fontFamily: "var(--font-allura)",
          fontSize: "clamp(68px, 19vw, 88px)",
          lineHeight: 0.88,
          color: "#534342",
          letterSpacing: "0.01em",
        }}>
          Jerin Babu
        </h1>
      </div>

      {/* ── Ornamental monogram frame (replaces blank photo) ── */}
      <div
        ref={frameRef}
        className="relative w-[88%] max-w-[290px] mb-5 opacity-0"
        style={{ zIndex: 10 }}
      >
        {/* Tape at top */}
        <div ref={tape1Ref} className="tape absolute -top-3 left-1/2 -translate-x-1/2 z-20" style={{ width: 64 }} />

        {/* Frame itself */}
        <div
          style={{
            background: "linear-gradient(160deg, #fdfcf8 0%, #f5f0e6 100%)",
            padding: "28px 20px 24px",
            boxShadow: "0 8px 32px rgba(122,92,71,0.14), 0 2px 8px rgba(122,92,71,0.08)",
            border: "1px solid rgba(210,198,182,0.7)",
            position: "relative",
          }}
        >
          {/* Gold corner ornaments */}
          <div className="absolute top-3 left-3 w-5 h-5 border-t-2 border-l-2" style={{ borderColor: "rgba(184,152,91,0.6)" }} />
          <div className="absolute top-3 right-3 w-5 h-5 border-t-2 border-r-2" style={{ borderColor: "rgba(184,152,91,0.6)" }} />
          <div className="absolute bottom-3 left-3 w-5 h-5 border-b-2 border-l-2" style={{ borderColor: "rgba(184,152,91,0.6)" }} />
          <div className="absolute bottom-3 right-3 w-5 h-5 border-b-2 border-r-2" style={{ borderColor: "rgba(184,152,91,0.6)" }} />

          {/* Inner border */}
          <div style={{ border: "1px solid rgba(184,152,91,0.25)", padding: "20px 16px", textAlign: "center" }}>
            {/* Botanical SVG top */}
            <svg viewBox="0 0 200 28" width="100%" height="28" style={{ opacity: 0.5, marginBottom: 12 }}>
              <path d="M100,14 Q80,2 60,8 T20,10" stroke="#8a8a5c" strokeWidth="1" fill="none" strokeLinecap="round" />
              <path d="M100,14 Q120,2 140,8 T180,10" stroke="#8a8a5c" strokeWidth="1" fill="none" strokeLinecap="round" />
              <ellipse cx="60" cy="7" rx="5" ry="3" fill="#8a8a5c" transform="rotate(-20 60 7)" opacity="0.7" />
              <ellipse cx="140" cy="7" rx="5" ry="3" fill="#8a8a5c" transform="rotate(20 140 7)" opacity="0.7" />
              <ellipse cx="35" cy="10" rx="4" ry="2.5" fill="#8a8a5c" transform="rotate(-10 35 10)" opacity="0.5" />
              <ellipse cx="165" cy="10" rx="4" ry="2.5" fill="#8a8a5c" transform="rotate(10 165 10)" opacity="0.5" />
              <circle cx="100" cy="14" r="3" fill="#b8985b" opacity="0.7" />
            </svg>

            {/* Monogram */}
            <p style={{
              fontFamily: "var(--font-allura)",
              fontSize: 62,
              lineHeight: 1,
              color: "#b8985b",
              textShadow: "0 2px 8px rgba(184,152,91,0.2)",
              letterSpacing: "0.04em",
              whiteSpace: "nowrap",
            }}>
              N &amp; J
            </p>

            {/* Gold rule */}
            <div style={{ height: 1, background: "linear-gradient(to right, transparent, rgba(184,152,91,0.5) 30%, rgba(184,152,91,0.5) 70%, transparent)", margin: "10px 0 10px" }} />

            {/* Tagline */}
            <p style={{
              fontFamily: "var(--font-cormorant)",
              fontSize: 14,
              fontWeight: 300,
              fontStyle: "italic",
              color: "rgba(83,67,66,0.55)",
              letterSpacing: "0.06em",
            }}>
              request the honour of your presence
            </p>

            {/* Botanical SVG bottom (mirrored) */}
            <svg viewBox="0 0 200 28" width="100%" height="28" style={{ opacity: 0.5, marginTop: 12, transform: "scaleY(-1)" }}>
              <path d="M100,14 Q80,2 60,8 T20,10" stroke="#8a8a5c" strokeWidth="1" fill="none" strokeLinecap="round" />
              <path d="M100,14 Q120,2 140,8 T180,10" stroke="#8a8a5c" strokeWidth="1" fill="none" strokeLinecap="round" />
              <ellipse cx="60" cy="7" rx="5" ry="3" fill="#8a8a5c" transform="rotate(-20 60 7)" opacity="0.7" />
              <ellipse cx="140" cy="7" rx="5" ry="3" fill="#8a8a5c" transform="rotate(20 140 7)" opacity="0.7" />
              <circle cx="100" cy="14" r="3" fill="#b8985b" opacity="0.7" />
            </svg>
          </div>
        </div>
      </div>

      {/* ── Pressed Flower ── */}
      <div ref={flowerRef} className="absolute bottom-32 right-3 z-20">
        <WashiTape width="38px" angle={-10} className="absolute -top-3 left-1/2 -translate-x-1/2 z-30" />
        <PressedFlower src={FLOWER_SRC} size="50px" angle={-4} alt="pressed flower" />
      </div>

      {/* ── Date block ── */}
      <div ref={dateRef} className="text-center w-full mt-1">
        <p style={{
          fontFamily: "var(--font-inter)",
          fontSize: 8,
          letterSpacing: "0.28em",
          textTransform: "uppercase",
          color: "rgba(83,67,66,0.4)",
          marginBottom: 4,
        }}>
          Save the Date
        </p>
        <p style={{
          fontFamily: "var(--font-cormorant)",
          fontSize: 34,
          fontWeight: 300,
          color: "#534342",
          letterSpacing: "0.02em",
          lineHeight: 1.1,
        }}>
          August 22, 2026
        </p>
        <div className="flex items-center justify-center gap-2 mt-2">
          <div style={{ height: 1, width: 28, background: "rgba(184,152,91,0.4)" }} />
          <span style={{ fontFamily: "var(--font-cormorant)", fontSize: 14, fontStyle: "italic", fontWeight: 300, color: "rgba(83,67,66,0.5)" }}>
            Saturday · Eleven in the morning
          </span>
          <div style={{ height: 1, width: 28, background: "rgba(184,152,91,0.4)" }} />
        </div>
      </div>

      {/* ── Bottom ornament ── */}
      <div className="w-full flex items-center gap-2 mt-5">
        <div style={{ flex: 1, height: 1, background: "linear-gradient(to right, transparent, rgba(184,152,91,0.35))" }} />
        <TinyStar />
        <div style={{ flex: 1, height: 1, background: "linear-gradient(to left, transparent, rgba(184,152,91,0.35))" }} />
      </div>
    </section>
  );
}
