import React from "react";

export const MoodSelector = ({ selected, onChange }) => {
  const moods = ["happy", "neutral", "sad", "angry"];
  return (
    <div className="flex space-x-2">
      {moods.map((mood) => (
        <button
          key={mood}
          onClick={() => onChange(mood)}
          className={`px-3 py-1 rounded-lg ${
            selected === mood ? "bg-purple-600 text-white" : "bg-neutral-800 text-gray-300"
          }`}
        >
          {mood}
        </button>
      ))}
    </div>
  );
};
