import React from "react";

function xpToLevel(xp: number): string {
  if (xp >= 1000) return "Master";
  if (xp >= 500) return "Veteran";
  if (xp >= 250) return "Experienced";
  if (xp >= 100) return "Initiate";
  return "Newcomer";
}

export function DevotionLevelBadge({ xp, level }: { xp?: number; level?: string }) {
  const label = level ?? (xp !== undefined ? xpToLevel(xp) : "Newcomer");
  return (
    <div className="inline-block px-4 py-2 rounded-full bg-purple-700 text-white font-bold text-sm">
      {label}
    </div>
  );
}
