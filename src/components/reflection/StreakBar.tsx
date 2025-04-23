import React, { useEffect, useState } from "react";
import axios from "axios";
import { useUser } from "../../context/UserContext";

export const StreakBar = () => {
  const { id } = useUser();
  const [count, setCount] = useState(0);

  useEffect(() => {
    axios.get("/api/reflections", { headers: { "x-user-id": id } })
      .then(res => {
        const days = res.data.map(r => r.date).sort().reverse();
        let streak = 0;
        let today = new Date();
        for (let d of days) {
          const compare = today.toISOString().split("T")[0];
          if (d === compare) {
            streak++;
            today.setDate(today.getDate() - 1);
          } else break;
        }
        setCount(streak);
      });
  }, [id]);

  return (
    <div className="p-2 text-sm text-purple-300">
      🔥 Current Streak: <span className="font-bold">{count} day{count !== 1 ? 's' : ''}</span>
    </div>
  );
};
