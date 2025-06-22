// src/components/rituals/ScheduledRitualsList.tsx

import React, { useContext, useEffect, useState } from "react";
import {
   getScheduledRituals,
   completeRitual as updateScheduledRitualStatus,
 } from "@/api/services/ritualService";
// if you need a delete, you can call axios directly:
import axios from "axios";

const deleteScheduledRitual = (id: string) =>
  axios.delete(`${import.meta.env.VITE_API_URL}/schedules/${id}`);

import { format } from "date-fns";
import { UserContext } from "@/context/UserContext";
import { ScheduleRitualModal } from "./ScheduleRitualModal";

interface ScheduledRitual {
  id: string;
  name: string;
  description: string;
  scheduledFor: string;
  status: "pending" | "completed" | "missed";
}

export const ScheduledRitualsList = () => {
  const [rituals, setRituals] = useState<ScheduledRitual[]>([]);
  const [loading, setLoading] = useState(true);
  const [toast, setToast] = useState<string | null>(null);
  const [showScheduleModal, setShowScheduleModal] = useState(false);
  const { user } = useContext(UserContext);

  useEffect(() => {
    fetchRituals();
  }, []);

  async function fetchRituals() {
    try {
      setLoading(true);
      const data = await getScheduledRituals();
      setRituals(data);
    } catch (err) {
      console.error("Failed to fetch rituals:", err);
      showToast("❌ Failed to fetch rituals.");
    } finally {
      setLoading(false);
    }
  }

  function showToast(message: string) {
    setToast(message);
    setTimeout(() => setToast(null), 3000);
  }

  const markCompleted = async (id: string) => {
    await updateScheduledRitualStatus(id, "completed");
    setRituals((prev) => prev.map((r) => (r.id === id ? { ...r, status: "completed" } : r)));
    showToast("✅ Ritual marked as completed.");
  };

  const handleDelete = async (id: string) => {
    await deleteScheduledRitual(id);
    setRituals((prev) => prev.filter((r) => r.id !== id));
    showToast("🗑️ Ritual deleted.");
  };

  const reschedule = (id: string) => {
    showToast("🔁 Reschedule feature coming soon.");
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold text-white">📆 Scheduled Rituals</h2>
        {user?.role === "Dom" && (
          <button
            onClick={() => setShowScheduleModal(true)}
            className="px-4 py-2 bg-teal-600 hover:bg-teal-500 rounded text-sm"
          >
            ➕ Add Ritual
          </button>
        )}
      </div>

      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {[...Array(3)].map((_, i) => (
            <div
              key={i}
              className="p-6 rounded-lg shadow-lg bg-neutral-900 border border-neutral-700 animate-pulse space-y-4"
            >
              <div className="h-6 bg-neutral-700 rounded w-1/2" />
              <div className="h-4 bg-neutral-700 rounded w-full" />
              <div className="h-4 bg-neutral-700 rounded w-2/3" />
              <div className="h-4 bg-neutral-700 rounded w-1/4" />
            </div>
          ))}
        </div>
      ) : rituals.length === 0 ? (
        <p className="text-neutral-400">📭 No rituals scheduled.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {rituals.map((ritual) => (
            <div
              key={ritual.id}
              className={`p-6 rounded-lg shadow-lg transition-all duration-200 bg-neutral-900 border ${
                ritual.status === "completed"
                  ? "border-green-500"
                  : ritual.status === "missed"
                  ? "border-red-500"
                  : "border-neutral-700 hover:border-teal-500"
              }`}
            >
              <h3 className="text-xl font-semibold mb-1">{ritual.name}</h3>
              <p className="text-sm text-gray-400 mb-2">{ritual.description}</p>
              <p className="text-sm">
                📅 Scheduled For:{" "}
                <span className="text-white">{format(new Date(ritual.scheduledFor), "PPpp")}</span>
              </p>
              <p className="text-sm mt-1">
                ⏱️ Status:{" "}
                <span
                  className={`font-bold ${
                    ritual.status === "completed"
                      ? "text-green-400"
                      : ritual.status === "missed"
                      ? "text-red-400"
                      : "text-yellow-400"
                  }`}
                >
                  {ritual.status.toUpperCase()}
                </span>
              </p>

              {user?.role === "Dom" && (
                <div className="flex flex-wrap gap-2 mt-4">
                  {ritual.status !== "completed" && (
                    <button
                      onClick={() => markCompleted(ritual.id)}
                      className="px-4 py-1 bg-green-600 hover:bg-green-500 rounded text-sm"
                    >
                      ✅ Mark Completed
                    </button>
                  )}
                  <button
                    onClick={() => reschedule(ritual.id)}
                    className="px-4 py-1 bg-blue-600 hover:bg-blue-500 rounded text-sm"
                  >
                    🔁 Reschedule
                  </button>
                  <button
                    onClick={() => handleDelete(ritual.id)}
                    className="px-4 py-1 bg-red-600 hover:bg-red-500 rounded text-sm"
                  >
                    ❌ Delete
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Toast */}
      {toast && (
        <div className="fixed bottom-6 right-6 bg-neutral-800 text-white px-4 py-2 rounded shadow-lg animate-fadeIn">
          {toast}
        </div>
      )}

      {/* Schedule Modal */}
      {showScheduleModal && (
        <ScheduleRitualModal
          onClose={() => setShowScheduleModal(false)}
          onSuccess={() => {
            fetchRituals();
            showToast("📌 Ritual scheduled.");
          }}
        />
      )}
    </div>
  );
};
