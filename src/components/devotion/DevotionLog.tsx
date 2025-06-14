import React, { useEffect, useState } from "react";
import axios from "axios";
import { useUser } from "../../context/UserContext";

export const DevotionLog = () => {
  const { id } = useUser();
  const [log, setLog] = useState([]);

  useEffect(() => {
    async function loadXP() {
      const res = await axios.get("/api/xpLog", {
        headers: { "x-user-id": id }
      });
      setLog(res.data);
    }
    loadXP();
  }, [id]);

  return (
    <div className="p-4 text-white">
      <h2 className="text-xl font-bold mb-2">🔥 Devotion Log</h2>
      {log.length === 0 && <p className="text-gray-400">No XP earned yet.</p>}
      <ul className="space-y-2">
        {log.map((x, i) => (
          <li key={i} className="bg-neutral-800 p-3 rounded">
            <div className="flex justify-between">
              <span>{x.reason || x.source}</span>
              <span className="text-purple-400">+{x.amount} XP</span>
            </div>
            <div className="text-xs text-gray-400">{new Date(x.timestamp).toLocaleString()}</div>
          </li>
        ))}
      </ul>
    </div>
  );
};
