
import React from "react";

interface Props {
  onConfirm: () => void;
  onCancel: () => void;
}

export const DeleteConfirmationModal: React.FC<Props> = ({ onConfirm, onCancel }) => {
  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
      <div className="bg-neutral-900 p-6 rounded-lg w-full max-w-sm">
        <h2 className="text-xl font-bold text-white mb-4">🗑️ Confirm Deletion</h2>
        <p className="text-sm text-neutral-400 mb-4">Are you sure you want to delete this ritual?</p>
        <div className="flex justify-end gap-2">
          <button
            onClick={onCancel}
            className="px-4 py-2 bg-neutral-700 hover:bg-neutral-600 text-sm rounded"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="px-4 py-2 bg-red-600 hover:bg-red-500 text-sm rounded"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};
