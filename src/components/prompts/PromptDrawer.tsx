import React, { useEffect, useState } from "react";
import { fetchPrompts } from "@/api/services/promptService";

export const PromptDrawer = ({ onSelectPrompt }) => {
  const [prompts, setPrompts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadPrompts() {
      try {
        const data = await fetchPrompts();
        setPrompts(data);
      } catch (error) {
        console.error("Failed to fetch prompts", error);
      } finally {
        setLoading(false);
      }
    }
    loadPrompts();
  }, []);

  if (loading) {
    return <div className="text-center py-10 text-gray-400">Loading prompts...</div>;
  }

  return (
    <div className="p-6 space-y-4">
      <h2 className="text-2xl font-bold text-center">Select a Prompt</h2>
      <ul className="space-y-2">
        {Array.isArray(prompts) && prompts.length > 0 ? (
          prompts.map((prompt) => (
            <li key={prompt.id}>
              <button
                onClick={() => onSelectPrompt(prompt)}
                className="w-full bg-neutral-700 hover:bg-neutral-600 text-white rounded p-3 text-left transition-colors"
              >
                {prompt.text}
              </button>
            </li>
          ))
        ) : (
          <li className="text-center text-gray-400">No prompts available.</li>
        )}
      </ul>
    </div>
  );
};
