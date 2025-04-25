import React, { useEffect, useState } from "react";
import axios from "axios";
import { useUser } from "../../context/UserContext";
import { format, parseISO } from "date-fns";

export const RitualHeatmap = () => {
  const { id } = useUser();
  const [data, setData] = useState({});

  useEffect(() => {
    axios.get("/api/ritual-log", { headers: { "x-user-id": id } })
      .then(res => {
        const summary = {};
        res.data.forEach(e => {
          if (e.status !== "missed") {
            const day = format(parseISO(e.performedAt), "yyyy-MM-dd");
            summary[day] = (summary[day] || 0) + 1;
          }
        });
        setData(summary);
      });
  }, [id]);

  const today = new Date();
  const days = [...Array(42).keys()].map(i => {
    const d = new Date();
    d.setDate(today.getDate() - 41 + i);
    const key = format(d, "yyyy-MM-dd");
    return { key, count: data[key] || 0 };
  });

  return (
    <div className="text-white space-y-2">
      <h3 className="text-lg font-bold">📅 Ritual Completion Heatmap</h3>
      <div className="grid grid-cols-7 gap-1">
        {days.map(d => (
          <div key={d.key} title={d.key}
            className={`h-4 w-4 rounded ${d.count === 0 ? "bg-neutral-700" : d.count < 2 ? "bg-purple-700" : "bg-purple-400"}`}
          />
        ))}
      </div>
    </div>
  );
};
