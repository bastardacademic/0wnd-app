import React, { useEffect, useState } from "react";
import axios from "axios";

export const DevotionMeter = ({ userId }) => {
  const [xp, setXp] = useState(0);

  useEffect(() => {
    async function fetchDevotion() {
      const res = await axios.get("/api/devotion", {
        headers: { "x-user-id": userId }
      });
      setXp(res.data?.total || 0);
    }
    fetchDevotion();
  }, [userId]);

  const level = Math.floor(xp / 100);
  const progress = xp % 100;

  return (
    <div className="w-full">
      <div className="flex justify-between items-center text-white mb-1">
        <span className="text-sm">Level {level}</span>
        <span className="text-sm text-purple-400">{xp} XP</span>
      </div>
      <div className="w-full h-3 bg-neutral-700 rounded overflow-hidden">
        <div
          className="h-full bg-purple-600 transition-all"
          style={{ width: `${progress}%` }}
        ></div>
      </div>
    </div>
  );
};
