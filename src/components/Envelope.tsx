"use client";

import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") gsap.registerPlugin(ScrollTrigger);

export default function Envelope() {
  const sectionRef   = useRef<HTMLDivElement>(null);
  const envelopeRef  = useRef<HTMLDivElement>(null);
  const flapRef      = useRef<HTMLDivElement>(null);
  const sealRef      = useRef<HTMLDivElement>(null);
  const sealHalfLRef = useRef<HTMLDivElement>(null);
  const sealHalfRRef = useRef<HTMLDivElement>(null);
  const letterRef    = useRef<HTMLDivElement>(null);
  const hintRef      = useRef<HTMLParagraphElement>(null);
  const bgRef        = useRef<HTMLDivElement>(null);
  const churchCutoutRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "+=1050",
          scrub: 2,
          pin: true,
          anticipatePin: 1,
          pinSpacing: true,
        },
      });

      // ── 0. Fade hint ──
      tl.to(hintRef.current, { opacity: 0, y: -6, duration: 0.2, ease: "power1.in" });

      // ── 1. Seal glows ──
      tl.to(sealRef.current, {
        scale: 1.08,
        filter: "brightness(1.2) drop-shadow(0 0 10px rgba(200,50,50,0.7))",
        duration: 0.2, ease: "power2.inOut",
      });

      // ── 2. Seal halves crack apart ──
      tl.to(sealHalfLRef.current, { x: -42, y: -8, rotate: -28, opacity: 0, duration: 0.55, ease: "power3.out" }, ">");
      tl.to(sealHalfRRef.current, { x: 42,  y: -8, rotate:  28, opacity: 0, duration: 0.55, ease: "power3.out" }, "<");

      // ── 3. Flap swings fully open ──
      tl.to(flapRef.current, { rotateX: -180, duration: 1.4, ease: "power2.inOut" }, ">");
      tl.set(flapRef.current, { zIndex: 2 });
      tl.set(letterRef.current, { zIndex: 25 });

      // ── 4. Letter rises fully from inside like a popup ──
      tl.fromTo(letterRef.current, {
        y: 0,
        scale: 0.8,
        rotate: 0,
        opacity: 0,
      }, {
        y: -250,
        scale: 1.08,
        rotate: -1.5,
        opacity: 1,
        duration: 1.6,
        ease: "back.out(1.2)",
      }, ">");

      // Add a dedicated pause/hold so the open letter stands clearly in view
      tl.to({}, { duration: 0.8 });

      // ── 5. Only now reveal the rest: Church cutout fades in and envelope fades out ──
      tl.fromTo(churchCutoutRef.current, {
        opacity: 0,
        y: 60,
      }, {
        opacity: 0.95,
        y: 0,
        duration: 1.4,
        ease: "power2.out",
      }, ">");

      tl.to(envelopeRef.current, {
        scale: 0.88,
        opacity: 0,
        y: 28,
        duration: 1.1,
        ease: "power1.inOut",
      }, "<");

    }, sectionRef);

    return () => ctx.revert();
  }, []);


  return (
    <section
      ref={sectionRef}
      style={{
        position: "relative",
        width: "100%",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 10,
      }}
    >
      {/* Solid opaque background — covers anything scrolling up behind while pinned */}
      <div
        ref={bgRef}
        style={{
          position: "absolute",
          inset: 0,
          background: "#faf8f2",
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.82' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.035'/%3E%3C/svg%3E")`,
          zIndex: 0,
          pointerEvents: "none",
        }}
      />

      {/* Soft vignette for depth */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: "radial-gradient(ellipse 80% 70% at 50% 50%, transparent 40%, rgba(195,185,168,0.16) 100%)",
          zIndex: 1,
          pointerEvents: "none",
        }}
      />

      {/* ── Envelope + Letter group ── */}
      <div
        ref={envelopeRef}
        style={{
          position: "relative",
          zIndex: 3,
          width: 320,
          perspective: "1400px",
          perspectiveOrigin: "50% 50%",
        }}
      >
        {/* Envelope body */}
        <div style={{ position: "relative", width: 320, height: 220, overflow: "visible" }}>

          {/* Back wall */}
          <div style={{
            position: "absolute", inset: 0, zIndex: 1,
            background: "linear-gradient(160deg, #ece8de 0%, #e0dace 100%)",
            boxShadow: "0 20px 50px rgba(83,67,66,0.22), 0 4px 14px rgba(83,67,66,0.12), inset 0 8px 22px rgba(0,0,0,0.07)",
          }}/>

          {/* ── Letter card (starts inside, rises out) ── */}
          <div
            ref={letterRef}
            style={{
              position: "absolute",
              left: 14, right: 14,
              bottom: 10,
              height: 195,
              background: "linear-gradient(170deg, #fdfcf8 0%, #f7f3ea 100%)",
              boxShadow: "0 6px 24px rgba(83,67,66,0.16), 0 1px 4px rgba(83,67,66,0.08)",
              border: "1px solid rgba(184,152,91,0.3)",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              gap: 7,
              zIndex: 5,
              opacity: 0,     // hidden until flap opens
              backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.03'/%3E%3C/svg%3E")`,
            }}
          >
            {/* Gold corners */}
            <div style={{ position:"absolute", top:10, left:10, width:14, height:14, borderTop:"1px solid rgba(184,152,91,0.55)", borderLeft:"1px solid rgba(184,152,91,0.55)" }}/>
            <div style={{ position:"absolute", top:10, right:10, width:14, height:14, borderTop:"1px solid rgba(184,152,91,0.55)", borderRight:"1px solid rgba(184,152,91,0.55)" }}/>
            <div style={{ position:"absolute", bottom:10, left:10, width:14, height:14, borderBottom:"1px solid rgba(184,152,91,0.55)", borderLeft:"1px solid rgba(184,152,91,0.55)" }}/>
            <div style={{ position:"absolute", bottom:10, right:10, width:14, height:14, borderBottom:"1px solid rgba(184,152,91,0.55)", borderRight:"1px solid rgba(184,152,91,0.55)" }}/>

            {/* Botanical SVG */}
            <svg viewBox="0 0 160 18" width="90" height="12" style={{ opacity:0.42 }}>
              <path d="M80,9 C66,3 50,5 36,8 T8,8" stroke="#8a8a5c" strokeWidth="1" fill="none" strokeLinecap="round"/>
              <path d="M80,9 C94,3 110,5 124,8 T152,8" stroke="#8a8a5c" strokeWidth="1" fill="none" strokeLinecap="round"/>
              <circle cx="80" cy="9" r="2.2" fill="#b8985b" opacity="0.8"/>
            </svg>

            {/* Monogram */}
            <p style={{ fontFamily:"var(--font-allura)", fontSize:46, lineHeight:1, color:"#b8985b",
              textShadow:"0 1px 3px rgba(255,255,255,0.8), 0 2px 8px rgba(184,152,91,0.25)" }}>
              N &amp; J
            </p>

            {/* Gold rule */}
            <div style={{ height:1, width:70,
              background:"linear-gradient(to right, transparent, rgba(184,152,91,0.55) 40%, rgba(184,152,91,0.55) 60%, transparent)" }}/>

            {/* Date */}
            <p style={{ fontFamily:"var(--font-inter)", fontSize:8, letterSpacing:"0.24em",
              color:"rgba(83,67,66,0.42)", textTransform:"uppercase" }}>
              August 22nd, 2026
            </p>
          </div>

          {/* ── Left flap ── */}
          <svg className="absolute left-0 top-0 pointer-events-none"
            style={{ width:162, height:"100%", zIndex:10, filter:"drop-shadow(2px 0 4px rgba(83,67,66,0.1))" }}
            viewBox="0 0 162 220" preserveAspectRatio="none">
            <defs>
              <linearGradient id="lfg2" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor="#ede8dc"/><stop offset="100%" stopColor="#fdfcf8"/>
              </linearGradient>
            </defs>
            <polygon points="0,0 162,110 0,220" fill="url(#lfg2)"/>
          </svg>

          {/* ── Right flap ── */}
          <svg className="absolute right-0 top-0 pointer-events-none"
            style={{ width:162, height:"100%", zIndex:10, filter:"drop-shadow(-2px 0 4px rgba(83,67,66,0.1))" }}
            viewBox="0 0 162 220" preserveAspectRatio="none">
            <defs>
              <linearGradient id="rfg2" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor="#fdfcf8"/><stop offset="100%" stopColor="#ede8dc"/>
              </linearGradient>
            </defs>
            <polygon points="162,0 0,110 162,220" fill="url(#rfg2)"/>
          </svg>

          {/* ── Bottom flap ── */}
          <svg className="absolute left-0 bottom-0 pointer-events-none"
            style={{ width:"100%", height:125, zIndex:12, filter:"drop-shadow(0 -3px 5px rgba(83,67,66,0.1))" }}
            viewBox="0 0 320 125" preserveAspectRatio="none">
            <defs>
              <linearGradient id="bfg2" x1="0" y1="1" x2="0" y2="0">
                <stop offset="0%" stopColor="#d5cfC3"/><stop offset="100%" stopColor="#f3ede1"/>
              </linearGradient>
            </defs>
            <polygon points="0,125 320,125 160,0" fill="url(#bfg2)"/>
          </svg>

          {/* ── Top flap (animates open) ── */}
          <div
            ref={flapRef}
            style={{
              position:"absolute", left:0, right:0, top:0,
              height:120,
              transformOrigin:"top center",
              zIndex:15,
              transform:"rotateX(-6deg)",
              transformStyle:"preserve-3d",
            }}
          >
            <svg className="w-full h-full pointer-events-none"
              style={{ filter:"drop-shadow(0 6px 10px rgba(83,67,66,0.18))" }}
              viewBox="0 0 320 120" preserveAspectRatio="none">
              <defs>
                <linearGradient id="tfg2" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#c8c2b5"/><stop offset="100%" stopColor="#fdfcf8"/>
                </linearGradient>
              </defs>
              <polygon points="0,0 320,0 160,120" fill="url(#tfg2)"/>
              <polygon points="6,2 314,2 160,116" fill="none" stroke="#b8985b" strokeWidth="1" strokeOpacity="0.38"/>
            </svg>
          </div>

          {/* ── Wax seal ── */}
          <div
            ref={sealRef}
            style={{
              position:"absolute", top:110, left:"50%",
              width:64, height:64,
              transform:"translate(-50%,-50%)",
              transformOrigin:"center",
              zIndex:20,
              display:"flex",
            }}
          >
            {/* Left half — N */}
            <div ref={sealHalfLRef} style={{ width:32, height:64, overflow:"visible", filter:"drop-shadow(-2px 4px 6px rgba(83,16,16,0.4))" }}>
              <svg width="32" height="64" viewBox="0 0 32 64" fill="none">
                <defs>
                  <radialGradient id="wl2" cx="100%" cy="50%" r="100%">
                    <stop offset="0%" stopColor="#e04040"/><stop offset="60%" stopColor="#a82323"/><stop offset="100%" stopColor="#5e1010"/>
                  </radialGradient>
                  <filter id="el2"><feDropShadow dx="0.5" dy="0.8" stdDeviation="0.4" floodColor="#000" floodOpacity="0.45"/></filter>
                </defs>
                <path d="M32,2 C16,1 3,13 1,32 C-1,51 15,62 32,62 Z" fill="url(#wl2)"/>
                <path d="M32,9 C22,9 11,19 9,32 C7,45 20,55 32,55" fill="none" stroke="#c82a2a" strokeWidth="1.8" opacity="0.65"/>
                <text x="25" y="41" fontFamily="Georgia,serif" fontSize="19" fontStyle="italic" fill="#fdebca" textAnchor="end" filter="url(#el2)" opacity="0.92">N</text>
              </svg>
            </div>
            {/* Right half — J */}
            <div ref={sealHalfRRef} style={{ width:32, height:64, overflow:"visible", filter:"drop-shadow(2px 4px 6px rgba(83,16,16,0.4))" }}>
              <svg width="32" height="64" viewBox="0 0 32 64" fill="none">
                <defs>
                  <radialGradient id="wr2" cx="0%" cy="50%" r="100%">
                    <stop offset="0%" stopColor="#e04040"/><stop offset="60%" stopColor="#a82323"/><stop offset="100%" stopColor="#5e1010"/>
                  </radialGradient>
                  <filter id="er2"><feDropShadow dx="0.5" dy="0.8" stdDeviation="0.4" floodColor="#000" floodOpacity="0.45"/></filter>
                </defs>
                <path d="M0,2 C16,1 29,13 31,32 C33,51 17,62 0,62 Z" fill="url(#wr2)"/>
                <path d="M0,9 C10,9 21,19 23,32 C25,45 12,55 0,55" fill="none" stroke="#c82a2a" strokeWidth="1.8" opacity="0.65"/>
                <text x="7" y="41" fontFamily="Georgia,serif" fontSize="19" fontStyle="italic" fill="#fdebca" textAnchor="start" filter="url(#er2)" opacity="0.92">J</text>
              </svg>
            </div>
          </div>

        </div>{/* end envelope body */}
      </div>{/* end envelopeRef */}


      {/* ── Church cutout background at the bottom ── */}
      <div
        ref={churchCutoutRef}
        style={{
          position: "absolute",
          bottom: -90,
          left: "50%",
          transform: "translateX(-50%)",
          width: "135%",
          maxWidth: 500,
          zIndex: 1,
          pointerEvents: "none",
          mixBlendMode: "multiply",
          opacity: 0,
        }}
      >
        <img
          src="/church-cutout.jpg"
          alt="Church Cutout"
          style={{
            width: "100%",
            height: "auto",
            display: "block",
          }}
        />
      </div>

      {/* Scroll hint badge — sitting just below the envelope note */}
      <div
        ref={hintRef}
        style={{
          position: "relative",
          marginTop: 20,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 6,
          zIndex: 4,
          userSelect: "none",
          pointerEvents: "none",
        }}
      >
        <span style={{
          fontFamily: "var(--font-inter)",
          fontSize: 10,
          letterSpacing: "0.22em",
          textTransform: "uppercase",
          color: "#b63b3b",
          fontWeight: 600,
          border: "1px solid rgba(182,59,59,0.3)",
          padding: "6px 14px",
          borderRadius: "20px",
          background: "rgba(250,248,242,0.9)",
          boxShadow: "0 2px 10px rgba(122,92,71,0.06)",
          animation: "envPulse 2.0s ease-in-out infinite",
        }}>
          Scroll to Open
        </span>
        {/* Delicate hand-drawn looking arrow pointing UP */}
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" style={{ stroke: "#b63b3b", strokeWidth: 1.5, animation: "bounceArrow 1.6s infinite" }}>
          <path d="M12 19V5M12 5L6 11M12 5L18 11" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </div>

      <style>{`
        @keyframes envPulse {
          0%, 100% { transform: scale(1); opacity: 0.95; }
          50%      { transform: scale(1.03); opacity: 1; }
        }
        @keyframes bounceArrow {
          0%, 100% { transform: translateY(0); }
          50%      { transform: translateY(-4px); }
        }
      `}</style>
    </section>
  );
}
