import { cn } from "@/lib/utils";
import React from "react";

interface ImagePlaceholderProps extends React.HTMLAttributes<HTMLDivElement> {
  label?: string;
  width?: string;
  height?: string;
  className?: string;
}

export default function ImagePlaceholder({
  label, // kept for backward compatibility if passed, but not rendered
  className,
  ...props
}: ImagePlaceholderProps) {
  return (
    <div
      className={cn(
        "relative overflow-hidden bg-[#e0dcd9] shadow-[inset_0_2px_10px_rgba(0,0,0,0.1),0_1px_3px_rgba(0,0,0,0.05)]",
        className
      )}
      {...props}
    >
      {/* Film base texture */}
      <div className="absolute inset-0 mix-blend-multiply opacity-20 bg-[url('data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.9%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E')]"></div>
      
      {/* Glossy reflection */}
      <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-[rgba(255,255,255,0.15)] to-transparent pointer-events-none transform -skew-x-12 translate-x-[-100%] transition-transform duration-1000 group-hover:translate-x-[100%]"></div>
      
      {/* Subtle darkening at edges (vignette) */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_50%,rgba(0,0,0,0.15)_150%)] pointer-events-none"></div>
    </div>
  );
}
