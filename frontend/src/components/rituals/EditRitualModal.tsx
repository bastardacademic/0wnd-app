
import React from "react";

interface Props {
  onClose: () => void;
}

export const EditRitualModal: React.FC<Props> = ({ onClose }) => {
  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
      <div className="bg-neutral-900 p-6 rounded-lg w-full max-w-md">
        <h2 className="text-xl font-bold text-white mb-4">🛠️ Edit Ritual</h2>
        <p className="text-sm text-neutral-400 mb-4">This modal is a placeholder for editing rituals.</p>
        <div className="flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-neutral-700 hover:bg-neutral-600 text-sm rounded"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
