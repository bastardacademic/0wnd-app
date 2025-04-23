import React, { useEffect, useState } from "react";
import axios from "axios";
import { useUser } from "../../context/UserContext";

export const RitualLog = () => {
  const { id } = useUser();
  const [entries, setEntries] = useState([]);

  useEffect(() => {
    async function load() {
      const res = await axios.get("/api/ritualSubmissions", {
        headers: { "x-user-id": id }
      });
      setEntries(res.data);
    }
    load();
  }, [id]);

  return (
    <div className="p-4 text-white">
      <h2 className="text-xl font-bold mb-2">📜 Ritual Log</h2>
      <ul className="space-y-2">
        {entries.map((e, i) => (
          <li key={i} className="bg-neutral-800 p-3 rounded">
            <div>{e.content}</div>
            <div className="text-xs text-gray-400">{new Date(e.timestamp).toLocaleString()}</div>
          </li>
        ))}
      </ul>
    </div>
  );
};
