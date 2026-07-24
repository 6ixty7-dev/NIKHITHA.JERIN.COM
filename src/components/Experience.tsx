"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Scene1 from "./Scene1";
import Scene2 from "./Scene2";
import Scene3 from "./Scene3";
import Scene4 from "./Scene4";
import Scene5 from "./Scene5";
import Scene6 from "./Scene6";

// Register ScrollTrigger globally
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function Experience() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Basic setup for ScrollTrigger, individual scenes will handle their own animations
    const ctx = gsap.context(() => {
      // Refresh ScrollTrigger in case images load late
      ScrollTrigger.refresh();
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="w-full flex flex-col relative max-w-[390px] mx-auto border-x border-surface-dim/30 shadow-2xl overflow-hidden bg-background">
      {/* Central Spine Alignment Guide / Ribbon */}
      <svg className="absolute top-0 left-1/2 -translate-x-1/2 w-[2px] h-full pointer-events-none z-0 opacity-20" preserveAspectRatio="none" viewBox="0 0 2 100">
        <line x1="1" y1="0" x2="1" y2="100" stroke="var(--color-primary)" strokeWidth="2" strokeDasharray="4 6" />
      </svg>
      
      {/* Header matching design */}
      <header className="sticky top-0 w-full z-40 bg-background/80 backdrop-blur-md bg-white/10 flex justify-between items-center px-page-margin py-4">
        <div className="flex items-center gap-2 text-primary">
          <span className="material-symbols-outlined hover:text-primary-container transition-colors cursor-pointer" data-weight="fill" style={{ fontVariationSettings: "'FILL' 1" }}>menu_book</span>
        </div>
        <div className="font-body-romantic text-body-romantic text-secondary">
          Mary & Jerin
        </div>
        <div className="w-6"></div> {/* Spacer for balance */}
      </header>
      
      <main className="relative w-full pb-32 flex flex-col items-center">
        <Scene1 />
        <Scene2 />
        <Scene3 />
        <Scene4 />
        <Scene5 />
        <Scene6 />
      </main>
    </div>
  );
}
