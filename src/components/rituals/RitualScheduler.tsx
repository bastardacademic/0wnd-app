import React, { useState } from "react";
import axios from "axios";
import { useUser } from "../../context/UserContext";

export const RitualScheduler = () => {
  const { id } = useUser();
  const [name, setName] = useState("");
  const [frequency, setFrequency] = useState("daily");

  const saveRitual = () => {
    if (!name.trim()) return;
    axios.post("/api/ritual", { userId: id, name, frequency, createdAt: new Date().toISOString() })
      .then(() => {
        setName("");
        setFrequency("daily");
      });
  };

  return (
    <div className="bg-neutral-900 p-4 rounded space-y-4">
      <h2 className="text-lg font-bold text-white">🔮 Schedule a Ritual</h2>
      <input
        type="text"
        value={name}
        onChange={e => setName(e.target.value)}
        placeholder="Ritual Name"
        className="w-full p-3 bg-neutral-800 rounded"
      />
      <select
        value={frequency}
        onChange={e => setFrequency(e.target.value)}
        className="w-full p-3 bg-neutral-800 rounded"
      >
        <option value="daily">Daily</option>
        <option value="weekly">Weekly</option>
      </select>
      <button
        onClick={saveRitual}
        className="w-full p-3 bg-purple-700 hover:bg-purple-600 text-white rounded min-h-[44px]"
      >Save Ritual</button>
    </div>
  );
};
