"use client";

import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { cn } from "@/lib/utils";

export default function Scene1() {
  const containerRef = useRef<HTMLDivElement>(null);
  const envelopeRef = useRef<HTMLDivElement>(null);
  const flapRef = useRef<HTMLDivElement>(null);
  const sealRef = useRef<HTMLDivElement>(null);
  const sealLeftRef = useRef<HTMLDivElement>(null);
  const sealRightRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "center center",
          end: "+=100%",
          scrub: 1,
          pin: true,
        },
      });

      // 1. Crack the seal
      tl.to(sealRef.current, { scale: 1.1, duration: 0.2 })
        .to(sealLeftRef.current, { x: -20, opacity: 0, rotation: -15, duration: 0.8 }, "+=0.1")
        .to(sealRightRef.current, { x: 20, opacity: 0, rotation: 15, duration: 0.8 }, "<");

      // 2. Open the flap (simulate 3D rotation)
      tl.to(flapRef.current, { 
        rotateX: 180, 
        duration: 1.5,
        ease: "power2.inOut"
      }, 0.5);

      // 3. Move the envelope up slightly to make room for the invitation below
      tl.to(envelopeRef.current, {
        y: -50,
        opacity: 0,
        duration: 1.5,
        ease: "power1.inOut"
      }, 1.5);

    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="relative w-full min-h-screen flex items-center justify-center pt-12 pb-24 z-30 perspective-1000">
      {/* Envelope Wrapper */}
      <div ref={envelopeRef} className="relative w-[320px] h-[220px] bg-surface-container-lowest shadow-floating organic-rotate-1 flex items-center justify-center border border-surface-variant/50 paper-texture">
        
        {/* Envelope Back Flaps */}
        <div className="absolute bottom-0 left-0 w-full h-0 border-b-[110px] border-b-surface-container-high border-l-[160px] border-l-transparent border-r-[160px] border-r-transparent z-0"></div>
        <div className="absolute top-0 left-0 w-0 h-full border-l-[160px] border-l-surface-container border-t-[110px] border-t-transparent border-b-[110px] border-b-transparent z-0"></div>
        <div className="absolute top-0 right-0 w-0 h-full border-r-[160px] border-r-surface-container border-t-[110px] border-t-transparent border-b-[110px] border-b-transparent z-0"></div>
        
        {/* Ribbon under seal */}
        <div className="absolute top-[80px] w-full h-[6px] bg-[#d5cfc5] z-10 shadow-sm organic-rotate-3"></div>
        
        {/* Envelope Top Flap (Animated) */}
        <div 
          ref={flapRef}
          className="absolute top-0 left-0 w-full h-0 border-t-[110px] border-t-surface-container-low border-l-[160px] border-l-transparent border-r-[160px] border-r-transparent drop-shadow-[0_2px_4px_rgba(0,0,0,0.1)] z-20 origin-top"
          style={{ transformStyle: 'preserve-3d' }}
        >
            {/* Backside of flap */}
            <div className="absolute top-[-110px] left-[-160px] w-0 h-0 border-t-[110px] border-t-surface-container-high border-l-[160px] border-l-transparent border-r-[160px] border-r-transparent rotateX-180 backface-hidden origin-top" style={{ transform: 'rotateX(180deg) translateY(-100%)', backfaceVisibility: 'hidden' }}></div>
        </div>

        {/* Wax Seal */}
        <div ref={sealRef} className="absolute top-[85px] z-30 flex items-center justify-center transform -translate-y-1/2">
            <div ref={sealLeftRef} className="absolute w-8 h-16 bg-[#8B2323] rounded-l-full shadow-seal left-[-32px] overflow-hidden flex items-center justify-end">
                 <div className="w-14 h-14 rounded-full border border-white/20 flex items-center justify-center translate-x-[16px]">
                    <span className="font-display-lg-mobile text-white/90 text-[28px] pr-[16px] italic">M</span>
                </div>
            </div>
            <div ref={sealRightRef} className="absolute w-8 h-16 bg-[#8B2323] rounded-r-full shadow-seal right-[-32px] overflow-hidden flex items-center justify-start">
                 <div className="w-14 h-14 rounded-full border border-white/20 flex items-center justify-center -translate-x-[16px]">
                    <span className="font-display-lg-mobile text-white/90 text-[28px] pl-[16px] italic">J</span>
                </div>
            </div>
            
            {/* The initial unified seal that disappears instantly on crack */}
            <div className="w-16 h-16 bg-[#8B2323] rounded-full shadow-seal flex items-center justify-center absolute opacity-0"></div>
        </div>
      </div>
    </section>
  );
}
