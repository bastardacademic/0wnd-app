import React, { useEffect, useState } from "react";
import axios from "axios";
import { useUser } from "../../context/UserContext";
import { differenceInDays, formatISO, subDays } from "date-fns";

export const StreakVisualizer = () => {
  const { id } = useUser();
  const [current, setCurrent] = useState(0);
  const [longest, setLongest] = useState(0);

  useEffect(() => {
    axios.get("/api/ritual-log", { headers: { "x-user-id": id } })
      .then(res => {
        const log = res.data
          .filter(e => e.status === "active")
          .map(e => new Date(e.performedAt))
          .sort((a, b) => a.getTime() - b.getTime());

        let streak = 0;
        let max = 0;
        let lastDate = null;

        for (const date of log) {
          if (!lastDate || differenceInDays(date, lastDate) === 1) {
            streak++;
          } else if (differenceInDays(date, lastDate) > 1) {
            streak = 1;
          }
          if (streak > max) max = streak;
          lastDate = date;
        }

        const today = new Date();
        const latest = log.at(-1);
        const currentStreak = latest && differenceInDays(today, latest) <= 1 ? streak : 0;

        setCurrent(currentStreak);
        setLongest(max);
      });
  }, [id]);

  return (
    <div className="text-white space-y-2">
      <h3 className="text-lg font-bold">🔥 Streak Tracker</h3>
      <p>Current Streak: <span className="text-green-400 font-bold">{current}</span> days</p>
      <p>Longest Streak: <span className="text-yellow-400 font-bold">{longest}</span> days</p>
    </div>
  );
};
