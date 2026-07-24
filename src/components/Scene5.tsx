"use client";

import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { cn } from "@/lib/utils";

export default function Scene5() {
  const containerRef = useRef<HTMLElement>(null);
  const threadRef = useRef<HTMLDivElement>(null);
  const detailsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 70%",
          end: "bottom 80%",
          scrub: 1,
        },
      });

      tl.fromTo(threadRef.current, { scaleY: 0 }, { scaleY: 1, duration: 1, transformOrigin: "top" });

      if (detailsRef.current) {
         tl.fromTo(detailsRef.current.children,
            { y: 30, opacity: 0 },
            { y: 0, opacity: 1, stagger: 0.15, duration: 0.8, ease: "power1.out" },
            0.5
         );
      }

    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="relative pt-16 px-6 pb-24 z-10 w-full flex flex-col items-center overflow-hidden">
      
      {/* Red Thread Transition - Spanning down the center */}
      <div className="absolute top-[-40px] left-1/2 -translate-x-1/2 w-20 h-32 z-0">
        <div ref={threadRef} className="absolute w-[2px] bg-[#8B2323] opacity-60 left-1/2 top-[-10px] h-40 transform rotate-1"></div>
      </div>

      <div ref={detailsRef} className="flex flex-col items-center w-full max-w-[340px] relative z-10">
        
        {/* Main Wedding Announcement Card */}
        <div className="w-full bg-[#fdfcfa] p-8 shadow-ambient mb-8 transform -rotate-1 paper-texture border border-black/5 flex flex-col items-center text-center z-10">
          <div className="flex justify-center mb-4">
            <span className="material-symbols-outlined text-[#8B2323] text-2xl opacity-60">
              local_florist
            </span>
          </div>
          
          <h1 className="font-label-typewriter text-[10px] tracking-[0.25em] uppercase text-black/40 mb-4">
              The Wedding Of
          </h1>
          <h2 className="font-display-lg-mobile text-[32px] text-black/90 leading-[1.2] mb-6">
              Mary Nikhitha <br /> <span className="font-body-romantic text-[24px] italic opacity-70 my-1 block">&amp;</span> Jerin Babu
          </h2>

          <div className="w-12 h-px bg-black/20 my-4"></div>

          <h3 className="font-display-lg-mobile text-[22px] text-black/80 mt-2">August 22, 2026</h3>
          <p className="font-label-typewriter text-[11px] tracking-widest text-black/50 mt-2 uppercase">Saturday, 11:00 AM</p>
        </div>

        {/* Ceremony Insert Card */}
        <div className="w-[90%] bg-[#f4f1eb] p-6 shadow-floating transform rotate-2 -mt-12 paper-texture border border-black/5 flex flex-col items-center text-center z-20">
          <div className="washi-tape -top-3 left-1/2 -translate-x-1/2 -rotate-2 bg-black/10 mix-blend-multiply opacity-60"></div>
          <h4 className="font-label-typewriter text-[10px] tracking-[0.2em] text-[#8B2323] uppercase mb-3">Ceremony</h4>
          <h4 className="font-display-lg-mobile text-xl mb-1 text-black/90">Sacred Heart Church</h4>
          <p className="font-label-typewriter text-[11px] text-black/50 tracking-wider">Kumbalanghi</p>
        </div>
        
        {/* Reception Insert Card */}
        <div className="w-[95%] bg-[#faf9f6] p-6 shadow-floating transform -rotate-1 -mt-6 paper-texture border border-black/5 flex flex-col items-center text-center z-30 mb-16">
          <h4 className="font-label-typewriter text-[10px] tracking-[0.2em] text-[#8B2323] uppercase mb-3">Reception</h4>
          <h4 className="font-display-lg-mobile text-[22px] mb-1 text-black/90">Puzhayoram Resort</h4>
          <p className="font-label-typewriter text-[11px] text-black/50 tracking-wider">Kumbalanghi</p>
        </div>

        {/* Families Information (Clean layout) */}
        <div className="flex flex-col gap-10 w-full px-4 mb-16 text-center relative z-10">
            <div>
                <h4 className="font-label-typewriter text-[10px] tracking-[0.2em] text-black/40 uppercase mb-2">Bride's Parents</h4>
                <p className="font-display-lg-mobile text-[20px] text-black/80">Mr. Thankachan Xavier <br/>&amp; Mrs. Liji Augustine</p>
            </div>
            <div>
                <h4 className="font-label-typewriter text-[10px] tracking-[0.2em] text-black/40 uppercase mb-2">Groom's Parents</h4>
                <p className="font-display-lg-mobile text-[20px] text-black/80">Mr. Prakash Babu <br/>&amp; Mrs. Suja Prakash</p>
            </div>
            <div className="mt-4">
                <h4 className="font-label-typewriter text-[10px] tracking-[0.2em] text-black/40 uppercase mb-2">Best Compliments</h4>
                <p className="font-body-romantic text-[26px] text-black/80 mt-2">Family &amp; Friends</p>
            </div>
        </div>

        {/* Verse */}
        <div className="relative w-full max-w-[280px] text-center mb-8">
            <span className="absolute -top-6 left-1/2 -translate-x-1/2 font-display-lg-mobile text-6xl text-black/10 rotate-3">"</span>
            <p className="font-display-lg-mobile text-[22px] text-black/70 italic leading-relaxed relative z-10">
                So they are no longer two, but one flesh. Therefore what God has joined together, let no one separate.
            </p>
            <span className="font-label-typewriter text-[10px] tracking-[0.1em] text-black/40 block mt-6 uppercase">Matthew 19:6</span>
        </div>

      </div>
    </section>
  );
}
