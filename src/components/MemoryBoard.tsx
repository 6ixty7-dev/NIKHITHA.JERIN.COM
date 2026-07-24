"use client";

import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import PhotoFrame from "./PhotoFrame";
import { WashiTape, RedThread, MarginNote, PressedFlower, TinyHeart, DoodleHeart, DoodleHeartFilled, SketchyArrow } from "./Decorations";

if (typeof window !== "undefined") gsap.registerPlugin(ScrollTrigger);

const LEAF_SRC = "https://lh3.googleusercontent.com/aida-public/AB6AXuDlpBWeSvCFzIcMxY8MaJE3CYgLQhtq0X00O27kfky03iuQnx91cD_KQckgHzzkxUQhp5q-JLItY-mg2Qi4ELdJHgk5QvxgmSPHZzqYngecLBcohKyHj7qwr-vYTLF_zYlBCHMV5WtBOZUYTqmeKiAnzh-ok1Co02XJEAi6N-_B0LoZepZmeXS1-tMIrI9Y6HQy_DUII3FJAZoFw1wnsX9IQaZ1zZLz22_ujEaDI9pT1jwg4eVu7hrs";

export default function MemoryBoard() {
  const sectionRef  = useRef<HTMLDivElement>(null);
  const photo1Ref   = useRef<HTMLDivElement>(null);
  const photo2Ref   = useRef<HTMLDivElement>(null);
  const filmRef     = useRef<HTMLDivElement>(null);
  const threadRef   = useRef<HTMLDivElement>(null);
  const leafRef     = useRef<HTMLDivElement>(null);
  const captionRef  = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Polaroid 1 drops
      gsap.fromTo(photo1Ref.current,
        { y: -100, rotate: -6 },
        {
          y: 0, rotate: -2,
          duration: 1.2,
          ease: "bounce.out",
          scrollTrigger: { trigger: sectionRef.current, start: "top 72%", once: true },
        }
      );

      // Polaroid 2 drops
      gsap.fromTo(photo2Ref.current,
        { y: -120, rotate: 6 },
        {
          y: 0, rotate: 1.5,
          duration: 1.2,
          delay: 0.15,
          ease: "bounce.out",
          scrollTrigger: { trigger: sectionRef.current, start: "top 72%", once: true },
        }
      );

      // Thread reveal
      gsap.fromTo(threadRef.current,
        { scaleY: 0, transformOrigin: "top center" },
        {
          scaleY: 1,
          duration: 1.2,
          ease: "power2.inOut",
          scrollTrigger: { trigger: sectionRef.current, start: "top 65%", once: true },
        }
      );

      // Film strip (slides in from left)
      gsap.fromTo(filmRef.current,
        { x: -300 },
        {
          x: 0,
          duration: 1.2,
          ease: "power2.out",
          scrollTrigger: { trigger: filmRef.current, start: "top 80%", once: true },
        }
      );

      // Leaf drops
      gsap.fromTo(leafRef.current,
        { scale: 0.3, rotate: -15 },
        {
          scale: 1, rotate: 8,
          duration: 1.2,
          ease: "elastic.out(1, 0.4)",
          scrollTrigger: { trigger: leafRef.current, start: "top 80%", once: true },
        }
      );

      // Caption wipe
      gsap.fromTo(captionRef.current,
        { clipPath: "inset(0 100% 0 0)" },
        {
          clipPath: "inset(0 0% 0 0)",
          duration: 1.0,
          ease: "power2.out",
          scrollTrigger: { trigger: captionRef.current, start: "top 85%", once: true },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative w-full px-5 pt-2 pb-4 overflow-visible flex flex-col items-center"
    >
      {/* ── Section heading — handwritten ── */}
      <div className="text-center mb-6">
        <p
          style={{
            fontFamily: "var(--font-caveat)",
            fontSize: 20,
            color: "rgba(83,67,66,0.6)",
            transform: "rotate(-1deg)",
            display: "inline-block",
            letterSpacing: "0.01em",
          }}
        >
          before the wedding...
        </p>
      </div>

      {/* ── Photo collage area ── */}
      <div className="relative h-[290px] w-full max-w-[350px]">
        {/* Red thread connecting photos */}
        <div
          ref={threadRef}
          className="red-thread absolute z-10"
          style={{
            left: "50%",
            top: 25,
            height: 190,
            width: 2,
            transform: "translateX(-50%) rotate(4deg) scaleY(0)",
            transformOrigin: "top center",
          }}
        />

        {/* ── Childhood Polaroid 1 — Mary ── */}
        <div
          ref={photo1Ref}
          className="absolute"
          style={{ left: 2, top: 0, zIndex: 20 }}
        >
          <WashiTape width="46px" angle={-4} className="absolute -top-3 left-1/3 -translate-x-1/2 z-30" />
          <PhotoFrame
            variant="polaroid"
            tint="natural"
            src="/mary-childhood.jpg"
            alt="Mary as a child"
            caption="Nikki, 2000"
            style={{ width: 155, height: 185 }}
          />

          {/* Doodles next to Mary */}
          <div className="absolute -left-2 bottom-8 z-30 pointer-events-none select-none">
            <span
              className="text-[12px] text-[#b63b3b] block transform -rotate-12"
              style={{ fontFamily: "var(--font-caveat)" }}
            >
              bride
            </span>
            <SketchyArrow className="w-6 h-4 transform rotate-180 -mt-1" />
          </div>
        </div>

        {/* ── Childhood Polaroid 2 — Jerin ── */}
        <div
          ref={photo2Ref}
          className="absolute"
          style={{ right: 2, top: 25, zIndex: 20 }}
        >
          <WashiTape width="46px" angle={3} className="absolute -top-3 right-1/3 translate-x-1/2 z-30" />
          <PhotoFrame
            variant="polaroid"
            tint="natural"
            src="/jerin-childhood.jpg"
            alt="Jerin as a child"
            caption="Unni, 2000"
            zoom={1.4}
            style={{ width: 155, height: 185 }}
          />

          {/* Doodles next to Jerin */}
          <div className="absolute -right-2 top-10 z-30 pointer-events-none select-none">
            <span
              className="text-[12px] text-[#b63b3b] block transform rotate-12"
              style={{ fontFamily: "var(--font-caveat)" }}
            >
              groom
            </span>
            <SketchyArrow className="w-6 h-4 transform scale-x-[-1] rotate-12 -mt-1" />
          </div>
        </div>

        {/* Floating sketchy hearts above childhood photos */}
        <div className="absolute top-[-10px] left-[45%] z-30 flex gap-2 pointer-events-none">
          <DoodleHeartFilled style={{ width: 10, height: 10, transform: "rotate(-10deg)" }} />
          <DoodleHeart style={{ width: 12, height: 12, transform: "rotate(15deg)" }} />
        </div>

        {/* ── Pressed leaf — center, overlapping ── */}
        <div
          ref={leafRef}
          className="absolute z-35"
          style={{ left: "48%", top: 75, transform: "translateX(-50%)" }}
        >
          <PressedFlower
            src={LEAF_SRC}
            size="52px"
            angle={6}
            alt="pressed autumn leaf"
          />
        </div>

        {/* Personality: note placed under left photo */}
        <p
          className="margin-note absolute z-25"
          style={{
            left: 12,
            bottom: 60,
            transform: "rotate(-2deg)",
            fontSize: 13,
            color: "rgba(83,67,66,0.6)",
          }}
        >
          <TinyHeart /> look at them...
        </p>
      </div>

      <div
        ref={filmRef}
        className="film-strip mt-2 mx-[-16px]"
        style={{
          boxShadow: "0 3px 12px rgba(0,0,0,0.22), 0 6px 20px rgba(0,0,0,0.15)",
          transform: "rotate(-1deg)",
          justifyContent: "center",
          gap: 6,
        }}
      >
        {["/gallery-1.jpg", "/gallery-2.jpg", "/gallery-3.jpg", "/gallery-4.jpg"].map((src, i) => (
          <PhotoFrame
            key={i}
            variant="filmframe"
            tint="natural"
            src={src}
            alt={`Memory ${i + 1}`}
            style={{ width: 75, height: 75, flexShrink: 0 }}
          />
        ))}
      </div>

      {/* ── Closing note ── */}
      <p
        ref={captionRef}
        className="text-center mt-6"
        style={{
          fontFamily: "var(--font-cormorant)",
          fontSize: 16,
          fontStyle: "italic",
          fontWeight: 300,
          color: "rgba(83,67,66,0.55)",
          letterSpacing: "0.02em",
        }}
      >
        Two people. One story.
      </p>
    </section>
  );
}
