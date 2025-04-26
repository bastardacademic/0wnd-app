import React from "react";

export const PromptResponseViewer = ({ prompt, responses }) => {
  return (
    <div className="bg-neutral-900 p-4 rounded space-y-4">
      <h2 className="text-lg font-bold text-white text-center">📜 {prompt.text}</h2>
      <div className="space-y-3">
        {responses.map((r) => (
          <div key={r.id} className="p-3 bg-neutral-800 rounded text-white">
            {r.response}
            <div className="text-xs text-right text-neutral-400 mt-1">
              {new Date(r.createdAt).toLocaleDateString()}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
