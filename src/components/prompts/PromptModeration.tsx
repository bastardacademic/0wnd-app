import React, { useEffect, useState } from "react";
import axios from "axios";

export const PromptModeration = () => {
  const [prompts, setPrompts] = useState([]);

  useEffect(() => {
    axios.get("/api/prompts").then(res => setPrompts(res.data));
  }, []);

  const approvePrompt = (id) => {
    alert(`✅ Prompt ${id} approved`);
    // Extend this to persist moderation state later
  };

  const rejectPrompt = (id) => {
    alert(`❌ Prompt ${id} rejected`);
    setPrompts(prompts.filter(p => p.id !== id));
  };

  return (
    <div className="p-4 text-white space-y-4">
      <h2 className="text-xl font-bold">Moderate Prompts</h2>
      {prompts.map((p) => (
        <div key={p.id} className="bg-neutral-800 p-4 rounded space-y-2">
          <div>{p.text}</div>
          <div className="text-sm text-gray-400">Tags: {p.tags?.join(", ")}</div>
          <div className="flex gap-2">
            <button onClick={() => approvePrompt(p.id)} className="bg-green-700 px-3 py-1 rounded text-sm">Approve</button>
            <button onClick={() => rejectPrompt(p.id)} className="bg-red-700 px-3 py-1 rounded text-sm">Reject</button>
          </div>
        </div>
      ))}
    </div>
  );
};
