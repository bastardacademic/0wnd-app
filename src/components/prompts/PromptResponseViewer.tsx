import React, { useState } from "react";
import { submitPromptResponse } from "@/api/services/promptService";
import { awardXp } from "@/api/services/xpService";
import { applyReward } from "@/api/services/rewardService";

export const PromptResponseViewer = ({ selectedPrompt }) => {
  const [response, setResponse] = useState("");

  async function handleSubmit() {
    if (!selectedPrompt) return;

    try {
      const result = await submitPromptResponse(selectedPrompt.id, response);
      await awardXp({ receiverId: result.userId, amount: 10, reason: "Prompt Response", source: "prompt", sourceId: selectedPrompt.id });

      if (result.rewardId) {
        await applyReward(result.rewardId, "reward", result.userId);
      }

      alert("Response saved! XP awarded!");
      setResponse("");
    } catch (err) {
      console.error(err);
      alert("Failed to submit response.");
    }
  }

  if (!selectedPrompt) return <div>Select a prompt...</div>;

  return (
    <div className="space-y-4">
      <h3 className="text-xl font-bold">{selectedPrompt.text}</h3>
      <textarea
        value={response}
        onChange={(e) => setResponse(e.target.value)}
        placeholder="Your response..."
        className="w-full p-3 rounded bg-neutral-800"
        rows={5}
      />
      <button onClick={handleSubmit} className="bg-green-700 hover:bg-green-600 py-2 px-4 rounded">
        Submit Response
      </button>
    </div>
  );
};
