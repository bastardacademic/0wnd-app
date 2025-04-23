import React, { useEffect, useState } from "react";
import axios from "axios";

export const PromptResponses = () => {
  const [responses, setResponses] = useState([]);

  useEffect(() => {
    async function loadResponses() {
      const res = await axios.get("/api/journal");
      const withPrompts = res.data.filter(e => e.promptId);
      const promptRes = await axios.get("/api/prompts");
      const promptsById = Object.fromEntries(promptRes.data.map(p => [p.id, p.text]));

      const enriched = withPrompts.map(e => ({
        ...e,
        promptText: promptsById[e.promptId] || "(deleted prompt)"
      }));

      setResponses(enriched);
    }

    loadResponses();
  }, []);

  return (
    <div className="p-4 space-y-4">
      <h2 className="text-xl font-bold text-white">Prompt Responses</h2>
      {responses.map((r) => (
        <div key={r.id} className="p-4 bg-neutral-800 rounded-lg text-white space-y-2">
          <div className="text-purple-300 italic">Prompt: {r.promptText}</div>
          <div className="text-sm text-gray-400">{new Date(r.createdAt).toLocaleString()}</div>
          <div className="whitespace-pre-wrap">{r.body}</div>
        </div>
      ))}
    </div>
  );
};
