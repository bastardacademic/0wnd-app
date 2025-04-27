import React, { useState } from "react";
import { createJournalEntry } from "@/api/services/journalService";
import { awardXp } from "@/api/services/xpService";
import { applyReward } from "@/api/services/rewardService";

export const JournalEditor = () => {
  const [content, setContent] = useState("");

  async function handleSave() {
    try {
      const saved = await createJournalEntry({ content });
      await awardXp({ receiverId: saved.userId, amount: 5, reason: "Journal Entry", source: "journal", sourceId: saved.id });

      if (saved.rewardId) {
        await applyReward(saved.rewardId, "reward", saved.userId);
      }

      alert("Saved and XP granted!");
      setContent("");
    } catch (err) {
      console.error(err);
      alert("Failed to save journal entry.");
    }
  }

  return (
    <div className="space-y-4">
      <textarea
        className="w-full p-2 bg-neutral-800 rounded"
        placeholder="Write your entry..."
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />
      <button onClick={handleSave} className="bg-green-700 hover:bg-green-600 p-2 rounded">
        Save Entry
      </button>
    </div>
  );
};
