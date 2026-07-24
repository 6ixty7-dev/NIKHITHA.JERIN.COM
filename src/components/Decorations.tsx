// Reusable decorative paper elements.
// Every element is a styled React component — no SVG libraries, no icon fonts.
// Compose these directly onto the invitation paper.

import { cn } from "@/lib/utils";
import React from "react";

interface BaseProps {
  className?: string;
  style?: React.CSSProperties;
}

/* ── Washi Tape Strip ── */
interface TapeProps extends BaseProps {
  width?: string;
  angle?: number;
  variant?: "neutral" | "rose" | "gold";
}

export function WashiTape({ className, style, width = "80px", angle = 0, variant = "neutral" }: TapeProps) {
  const variantClass = {
    neutral: "tape",
    rose:    "tape tape-rose",
    gold:    "tape tape-gold",
  }[variant];

  return (
    <div
      className={cn(variantClass, className)}
      style={{ width, transform: `rotate(${angle}deg)`, ...style }}
    />
  );
}

/* ── Paper Clip ── */
interface ClipProps extends BaseProps {
  angle?: number;
}

export function PaperClip({ className, style, angle = 0 }: ClipProps) {
  return (
    <div
      className={cn("paper-clip", className)}
      style={{ transform: `rotate(${angle}deg)`, ...style }}
    />
  );
}

/* ── Coffee Stain ── */
export function CoffeeStain({ className, style }: BaseProps) {
  return <div className={cn("coffee-stain", className)} style={style} />;
}

/* ── Red Thread — vertical ── */
interface ThreadProps extends BaseProps {
  height?: string;
  angle?: number;
}

export function RedThread({ className, style, height = "120px", angle = 2 }: ThreadProps) {
  return (
    <div
      className={cn("red-thread", className)}
      style={{ height, transform: `rotate(${angle}deg)`, ...style }}
    />
  );
}

/* ── Pressed Flower ── */
interface FloraProps extends BaseProps {
  src: string;
  alt?: string;
  size?: string;
  angle?: number;
}

export function PressedFlower({ className, style, src, alt = "", size = "64px", angle = 12 }: FloraProps) {
  return (
    <img
      src={src}
      alt={alt}
      className={cn("pressed-flora select-none pointer-events-none", className)}
      style={{ width: size, height: "auto", transform: `rotate(${angle}deg)`, ...style }}
      draggable={false}
    />
  );
}

/* ── Handwritten margin note ── */
interface NoteProps extends BaseProps {
  children: React.ReactNode;
  angle?: number;
}

export function MarginNote({ className, style, children, angle = 0 }: NoteProps) {
  return (
    <p
      className={cn("margin-note pointer-events-none select-none", className)}
      style={{ transform: `rotate(${angle}deg)`, ...style }}
    >
      {children}
    </p>
  );
}

/* ── Gold rule / ornamental divider ── */
export function GoldRule({ className, style }: BaseProps) {
  return (
    <div className={cn("gold-rule my-4", className)} style={style} />
  );
}

/* ── Tiny hand-drawn heart (SVG) ── */
export function TinyHeart({ className, style }: BaseProps) {
  return (
    <svg
      viewBox="0 0 20 18"
      className={cn("inline-block text-[#c9a0a0] pointer-events-none select-none", className)}
      style={{ width: 14, height: 12, ...style }}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
    >
      <path d="M10,15 C10,15 2,10 2,5.5 A3.5,3.5 0 0,1 10,4 A3.5,3.5 0 0,1 18,5.5 C18,10 10,15 10,15 Z" />
    </svg>
  );
}

/* ── Tiny star ── */
export function TinyStar({ className, style }: BaseProps) {
  return (
    <svg
      viewBox="0 0 12 12"
      className={cn("inline-block pointer-events-none select-none", className)}
      style={{ width: 10, height: 10, fill: "#b8985b", opacity: 0.65, ...style }}
    >
      <polygon points="6,0 7.3,4.2 12,4.2 8.4,6.8 9.7,11 6,8.4 2.3,11 3.6,6.8 0,4.2 4.7,4.2" />
    </svg>
  );
}

/* ── Small arrow (→) ── */
export function SmallArrow({ className, style }: BaseProps) {
  return (
    <svg
      viewBox="0 0 24 10"
      className={cn("inline-block pointer-events-none select-none", className)}
      style={{ width: 22, height: 9, stroke: "#b8985b", fill: "none", opacity: 0.6, ...style }}
      strokeWidth="1.4"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M1,5 L19,5 M13,1 L19,5 L13,9" />
    </svg>
  );
}

/* ── Vintage postage stamp outline ── */
export function VintageStamp({ className, style, children }: BaseProps & { children?: React.ReactNode }) {
  return (
    <div
      className={cn("relative border-2 border-dashed border-[rgba(184,152,91,0.45)] p-2", className)}
      style={{
        background: "rgba(250,248,242,0.7)",
        boxShadow: "inset 0 0 12px rgba(122,92,71,0.06)",
        ...style,
      }}
    >
      {children}
      {/* Perforation dots — top */}
      <div className="absolute -top-[3px] left-0 right-0 flex justify-around pointer-events-none">
        {Array.from({ length: 12 }).map((_, i) => (
          <div key={i} className="w-1 h-1 rounded-full bg-[#d9d0c1]" />
        ))}
      </div>
      {/* Perforation dots — bottom */}
      <div className="absolute -bottom-[3px] left-0 right-0 flex justify-around pointer-events-none">
        {Array.from({ length: 12 }).map((_, i) => (
          <div key={i} className="w-1 h-1 rounded-full bg-[#d9d0c1]" />
        ))}
      </div>
    </div>
  );
}

/* ── QR Code placeholder ── */
export function QRPlaceholder({ className, style }: BaseProps) {
  return (
    <div
      className={cn("relative flex flex-col items-center justify-center gap-2 bg-[#fdfcf8] p-4", className)}
      style={{
        boxShadow: "0 2px 8px rgba(122,92,71,0.10), 0 8px 20px rgba(122,92,71,0.08)",
        ...style,
      }}
    >
      {/* Simulated QR grid */}
      <div
        className="w-20 h-20 grid"
        style={{ gridTemplateColumns: "repeat(7, 1fr)", gap: "2px" }}
      >
        {Array.from({ length: 49 }).map((_, i) => {
          // Corner squares + random fill for QR feel
          const isCornerTL = i < 3 || (i >= 7 && i < 10 && i !== 8) || i === 7 || i === 9;
          const isCornerTR = (i < 7 && i >= 4) || (i >= 14 && i < 17 && i !== 15) || i === 11 || i === 13;
          const filled = isCornerTL || isCornerTR || (Math.sin(i * 2.7) > 0.2);
          return (
            <div
              key={i}
              className={filled ? "bg-[#534342]" : "bg-transparent"}
              style={{ borderRadius: "1px" }}
            />
          );
        })}
      </div>
      <p className="font-label text-[9px] uppercase tracking-[0.15em] text-[#867372] mt-1">
        scan to rsvp
      </p>
    </div>
  );
}

/* ── Doodle Hearts ── */
export function DoodleHeart({ className, style }: BaseProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={cn("inline-block text-[#b63b3b] select-none pointer-events-none", className)}
      style={{ width: 20, height: 20, fill: "none", stroke: "currentColor", strokeWidth: 1.5, ...style }}
    >
      <path d="M12,21 C12,21 3,13 3,7.5 A4.5,4.5 0 0,1 12,5 A4.5,4.5 0 0,1 21,7.5 C21,13 12,21 12,21 Z" />
    </svg>
  );
}

export function DoodleHeartFilled({ className, style }: BaseProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={cn("inline-block text-[#b63b3b] select-none pointer-events-none", className)}
      style={{ width: 18, height: 18, fill: "currentColor", stroke: "currentColor", strokeWidth: 1, ...style }}
    >
      <path d="M12,20.8 C12,20.8 4,13 4,7.8 A4,4 0 0,1 12,5.2 A4,4 0 0,1 20,7.8 C20,13 12,20.8 12,20.8 Z" />
    </svg>
  );
}

/* ── Sketchy Arrow ── */
export function SketchyArrow({ className, style }: BaseProps) {
  return (
    <svg
      viewBox="0 0 50 30"
      className={cn("inline-block text-[#b63b3b] select-none pointer-events-none", className)}
      style={{ width: 44, height: 26, fill: "none", stroke: "currentColor", strokeWidth: 1.8, strokeLinecap: "round", ...style }}
    >
      <path d="M6,22 C14,8 32,5 44,14 M34,18 L44,14 L39,6" />
    </svg>
  );
}

/* ── Paper Corner Mounts ── */
export function PaperCorner({ className, style }: BaseProps) {
  return (
    <div
      className={cn("w-6 h-6 border-t-2 border-l-2 border-[#b8985b]/50 absolute pointer-events-none z-30", className)}
      style={style}
    />
  );
}

/* ── Old Calendar Page ── */
export function CalendarPage({ className, style }: BaseProps) {
  const days = Array.from({ length: 31 }, (_, i) => i + 1);
  return (
    <div
      className={cn("bg-[#fdfcf8] p-4 flex flex-col items-center select-none", className)}
      style={{
        width: 150,
        boxShadow: "0 6px 16px rgba(122,92,71,0.12), 0 1px 3px rgba(122,92,71,0.06)",
        border: "1px solid rgba(210,198,182,0.8)",
        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 128 128' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.03'/%3E%3C/svg%3E")`,
        ...style,
      }}
    >
      <div className="w-full text-center border-b border-[#b63b3b]/30 pb-2 mb-2">
        <p style={{ fontFamily: "var(--font-inter)", fontSize: 8, letterSpacing: "0.22em", textTransform: "uppercase", color: "#b63b3b" }}>
          August 2026
        </p>
      </div>
      <div className="grid grid-cols-7 gap-x-2 gap-y-1 text-center text-[10px] text-[#534342]">
        {/* Day labels */}
        {["S","M","T","W","T","F","S"].map((d, i) => (
          <span key={i} className="font-semibold text-[8px] opacity-40">{d}</span>
        ))}
        {/* Empty cells for Aug 2026 starting on Sat */}
        {Array.from({ length: 5 }).map((_, i) => (
          <span key={i} />
        ))}
        {days.map((day) => {
          const isDate = day === 22;
          return (
            <span
              key={day}
              className="relative flex items-center justify-center w-4 h-4 font-label"
              style={{
                color: isDate ? "#b63b3b" : "inherit",
                fontWeight: isDate ? "bold" : "normal",
              }}
            >
              {day}
              {isDate && (
                /* Red sketchy circle around 22 */
                <svg
                  viewBox="0 0 24 24"
                  className="absolute inset-[-4px] text-[#b63b3b] fill-none stroke-current"
                  strokeWidth="1.5"
                >
                  <path d="M12,2 C6,2 2,7 2,12 C2,17 7,22 13,21 C19,20 22,15 21,10 C20,5 15,2 11,3" />
                </svg>
              )}
            </span>
          );
        })}
      </div>
    </div>
  );
}

/* ── Vintage Wedding Ticket ── */
export function VintageTicket({ className, style }: BaseProps) {
  return (
    <div
      className={cn("bg-[#fbf7f0] border border-dashed border-[#b8985b]/60 relative p-4 flex flex-col justify-between overflow-hidden select-none", className)}
      style={{
        width: 140,
        height: 80,
        boxShadow: "0 4px 10px rgba(122,92,71,0.08)",
        ...style,
      }}
    >
      {/* Side notches */}
      <div className="absolute left-[-8px] top-[calc(50%-8px)] w-4 h-4 rounded-full bg-[#faf8f2] border border-[#b8985b]/40 z-10" />
      <div className="absolute right-[-8px] top-[calc(50%-8px)] w-4 h-4 rounded-full bg-[#faf8f2] border border-[#b8985b]/40 z-10" />
      
      <div className="border-b border-[#b8985b]/25 pb-1 flex justify-between items-center">
        <p style={{ fontFamily: "var(--font-inter)", fontSize: 7, letterSpacing: "0.15em", textTransform: "uppercase", color: "#b8985b" }}>
          Admit One
        </p>
        <span className="text-[8px] font-mono text-[#b8985b]/60">N° 0822</span>
      </div>
      <p style={{ fontFamily: "var(--font-allura)", fontSize: 20, color: "#534342", lineHeight: 1.1, textAlign: "center" }}>
        M + J Celebration
      </p>
      <p style={{ fontFamily: "var(--font-cormorant)", fontSize: 8, letterSpacing: "0.1em", textTransform: "uppercase", color: "rgba(83,67,66,0.6)", textAlign: "center" }}>
        Kumbalanghi, Kochi
      </p>
    </div>
  );
}

