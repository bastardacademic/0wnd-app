import React from "react";

export const IntensityToggle = ({ selected, onChange }) => {
  const levels = ["soft", "medium", "hard"];
  return (
    <div className="flex space-x-2">
      {levels.map(level => (
        <button
          key={level}
          onClick={() => onChange(level)}
          className={`px-3 py-1 rounded ${
            selected === level ? "bg-purple-600 text-white" : "bg-neutral-800 text-gray-300"
          }`}
        >
          {level}
        </button>
      ))}
    </div>
  );
};
