import React from "react";

export const LevelBadge = ({ label }) => {
  return (
    <span className="inline-block px-2 py-1 text-xs font-semibold rounded bg-purple-800 text-white">
      {label}
    </span>
  );
};
