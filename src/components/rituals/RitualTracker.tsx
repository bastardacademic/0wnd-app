import React, { useEffect, useState } from "react";
import axios from "axios";
import { useUser } from "../../context/UserContext";

export const RitualTracker = ({ ritual }) => {
  const { id } = useUser();
  const [status, setStatus] = useState("pending");
  const [remaining, setRemaining] = useState(null);

  useEffect(() => {
    const now = new Date();
    const [hours, mins] = ritual.time.split(":").map(Number);
    const start = new Date();
    start.setHours(hours);
    start.setMinutes(mins);
    start.setSeconds(0);

    const end = new Date(start.getTime() + ritual.duration * 60000);
    ritual.windowEnd = end.toISOString();

    if (now < start) {
      setStatus("scheduled");
      setRemaining(Math.floor((start - now) / 1000));
    } else if (now >= start && now <= end) {
      setStatus("active");
      setRemaining(Math.floor((end - now) / 1000));
    } else {
      setStatus("overdue");
      setRemaining(null);
    }
  }, [ritual]);

  const logRitual = () => {
    axios.post("/api/ritual-log", {
      ritualId: ritual.id,
      userId: id,
      performedAt: new Date().toISOString(),
      status
    }).then(() => alert("✅ Ritual logged"));
  };

  const format = s => `${Math.floor(s / 60)}:${("0" + s % 60).slice(-2)}`;

  return (
    <div className="bg-neutral-900 p-4 rounded text-white space-y-2">
      <h2 className="text-xl font-bold">🧿 {ritual.title}</h2>
      <div>Status: <span className="text-purple-400">{status}</span></div>
      {remaining !== null && <div>Time remaining: {format(remaining)}</div>}
      <button onClick={logRitual} className="mt-2 px-4 py-2 bg-purple-700 rounded">Mark Complete</button>
    </div>
  );
};
