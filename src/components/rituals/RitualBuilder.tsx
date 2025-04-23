import React, { useState, useEffect } from "react";
import axios from "axios";
import { useUser } from "../../context/UserContext";

export const RitualBuilder = () => {
  const { id } = useUser();
  const [subs, setSubs] = useState([]);
  const [ritual, setRitual] = useState({
    title: "",
    description: "",
    subId: "",
    time: "08:00",
    recurrence: "daily",
    xp: 10,
    submissionType: "check"
  });

  useEffect(() => {
    axios.get("/api/users", {
      headers: { "x-user-id": id }
    }).then(res => {
      setSubs(res.data.filter(u => u.role === "sub" && u.domId === id));
    });
  }, [id]);

  const saveRitual = async () => {
    await axios.post("/api/rituals", { ...ritual, domId: id });
    alert("Ritual saved!");
    setRitual({ title: "", description: "", subId: "", time: "08:00", recurrence: "daily", xp: 10, submissionType: "check" });
  };

  return (
    <div className="p-4 text-white space-y-4">
      <h2 className="text-xl font-bold">Create Ritual</h2>
      <input value={ritual.title} onChange={e => setRitual({ ...ritual, title: e.target.value })} className="w-full p-2 bg-neutral-800 rounded" placeholder="Title" />
      <textarea value={ritual.description} onChange={e => setRitual({ ...ritual, description: e.target.value })} className="w-full p-2 bg-neutral-800 rounded" placeholder="Description" />
      <select value={ritual.subId} onChange={e => setRitual({ ...ritual, subId: e.target.value })} className="w-full p-2 bg-neutral-800 rounded">
        <option value="">Select Sub</option>
        {subs.map(sub => <option key={sub.id} value={sub.id}>{sub.displayName}</option>)}
      </select>
      <div className="flex gap-2">
        <select value={ritual.recurrence} onChange={e => setRitual({ ...ritual, recurrence: e.target.value })} className="flex-1 p-2 bg-neutral-800 rounded">
          <option value="daily">Daily</option>
          <option value="weekly">Weekly</option>
        </select>
        <input type="time" value={ritual.time} onChange={e => setRitual({ ...ritual, time: e.target.value })} className="flex-1 p-2 bg-neutral-800 rounded" />
      </div>
      <input type="number" value={ritual.xp} onChange={e => setRitual({ ...ritual, xp: +e.target.value })} className="w-full p-2 bg-neutral-800 rounded" placeholder="XP Reward" />
      <select value={ritual.submissionType} onChange={e => setRitual({ ...ritual, submissionType: e.target.value })} className="w-full p-2 bg-neutral-800 rounded">
        <option value="check">Check</option>
        <option value="text">Text</option>
      </select>
      <button onClick={saveRitual} className="w-full p-2 bg-purple-700 text-white rounded">Save Ritual</button>
    </div>
  );
};
