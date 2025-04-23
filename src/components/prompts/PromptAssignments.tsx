import React, { useEffect, useState } from "react";
import axios from "axios";
import { useUser } from "../../context/UserContext";

export const PromptAssignments = () => {
  const { id } = useUser();
  const [subs, setSubs] = useState([]);
  const [prompts, setPrompts] = useState([]);
  const [assigned, setAssigned] = useState({});

  useEffect(() => {
    async function load() {
      const [subsRes, promptRes] = await Promise.all([
        axios.get("/api/users", { headers: { "x-user-id": id } }),
        axios.get("/api/prompts")
      ]);
      setSubs(subsRes.data.filter(u => u.role === "sub" && u.domId === id));
      setPrompts(promptRes.data);
    }
    load();
  }, [id]);

  const assign = async (subId, promptId) => {
    await axios.post("/api/assignPrompt", { subId, promptId });
    alert("Prompt assigned.");
    setAssigned(prev => ({ ...prev, [subId]: promptId }));
  };

  return (
    <div className="p-4 text-white space-y-4">
      <h2 className="text-xl font-bold">📌 Assign Prompts to Subs</h2>
      {subs.map(sub => (
        <div key={sub.id} className="bg-neutral-800 p-3 rounded space-y-1">
          <div className="font-semibold">{sub.displayName}</div>
          <select
            className="w-full bg-neutral-700 text-white p-1 rounded"
            value={assigned[sub.id] || ""}
            onChange={e => assign(sub.id, e.target.value)}
          >
            <option value="">Assign prompt...</option>
            {prompts.map(p => (
              <option key={p.id} value={p.id}>{p.text}</option>
            ))}
          </select>
        </div>
      ))}
    </div>
  );
};
