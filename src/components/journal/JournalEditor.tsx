import React, { useState } from "react";
import axios from "axios";
import { useUser } from "../../context/UserContext";
import { PromptDrawer } from "../prompts/PromptDrawer";

export const JournalEditor = () => {
  const { id } = useUser();
  const [entry, setEntry] = useState({ title: "", mood: "", body: "" });
  const [prompt, setPrompt] = useState(null);

  const handleSubmit = async () => {
    await axios.post("/api/journal", {
      ...entry,
      userId: id,
      createdAt: new Date().toISOString(),
      promptId: prompt?.id
    });
    setEntry({ title: "", mood: "", body: "" });
    alert("Journal entry submitted");
  };

  return (
    <div className="space-y-4 p-4">
      <PromptDrawer onUsePrompt={setPrompt} />

      {prompt && (
        <div className="text-sm text-purple-300">
          Responding to: <span className="italic">{prompt.text}</span>
        </div>
      )}

      <input
        className="w-full p-2 bg-neutral-800 text-white rounded"
        placeholder="Title"
        value={entry.title}
        onChange={(e) => setEntry({ ...entry, title: e.target.value })}
      />
      <input
        className="w-full p-2 bg-neutral-800 text-white rounded"
        placeholder="Mood"
        value={entry.mood}
        onChange={(e) => setEntry({ ...entry, mood: e.target.value })}
      />
      <textarea
        className="w-full p-2 bg-neutral-800 text-white rounded h-40"
        placeholder="Write your thoughts..."
        value={entry.body}
        onChange={(e) => setEntry({ ...entry, body: e.target.value })}
      />
      <button
        onClick={handleSubmit}
        className="px-4 py-2 bg-purple-700 text-white rounded"
      >
        Submit
      </button>
    </div>
  );
};
