import React, { useState } from "react";
import axios from "axios";
import { useUser } from "../../context/UserContext";

export const JournalEditor = () => {
  const { id } = useUser();
  const [content, setContent] = useState("");

  const saveEntry = () => {
    if (!content.trim()) return;
    axios.post("/api/journal", { userId: id, content, createdAt: new Date().toISOString() })
      .then(() => setContent(""));
  };

  return (
    <div className="bg-neutral-900 p-4 rounded space-y-4">
      <h2 className="text-lg font-bold text-white">🖋️ New Journal Entry</h2>
      <textarea
        value={content}
        onChange={e => setContent(e.target.value)}
        placeholder="Reflect, confess, celebrate..."
        className="w-full p-3 bg-neutral-800 rounded min-h-[150px]"
      />
      <button
        onClick={saveEntry}
        className="w-full p-3 bg-purple-700 hover:bg-purple-600 text-white rounded min-h-[44px]"
      >Save Entry</button>
    </div>
  );
};
