"use client";

import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { WashiTape, GoldRule, TinyStar, SmallArrow, CalendarPage, VintageTicket, PaperCorner, PaperClip, QRPlaceholder } from "./Decorations";

if (typeof window !== "undefined") gsap.registerPlugin(ScrollTrigger);

export default function DetailsInsert() {
  const sectionRef   = useRef<HTMLDivElement>(null);
  const calendarRef  = useRef<HTMLDivElement>(null);
  const churchRef    = useRef<HTMLDivElement>(null);
  const receptionRef = useRef<HTMLDivElement>(null);
  const parentsRef   = useRef<HTMLDivElement>(null);
  const verseRef     = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Calendar page drops
      gsap.fromTo(calendarRef.current,
        { y: -100, rotate: -6 },
        {
          y: 0, rotate: -3,
          duration: 1.0,
          ease: "bounce.out",
          scrollTrigger: { trigger: calendarRef.current, start: "top 80%", once: true },
        }
      );

      // RSVP removed

      // Church insert unfolds
      gsap.fromTo(churchRef.current,
        { rotateX: -90, transformOrigin: "top center" },
        {
          rotateX: 0,
          duration: 1.1,
          ease: "power2.out",
          scrollTrigger: { trigger: churchRef.current, start: "top 80%", once: true },
        }
      );

      // Reception postcard unfolds
      gsap.fromTo(receptionRef.current,
        { rotateX: -90, transformOrigin: "top center" },
        {
          rotateX: 0,
          duration: 1.1,
          ease: "power2.out",
          scrollTrigger: { trigger: receptionRef.current, start: "top 82%", once: true },
        }
      );

      // Parents note card unfolds
      gsap.fromTo(parentsRef.current,
        { rotateX: -90, transformOrigin: "top center" },
        {
          rotateX: 0,
          duration: 1.1,
          ease: "power2.out",
          scrollTrigger: { trigger: parentsRef.current, start: "top 85%", once: true },
        }
      );

      // Bible verse writes
      gsap.fromTo(verseRef.current,
        { clipPath: "inset(0 100% 0 0)" },
        {
          clipPath: "inset(0 0% 0 0)",
          duration: 1.5,
          scrollTrigger: { trigger: verseRef.current, start: "top 88%", once: true },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative w-full px-5 pt-2 pb-6 overflow-visible flex flex-col gap-4"
      style={{ perspective: "1000px" }}
    >
      {/* ── Calendar ── */}
      <div className="relative w-full h-[190px]">
        <div ref={calendarRef} className="absolute left-1 top-2" style={{ zIndex: 10 }}>
          <WashiTape width="40px" angle={-8} variant="neutral" className="absolute -top-2 left-8 z-20" />
          <CalendarPage />
        </div>
      </div>

      {/* ── Church Ceremony Insert (Vintage card) ── */}
      <div
        ref={churchRef}
        className="relative mx-auto w-[94%] bg-[#fdfcf8] p-6"
        style={{
          boxShadow: "0 10px 24px rgba(122,92,71,0.14)",
          border: "1px solid rgba(210,198,182,0.7)",
          zIndex: 10,
        }}
      >
        <PaperCorner className="top-0 left-0" />
        <PaperCorner className="top-0 right-0 transform rotate-90" />
        <PaperCorner className="bottom-0 left-0 transform -rotate-90" />
        <PaperCorner className="bottom-0 right-0 transform rotate-180" />

        <div className="border border-[#e8e3d8] p-3">
          <p style={{
            fontFamily: "var(--font-inter)",
            fontSize: 9,
            letterSpacing: "0.24em",
            textTransform: "uppercase",
            color: "#b8985b",
            textAlign: "center",
            marginBottom: 6,
          }}>
            Ceremony
          </p>
          <h3 style={{
            fontFamily: "var(--font-cormorant)",
            fontSize: 22,
            fontWeight: 400,
            color: "#534342",
            textAlign: "center",
            lineHeight: 1.2,
          }}>
            Sacred Heart Church
          </h3>
          <p style={{
            fontFamily: "var(--font-cormorant)",
            fontSize: 14,
            fontStyle: "italic",
            color: "rgba(83,67,66,0.52)",
            textAlign: "center",
            marginTop: 2,
          }}>
            Kumbalanghi, Kochi
          </p>
          <div style={{ height: 1, background: "rgba(184,152,91,0.2)", width: 60, margin: "10px auto" }} />
          <p style={{
            fontFamily: "var(--font-caveat)",
            fontSize: 13,
            color: "rgba(83,67,66,0.6)",
            textAlign: "center",
          }}>
            Blessing & Nuptial Mass at 11:00 AM
          </p>
        </div>
      </div>

      {/* ── Reception Postcard ── */}
      <div
        ref={receptionRef}
        className="relative mx-auto w-[94%] bg-[#fcfaf4] p-5"
        style={{
          boxShadow: "0 8px 20px rgba(122,92,71,0.12)",
          border: "1px solid rgba(210,198,182,0.6)",
          zIndex: 15,
        }}
      >
        <WashiTape width="52px" angle={4} variant="gold" className="absolute -top-3 left-1/4 -translate-x-1/2 z-20" />
        
        <div className="flex justify-between items-start">
          <div className="w-2/3">
            <p style={{
              fontFamily: "var(--font-inter)",
              fontSize: 9,
              letterSpacing: "0.24em",
              textTransform: "uppercase",
              color: "#b8985b",
              marginBottom: 4,
            }}>
              Reception
            </p>
            <h3 style={{
              fontFamily: "var(--font-cormorant)",
              fontSize: 22,
              fontWeight: 400,
              color: "#534342",
              lineHeight: 1.25,
            }}>
              Puzhayoram Resort
            </h3>
            <p style={{
              fontFamily: "var(--font-cormorant)",
              fontSize: 14,
              fontStyle: "italic",
              color: "rgba(83,67,66,0.52)",
              marginTop: 2,
            }}>
              Kumbalanghi, Kochi
            </p>
            <p style={{
              fontFamily: "var(--font-caveat)",
              fontSize: 12,
              color: "rgba(83,67,66,0.6)",
              marginTop: 6,
            }}>
              join us for dinner & music to follow
            </p>
          </div>

          {/* Stamp / Vignette on postcard */}
          <div className="w-12 h-14 border border-dashed border-[#b8985b]/60 flex flex-col items-center justify-center p-1 bg-white select-none">
            <span style={{ fontFamily: "var(--font-allura)", fontSize: 13, color: "#b8985b" }}>M+J</span>
            <span style={{ fontFamily: "var(--font-inter)", fontSize: 6, opacity: 0.5 }}>2026</span>
          </div>
        </div>
      </div>

      {/* ── Parents Folded Note ── */}
      <div
        ref={parentsRef}
        className="relative mx-auto w-[94%] bg-[#fdfcf8] p-5"
        style={{
          boxShadow: "0 6px 18px rgba(122,92,71,0.1)",
          border: "1px solid rgba(210,198,182,0.5)",
          zIndex: 10,
        }}
      >
        <div
          className="absolute top-1/2 left-0 right-0 pointer-events-none"
          style={{
            height: 1,
            background: "linear-gradient(to right, transparent, rgba(122,92,71,0.08) 50%, transparent)",
          }}
        />

        <p style={{
          fontFamily: "var(--font-inter)",
          fontSize: 8,
          letterSpacing: "0.2em",
          textTransform: "uppercase",
          color: "rgba(83,67,66,0.4)",
          textAlign: "center",
          marginBottom: 10,
        }}>
          With their parents
        </p>

        <div className="grid grid-cols-2 gap-4 text-center">
          <div>
            <p style={{ fontFamily: "var(--font-cormorant)", fontSize: 14, color: "#534342", lineHeight: 1.3 }}>
              Mr. Thankachan Xavier
              <br />&amp; Mrs. Liji Augustine
            </p>
            <span style={{ fontFamily: "var(--font-caveat)", fontSize: 10, color: "rgba(83,67,66,0.4)" }}>
              parents of the bride
            </span>
          </div>
          <div>
            <p style={{ fontFamily: "var(--font-cormorant)", fontSize: 14, color: "#534342", lineHeight: 1.3 }}>
              Mr. Prakash Babu
              <br />&amp; Mrs. Suja Prakash
            </p>
            <span style={{ fontFamily: "var(--font-caveat)", fontSize: 10, color: "rgba(83,67,66,0.4)" }}>
              parents of the groom
            </span>
          </div>
        </div>
      </div>

      {/* ── Bible verse — margin note outside the inserts ── */}
      <p
        ref={verseRef}
        className="margin-note mx-4 mt-2"
        style={{
          fontSize: 13,
          fontStyle: "italic",
          lineHeight: 1.6,
          borderLeft: "2px solid rgba(184,152,91,0.35)",
          paddingLeft: 12,
          color: "rgba(83,67,66,0.5)",
        }}
      >
        "So they are no longer two, but one flesh. What God has joined together, let no one separate."
        <br />
        <span style={{ fontFamily: "var(--font-inter)", fontSize: 8, letterSpacing: "0.15em", textTransform: "uppercase", opacity: 0.7 }}>
          — Matthew 19:6
        </span>
      </p>
    </section>
  );
}
