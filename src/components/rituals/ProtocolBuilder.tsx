import React, { useState } from "react";
import { createRitualTemplate } from "@/api/services/ritualService";
import { applyReward } from "@/api/services/rewardService";
import { awardXp } from "@/api/services/xpService";

export const ProtocolBuilder = () => {
  const [ritual, setRitual] = useState({ name: "", description: "", rewards: {} });

  async function handleSave() {
    try {
      const savedRitual = await createRitualTemplate(ritual);

      // Simulate completion outcome (normally would come from user action later)
      const outcome = "onTime"; // Placeholder: "onTime", "late", or "missed"
      const rewardId = ritual.rewards?.[outcome];

      if (rewardId) {
        await applyReward(rewardId, "ritual", savedRitual.id);
      }

      await awardXp({
        receiverId: savedRitual.userId,
        amount: 15,
        reason: `Ritual Completed (${outcome})`,
        source: "ritual",
        sourceId: savedRitual.id,
      });

      alert("Ritual saved and outcome rewards triggered!");
    } catch (err) {
      console.error(err);
      alert("Failed to save ritual.");
    }
  }

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold">Create a Ritual Protocol</h2>
      <input
        type="text"
        value={ritual.name}
        onChange={(e) => setRitual({ ...ritual, name: e.target.value })}
        placeholder="Name your ritual..."
        className="w-full p-2 rounded bg-neutral-800"
      />
      <textarea
        value={ritual.description}
        onChange={(e) => setRitual({ ...ritual, description: e.target.value })}
        placeholder="Describe the ritual..."
        className="w-full p-2 rounded bg-neutral-800"
        rows={4}
      />
      <button onClick={handleSave} className="bg-indigo-700 hover:bg-indigo-600 py-2 px-4 rounded">
        Save Ritual
      </button>
    </div>
  );
};
