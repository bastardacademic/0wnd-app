import React, { useEffect, useState } from "react";

export const PromptDrawer = () => {
  const [prompts, setPrompts] = useState<any[]>([]);

  useEffect(() => {
    async function fetchPrompts() {
      const res = await fetch("/api/prompts");
      const data = await res.json();
      setPrompts(Array.isArray(data) ? data : []);
    }
    fetchPrompts();
  }, []);

  return (
    <div className="p-4 text-white">
      <h1 className="text-2xl font-bold mb-4">Choose a Prompt:</h1>
      {prompts.length === 0 ? (
        <div>No prompts found.</div>
      ) : (
        <ul className="space-y-2">
          {prompts.map((p) => (
            <li key={p.id} className="bg-neutral-800 p-3 rounded">
              {p.text}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
