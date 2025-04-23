import React from "react";

export const TagSelector = ({ selected, onChange }) => {
  const tags = ["posture", "worship", "obedience", "service"];
  const toggle = (tag) => {
    if (selected.includes(tag)) {
      onChange(selected.filter(t => t !== tag));
    } else {
      onChange([...selected, tag]);
    }
  };
  return (
    <div className="flex flex-wrap gap-2">
      {tags.map(tag => (
        <button
          key={tag}
          onClick={() => toggle(tag)}
          className={`px-2 py-1 rounded border ${
            selected.includes(tag) ? "bg-purple-600 text-white" : "bg-neutral-800 text-gray-300"
          }`}
        >
          {tag}
        </button>
      ))}
    </div>
  );
};
