// src/components/rituals/ScheduleRitualModal.tsx
import React, { useState, useEffect } from "react";
import { createScheduledRitual } from "@/api/services/ritualService";

interface Props {
  onClose: () => void;
  onSuccess: () => void;
}

export const ScheduleRitualModal: React.FC<Props> = ({ onClose, onSuccess }) => {
  const [form, setForm] = useState({
    name: "",
    description: "",
    scheduledFor: "",
  });
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => setVisible(true), 10);
    return () => clearTimeout(timeout);
  }, []);

  const handleSubmit = async () => {
    if (!form.name || !form.scheduledFor) {
      setError("⛔ Name and Date/Time are required.");
      return;
    }

    setSaving(true);
    try {
      await createScheduledRitual(form);
      onSuccess();
      handleClose();
    } catch (err) {
      console.error(err);
      setError("❌ Failed to schedule ritual.");
    } finally {
      setSaving(false);
    }
  };

  const handleClose = () => {
    setVisible(false);
    setTimeout(onClose, 200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
      <div
        className={`transition-all duration-200 transform ${
          visible ? "opacity-100 scale-100" : "opacity-0 scale-95"
        } bg-neutral-900 p-6 rounded-lg shadow-xl w-full max-w-md`}
      >
        <h2 className="text-2xl font-bold mb-4 text-white">📅 Schedule a Ritual</h2>

        <input
          type="text"
          placeholder="Ritual Name"
          className="w-full p-3 rounded bg-neutral-800 mb-3"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
        />
        <textarea
          placeholder="Description (optional)"
          className="w-full p-3 rounded bg-neutral-800 mb-3"
          value={form.description}
          onChange={(e) => setForm({ ...form, description: e.target.value })}
        />
        <input
          type="datetime-local"
          className="w-full p-3 rounded bg-neutral-800 mb-4"
          value={form.scheduledFor}
          onChange={(e) => setForm({ ...form, scheduledFor: e.target.value })}
        />

        {error && <p className="text-red-400 text-sm mb-2">{error}</p>}

        <div className="flex justify-end gap-2">
          <button
            onClick={handleClose}
            className="px-4 py-2 rounded bg-neutral-700 hover:bg-neutral-600 text-sm"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            disabled={saving}
            className="px-4 py-2 rounded bg-green-600 hover:bg-green-500 text-sm disabled:opacity-50"
          >
            {saving ? "Saving..." : "Schedule"}
          </button>
        </div>
      </div>
    </div>
  );
};
