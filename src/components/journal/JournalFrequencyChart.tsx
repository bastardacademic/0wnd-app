import React, { useEffect, useState } from "react";
import axios from "axios";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import { useUser } from "../../context/UserContext";

export const JournalFrequencyChart = () => {
  const { id } = useUser();
  const [data, setData] = useState([]);

  useEffect(() => {
    axios.get("/api/journal", {
      headers: { "x-user-id": id }
    }).then(res => {
      const counts = {};
      res.data.forEach(j => {
        const d = new Date(j.createdAt).toLocaleDateString();
        counts[d] = (counts[d] || 0) + 1;
      });
      const formatted = Object.entries(counts).map(([date, count]) => ({ date, count }));
      setData(formatted);
    });
  }, [id]);

  return (
    <div className="p-4 text-white">
      <h2 className="text-xl font-bold mb-2">📅 Journaling Frequency</h2>
      <ResponsiveContainer width="100%" height={250}>
        <BarChart data={data}>
          <XAxis dataKey="date" stroke="#ccc" fontSize={12} />
          <YAxis stroke="#ccc" fontSize={12} />
          <Tooltip />
          <Bar dataKey="count" fill="#38bdf8" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};
