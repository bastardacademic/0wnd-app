import React, { useEffect, useState } from "react";
import axios from "axios";
import { useUser } from "../../context/UserContext";

export const RitualList = () => {
  const { id } = useUser();
  const [rituals, setRituals] = useState([]);
  const [submitted, setSubmitted] = useState({});

  useEffect(() => {
    async function loadRituals() {
      const res = await axios.get("/api/rituals", {
        headers: { "x-user-id": id }
      });
      setRituals(res.data);
    }
    loadRituals();
  }, [id]);

  const submitRitual = async (ritual) => {
    await axios.post("/api/ritualSubmissions", {
      ritualId: ritual.id,
      userId: id,
      timestamp: new Date().toISOString(),
      type: ritual.submissionType,
      content: ritual.submissionType === "text" ? prompt("Enter response:") : "✔️"
    });
    setSubmitted(prev => ({ ...prev, [ritual.id]: true }));
  };

  return (
    <div className="p-4 text-white space-y-4">
      <h2 className="text-xl font-bold">🕯️ Your Rituals</h2>
      {rituals.map(r => (
        <div key={r.id} className="bg-neutral-800 p-4 rounded space-y-2">
          <div className="font-semibold">{r.title}</div>
          <div className="text-sm text-gray-400">{r.description}</div>
          <div className="text-sm text-gray-500">Scheduled: {r.time}</div>
          <button
            disabled={submitted[r.id]}
            onClick={() => submitRitual(r)}
            className="px-3 py-1 bg-purple-700 text-white rounded"
          >
            {submitted[r.id] ? "Submitted" : "Mark Complete"}
          </button>
        </div>
      ))}
    </div>
  );
};
