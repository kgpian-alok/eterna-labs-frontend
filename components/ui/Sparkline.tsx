import React, { memo } from "react";

interface SparklineProps {
  path: string;
  color: "green" | "red";
}

export const Sparkline = memo(({ path, color }: SparklineProps) => (
  <svg viewBox="0 0 100 30" className="w-24 h-8">
    <path
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      d={path}
      className={color === "green" ? "text-green-500" : "text-red-500"}
    />
  </svg>
));
Sparkline.displayName = "Sparkline";
