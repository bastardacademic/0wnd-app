import React from "react";

export function DevotionLevelBadge({ xp }: { xp: number }) {
  let level = "Newcomer";

  if (xp >= 1000) level = "Master";
  else if (xp >= 500) level = "Veteran";
  else if (xp >= 250) level = "Experienced";
  else if (xp >= 100) level = "Initiate";

  return (
    <div className="inline-block px-4 py-2 rounded-full bg-purple-700 text-white font-bold">
      {level}
    </div>
  );
}
