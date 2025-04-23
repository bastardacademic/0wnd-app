import React, { useState, useEffect } from "react";
import axios from "axios";

export const EndOfDayPromptPicker = ({ onSelect }) => {
  const [prompts, setPrompts] = useState([]);

  useEffect(() => {
    axios.get("/api/prompts").then(res => {
      const nightly = res.data.filter(p => p.tags.includes("night") || p.tags.includes("reflect"));
      setPrompts(nightly.slice(0, 3));
    });
  }, []);

  return (
    <div className="space-y-2">
      <h3 className="text-white text-lg font-semibold">Pick a prompt</h3>
      {prompts.map(p => (
        <button
          key={p.id}
          className="block w-full bg-neutral-800 text-left p-2 rounded text-white hover:bg-purple-800"
          onClick={() => onSelect(p)}
        >
          {p.text}
        </button>
      ))}
    </div>
  );
};
