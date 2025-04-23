import React, { useEffect, useState } from "react";
import axios from "axios";

export const PromptLibrary = () => {
  const [prompts, setPrompts] = useState([]);

  useEffect(() => {
    axios.get("/api/prompts").then(res => setPrompts(res.data));
  }, []);

  return (
    <div className="p-4 space-y-2">
      <h2 className="text-xl font-bold">Community Prompts</h2>
      <ul className="space-y-2">
        {prompts.map((p) => (<>
        <div className="text-sm text-purple-400">Category: {p.category || "uncategorised"}</div>
          <li key={p.id} className="p-3 bg-neutral-800 rounded-lg text-white">
            {p.text} <span className="text-sm text-gray-400">[{p.tags.join(", ")}]</span>
          </li>
        ))}
      </ul>
    </div>
  );
};
