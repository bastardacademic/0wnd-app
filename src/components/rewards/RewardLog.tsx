import React, { useEffect, useState } from "react";
import axios from "axios";
import { useUser } from "../../context/UserContext";

export const RewardLog = () => {
  const { id } = useUser();
  const [log, setLog] = useState([]);

  useEffect(() => {
    axios.get("/api/rewardLog", { headers: { "x-user-id": id } })
      .then(res => setLog(res.data));
  }, [id]);

  return (
    <div className="p-4 text-white">
      <h2 className="text-xl font-bold mb-2">📜 Reward Log</h2>
      <ul className="space-y-2">
        {log.map((entry, i) => (
          <li key={i} className="bg-neutral-800 p-3 rounded">
            <div className="text-purple-400 font-semibold">{entry.title}</div>
            <div className="text-xs text-gray-400">{entry.reason}</div>
            <div className="text-xs text-gray-500">{new Date(entry.unlockedAt).toLocaleString()}</div>
          </li>
        ))}
      </ul>
    </div>
  );
};
