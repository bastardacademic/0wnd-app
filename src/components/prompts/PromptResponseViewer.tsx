import { useState } from "react";
import { submitPromptResponse } from "@/api/services/promptService";

export const PromptResponseViewer = ({ selectedPrompt }) => {
  const [response, setResponse] = useState("");
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");

  async function handleSubmit() {
    if (!selectedPrompt) return;

    if (!response.trim()) {
      setMessage("? Please write a response first.");
      return;
    }

    setSaving(true);
    try {
      await submitPromptResponse(selectedPrompt.id, response);
      setResponse("");
      setMessage("? Response saved!");
    } catch (error) {
      console.error(error);
      setMessage("? Failed to save response.");
    } finally {
      setSaving(false);
      setTimeout(() => setMessage(""), 3000);
    }
  }

  if (!selectedPrompt) {
    return <div className="text-center text-neutral-400">Pick a prompt first...</div>;
  }

  return (
    <div className="space-y-4">
      <div className="text-xl font-bold text-white">{selectedPrompt.text}</div>

      <textarea
        value={response}
        onChange={(e) => setResponse(e.target.value)}
        placeholder="Your thoughts, feelings, desires..."
        className="w-full p-3 rounded bg-neutral-800 resize-none"
        rows={6}
      />

      <div className="flex items-center gap-4">
        <button
          onClick={handleSubmit}
          disabled={saving}
          className="bg-blue-600 hover:bg-blue-500 px-6 py-2 rounded disabled:opacity-50"
        >
          {saving ? "Submitting..." : "Submit Response"}
        </button>

        {message && <span className="text-sm">{message}</span>}
      </div>
    </div>
  );
};
