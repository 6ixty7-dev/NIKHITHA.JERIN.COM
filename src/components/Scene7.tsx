"use client";

import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function Scene7() {
  const containerRef = useRef<HTMLDivElement>(null);
  const photoRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "+=100%",
          scrub: 1,
          pin: true,
        },
      });

      // Very slow, subtle zoom on the photo to create a feeling of timelessness
      tl.fromTo(photoRef.current,
        { scale: 1 },
        { scale: 1.05, duration: 2, ease: "none" }
      );

      // Fade in the final note
      tl.fromTo(textRef.current,
        { opacity: 0, y: 10 },
        { opacity: 1, y: 0, duration: 1, ease: "power2.out" },
        0.5
      );

    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="h-screen w-full flex items-center justify-center relative overflow-hidden bg-[var(--color-paper-light)]">
      
      <div className="relative flex flex-col items-center justify-center gap-12 z-10 w-full max-w-2xl px-6">
        
        {/* The Final Photo */}
        <div className="relative w-64 sm:w-80 aspect-square p-3 pb-12 bg-white drop-shadow-xl border border-black/5 rotate-slight-right">
          
          <div className="washi-tape absolute -top-4 left-1/2 -translate-x-1/2 w-16 h-6 rotate-slight-left z-20" />
          
          <div className="w-full h-full relative overflow-hidden bg-[#d9d9d9]">
            {/* The image goes here. We simulate the very slow zoom on this container */}
            <div ref={photoRef} className="w-full h-full bg-[#d0c9b8] flex items-center justify-center origin-center">
               <span className="font-sans text-sm text-black/30">Forever Photo</span>
            </div>
            
            {/* Soft vignette */}
            <div className="absolute inset-0 pointer-events-none shadow-[inset_0_0_40px_rgba(0,0,0,0.2)] mix-blend-multiply" />
          </div>
          
        </div>

        {/* The Final Note */}
        <p ref={textRef} className="font-handwriting text-3xl sm:text-4xl text-[var(--color-ink-dark)] text-center opacity-90">
          We can't wait to celebrate with you.
        </p>

      </div>

    </section>
  );
}
