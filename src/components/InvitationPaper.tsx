"use client";

import Envelope       from "./Envelope";
import CoverCard      from "./CoverCard";
import MemoryBoard    from "./MemoryBoard";
import DetailsInsert  from "./DetailsInsert";
import ClosingLetter  from "./ClosingLetter";

// ── A delicate paper-fold divider between sections ──
function PaperDivider({ note }: { note?: string }) {
  return (
    <div className="w-full px-8 py-3 flex flex-col items-center gap-1 select-none pointer-events-none">
      <div className="w-full flex items-center gap-2">
        <div style={{ flex: 1, height: 1, background: "linear-gradient(to right, transparent, rgba(122,92,71,0.12))" }} />
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
          <circle cx="7" cy="7" r="2.5" fill="rgba(184,152,91,0.45)" />
          <line x1="7" y1="0" x2="7" y2="14" stroke="rgba(184,152,91,0.25)" strokeWidth="0.8" />
          <line x1="0" y1="7" x2="14" y2="7" stroke="rgba(184,152,91,0.25)" strokeWidth="0.8" />
        </svg>
        <div style={{ flex: 1, height: 1, background: "linear-gradient(to left, transparent, rgba(122,92,71,0.12))" }} />
      </div>
      {note && (
        <p style={{ fontFamily: "var(--font-caveat)", fontSize: 11, color: "rgba(83,67,66,0.3)", letterSpacing: "0.04em" }}>
          {note}
        </p>
      )}
    </div>
  );
}

export default function InvitationPaper() {
  return (
    <div
      className="min-h-screen w-full flex justify-center"
      style={{ background: "#d9d0c1" }}
    >
      {/* ── The paper — continuous ivory sheet ── */}
      <div
        className="relative w-full flex flex-col"
        style={{
          maxWidth: 390,
          background: "#faf8f2",
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.82' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.038'/%3E%3C/svg%3E")`,
          boxShadow: `
            0 0 0 1px rgba(122,92,71,0.04),
            0 4px 16px rgba(122,92,71,0.08),
            0 16px 48px rgba(122,92,71,0.12),
            0 48px 96px rgba(83,67,66,0.14)
          `,
          overflow: "hidden",
        }}
      >
        <Envelope />
        <PaperDivider />
        <CoverCard />
        <PaperDivider note="before the wedding..." />
        <MemoryBoard />
        <PaperDivider />
        <DetailsInsert />
        <PaperDivider />
        <ClosingLetter />
      </div>
    </div>
  );
}
