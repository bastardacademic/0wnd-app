import React, { useState } from "react";
import { createJournalEntry } from "@/api/services/journalService";

export const JournalEditor = () => {
  const [text, setText] = useState("");

  async function handleSave() {
    if (!text.trim()) return;
    try {
      await createJournalEntry({ text });
      alert("Journal entry saved!");
      setText("");
    } catch (error) {
      alert("Failed to save journal entry.");
    }
  }

  return (
    <div className="p-6 text-white max-w-2xl mx-auto space-y-6">
      <h1 className="text-3xl font-bold mb-4">📝 Journal Entry</h1>

      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Write your thoughts here..."
        className="w-full p-4 bg-neutral-800 rounded resize-none h-48 text-base focus:outline-none focus:ring-2 focus:ring-teal-500"
      />

      <button
        onClick={handleSave}
        className="bg-teal-600 hover:bg-teal-500 text-white font-semibold py-2 px-6 rounded transition"
      >
        Save Entry
      </button>
    </div>
  );
};
