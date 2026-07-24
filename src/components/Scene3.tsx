"use client";

import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { cn } from "@/lib/utils";
import ImagePlaceholder from "./ImagePlaceholder";

export default function Scene3() {
  const containerRef = useRef<HTMLElement>(null);
  const photo1Ref = useRef<HTMLDivElement>(null);
  const photo2Ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 70%",
          end: "top 30%",
          scrub: 1,
        },
      });

      // Photo 1 slides in and rotates
      tl.fromTo(photo1Ref.current,
        { x: -50, y: 30, opacity: 0, rotate: -10 },
        { x: 0, y: 0, opacity: 1, rotate: -3, duration: 1, ease: "power2.out" }
      );

      // Photo 2 slides in from right, overlapping
      tl.fromTo(photo2Ref.current,
        { x: 50, y: 50, opacity: 0, rotate: 10 },
        { x: 0, y: 0, opacity: 1, rotate: 1.5, duration: 1, ease: "power2.out" },
        0.3
      );

    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="relative w-full px-6 py-24 flex flex-col items-center gap-6 z-30">
      
      {/* Photo 1 */}
      <div ref={photo1Ref} className="relative w-[280px] bg-[#fdfcfa] p-3 pb-8 shadow-floating transform -rotate-3 z-10 paper-texture">
        <div className="washi-tape -top-3 -left-4 -rotate-12 bg-black/10 origin-bottom-left mix-blend-multiply opacity-80"></div>
        <div className="w-full aspect-[4/3] bg-surface-container overflow-hidden">
          <ImagePlaceholder className="w-full h-full filter sepia-[0.2] contrast-110 grayscale-[0.3]" />
        </div>
        {/* Paperclip */}
        <div className="absolute -top-4 right-4 w-6 h-12 border-2 border-black/30 rounded-full bg-transparent z-10 shadow-sm transform rotate-12" style={{ clipPath: 'polygon(0 0, 100% 0, 100% 80%, 0 80%)' }}></div>
      </div>

      {/* Photo 2 (Overlapping) */}
      <div ref={photo2Ref} className="relative w-[240px] bg-[#fdfcfa] p-2 pb-6 shadow-floating -mt-16 transform rotate-2 z-20 paper-texture ml-12">
        <div className="washi-tape -bottom-3 -right-4 -rotate-6 origin-top-left mix-blend-multiply opacity-80"></div>
        <div className="w-full aspect-square bg-surface-container overflow-hidden">
           <ImagePlaceholder className="w-full h-full filter sepia-[0.3] contrast-105 grayscale-[0.2]" />
        </div>
      </div>
      
    </section>
  );
}
