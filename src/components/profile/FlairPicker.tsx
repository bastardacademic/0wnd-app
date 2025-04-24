import React from "react";

export const FlairPicker = ({ flair, setFlair }) => (
  <div className="space-y-2">
    <label className="text-white font-semibold">Flair</label>
    <input
      value={flair}
      onChange={e => setFlair(e.target.value)}
      placeholder="e.g. Submissive Kitten"
      className="w-full p-2 rounded bg-neutral-800 text-white"
    />
  </div>
);
