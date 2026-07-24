"use client";

import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { cn } from "@/lib/utils";

export default function Scene2() {
  const containerRef = useRef<HTMLElement>(null);
  const paperRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const flowerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 80%", // Start animating when top of section hits 80% of viewport
          end: "top 20%",
          scrub: 1,
        },
      });

      // Paper floats up slightly and settles
      tl.fromTo(paperRef.current, 
        { y: 50, opacity: 0, rotate: -2 }, 
        { y: 0, opacity: 1, rotate: 1.5, duration: 1, ease: "power2.out" }
      );

      // Contents stagger in
      if (contentRef.current) {
         tl.fromTo(contentRef.current.children,
            { y: 20, opacity: 0 },
            { y: 0, opacity: 1, stagger: 0.2, duration: 0.8, ease: "power1.out" },
            0.5
         );
      }

      // Pressed flower shifts subtly
      tl.fromTo(flowerRef.current,
        { rotate: 0, scale: 0.9 },
        { rotate: 2.5, scale: 1, duration: 1 },
        0.2
      );

    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="relative w-full px-8 py-20 flex flex-col items-center z-20 mt-[-80px]">
      {/* Paper Background for Letter */}
      <div ref={paperRef} className="absolute inset-4 bg-[#fdfcfa] shadow-paper organic-rotate-2 z-0 border border-black/5 paper-texture"></div>
      
      <div ref={contentRef} className="relative z-10 w-full h-full flex flex-col items-center justify-center text-center">
        {/* Coffee Stain */}
        <div className="coffee-stain top-[-20px] left-[-20px] opacity-0 mix-blend-multiply"></div>
        
        {/* Pressed Flower */}
        <div ref={flowerRef} className="absolute -top-6 right-2 w-20 h-24 organic-rotate-4 flex flex-col items-center justify-center opacity-0 z-20">
          <div className="washi-tape -top-2 rotate-45 -right-2"></div>
          <img 
            className="w-16 h-16 object-contain opacity-95 drop-shadow-[0_2px_4px_rgba(0,0,0,0.15)] mix-blend-multiply" 
            alt="Pressed Flower"
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuC4tFMDvJHDNYM_PxHE72pvew7CSCOTga0PhonJpGedeFiOpXdNlwdKmlK-A1JEOZ4Kk4afA4eH7eVLQqicAsbU0Svp8oSFXW3ALAGeMSvwC8Ad16sdwE7E3lYsXqgHLMECHtVyjzmsjF-qtGWYPS5npiOeshho9Tic6aDh1cVugK2Yjyz5nNzaSiEMlor4YY4fGEkO_qtfzf7jLobd4wvtKSpDlWY0FPfq6rZZNyEFcXT3Sz-ad5wX" 
          />
        </div>
        
        {/* Typography */}
        <div className="opacity-0 mt-8 mb-4">
          <span className="font-label-typewriter text-[10px] tracking-[0.2em] uppercase text-black/40">You are invited</span>
        </div>

        <h1 className="font-display-lg-mobile text-[40px] leading-[1.1] text-black/90 text-center mb-6 opacity-0 relative z-10" style={{ fontWeight: 400 }}>
          Mary Nikhitha<br/>
          <span className="text-[28px] italic opacity-70 my-2 block">&amp;</span>
          Jerin Babu
        </h1>
        
        <div className="w-16 h-[1px] bg-black/20 my-6 opacity-0"></div>
        
        <p className="font-body-romantic text-[22px] text-black/70 text-center italic opacity-0 px-4">
          A new chapter begins
        </p>
      </div>
    </section>
  );
}
