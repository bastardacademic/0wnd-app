import React, { useEffect, useState } from "react";
import axios from "axios";

export const PromptDrawer = ({ onUsePrompt }) => {
  const [prompts, setPrompts] = useState([]);
  const [current, setCurrent] = useState(null);

  useEffect(() => {
    async function loadPrompts() {
      const res = await axios.get("/api/prompts");
      setPrompts(res.data);
      pickRandom(res.data);
    }
    loadPrompts();
  }, []);

  const pickRandom = (list = prompts) => {
    const p = list[Math.floor(Math.random() * list.length)];
    setCurrent(p);
  };

  if (!current) return <p className="text-gray-400">Loading prompt...</p>;

  return (
    <div className="bg-neutral-900 p-4 rounded space-y-2 text-white">
      <h3 className="text-lg font-bold">Prompt of the Moment</h3>
      <p className="italic">{current.text}</p>
      <div className="text-sm text-gray-400">Tags: {current.tags?.join(", ")}</div>
      <div className="flex gap-4 mt-2">
        <button
          onClick={() => pickRandom()}
          className="px-3 py-1 bg-neutral-700 rounded"
        >
          New Prompt
        </button>
        <button
          onClick={() => onUsePrompt?.(current)}
          className="px-3 py-1 bg-purple-700 text-white rounded"
        >
          Use This Prompt
        </button>
      </div>
    </div>
  );
};
