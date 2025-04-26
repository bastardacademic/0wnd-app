import React, { useState } from "react";
import axios from "axios";
import { useUser } from "../../context/UserContext";

export const PromptDrawer = ({ prompt, onClose }) => {
  const { id } = useUser();
  const [response, setResponse] = useState("");

  const saveResponse = () => {
    if (!response.trim()) return;
    axios.post("/api/promptResponses", { userId: id, promptId: prompt.id, response, createdAt: new Date().toISOString() })
      .then(() => {
        setResponse("");
        onClose();
      });
  };

  return (
    <div className="bg-neutral-900 p-4 rounded space-y-4">
      <h2 className="text-lg font-bold text-white text-center">💬 {prompt.text}</h2>
      <textarea
        value={response}
        onChange={e => setResponse(e.target.value)}
        placeholder="Write your reflection..."
        className="w-full p-3 bg-neutral-800 rounded min-h-[150px]"
      />
      <button
        onClick={saveResponse}
        className="w-full p-3 bg-purple-700 hover:bg-purple-600 text-white rounded min-h-[44px]"
      >Submit Response</button>
      <button
        onClick={onClose}
        className="w-full p-2 bg-neutral-700 hover:bg-neutral-600 text-white rounded"
      >Cancel</button>
    </div>
  );
};
