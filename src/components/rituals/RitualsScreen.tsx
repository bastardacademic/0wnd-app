// src/components/rituals/RitualsScreen.tsx

import React, { useEffect, useState } from "react";
import { ProtocolBuilder } from "./ProtocolBuilder";
import { OutcomeEditor } from "./OutcomeEditor";
import { ScheduledRitualsList } from "./ScheduledRitualsList";
import { getAllRituals } from "@/api/services/ritualService";
import type { Ritual } from "@/types/ritual";

export function RitualsScreen() {
  const [rituals, setRituals] = useState<Ritual[]>([]);
  const [selectedRitual, setSelectedRitual] = useState<Ritual | null>(null);

  useEffect(() => {
    getAllRituals()
      .then(setRituals)
      .catch((err) => {
        console.error("Failed to load rituals:", err);
      });
  }, []);

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold text-green-400">📜 Ritual Templates</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4">
          {rituals.length === 0 ? (
            <p className="text-neutral-400">No rituals defined yet.</p>
          ) : (
            rituals.map((ritual) => (
              <div
                key={ritual.id}
                className="p-4 border border-neutral-700 rounded cursor-pointer hover:border-green-500"
                onClick={() => setSelectedRitual(ritual)}
              >
                <h3 className="text-lg font-bold text-white">{ritual.name}</h3>
                <p className="text-sm text-neutral-400">{ritual.description}</p>
              </div>
            ))
          )}
        </div>

        <div>
          <ProtocolBuilder onSave={() => setSelectedRitual(null)} />
        </div>
      </div>

      {selectedRitual && (
        <div className="mt-6">
          <h3 className="text-xl font-medium text-yellow-300">⚙️ Edit Ritual: {selectedRitual.name}</h3>
          <OutcomeEditor ritual={selectedRitual} />
        </div>
      )}

      <div className="mt-8">
        <h3 className="text-xl font-medium text-blue-300">📆 Scheduled Rituals</h3>
        <ScheduledRitualsList />
      </div>
    </div>
  );
}
