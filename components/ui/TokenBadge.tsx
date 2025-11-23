import React, { memo } from "react";
import { Clock, TrendingUp, CheckCircle } from "lucide-react";
import { TokenColumn } from "@/types";

interface TokenBadgeProps {
  children: React.ReactNode;
  type: TokenColumn;
}

export const TokenBadge = memo(({ children, type }: TokenBadgeProps) => {
  const configs = {
    "New pairs": {
      bg: "bg-blue-500/20",
      text: "text-blue-300",
      border: "border-blue-400/30",
      icon: Clock,
    },
    "Final Stretch": {
      bg: "bg-amber-500/20",
      text: "text-amber-300",
      border: "border-amber-400/30",
      icon: TrendingUp,
    },
    Migrated: {
      bg: "bg-green-500/20",
      text: "text-green-300",
      border: "border-green-400/30",
      icon: CheckCircle,
    },
  };

  const config = configs[type];
  const Icon = config.icon;

  return (
    <div
      className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium border backdrop-blur-xl ${config.bg} ${config.text} ${config.border} whitespace-nowrap`}
    >
      <Icon className="w-3 h-3 mr-1.5" />
      {children}
    </div>
  );
});
TokenBadge.displayName = "TokenBadge";
