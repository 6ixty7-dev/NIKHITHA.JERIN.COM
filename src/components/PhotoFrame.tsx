import { cn } from "@/lib/utils";

type FrameVariant = "polaroid" | "vintage" | "filmframe" | "corner-mount" | "torn-paper" | "instant" | "postcard";
type PhotoTint = "sepia" | "warm" | "aged" | "natural";

interface PhotoFrameProps {
  variant?: FrameVariant;
  className?: string;
  caption?: string;
  tint?: PhotoTint;
  style?: React.CSSProperties;
  src?: string;
  alt?: string;
  zoom?: number;  // e.g. 1.3 = zoomed 30% in
}

const tintFilters: Record<PhotoTint, string> = {
  sepia:   "sepia-[0.45] contrast-[0.88] brightness-[1.04]",
  warm:    "sepia-[0.20] contrast-[0.92] brightness-[1.02]",
  aged:    "sepia-[0.60] contrast-[0.82] brightness-[0.97]",
  natural: "",
};

export default function PhotoFrame({
  variant = "polaroid",
  className,
  caption,
  tint = "warm",
  style,
  src,
  alt = "photo",
  zoom = 1,
}: PhotoFrameProps) {
  const tintClass = tintFilters[tint];

  const PhotoSurface = () => (
    <div className={cn("relative w-full h-full overflow-hidden", tintClass)}>
      {src ? (
        // Real photo
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={src}
          alt={alt}
          className="w-full h-full object-cover"
          style={{
            filter: tint === "natural" ? "none" : tint === "aged" ? "sepia(0.45) contrast(0.88) brightness(1.0)" : tint === "sepia" ? "sepia(0.55)" : "sepia(0.15) brightness(1.02)",
            transform: `scale(${zoom})`,
            transformOrigin: "center center",
          }}
        />
      ) : (
        // Placeholder surface
        <div className={cn("w-full h-full photo-surface", tintClass)}>
          {/* Glossy sheen */}
          <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/[0.08] to-white/[0.15] pointer-events-none z-10" />
          {/* Noise filter */}
          <div
            className="absolute inset-0 z-20 opacity-[0.15] mix-blend-overlay pointer-events-none"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.92' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
            }}
          />
        </div>
      )}
      {/* Glossy sheen overlay for real photos */}
      {src && <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/[0.04] to-white/[0.08] pointer-events-none z-10" />}
    </div>
  );

  if (variant === "polaroid") {
    return (
      <div
        className={cn("photo-polaroid flex flex-col", className)}
        style={{
          boxShadow: "0 8px 24px rgba(83,67,66,0.12), 0 2px 6px rgba(83,67,66,0.08)",
          ...style,
        }}
      >
        <div className="flex-1 min-h-0">
          <PhotoSurface />
        </div>
        {caption && (
          <div className="pt-2 pb-1 text-center w-full">
            <span
              className="text-[13px] text-[#7a5c47] font-medium block"
              style={{ fontFamily: "var(--font-caveat)" }}
            >
              {caption}
            </span>
          </div>
        )}
      </div>
    );
  }

  if (variant === "vintage") {
    return (
      <div
        className={cn("photo-vintage p-2", className)}
        style={{
          boxShadow: "0 10px 30px rgba(83,67,66,0.16), 0 3px 8px rgba(83,67,66,0.1)",
          ...style,
        }}
      >
        {/* Corner mount marks */}
        <div className="absolute top-1 left-1 w-3 h-3 border-t-2 border-l-2 border-[#b8985b]/40 z-30" />
        <div className="absolute top-1 right-1 w-3 h-3 border-t-2 border-r-2 border-[#b8985b]/40 z-30" />
        <div className="absolute bottom-1 left-1 w-3 h-3 border-b-2 border-l-2 border-[#b8985b]/40 z-30" />
        <div className="absolute bottom-1 right-1 w-3 h-3 border-b-2 border-r-2 border-[#b8985b]/40 z-30" />
        <div className="w-full h-full">
          <PhotoSurface />
        </div>
        {caption && (
          <p
            className="text-center mt-2 text-[12px] text-[#867372] italic font-medium"
            style={{ fontFamily: "var(--font-caveat)" }}
          >
            {caption}
          </p>
        )}
      </div>
    );
  }

  if (variant === "torn-paper") {
    return (
      <div
        className={cn("relative p-3 bg-[#fdfcf8] overflow-hidden", className)}
        style={{
          boxShadow: "0 8px 20px rgba(122,92,71,0.12)",
          clipPath: "polygon(2% 2%, 97% 1%, 99% 98%, 1% 97%, 3% 50%)",
          ...style,
        }}
      >
        <div className="w-full h-full border border-dashed border-[#d9d0c1] p-1">
          <PhotoSurface />
        </div>
      </div>
    );
  }

  if (variant === "instant") {
    return (
      <div
        className={cn("bg-[#f7f5ef] p-3 pb-8 relative", className)}
        style={{
          boxShadow: "0 12px 36px rgba(83,67,66,0.14), 0 2px 8px rgba(83,67,66,0.08)",
          border: "1px solid rgba(220,208,192,0.6)",
          ...style,
        }}
      >
        <div className="w-full h-full border border-[rgba(83,67,66,0.06)] overflow-hidden">
          <PhotoSurface />
        </div>
        {caption && (
          <div className="absolute bottom-2 left-0 w-full text-center">
            <span
              className="text-[14px] text-[#7a5c47]"
              style={{ fontFamily: "var(--font-caveat)" }}
            >
              {caption}
            </span>
          </div>
        )}
      </div>
    );
  }

  if (variant === "postcard") {
    return (
      <div
        className={cn("bg-[#fdfcf8] p-4 relative flex flex-col justify-between", className)}
        style={{
          boxShadow: "0 10px 28px rgba(122,92,71,0.14)",
          border: "1px solid rgba(210,198,182,0.8)",
          ...style,
        }}
      >
        <div className="w-full aspect-[4/3] overflow-hidden mb-3">
          <PhotoSurface />
        </div>
        <div className="border-t border-[#d9d0c1] pt-3 flex justify-between items-end">
          <div className="flex flex-col gap-1 w-2/3">
            <div className="h-1 bg-[#e8e3d8] w-full" />
            <div className="h-1 bg-[#e8e3d8] w-4/5" />
            <div className="h-1 bg-[#e8e3d8] w-3/5" />
          </div>
          {/* Stamp box */}
          <div className="w-8 h-10 border border-dashed border-[#b8985b] flex items-center justify-center text-[7px] text-[#b8985b] font-label uppercase">
            Stamp
          </div>
        </div>
      </div>
    );
  }

  if (variant === "filmframe") {
    return (
      <div className={cn("film-frame", className)} style={style}>
        <PhotoSurface />
      </div>
    );
  }

  return (
    <div className={cn("relative p-1 bg-[#fdfcf8]", className)} style={style}>
      <div className="absolute top-0 left-0 w-4 h-4 bg-[#7a5c47]/15 z-30 [clip-path:polygon(0_0,100%_0,0_100%)]" />
      <div className="absolute top-0 right-0 w-4 h-4 bg-[#7a5c47]/15 z-30 [clip-path:polygon(100%_0,100%_100%,0_0)]" />
      <div className="absolute bottom-0 left-0 w-4 h-4 bg-[#7a5c47]/15 z-30 [clip-path:polygon(0_0,100%_100%,0_100%)]" />
      <div className="absolute bottom-0 right-0 w-4 h-4 bg-[#7a5c47]/15 z-30 [clip-path:polygon(100%_0,0_100%,100%_100%)]" />
      <div className="w-full h-full overflow-hidden">
        <PhotoSurface />
      </div>
      {caption && (
        <div className="absolute -bottom-5 left-0 w-full text-center">
          <span
            className="text-[12px] text-[#867372]"
            style={{ fontFamily: "var(--font-caveat)" }}
          >
            {caption}
          </span>
        </div>
      )}
    </div>
  );
}
