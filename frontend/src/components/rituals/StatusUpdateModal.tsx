
import React from "react";

interface Props {
  onClose: () => void;
  onUpdate: (status: string) => void;
}

export const StatusUpdateModal: React.FC<Props> = ({ onClose, onUpdate }) => {
  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
      <div className="bg-neutral-900 p-6 rounded-lg w-full max-w-sm">
        <h2 className="text-xl font-bold text-white mb-4">🔄 Update Status</h2>
        <div className="flex flex-col gap-2">
          <button
            onClick={() => onUpdate("completed")}
            className="px-4 py-2 bg-green-600 hover:bg-green-500 text-sm rounded"
          >
            ✅ Mark as Completed
          </button>
          <button
            onClick={() => onUpdate("missed")}
            className="px-4 py-2 bg-red-600 hover:bg-red-500 text-sm rounded"
          >
            ❌ Mark as Missed
          </button>
          <button
            onClick={onClose}
            className="px-4 py-2 bg-neutral-700 hover:bg-neutral-600 text-sm rounded"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};
