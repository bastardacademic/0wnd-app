import React, { useEffect, useState } from "react";
import axios from "axios";
import { useUser } from "../../context/UserContext";

export const ReflectionLog = () => {
  const { id } = useUser();
  const [log, setLog] = useState([]);

  useEffect(() => {
    axios.get("/api/reflections", { headers: { "x-user-id": id } })
      .then(res => setLog(res.data));
  }, [id]);

  return (
    <div className="p-4 text-white">
      <h2 className="text-xl font-bold mb-2">📝 Past Reflections</h2>
      <ul className="space-y-2">
        {log.map((entry, i) => (
          <li key={i} className="bg-neutral-800 p-3 rounded">
            <div className="font-semibold">{entry.date}</div>
            <div className="text-sm text-gray-300">Mood: {entry.mood} / 10</div>
            <div className="text-xs text-gray-400">{entry.summary}</div>
            {entry.streakBonus && <div className="text-xs text-green-400">🔥 Streak bonus earned</div>}
          </li>
        ))}
      </ul>
    </div>
  );
};
