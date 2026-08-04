import React, { useEffect, useState } from "react";
import axios from "axios";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";
import { useUser } from "../../context/UserContext";

const COLORS = ["#a855f7", "#38bdf8", "#f43f5e", "#10b981", "#f59e0b"];

export const JournalTagChart = () => {
  const { id } = useUser();
  const [data, setData] = useState([]);

  useEffect(() => {
    axios.get("/api/journal", {
      headers: { "x-user-id": id }
    }).then(res => {
      const counts = {};
      res.data.forEach(j => {
        j.tags?.forEach(tag => {
          counts[tag] = (counts[tag] || 0) + 1;
        });
      });
      const formatted = Object.entries(counts).map(([name, value]) => ({ name, value }));
      setData(formatted);
    });
  }, [id]);

  return (
    <div className="p-4 text-white">
      <h2 className="text-xl font-bold mb-2">🏷️ Tag Breakdown</h2>
      <ResponsiveContainer width="100%" height={250}>
        <PieChart>
          <Pie
            data={data}
            dataKey="value"
            nameKey="name"
            cx="50%"
            cy="50%"
            outerRadius={80}
            fill="#8884d8"
            label
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};
