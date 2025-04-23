import React, { useEffect, useState } from "react";
import axios from "axios";
import { useUser } from "../../context/UserContext";

export const RitualDashboard = () => {
  const { id } = useUser();
  const [subs, setSubs] = useState([]);
  const [subsLog, setSubsLog] = useState([]);

  useEffect(() => {
    async function load() {
      const usersRes = await axios.get("/api/users", {
        headers: { "x-user-id": id }
      });
      const logsRes = await axios.get("/api/ritualSubmissions/all", {
        headers: { "x-user-id": id }
      });
      const subs = usersRes.data.filter(u => u.role === "sub" && u.domId === id);
      setSubs(subs);
      setSubsLog(logsRes.data);
    }
    load();
  }, [id]);

  return (
    <div className="p-4 text-white">
      <h2 className="text-xl font-bold mb-4">🧾 Ritual Submissions</h2>
      {subs.map(sub => (
        <div key={sub.id} className="bg-neutral-900 mb-4 p-4 rounded">
          <div className="font-semibold mb-2">{sub.displayName}</div>
          <ul className="text-sm space-y-1">
            {subsLog
              .filter(e => e.userId === sub.id)
              .map((e, i) => (
                <li key={i} className="text-gray-300">
                  {new Date(e.timestamp).toLocaleTimeString()} — {e.content || e.type}
                </li>
              ))}
          </ul>
        </div>
      ))}
    </div>
  );
};
