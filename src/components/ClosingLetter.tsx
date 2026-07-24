"use client";

import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { VintageStamp, MarginNote, TinyHeart, WashiTape } from "./Decorations";

if (typeof window !== "undefined") gsap.registerPlugin(ScrollTrigger);

export default function ClosingLetter() {
  const sectionRef    = useRef<HTMLDivElement>(null);
  const monogramRef   = useRef<HTMLDivElement>(null);
  const thankRef      = useRef<HTMLHeadingElement>(null);
  const closingRef    = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Monogram blooms in
      gsap.fromTo(monogramRef.current,
        { scale: 0.85, opacity: 0, filter: "brightness(1.4)" },
        {
          scale: 1,
          opacity: 1,
          filter: "brightness(1.0)",
          duration: 1.8,
          ease: "power2.out",
          scrollTrigger: { trigger: monogramRef.current, start: "top 78%", once: true },
        }
      );

      // Thank You sweeps up from fold
      gsap.fromTo(thankRef.current,
        { clipPath: "inset(100% 0 0 0)", y: 20 },
        {
          clipPath: "inset(0% 0 0 0)", y: 0,
          duration: 1.1,
          ease: "power3.out",
          scrollTrigger: { trigger: thankRef.current, start: "top 82%", once: true },
        }
      );

      // Closing text wipe
      gsap.fromTo(closingRef.current,
        { clipPath: "inset(0 100% 0 0)" },
        {
          clipPath: "inset(0 0% 0 0)",
          duration: 1.3,
          ease: "power2.out",
          scrollTrigger: { trigger: closingRef.current, start: "top 85%", once: true },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative w-full px-6 pt-8 pb-4 deckled-bottom overflow-visible flex flex-col items-center"
    >
      {/* ── Ornamental Monogram (replaces grey portrait) ── */}
      <div
        ref={monogramRef}
        className="relative mx-auto mb-8 w-[88%] max-w-[300px] opacity-0"
        style={{ zIndex: 10 }}
      >
        {/* Tape corners */}
        <WashiTape width="44px" angle={-12} variant="rose" className="absolute -top-3 -left-2 z-20" />
        <WashiTape width="44px" angle={12}  variant="rose" className="absolute -top-3 -right-2 z-20" />

        {/* Ornamental card */}
        <div style={{
          background: "linear-gradient(145deg, #fdfcf8 0%, #f8f3ea 60%, #f2ede2 100%)",
          padding: "32px 24px 28px",
          boxShadow: "0 12px 40px rgba(122,92,71,0.16), 0 3px 10px rgba(122,92,71,0.08)",
          border: "1px solid rgba(210,198,182,0.7)",
          position: "relative",
          textAlign: "center",
        }}>
          {/* Gold corner marks */}
          <div className="absolute top-4 left-4 w-6 h-6 border-t-2 border-l-2" style={{ borderColor: "rgba(184,152,91,0.55)" }} />
          <div className="absolute top-4 right-4 w-6 h-6 border-t-2 border-r-2" style={{ borderColor: "rgba(184,152,91,0.55)" }} />
          <div className="absolute bottom-4 left-4 w-6 h-6 border-b-2 border-l-2" style={{ borderColor: "rgba(184,152,91,0.55)" }} />
          <div className="absolute bottom-4 right-4 w-6 h-6 border-b-2 border-r-2" style={{ borderColor: "rgba(184,152,91,0.55)" }} />

          {/* Inner border */}
          <div style={{ border: "1px solid rgba(184,152,91,0.2)", padding: "20px 12px" }}>
            {/* Top botanical flourish */}
            <svg viewBox="0 0 200 32" width="100%" height="32" style={{ opacity: 0.55, marginBottom: 10 }}>
              <path d="M100,16 C85,4 65,8 45,12 T10,12" stroke="#8a8a5c" strokeWidth="1.2" fill="none" strokeLinecap="round" />
              <path d="M100,16 C115,4 135,8 155,12 T190,12" stroke="#8a8a5c" strokeWidth="1.2" fill="none" strokeLinecap="round" />
              <ellipse cx="50" cy="10" rx="6" ry="3" fill="#8a8a5c" transform="rotate(-15 50 10)" opacity="0.65" />
              <ellipse cx="150" cy="10" rx="6" ry="3" fill="#8a8a5c" transform="rotate(15 150 10)" opacity="0.65" />
              <ellipse cx="28" cy="12" rx="4" ry="2" fill="#8a8a5c" transform="rotate(-5 28 12)" opacity="0.4" />
              <ellipse cx="172" cy="12" rx="4" ry="2" fill="#8a8a5c" transform="rotate(5 172 12)" opacity="0.4" />
              <circle cx="100" cy="16" r="3.5" fill="#b8985b" opacity="0.8" />
            </svg>

            {/* Couple initials */}
            <p style={{
              fontFamily: "var(--font-allura)",
              fontSize: 62,
              lineHeight: 0.95,
              color: "#b8985b",
              textShadow: "0 2px 12px rgba(184,152,91,0.25)",
              letterSpacing: "0.04em",
              whiteSpace: "nowrap",
            }}>
              N &amp; J
            </p>

            {/* Gold rule */}
            <div style={{
              height: 1,
              background: "linear-gradient(to right, transparent, rgba(184,152,91,0.55) 25%, rgba(184,152,91,0.55) 75%, transparent)",
              margin: "14px 0",
            }} />

            {/* Date line */}
            <p style={{
              fontFamily: "var(--font-inter)",
              fontSize: 8,
              letterSpacing: "0.28em",
              textTransform: "uppercase",
              color: "rgba(83,67,66,0.45)",
              marginBottom: 4,
            }}>
              August 22, 2026 · Kochi
            </p>

            {/* Tagline */}
            <p style={{
              fontFamily: "var(--font-cormorant)",
              fontSize: 15,
              fontWeight: 300,
              fontStyle: "italic",
              color: "rgba(83,67,66,0.5)",
              letterSpacing: "0.04em",
              lineHeight: 1.5,
            }}>
              "What God has joined together,<br/>let no one separate."
            </p>

            {/* Bottom flourish mirrored */}
            <svg viewBox="0 0 200 32" width="100%" height="32" style={{ opacity: 0.55, marginTop: 10, transform: "scaleY(-1)" }}>
              <path d="M100,16 C85,4 65,8 45,12 T10,12" stroke="#8a8a5c" strokeWidth="1.2" fill="none" strokeLinecap="round" />
              <path d="M100,16 C115,4 135,8 155,12 T190,12" stroke="#8a8a5c" strokeWidth="1.2" fill="none" strokeLinecap="round" />
              <ellipse cx="50" cy="10" rx="6" ry="3" fill="#8a8a5c" transform="rotate(-15 50 10)" opacity="0.65" />
              <ellipse cx="150" cy="10" rx="6" ry="3" fill="#8a8a5c" transform="rotate(15 150 10)" opacity="0.65" />
              <circle cx="100" cy="16" r="3.5" fill="#b8985b" opacity="0.8" />
            </svg>
          </div>
        </div>
      </div>

      {/* ── Thank You Title ── */}
      <h2
        ref={thankRef}
        style={{
          fontFamily: "var(--font-allura)",
          fontSize: "clamp(70px, 18vw, 90px)",
          lineHeight: 0.92,
          color: "#534342",
          textAlign: "center",
          letterSpacing: "0.01em",
          clipPath: "inset(100% 0 0 0)",
          marginBottom: 8,
        }}
      >
        Thank You
      </h2>

      {/* ── Handwritten Closing Note ── */}
      <div ref={closingRef} className="text-center mt-2 mb-8 w-full flex flex-col items-center">
        <p style={{
          fontFamily: "var(--font-caveat)",
          fontSize: 17,
          color: "rgba(83,67,66,0.55)",
          transform: "rotate(-1deg)",
          marginBottom: 4,
          lineHeight: 1.5,
        }}>
          We are so excited to celebrate our day with you.
        </p>
        <p style={{
          fontFamily: "var(--font-caveat)",
          fontSize: 19,
          color: "#b63b3b",
          transform: "rotate(-1.5deg)",
          marginTop: 6,
        }}>
          with all our love, Nikhitha &amp; Jerin
        </p>

        {/* Bottom cluster */}
        <div className="relative mt-10 w-full flex justify-center gap-10 items-center">
          <VintageStamp style={{ width: 48, height: 58, transform: "rotate(-4deg)" }}>
            <div style={{
              width: "100%", height: "100%",
              background: "linear-gradient(135deg, #fbf7f0, #e8e3d8)",
              display: "flex", flexDirection: "column",
              alignItems: "center", justifyContent: "center", gap: 2,
            }}>
              <p style={{ fontFamily: "var(--font-allura)", fontSize: 15, color: "#7a5c47" }}>N+J</p>
              <p style={{ fontFamily: "var(--font-inter)", fontSize: 6, letterSpacing: "0.05em", color: "rgba(122,92,71,0.6)" }}>2026</p>
            </div>
          </VintageStamp>

          {/* Wax seal */}
          <div style={{
            width: 52, height: 52,
            background: "radial-gradient(circle at 38% 38%, #d43f3f, #8b2323 60%, #5a1414)",
            borderRadius: "50%",
            boxShadow: "0 5px 14px rgba(139,35,35,0.35), inset 0 2px 5px rgba(255,255,255,0.22)",
            display: "flex", alignItems: "center", justifyContent: "center",
            transform: "rotate(5deg)",
          }}>
            <span style={{ fontFamily: "var(--font-allura)", color: "rgba(255,255,255,0.92)", fontSize: 19 }}>N+J</span>
          </div>
        </div>
      </div>

      {/* Final margin detail */}
      <MarginNote angle={-1} className="text-center mb-16 mt-2" style={{ fontSize: 13, display: "block" }}>
        <TinyHeart /> we cannot wait to see you there <TinyHeart />
      </MarginNote>

      <div style={{ height: 48 }} />
    </section>
  );
}
