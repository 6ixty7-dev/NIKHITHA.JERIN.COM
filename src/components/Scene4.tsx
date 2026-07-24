"use client";

import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { cn } from "@/lib/utils";
import ImagePlaceholder from "./ImagePlaceholder";

export default function Scene4() {
  const containerRef = useRef<HTMLElement>(null);
  const thread1Ref = useRef<HTMLDivElement>(null);
  const thread2Ref = useRef<HTMLDivElement>(null);
  const polaroid1Ref = useRef<HTMLDivElement>(null);
  const polaroid2Ref = useRef<HTMLDivElement>(null);
  const ticketRef = useRef<HTMLDivElement>(null);
  const leafRef = useRef<HTMLDivElement>(null);
  const filmStripRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 80%",
          end: "bottom 60%",
          scrub: 1,
        },
      });

      // Red threads draw themselves (animating height/scaleY)
      tl.fromTo(thread1Ref.current, { scaleY: 0 }, { scaleY: 1, duration: 1, transformOrigin: "top" }, 0);
      tl.fromTo(thread2Ref.current, { scaleY: 0 }, { scaleY: 1, duration: 1.5, transformOrigin: "top" }, 0.5);

      // Collage elements fall into place
      tl.fromTo(polaroid1Ref.current, 
        { y: -50, opacity: 0, rotate: -20 }, 
        { y: 0, opacity: 1, rotate: -6, duration: 1, ease: "power2.out" }, 
        0.5
      );

      tl.fromTo(ticketRef.current, 
        { x: -50, opacity: 0, rotate: 0 }, 
        { x: 0, opacity: 1, rotate: 12, duration: 0.8, ease: "power2.out" }, 
        0.8
      );

      tl.fromTo(polaroid2Ref.current, 
        { x: 50, y: -30, opacity: 0, rotate: 20 }, 
        { x: 0, y: 0, opacity: 1, rotate: 3, duration: 1, ease: "power2.out" }, 
        1.0
      );

      tl.fromTo(leafRef.current, 
        { scale: 0, opacity: 0 }, 
        { scale: 1, opacity: 0.8, duration: 1, ease: "back.out(1.5)" }, 
        1.5
      );

      tl.fromTo(filmStripRef.current,
        { y: 50, opacity: 0, rotate: 0 },
        { y: 0, opacity: 1, rotate: -2, duration: 1, ease: "power2.out" },
        1.8
      );

    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="relative pt-12 px-6 pb-24 z-10 w-full overflow-hidden flex flex-col items-center">
      
      {/* Red Thread Background Elements - acting as the spine */}
      <div className="absolute top-[-40px] left-1/2 -translate-x-1/2 w-20 h-full z-0">
        <div 
          ref={thread1Ref} 
          className="absolute w-[2px] bg-[#8B2323] opacity-60 left-1/2 top-0 h-40 transform rotate-2"
        ></div>
        <div 
          ref={thread2Ref} 
          className="absolute w-[2px] bg-[#8B2323] opacity-60 left-[45%] top-32 h-80 transform -rotate-3"
        ></div>
      </div>

      <h2 className="font-body-romantic text-[28px] text-black/80 text-center mb-16 transform -rotate-2 relative z-10">
        Growing Together
      </h2>

      {/* Dense Collage */}
      <div className="relative w-full max-w-[340px] h-[550px] mx-auto z-10">
        
        {/* Polaroid 1 */}
        <div ref={polaroid1Ref} className="absolute top-0 left-2 w-40 transform -rotate-6 z-20 bg-[#fdfcfa] p-2 pb-6 shadow-floating paper-texture">
          <div className="absolute w-[60px] h-[20px] bg-black/10 transform -rotate-15 top-[-10px] left-1/2 -translate-x-1/2 shadow-sm mix-blend-multiply opacity-80 washi-tape border-none"></div>
          <ImagePlaceholder className="w-full aspect-[4/5]" />
        </div>

        {/* Polaroid 2 */}
        <div ref={polaroid2Ref} className="absolute top-32 right-2 w-44 transform rotate-3 z-30 bg-[#fdfcfa] p-2 pb-6 shadow-floating paper-texture">
          <div className="absolute w-[60px] h-[20px] bg-black/10 transform -rotate-15 top-[-8px] left-[20%] shadow-sm mix-blend-multiply opacity-80 washi-tape border-none"></div>
          <ImagePlaceholder className="w-full aspect-square" />
        </div>

        {/* Pressed Leaf */}
        <div ref={leafRef} className="absolute top-72 left-1/2 w-20 transform -translate-x-1/2 -rotate-12 z-40 opacity-90 mix-blend-multiply">
          <img alt="Pressed leaf" className="w-full object-contain drop-shadow-[0_2px_4px_rgba(0,0,0,0.2)]" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDlpBWeSvCFzIcMxY8MaJE3CYgLQhtq0X00O27kfky03iuQnx91cD_KQckgHzzkxUQhp5q-JLItY-mg2Qi4ELdJHgk5QvxgmSPHZzqYngecLBcohKyHj7qwr-vYTLF_zYlBCHMV5WtBOZUYTqmeKiAnzh-ok1Co02XJEAi6N-_B0LoZepZmeXS1-tMIrI9Y6HQy_DUII3FJAZoFw1wnsX9IQaZ1zZLz22_ujEaDI9pT1jwg4eVu7hrs" />
        </div>

        {/* Film Strip */}
        <div ref={filmStripRef} className="absolute bottom-10 left-1/2 -translate-x-1/2 w-[110%] bg-[#1a1a1a] p-2 flex gap-2 overflow-hidden transform -rotate-2 z-20 shadow-ambient-deep">
          <div className="w-16 h-16 bg-[#2a2a2a] shrink-0 overflow-hidden relative">
            <ImagePlaceholder className="w-full h-full opacity-80 filter sepia-[0.8]" />
          </div>
          <div className="w-16 h-16 bg-[#2a2a2a] shrink-0 overflow-hidden relative">
            <ImagePlaceholder className="w-full h-full opacity-80 filter sepia-[0.8]" />
          </div>
          <div className="w-16 h-16 bg-[#2a2a2a] shrink-0 overflow-hidden relative">
            <ImagePlaceholder className="w-full h-full opacity-80 filter sepia-[0.8]" />
          </div>
          <div className="w-16 h-16 bg-[#2a2a2a] shrink-0 overflow-hidden relative">
            <ImagePlaceholder className="w-full h-full opacity-80 filter sepia-[0.8]" />
          </div>
        </div>
      </div>
    </section>
  );
}
